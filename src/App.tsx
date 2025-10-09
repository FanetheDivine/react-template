import { FC } from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router'
import routeMap from '~pages'
import { AntdProvider } from '@/lib/AntdProvider'
import { SWRProvider } from '@/lib/SWRProvider'
import { createReactRoutes } from '@/lib/createReactRoutes'

const routes = createReactRoutes(routeMap)
const router = createBrowserRouter(routes, { basename: import.meta.env.BASE_URL })

export const App: FC = () => {
  return (
    <AntdProvider>
      <SWRProvider>
        <RouterProvider router={router} />
      </SWRProvider>
    </AntdProvider>
  )
}
