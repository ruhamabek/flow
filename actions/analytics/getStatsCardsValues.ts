"use server";

import { Periods } from "@/app/types/analytics";
import { WorkflowExecutionStatus } from "@/app/types/workflow";
import { auth } from "@/lib/auth";
import { PeriodToDateRange } from "@/lib/helper/dates";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";

const {COMPLETED , FAILED} = WorkflowExecutionStatus

export async function GetStatsCardsValues(period: Periods) {
        const session = await auth.api.getSession({
                       headers: await headers()
                   })    
                       
                   const userId = session?.user.id;
               
                   if(!userId){
                       throw new Error("unauthenticated");
                   }

    const dateRange = PeriodToDateRange(period); 
    const executions = await prisma.workflowExecution.findMany({
        where: {
            userId,
            startedAt: {
                gte: dateRange.startDate,
                lte: dateRange.endDate,
            },
            status: {
                in: [COMPLETED, FAILED],
            },
        },
        select: {
            creditsConsumed: true,
            phases: {
                where: {
                    creditsCost: {
                        not: null,
                    },
                },
                select: {
                    creditsCost: true,
                },
            },
        },
    });

    const stats = {
        workfowExecutions : executions.length,
        creditsConsumed: 0,
        phaseExecution: 0,
    };
    
    stats.creditsConsumed = executions.reduce(
        (sum , execution) => sum + execution.creditsConsumed ,
        0
    )
    stats.phaseExecution = executions.reduce(
        (sum , execution) => sum + execution.phases.length ,
        0
    )

    return stats;
}