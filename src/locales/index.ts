import { initReactI18next } from 'react-i18next'
import i18n, { ReadCallback } from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

/** 支持的语言 */
export const supportedLngs = ['zh-CN', 'en-US'] as const

/** 支持的语言 */
export type SupportedLng = (typeof supportedLngs)[number]

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .use({
    type: 'backend',
    // lng已经被i18n转化过
    read: async (lng: SupportedLng, ns: string, cb: ReadCallback) => {
      import(`./${lng}/${ns}.json`)
        .then((res) => res.default)
        .then((resource) => cb(null, resource))
        .catch((e) => cb(e, null))
    },
  })
  .init({
    // 会将字符串自动转化到supportedLngs
    supportedLngs,
    nonExplicitSupportedLngs: false,
    fallbackLng: 'en-US',
    interpolation: {
      escapeValue: false,
      skipOnVariables: false,
    },
    detection: {
      // 缓存相关
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
      lookupLocalStorage: 'i18n_lang',
    },
  })
