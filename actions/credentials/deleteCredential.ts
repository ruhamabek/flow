"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

export async function DeleteCredential(name :string) {
         const session = await auth.api.getSession({
                 headers: await headers()
             })    
              
             const userId = session?.user.id;
         
             if(!userId){
                 throw new Error("unauthenticated");
             }
     
    await prisma.credential.delete({
        where: {
            userId_name: {
                userId,
                name,
            }
        }
    });

    revalidatePath("/credentials");
}