"use client"

import { useState, useEffect, useRef } from "react"
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FadeInOnScroll } from "@/components/FadeInOnScroll"
import { useTranslation } from "@/hooks/use-translation"
import { Badge } from "@/components/ui/badge"
import { Home } from "lucide-react"
import MiddleEastGrowthCTA from '@/components/MiddleEastGrowthCTA'

export default function PricingPage() {
  const [activeNewsIndex, setActiveNewsIndex] = useState<number | null>(null)
  const { t, toggleLanguage, language } = useTranslation()
  
  const teamNews = [
    {
      imageUrl: '/WMDYWDT/IP.png',
      type: 'project',
      category: t('teamNews.item1.category'),
      date: '2025-09-15',
      title: t('teamNews.item1.title'),
      summary: t('teamNews.item1.summary')
    },
    {
      imageUrl: '/WMDYWDT/web.png',
      type: 'project',
      category: t('teamNews.item2.category'),
      date: '2025-09-10',
      title: t('teamNews.item2.title'),
      summary: t('teamNews.item2.summary')
    },
    {
      imageUrl: '/WMDYWDT/gzh.png',
      type: 'project',
      category: t('teamNews.item3.category'),
      date: '2025-09-05',
      title: t('teamNews.item3.title'),
      summary: t('teamNews.item3.summary')
    },
  ]

  const openNewsDialog = (index: number) => {
    setActiveNewsIndex(index)
  }

  const closeNewsDialog = () => {
    setActiveNewsIndex(null)
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Home Button */}
      <div className="absolute top-4 left-4 sm:left-8 md:top-6 md:left-12 z-50">
        <Link href="/" passHref>
          <Button variant="ghost" className="text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-purple-600 hover:to-blue-600 flex items-center gap-2 rounded-full">
            <Home className="h-4 w-4" />
            Home
          </Button>
        </Link>
      </div>

      {/* Team News Section */}
      <section className="py-24 relative pt-40">
        {/* Team News Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10"
          style={{
            backgroundImage: "url('/team-background.svg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20 mt-[-30px]">
            <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30 mb-6">{t('teamNews.badge')}</Badge>
            <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              {t('teamNews.title')}
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">{t('teamNews.description')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamNews.map((news, index) => (
              <FadeInOnScroll
                key={index}
                delay={(index % 3) * 150 + Math.floor(index / 3) * 100}
                className="h-full"
              >
                <Card
                  className="bg-gray-900/50 border-gray-800 transition-all duration-300 hover:scale-105 hover:border-blue-500/30 flex flex-col h-full"
                >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={news.imageUrl}
                    alt={news.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className={`${news.type === 'project' ? 'bg-green-500/20 text-green-300 border-green-500/30' : news.type === 'announcement' ? 'bg-blue-500/20 text-blue-300 border-blue-500/30' : 'bg-purple-500/20 text-purple-300 border-purple-500/30'}`}>
                      {news.category}
                    </Badge>
                  </div>
                </div>

                <CardContent className="p-6">
                  <p className="text-gray-500 text-sm mb-3">{news.date}</p>
                  <CardTitle className="text-xl font-bold text-white mb-2 hover:text-blue-400 transition-colors cursor-pointer">{news.title}</CardTitle>
                  <p className="text-gray-400 mb-4 line-clamp-3">{news.summary}</p>
                  <div className="mt-auto">
                    <div className="w-full h-[40px] border border-blue-500/30 rounded-md flex items-center justify-center">
                      <Button
                        variant="link"
                        className="text-blue-400 hover:text-blue-300 p-0 w-full text-center"
                        onClick={() => openNewsDialog(index)}
                      >
                        {t('btn.readMore')}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
              </FadeInOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Business News Detail Dialog */}
      {activeNewsIndex !== null && (
        <Dialog open={true} onOpenChange={closeNewsDialog}>
          <DialogContent className="bg-gray-900/80 backdrop-blur-md border border-blue-500/30 text-white p-8 rounded-lg text-center max-w-2xl max-h-[90vh] overflow-y-auto">
            {teamNews[activeNewsIndex] && (
              <div className="space-y-6 flex-grow flex flex-col pb-6">
                <div className="flex flex-col items-center">
                  <img
                    src={teamNews[activeNewsIndex].imageUrl}
                    alt={teamNews[activeNewsIndex].title}
                    className="w-32 h-32 object-contain mb-6"
                  />
                  <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30 mb-4">
                    {teamNews[activeNewsIndex].category}
                  </Badge>
                  <p className="text-gray-400 text-sm mb-2">{teamNews[activeNewsIndex].date}</p>
                  <h3 className="text-2xl font-bold text-white mb-6">
                    {teamNews[activeNewsIndex].title}
                  </h3>
                </div>

                <div className="text-left max-w-md mx-auto">
                  <h4 className="text-lg font-semibold text-blue-300 mb-4">{t('teamNews.projectDetails')}</h4>
                  <p className="text-gray-300 mb-6">
                    {teamNews[activeNewsIndex].summary}
                  </p>
                  
                  {/* 根据不同的业务动态显示更详细的信息 */}
                  {activeNewsIndex === 0 && (
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-md font-semibold text-purple-300 mb-2">{t('teamNews.item1.projectBackground')}</h4>
                        <p className="text-gray-400">{t('teamNews.item1.projectBackgroundDesc')}</p>
                      </div>
                      <div>
                        <h4 className="text-md font-semibold text-purple-300 mb-2">{t('teamNews.item1.coreServices')}</h4>
                        <ul className="space-y-2">
                          <li className="flex items-start text-gray-400">
                            <span className="text-green-400 mr-2">✓</span>
                            <span>{t('teamNews.item1.service1')}</span>
                          </li>
                          <li className="flex items-start text-gray-400">
                            <span className="text-green-400 mr-2">✓</span>
                            <span>{t('teamNews.item1.service2')}</span>
                          </li>
                          <li className="flex items-start text-gray-400">
                            <span className="text-green-400 mr-2">✓</span>
                            <span>{t('teamNews.item1.service3')}</span>
                          </li>
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="text-md font-semibold text-purple-300 mb-2">{t('teamNews.item1.packages')}</h4>
                        <div className="overflow-x-auto">
                          <table className="w-full text-left border-collapse">
                            <thead>
                              <tr className="border-b border-gray-700">
                                <th className="py-3 px-2 text-gray-300">{t('teamNews.item1.packageName')}</th>
                                <th className="py-3 px-2 text-gray-300">{t('teamNews.item1.serviceContent')}</th>
                                <th className="py-3 px-2 text-gray-300">AED</th>
                                <th className="py-3 px-2 text-gray-300">RMB</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr className="border-b border-gray-800">
                                <td className="py-3 px-2 text-gray-400">{t('teamNews.item1.basicPackage')}</td>
                                <td className="py-3 px-2 text-gray-400">{t('teamNews.item1.basicPackageContent')}</td>
                                <td className="py-3 px-2 text-gray-400">5000</td>
                                <td className="py-3 px-2 text-gray-400">10000</td>
                              </tr>
                              <tr className="border-b border-gray-800">
                                <td className="py-3 px-2 text-gray-400">{t('teamNews.item1.standardPackage')}</td>
                                <td className="py-3 px-2 text-gray-400">{t('teamNews.item1.standardPackageContent')}</td>
                                <td className="py-3 px-2 text-gray-400">13500</td>
                                <td className="py-3 px-2 text-gray-400">27000</td>
                              </tr>
                              <tr className="border-b border-gray-800">
                                <td className="py-3 px-2 text-gray-400">{t('teamNews.item1.premiumPackage')}</td>
                                <td className="py-3 px-2 text-gray-400">{t('teamNews.item1.premiumPackageContent')}</td>
                                <td className="py-3 px-2 text-gray-400">20000</td>
                                <td className="py-3 px-2 text-gray-400">40000</td>
                              </tr>
                              <tr>
                                <td className="py-3 px-2 text-gray-400">{t('teamNews.item1.flagshipPackage')}</td>
                                <td className="py-3 px-2 text-gray-400">{t('teamNews.item1.flagshipPackageContent')}</td>
                                <td className="py-3 px-2 text-gray-400">35000</td>
                                <td className="py-3 px-2 text-gray-400">70000</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {activeNewsIndex === 1 && (
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-md font-semibold text-purple-300 mb-2">{t('teamNews.item2.upgradeHighlights')}</h4>
                        <ul className="space-y-2">
                          <li className="flex items-start text-gray-400">
                            <span className="text-green-400 mr-2">✓</span>
                            <span>{t('teamNews.item2.highlight1')}</span>
                          </li>
                          <li className="flex items-start text-gray-400">
                            <span className="text-green-400 mr-2">✓</span>
                            <span>{t('teamNews.item2.highlight2')}</span>
                          </li>
                          <li className="flex items-start text-gray-400">
                            <span className="text-green-400 mr-2">✓</span>
                            <span>{t('teamNews.item2.highlight3')}</span>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-md font-semibold text-purple-300 mb-2">{t('teamNews.item2.technicalAdvantages')}</h4>
                        <p className="text-gray-400">{t('teamNews.item2.technicalDesc')}</p>
                      </div>
                      
                      <div>
                        <h4 className="text-md font-semibold text-purple-300 mb-2">{t('teamNews.item2.websiteServices')}</h4>
                        <div className="overflow-x-auto">
                          <table className="w-full text-left border-collapse">
                            <thead>
                              <tr className="border-b border-gray-700">
                                <th className="py-3 px-2 text-gray-300">{t('teamNews.item2.serviceItem')}</th>
                                <th className="py-3 px-2 text-gray-300">{t('teamNews.item1.serviceContent')}</th>
                                <th className="py-3 px-2 text-gray-300">AED</th>
                                <th className="py-3 px-2 text-gray-300">RMB</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr className="border-b border-gray-800">
                                <td className="py-3 px-2 text-gray-400">{t('teamNews.item2.personalWebsite')}</td>
                                <td className="py-3 px-2 text-gray-400">{t('teamNews.item2.personalWebsiteContent')}</td>
                                <td className="py-3 px-2 text-gray-400">2800</td>
                                <td className="py-3 px-2 text-gray-400">5600</td>
                              </tr>
                              <tr className="border-b border-gray-800">
                                <td className="py-3 px-2 text-gray-400">{t('teamNews.item2.uiDesign')}</td>
                                <td className="py-3 px-2 text-gray-400">{t('teamNews.item2.uiDesignContent')}</td>
                                <td className="py-3 px-2 text-gray-400">150</td>
                                <td className="py-3 px-2 text-gray-400">300</td>
                              </tr>
                              <tr>
                                <td className="py-3 px-2 text-gray-400">{t('teamNews.item2.mobileLanding')}</td>
                                <td className="py-3 px-2 text-gray-400">{t('teamNews.item2.mobileLandingContent')}</td>
                                <td className="py-3 px-2 text-gray-400">1400</td>
                                <td className="py-3 px-2 text-gray-400">2800</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {activeNewsIndex === 2 && (
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-md font-semibold text-purple-300 mb-2">{t('teamNews.item3.toolFeatures')}</h4>
                        <ul className="space-y-2">
                          <li className="flex items-start text-gray-400">
                            <span className="text-green-400 mr-2">✓</span>
                            <span>{t('teamNews.item3.feature1')}</span>
                          </li>
                          <li className="flex items-start text-gray-400">
                            <span className="text-green-400 mr-2">✓</span>
                            <span>{t('teamNews.item3.feature2')}</span>
                          </li>
                          <li className="flex items-start text-gray-400">
                            <span className="text-green-400 mr-2">✓</span>
                            <span>{t('teamNews.item3.feature3')}</span>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-md font-semibold text-purple-300 mb-2">{t('teamNews.item3.applicationScenarios')}</h4>
                        <p className="text-gray-400">{t('teamNews.item3.scenariosDesc')}</p>
                      </div>
                        
                      <div>
                        <h4 className="text-md font-semibold text-purple-300 mb-2">{t('teamNews.item3.wechatServicePrice')}</h4>
                        <div className="overflow-x-auto">
                          <table className="w-full text-left border-collapse">
                            <thead>
                              <tr className="border-b border-gray-700">
                                <th className="py-3 px-2 text-gray-300">{t('teamNews.item2.serviceItem')}</th>
                                <th className="py-3 px-2 text-gray-300">{t('teamNews.item1.serviceContent')}</th>
                                <th className="py-3 px-2 text-gray-300">AED</th>
                                <th className="py-3 px-2 text-gray-300">RMB</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr className="border-b border-gray-800">
                                <td className="py-3 px-2 text-gray-400">{t('teamNews.item3.wechatOperation')}</td>
                                <td className="py-3 px-2 text-gray-400">{t('teamNews.item3.wechatOperationContent')}</td>
                                <td className="py-3 px-2 text-gray-400">800</td>
                                <td className="py-3 px-2 text-gray-400">1600</td>
                              </tr>
                              <tr className="border-b border-gray-800">
                                <td className="py-3 px-2 text-gray-400">{t('teamNews.item3.wechatDesign')}</td>
                                <td className="py-3 px-2 text-gray-400">{t('teamNews.item3.wechatDesignContent')}</td>
                                <td className="py-3 px-2 text-gray-400">150</td>
                                <td className="py-3 px-2 text-gray-400">300</td>
                              </tr>
                              <tr>
                                <td className="py-3 px-2 text-gray-400">{t('teamNews.item3.wechatMaterials')}</td>
                                <td className="py-3 px-2 text-gray-400">{t('teamNews.item3.wechatMaterialsContent')}</td>
                                <td className="py-3 px-2 text-gray-400">150</td>
                                <td className="py-3 px-2 text-gray-400">300</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex justify-center">
                  <Button onClick={closeNewsDialog} className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-md w-full max-w-xs">
                    {t('common.close')}
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      )}
      
      <MiddleEastGrowthCTA />
    </div>
  )
}