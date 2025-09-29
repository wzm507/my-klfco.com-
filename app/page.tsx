"use client"

import { useState, useEffect, useRef } from "react"
import Link from 'next/link'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell } from 'recharts'
import { ChartTooltipContent } from '@/components/ui/chart'
import DynamicChart from '@/components/ui/chart-dynamic'
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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
        body: JSON.stringify({ query: searchQuery }),
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
      title: "AI智能体开发应用",
      description: "开发定制化AI智能体（AI Agents），应用于中东地产客户咨询、楼盘推荐、交易流程自动化等场景，提升服务效率与精准度。",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: TrendingUp,
      title: "中东地产数字营销定位",
      description: "专注为中东（沙特、阿联酋迪拜）房地产开发商、经纪人及政府部门提供定制化数字营销解决方案，覆盖地产科技全链条服务",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: Heart,
      title: "房产经纪人IP孵化",
      description: "打造中东房地产经纪人个人品牌IP，提供从形象定位、内容策划到社交媒体矩阵运营的一站式包装服务，提升专业影响力与客户信任度",
      gradient: "from-green-500 to-emerald-500",
    },
    {
      icon: Banknote,
      title: "迪拜房产代币化技术",
      description: "通过区块链技术实现迪拜房产资产代币化（Real Estate Tokenization），为开发商提供新型融资渠道，为投资者创造碎片化产权交易机会",
      gradient: "from-orange-500 to-red-500",
    },
    {
      icon: Building2,
      title: "迪拜房产CRM系统",
      description: "专为迪拜及中东地产商设计的智能CRM系统，整合客户管理、房源追踪、交易数据分析功能，实现精细化运营与销售转化提升",
      gradient: "from-indigo-500 to-purple-500",
    },
    {
      icon: GraduationCap,
      title: "全栈技术营销方案",
      description: "提供\"科技+营销\"全栈支持，覆盖社交媒体推广、区块链资产化、AI工具开发、数据化客户管理，助力中东地产客户降本增效",
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
      category: '项目进展',
      date: '2025-09-15',
      title: 'IP运营新项目启动，覆盖中东市场',
      summary: '我们的IP运营团队已启动面向中东市场的全新项目，专注于内容IP的本地化运营和商业变现，将为客户提供全方位的IP增值服务。'
    },
    {
      imageUrl: '/WMDYWDT/web.png',
      category: '项目进展',
      date: '2025-09-10',
      title: '响应式网站设计系统全面升级',
      summary: '我们的网站设计团队完成了系统升级，新系统支持多终端自适应，提升了页面加载速度和用户体验，同时简化了后台管理流程。'
    },
    {
      imageUrl: '/WMDYWDT/gzh.png',
      category: '项目进展',
      date: '2025-09-05',
      title: '公众号运营数据分析工具正式上线',
      summary: '我们自主研发的公众号运营数据分析工具已正式上线，该工具能提供精准的用户画像和内容效果分析，帮助客户提升公众号运营效率。'
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
                首页
              </a>
              <a href="#features" className="text-gray-300 hover:text-purple-400 transition-colors">
                功能
              </a>
              <a href="#testimonials" className="text-gray-300 hover:text-purple-400 transition-colors">
                客户评价
              </a>
              <a href="#team-news" className="text-gray-300 hover:text-blue-400 transition-colors">
                价格
              </a>
              <a href="#contact" className="text-gray-300 hover:text-purple-400 transition-colors">
                联系我们
              </a>
              <a href="#solutions" className="text-gray-300 hover:text-purple-400 transition-colors">
                解决方案
              </a>
              <a href="#products" className="text-gray-300 hover:text-purple-400 transition-colors">
                产品
              </a>
              <a href="#cases" className="text-gray-300 hover:text-purple-400 transition-colors">
                案例
              </a>
              <a href="#news" className="text-gray-300 hover:text-purple-400 transition-colors">
                资讯
              </a>
              
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button 
                className="inline-flex items-center justify-center h-8 px-3 rounded-md text-sm font-medium hover:bg-gray-800 text-white"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden bg-black/90 backdrop-blur-md">
              <div className="px-2 pt-2 pb-3 space-y-1">
                <a href="#home" className="block px-3 py-2 text-gray-300 hover:text-purple-400">
                  首页
                </a>
                <a href="#features" className="block px-3 py-2 text-gray-300 hover:text-purple-400">
                  功能
                </a>
                <a href="#testimonials" className="block px-3 py-2 text-gray-300 hover:text-purple-400">
                  客户评价
                </a>
                <a href="#team-news" className="block px-3 py-2 text-gray-300 hover:text-blue-400">
                  价格
                </a>
                <a href="#contact" className="block px-3 py-2 text-gray-300 hover:text-purple-400">
                  联系我们
                </a>
                <a href="#solutions" className="block px-3 py-2 text-gray-300 hover:text-purple-400">
                  解决方案
                </a>
                <a href="#products" className="block px-3 py-2 text-gray-300 hover:text-purple-400">
                  产品
                </a>
                <a href="#cases" className="block px-3 py-2 text-gray-300 hover:text-purple-400">
                  案例
                </a>
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
              <div className="space-y-6">
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
                  <h4 className="text-lg font-semibold text-blue-300 mb-4">项目详情</h4>
                  <p className="text-gray-300 mb-6">
                    {teamNews[activeNewsIndex].summary}
                  </p>
                  
                  {/* 根据不同的业务动态显示更详细的信息 */}
                  {activeNewsIndex === 0 && (
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-md font-semibold text-purple-300 mb-2">项目背景</h4>
                        <p className="text-gray-400">随着中东市场对优质内容需求的增长，我们针对当地文化特点和用户习惯，精心策划了这套IP运营方案，旨在帮助客户实现品牌出海和商业价值最大化。</p>
                      </div>
                      <div>
                        <h4 className="text-md font-semibold text-purple-300 mb-2">核心服务</h4>
                        <ul className="space-y-2">
                          <li className="flex items-start text-gray-400">
                            <Check className="h-5 w-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                            <span>IP内容本地化翻译与文化适配</span>
                          </li>
                          <li className="flex items-start text-gray-400">
                            <Check className="h-5 w-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                            <span>社交媒体矩阵运营与粉丝增长</span>
                          </li>
                          <li className="flex items-start text-gray-400">
                            <Check className="h-5 w-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                            <span>商业变现渠道搭建与优化</span>
                          </li>
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="text-md font-semibold text-purple-300 mb-2">IP运营套餐</h4>
                        <div className="overflow-x-auto">
                          <table className="w-full text-left border-collapse">
                            <thead>
                              <tr className="border-b border-gray-700">
                                <th className="py-3 px-2 text-gray-300">套餐名称</th>
                                <th className="py-3 px-2 text-gray-300">服务内容</th>
                                <th className="py-3 px-2 text-gray-300">AED</th>
                                <th className="py-3 px-2 text-gray-300">RMB</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr className="border-b border-gray-800">
                                <td className="py-3 px-2 text-gray-400">基础套餐</td>
                                <td className="py-3 px-2 text-gray-400">10分钟视频，包含策划、脚本、剪辑</td>
                                <td className="py-3 px-2 text-gray-400">5000</td>
                                <td className="py-3 px-2 text-gray-400">10000</td>
                              </tr>
                              <tr className="border-b border-gray-800">
                                <td className="py-3 px-2 text-gray-400">标准套餐</td>
                                <td className="py-3 px-2 text-gray-400">30分钟视频，包含策划、脚本、剪辑</td>
                                <td className="py-3 px-2 text-gray-400">13500</td>
                                <td className="py-3 px-2 text-gray-400">27000</td>
                              </tr>
                              <tr className="border-b border-gray-800">
                                <td className="py-3 px-2 text-gray-400">高级套餐</td>
                                <td className="py-3 px-2 text-gray-400">50分钟视频，包含策划、脚本、剪辑</td>
                                <td className="py-3 px-2 text-gray-400">20000</td>
                                <td className="py-3 px-2 text-gray-400">40000</td>
                              </tr>
                              <tr>
                                <td className="py-3 px-2 text-gray-400">旗舰套餐</td>
                                <td className="py-3 px-2 text-gray-400">100分钟视频，包含策划、脚本、剪辑</td>
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
                        <h4 className="text-md font-semibold text-purple-300 mb-2">升级亮点</h4>
                        <ul className="space-y-2">
                          <li className="flex items-start text-gray-400">
                            <Check className="h-5 w-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                            <span>基于最新Web标准的响应式设计框架</span>
                          </li>
                          <li className="flex items-start text-gray-400">
                            <Check className="h-5 w-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                            <span>页面加载速度提升40%以上</span>
                          </li>
                          <li className="flex items-start text-gray-400">
                            <Check className="h-5 w-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                            <span>全新的可视化编辑后台，无需编程知识即可更新内容</span>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-md font-semibold text-purple-300 mb-2">技术优势</h4>
                        <p className="text-gray-400">系统采用前后端分离架构，支持多终端无缝切换，包括PC、平板和手机端，同时针对中东地区网络环境进行了特别优化，确保全球用户都能获得流畅体验。</p>
                      </div>
                      
                      <div>
                        <h4 className="text-md font-semibold text-purple-300 mb-2">网站搭建服务价格</h4>
                        <div className="overflow-x-auto">
                          <table className="w-full text-left border-collapse">
                            <thead>
                              <tr className="border-b border-gray-700">
                                <th className="py-3 px-2 text-gray-300">服务项目</th>
                                <th className="py-3 px-2 text-gray-300">服务内容</th>
                                <th className="py-3 px-2 text-gray-300">AED</th>
                                <th className="py-3 px-2 text-gray-300">RMB</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr className="border-b border-gray-800">
                                <td className="py-3 px-2 text-gray-400">个人网站建设</td>
                                <td className="py-3 px-2 text-gray-400">网站设计+网站搭建+网站部署</td>
                                <td className="py-3 px-2 text-gray-400">2800</td>
                                <td className="py-3 px-2 text-gray-400">5600</td>
                              </tr>
                              <tr className="border-b border-gray-800">
                                <td className="py-3 px-2 text-gray-400">UI设计稿</td>
                                <td className="py-3 px-2 text-gray-400">设计稿+icon切片</td>
                                <td className="py-3 px-2 text-gray-400">150</td>
                                <td className="py-3 px-2 text-gray-400">300</td>
                              </tr>
                              <tr>
                                <td className="py-3 px-2 text-gray-400">移动端落地页</td>
                                <td className="py-3 px-2 text-gray-400">网站设计+网站搭建+网站部署</td>
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
                        <h4 className="text-md font-semibold text-purple-300 mb-2">工具功能</h4>
                        <ul className="space-y-2">
                          <li className="flex items-start text-gray-400">
                            <Check className="h-5 w-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                            <span>多维度数据分析报表自动生成</span>
                          </li>
                          <li className="flex items-start text-gray-400">
                            <Check className="h-5 w-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                            <span>用户画像精准分析与可视化</span>
                          </li>
                          <li className="flex items-start text-gray-400">
                            <Check className="h-5 w-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                            <span>竞品账号表现对比分析</span>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-md font-semibold text-purple-300 mb-2">应用场景</h4>
                        <p className="text-gray-400">该工具特别适合需要精细化运营公众号的企业和机构，通过数据驱动的方式优化内容策略，提高粉丝互动率和转化率，实现公众号商业价值的最大化。</p>
                      </div>
                      
                      <div>
                        <h4 className="text-md font-semibold text-purple-300 mb-2">公众号运营服务价格</h4>
                        <div className="overflow-x-auto">
                          <table className="w-full text-left border-collapse">
                            <thead>
                              <tr className="border-b border-gray-700">
                                <th className="py-3 px-2 text-gray-300">服务项目</th>
                                <th className="py-3 px-2 text-gray-300">服务内容</th>
                                <th className="py-3 px-2 text-gray-300">AED</th>
                                <th className="py-3 px-2 text-gray-300">RMB</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr className="border-b border-gray-800">
                                <td className="py-3 px-2 text-gray-400">公众号运营</td>
                                <td className="py-3 px-2 text-gray-400">20条公众号独家内容+发布</td>
                                <td className="py-3 px-2 text-gray-400">800</td>
                                <td className="py-3 px-2 text-gray-400">1600</td>
                              </tr>
                              <tr className="border-b border-gray-800">
                                <td className="py-3 px-2 text-gray-400">公众号图片设计</td>
                                <td className="py-3 px-2 text-gray-400">文章配图设计</td>
                                <td className="py-3 px-2 text-gray-400">150</td>
                                <td className="py-3 px-2 text-gray-400">300</td>
                              </tr>
                              <tr>
                                <td className="py-3 px-2 text-gray-400">公众号其他物料</td>
                                <td className="py-3 px-2 text-gray-400">文章尾图+banner图</td>
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
                    关闭
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
      <section id="home" className="relative min-h-[90vh] md:min-h-screen flex items-center justify-center overflow-hidden">
        {/* Banner 视频背景 - 手机端16:9样式适配 */}
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          {/* 为手机端设置16:9比例容器 */}
          <div className="relative w-full h-full sm:aspect-[16/9] sm:h-auto overflow-hidden">
            <video
              autoPlay
              muted
              loop
              playsInline
              className="absolute top-0 left-0 w-full h-full object-cover"
              poster="/hero-background.png"
            >
              <source src="/bnner/BCB1.mp4" type="video/mp4" />
              {/* 视频加载失败时显示备用图片 */}
              <img 
                src="/hero-background.png" 
                alt="背景" 
                className="w-full h-full object-cover object-center"
              />
            </video>
          </div>
        </div>
        {/* 视频背景叠加层，确保文本清晰可见 - 多端适配 */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/90"></div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 py-12">
          {/* 文本容器 - 手机端优化 */}
          <div className="text-center mb-8 transform -translate-y-[20px] md:-translate-y-[30px] lg:-translate-y-[50px]">
            <div className="mb-2 md:mb-6 lg:mb-12"></div>

            <h1 className="text-[clamp(1.4rem,3vw,2rem)] md:text-6xl lg:text-7xl font-extrabold mb-3 md:mb-8 lg:mb-10 leading-tight md:leading-tight lg:leading-tight flex items-center justify-center gap-2 tracking-wide">
              <span className="text-white transition-all duration-300 hover:text-purple-200">
                中东地产数字营销与科技服务专家
              </span>
            </h1>

            <p className="text-[clamp(0.9rem,1.5vw,1.2rem)] text-white font-medium mb-4 sm:mb-8 lg:mb-12 max-w-2xl sm:max-w-4xl mx-auto text-center drop-shadow-[0_0_15px_rgba(168,85,247,0.5)] tracking-wide">
              为中东房产开发商、经纪人提供 营销<span className="mx-1">·</span>代币化<span className="mx-1">·</span>AI 智能体等全栈解决方案
            </p>

            {/* AI搜索框 - 手机端优化 */}
            <div className="max-w-3xl mx-auto mb-8 sm:mb-12">
              <div className="bg-black/40 backdrop-blur-md p-3 sm:p-5 rounded-xl border border-purple-500/30 shadow-lg shadow-purple-500/10">
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="输入您想了解的问题，AI为您解答..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleAISearch()}
                    className="w-full px-4 py-3.5 pr-12 rounded-lg bg-gray-800/80 border border-gray-700 focus:border-purple-500 focus:outline-none text-white placeholder-gray-500 text-sm sm:text-base transition-all"
                    disabled={isSearching}
                  />
                  <button 
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-purple-600 hover:bg-purple-700 text-white p-2.5 rounded-lg transition-colors active:scale-95"
                    onClick={handleAISearch}
                    disabled={isSearching || !searchQuery.trim()}
                    aria-label="搜索"
                  >
                    {isSearching ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <Search className="h-5 w-5" />
                    )}
                  </button>
                </div>
                <p className="text-[11px] sm:text-xs text-gray-400 mt-2 sm:mt-3 text-center">例如："如何提升品牌出海影响力？" 或 "中东市场有哪些特点？"</p>
              </div>
            </div>
          </div>

          {/* 搜索结果展示区 - 响应式优化 */}
          {(showResult || isSearching) && (
            <div className="max-w-3xl mx-auto mb-12 sm:mb-16">
              <div className={`bg-black/40 backdrop-blur-md p-4 sm:p-5 rounded-xl border ${isSearching ? 'border-purple-500/30' : searchError ? 'border-red-500/30' : 'border-green-500/30'} transition-all duration-300 animate-fade-in shadow-lg`}>
                <h4 className="text-lg font-bold mb-4 text-center 
                  {isSearching ? 'text-purple-300' : 
                   searchError ? 'text-red-300' : 'text-green-300'}">
                  {isSearching ? 'AI正在为您查找答案...' : 
                   searchError ? '搜索出错' : 'AI搜索结果'}
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
                    {searchResult || '暂无相关答案，请尝试其他问题。'}
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
              { number: "50+", label: "中东房产项目", icon: Building2 },
              { number: "40%", label: "经纪人咨询转化率提升", icon: TrendingUp },
              { number: "7×24", label: "中东时区技术支持", icon: Shield },
            ].map((stat, index) => (
              <div key={index} className="flex flex-col items-center group">
                <div className="mb-6 flex justify-center items-center">
                  <stat.icon className="w-16 h-16 text-white stroke-1" strokeWidth={1} />
                </div>
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-3 text-center">
                  {stat.number}
                </div>
                <div className="text-gray-400 group-hover:text-gray-300 transition-colors text-lg text-center">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 mt-[-20px]">
              <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30 mb-4">核心功能</Badge>
              <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                中东地产科技与营销全栈服务
              </h2>
              <p className="text-[clamp(0.8rem,0.9vw,1.1rem)] text-gray-400 max-w-sm sm:max-w-xl mx-auto text-center leading-relaxed sm:leading-relaxed tracking-wide">
                <span className="block sm:inline">覆盖经纪人IP孵化、房产网站系统、代币化等领域</span>
                <span className="block sm:inline">全链路赋能迪拜房产客户增长与创新</span>
              </p>
            </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="bg-gray-900/50 border-gray-800 hover:border-purple-500/50 transition-all duration-500 group hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25"
              >
                <CardContent className="p-8">
                  <div className="mb-4">
                <feature.icon className="w-10 h-10 text-white stroke-1" strokeWidth={1} />
              </div>
                  <h3 className="text-xl font-bold mb-3 text-white group-hover:text-purple-300 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 group-hover:text-gray-300 transition-colors leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section id="solutions" className="py-24 relative">
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
              <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30 mb-4">解决方案</Badge>
              <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                中东房产从业者专属解决方案
              </h2>
              <p className="text-[clamp(0.85rem,1vw,1.1rem)] text-gray-400 max-w-2xl mx-auto">为中东开发商、经纪人、机构定制从IP到科技系统的全场景增长方案</p>
            </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
              icon: UserPlus,
              title: "经纪人IP孵化",
              description: "专注于培养和打造专业房产经纪人的个人品牌形象，通过系统性的内容创作、社交媒体运营和专业技能培训，提升经纪人在行业内的影响力和获客能力。",
              benefits: ["个人品牌定位与塑造", "专业内容创作", "社交媒体运营", "获客转化系统", "客户关系管理", "行业资源对接", "专业技能培训", "数据分析优化"],
              industries: ["房地产", "保险", "金融服务", "教育培训", "咨询服务"],
            },
            {
              icon: Building2,
              title: "迪拜房产代币化",
              description: "将迪拜房产资产数字化，通过区块链技术实现房产份额的代币化，降低投资门槛，提高流动性，为全球投资者提供便捷的迪拜房产投资渠道。",
              benefits: ["资产数字化服务", "智能合约开发", "合规性咨询", "投资者准入系统", "流动性解决方案", "资产估值服务", "法律架构设计", "安全审计"],
              industries: ["房地产投资", "区块链金融", "资产管理", "国际投资", "财富管理"],
            },
            { icon: Code,
              title: "房产网站搭建",
              description: "为房产开发商、中介机构和经纪人提供专业的网站设计与开发服务，打造功能完善、视觉吸引力强的房产展示与交易平台，提升品牌形象和客户转化率。",
              benefits: ["响应式网站设计", "房产信息管理系统", "在线看房功能", "客户管理系统", "SEO优化", "智能推荐算法", "线上预约功能", "数据分析模块"],
              industries: ["房地产开发", "房产中介", "房产经纪", "物业管理", "酒店式公寓"],
            },
            { icon: MessageSquare,
              title: "公众号代运营",
              description: "专业的微信公众号内容策划与运营服务，包括内容创作、粉丝增长、活动策划、数据分析等，帮助企业提升微信平台影响力和用户粘性。",
              benefits: ["内容策略规划", "高质量内容创作", "粉丝增长与运营", "活动策划与执行", "数据分析与优化", "转化漏斗设计", "品牌调性统一", "危机公关处理"],
              industries: ["房地产", "金融", "教育培训", "生活服务", "零售电商", "医疗健康"],
            },
            { icon: Brain,
              title: "ai 智能体开发",
              description: "为企业定制开发AI智能体解决方案，包括客户服务机器人、销售助手、数据分析助手等，通过人工智能技术提升运营效率和客户体验。",
              benefits: ["自然语言处理", "个性化对话设计", "业务流程集成", "多渠道部署", "数据分析能力", "持续学习优化", "24/7客户服务", "成本效益分析"],
              industries: ["客户服务", "金融科技", "医疗健康", "教育培训", "电子商务", "房地产销售"],
            },
              { icon: Users,
                title: "加入我们",
                description: "成为我们团队的一员，与行业顶尖人才共同创新，打造前沿的数字解决方案，开启您的职业新篇章。",
                benefits: ["极具竞争力的薪酬待遇", "弹性工作时间", "国际化工作环境", "多元化项目经验", "专业技能培训", "快速职业发展通道", "创新的企业文化", "完善的福利体系"],
                industries: ["技术研发", "产品设计", "市场营销", "客户服务", "运营管理", "数据分析"],
              },
            ].map((solution, index) => (
              <Card
                key={index}
                className="bg-gray-900/50 border-gray-800 hover:border-purple-500/50 transition-all duration-500 group hover:scale-105"
              >
                <CardContent className="p-6 flex-grow flex flex-col">
                  <solution.icon className="w-10 h-10 text-white mb-3 stroke-1" strokeWidth={1} />
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
                    {solution.title}
                  </h3>
                  <p className="text-gray-400 mb-4 leading-relaxed">{solution.description}</p>
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-purple-300 mb-2">核心优势</h4>
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
                    <h4 className="text-sm font-semibold text-purple-300 mb-2">适用行业</h4>
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
                    咨询方案
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Dialog for 咨询方案 */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-gray-900/80 backdrop-blur-md border border-purple-500/30 text-white p-8 rounded-lg text-center">
          <div className="flex items-center justify-center space-x-2 mb-6">
            <Phone className="h-5 w-5 text-purple-300" />
            <p className="text-xl text-gray-200">15248027276</p>
          </div>
          <p className="text-gray-400 mb-8 max-w-md mx-auto">
            如有任何咨询需求，请通过以上电话联系我们，我们将竭诚为您服务。
          </p>
          <div className="flex justify-center">
            <Button onClick={() => setIsDialogOpen(false)} className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-md w-full max-w-xs">
              关闭
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Case Study Detail Dialogs */}
      {activeCaseIndex !== null && (
        <Dialog open={true} onOpenChange={closeCaseDialog}>
          <DialogContent className="bg-gray-900/80 backdrop-blur-md border border-purple-500/30 text-white p-8 rounded-lg text-center max-w-2xl">
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
                  <h3 className="text-2xl font-bold text-purple-300">{[0,1,2,3][activeCaseIndex] === 0 ? "《奔跑吧》全球霸屏" : [0,1,2,3][activeCaseIndex] === 1 ? "爱奇艺全球化社媒矩阵搭建" : [0,1,2,3][activeCaseIndex] === 2 ? "GAC MOTOR全球品牌破圈" : "《天官赐福》国漫商业化出海"}</h3>
                  <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30 mb-6">{[0,1,2,3][activeCaseIndex] === 0 ? "综艺IP出海" : [0,1,2,3][activeCaseIndex] === 1 ? "视频平台出海" : [0,1,2,3][activeCaseIndex] === 2 ? "汽车品牌出海" : "国漫IP出海"}</Badge>
                  
                  <div className="space-y-6 text-left max-w-md mx-auto">
                    <div>
                      <h4 className="text-lg font-semibold text-red-400 mb-2">面临挑战</h4>
                      <p className="text-gray-300">{[0,1,2,3][activeCaseIndex] === 0 ? "作为现象级国产综艺，需突破文化差异壁垒，在海外市场建立持续影响力，同时实现商业价值转化，避免 '叫好不叫座'。" : [0,1,2,3][activeCaseIndex] === 1 ? "作为视频平台，需在海外市场突破Netflix等竞品垄断，触达多元用户群体，同时提升品牌认知度与APP下载转化。" : [0,1,2,3][activeCaseIndex] === 2 ? "作为中国汽车品牌，需在中东、东南亚等市场打破 '欧美品牌垄断' 认知，提升本地化用户辨识度与购买意愿。" : "作为国产动画IP，需在海外市场实现 '内容传播+商业变现' 双重目标，打破 '小众圈层' 局限，提升IP长尾价值。"}</p>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold text-blue-400 mb-2">解决方案</h4>
                      <p className="text-gray-300">{[0,1,2,3][activeCaseIndex] === 0 ? "多语种本地化布局：采用12种语言翻译配音，适配东南亚、北美等核心市场文化语境；账号矩阵联动：全网搭建多元社媒账号，覆盖YouTube、Facebook等平台，形成 '主账号+垂类账号' 协同传播模式；定制化运营策略：结合节日、地域特色设计粉丝福利活动，强化用户粘性；数据驱动优化：通过i-TuBi工具筛选高潜力内容，重点推广互动率高的片段。" : [0,1,2,3][activeCaseIndex] === 1 ? "垂直赛道细分：针对剧集、综艺、动漫等内容类型搭建49个YouTube专属频道，精准覆盖不同受众；本地化内容运营：组建18+语种团队，制作 '高光cut' '幕后花絮' 等短内容；跨平台联动：联动Facebook、TikTok发起话题挑战，引导UGC二次创作；数据工具赋能：通过V-Pulse平台监测用户偏好，定向投放APP下载广告。" : [0,1,2,3][activeCaseIndex] === 2 ? "事件营销借势：绑定世界杯热点，策划 'GAC MOTOR世界杯观赛之旅' 线上活动；本地化社媒运营：开通中东语种社媒账号，发布符合当地文化的内容；线上线下整合：在迪拜、曼谷等核心城市投放户外大屏广告；数据线索沉淀：通过BI工具分析用户互动数据，定向推送试驾预约信息。" : "内容精准分发：通过iVideoForce平台向Netflix、YouTube等渠道分发多语种版本；社媒电商联动：绑定YouTube Shopping功能，在视频中植入周边购买链接；文化元素深挖：提炼IP中的中国传统美学元素，联合海外潮牌推出联名衍生品；用户私域运营：搭建Discord粉丝社区，定期发布角色设定、创作教程。"}</p>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold text-green-400 mb-2">实施效果</h4>
                      <div className="grid grid-cols-1 gap-2">
                        {[0,1,2,3][activeCaseIndex] === 0 ? ["海外总曝光量达数百亿", "单集最高播放2400万+", "累积影响粉丝近千万", "品牌赞助收入增长30%+"].map((result, resultIndex) => (
                          <div key={resultIndex} className="flex items-center text-gray-300">
                            <TrendingUp className="h-5 w-5 text-green-400 mr-2" />
                            {result}
                          </div>
                        )) : [0,1,2,3][activeCaseIndex] === 1 ? ["主账号订阅量达590万+", "总曝光10亿+", "最高单视频播放7000万+", "APP海外下载量增长150%"].map((result, resultIndex) => (
                          <div key={resultIndex} className="flex items-center text-gray-300">
                            <TrendingUp className="h-5 w-5 text-green-400 mr-2" />
                            {result}
                          </div>
                        )) : [0,1,2,3][activeCaseIndex] === 2 ? ["中东消费者品牌辨识度上升51%", "社媒粉丝突破120万+", "年曝光7200万+", "海外销量同比增长40%"].map((result, resultIndex) => (
                          <div key={resultIndex} className="flex items-center text-gray-300">
                            <TrendingUp className="h-5 w-5 text-green-400 mr-2" />
                            {result}
                          </div>
                        )) : ["海外总播放量破亿", "11个国家Netflix榜单进入TOP10", "衍生品电商访问量上涨226%", "客单价提升41%"].map((result, resultIndex) => (
                          <div key={resultIndex} className="flex items-center text-gray-300">
                            <TrendingUp className="h-5 w-5 text-green-400 mr-2" />
                            {result}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-center mt-8">
                    <Button onClick={closeCaseDialog} className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-md w-full max-w-xs">
                      关闭
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
            <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30 mb-6">成功案例</Badge>
            <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              出海成功案例
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              看看我们如何帮助各行业客户实现数字化转型和业务增长
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                company: "《奔跑吧》全球霸屏",
                industry: "综艺IP出海",
                challenge: "作为现象级国产综艺，需突破文化差异壁垒，在海外市场建立持续影响力，同时实现商业价值转化，避免 '叫好不叫座'。",
                solution: "多语种本地化布局：采用12种语言翻译配音，适配东南亚、北美等核心市场文化语境；账号矩阵联动：全网搭建多元社媒账号，覆盖YouTube、Facebook等平台，形成 '主账号+垂类账号' 协同传播模式；定制化运营策略：结合节日、地域特色设计粉丝福利活动，强化用户粘性；数据驱动优化：通过i-TuBi工具筛选高潜力内容，重点推广互动率高的片段。",
                results: ["海外总曝光量达数百亿", "单集最高播放2400万+", "累积影响粉丝近千万", "品牌赞助收入增长30%+"],
                image: "/Image/AL/微信图片_20250819133504.png",
                logo: "/placeholder.svg?height=60&width=120",
              },
              {
                company: "爱奇艺全球化社媒矩阵搭建",
                industry: "视频平台出海",
                challenge: "作为视频平台，需在海外市场突破Netflix等竞品垄断，触达多元用户群体，同时提升品牌认知度与APP下载转化。",
                solution: "垂直赛道细分：针对剧集、综艺、动漫等内容类型搭建49个YouTube专属频道，精准覆盖不同受众；本地化内容运营：组建18+语种团队，制作 '高光cut' '幕后花絮' 等短内容；跨平台联动：联动Facebook、TikTok发起话题挑战，引导UGC二次创作；数据工具赋能：通过V-Pulse平台监测用户偏好，定向投放APP下载广告。",
                results: ["主账号订阅量达590万+", "总曝光10亿+", "最高单视频播放7000万+", "APP海外下载量增长150%"],
                image: "/Image/AL/微信图片_20250819133512.png",
                logo: "/placeholder.svg?height=60&width=120",
              },
              {
                company: "GAC MOTOR全球品牌破圈",
                industry: "汽车品牌出海",
                challenge: "作为中国汽车品牌，需在中东、东南亚等市场打破 '欧美品牌垄断' 认知，提升本地化用户辨识度与购买意愿。",
                solution: "事件营销借势：绑定世界杯热点，策划 'GAC MOTOR世界杯观赛之旅' 线上活动；本地化社媒运营：开通中东语种社媒账号，发布符合当地文化的内容；线上线下整合：在迪拜、曼谷等核心城市投放户外大屏广告；数据线索沉淀：通过BI工具分析用户互动数据，定向推送试驾预约信息。",
                results: ["中东消费者品牌辨识度上升51%", "社媒粉丝突破120万+", "年曝光7200万+", "海外销量同比增长40%"],
                image: "/Image/AL/微信图片_20250819133515.png",
                logo: "/placeholder.svg?height=60&width=120",
              },
              {
                company: "《天官赐福》国漫商业化出海",
                industry: "国漫IP出海",
                challenge: "作为国产动画IP，需在海外市场实现 '内容传播+商业变现' 双重目标，打破 '小众圈层' 局限，提升IP长尾价值。",
                solution: "内容精准分发：通过iVideoForce平台向Netflix、YouTube等渠道分发多语种版本；社媒电商联动：绑定YouTube Shopping功能，在视频中植入周边购买链接；文化元素深挖：提炼IP中的中国传统美学元素，联合海外潮牌推出联名衍生品；用户私域运营：搭建Discord粉丝社区，定期发布角色设定、创作教程。",
                results: ["海外总播放量破亿", "11个国家Netflix榜单进入TOP10", "衍生品电商访问量上涨226%", "客单价提升41%"],
                image: "/Image/AL/微信图片_20250819133518.png",
                logo: "/placeholder.svg?height=60&width=120",
              },
            ].map((caseStudy, index) => (
              <Card
                key={index}
                className="bg-gray-900/50 border-gray-800 hover:border-purple-500/50 transition-all duration-500 group hover:scale-105 overflow-hidden"
              >
                <div className="relative h-40 overflow-hidden">
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
                      <h4 className="text-sm font-semibold text-red-400 mb-2">面临挑战</h4>
                      <p className="text-gray-400 text-sm">{caseStudy.challenge}</p>
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold text-blue-400 mb-2">解决方案</h4>
                      <p className="text-gray-400 text-sm">{caseStudy.solution}</p>
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold text-green-400 mb-2">实施效果</h4>
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
              查看详情
            </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* News Section */}
      <section id="news" className="py-24 relative">
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-20">
            <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30 mb-6">新闻资讯</Badge>
            <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              最新动态
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">了解行业最新趋势，获取产品更新信息和技术洞察</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {          category: "美团国际扩张",          title: "美团Keeta闪击中东！王兴加速全球布局",          excerpt: "当国内互联网企业还在为存量市场厮杀时，美团创始人王兴已将目光投向更广阔的海外版图。近期，美团旗下海外外卖平台Keeta在沙特阿拉伯展开大规模扩张，一口气新开通了11座城市的服务，包括达曼、吉达等重要城市。这一'闪击'行动标志着王兴正加速推动美团的全球化战略。",          date: "2024年",          readTime: "5分钟阅读",          image: "/Image/XW1/微信图片_20250819102012.jpg",          tags: ["美团", "海外扩张", "中东市场"],        },        {          category: "中东城市发展",          title: "沙特The Line：从科幻梦想到现实困境",          excerpt: "作为沙特'2030愿景'的旗舰项目，The Line曾被视为人类历史上最雄心勃勃的城市规划之一，计划打造零碳排放、无汽车通行、完全由人工智能管理的未来之城。然而八年过去，项目面临进度滞后、目标缩水、资金危机等多重挑战，从最初的宏大愿景逐渐在现实中褪色。",          date: "2024年",          readTime: "8分钟阅读",          image: "/Image/XW2/微信图片_20250819101830.jpg",          tags: ["沙特", "未来城市", "城市规划"],        },
            {
              category: "中东旅游娱乐",
              title: "迪士尼中东首秀：阿布扎比2030年将迎来全球第七座迪士尼乐园",
              excerpt: "2025年5月，华特迪士尼公司正式宣布，将与阿布扎比的米拉尔集团合作，在阿联酋首都阿布扎比兴建一座全新的迪士尼主题公园度假区。这座备受瞩目的主题乐园将坐落于阿布扎比的亚斯岛，预计于2030年初开门迎客。作为迪士尼在全球的第七座大型主题公园度假区、中东地区的第一座迪士尼乐园，它的诞生无疑将为中东乃至全球游客带来前所未有的梦幻体验。",
              date: "2025年5月",
              readTime: "15分钟阅读",
              image: "/Image/XW3/微信图片_20250819103236.png",
              tags: ["迪士尼", "主题乐园", "阿布扎比", "旅游发展"],
            },
            {
              category: "中东科技创新",
              title: "中东首款光子AI芯片量产，能效提升10倍的技术突破",
              excerpt: "2025年8月，阿联酋阿布扎比的QuantLase研发中心宣布，其自主设计的中东首款工业级光子AI芯片已完成设计验证，正式进入欧洲晶圆厂的量产制造阶段。该芯片采用光而非电子来执行AI计算的核心矩阵运算，能效比当前最先进的GPU高出至少10倍。",
              date: "2025年8月",
              readTime: "18分钟阅读",
              image: "/Image/XW4/微信图片_20250819104152.png",
              tags: ["光子计算", "AI芯片", "阿联酋", "技术突破"],
            },
            {
              category: "迪拜房地产市场",
              title: "迪拜人口突破396万，如何把握黄金机会？",
              excerpt: "据迪拜统计中心数据，截至2025年6月，迪拜常住人口已达396.6769万人，较去年同期增长了约6%。这意味着过去一年中迪拜平均每天新增近200名居民。如此惊人的增长速度，使迪拜成为全球人口增长最快的城市之一。人口的迅猛增长直接导致住房需求激增，引发迪拜房地产市场的供需失衡。",
              date: "2025年6月",
              readTime: "12分钟阅读",
              image: "/Image/XW5/微信图片_20250819111920.jpg",
              tags: ["迪拜人口", "房地产市场", "投资机会", "住房需求"],
            },
            {
              category: "中东科技创新",
              title: "沙特王子狂掷380亿美金，豪赌中国游戏，下一个《黑神话：悟空》已在路上？",
              excerpt: "沙特阿拉伯正开启一场前所未有的游戏产业革命，投入380亿美元打造全球游戏与电竞中心，将中国市场置于战略核心位置。",
              date: "2024年5月",
              readTime: "10分钟阅读",
              image: "/Image/XW6/微信图片_2025-09-09_154838_287.jpg",
              tags: ["沙特投资", "中国游戏", "《黑神话：悟空》", "游戏产业", "AI技术"],
            },
            ].map((article, index) => (
              <Card
                key={index}
                className="bg-gray-900/50 border-gray-800 hover:border-purple-500/50 transition-all duration-500 group hover:scale-105 overflow-hidden"
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
                      阅读全文
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/news" passHref>
                <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 px-8 py-3">
                  查看更多资讯
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
          <div className="text-center mb-16 mt-[-20px]">
              <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30 mb-4">业务动态</Badge>
              <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                我们的业务动态
              </h2>
              <p className="text-[clamp(0.85rem,1vw,1.1rem)] text-gray-400 max-w-2xl mx-auto">了解我们在IP运营、网站设计和公众号运营领域的最新进展</p>
            </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamNews.map((news, index) => (
              <Card
                key={index}
                className="bg-gray-900/50 border-gray-800 transition-all duration-300 hover:scale-105 hover:border-blue-500/30 flex flex-col h-full"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={news.imageUrl}
                    alt={news.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className={`${news.category === '项目进展' ? 'bg-green-500/20 text-green-300 border-green-500/30' : news.category === '公司公告' ? 'bg-blue-500/20 text-blue-300 border-blue-500/30' : 'bg-purple-500/20 text-purple-300 border-purple-500/30'}`}>
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
                        阅读更多
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
              <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30 mb-4">联系我们</Badge>
              <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                开启您的中东房产数字化增长
              </h2>
              <p className="text-[clamp(0.85rem,1vw,1.1rem)] text-gray-400 max-w-2xl mx-auto">
                立即咨询，定制IP孵化、网站搭建等专属方案
              </p>
            </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-white">发送消息</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">姓名</label>
                    <Input
                      placeholder="请输入您的姓名"
                      className="bg-gray-800 border-gray-700 text-white"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">邮箱</label>
                    <Input
                      type="email"
                      placeholder="请输入您的邮箱"
                      className="bg-gray-800 border-gray-700 text-white"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">公司名称</label>
                  <Input
                    placeholder="请输入公司名称"
                    className="bg-gray-800 border-gray-700 text-white"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  />                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">消息内容</label>
                  <Textarea
                    placeholder="请描述您的需求..."
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
                  {isSubmitting ? '发送中...' : '发送消息'}
                </Button>
                {statusMessage && (
                  <div className={`text-center ${status === 'success' ? 'text-green-500' : 'text-red-500'} mt-4`}>
                    {statusMessage}
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
                  <h3 className="text-xl font-semibold text-white mb-2">邮箱联系</h3>
                  <p className="text-gray-400">hello@klfstudio.com</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center">
                  <Phone className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">电话咨询</h3>
                  <p className="text-gray-400">+86 158-1886-1497</p>
                  <p className="text-gray-400">工作日 9:00-18:00</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center">
                    <MapPin className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">办公地址</h3>
                    <p className="text-gray-400">广州市番禺区基盛中心大厦</p>
                  </div>
                </div>


            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex flex-col md:flex-row items-center gap-2 mb-4">
                <img 
                  src="/llllogo.png" 
                  alt="KLF Logo" 
                  className="h-[36px] object-contain" 
                  style={{ height: 'calc(2.4rem * 0.94)' }}
                />
                <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  KLF STUDIO
                </div>
              </div>
              <p className="text-[clamp(0.8rem,1vw,1rem)] text-gray-400 mb-4 max-w-md">
                专注中东地产领域的数字营销与科技服务，为中东房产客户提供从IP孵化到区块链应用的全栈解决方案
              </p>
              <div className="flex space-x-4">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-gray-700 text-gray-400 hover:text-white bg-transparent"
                    >
                      微信
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-gray-900 border-gray-800 text-white max-w-xs">
                    <DialogHeader>
                      <DialogTitle className="text-center text-white">扫描二维码添加微信</DialogTitle>
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
              <h3 className="text-base font-semibold mb-4 text-white">核心业务</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                    经纪人IP孵化
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                    房产CRM系统
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                    房产代币化服务
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                    社媒与内容代运营
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-base font-semibold mb-4 text-white">客户支持</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                    帮助中心
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                    案例库
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                    商业合作
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                    联系我们
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">© KLF STUDIO. 保留所有权利。</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-purple-400 text-sm transition-colors">
                隐私政策
              </a>
              <a href="#" className="text-gray-400 hover:text-purple-400 text-sm transition-colors">
                服务条款
              </a>
              <a href="#" className="text-gray-400 hover:text-purple-400 text-sm transition-colors">
                Cookie 政策
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
