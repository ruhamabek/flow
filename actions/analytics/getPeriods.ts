"use server";

import { Periods } from "@/app/types/analytics";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";

export async function GetPeriods() {
       const session = await auth.api.getSession({
                headers: await headers()
            })    
                
            const userId = session?.user.id;
        
            if(!userId){
                throw new Error("unauthenticated");
            }
      
            const years = await prisma.workflowExecution.aggregate({
                where: { userId },
                _min: {startedAt: true}
            });

            const currentYear = new Date().getFullYear();

            const minYear = years._min.startedAt ?
               years._min.startedAt.getFullYear()
               : currentYear;
            
               const periods: Periods[]=  [];

               for(let year = minYear; year<= currentYear ; year++){
                for(let month =0 ; month <= 11 ; month++){
                    periods.push({year , month})
                }
               }

         return periods
}