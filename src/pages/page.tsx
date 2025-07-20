import { FC, useState } from 'react'
import { useNavigate } from 'react-router'
import { Button, Space } from 'antd'
import useSWR from 'swr'
import { sleep } from '@/utils/sleep'
import { useSuspension } from '@/utils/suspense'

let count = 0
const Page: FC = () => {
  const navigate = useNavigate()
  const [type, setType] = useState<'v1' | 'v2' | 'error'>('v1')
  const startSuspension = useSuspension()
  const { data, mutate, isValidating } = useSWR(
    () => type,
    async (type) => {
      console.log(type)
      await sleep(2000)
      if (type !== 'error') return `type=${type} ${count++}`
      throw new Error('error')
    },
    {
      suspense: true,
    },
  )

  return (
    <div className='flex flex-col'>
      <span>result:{data}</span>
      <Space.Compact>
        <Button onClick={() => setType('v1')}>set v1</Button>
        <Button onClick={() => setType('v2')}>set v2</Button>
        <Button onClick={() => setType('error')}>set error</Button>
        <Button onClick={() => startSuspension(mutate)}>
          {isValidating ? 'fetching' : 'refetch'}
        </Button>
        <Button onClick={() => navigate('/404')}>to 404</Button>
      </Space.Compact>
    </div>
  )
}

export default Page
