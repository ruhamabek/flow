"use client";
import React, { ReactNode } from 'react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface Props {
    children: ReactNode;
    content: ReactNode;
    side?: "top" | "bottom" | "left" | "right";
}

const TooltipWrapper = (props: Props) => {
  return (
    <TooltipProvider>
        <Tooltip>
             <TooltipTrigger asChild>
                    {props.children}   
             </TooltipTrigger>
             <TooltipContent side={props.side}>
                 {props.content}
             </TooltipContent>
        </Tooltip>
    </TooltipProvider>
  )
}

export default TooltipWrapper