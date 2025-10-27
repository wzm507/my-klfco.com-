"use client"

import { useState, useEffect, useRef } from "react"
import Link from 'next/link'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell } from 'recharts'
import { ChartTooltipContent } from '@/components/ui/chart'
import DynamicChart from '@/components/ui/chart-dynamic'
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FadeInOnScroll } from "../components/FadeInOnScroll"
import { useTranslation } from "../hooks/use-translation"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  ArrowRight,
  Menu,
  X,
  Star,
  Users,
  TrendingUp,
  Shield,
  Zap,
  Globe,
  Brain,
  Sparkles,
  Check,
  Mail,
  Phone,
  MapPin,
  Building2,
  Heart,
  GraduationCap,
  Banknote,
  ShoppingCart,
  Car,
  MessageSquare,
  Code,
  Search,
  UserPlus,
} from "lucide-react"

export default function ModernWebsite() {
  // 表单状态
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<'success' | 'error' | null>(null);
  const [statusMessage, setStatusMessage] = useState('');

  // 表单提交处理
  const handleSubmit = async () => {
    // 简单验证
    if (!formData.name || !formData.email || !formData.message) {
      setStatus('error');
      setStatusMessage('请填写必填字段');
      return;
    }

    setIsSubmitting(true);
    setStatus(null);
    setStatusMessage('');

    try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

      const data = await response.json();

      if (data.success) {
        setStatus('success');
        setStatusMessage('消息发送成功，我们会尽快与您联系');
        // 重置表单
        setFormData({
          name: '',
          email: '',
          company: '',
          message: '',
        });
      } else {
        setStatus('error');
        setStatusMessage(data.message || '消息发送失败，请稍后再试');
      }
    } catch (error) {
      setStatus('error');
      setStatusMessage('网络错误，请稍后再试');
      console.error('提交表单时出错:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const { t, toggleLanguage, language } = useTranslation()
  
  // AI搜索状态
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResult, setSearchResult] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const [searchError, setSearchError] = useState('')
  const [showResult, setShowResult] = useState(false)
  
  // 注意：现在AI搜索功能已通过API调用实现，不再使用本地模拟知识库数据
  // 搜索功能将调用 '/api/ai-search' 路由，该路由负责连接到ima知识库API（在模拟环境中使用模拟数据）
  
  // 处理AI搜索请求
  const handleAISearch = async () => {
    if (!searchQuery.trim()) {
      return;
    }
    
    setIsSearching(true);
    setSearchError('');
    setShowResult(false);
    
    try {
      // 调用AI搜索API
      const response = await fetch('/api/ai-search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: searchQuery, language: language }),
      });
      
      const data = await response.json();
      
      if (data.success && data.data) {
        setSearchResult(data.data.answer);
      } else {
        setSearchError(data.message || '搜索失败，请稍后再试');
        setSearchResult(`\n无法获取答案，错误信息：${data.message || '未知错误'}`);
      }
    } catch (error) {
      console.error('AI搜索请求失败:', error);
      setSearchError('网络错误，请稍后再试');
      setSearchResult(`\n搜索过程中发生错误，请检查网络连接后重试。`);
    } finally {
      setShowResult(true);
      setIsSearching(false);
    }
  }



  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const features = [
    {
      icon: Brain,
      title: t('features.aiAgents.title'),
      description: t('features.aiAgents.description'),
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: TrendingUp,
      title: t('features.digitalMarketing.title'),
      description: t('features.digitalMarketing.description'),
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: Heart,
      title: t('features.agentIP.title'),
      description: t('features.agentIP.description'),
      gradient: "from-green-500 to-emerald-500",
    },
    {
      icon: Banknote,
      title: t('features.tokenization.title'),
      description: t('features.tokenization.description'),
      gradient: "from-orange-500 to-red-500",
    },
    {
      icon: Building2,
      title: t('features.crm.title'),
      description: t('features.crm.description'),
      gradient: "from-indigo-500 to-purple-500",
    },
    {
      icon: GraduationCap,
      title: t('features.fullStack.title'),
      description: t('features.fullStack.description'),
      gradient: "from-pink-500 to-rose-500",
    },
  ]

  const testimonials = [
    {
      name: "汪洋",
      role: "房地产开发商",
      company: "",
      content: "迪拜房产网站定制 + 专属 IP 运营，塑造专业 IP，引爆品牌与转化",
      avatar: "/KHDCGGS/w.jpg",
    },
    {
      name: "Mary",
      role: "房地产开发商及个人品牌 CEO",
      company: "",
      content: "个人品牌房产网站定制 + 高阶 IP 运营，构建 IP 矩阵，彰显领军者影响力",
      avatar: "/KHDCGGS/m.jpg",
    },
    {
      name: "Dabie",
      role: "香港大宝珠宝",
      company: "",
      content: "专属高端珠宝个人 IP 打造 + 全域运营，树立行业标杆，跃升品牌价值",
      avatar: "/KHDCGGS/d.jpg",
    },
  ]

  const pricingPlans = [
    {
      name: "基础版",
      price: "免费",
      period: "",
      description: "适合个人用户和小团队",
      features: ["5个项目", "基础功能", "邮件支持", "1GB 存储空间"],
      popular: false,
    },
    {
      name: "专业版",
      price: "¥99",
      period: "/月",
      description: "适合成长中的企业",
      features: ["无限项目", "高级功能", "优先支持", "100GB 存储空间", "团队协作", "数据分析"],
      popular: true,
    },
    {
      name: "企业版",
      price: "¥299",
      period: "/月",
      description: "适合大型企业",
      features: ["所有功能", "24/7 专属支持", "无限存储", "高级安全", "定制集成", "专属客户经理"],
      popular: false,
    },
  ]


  // 在 ModernWebsite 组件内部添加滚动函数
  const scrollToFeatures = () => {
    const featuresSection = document.getElementById("features")
    if (featuresSection) {
      featuresSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  }

  return (
    <div className="min-h-screen bg-[#030014] text-white">
      {/* Navigation */}
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrollY > 50 ? "bg-black/80 backdrop-blur-md" : "bg-transparent"
        }`}
      >
        <div className="w-full px-4 sm:px-6 lg:px-8 bg-[#020013] backdrop-blur-lg">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <img
                src="/llllogo.png"
                alt="KLF Logo"
                className="h-10"
              />
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#home" className="text-gray-300 hover:text-purple-400 transition-colors">
                {t('nav.home')}
              </a>
              <a href="#features" className="text-gray-300 hover:text-purple-400 transition-colors">
                {t('nav.services')}
              </a>

              <Link href="/pricing" className="text-gray-300 hover:text-blue-400 transition-colors cursor-pointer">
                {t('nav.pricing')}
              </Link>
              <a href="#contact" className="text-gray-300 hover:text-purple-400 transition-colors">
                {t('nav.contact')}
              </a>
              <Link href="/cases" className="text-gray-300 hover:text-purple-400 transition-colors">
                {t('nav.projects')}
              </Link>
              <Link href="/news" className="text-gray-300 hover:text-purple-400 transition-colors">
                {t('nav.news')}
              </Link>
              
              {/* 语言切换按钮 */}
              <Button 
                onClick={toggleLanguage}
                variant="secondary"
                className="ml-4 bg-purple-800 hover:bg-purple-700 text-white border border-purple-600"
              >
                {language === 'zh' ? 'EN' : '中文'}
              </Button>
              
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <Button variant="ghost" size="sm" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden bg-black/90 backdrop-blur-md">
              <div className="px-2 pt-2 pb-3 space-y-1">
                <a href="#home" className="block px-3 py-2 text-gray-300 hover:text-purple-400">
                {t('nav.home')}
              </a>
              <a href="#features" className="block px-3 py-2 text-gray-300 hover:text-purple-400">
                {t('nav.services')}
              </a>

              <Link href="/pricing" className="block px-3 py-2 text-gray-300 hover:text-blue-400 cursor-pointer">
                {t('nav.pricing')}
              </Link>
              <a href="#contact" className="block px-3 py-2 text-gray-300 hover:text-purple-400">
                {t('nav.contact')}
              </a>
              <Link href="/cases" className="block px-3 py-2 text-gray-300 hover:text-purple-400">
                {t('nav.projects')}
              </Link>
              <Link href="/news" className="block px-3 py-2 text-gray-300 hover:text-purple-400">
                  资讯
                </Link>
                
                {/* 移动端语言切换按钮 */}
                <Button 
                  onClick={toggleLanguage}
                  variant="secondary"
                  className="w-full mt-2 bg-purple-800 hover:bg-purple-700 text-white border border-purple-600"
                >
                  {language === 'zh' ? 'EN' : '中文'}
                </Button>
                
              </div>
            </div>
          )}

      {/* Business News Detail Dialog removed and moved to /pricing page */}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Hero Background Video */}
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          playsInline
          loop
        >
          <source src="/bnner/无水印.mp4" type="video/mp4" />
        </video>

        {/* Black Overlay with 60% opacity */}
        <div className="absolute inset-0 bg-black/60"></div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 mt-[210px]">
          {/* 文本容器 */}
          <div className="text-center mb-16 transform -translate-y-[40px] md:-translate-y-[50px] lg:-translate-y-[60px]">
            <div className="mb-4 md:mb-8 lg:mb-16"></div>

            <h1 className="text-[clamp(1.8rem,4vw,2.5rem)] md:text-5xl lg:text-6xl font-extrabold mb-6 md:mb-8 lg:mb-10 leading-tight md:leading-tight lg:leading-tight flex items-center justify-center gap-1 tracking-wide opacity-0 transition-opacity duration-1000 ease-in-out" id="hero-title">
              <span className="text-white transition-all duration-300 hover:text-purple-200">
                  {t('hero.title')}
                </span>
            </h1>

            <p className="text-[clamp(1.25rem,2.5vw,1.75rem)] text-white font-light mb-8 md:mb-12 lg:mb-20 max-w-5xl mx-auto text-center drop-shadow-[0_0_15px_rgba(168,85,247,0.5)] tracking-wide leading-relaxed opacity-0 transition-opacity duration-1000 ease-in-out" id="hero-subtitle">
              {t('hero.subtitle')}
            </p>
            
            <script dangerouslySetInnerHTML={{ __html: `
              // 在视频播放1.5秒后显示标题文本
              setTimeout(() => {
                document.getElementById('hero-title').style.opacity = '1';
                // 稍微延迟一点显示副标题，创造层次感
                setTimeout(() => {
                  document.getElementById('hero-subtitle').style.opacity = '1';
                }, 300);
              }, 1500);
            ` }} />

            {/* AI搜索框 */}
            <div className="max-w-3xl mx-auto mb-16">
              <div className="bg-black/40 backdrop-blur-md p-6 rounded-xl border border-purple-500/30">
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder={t('aiDialog.placeholder')} 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleAISearch()}
                    className="w-full px-4 py-3 pr-12 rounded-lg bg-gray-800/70 border border-gray-700 focus:border-purple-500 focus:outline-none text-white placeholder-gray-500"
                    disabled={isSearching}
                  />
                  <button 
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-purple-600 hover:bg-purple-700 text-white p-2 rounded-lg transition-colors"
                    onClick={handleAISearch}
                    disabled={isSearching || !searchQuery.trim()}
                  >
                    {isSearching ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <Search className="h-5 w-5" />
                    )}
                  </button>
                </div>
                <p className="text-xs text-gray-400 mt-3 text-center">{t('aiDialog.example')}</p>
              </div>
            </div>
          </div>

          {/* 搜索结果展示区 */}
          {(showResult || isSearching) && (
            <div className="max-w-3xl mx-auto mb-16">
              <div className={`bg-black/40 backdrop-blur-md p-6 rounded-xl border ${isSearching ? 'border-purple-500/30' : searchError ? 'border-red-500/30' : 'border-green-500/30'} transition-all duration-300 animate-fade-in`}>
                <h4 className="text-lg font-bold mb-4 text-center 
                  {isSearching ? 'text-purple-300' : 
                   searchError ? 'text-red-300' : 'text-green-300'}">
                  {isSearching ? t('aiDialog.searching') : 
                   searchError ? t('aiDialog.error') : t('aiDialog.results')}
                </h4>
                
                {isSearching ? (
                  <div className="flex justify-center py-8">
                    <div className="w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                ) : searchError ? (
                  <div className="text-center text-red-300 py-4">
                    {searchError}
                  </div>
                ) : (
                  <div className="bg-gray-900/70 p-4 rounded-lg border border-gray-800 text-gray-300 leading-relaxed whitespace-pre-line">
                    {searchResult || t('aiDialog.noResult')}
                  </div>
                )}
                
                {showResult && !isSearching && (
                  <div className="mt-4 flex justify-center">
                    <button 
                      className="text-sm text-purple-300 hover:text-purple-200 transition-colors"
                      onClick={() => {
                        setShowResult(false);
                        setSearchResult('');
                        setSearchError('');
                      }}
                    >
                      清空结果
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* 与背景框保持20像素距离的按钮 */}

          <div className="flex justify-center">
            <button
              onClick={scrollToFeatures}
              className="text-purple-400 animate-bounce hover:text-purple-300 transition-colors cursor-pointer p-2 rounded-full hover:bg-purple-500/10"
              aria-label="滚动到功能介绍"
            >
            </button>
          </div>
        </div>
      </section>




      {/* Stats Section */}
      <section className="py-24 relative">
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center">
            {[
              { number: "50+", label: t('stats.projects'), icon: Building2 },
              { number: "40%", label: t('stats.conversionRate'), icon: TrendingUp },
              { number: "7×24", label: t('stats.support'), icon: Shield },
            ].map((stat, index) => (
              <FadeInOnScroll 
                key={index} 
                delay={index * 200}
                className="flex flex-col items-center group"
              >
                <div className="mb-6 flex justify-center items-center">
                  <stat.icon className="w-16 h-16 text-white stroke-1" strokeWidth={1} />
                </div>
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-3 text-center">
                  {stat.number}
                </div>
                <div className="text-gray-400 group-hover:text-gray-300 transition-colors text-lg text-center">
                  {stat.label}
                </div>
              </FadeInOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20 mt-[-30px]">
            <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30 mb-6">{t('features.badge')}</Badge>
            <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              {t('features.title')}
            </h2>
            <p className="text-[clamp(1rem,1.5vw,1.25rem)] text-gray-400 max-w-4xl mx-auto leading-relaxed">
              {t('features.description')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FadeInOnScroll
                key={index}
                delay={index * 150}
                className="h-full"
              >
                <Card
                  className="bg-gray-900/50 border-gray-800 hover:border-purple-500/50 transition-all duration-500 group hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25 relative overflow-hidden h-full"
                >
                <CardContent className="p-8 relative z-10">
                  <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-purple-300 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 transition-all duration-500 ease-in-out text-gray-300 leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
                <div className="absolute bottom-6 right-6 z-0">
                  <feature.icon className="w-12 h-12 text-white stroke-1 group-hover:text-white/20 transition-colors duration-300" strokeWidth={1} />
                </div>
              </Card>
              </FadeInOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section id="solutions" className="py-24 relative">
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-20">
            <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30 mb-6">{t('solutions.badge')}</Badge>
            <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              {t('solutions.mainTitle')}
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">{t('solutions.description')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
              icon: UserPlus,
              title: t('solutions.agentIPIncubation.title'),
              description: t('solutions.agentIPIncubation.description'),
              benefits: t('solutions.agentIPIncubation.benefits'),
              industries: t('solutions.agentIPIncubation.industries'),
            },
            {
              icon: Building2,
              title: t('solutions.dubaiPropertyTokenization.title'),
              description: t('solutions.dubaiPropertyTokenization.description'),
              benefits: t('solutions.dubaiPropertyTokenization.benefits'),
              industries: t('solutions.dubaiPropertyTokenization.industries'),
            },
            { icon: Code,
              title: t('solutions.propertyWebsite.title'),
              description: t('solutions.propertyWebsite.description'),
              benefits: t('solutions.propertyWebsite.benefits'),
              industries: t('solutions.propertyWebsite.industries'),
            },
            { icon: MessageSquare,
              title: t('solutions.officialAccount.title'),
              description: t('solutions.officialAccount.description'),
              benefits: t('solutions.officialAccount.benefits'),
              industries: t('solutions.officialAccount.industries'),
            },
            { icon: Brain,
              title: t('solutions.aiAgents.title'),
              description: t('solutions.aiAgents.description'),
              benefits: t('solutions.aiAgents.benefits'),
              industries: t('solutions.aiAgents.industries'),
            },
              { icon: Users,
                title: t('solutions.joinUs.title'),
                description: t('solutions.joinUs.description'),
                benefits: t('solutions.joinUs.benefits'),
                industries: t('solutions.joinUs.industries'),
              },
            ].map((solution, index) => (
              <FadeInOnScroll
                key={index}
                delay={(index % 3) * 200 + Math.floor(index / 3) * 100}
                className="h-full"
              >
                <Card
                  className="bg-gray-900/50 border-gray-800 hover:border-purple-500/50 transition-all duration-500 group hover:scale-105 h-full"
                >
                <CardContent className="p-6 flex-grow flex flex-col">
                  <solution.icon className="w-12 h-12 text-white mb-4 stroke-1" strokeWidth={1} />
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors">
                    {solution.title}
                  </h3>
                  <p className="text-gray-400 mb-4 leading-relaxed">{solution.description}</p>
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-purple-300 mb-2">{t('solutions.coreAdvantages')}</h4>
                    <div className="grid grid-cols-2 gap-1">
                      {solution.benefits.map((benefit, benefitIndex) => (
                        <div key={benefitIndex} className="flex items-center text-xs text-gray-400">
                          <Check className="h-3 w-3 text-green-400 mr-1" />
                          {benefit}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-purple-300 mb-2">{t('solutions.applicableIndustries')}</h4>
                    <div className="flex flex-wrap gap-1">
                      {solution.industries.map((industry, industryIndex) => (
                        <Badge key={industryIndex} variant="outline" className="text-xs border-gray-600 text-gray-300">
                          {industry}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    className="w-full border-purple-500/50 text-purple-300 hover:bg-purple-500/10 bg-transparent"
                    onClick={() => setIsDialogOpen(true)}
                  >
                    {t('solutions.consultSolution')}
                  </Button>
                </CardContent>
              </Card>
              </FadeInOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Dialog for 咨询方案 */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-gray-900/80 backdrop-blur-md border border-purple-500/30 text-white p-8 rounded-lg text-center">
          <div className="flex items-center justify-center space-x-2 mb-6">
            <Phone className="h-5 w-5 text-purple-300" />
            <p className="text-xl text-gray-200">+86 158 1814 4194</p>
          </div>
          <p className="text-gray-400 mb-8 max-w-md mx-auto">
            {t('solutions.contactUsMessage')}
          </p>
          <div className="flex justify-center">
            <Button onClick={() => setIsDialogOpen(false)} className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-md w-full max-w-xs">
              {t('common.close')}
            </Button>
          </div>
        </DialogContent>
      </Dialog>












      {/* Team News Section removed and moved to /pricing page */}

      {/* Contact Section */}
      <section id="contact" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30 mb-6">{t('contact.badge')}</Badge>
            <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              {t('contact.title')}
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              {t('contact.description')}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-white">{t('contactForm.title')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">{t('contactForm.name')}</label>
                    <Input
                      placeholder={t('contactForm.namePlaceholder')}
                      className="bg-gray-800 border-gray-700 text-white"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">{t('contactForm.email')}</label>
                    <Input
                      type="email"
                      placeholder={t('contactForm.emailPlaceholder')}
                      className="bg-gray-800 border-gray-700 text-white"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">{t('contactForm.company')}</label>
                  <Input
                    placeholder={t('contactForm.companyPlaceholder')}
                    className="bg-gray-800 border-gray-700 text-white"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  />                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">{t('contactForm.message')}</label>
                  <Textarea
                    placeholder={t('contactForm.messagePlaceholder')}
                    rows={4}
                    className="bg-gray-800 border-gray-700 text-white"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />                </div>
                <Button
                  className={`w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? t('contactForm.submitting') : t('contactForm.submit')}
                </Button>
                {statusMessage && (
                  <div className={`text-center ${status === 'success' ? 'text-green-500' : 'text-red-500'} mt-4`}>
                    {t(status === 'success' ? 'contactForm.successMessage' : 'contactForm.errorMessage')}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Contact Info */}
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center">
                  <Mail className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">{t('contactInfo.email.title')}</h3>
                  <p className="text-gray-400">Robin@klfco.com</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center">
                  <Phone className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">{t('contactInfo.phone.title')}</h3>
                  <p className="text-gray-400">+86 158-1886-1497</p>
                  <p className="text-gray-400">{t('contactInfo.phone.hours')}</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center">
                    <MapPin className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">{t('contactInfo.address.title')}</h3>
                    <p className="text-gray-400">{t('contactInfo.address.location')}</p>
                  </div>
                </div>


            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <img 
                  src="/llllogo.png" 
                  alt="KLF Logo" 
                  className="h-[45px] object-contain" 
                  style={{ height: 'calc(3rem * 0.94)' }}
                />
                <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  KLF STUDIO
                </div>
              </div>
              <p className="text-gray-400 mb-6 max-w-md">
                {t('footer.description')}
              </p>
              <div className="flex space-x-4">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                        size="sm"
                        variant="outline"
                        className="border-gray-700 text-gray-400 hover:text-white bg-transparent"
                      >
                        {t('footer.wechat')}
                      </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-gray-900 border-gray-800 text-white max-w-xs">
                    <DialogHeader>
                      <DialogTitle className="text-center text-white">{t('footer.scanQR')}</DialogTitle>
                    </DialogHeader>
                    <div className="flex justify-center items-center p-4">
                      <img 
                        src="/Image/ewm/ewm.png" 
                        alt="微信二维码" 
                        className="max-w-full h-auto rounded-md shadow-lg"
                      />
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-6 text-white">{t('footer.coreBusiness')}</h3>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                      {t('footer.agentIP')}
                    </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                      {t('footer.realEstateCRM')}
                    </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                      {t('footer.tokenizationService')}
                    </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                      {t('footer.socialMedia')}
                    </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-6 text-white">{t('footer.customerSupport')}</h3>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                      {t('footer.helpCenter')}
                    </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                      {t('footer.caseLibrary')}
                    </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                      {t('footer.businessCooperation')}
                    </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                      {t('nav.contact')}
                    </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">{t('footer.copyright')}</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-purple-400 text-sm transition-colors">
                {t('footer.privacyPolicy')}
              </a>
              <a href="#" className="text-gray-400 hover:text-purple-400 text-sm transition-colors">
                {t('footer.termsOfService')}
              </a>
              <a href="#" className="text-gray-400 hover:text-purple-400 text-sm transition-colors">
                {t('footer.cookiePolicy')}
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
