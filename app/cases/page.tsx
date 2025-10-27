"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FadeInOnScroll } from "@/components/FadeInOnScroll"
import { useTranslation } from "@/hooks/use-translation"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Home } from "lucide-react"
import Link from 'next/link'
import MiddleEastGrowthCTA from "@/components/MiddleEastGrowthCTA"

export default function CasesPage() {
  const [activeCaseIndex, setActiveCaseIndex] = useState<number | null>(null)
  const { t, language } = useTranslation()
  
  const openCaseDialog = (index: number) => {
    setActiveCaseIndex(index)
  }

  const closeCaseDialog = () => {
    setActiveCaseIndex(null)
  }

  return (
    <div className="min-h-screen bg-gray-900/50 text-white">
      {/* Header */}
      <div className="py-12 md:py-24 bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30 mb-6">{t('cases.badge')}</Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            {t('cases.title')}
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            {t('cases.description')}
          </p>
          
          {/* Home button */}
          <div className="absolute top-4 left-4 sm:left-8 md:top-6 md:left-12">
            <Link href="/" passHref>
              <Button variant="ghost" className="text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-purple-600 hover:to-blue-600 flex items-center gap-2 rounded-full">
                <Home className="h-4 w-4" />
                Home
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Case Studies Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                company: t('cases.case1.company'),
                industry: t('cases.case1.industry'),
                challenge: t('cases.case1.challenge'),
                solution: t('cases.case1.solution'),
                results: t('cases.case1.results'),
                image: "/Image/AL/微信图片_20250819133504.png",
                logo: "/placeholder.svg?height=60&width=120",
              },
              {
                company: t('cases.case2.company'),
                industry: t('cases.case2.industry'),
                challenge: t('cases.case2.challenge'),
                solution: t('cases.case2.solution'),
                results: t('cases.case2.results'),
                image: "/Image/AL/微信图片_20250819133512.png",
                logo: "/placeholder.svg?height=60&width=120",
              },
              {
                company: t('cases.case3.company'),
                industry: t('cases.case3.industry'),
                challenge: t('cases.case3.challenge'),
                solution: t('cases.case3.solution'),
                results: t('cases.case3.results'),
                image: "/Image/AL/微信图片_20250819133515.png",
                logo: "/placeholder.svg?height=60&width=120",
              },
              {
                company: t('cases.case4.company'),
                industry: t('cases.case4.industry'),
                challenge: t('cases.case4.challenge'),
                solution: t('cases.case4.solution'),
                results: t('cases.case4.results'),
                image: "/Image/AL/微信图片_20250819133518.png",
                logo: "/placeholder.svg?height=60&width=120",
              },
            ].map((caseStudy, index) => (
              <FadeInOnScroll
                key={index}
                delay={index * 200}
                className="h-full"
              >
                <Card
                  className="bg-gray-900/50 border-gray-800 hover:border-purple-500/50 transition-all duration-500 group hover:shadow-xl hover:shadow-purple-500/25 overflow-hidden h-full"
                >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={caseStudy.image || "/placeholder.svg"}
                    alt={caseStudy.company}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  
                  <div className="absolute bottom-4 left-4">
                    <img
                      src={caseStudy.logo || "/placeholder.svg"}
                      alt={`${caseStudy.company} logo`}
                      className="h-8 opacity-80"
                    />
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors">
                      {caseStudy.company}
                    </h3>
                    <Badge variant="outline" className="border-purple-500/50 text-purple-300">
                      {caseStudy.industry}
                    </Badge>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-semibold text-red-400 mb-2">{t('cases.challengeLabel')}</h4>
                      <p className="text-gray-400 text-sm">{caseStudy.challenge}</p>
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold text-blue-400 mb-2">{t('cases.solutionLabel')}</h4>
                      <p className="text-gray-400 text-sm">{caseStudy.solution}</p>
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold text-green-400 mb-2">{t('cases.resultsLabel')}</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {caseStudy.results.map((result: string, resultIndex: number) => (
                          <div key={resultIndex} className="flex items-center text-xs text-gray-300">
                            <TrendingUp className="h-3 w-3 text-green-400 mr-1" />
                            {result}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <Button 
                    className="w-full mt-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                    onClick={() => openCaseDialog(index)}
                  >
                    {t('cases.viewDetails')}
                  </Button>
                </CardContent>
              </Card>
              </FadeInOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Case Study Detail Dialogs */}
      {activeCaseIndex !== null && (
        <Dialog open={true} onOpenChange={closeCaseDialog}>
          <DialogContent className="bg-gray-900/80 backdrop-blur-md border border-purple-500/30 text-white p-8 rounded-lg text-center max-w-2xl max-h-[90vh] overflow-hidden flex flex-col justify-between" style={{ minHeight: '60vh' }}>
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-purple-300">{t(`cases.case${activeCaseIndex + 1}.company`)}</h3>
              <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30 mb-6">{t(`cases.case${activeCaseIndex + 1}.industry`)}</Badge>
              
              <div className="space-y-6 text-left max-w-md mx-auto overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-purple-500/30 scrollbar-track-gray-800">
                <div>
                  <h4 className="text-lg font-semibold text-red-400 mb-2">{t('cases.challengeLabel')}</h4>
                  <p className="text-gray-300 leading-relaxed">{t(`cases.case${activeCaseIndex + 1}.challenge`)}</p>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-blue-400 mb-2">{t('cases.solutionLabel')}</h4>
                  <p className="text-gray-300 leading-relaxed">{t(`cases.case${activeCaseIndex + 1}.solution`)}</p>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-green-400 mb-2">{t('cases.resultsLabel')}</h4>
                  <div className="grid grid-cols-1 gap-2">
                    {t(`cases.case${activeCaseIndex + 1}.results`).map((result: string, resultIndex: number) => (
                      <div key={resultIndex} className="flex items-center text-gray-300">
                        <TrendingUp className="h-5 w-5 text-green-400 mr-2" />
                        {result}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="flex justify-center mt-12 pb-8">
                <Button onClick={closeCaseDialog} className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-md w-full max-w-xs">
                  {t('cases.close')}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
      
      <MiddleEastGrowthCTA />
    </div>
  )
}