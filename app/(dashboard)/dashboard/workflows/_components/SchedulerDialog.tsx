"use client";

import React, { useEffect, useState } from 'react'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ClockIcon, TriangleAlertIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import CustomDialogHeader from '@/components/CustomDialogHeader';
import { IconCalendar } from '@tabler/icons-react';
import { Input } from '@/components/ui/input';
import { useMutation } from '@tanstack/react-query';
import { UpdateWorklowCron } from '@/actions/workflows/updateWorkflowCron';
import { toast } from 'sonner';
import cronstrue from "cronstrue"
import parser from "cron-parser";
import { RemoveWorkflowSchedule } from '@/actions/workflows/removeWorkflowSchedule';
import { Separator } from '@/components/ui/separator';

const SchedulerDialog = (props : {
    workflowId: string
    cron: string | null;
}) => {
   const[cron , setCron] = useState(props.cron || "");
   const [validCron , setValidCron] = useState(false);
   const [readableCron , setReadableCron] = useState("");

 const mutation = useMutation({
        mutationFn: UpdateWorklowCron,
        onSuccess: ()=>{
            toast.success("Schedule updated successfully" , {id: "cron"})
        },
        onError: () => {
            toast.error("Something went wrong" , {id: "cron"})
        },
    })

 const removeScheduleMutation = useMutation({
        mutationFn: RemoveWorkflowSchedule,
        onSuccess: () => {
            toast.success("Schedule removed successfully" , {id: "cron"})
        },
        onError: () => {
            toast.error("Something went wrong" , {id: "cron"})
        },
    })

    useEffect(() => {
          try {
              parser.parse(cron);
              const humanCronStr = cronstrue.toString(cron);
              setValidCron(true);
              setReadableCron(humanCronStr);
        } catch (error) {
              setValidCron(false);
          }
    } , [cron])

    const workflowHasValidCron = props.cron && props.cron.length > 0;
    const readableSavedCron = workflowHasValidCron && cronstrue.toString(props.cron!);


  return (
    <Dialog>
        <DialogTrigger asChild>
            <Button 
                variant={"link"}
                size={"sm"}
                className={cn("text-sm p-0 h-auto text-blue-500" , 
                    workflowHasValidCron && "text-primary"
                )}>
                    {
                        workflowHasValidCron && (
                            <div className='flex items-center gap-2'>
                                <ClockIcon />
                                {readableSavedCron}
                            </div>
                        )
                    }
                    {
                        !workflowHasValidCron && (
                             <div className='flex items-center gap-1'>
                                   <TriangleAlertIcon className='h-3 w-3'/>Set Schedule
                              </div>
                        )
                    }
                  
            </Button>
        </DialogTrigger>
        <DialogContent className='px-0'>
              <CustomDialogHeader title='Schedule workflow execution' icon={IconCalendar}/>
              <div className='p-6 space-y-4'>
                 <p className='text-muted-foreground text-sm'>
                    Specify a cron expression to schedule periodic workflow execution.
                 </p>
                 <Input 
                     placeholder='E.g. * * * * *'
                     value={cron}
                     onChange={(e) => setCron(e.target.value)}/>
                     <div className={cn(
                        "bg-accent rounded-md p-3 border text-sm border-destructive text-destructive" ,
                        validCron && "border-green-500 text-green-500")}>
                        {validCron ? readableCron : "Not a valid cron expression"}
                     </div>
                     {
                        workflowHasValidCron && (
                            <DialogClose asChild>
                                    <div className="">
                                          <Button
                                                className='w-full text-destructive border-destructive hover:text-destructive'
                                                variant={"outline"}
                                                disabled={
                                                    mutation.isPending || removeScheduleMutation.isPending
                                                }
                                                onClick={() => {
                                                    toast.loading("Removing schedule..." , {id: "cron"});
                                                    removeScheduleMutation.mutate(props.workflowId)
                                                }}
                                          >
                                               Remove current schedule
                                          </Button>
                                          <Separator className='my-4'/>
                                    </div>
                            </DialogClose>
                        )
                     }
              </div>
             <DialogFooter className="px-6 flex gap-2"> 
                <DialogClose asChild>
                            <Button 
                                className="flex-1"
                                disabled={mutation.isPending || !validCron}
                                onClick={() => {
                                    toast.loading("Saving..." , {id: 'cron'})
                                    mutation.mutate({
                                        id: props.workflowId,
                                        cron,
                                    })
                                }}>
                                 Save
                            </Button>
                </DialogClose>
              <DialogClose asChild>
                            <Button className="flex-1" variant="secondary">
                                 Cancel
                            </Button>
                </DialogClose>
 
            </DialogFooter>
        </DialogContent>
    </Dialog>
  )
}

export default SchedulerDialog