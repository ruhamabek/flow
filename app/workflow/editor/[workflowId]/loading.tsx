import { IconLoader2 } from '@tabler/icons-react'
import React from 'react'

const loading = () => {
  return (
    <div className='flex h-screen w-full items-center justify-center'>
        <IconLoader2 size={30} className='animate-spin stroke-primary' />
    </div>
  )
}

export default loading