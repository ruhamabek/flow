import { ModeToggle } from '@/components/mode-toggle'
import { Separator } from '@/components/ui/separator'
import { IconInnerShadowTop } from '@tabler/icons-react'
import React, { ReactNode } from 'react'

const layout = ({children} : {children : ReactNode}) => {
  return (
    <div className='flex flex-col w-full h-screen'>
      {children}
      <Separator/>
      <footer className='flex items-center justify-between p-2'>
           <div className='flex gap-1 items-center'>
                <IconInnerShadowTop className="!size-6" />
                <span className="text-2xl font-semibold">Flo</span>
              </div>
          <ModeToggle/>
      </footer>
    </div>
  )
}

export default layout