import { useRef, useState } from 'react'
import { useMemoizedFn } from 'ahooks'
import type { ValueController, ValueControllerOptions, OnChange } from 'value-controller'
import { useImmediateEffect } from '../useImmediateEffect'

/**
 * 根据原始值生成一个半受控的新值.原始值的改变会同时新值;也可以单独更改新值\
 * 原始值的改变优先级较高
 * @example
 * ```
 * // text是半受控的值
 * // props变化时 text会变为新的props.value
 * // 与此同时 还可以仅变更text的值
 *
 * // props: {value,onChange}
 * const [text,setText] = useSemiControlledValue(props)
 *
 * <input value={text} onChange={e => setText(e.target.value)}/>
 * ```
 */
export function useSemiControlledValue<
  V = any,
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  Options extends Omit<ValueControllerOptions, 'updater'> = {},
>(valueController: ValueController<V, Options>) {
  const { value, onChange } = valueController
  const [changedValue, setChangedValue] = useState(value)

  const currentValueRef = useRef(value)
  useImmediateEffect(() => {
    currentValueRef.current = changedValue
  }, [changedValue])
  useImmediateEffect(() => {
    currentValueRef.current = value
  }, [value])
  const currentValue = currentValueRef.current as V

  const onInnerChange = useMemoizedFn<OnChange<V, void, Options & { updater: true }>>(
    (arg: any) => {
      const newValue = typeof arg === 'function' ? arg(currentValue) : arg
      setChangedValue(newValue)
      onChange?.(newValue)
    },
  )

  return [currentValue, onInnerChange] as const
}
