# react + antd + tailwindcss 项目模板

- ahooks 常见 hook
- @/utils/classnames 使用clsx和tailwind-marge合并多个样式类名
- immer & use-immer 处理复杂、嵌套的状态
- zustand 简单的全局状态管理工具
- zod 类型校验工具
- daysjs 日期时间处理工具
- swr [管理网络请求](./useSWR.md)
- lodash-es 常见函数
- [基于文件的路由](./file-based-router.md)

## utils

`@/utils`里提供了常用的函数

- `classnames` 使用`clsx` `tailwind-merge`合并样式
- `sleep` 等待一段时间
- `suspense/useSuspension` 主动唤起`Suspense`
- `suspense/withSuspense` 为`ReactNode`或者一个组件包裹`Suspense`以配合`useSWR`

## 其他

- `@/styles`定义了常见的样式
- `@/types`定义了常见的类型
  - `Style` `className`和`style`的类型
  - `ValueController` `value`&`onChange`
