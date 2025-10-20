import { WorkflowExecutionStatus } from '@/app/types/workflow'
import { cn } from '@/lib/utils'
import React from 'react'

const indicatorColors: Record<WorkflowExecutionStatus, string> = { 
     PENDING: "bg-slate-400",
     RUNNING: "bg-blue-400 animate-pulse",
     COMPLETED: "bg-green-500",
     FAILED:"bg-destructive"
}

const ExecutionStatusIndicator = ({status}: {status: WorkflowExecutionStatus}) => {
  return (
    <div className={cn("w-2 h-2 rounded-full", indicatorColors[status])}/> 
  )
}


const labelColors: Record<WorkflowExecutionStatus, string> = {
     PENDING: "text-slate-400",
     RUNNING: "text-blue-400 animate-pulse",
     COMPLETED: "text-green-500",
     FAILED:"text-destructive"
};
 
export const ExecutionStatusLabel = ({status}: {status: WorkflowExecutionStatus}) => {
  return (
    <div className={cn("lowercase" , labelColors[status])}>{status}</div>
  )
}


 
export default ExecutionStatusIndicator