"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { ExecuteWorkflow } from "@/lib/workflow/executeWorkflow";
import { FlowToExecutionPlan } from "@/lib/workflow/executionPlan";
import TaskRegistry from "@/lib/workflow/task/registry";
import { ExecutionPhaseStatus, WorkflowExecutionPlan, WorkflowExecutionStatus, WorkflowExecutionTrigger } from "../../app/types/workflow";
import { headers } from "next/headers";
 
export async function RunWorkflow(form: {
    workflowId: string;
    flowDefinition?: string
}) {
    const session = await auth.api.getSession({
        headers: await headers() // you need to pass the headers object.
    })    
       const userId = session?.user.id;
    
          if(!userId){
              throw new Error("unautheticated");
          }

    const {workflowId, flowDefinition} = form;

    if(!workflowId){
        throw new Error("workflowId is required");
    }

    const workflow = await prisma.workflow.findUnique({
        where: { id: workflowId, userId },
    })

    if(!workflow){
        throw new Error("workflow not found");
    }

    let executionPlan: WorkflowExecutionPlan;
    if(!flowDefinition){
        throw new Error("flowDefinition is not defined");
    }

    const flow = JSON.parse(flowDefinition);
    const result = FlowToExecutionPlan(flow.nodes , flow.edges);
    if(result.error){
        throw new Error("flow definition is invalid");
    }

    if(!result.executionPlan){
        throw new Error("No Execution plan generated");
    }

    executionPlan = result.executionPlan;

    const execution = await prisma.workflowExecution.create({
        data: {
            workflowId,
            userId,
            status: WorkflowExecutionStatus.PENDING,
            startedAt: new Date(),
            trigger: WorkflowExecutionTrigger.MANUAL,
            definition: flowDefinition,
            phases:{
                create: executionPlan.flatMap((phase) => {
                    return phase.nodes.flatMap((node) => {
                        return {
                            userId,
                            status: ExecutionPhaseStatus.CREATED,
                            number: phase.phase,
                            node: JSON.stringify(node),
                            name: TaskRegistry[node.data.type].label,
                        }
                    })
                })
            }
            
        },

        select:{
            id: true,
            phases:true,
        }
    });

    if(!execution){
        throw new Error("workflow execution could not be created");
    }
  
    ExecuteWorkflow(execution.id);
 
    const data = {
            executionId: execution.id,
            workflowId: workflowId,
        };

    return data;
 }
 

