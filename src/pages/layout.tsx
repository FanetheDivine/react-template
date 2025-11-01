import { FC, PropsWithChildren } from 'react'
import { cn } from '@/utils'

const Layout: FC<PropsWithChildren> = (props) => {
  return (
    <div className={cn('flex h-full w-full flex-col')}>
      <div className='h-20 bg-black text-white'>layout</div>
      <div className={cn('mt-20 flex-1')}>{props.children}</div>
    </div>
  )
}

export default Layout
