import { FC } from 'react'
import { FallbackProps } from 'react-error-boundary'
import { Button } from 'antd'

const Error: FC<FallbackProps> = (props) => {
  const { resetErrorBoundary, error } = props
  return (
    <div className='flex flex-col gap-2'>
      error:
      <span>{error.message}</span>
      <Button onClick={resetErrorBoundary}>reset</Button>
    </div>
  )
}

export default Error
