"use client";
import { GetAvailableCredits } from '@/actions/billing/getAvailableCredits';
import { cn } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';
import { CoinsIcon, Loader2Icon } from 'lucide-react';
import Link from 'next/link';
import React from 'react'
import ReactCountUpWrapper from './ReactCountUpWrapper';
import { buttonVariants } from './ui/button';

const UserAvailableCreditsBadge = () => {
  const query = useQuery({
    queryKey: ["user-available-credits"],
    queryFn: () => GetAvailableCredits(),
    refetchInterval: 1000 * 30,
  })
  return (
    <div className='pb-4'>
         <Link href={"/dashboard/billing"} className={cn("w-full items-center", buttonVariants({variant: "outline"}))}>
         <CoinsIcon size={20} className='text-primary'/>
             <span className='font-semibold capitalize'>
                {query.isLoading && <Loader2Icon className='w-4 h-4 animate-spin' />}
                {!query.isLoading && query.data !== null && query.data !== undefined && (
                  <ReactCountUpWrapper value={query.data} />
                )}
                {!query.isLoading && (query.data === null || query.data === undefined) && "-"}
              </span>
        </Link>
    </div>
    
  )
}

export default UserAvailableCreditsBadge