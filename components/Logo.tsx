"use client";

import { IconInnerShadowTop } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import React from 'react'

const Logo = () => {
  const router = useRouter();
  return (
     <button
        type="button"
        onClick={() => router.push("/dashboard")}
        className="flex items-center gap-2 cursor-pointer"
        >
        <IconInnerShadowTop className="!size-6" />
        <span className="text-2xl font-semibold">Flow</span>
    </button>
  )
}

export default Logo