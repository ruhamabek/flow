import "server-only"
import prisma from "../prisma"
import { revalidatePath } from "next/cache";
import { ExecutionPhaseStatus, WorkflowExecutionStatus } from "../../app/types/workflow";
 import { ExecutionPhase } from "@prisma/client";
import { AppNode } from "../../app/types/appNode";
import TaskRegistry from "./task/registry";
import { ExecutorRegistry } from "./executor/registry";
import { Enviroment, ExecutionEnviroment } from "@/app/types/executor";
import { TaskParamsType } from "@/app/types/task";
import { Browser, Page } from "puppeteer";
import { Edge } from "@xyflow/react";
import { LogCollector } from "@/app/types/log";
import { createLogCollector } from "../log";
export async function ExecuteWorkflow(executionId: string) {

       const execution = await prisma.workflowExecution.findUnique({
        where: { id: executionId },
        include: {
            workflow: true, phases: true
        }
       });

       if(!execution){
        throw new Error("execution not found");
       }

       const edges = JSON.parse(execution.definition).edges as Edge[];

       const enviroment: Enviroment  = { phases: {}};

       await initializeWorkflowExecution(executionId, execution.workflowId); 
       await initializePhaseStatuses(execution);

        let executionFailed = false;
       let creditsConsumed = 0;

         for(const phase of execution.phases){
            const phaseExecution = await executeWorkflowPhase(phase, enviroment, edges);
            if(!phaseExecution.success){
                executionFailed = true;
                break;
            }
         }
        
        await finalizeWorkflowExecution(executionId, execution.workflowId ,executionFailed, creditsConsumed);
        
        await cleanupEnviroment(enviroment);
       revalidatePath("/workflow/runs");
}

async function initializeWorkflowExecution(executionId: string, workflowId: string){
    await prisma.workflowExecution.update({ 
        where: { id: executionId },
        data: { 
            startedAt: new Date(),
            status: WorkflowExecutionStatus.RUNNING
        }
    });

    await prisma.workflow.update({
        where:{
            id: workflowId
        },
        data:{
            lastRunAt: new Date(),
            lastRunStatus: WorkflowExecutionStatus.RUNNING,
            lastRunId: executionId
        }
    })
}

async function initializePhaseStatuses(execution: any) {
      await prisma.executionPhase.updateMany({
        where:{
            id: {
                in: execution.phases.map((phase: any) => phase.id),
            },
        },

        data: {
            status: ExecutionPhaseStatus.PENDING,
        }
      })
}

async function finalizeWorkflowExecution(
    executionId: string,
    workflowId: string,
    executionFailed: boolean,
    creditsConsumed: number
){
    
 const finalStatus = executionFailed ? WorkflowExecutionStatus.FAILED : WorkflowExecutionStatus.COMPLETED;
 
 await prisma.workflowExecution.update({ 
    where: { id: executionId },
    data:{
        status: finalStatus,
        completedAt: new Date(),
        creditsConsumed,
    }
 })

  await prisma.workflow.update({
    where: {
        id: workflowId,
        lastRunId: executionId
    },
    data: {
        lastRunStatus: finalStatus
    },
  })
   .catch((err) => {
      
   })
 }

async function executeWorkflowPhase(phase: ExecutionPhase , enviroment: Enviroment, edges: Edge[]) {
      const logCollector = createLogCollector();
      const startedAt = new Date();
      const node = JSON.parse(phase.node) as AppNode;
      setupEnviromentForPhase(node, enviroment , edges);

      await prisma.executionPhase.update({ 
        where: {id: phase.id} ,
        data: {
            status: ExecutionPhaseStatus.RUNNING,
            startedAt,
            inputs: JSON.stringify(enviroment.phases[node.id].inputs)
        }
      })

      const creditsRequired = TaskRegistry[node.data.type].credits;
      console.log(
        `Executing phase ${phase.name} which requires ${creditsRequired} credits`
      );

      const success = await executePhase(phase, node, enviroment, logCollector);
      const outputs = enviroment.phases[node.id].outputs;
      await finalizePhase(phase.id, success, outputs, logCollector);
      return { success };
} 

async function finalizePhase(phaseId: string, success: boolean , outputs: any, logCollector: LogCollector) {
    const finalStatus = success ? ExecutionPhaseStatus.COMPLETED : ExecutionPhaseStatus.FAILED;
    await prisma.executionPhase.update({ 
        where: { id: phaseId },
        data: { 
            status: finalStatus,
            completedAt: new Date(),
            outputs: JSON.stringify(outputs),
            logs: {
                createMany: {
                    data: logCollector.getAll().map((log) => ({
                        message: log.message,
                        timestamp: log.timestamp,
                        logLevel:log.level
                    }))
                }
            }
        }
    })
}

async function executePhase(phase: ExecutionPhase, node: AppNode, enviroment: Enviroment, logCollector: LogCollector):Promise<boolean> {
      const runFn = ExecutorRegistry[node.data.type];
      if(!runFn){
        return false;
      }

      const executionEnviroment: ExecutionEnviroment<any> = createExecutionEnviroment(node , enviroment , logCollector);

      return await runFn(executionEnviroment);
}

function setupEnviromentForPhase (node: AppNode, enviroment: Enviroment, edges: Edge[]){
    enviroment.phases[node.id] = { inputs: {} , outputs: {}};
    const inputs = TaskRegistry[node.data.type].inputs;
    for(const input of inputs){
        if(input.type === TaskParamsType.BROWSER_INSTANCE) continue;
        const inputValue = node.data.inputs[input.name];
        if(inputValue){
            enviroment.phases[node.id].inputs[input.name] = inputValue;
            continue;
        }

        const connectedEdge = edges.find(
            (edge) => edge.target === node.id && edge.targetHandle === input.name
        );

        if(!connectedEdge){
            console.error("Missing edge for input", input.name , "node id: ", node.id);
            continue;
        }
        
        const outputValue = enviroment.phases[connectedEdge.source].outputs[connectedEdge.sourceHandle!];
        enviroment.phases[node.id].inputs[input.name] = outputValue;
    }
}

function createExecutionEnviroment(node: AppNode , enviroment: Enviroment, logCollector: LogCollector): ExecutionEnviroment<any> {
    return{
        getInput: (name: string) => enviroment.phases[node.id]?.inputs[name],
        setOutput: (name: string, value: string) => { enviroment.phases[node.id].outputs[name] = value },
        getBrowser: () => enviroment.browser,
        setBrowser: (browser: Browser) => (enviroment.browser = browser),
        getPage: () => enviroment.page,
        setPage: (page: Page) => (enviroment.page = page),
        log: logCollector
    }
}

async function cleanupEnviroment(enviroment: Enviroment){ 
    if(enviroment.browser){
        await enviroment.browser.close().catch((err) => console.error("Cannot close browser because of: " , err));
    }
}