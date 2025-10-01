"use client";

import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NavigationTabs = ({workflowId}: {workflowId: string}) => {
   const pathname = usePathname();
   const activeValue = pathname?.split("/")[2];
    
  return (
     <Tabs className='w-[400px]' value={activeValue}>
        <TabsList className='grid w-full grid-cols-2'>
            <Link href={`/workflow/editor/${workflowId}`}>
                 <TabsTrigger className='w-full' value='editor'>
                    Editor
                 </TabsTrigger>
             </Link>
            <Link href={`/workflow/runs/${workflowId}`}>
                 <TabsTrigger className='w-full' value='runs'>
                    Runs
                 </TabsTrigger>
            </Link>
        </TabsList>
     </Tabs>
  )
}

export default NavigationTabs