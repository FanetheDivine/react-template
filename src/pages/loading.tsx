import { FC } from 'react'
import { Skeleton } from 'antd'

const Loading: FC = () => {
  return <Skeleton active paragraph={{ rows: 10 }} />
}

export default Loading
