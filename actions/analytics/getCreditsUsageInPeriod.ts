"use server";

import { Periods } from "@/app/types/analytics";
import { ExecutionPhaseStatus } from "@/app/types/workflow";
import { auth } from "@/lib/auth";
import { PeriodToDateRange } from "@/lib/helper/dates";
import prisma from "@/lib/prisma";
import { eachDayOfInterval, format } from "date-fns";
import { headers } from "next/headers";

type Stats = Record<string,{
    success: number;
    failed: number
}
>

const {COMPLETED, FAILED} = ExecutionPhaseStatus;

export async function GetCreditsUsageInPeriod(period: Periods) {
           const session = await auth.api.getSession({
                    headers: await headers()
                })    
                    
                const userId = session?.user.id;
            
                if(!userId){
                    throw new Error("unauthenticated");
                }
        
         const dateRange = PeriodToDateRange(period);
         const executionPhases = await prisma.executionPhase.findMany({
            where: {
                userId,
                startedAt: {
                    gte: dateRange.startDate,
                    lte: dateRange.endDate
                },
                status :{
                    in: [COMPLETED , FAILED]
                }
            }
         })

           const dateFormat = "yyyy-MM-dd"
               
                 const stats:Stats = eachDayOfInterval({
                     start: dateRange.startDate,
                     end: dateRange.endDate
                  }).map(date => format(date , dateFormat))
                    .reduce((acc, date) => {
                     acc[date] = {
                         success: 0,
                         failed: 0,
                     };
                     return acc
                    } , {} as any)
           
                executionPhases.forEach((phase) => {
                    const date = format(phase.startedAt! , dateFormat);
                    if(phase.status ===  COMPLETED){
                        stats[date].success += phase.creditsCost || 0;
                    }
                    if(phase.status === FAILED){
                        stats[date].failed += phase.creditsCost || 0;
                    }
                })

        const result = Object.entries(stats).map(([date, infos]) => ({
            date,
            ...infos
        }))

         return result;
          
}