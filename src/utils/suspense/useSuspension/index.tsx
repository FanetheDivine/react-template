import { useCallback, useState } from 'react'

/**
 * 主动唤起Suspense
 * @returns 接受一个Promise或者此类型的getter 唤起Suspense
 * @example
 * ```ts
 * const startSuspension = useSuspension()
 *
 * const doSomething = async ()=>{ xxx }
 * <button onClick={() => startSuspension(doSomething)}>btn</button>
 * ```
 */
export const useSuspension = () => {
  const [promise, setPromise] = useState<Promise<any>>()
  if (promise) {
    throw promise
  }
  const startSuspension = useCallback((arg?: Promise<any> | (() => Promise<any>)) => {
    if (!arg) return
    const p = typeof arg === 'function' ? arg() : arg
    setPromise(
      p.finally(() => {
        setPromise(undefined)
      }),
    )
  }, [])
  return startSuspension
}
