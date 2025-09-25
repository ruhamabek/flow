"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { WorkflowStatus } from "../../app/types/workflow";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";


export async function UpdateWorkflow({id, definition}: {id: string , definition: string}){
    const session = await auth.api.getSession({
        headers: await headers() // you need to pass the headers object.
    })    
       const userId = session?.user.id;
    
          if(!userId){
              throw new Error("unautheticated");
          }
     
    const workflow = await prisma.workflow.findUnique({
        where: {
            id,
            userId,
        },
    });
    
    if(!workflow) throw new Error("Workflow not found");
    if(workflow.status !== WorkflowStatus.DRAFT) throw new Error("Workflow is not a draft");

    await prisma.workflow.update({
        data:{
             definition,
        },
        where: {
            id,
            userId,
        }
    })

    revalidatePath("/workflow");

}