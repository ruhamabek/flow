import { RunWorkflow } from '@/actions/workflows/runWorkflow'
import { Button } from '@/components/ui/button'
import { IconPlayerPlay } from '@tabler/icons-react'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
 import React from 'react'
import { toast } from 'sonner'



const RunBtn = ({workflowId}: {workflowId: string}) => {
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: RunWorkflow,
    onSuccess: (data) => {
      toast.success("Workflow started" , {id: workflowId});
      router.push(`/workflow/runs/${data.workflowId}/${data.executionId}`);
    },
    onError: () => {
      toast.error("Error starting workflow" , {id: workflowId});
    }
  })

  return (
      <Button 
         variant={"outline"}
         size={"sm"}
         className='flex items-center gap-2'
         disabled={mutation.isPending}
         onClick={() => {
          toast.loading("Scheduling run..." , {id: workflowId})
          mutation.mutate({
            workflowId
          });
         }}
         >
          <IconPlayerPlay size={16}/>
        Run
      </Button>
  )
}

export default RunBtn