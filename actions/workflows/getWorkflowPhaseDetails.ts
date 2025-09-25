"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";

export async function GetWorkflowPhaseDetails(phaseId: string) {
    const session = await auth.api.getSession({
        headers: await headers() // you need to pass the headers object.
    })    
       const userId = session?.user.id;
    
          if(!userId){
              throw new Error("unautheticated");
          }
    
    return prisma.executionPhase.findUnique({
        where: {
            id: phaseId,
            execution:{
                userId,
            }
        }
    })
}