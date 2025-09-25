"use client";

import React, { useState } from 'react'
 import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
 
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
 
} from "@/components/ui/alert-dialog"
import { AlertDescription } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { DeleteWorkflow } from '@/actions/workflows/deleteWorkflow';

interface Props{
  open: boolean;
  setOpen: (open: boolean) => void;
  workflowName: string;
  workflowId: string; 
}

const DeleteWorkflowsDialog = ({open, setOpen, workflowName , workflowId}: Props) => {
      const [confirmText, setConfirmText] = useState("");
      const deleteMutation = useMutation({
        mutationFn: DeleteWorkflow,
        onSuccess: () => {
          toast.success("Workflow deleted sucessfully" , {id: workflowId})
          setConfirmText("");
        },
          onError: (error) => {
      // You can use error.message or other properties of the error object
      toast.error(`Failed to delete workflow: ${error.message}`, {
        id: workflowId,
      });
    },
      })
  
  return (
           <AlertDialog open={open} onOpenChange={setOpen}> 
                      <AlertDialogContent>
                           <AlertDialogHeader>
                               <AlertDialogTitle>
                                   Are you sure?
                               </AlertDialogTitle>
                               <AlertDescription>
                                    If you delete this workflow, you will not be able to recover it.
                                    <p>
                                       If you are sure, enter <b>{workflowName}</b> to confirm:
                                    </p>
                                    <Input 
                                         value={confirmText}
                                         onChange={(e) => setConfirmText(e.target.value)}
                                    />
                               </AlertDescription>
                           </AlertDialogHeader>
                           <AlertDialogFooter>
                                 <AlertDialogCancel onClick={() => setConfirmText("")} >
                                       Cancel
                                  </AlertDialogCancel> 
                                  <AlertDialogAction disabled={confirmText !== workflowName || deleteMutation.isPending} className='bg-destructive text-destructive-foreground hover:bg-destructive/90'
                                     onClick={() => {
                                      toast.loading("Deleting workflow..." , {
                                        id : workflowId
                                      });
                                      deleteMutation.mutate(workflowId);
                                     } }
                                  >
                                           Delete
                                  </AlertDialogAction>
                           </AlertDialogFooter>
                      </AlertDialogContent>
           </AlertDialog>
  )
}

export default DeleteWorkflowsDialog