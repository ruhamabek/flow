"use server";

import { WorkflowStatus } from "@/app/types/workflow";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { FlowToExecutionPlan } from "@/lib/workflow/executionPlan";
import { CalculateWorkflowCost } from "@/lib/workflow/helpers";
 import { headers } from "next/headers";

export async function PublishWorkflow({
    id,
    flowDefinition
}:{
    id: string,
    flowDefinition: string
}) {
    const session = await auth.api.getSession({
            headers: await headers()
        })    
           const userId = session?.user.id;
        
              if(!userId){
                  throw new Error("unautheticated");
              }
    const workflow = await prisma.workflow.findUnique({
        where: {
            id,
            userId
        }
    })

    if(!workflow){
        throw new Error("workflow not found");
    }

    if(workflow.status !== WorkflowStatus.DRAFT){
        throw new Error("only draft workflows can be published");
    }

    const flow = JSON.parse(flowDefinition);
    const result = FlowToExecutionPlan(flow.nodes , flow.edges);
    if(result.error){
        throw new Error("flow definition is invalid");
    }

    if(!result.executionPlan){
        throw new Error("No Execution plan generated");
    }

    const creditscost = CalculateWorkflowCost(flow.nodes);

    const data = await prisma.workflow.update({
        where: {
            id,
            userId
        }, 
        data: {
            definition: flowDefinition,
            executionPlan: JSON.stringify(result.executionPlan),
            creditscost,
            status: WorkflowStatus.PUBLISHED
        },
    });
    

  return {
    workflowId: data.id,
    status: data.status,
  };    
}