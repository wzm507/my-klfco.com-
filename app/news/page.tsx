'use client'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '../../components/ui/button'
import { Card, CardContent } from '../../components/ui/card'
import { Badge } from '../../components/ui/badge'
import { ArrowRight } from 'lucide-react'

const newsItems = [
  {
    id: 1,
    category: "迪拜地产科技",
    title: "虚拟房产牌照落地",
    excerpt: "迪拜虚拟资产监管局（VARA）2024年4月批准全球首张元宇宙房产交易牌照，允许开发者出售带产权的3D虚拟地块。首批开放迪拜码头区等5个数字孪生社区，交易需强制使用区块链产权存证。",
    date: "2024年4月",
    readTime: "3分钟阅读",
    image: "/Image/XW1/微信图片_20250819102012.jpg",
    tags: ["虚拟资产", "区块链", "元宇宙"],
  },
  {
    id: 2,
    category: "迪拜地产科技",
    title: "AI经纪人持证上岗",
    excerpt: "阿联酋人工智能部发布AI房产经纪人认证体系（2024Q2生效），要求AI决策过程需可追溯且符合伊斯兰金融法。首批12家机构获准测试AI销售代理，对话机器人误判率需＜3%。",
    date: "2024年Q2",
    readTime: "3分钟阅读",
    image: "/Image/XW2/微信图片_20250819101830.jpg",
    tags: ["AI技术", "认证体系", "伊斯兰金融"],
  },
  {
    id: 3,
    category: "迪拜地产科技",
    title: "全息看房技术爆发",
    excerpt: "迪拜土地局（DLD）2024年推出全息投影看房终端，覆盖全市90%新盘，买家可裸眼查看建筑日照变化。减少70%实地看房需求，终端日均使用量破1.2万次。",
    date: "2024年",
    readTime: "3分钟阅读",
    image: "/Image/XW3/微信图片_20250819103236.png",
    tags: ["全息技术", "看房体验", "科技创新"],
  },
  {
    id: 4,
    category: "迪拜地产科技",
    title: "智能合约纠纷首案",
    excerpt: "迪拜国际金融法院裁定首例区块链房产交易违约案（Case No. DIFC-2024-RE-001），判定智能合约自动执行罚则有效。违约方被强制转移产权NFT，节省诉讼时间83天。",
    date: "2024年",
    readTime: "4分钟阅读",
    image: "/Image/XW4/微信图片_20250819104152.png",
    tags: ["智能合约", "区块链", "法律案例"],
  },
  {
    id: 5,
    category: "迪拜地产科技",
    title: "斋月营销科技革命",
    excerpt: "2024年斋月期间迪拜房产询盘量逆势增长40%，主因开发商大规模启用AI礼宾机器人提供夜间咨询服务。22:00-02:00成交占比达58%，机器人平均响应速度11秒。",
    date: "2024年斋月",
    readTime: "3分钟阅读",
    image: "/Image/XW5/微信图片_20250819111920.jpg",
    tags: ["AI营销", "文化适配", "客户服务"],
  },
  {
    id: 6,
    category: "中东科技创新",
    title: "沙特王子狂掷380亿美金，豪赌中国游戏，下一个《黑神话：悟空》已在路上？",
    excerpt: "沙特阿拉伯正开启一场前所未有的游戏产业革命，投入380亿美元打造全球游戏与电竞中心，将中国市场置于战略核心位置。",
    date: "2024年5月",
    readTime: "10分钟阅读",
    image: "/Image/XW6/微信图片_2025-09-09_154838_287.jpg",
    tags: ["沙特投资", "中国游戏", "《黑神话：悟空》", "游戏产业", "AI技术"],
  },
]

export default function NewsPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30 mb-6">新闻资讯</Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            最新动态
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            了解行业最新趋势，获取产品更新信息和技术洞察
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsItems.map((article) => (
            <Card
              key={article.id}
              className="bg-gray-900/50 border-gray-800 hover:border-purple-500/50 transition-all duration-500 group hover:scale-105 overflow-hidden flex flex-col h-full"
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={article.image || '/placeholder.jpg'}
                  alt={article.title}
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
                  <Badge className="bg-purple-600/80 text-white">{article.category}</Badge>
                </div>
              </div>
              <CardContent className="p-6 flex-grow flex flex-col">
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

                <div className="mt-auto flex justify-end">
                <Link href={`/news/${article.id}`} passHref>
                  <Button
                    variant="outline"
                    className="border-purple-500/50 text-purple-300 hover:bg-purple-500/10 bg-transparent"
                  >
                    阅读全文
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
              返回首页
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}