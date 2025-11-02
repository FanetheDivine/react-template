import { FC } from 'react'
import { FallbackProps } from 'react-error-boundary'
import { Result, Button } from 'antd'
import { ReloadOutlined } from '@ant-design/icons'
import { AbsoluteCenter } from '@/styles'
import { cn } from '@/utils'

export const DefaultError: FC<FallbackProps> = (props) => {
  const { error, resetErrorBoundary } = props
  return (
    <Result
      className={cn(AbsoluteCenter, '-translate-y-4/5')}
      status={'error'}
      title='页面错误'
      subTitle={error?.message}
      extra={[
        <Button key='retry' type='primary' icon={<ReloadOutlined />} onClick={resetErrorBoundary}>
          重试
        </Button>,
        <Button
          key='refresh'
          // eslint-disable-next-line no-self-assign
          onClick={() => (window.location.href = window.location.href)}
        >
          刷新页面
        </Button>,
      ]}
    />
  )
}
