export {}

declare global {
  type Style = {
    className?: string
    style?: React.CSSProperties
  }
  type isFunction<T> = T extends (...args: any[]) => any ? true : false
  type NotFunction<T> = isFunction<T> extends true ? never : T
}
