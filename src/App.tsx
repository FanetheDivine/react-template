import { FC } from 'react'
import { ErrorBoundary, FallbackProps } from 'react-error-boundary'
import { RouterProvider, createBrowserRouter } from 'react-router'
import { Button, Result, Skeleton } from 'antd'
import { RollbackOutlined } from '@ant-design/icons'
import routeMap from '~pages'
import { AntdProvider } from '@/lib/AntdProvider'
import { SWRProvider } from '@/lib/SWRProvider'
import { createReactRoutes } from '@/lib/createReactRoutes'
import { AbsoluteCenter } from './styles'
import { cn } from './utils'

const routes = createReactRoutes(routeMap, {
  defaultLoading: <Skeleton active className='p-4' />,
})
const router = createBrowserRouter(routes, { basename: import.meta.env.BASE_URL })

export const App: FC = () => {
  return (
    <AntdProvider>
      <SWRProvider>
        <ErrorBoundary FallbackComponent={GlobalError}>
          <RouterProvider router={router} />
        </ErrorBoundary>
      </SWRProvider>
    </AntdProvider>
  )
}

const GlobalError: FC<FallbackProps> = (props) => {
  const { error, resetErrorBoundary } = props
  return (
    <Result
      className={cn(AbsoluteCenter, '-translate-y-4/5')}
      status={'error'}
      title='页面错误'
      subTitle={error?.message}
      extra={
        <Button type='primary' icon={<RollbackOutlined />} onClick={resetErrorBoundary}>
          返回
        </Button>
      }
    />
  )
}
