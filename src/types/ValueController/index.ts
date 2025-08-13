declare module 'value-controller' {
  export type ValueControllerOptions = {
    /** 是否使value不可选 */
    strictValue?: boolean
    /** 是否使onChange不可选 */
    strictOnChange?: boolean
    /** 是否使onChange的参数不可选 */
    strictOnChangeArg?: boolean
    /** 是否禁止onChange接受一个更新函数 */
    forbidUpdater?: boolean
    /** 是否使更新函数的参数不可选 */
    strictUpdaterArg?: boolean
  }

  /**
   * 非函数类型的值`value`与其控制器`onChange`\
   * 可以在第三个参数处进行一些配置\
   * 默认允许onChange接受更新函数 其余全部可选
   */
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export type ValueController<V = any, Options extends ValueControllerOptions = {}, R = void> =
    isFunction<V> extends true ? never : ValueObj<V, Options> & OnChangeObj<V, R, Options>

  export type ValueObj<
    V,
    Options extends ValueControllerOptions,
  > = Options['strictValue'] extends true ? { value: V } : { value?: V }

  export type OnChangeObj<
    V,
    R,
    Options extends ValueControllerOptions,
  > = Options['strictOnChange'] extends true
    ? { onChange: OnChange<V, R, Options> }
    : { onChange?: OnChange<V, R, Options> }

  export type OnChange<
    V,
    R,
    Options extends ValueControllerOptions,
  > = Options['strictOnChangeArg'] extends true
    ? (arg: OnChangeArg<V, Options>) => R
    : (arg?: OnChangeArg<V, Options>) => R

  export type OnChangeArg<
    V,
    Options extends ValueControllerOptions,
  > = Options['forbidUpdater'] extends true ? V : V | Updater<V, Options>

  export type Updater<
    V,
    Options extends ValueControllerOptions,
  > = Options['strictUpdaterArg'] extends true ? (prev: V) => V : (prev?: V) => V
}
