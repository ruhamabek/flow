"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";


export async function DeleteWorkflow (id: string){
    const session = await auth.api.getSession({
        headers: await headers() // you need to pass the headers object.
    })    
       const userId = session?.user.id;
    
          if(!userId){
              throw new Error("unautheticated");
          }

    await prisma.workflow.delete({
        where: {
            id,
            userId,
        }
    })
    
    revalidatePath("/workflows");
}