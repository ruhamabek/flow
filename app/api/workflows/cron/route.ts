import { WorkflowStatus } from "@/app/types/workflow";
import { getAppUrl } from "@/lib/helper/appUrl";
import prisma from "@/lib/prisma";

export async function GET( ) {
      const now = new Date();
      const workflows =  await prisma.workflow.findMany({
        select: {id: true},
        where: {
            status: WorkflowStatus.PUBLISHED,
            cron: { not: null},
            nextRunAt: { lte: now},
        },
      });

       for(const workflow of workflows){
        triggerWorkflow(workflow.id);
      }

      return Response.json({workflowsToRun: workflows.length} , {status: 200});
}

function triggerWorkflow(workflowId: string){
  const triggerApiUrl = getAppUrl(`api/workflows/execute?workflowId=${workflowId}`);
 
  fetch(triggerApiUrl , {
    headers: {
      Authorization: `Bearer ${process.env.API_SECRET}`
    },
    cache: "no-store",
   }).catch((error) => 
  console.error(
    "Error triggering workflow with id",
    workflowId,
    ":error->",
    error.message
  ))
}