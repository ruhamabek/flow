"use server";

import { WorkflowStatus } from "@/app/types/workflow";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";

export async function UnpublishWorkflow(id: string) {
    const session = await auth.api.getSession({
            headers: await headers()
        })    
           const userId = session?.user.id;
        
              if(!userId){
                  throw new Error("unautheticated");
              }
      
      const workflow = await prisma.workflow.findUnique({
        where:{
            id,
            userId
        },
      });

      if(!workflow){
        throw new Error("workflow not found");
      }

      if(workflow.status !== "PUBLISHED"){
        throw new Error("only published workflows can be unpublished");
      }

        const data = await prisma.workflow.update({ 
            where: {
                id,
                userId
            },
            data: {
                status: WorkflowStatus.DRAFT,
                executionPlan: null,
                creditscost: 0
            }
        })

        return{ workflowId: data.id };
}