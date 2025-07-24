import { FC, useState } from 'react'
import { Link } from 'react-router'
import { Button, Space } from 'antd'
import useSWR from 'swr'
import { AutoFill, Scrollbar } from '@/styles'
import { cn } from '@/utils/classnames'
import { sleep } from '@/utils/sleep'

let count = 0
const Page: FC = () => {
  const [type, setType] = useState<'v1' | 'v2' | 'error'>('v1')
  const { data, mutate, isValidating } = useSWR(
    () => type,
    async (type) => {
      await sleep(2000)
      if (type !== 'error') return `type=${type} ${count++}`
      throw new Error('error')
    },
    {
      suspense: true,
    },
  )
  return (
    <div className={cn(AutoFill, 'overflow-auto', Scrollbar)}>
      <div className='flex min-h-[1000px] flex-col'>
        <span>result:{data}</span>
        <Space.Compact>
          <Button onClick={() => setType('v1')}>set v1</Button>
          <Button onClick={() => setType('v2')}>set v2</Button>
          <Button onClick={() => setType('error')}>set error</Button>
          <Button onClick={() => mutate(undefined)}>{isValidating ? 'fetching' : 'refetch'}</Button>
          <Link to={'/404'}>
            <Button>to 404</Button>
          </Link>
        </Space.Compact>
      </div>
    </div>
  )
}

export default Page
