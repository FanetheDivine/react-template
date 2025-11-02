import { FC } from 'react'
import { FallbackProps } from 'react-error-boundary'
import { useTranslation } from 'react-i18next'
import { Result, Button } from 'antd'
import { ReloadOutlined } from '@ant-design/icons'

export const DefaultError: FC<FallbackProps> = (props) => {
  const { error, resetErrorBoundary } = props
  const { t: tc } = useTranslation('common')
  return (
    <Result
      className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-4/5'
      status={'error'}
      title={tc('pageError')}
      subTitle={error?.message}
      extra={[
        <Button key='retry' type='primary' icon={<ReloadOutlined />} onClick={resetErrorBoundary}>
          {tc('retry')}
        </Button>,
        <Button
          key='refresh'
          // eslint-disable-next-line no-self-assign
          onClick={() => (window.location.href = window.location.href)}
        >
          {tc('reloadPage')}
        </Button>,
      ]}
    />
  )
}
