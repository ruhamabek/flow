"use client";

import { PublishWorkflow } from '@/actions/workflows/publishWorkflow';
import useExecutionPlan from '@/components/hooks/useExecutionPlan';
import { Button } from '@/components/ui/button';
import { useMutation } from '@tanstack/react-query';
import { useReactFlow } from '@xyflow/react';
import { UploadIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react'
import { toast } from 'sonner';

const PublishBtn = ({workflowId}: {workflowId: string}) => {
  const generate = useExecutionPlan();
  const {toObject} = useReactFlow();
   const router = useRouter(); 

  const mutation = useMutation({
    mutationFn: PublishWorkflow,
    onSuccess: (data) => {
      toast.success("Workflow published" , {id: workflowId});
      router.push(`/workflow/editor/${data.workflowId}`);
    },
    onError: () => {
      toast.error("Something went wrong" , {id: workflowId});
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

      toast.loading("Publishing workflow..." , {id: workflowId});

      mutation.mutate({
        id: workflowId,
        flowDefinition: JSON.stringify(toObject()),
      })
      
    }}>
        <UploadIcon size={16} className='dark:stroke-white stroke-black'/>
        Publish
    </Button>
  )
}

export default PublishBtn