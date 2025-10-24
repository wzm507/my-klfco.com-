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
  const [activeCaseIndex, setActiveCaseIndex] = useState<number | null>(null)
  const [activeNewsIndex, setActiveNewsIndex] = useState<number | null>(null)
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

  const openCaseDialog = (index: number) => {
    setActiveCaseIndex(index)
  }

  const closeCaseDialog = () => {
    setActiveCaseIndex(null)
  }

  const openNewsDialog = (index: number) => {
    setActiveNewsIndex(index)
  }

  const closeNewsDialog = () => {
    setActiveNewsIndex(null)
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

              <a href="#team-news" className="text-gray-300 hover:text-blue-400 transition-colors">
                {t('nav.pricing')}
              </a>
              <a href="#contact" className="text-gray-300 hover:text-purple-400 transition-colors">
                {t('nav.contact')}
              </a>
              <a href="#solutions" className="text-gray-300 hover:text-purple-400 transition-colors">
                {t('nav.services')}
              </a>
              <a href="#products" className="text-gray-300 hover:text-purple-400 transition-colors">
                {t('nav.services')}
              </a>
              <a href="#cases" className="text-gray-300 hover:text-purple-400 transition-colors">
                {t('nav.projects')}
              </a>
              <a href="#news" className="text-gray-300 hover:text-purple-400 transition-colors">
                {t('nav.news')}
              </a>
              
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

                <a href="#team-news" className="block px-3 py-2 text-gray-300 hover:text-blue-400">
                  {t('nav.pricing')}
                </a>
                <a href="#contact" className="block px-3 py-2 text-gray-300 hover:text-purple-400">
                  {t('nav.contact')}
                </a>
                <a href="#solutions" className="block px-3 py-2 text-gray-300 hover:text-purple-400">
                  {t('nav.services')}
                </a>
                <a href="#products" className="block px-3 py-2 text-gray-300 hover:text-purple-400">
                  {t('nav.services')}
                </a>
                <a href="#cases" className="block px-3 py-2 text-gray-300 hover:text-purple-400">
                  {t('nav.projects')}
                </a>
                <a href="#news" className="block px-3 py-2 text-gray-300 hover:text-purple-400">
                  {t('nav.news')}
                </a>
                
                {/* 移动端语言切换按钮 */}
                <Button 
                  onClick={toggleLanguage}
                  variant="secondary"
                  className="w-full mt-2 bg-purple-800 hover:bg-purple-700 text-white border border-purple-600"
                >
                  {language === 'zh' ? 'EN' : '中文'}
                </Button>
                <a href="#news" className="block px-3 py-2 text-gray-300 hover:text-purple-400">
                  资讯
                </a>
                
              </div>
            </div>
          )}

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
                            <Check className="h-5 w-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                            <span>{t('teamNews.item1.service1')}</span>
                          </li>
                          <li className="flex items-start text-gray-400">
                            <Check className="h-5 w-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                            <span>{t('teamNews.item1.service2')}</span>
                          </li>
                          <li className="flex items-start text-gray-400">
                            <Check className="h-5 w-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
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
                            <Check className="h-5 w-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                            <span>{t('teamNews.item2.highlight1')}</span>
                          </li>
                          <li className="flex items-start text-gray-400">
                            <Check className="h-5 w-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                            <span>{t('teamNews.item2.highlight2')}</span>
                          </li>
                          <li className="flex items-start text-gray-400">
                            <Check className="h-5 w-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
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
                            <Check className="h-5 w-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                            <span>{t('teamNews.item3.feature1')}</span>
                          </li>
                          <li className="flex items-start text-gray-400">
                            <Check className="h-5 w-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                            <span>{t('teamNews.item3.feature2')}</span>
                          </li>
                          <li className="flex items-start text-gray-400">
                            <Check className="h-5 w-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
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

      {/* Case Study Detail Dialogs */}
      {activeCaseIndex !== null && (
        <Dialog open={true} onOpenChange={closeCaseDialog}>
          <DialogContent className="bg-gray-900/80 backdrop-blur-md border border-purple-500/30 text-white p-8 rounded-lg text-center max-w-2xl max-h-[90vh] overflow-hidden flex flex-col justify-between" style={{ minHeight: '60vh' }}>
            {
              [
                {
                  company: "《奔跑吧》全球霸屏",
                  industry: "综艺IP出海",
                  challenge: "作为现象级国产综艺，需突破文化差异壁垒，在海外市场建立持续影响力，同时实现商业价值转化，避免 '叫好不叫座'。",
                  solution: "多语种本地化布局：采用12种语言翻译配音，适配东南亚、北美等核心市场文化语境；账号矩阵联动：全网搭建多元社媒账号，覆盖YouTube、Facebook等平台，形成 '主账号+垂类账号' 协同传播模式；定制化运营策略：结合节日、地域特色设计粉丝福利活动，强化用户粘性；数据驱动优化：通过i-TuBi工具筛选高潜力内容，重点推广互动率高的片段。",
                  results: ["海外总曝光量达数百亿", "单集最高播放2400万+", "累积影响粉丝近千万", "品牌赞助收入增长30%+"],
                },
                {
                  company: "爱奇艺全球化社媒矩阵搭建",
                  industry: "视频平台出海",
                  challenge: "作为视频平台，需在海外市场突破Netflix等竞品垄断，触达多元用户群体，同时提升品牌认知度与APP下载转化。",
                  solution: "垂直赛道细分：针对剧集、综艺、动漫等内容类型搭建49个YouTube专属频道，精准覆盖不同受众；本地化内容运营：组建18+语种团队，制作 '高光cut' '幕后花絮' 等短内容；跨平台联动：联动Facebook、TikTok发起话题挑战，引导UGC二次创作；数据工具赋能：通过V-Pulse平台监测用户偏好，定向投放APP下载广告。",
                  results: ["主账号订阅量达590万+", "总曝光10亿+", "最高单视频播放7000万+", "APP海外下载量增长150%"],
                },
                {
                  company: "GAC MOTOR全球品牌破圈",
                  industry: "汽车品牌出海",
                  challenge: "作为中国汽车品牌，需在中东、东南亚等市场打破 '欧美品牌垄断' 认知，提升本地化用户辨识度与购买意愿。",
                  solution: "事件营销借势：绑定世界杯热点，策划 'GAC MOTOR世界杯观赛之旅' 线上活动；本地化社媒运营：开通中东语种社媒账号，发布符合当地文化的内容；线上线下整合：在迪拜、曼谷等核心城市投放户外大屏广告；数据线索沉淀：通过BI工具分析用户互动数据，定向推送试驾预约信息。",
                  results: ["中东消费者品牌辨识度上升51%", "社媒粉丝突破120万+", "年曝光7200万+", "海外销量同比增长40%"],
                },
                {
                  company: "《天官赐福》国漫商业化出海",
                  industry: "国漫IP出海",
                  challenge: "作为国产动画IP，需在海外市场实现 '内容传播+商业变现' 双重目标，打破 '小众圈层' 局限，提升IP长尾价值。",
                  solution: "内容精准分发：通过iVideoForce平台向Netflix、YouTube等渠道分发多语种版本；社媒电商联动：绑定YouTube Shopping功能，在视频中植入周边购买链接；文化元素深挖：提炼IP中的中国传统美学元素，联合海外潮牌推出联名衍生品；用户私域运营：搭建Discord粉丝社区，定期发布角色设定、创作教程。",
                  results: ["海外总播放量破亿", "11个国家Netflix榜单进入TOP10", "衍生品电商访问量上涨226%", "客单价提升41%"],
                },
              ][activeCaseIndex] && (
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
                        {t(`cases.case${activeCaseIndex + 1}.results`).map((result, resultIndex) => (
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
              )
            }
          </DialogContent>
        </Dialog>
      )}



      {/* Case Studies Section */}
      <section id="cases" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30 mb-6">{t('cases.badge')}</Badge>
            <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              {t('cases.title')}
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              {t('cases.description')}
            </p>
          </div>

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
                        {caseStudy.results.map((result, resultIndex) => (
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

      {/* News Section */}
      <section id="news" className="py-24 relative">
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-20">
            <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30 mb-6">{t('news.newsLabel')}</Badge>
            <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              {t('news.latestNews')}
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">{t('news.description')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            { [
              { image: "/Image/XW1/微信图片_20250819102012.jpg" },
              { image: "/Image/XW2/微信图片_20250819101830.jpg" },
              { image: "/Image/XW3/微信图片_20250819103236.png" },
              { image: "/Image/XW4/微信图片_20250819104152.png" },
              { image: "/Image/XW5/微信图片_20250819111920.jpg" },
              { image: "/Image/XW6/微信图片_2025-09-09_154838_287.jpg" },
            ].map((imageObj, index) => {
              // 创建包含多语言内容的文章对象
              const article = {
                category: t(`news.articles.${index}.category`),
                title: t(`news.articles.${index}.title`),
                excerpt: t(`news.articles.${index}.excerpt`),
                date: t(`news.articles.${index}.date`),
                readTime: t(`news.articles.${index}.readTime`),
                image: imageObj.image,
                tags: t(`news.articles.${index}.tags`) || []
              };
              return article;
            }).map((article: any, index: number) => (
              <FadeInOnScroll
                key={index}
                delay={(index % 3) * 150 + Math.floor(index / 3) * 100}
                className="h-full"
              >
                <Card
                  className="bg-gray-900/50 border-gray-800 hover:border-purple-500/50 transition-all duration-500 group hover:scale-105 overflow-hidden h-full"
                >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={article.image || "/placeholder.svg"}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-purple-600/80 text-white">{article.category}</Badge>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-white mb-3 group-hover:text-purple-300 transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-3 leading-relaxed">{article.excerpt}</p>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {article.tags.map((tag, tagIndex) => (
                      <Badge key={tagIndex} variant="outline" className="text-xs border-gray-600 text-gray-400">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                    <span>{article.date}</span>
                    <span>{article.readTime}</span>
                  </div>

                  <Link href={`/news/${index + 1}`} passHref>
                    <Button
                      variant="outline"
                      className="w-full border-purple-500/50 text-purple-300 hover:bg-purple-500/10 bg-transparent"
                    >
                      {t('btn.readMore')}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
              </FadeInOnScroll>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/news" passHref>
                <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 px-8 py-3">
                  {t('btn.viewMore')}
                </Button>
              </Link>
          </div>
        </div>
      </section>



      {/* Team News Section */}
      <section id="team-news" className="py-24 relative">
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
                    <p className="text-gray-400">广州市番禺区基盛中心大厦</p>
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
