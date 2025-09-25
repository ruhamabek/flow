"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { CreateFlowNode } from "../../lib/workflow/createFlowNode";
import { createWorkflowSchema, createWorkflowtype } from "../../app/schema/workflow";
import { AppNode } from "../../app/types/appNode";
import { TaskType } from "../../app/types/task";
import { WorkflowStatus } from "../../app/types/workflow";
import { Edge } from "@xyflow/react";
import { headers } from "next/headers";
 
export async function CreateWorkflow(
    form: createWorkflowtype
) {
    const {success , data} = createWorkflowSchema.safeParse(form);
           
    if(!success){
        throw new Error("invalid form data");
    }

    const session = await auth.api.getSession({
        headers: await headers()
    })    
     
    const userId = session?.user.id;

    if(!userId){
        throw new Error("unauthenticated");
    }

    const initialFlow: {nodes : AppNode[]; edges: Edge[]} = {
        nodes: [],
        edges: [],
    }

    initialFlow.nodes.push(CreateFlowNode(TaskType.LAUNCH_BROWSER));

    const result = await prisma.workflow.create({
        data:{
            userId,
            status: WorkflowStatus.DRAFT,
            definition: JSON.stringify(initialFlow),
            description:"",
            ...data,
        },
    });

    if(!result){
        throw new Error("Failed to create workflow");
    }
     
    return result;
}