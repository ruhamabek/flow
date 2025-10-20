"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import parser from "cron-parser"
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
 
export async function UpdateWorklowCron({
    id,
    cron
}:{
    id: string;
    cron: string
}) {
    const session = await auth.api.getSession({
        headers: await headers()  
    })    
       const userId = session?.user.id;
    
          if(!userId){
              throw new Error("unautheticated");
          }
    
          try {
               const interval = parser.parse(cron);
                await prisma.workflow.update({
                where: {id, userId},
                data: {
                    cron,
                    nextRunAt: interval.next().toDate(),
                }
               })

          } catch (error: any) {
               console.error("invalid cron:" , error);
               throw new Error("invalid cron expression" , error)
          }
    
    revalidatePath("/workflows");
}