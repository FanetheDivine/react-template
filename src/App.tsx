import { FC } from 'react'
import { BrowserRouter, useRoutes } from 'react-router'
import routeMap from '~pages'
import { AntdProvider } from '@/lib/AntdProvider'
import { SWRProvider } from '@/lib/SWRProvider'
import { createReactRoutes } from '@/lib/createReactRoutes'

const routes = createReactRoutes(routeMap)

export const App: FC = () => {
  return (
    <AntdProvider>
      <SWRProvider>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </SWRProvider>
    </AntdProvider>
  )
}

const Routes: FC = () => {
  return useRoutes(routes)
}
