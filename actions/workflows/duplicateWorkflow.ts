"use server";

import { duplicateWorkflowSchema, duplicateWorkflowtype } from "@/app/schema/workflow";
import { WorkflowStatus } from "@/app/types/workflow";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

export async function DuplicateWorkflow(form: duplicateWorkflowtype) {
     const {success , data}  = duplicateWorkflowSchema.safeParse(form);
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
    
    const sourceWorkflow = await prisma.workflow.findUnique({
        where: {id: data.workflowId , userId}
    });

    if(!sourceWorkflow){
        throw new Error("workflow not found")
    }

    const result = await prisma.workflow.create({
        data: {
            userId,
            name: data.name,
            description: data.description ?? "",
            status: WorkflowStatus.DRAFT,
            definition: sourceWorkflow.definition
         }
    });

    if(!result){
        throw new Error("failed to duplicate workflow")
    }

        revalidatePath("/workflow");

    return result;
}