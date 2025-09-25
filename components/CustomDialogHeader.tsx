"use client";

import React from 'react'
import {
 
  DialogHeader,
  DialogTitle,
 } from "@/components/ui/dialog"
import { Icon, IconProps } from '@tabler/icons-react';
import { cn } from '@/lib/utils';

interface Props{
    title?: string;
    subTitle?: string;
    icon?: React.ForwardRefExoticComponent<IconProps & React.RefAttributes<Icon>>;
    iconClassName?:string;
    titleClassName?: string;
    subtitleClassName?:string;
}

const CustomDialogHeader = (props: Props) => {
  return (
    <DialogHeader className='py-6'>
        <DialogTitle asChild>
             <div className='flex flex-col items-center gap-2 mb-2'>
                {
                    props.icon && (
                        <props.icon
                            size={30}
                            className={cn("dark:text-white text-black " , props.iconClassName)}
                        />
                    )}
                {
                    props.title && (
                        <p className={cn("text-xl dark:text-white text-black" , props.titleClassName)}> 
                              {props.title}
                        </p>
                    )
                }
                   
                {
                    props.subTitle && (
                        <p className={cn("text-sm text-muted-foreground" , props.subtitleClassName)}> 
                              {props.subTitle}
                        </p>
                    )
                }
                   
             </div>
        </DialogTitle>
    </DialogHeader>
  )
}

export default CustomDialogHeader