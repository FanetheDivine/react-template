declare module 'value-controller' {
  type ValueControllerOptions = {
    /**
     * 是否使value不可选\
     * 会影响onChange传数值类型时是否可选\
     * 会影响onChange传的updater是否可选
     */
    strictValue?: boolean
    /** 是否使onChange不可选 */
    strictOnChange?: boolean
    /** 是否允许onChange接受一个更新函数 */
    updater?: boolean
  }

  /**
   * 非函数类型的值`value`与其控制器`onChange`\
   * 可以在第三个参数处进行一些配置
   */
  type ValueController<
    V = any,
    Options extends ValueControllerOptions = { updater: true },
    R = void,
  > = isFunction<V> extends true ? never : ValueObj<V, Options> & OnChangeObj<V, R, Options>

  type ValueObj<
    V,
    Options extends Pick<ValueControllerOptions, 'strictValue'>,
  > = Options['strictValue'] extends true ? { value: V } : { value?: V }

  type OnChangeObj<
    V,
    R,
    Options extends ValueControllerOptions,
  > = Options['strictOnChange'] extends true
    ? { onChange: OnChange<V, R, Options> }
    : { onChange?: OnChange<V, R, Options> }

  type OnChange<
    V,
    R,
    Options extends Pick<ValueControllerOptions, 'strictValue' | 'updater'>,
  > = Options['strictValue'] extends true
    ? (arg: OnChangeArg<V, Options>) => R
    : (arg?: OnChangeArg<V, Options>) => R

  type OnChangeArg<
    V,
    Options extends Pick<ValueControllerOptions, 'updater' | 'strictValue'>,
  > = Options['updater'] extends true ? V | Updater<V, Options> : V

  type Updater<
    V,
    Options extends Pick<ValueControllerOptions, 'strictValue'>,
  > = Options['strictValue'] extends true ? (prev: V) => V : (prev?: V) => V
}
