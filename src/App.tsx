import { FC } from 'react'
import { Outlet, RouterProvider, createBrowserRouter } from 'react-router'
import routeMap from '~pages'
import { AntdProvider } from '@/lib/AntdProvider'
import { SWRProvider } from '@/lib/SWRProvider'
import { createReactRoutes } from '@/lib/createReactRoutes'
import { DefaultError } from './components/DefaultError'
import { DefaultLoading } from './components/DefaultLoading'
import { withErrorBoundary, withSuspense } from './utils'

const routes = createReactRoutes(routeMap, {
  defaultLoading: <DefaultLoading />,
  defaultErrorComponent: DefaultError,
})
const router = createBrowserRouter(
  [
    {
      // 全局suspense和errorboundary
      // suspense在外侧 是因为error也可能需要i18n语言包
      element: withSuspense(withErrorBoundary(<Outlet />)),
      children: routes,
    },
  ],
  { basename: import.meta.env.BASE_URL },
)

export const App: FC = () => {
  return (
    <AntdProvider>
      <SWRProvider>
        <RouterProvider router={router} />
      </SWRProvider>
    </AntdProvider>
  )
}
