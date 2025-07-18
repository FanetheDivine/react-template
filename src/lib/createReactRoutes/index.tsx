import { ComponentType, ReactNode, Suspense } from 'react'
import { ErrorBoundary, FallbackProps } from 'react-error-boundary'
import { Outlet, RouteObject } from 'react-router'
import type { RouteMap } from '~pages'

/**
 * 创建react-router路由
 * @example
 * ```
 * import { BrowserRouter, useRoutes } from 'react-router'
 * import { createReactRoutes } from '@/lib/createReactRoutes'
 * import routeMap from '~pages'
 *
 * const App = () => useRoutes(createReactRoutes(routeMap))
 * createRoot(document.getElementById('root')!).render(<BrowserRouter><App /></BrowserRouter>)
 * ```
 */
export function createReactRoutes(
  routeMap: RouteMap,
  DefaultErrorComponent?: ComponentType<FallbackProps>,
  defaultLoading?: ReactNode,
): RouteObject[] {
  function convertRouteMap(routeMap?: RouteMap): RouteObject[] | undefined {
    if (!routeMap || routeMap.length === 0) return undefined
    const res: RouteObject[] = routeMap.map(function (item): RouteObject {
      const Component = createComboComp(item.components, DefaultErrorComponent, defaultLoading)
      const element = Component ? (
        <Component>
          <Outlet></Outlet>
        </Component>
      ) : null

      if (!item.path) {
        return {
          index: true,
          element,
        }
      }
      const children = convertRouteMap(item.children)
      if (/^\(.*\)$/.test(item.path)) {
        // 形如 (withAuth) 不影响url
        return {
          element,
          children,
        }
      }
      return {
        path: item.path,
        element,
        children,
      }
    })
    return res
  }
  const routes = convertRouteMap(routeMap)
  return routes ?? []
}

/**
 * 做如下转换
 * [Comp1,Comp2] -> props=><Comp1><Comp2>{props.children}</Comp2><Comp1>
 * 对于key为loading的组件 使用Suspense
 * 对于key为error的组件 使用ErrorBoundary
 */
function createComboComp(
  comps?: RouteMap[number]['components'],
  DefaultErrorComponent?: ComponentType<FallbackProps>,
  defaultLoading?: ReactNode,
): ComponentType<any> | null {
  if (!comps || comps.length === 0) return null

  let ResultComp: ComponentType<any> | null = null
  comps.forEach((item) => {
    let CurrentComp: ComponentType<any> | null = null
    if (item.key === 'error') {
      let FallbackComponent: ComponentType<any> | undefined = DefaultErrorComponent
      if (item.value) {
        FallbackComponent = item.value
      }
      if (FallbackComponent) {
        CurrentComp = (props) => (
          <ErrorBoundary FallbackComponent={FallbackComponent}>{props.children}</ErrorBoundary>
        )
      }
    } else if (item.key === 'loading') {
      let fallback: ReactNode | undefined = defaultLoading
      if (item.value) {
        const _Comp = item.value
        fallback = <_Comp />
      }
      if (fallback) {
        CurrentComp = (props) => <Suspense fallback={fallback}>{props.children}</Suspense>
      }
    } else {
      CurrentComp = item.value
    }
    if (!CurrentComp) return
    if (ResultComp) {
      const TempComp = ResultComp
      ResultComp = (props) => (
        <TempComp>
          <CurrentComp>{props.children}</CurrentComp>
        </TempComp>
      )
    } else {
      ResultComp = CurrentComp
    }
  })
  return ResultComp
}
