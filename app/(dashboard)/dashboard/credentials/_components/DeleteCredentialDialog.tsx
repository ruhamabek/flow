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
  AlertDialogTrigger,
 
} from "@/components/ui/alert-dialog"
import { AlertDescription } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { XIcon } from 'lucide-react';
import { DeleteCredential } from '@/actions/credentials/deleteCredential';
 
interface Props{
name: string
}

const DeleteCredentialDialog = ({name}: Props) => {
      const [confirmText, setConfirmText] = useState("");
      const [open, setOpen] = useState(false);
      const deleteMutation = useMutation({
        mutationFn: DeleteCredential,
        onSuccess: () => {
          toast.success("Credential deleted sucessfully" , {id: name})
          setConfirmText("");
        },
          onError: (error) => {
       toast.error(`Failed to delete Credential: ${error.message}`, {
        id: name,
      });
    },
      })
  
  return (
           <AlertDialog  open={open} onOpenChange={setOpen}> 
           <AlertDialogTrigger  asChild>
                <Button   size={"icon"} variant={"destructive"}>
                     <XIcon size={18}/>
                </Button>
           </AlertDialogTrigger>
                      <AlertDialogContent>
                           <AlertDialogHeader>
                               <AlertDialogTitle>
                                   Are you sure?
                               </AlertDialogTitle>
                               <AlertDescription>
                                    If you delete this credential, you will not be able to recover it.
                                    <p>
                                       If you are sure, enter <b>{name}</b> to confirm:
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
                                  <AlertDialogAction disabled={confirmText !== name || deleteMutation.isPending} className='bg-destructive text-destructive-foreground hover:bg-destructive/90'
                                     onClick={() => {
                                      toast.loading("Deleting credential..." , {
                                        id : name
                                      });
                                      deleteMutation.mutate(name);
                                     } }
                                  >
                                           Delete
                                  </AlertDialogAction>
                           </AlertDialogFooter>
                      </AlertDialogContent>
           </AlertDialog>
  )
}

export default DeleteCredentialDialog