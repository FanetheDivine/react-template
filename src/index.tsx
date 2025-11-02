import { lazy } from 'react'
import ReactDOM from 'react-dom/client'
import { Outlet, RouterProvider, createBrowserRouter } from 'react-router'
import routeMap from '~pages'
import { createReactRoutes } from '@/lib/createReactRoutes'
import '@/styles/tailwind.css'
import { DefaultError } from './components/DefaultError'
import { DefaultLoading } from './components/DefaultLoading'
import { AntdProvider } from './lib/AntdProvider'
import { SWRProvider } from './lib/SWRProvider'
import { withErrorBoundary, withSuspense } from './utils'

const App = lazy(() => import('antd/es/app'))
const routes = createReactRoutes(routeMap, {
  defaultLoading: <DefaultLoading />,
  defaultErrorComponent: DefaultError,
})
const router = createBrowserRouter(
  [
    {
      // 全局suspense和errorboundary
      // suspense在外侧 是因为error也可能需要i18n语言包
      element: withSuspense(
        withErrorBoundary(
          <App className='app'>
            <Outlet />
          </App>,
        ),
      ),
      children: routes,
    },
  ],
  { basename: import.meta.env.BASE_URL },
)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <AntdProvider>
    <SWRProvider>
      <RouterProvider router={router} />
    </SWRProvider>
  </AntdProvider>,
)
