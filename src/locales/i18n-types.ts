import 'i18next'
import zhCommon from '@/locales/zh-CN/common.json'

declare module 'i18next' {
  interface CustomTypeOptions {
    resources: {
      common: typeof zhCommon
    }
  }
}
