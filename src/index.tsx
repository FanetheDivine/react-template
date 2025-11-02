import { lazy } from 'react'
import ReactDOM from 'react-dom/client'
import { Outlet, RouterProvider, createBrowserRouter } from 'react-router'
import routeMap from '~pages'
import '@/locales'
import { createReactRoutes } from '@/lib/createReactRoutes'
import '@/styles/tailwind.css'
import { DefaultError } from './components/DefaultError'
import { DefaultLoading } from './components/DefaultLoading'
import { withErrorBoundary, withSuspense } from './utils'

const AntdProvider = lazy(() => import('@/lib/AntdProvider'))
const SWRProvider = lazy(() => import('@/lib/SWRProvider'))
const GlobalNotFound = lazy(() => import('@/lib/GlobalNotFound'))

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
          <AntdProvider>
            <SWRProvider>
              <Outlet />
            </SWRProvider>
          </AntdProvider>,
        ),
      ),
      children: [
        ...routes,
        {
          path: '*',
          element: <GlobalNotFound />,
        },
      ],
    },
  ],
  { basename: import.meta.env.BASE_URL },
)

ReactDOM.createRoot(document.getElementById('root')!).render(<RouterProvider router={router} />)
