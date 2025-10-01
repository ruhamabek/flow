import React, { Suspense } from 'react'
import Topbar from '../../_components/topbar/Topbar'
import { GetWorkflowExecutions } from '@/actions/workflows/getWorkflowExecutions';
import { InboxIcon, Loader2Icon } from 'lucide-react';
import ExecutionTable from './_components/ExecutionTable';

export default function ExcutionsPage({params}: {params: {workflowId: string}}) {
  return (
    <div className='h-full w-full overflow-auto'>
         <Topbar 
              workflowId={params.workflowId}
              hideButton
              title="All runs"
              subtitle='List of all workflow runs'
              />
              <Suspense 
                 fallback={
                     <div className='flex h-full w-full items-center justify-center'>
                          <Loader2Icon className='animate-spin stroke-primary' size={20} />
                     </div>
                 }/>
            <ExecutionTableWrapper workflowId={params.workflowId}/>
    </div>
  )
}

async function ExecutionTableWrapper({workflowId}: {workflowId: string}) {
      const executions = await GetWorkflowExecutions(workflowId);

      if(!executions){
        return <div>No data</div>
      }

      if(executions.length === 0){
        return (
            <div className="container w-full py-6 ">
                <div className="flex items-center flex-col gap-2 justify-center h-full w-full">
                    <div className='rounded-full bg-accent w-20 h-20 flex items-center justify-center'>
                         <InboxIcon size={40} className="stroke-primary"/>
                    </div>
                    <div className='flex flex-col gap-1 text-center'>
                        <p className="font-bold">
                            No runs have been trigerred yet.
                        </p>
                        <p className="text-sm text-muted-foreground">
                            You can trigger a run from the editor page.
                        </p>
                    </div>
                </div>
            </div>
        )
      }

      return( 
        <div className='p-6 px-13  '>
            <ExecutionTable workflowId={workflowId} initialData={executions}/>
        </div>
          )
}
 