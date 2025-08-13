import { useRef, CompositionEventHandler, ChangeEventHandler } from 'react'
import { useMemoizedFn } from 'ahooks'
import { ValueController, ValueControllerOptions } from 'value-controller'
import { useSemiControlledValue } from '../useSemiControlledValue'

export type CompositionProps<Options extends ValueControllerOptions = object> = {
  value: Options['strictValue'] extends true ? string : string | undefined
  onChange: ChangeEventHandler<HTMLInputElement>
  onCompositionStart: () => void
  onCompositionEnd: CompositionEventHandler<HTMLInputElement>
}

/**
 * 处理输入法合成问题
 * @example
 * ```js
 * // search是合成后的值
 * const [search, setSearch] = useState()
 * const compositionProps = useComposition({ value:search, onChange: setSearch })
 *
 * <Input {...compositionProps}/>
 * ```
 */
export function useComposition<StrictValue extends boolean>(
  valueController: ValueController<string, { updater: false; strictValue: StrictValue }>,
) {
  const isComposing = useRef(false)
  const [value, onInnerChange] = useSemiControlledValue({
    value: valueController.value,
  })
  // onChange时更新本地value
  const onChange = useMemoizedFn<ChangeEventHandler<HTMLInputElement>>((e) => {
    onInnerChange(e.target.value)
  })
  const onCompositionStart = useMemoizedFn(() => {
    isComposing.current = true
  })
  // 输入法合成后更新外部value
  const onCompositionEnd = useMemoizedFn<CompositionEventHandler<HTMLInputElement>>((e) => {
    isComposing.current = false
    valueController.onChange?.((e.target as HTMLInputElement).value)
  })

  return {
    value,
    onChange,
    onCompositionStart,
    onCompositionEnd,
  } as CompositionProps<{ strictValue: StrictValue }>
}
