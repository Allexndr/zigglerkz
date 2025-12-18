'use client'

import { useContext } from 'react'
import { LanguageContext } from '@/components/providers/LanguageProvider'
import { translations, TranslationKey } from '@/lib/i18n/translations'

export function useTranslation() {
  const { language } = useContext(LanguageContext)

  const t = (key: TranslationKey): string => {
    return translations[language][key] || key
  }

  return { t, language }
}
