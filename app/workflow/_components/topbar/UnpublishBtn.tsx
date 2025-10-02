"use client";

import { UnpublishWorkflow } from '@/actions/workflows/unpublishWorkflow';
import useExecutionPlan from '@/components/hooks/useExecutionPlan';
import { Button } from '@/components/ui/button';
import { useMutation } from '@tanstack/react-query';
import { useReactFlow } from '@xyflow/react';
import {DownloadIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react'
import { toast } from 'sonner';

const UnpublishBtn = ({workflowId}: {workflowId: string}) => {
 
   const router = useRouter(); 

  const mutation = useMutation({
    mutationFn: (workflowId: string) => UnpublishWorkflow(workflowId),
    onSuccess: (data) => {
      toast.success("Workflow unpublished" , {id: workflowId});
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
        toast.loading("Unpublishing workflow..." , {id: workflowId});
        mutation.mutate(workflowId) 
    }}>
        <DownloadIcon size={16} className='dark:stroke-white stroke-black'/>
        Unpublish
    </Button>
  )
}

export default UnpublishBtn;