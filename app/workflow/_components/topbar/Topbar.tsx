"use client";

import TooltipWrapper from '@/components/TooltipWrapper';
import { Button } from '@/components/ui/button';
import { IconChevronLeft } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import React from 'react'
import SaveBtn from './SaveBtn';
import ExecuteBtn from './ExecuteBtn';
import NavigationTabs from './NavigationTabs';

interface Props {
    title: string
    subtitle: string;
    workflowId: string;
    hideButton?: boolean;
}

const Topbar = ({title , subtitle , workflowId, hideButton= false }: Props) => {
    const router = useRouter();
  return (
    <header className='flex p-2 border-b-2 border-separate justify-between w-full h-[60px] sticky top-0 bg-background z-10'>
         <div className='flex gap-1 flex-1'>
                <TooltipWrapper content="Back">
                          <Button variant={"ghost"} size={"icon"} onClick={() => router.back()}>
                                <IconChevronLeft size={20}/>
                          </Button>
                </TooltipWrapper>
                <div>
                     <p className='font-bold truncate'>
                        {title}
                     </p>
                     {subtitle && (
                        <p className='text-xs text-muted-foreground truncate'>
                             {subtitle}
                        </p>
                     )}
                </div>
         </div>
         <NavigationTabs workflowId={workflowId}/>
         <div className="flex gap-1 flex-1 justify-end">
            {hideButton === false && (
                 <>
                     <ExecuteBtn workflowId={workflowId}/>
                     <SaveBtn workflowId={workflowId}/>
               </>
            )}
              
         </div>
    </header>
  )
}

export default Topbar