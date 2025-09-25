"use client";

import { UpdateWorkflow } from '@/actions/workflows/updateWorkflow';
import { Button } from '@/components/ui/button';
import { IconCheck } from '@tabler/icons-react';
import { useMutation } from '@tanstack/react-query';
import { useReactFlow } from '@xyflow/react';
import React from 'react'
import { toast } from 'sonner';

const SaveBtn = ({workflowId} : {workflowId: string}) => {
    const { toObject } = useReactFlow();
    const saveMutation = useMutation({
      mutationFn: UpdateWorkflow,
      onSuccess: () => {
        toast.success("Flow saved successfully" , {id: "save-workflow"})
      },
      onError: () => {
        toast.error("Something went wrong" , {id: "save-workflow"})
      }
    })

  return (
    <Button variant={"outline"} 
            className='flex items-center gap-2' 
            disabled={saveMutation.isPending}
            onClick={()=>{
                const workflowDefinition = JSON.stringify(toObject());
                toast.loading("Saving workflow..." , {id: "save-workflow"});
                saveMutation.mutate({
                  id: workflowId,
                  definition: workflowDefinition
                })
        
         }}>
        <IconCheck size={16} className='dark:stroke-white stroke-black'/>
        Save
    </Button>
  )
}

export default SaveBtn