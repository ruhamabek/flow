"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

export async function RemoveWorkflowSchedule(id: string) {
        const session = await auth.api.getSession({
              headers: await headers()  
          })    
             const userId = session?.user.id;
          
                if(!userId){
                    throw new Error("unautheticated");
                }
        await prisma.workflow.update({
            where: {id, userId},
            data: {
                cron: null,
                nextRunAt: null
            }
        })

    revalidatePath("/workflows");
}