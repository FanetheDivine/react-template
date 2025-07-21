import scrollbarStyles from './scrollbar/styles.module.scss'

/** 占据父元素全部剩余空间 相对定位 不滚动 */
const autoFillClassName = 'flex-1 w-full h-full relative overflow-hidden'
export { autoFillClassName as AutoFill }

/** 基于absolute定位的居中 */
const absoluteCenterClassName = 'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
export { absoluteCenterClassName as AbsoluteCenter }

/**
 * 更美观的滚动条\
 * 可以通过`@/styles/scrollbar/index.scss`的`@minix scrollbar`自定义滚动条
 */
export const scrollbar = scrollbarStyles.scrollbar
