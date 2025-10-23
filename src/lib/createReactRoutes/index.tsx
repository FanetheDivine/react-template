import { ComponentType, ReactNode } from 'react'
import { FallbackProps } from 'react-error-boundary'
import { Outlet, RouteObject } from 'react-router'
import { match, P } from 'ts-pattern'
import type { RouteMap } from '~pages'
import { withErrorBoundary, withSuspense } from '@/utils'

/**
 * 创建react-router路由
 * @param routeMap 由vite-fs-router-plugin生成的路由信息
 * @param config 配置项
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
  config: {
    /** 默认的ErrorBoundary fallback组件 */
    defaultErrorComponent?: ComponentType<FallbackProps>
    /** 默认的Suspense fallback */
    defaultLoading?: ReactNode
  } = {},
): RouteObject[] {
  function convertRouteMap(routeMap?: RouteMap): RouteObject[] | undefined {
    const { defaultErrorComponent, defaultLoading } = config
    if (!routeMap || routeMap.length === 0) return undefined
    const res: RouteObject[] = routeMap.map(function (item): RouteObject {
      const Component = createComboComp(item.components, defaultErrorComponent, defaultLoading)
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
 * 对于key为error的组件 使用ErrorBoundary
 * 对于key为loading的组件 使用Suspense
 */
function createComboComp(
  comps?: RouteMap[number]['components'],
  defaultErrorComponent?: ComponentType<FallbackProps>,
  defaultLoading?: ReactNode,
): ComponentType<any> | null {
  if (!comps || comps.length === 0) return null
  // 数组头是外部组件 尾是内部组件 需要自内向外构造组件包裹关系
  const ResultComp = comps.toReversed().reduce(
    (ResultComp, current) => {
      const { key, value } = current
      const currentComp = match({ ResultComp, key })
        // key为error的 应当包裹子组件
        .with({ ResultComp: P.nonNullable.and(P.select()), key: 'error' }, (ResultComp) => {
          // 如果有fallback组件 使用errorboundary包裹ResultComp
          const FallbackComponent = value ?? defaultErrorComponent
          return FallbackComponent
            ? withErrorBoundary(ResultComp, { FallbackComponent })
            : ResultComp
        })
        // key为error的 应当包裹子组件
        .with({ ResultComp: P.nonNullable.and(P.select()), key: 'loading' }, (ResultComp) => {
          // 如果有fallback组件 使用suspense包裹ResultComp
          const FallbackComp = value
          const fallback = FallbackComp ? <FallbackComp /> : defaultLoading
          return fallback ? withSuspense(ResultComp, fallback) : ResultComp
        })
        // 非error loading的 使用当前组件替换子组件
        .with({ key: P.not(P.union('error', 'loading')) }, () => {
          return value ?? null
        })
        .otherwise(() => null)
      return currentComp
    },
    null as ComponentType<any> | null,
  )

  return ResultComp
}
