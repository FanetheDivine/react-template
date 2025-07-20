import { FC, PropsWithChildren } from 'react'
import { AutoFill } from '@/styles'
import { cn } from '@/utils/classnames'

const Layout: FC<PropsWithChildren> = (props) => {
  return (
    <div className={cn(AutoFill, 'flex flex-col')}>
      <div className='h-20 bg-black text-white'>layout</div>
      <div className={cn(AutoFill, 'mt-20')}>{props.children}</div>
    </div>
  )
}

export default Layout
