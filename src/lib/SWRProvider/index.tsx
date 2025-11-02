'use client'

import { FC, PropsWithChildren } from 'react'
import { SWRConfig } from 'swr'

/** useSWR全局配置 */
export const SWRProvider: FC<PropsWithChildren> = (props) => {
  return (
    <SWRConfig
      value={{
        // 禁用自动重新请求
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
        // 错误时不进行重试
        shouldRetryOnError: false,
        // 每当组件挂载 都会进行重新请求
        revalidateOnMount: true,
      }}
    >
      {props.children}
    </SWRConfig>
  )
}

export default SWRProvider
