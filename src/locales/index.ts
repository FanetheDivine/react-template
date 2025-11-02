import { initReactI18next } from 'react-i18next'
import i18n, { ReadCallback } from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

/** 项目支持的语言.需要在'antd/es/locale/'下有对应的包 */
export type SupportedLangs = 'zh-CN' | 'en-US'

/** 获取合法的语言 */
export function getLegalLng(lng: string): SupportedLangs {
  if (lng.startsWith('zh')) {
    return 'zh-CN'
  }
  return 'en-US'
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .use({
    type: 'backend',
    read: (lng: SupportedLangs, ns: string, cb: ReadCallback) => {
      debugger
      import(`./${lng}/${ns}.json`)
        .then((res) => res.default)
        .then((resource) => cb(null, resource))
        .catch((e) => cb(e, null))
    },
  })
  .init({
    fallbackLng: 'zh-CN',
    // 声明所有命名空间
    ns: ['common'],
    interpolation: {
      escapeValue: false,
      skipOnVariables: false,
    },
    detection: {
      // 语言缓存相关
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
      lookupLocalStorage: 'i18n_lang',

      convertDetectedLanguage: getLegalLng,
    },
  })
