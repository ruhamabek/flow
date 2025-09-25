import "server-only"
import prisma from "../prisma"
import { revalidatePath } from "next/cache";
import { ExecutionPhaseStatus, WorkflowExecutionStatus } from "../../app/types/workflow";
 import { ExecutionPhase } from "@prisma/client";
import { AppNode } from "../../app/types/appNode";
import TaskRegistry from "./task/registry";
import { ExecutorRegistry } from "./executor/registry";
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

       const enviroment  = { phases: {}};

       await initializeWorkflowExecution(executionId, execution.workflowId); 
       await initializePhaseStatuses(execution);

       let executionFailed = false;
       let creditsConsumed = 0;
         for(const phase of execution.phases){
            const phaseExecution = await executeWorkflowPhase(phase);
            if(!phaseExecution.success){
                executionFailed = true;
                break;
            }
         }
        
        await finalizeWorkflowExecution(executionId, execution.workflowId ,executionFailed, creditsConsumed);

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

async function executeWorkflowPhase(phase: ExecutionPhase) {
      const startedAt = new Date();
      const node = JSON.parse(phase.node) as AppNode;

      await prisma.executionPhase.update({ 
        where: {id: phase.id} ,
        data: {
            status: ExecutionPhaseStatus.RUNNING,
            startedAt
        }
      })

      const creditsRequired = TaskRegistry[node.data.type].credits;
      console.log(
        `Executing phase ${phase.name} which requires ${creditsRequired} credits`
      );

      const success = await executePhase(phase, node);

      await finalizePhase(phase.id,success);
      return { success };
} 

async function finalizePhase(phaseId: string, success: boolean) {
    const finalStatus = success ? ExecutionPhaseStatus.COMPLETED : ExecutionPhaseStatus.FAILED;
    await prisma.executionPhase.update({ 
        where: { id: phaseId },
        data: { 
            status: finalStatus,
            completedAt: new Date(),
        }
    })
}

async function executePhase(phase: ExecutionPhase, node: AppNode):Promise<boolean> {
      const runFn = ExecutorRegistry[node.data.type];
      if(!runFn){
        return false;
      }

      return await runFn();
}