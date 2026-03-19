# AGENTS.md

本项目中，所有AI编程工具应当遵循以下规范。

---

## 项目总览

- **框架**：Vite + React + TypeScript 严格模式
- **UI**：Ant Design 6 + Tailwind CSS 4，`@/styles` 放共享样式
- **路由**：React Router 7，基于文件的路由系统（`vite-fs-router-plugin`），页面位于 `src/pages`
- **国际化**：react-i18next，语言资源位于 `src/locales/resource`
- **状态与数据**：Zustand 全局状态，SWR 客户端数据获取，Axios HTTP 请求，Zod 数据验证
- **工具链**：pnpm、ESLint 9、Prettier（含 sort-imports、tailwind 插件）
- **路径别名**：`@/* -> src/*`，优先使用别名

## 目录结构

```
src/
├─ components/   # 通用组件
├─ hooks/        # 自定义 hooks
├─ lib/          # 第三方封装（Provider、路由创建等）
├─ locales/      # i18n 配置与语言资源
├─ pages/        # 基于文件的路由页面
├─ styles/       # 样式与常量
├─ types/        # 类型声明
└─ utils/        # 工具函数
```

## 常用脚本

| 命令                 | 说明          |
| -------------------- | ------------- |
| `pnpm dev`           | 开发调试      |
| `pnpm build`         | 正常构建      |
| `pnpm build:analyze` | bundle 分析   |
| `pnpm preview`       | 预览构建产物  |
| `pnpm prettier`      | 格式化 `src/` |
| `pnpm lint`          | ESLint 检查   |

---

## 编码规范

### TypeScript

- `strict` 模式，保持类型完整
- 避免 `any`，优先 `unknown` 或具体类型
- 优先 `type` 声明，仅在需要声明合并时使用 `interface`
- 禁止 `enum`，用联合字面量或对象常量替代
- 导出类型使用命名导出，局部类型就近声明

### 导入顺序

1. React 核心
2. 第三方库（antd、lodash 等）
3. 内部模块（`@/components` 等）
4. 类型导入（`import type`）
5. 相对路径

### 函数与导出

- 有明确类型时用 `const fn: FN = xxx`，否则用 `function` 声明
- 优先命名导出（`export const` / `export function`）
- 仅路由特殊文件（`page.tsx`、`layout.tsx`、`error.tsx`、`loading.tsx`）使用默认导出，且 `export default` 与定义必须分开写

### 代码质量

- 修改代码后执行 `pnpm prettier` 和 `pnpm lint`
- ESLint 强制 `react-hooks/exhaustive-deps`
- 复杂逻辑添加注释，公共 API/Props 提供 JSDoc

### 数据验证

- 使用 Zod 进行 API/表单数据验证
- 通过 `z.infer<typeof schema>` 推断类型
- 使用 `safeParse()` 处理验证失败

---

## React 规范

### 组件定义

- 文件名 PascalCase，hooks 用 `useXxx` 命名
- 组件必须使用 `const XX: FC<XXProps> = props => { ... }` 形式
- Props 类型命名为 `组件名Props`，格式：`export type XXProps = Style & PropsWithChildren & { ... }`
- `Style` 是全局类型（提供 `className`、`style` 等），应多使用
- 组件体内解构顺序：`props` → `children` → ... → `className` → `style`

### Hooks 规则

- 严格遵守 React Hooks 规则（顶层调用、依赖列表完整）
- 项目自定义 hooks：`useImmediateEffect`、`useSemiControlledValue`、`useComposition`

### 事件处理

- 简单逻辑优先内联
- 复杂逻辑独立并用 `useMemoizedFn`（ahooks）包裹
- 组件较多时使用描述性命名（如 `handleUserFormSubmit`）
- 独立的事件处理函数须添加 TSDoc 注释

### 数据请求

- **数据获取**：`useSWR` + `suspense` 模式，配合 `withSuspense` / `withErrorBoundary`
- **提交型**：`useRequest`（ahooks），提交中按钮 loading，弹窗禁止关闭（蒙层、ESC、closable、取消按钮 disabled）

### Context

- `createContext` 放在独立文件中，避免热重载刷新

### Lazy 组件

- 必须用 `withSuspense` 包裹，禁止直接使用 `React.lazy()` 返回的组件

### Ant Design

- 按需导入组件和图标，避免全量导入

---

## 路由规范

- 基于文件路由：`src/pages` 目录，合法文件为 `page.tsx`、`layout.tsx`、`error.tsx`、`loading.tsx`
- `layout.tsx` 使用 `<Outlet />` 渲染子路由
- `error.tsx` 导出 `FC<FallbackProps>` 类型组件，不使用 `useRouteError`
- 动态路由：`[id]` → `/:id`，剩余参数：`[...]` → `/*`
- 功能性路由：`(xxx)` 不增加路径层级
- 404 页面在 `src/index.tsx` 中通过 `path: '*'` 处理

---

## 样式规范

- 优先 Tailwind 工具类，合并 `className` 用 `cn`（`clsx + tailwind-merge`）
- 简单样式（≤3 词）用 Tailwind；CSS 属性值含空格的样式放 CSS Modules
- 复杂视觉效果用 CSS Modules 或内联 `style`
- 不使用 Sass/Less

---

## 国际化

### 初始化

- `src/locales/index.ts` 注册 i18next，支持 `zh` / `en`
- `LanguageDetector` 读取 `localStorage('i18n_lang')` 与浏览器语言

### 使用方式

- 使用 `useTranslation()` 获取 `t` 和 `i18n`
- 所有展示字符串放 `resource` 文件，禁止硬编码

### 语言切换

- `i18n.changeLanguage(nextLng)` 切换语言
- `AntdProvider` 自动同步 Ant Design 组件文案与 dayjs locale

### 新增语言

1. 添加 `src/locales/resource/{lng}.json`
2. 更新 `supportedLngs` 与 `SupportedLng` 类型
3. 确保 `AntdProvider` 能映射到对应 antd/dayjs locale
4. 补充全局组件翻译（错误页、404 等）

---

## 全局类型

- `Style`：样式 props（`className`、`style`）
- `isFunction`：函数类型守卫
- `ActionType<ActionMap>`：键值对 → 可辨识联合类型
- `ValueController`：受控/非受控组件值控制器泛型（`import type { ValueController } from 'value-controller'`）

## 工具函数（@/utils）

- `cn`：clsx + tailwind-merge 合并 className
- `sleep`：Promise 延时
- `withSuspense`：添加 Suspense 边界
- `withErrorBoundary`：添加错误边界
- `loadFile`：浏览器加载文件
- `isReactNode`：判断有效 ReactNode
