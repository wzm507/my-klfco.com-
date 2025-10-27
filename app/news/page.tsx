'use client'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '../../components/ui/button'
import { Card, CardContent } from '../../components/ui/card'
import { Badge } from '../../components/ui/badge'
import { ArrowRight, Home } from 'lucide-react'
import MiddleEastGrowthCTA from '../../components/MiddleEastGrowthCTA'
import { useTranslation } from '../../hooks/use-translation'

export default function NewsPage() {
  const { t, language } = useTranslation()
  
  // 基础新闻数据
  const baseNewsItems = [
    {
      id: 1,
      image: "/Image/XW1/微信图片_20250819102012.jpg",
    },
    {
      id: 2,
      image: "/Image/XW2/微信图片_20250819101830.jpg",
    },
    {
      id: 3,
      image: "/Image/XW3/微信图片_20250819103236.png",
    },
    {
      id: 4,
      image: "/Image/XW4/微信图片_20250819104152.png",
    },
    {
      id: 5,
      image: "/Image/XW5/微信图片_20250819111920.jpg",
    },
    {
      id: 6,
      image: "/Image/XW6/微信图片_2025-09-09_154838_287.jpg",
    },
  ]
  
  return (
    <div className="min-h-screen bg-gray-900/50 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Home button */}
        <div className="absolute top-4 left-4 sm:left-8 md:top-6 md:left-12">
          <Link href="/" passHref>
            <Button variant="ghost" className="text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-purple-600 hover:to-blue-600 flex items-center gap-2 rounded-full">
              <Home className="h-4 w-4" />
              Home
            </Button>
          </Link>
        </div>
        
        <div className="text-center mb-16">
          <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30 mb-6">{t('news.badge')}</Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            {t('news.title')}
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            {t('news.description')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {baseNewsItems.map((article) => (
            <Card
              key={article.id}
              className="bg-gray-900/50 border-gray-800 hover:border-purple-500/50 transition-all duration-500 group hover:scale-105 overflow-hidden flex flex-col h-full"
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={article.image || '/placeholder.jpg'}
                  alt={t(`news.articles.${article.id - 1}.title`)}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  sizes="100vw"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    if (target.src.includes('/placeholder.jpg')) return;
                    target.src = '/placeholder.jpg';
                  }}
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-purple-600/80 text-white">{t(`news.articles.${article.id - 1}.category`)}</Badge>
                </div>
              </div>
              <CardContent className="p-6 flex-grow flex flex-col">
                <h3 className="text-lg font-bold text-white mb-3 group-hover:text-purple-300 transition-colors line-clamp-2">
                  {t(`news.articles.${article.id - 1}.title`)}
                </h3>
                <p className="text-gray-400 text-sm mb-4 line-clamp-3 leading-relaxed">{t(`news.articles.${article.id - 1}.excerpt`)}</p>

                <div className="flex flex-wrap gap-1 mb-4">
                  {(() => {
                    const tags = t(`news.articles.${article.id - 1}.tags`) || [];
                    return Array.isArray(tags) ? tags.map((tag, tagIndex) => (
                      <Badge key={tagIndex} variant="outline" className="text-xs border-gray-600 text-gray-400">
                        {typeof tag === 'object' ? tag[language] || tag.zh : tag}
                      </Badge>
                    )) : null;
                  })()}
                </div>

                <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                  <span>{t(`news.articles.${article.id - 1}.date`)}</span>
                  <span>{t(`news.articles.${article.id - 1}.readTime`)}</span>
                </div>

                <div className="mt-auto flex justify-end">
                <Link href={`/news/${article.id}`} passHref>
                  <Button
                    variant="outline"
                    className="border-purple-500/50 text-purple-300 hover:bg-purple-500/10 bg-transparent"
                  >
                    {t('news.readMore')}
                  </Button>
                </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/" passHref>
                  <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 px-8 py-3">
                    {t('news.backToHome')}
                  </Button>
                </Link>
        </div>
      </div>
      
      <MiddleEastGrowthCTA />
    </div>
  )
}