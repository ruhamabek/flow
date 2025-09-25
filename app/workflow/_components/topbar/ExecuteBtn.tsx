"use client";

import { RunWorkflow } from '@/actions/workflows/runWorkflow';
import useExecutionPlan from '@/components/hooks/useExecutionPlan';
import { Button } from '@/components/ui/button';
import { useMutation } from '@tanstack/react-query';
import { useReactFlow } from '@xyflow/react';
import { PlayIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
 import React from 'react'
import { toast } from 'sonner';

const ExecuteBtn = ({workflowId}: {workflowId: string}) => {
  const generate = useExecutionPlan();
  const {toObject} = useReactFlow();
   const router = useRouter(); 

  const mutation = useMutation({
    mutationFn: RunWorkflow,
    onSuccess: (data) => {
      toast.success("Workflow execution started" , {id: "flow-execution"});
      router.push(`/workflow/runs/${data.workflowId}/${data.executionId}`);
    },
    onError: () => {
      toast.error("Something went wrong" , {id: "flow-execution"});
    },
  })

  return (
    <Button variant={"outline"} className='flex items-center gap-2'
     disabled={mutation.isPending}
     onClick={() => {
      const plan = generate();
      
      if(!plan){
        return;
      }

      mutation.mutate({
        workflowId: workflowId,
        flowDefinition: JSON.stringify(toObject()),
      })
      console.log("====plan====");
      console.table(plan);
    }}>
        <PlayIcon size={16} className='dark:stroke-white stroke-black'/>
    </Button>
  )
}

export default ExecuteBtn