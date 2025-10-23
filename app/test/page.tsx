'use client'
import { useTranslation } from '../../hooks/use-translation'

export default function TestPage() {
  const { t } = useTranslation();
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <h1 className="text-3xl font-bold">{t('test.title')}</h1>
    </div>
  )
}