"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function SetupUser() {
        const session = await auth.api.getSession({
            headers: await headers() // you need to pass the headers object.
        })    
           const userId = session?.user.id;
        
              if(!userId){
                  throw new Error("unautheticated");
              }
      
        const balance = await prisma.userBalanace.findUnique({where: {userId}});
        if(!balance){
            await prisma.userBalanace.create({
                data: {
                    userId,
                    credits: 100
                }
            })
        }

        redirect("/");
}