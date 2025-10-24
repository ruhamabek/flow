"use server"

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";

export async function GetCredentialsForUser() {
        const session = await auth.api.getSession({
            headers: await headers()
        })    
         
        const userId = session?.user.id;
    
        if(!userId){
            throw new Error("unauthenticated");
        }

        return prisma.credential.findMany({
            where: {userId},
            orderBy: {
                name: "asc"
            }
        })
}