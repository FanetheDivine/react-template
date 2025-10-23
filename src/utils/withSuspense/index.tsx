import { ComponentType, forwardRef, isValidElement, ReactNode, Suspense } from 'react'
import { Skeleton } from 'antd'

/** 为一个ReactNode包裹Suspense */
export function withSuspense(children: ReactNode, fallback?: ReactNode): ReactNode
/** 为一个react组件包裹Suspense */
export function withSuspense<T extends ComponentType<any>>(Comp: T, fallback?: ReactNode): T

export function withSuspense<T extends ComponentType<any>>(
  arg: ReactNode | T,
  fallback: ReactNode = <Skeleton active className='p-4' />,
) {
  // react组件可能是函数或对象
  // 通过instanceof排除以上两项 并用isValidElement判断arg是不是react节点
  if (!(arg instanceof Object) || isValidElement(arg)) {
    const children: ReactNode = arg
    return <Suspense fallback={fallback}>{children}</Suspense>
  } else {
    const Comp: any = arg
    const CompWithSuspense = forwardRef((props, ref) => {
      return (
        <Suspense fallback={fallback}>
          <Comp {...props} ref={ref} />
        </Suspense>
      )
    })
    return CompWithSuspense as unknown as T
  }
}
