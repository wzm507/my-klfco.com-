'use client';

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "@/hooks/use-translation";
import { User as UserIcon, Code, TrendingUp, Palette, Globe, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from 'next/link';

export default function TeamPage() {
  const { t } = useTranslation();
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white py-12 px-4">
      {/* Team Section */}
      <section id="team" className="py-24 relative">
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
          <div className="text-center mb-20">
            <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30 mb-6">{t('team.badge')}</Badge>
            <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              {t('team.title')}
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              {t('team.description')}
            </p>
          </div>

          {/* Team Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {/* Team Member 1 */}
            <Card className="bg-gray-900/50 border-gray-800 hover:border-purple-400/30 transition-all duration-300 hover:shadow-lg hover:shadow-purple-400/5 group">
              <CardContent className="pt-8 pb-6">
                <div className="flex flex-col items-center text-center">
                  <div className="w-24 h-24 rounded-full bg-gray-800 mb-4 perspective-[1000px]" style={{perspective: '1000px'}}>
                    <div className="w-full h-full rounded-full transition-transform duration-500 transform-style-3d group-hover:rotate-y-180" style={{transformStyle: 'preserve-3d'}}>
                      {/* Front: Icon */}
                      <div className="absolute w-full h-full rounded-full bg-gray-800 flex items-center justify-center backface-hidden" style={{backfaceVisibility: 'hidden'}}>
                        <UserIcon className="h-12 w-12 text-purple-300" />
                      </div>
                      {/* Back: Image */}
                      <div className="absolute w-full h-full rounded-full flex items-center justify-center backface-hidden transform-rotate-y-180" style={{backfaceVisibility: 'hidden', transform: 'rotateY(180deg)'}}>
                        <img src="/CY/bfff7bc074b84d13caef1cb5b883e3de.jpg" alt={t('team.member1.name')} className="w-full h-full rounded-full object-cover" />
                      </div>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-1">{t('team.member1.name')}</h3>
                  <p className="text-purple-300 mb-3">{t('team.member1.position')}</p>
                  <p className="text-gray-400 text-sm">
                    {t('team.member1.description')}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Team Member 2 */}
            <Card className="bg-gray-900/50 border-gray-800 hover:border-blue-400/30 transition-all duration-300 hover:shadow-lg hover:shadow-blue-400/5 group">
              <CardContent className="pt-8 pb-6">
                <div className="flex flex-col items-center text-center">
                  <div className="w-24 h-24 rounded-full bg-gray-800 mb-4 perspective-[1000px]" style={{perspective: '1000px'}}>
                    <div className="w-full h-full rounded-full transition-transform duration-500 transform-style-3d group-hover:rotate-y-180" style={{transformStyle: 'preserve-3d'}}>
                      {/* Front: Icon */}
                      <div className="absolute w-full h-full rounded-full bg-gray-800 flex items-center justify-center backface-hidden" style={{backfaceVisibility: 'hidden'}}>
                        <Code className="h-12 w-12 text-blue-300" />
                      </div>
                      {/* Back: Image */}
                      <div className="absolute w-full h-full rounded-full flex items-center justify-center backface-hidden transform-rotate-y-180" style={{backfaceVisibility: 'hidden', transform: 'rotateY(180deg)'}}>
                        <img src="/CY/bfff7bc074b84d13caef1cb5b883e3de.jpg" alt={t('team.member2.name')} className="w-full h-full rounded-full object-cover" />
                      </div>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-1">{t('team.member2.name')}</h3>
                  <p className="text-blue-300 mb-3">{t('team.member2.position')}</p>
                  <p className="text-gray-400 text-sm">
                    {t('team.member2.description')}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Team Member 3 */}
            <Card className="bg-gray-900/50 border-gray-800 hover:border-green-400/30 transition-all duration-300 hover:shadow-lg hover:shadow-green-400/5 group">
              <CardContent className="pt-8 pb-6">
                <div className="flex flex-col items-center text-center">
                  <div className="w-24 h-24 rounded-full bg-gray-800 mb-4 perspective-[1000px]" style={{perspective: '1000px'}}>
                    <div className="w-full h-full rounded-full transition-transform duration-500 transform-style-3d group-hover:rotate-y-180" style={{transformStyle: 'preserve-3d'}}>
                      {/* Front: Icon */}
                      <div className="absolute w-full h-full rounded-full bg-gray-800 flex items-center justify-center backface-hidden" style={{backfaceVisibility: 'hidden'}}>
                        <TrendingUp className="h-12 w-12 text-green-300" />
                      </div>
                      {/* Back: Image */}
                      <div className="absolute w-full h-full rounded-full flex items-center justify-center backface-hidden transform-rotate-y-180" style={{backfaceVisibility: 'hidden', transform: 'rotateY(180deg)'}}>
                        <img src="/CY/robin.jpg" alt={t('team.member3.name')} className="w-full h-full rounded-full object-cover" />
                      </div>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-1">{t('team.member3.name')}</h3>
                  <p className="text-green-300 mb-3">{t('team.member3.position')}</p>
                  <p className="text-gray-400 text-sm">
                    {t('team.member3.description')}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Team Member 4 */}
            <Card className="bg-gray-900/50 border-gray-800 hover:border-amber-400/30 transition-all duration-300 hover:shadow-lg hover:shadow-amber-400/5 group">
              <CardContent className="pt-8 pb-6">
                <div className="flex flex-col items-center text-center">
                  <div className="w-24 h-24 rounded-full bg-gray-800 mb-4 perspective-[1000px]" style={{perspective: '1000px'}}>
                    <div className="w-full h-full rounded-full transition-transform duration-500 transform-style-3d group-hover:rotate-y-180" style={{transformStyle: 'preserve-3d'}}>
                      {/* Front: Icon */}
                      <div className="absolute w-full h-full rounded-full bg-gray-800 flex items-center justify-center backface-hidden" style={{backfaceVisibility: 'hidden'}}>
                        <Palette className="h-12 w-12 text-amber-300" />
                      </div>
                      {/* Back: Image */}
                      <div className="absolute w-full h-full rounded-full flex items-center justify-center backface-hidden transform-rotate-y-180" style={{backfaceVisibility: 'hidden', transform: 'rotateY(180deg)'}}>
                        <img src="/CY/bfff7bc074b84d13caef1cb5b883e3de.jpg" alt={t('team.member4.name')} className="w-full h-full rounded-full object-cover" />
                      </div>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-1">{t('team.member4.name')}</h3>
                  <p className="text-amber-300 mb-3">{t('team.member4.position')}</p>
                  <p className="text-gray-400 text-sm">
                    {t('team.member4.description')}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Team Member 5 */}
            <Card className="bg-gray-900/50 border-gray-800 hover:border-rose-400/30 transition-all duration-300 hover:shadow-lg hover:shadow-rose-400/5 group">
              <CardContent className="pt-8 pb-6">
                <div className="flex flex-col items-center text-center">
                  <div className="w-24 h-24 rounded-full bg-gray-800 mb-4 perspective-[1000px]" style={{perspective: '1000px'}}>
                    <div className="w-full h-full rounded-full transition-transform duration-500 transform-style-3d group-hover:rotate-y-180" style={{transformStyle: 'preserve-3d'}}>
                      {/* Front: Icon */}
                      <div className="absolute w-full h-full rounded-full bg-gray-800 flex items-center justify-center backface-hidden" style={{backfaceVisibility: 'hidden'}}>
                        <Globe className="h-12 w-12 text-rose-300" />
                      </div>
                      {/* Back: Image */}
                      <div className="absolute w-full h-full rounded-full flex items-center justify-center backface-hidden transform-rotate-y-180" style={{backfaceVisibility: 'hidden', transform: 'rotateY(180deg)'}}>
                        <img src="/CY/bfff7bc074b84d13caef1cb5b883e3de.jpg" alt={t('team.member5.name')} className="w-full h-full rounded-full object-cover" />
                      </div>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-1">{t('team.member5.name')}</h3>
                  <p className="text-rose-300 mb-3">{t('team.member5.position')}</p>
                  <p className="text-gray-400 text-sm">
                    {t('team.member5.description')}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}