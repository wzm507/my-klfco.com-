"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// 定义语言类型
export type Language = 'zh' | 'en';

// 翻译字典接口
interface Translations {
  [key: string]: {
    zh: string;
    en: string;
  };
}

// 创建翻译字典
const translations: Translations = {
  // 导航相关
  nav: {
    home: { zh: '首页', en: 'Home' },
    about: { zh: '关于我们', en: 'About Us' },
    services: { zh: '服务', en: 'Services' },
    projects: { zh: '中东房产项目', en: 'Middle East Real Estate Projects' },
    news: { zh: '新闻', en: 'News' },
    contact: { zh: '联系我们', en: 'Contact' },
    pricing: { zh: '价格', en: 'Pricing' },
    testimonials: { zh: '客户见证', en: 'Testimonials' }
  },
  
  // 首页英雄区域
  hero: {
    title: { zh: 'KLF STUDIO', en: 'KLF STUDIO' },
    subtitle: { zh: '为中东房产开发商、经纪人提供 营销·代币化·AI 智能体等全栈解决方案', en: 'Providing full-stack solutions for Middle East real estate developers and agents: marketing, tokenization, AI agents and more' },
    cta: { zh: '探索中东房产项目', en: 'Explore Middle East Real Estate Projects' }
  },
  
  // 统计数据
  stats: {
    completed: { zh: '已完成中东房产项目', en: 'Completed Middle East Real Estate Projects' },
    customers: { zh: '满意客户', en: 'Satisfied Customers' },
    awards: { zh: '行业奖项', en: 'Industry Awards' },
    experience: { zh: '年行业经验', en: 'Years of Experience' },
    projects: { zh: '中东房产项目', en: 'Middle East Real Estate Projects' },
    conversionRate: { zh: '经纪人咨询转化率提升', en: 'Agent Consultation Conversion Rate Improvement' },
    support: { zh: '中东时区技术支持', en: 'Middle East Time Zone Technical Support' }
  },
  
  // AI对话框
  aiDialog: {
    placeholder: { zh: '输入您想了解的问题，AI为您解答...', en: 'Enter your question, AI will answer for you...' },
    example: { zh: '例如: "如何提升迪拜影响力?" 或 "中东市场有何特点?"', en: 'Example: "How to increase Dubai influence?" or "What are the characteristics of Middle East market?"' },
    searching: { zh: 'AI正在为您查找答案...', en: 'AI is searching for answers for you...' },
    error: { zh: '搜索出错', en: 'Search Error' },
    noResult: { zh: '暂无相关答案，请尝试其他问题。', en: 'No relevant answers found, please try other questions.' },
    results: { zh: 'AI搜索结果', en: 'AI Search Results' }
  },
  
  // 功能介绍
  features: {
    title: { zh: '我们的核心优势', en: 'Our Core Advantages' },
    badge: { zh: '核心功能', en: 'Core Features' },
    description: { zh: '覆盖经纪人IP孵化、房产网站系统、代币化等领域，全链路赋能迪拜房产客户增长与创新', en: 'Covering broker IP incubation, real estate website systems, tokenization, and other fields, providing end-to-end empowerment for Dubai real estate clients\' growth and innovation' },
    // AI智能体
    aiAgents: {
      title: { zh: 'AI智能体开发应用', en: 'AI Agent Development & Application' },
      description: { zh: '开发定制化AI智能体（AI Agents），应用于中东地产客户咨询、楼盘推荐、交易流程自动化等场景，提升服务效率与精准度。', en: 'Develop customized AI Agents for Middle East real estate client consultation, property recommendation, transaction process automation, enhancing service efficiency and precision.' }
    },
    // 数字营销
    digitalMarketing: {
      title: { zh: '中东地产数字营销', en: 'Middle East Real Estate Digital Marketing' },
      description: { zh: '专注为中东（沙特、阿联酋迪拜）房地产开发商、经纪人及政府部门提供定制化数字营销解决方案，覆盖地产科技全链条服务', en: 'Specialized in customized digital marketing solutions for Middle East (Saudi Arabia, UAE Dubai) real estate developers, agents, and government departments, covering the entire real estate technology service chain.' }
    },
    // 经纪人IP孵化
    agentIP: {
      title: { zh: '房产经纪人IP孵化', en: 'Real Estate Agent IP Incubation' },
      description: { zh: '打造中东房地产经纪人个人品牌IP，提供从形象定位、内容策划到社交媒体矩阵运营的一站式包装服务，提升专业影响力与客户信任度', en: 'Build personal brand IP for Middle East real estate agents, providing one-stop packaging services from image positioning, content planning to social media matrix operation, enhancing professional influence and client trust.' }
    },
    // 房产代币化
    tokenization: {
      title: { zh: '迪拜房产代币化技术', en: 'Dubai Real Estate Tokenization Technology' },
      description: { zh: '通过区块链技术实现迪拜房产资产代币化（Real Estate Tokenization），为开发商提供新型融资渠道，为投资者创造碎片化产权交易机会', en: 'Realize Dubai real estate asset tokenization through blockchain technology, providing new financing channels for developers and creating fractional property rights trading opportunities for investors.' }
    },
    // CRM客户管理
    crm: {
      title: { zh: '迪拜房产CRM系统', en: 'Dubai Real Estate CRM System' },
      description: { zh: '专为迪拜及中东地产商设计的智能CRM系统，整合客户管理、房源追踪、交易数据分析功能，实现精细化运营与销售转化提升', en: 'Intelligent CRM system designed for Dubai and Middle East real estate developers, integrating customer management, property tracking, transaction data analysis functions to achieve refined operations and sales conversion improvement.' }
    },
    // 全栈技术营销方案
    fullStack: {
      title: { zh: '全栈技术营销方案', en: 'Full Stack Technology Marketing Solution' },
      description: { zh: '提供"科技+营销"全栈支持，覆盖社交媒体推广、区块链资产化、AI工具开发、数据化客户管理，助力中东地产客户降本增效', en: 'Provide full-stack "Technology+Marketing" support, covering social media promotion, blockchain assetization, AI tool development, and data-driven customer management to help Middle East real estate clients reduce costs and increase efficiency.' }
    },
    quality: {
      title: { zh: '卓越品质', en: 'Exceptional Quality' },
      desc: { zh: '严格把控每一个细节，确保最高品质标准', en: 'Strict control over every detail to ensure the highest quality standards' }
    },
    innovation: {
      title: { zh: '持续创新', en: 'Continuous Innovation' },
      desc: { zh: '融合最新技术与设计理念，引领行业潮流', en: 'Integrating cutting-edge technology with design concepts to lead industry trends' }
    },
    service: {
      title: { zh: '贴心服务', en: 'Thoughtful Service' },
      desc: { zh: '从咨询到交付，全程为客户提供专业支持', en: 'Professional support from consultation to delivery' }
    }
  },
  
  // 解决方案
  solutions: {
    title: { zh: '全方位解决方案', en: 'Comprehensive Solutions' },
    badge: { zh: '解决方案', en: 'Solutions' },
    mainTitle: { zh: '中东房产从业者专属解决方案', en: 'Exclusive Solutions for Middle East Real Estate Professionals' },
    description: { zh: '为中东开发商、经纪人、机构定制从IP到科技系统的全场景增长方案', en: 'Customized full-scenario growth solutions from IP to technology systems for Middle East developers, agents, and institutions' },
    
    // 解决方案卡片1：经纪人IP孵化
    agentIPIncubation: {
      title: { zh: '经纪人IP孵化', en: 'Agent IP Incubation' },
      description: { zh: '专注于培养和打造专业房产经纪人的个人品牌形象，通过系统性的内容创作、社交媒体运营和专业技能培训，提升经纪人在行业内的影响力和获客能力。', en: 'Focused on developing and building personal brand images for professional real estate agents through systematic content creation, social media operation, and professional skills training to enhance their influence and customer acquisition capabilities in the industry.' },
      benefits: {
        zh: ["个人品牌定位与塑造", "专业内容创作", "社交媒体运营", "获客转化系统", "客户关系管理", "行业资源对接", "专业技能培训", "数据分析优化"],
        en: ["Personal Brand Positioning", "Professional Content Creation", "Social Media Operation", "Lead Conversion System", "Customer Relationship Management", "Industry Resource Connection", "Professional Skills Training", "Data Analysis Optimization"]
      },
      industries: {
        zh: ["房地产", "保险", "金融服务", "教育培训", "咨询服务"],
        en: ["Real Estate", "Insurance", "Financial Services", "Education & Training", "Consulting Services"]
      }
    },
    
    // 解决方案卡片2：迪拜房产代币化
    dubaiPropertyTokenization: {
      title: { zh: '迪拜房产代币化', en: 'Dubai Property Tokenization' },
      description: { zh: '将迪拜房产资产数字化，通过区块链技术实现房产份额的代币化，降低投资门槛，提高流动性，为全球投资者提供便捷的迪拜房产投资渠道。', en: 'Digitize Dubai real estate assets, tokenize property shares through blockchain technology, lower investment thresholds, increase liquidity, and provide convenient Dubai property investment channels for global investors.' },
      benefits: {
        zh: ["资产数字化服务", "智能合约开发", "合规性咨询", "投资者准入系统", "流动性解决方案", "资产估值服务", "法律架构设计", "安全审计"],
        en: ["Asset Digitization Services", "Smart Contract Development", "Compliance Consulting", "Investor Access System", "Liquidity Solutions", "Asset Valuation Services", "Legal Structure Design", "Security Audit"]
      },
      industries: {
        zh: ["房地产投资", "区块链金融", "资产管理", "国际投资", "财富管理"],
        en: ["Real Estate Investment", "Blockchain Finance", "Asset Management", "International Investment", "Wealth Management"]
      }
    },
    
    // 解决方案卡片3：房产网站搭建
    propertyWebsite: {
      title: { zh: '房产网站搭建', en: 'Real Estate Website Development' },
      description: { zh: '为房产开发商、中介机构和经纪人提供专业的网站设计与开发服务，打造功能完善、视觉吸引力强的房产展示与交易平台，提升品牌形象和客户转化率。', en: 'Provide professional website design and development services for real estate developers, agencies, and agents, creating feature-rich, visually appealing property display and trading platforms to enhance brand image and customer conversion rates.' },
      benefits: {
        zh: ["响应式网站设计", "房产信息管理系统", "在线看房功能", "客户管理系统", "SEO优化", "智能推荐算法", "线上预约功能", "数据分析模块"],
        en: ["Responsive Website Design", "Property Information Management System", "Online Viewing Function", "Customer Management System", "SEO Optimization", "Intelligent Recommendation Algorithm", "Online Booking Function", "Data Analysis Module"]
      },
      industries: {
        zh: ["房地产开发", "房产中介", "房产经纪", "物业管理", "酒店式公寓"],
        en: ["Real Estate Development", "Real Estate Agency", "Real Estate Brokerage", "Property Management", "Service Apartments"]
      }
    },
    
    // 解决方案卡片4：公众号代运营
    officialAccount: {
      title: { zh: '公众号代运营', en: 'Official Account Operation' },
      description: { zh: '专业的微信公众号内容策划与运营服务，包括内容创作、粉丝增长、活动策划、数据分析等，帮助企业提升微信平台影响力和用户粘性。', en: 'Professional WeChat Official Account content planning and operation services, including content creation, follower growth, activity planning, data analysis, etc., helping enterprises enhance their influence and user stickiness on the WeChat platform.' },
      benefits: {
        zh: ["内容策略规划", "高质量内容创作", "粉丝增长与运营", "活动策划与执行", "数据分析与优化", "转化漏斗设计", "品牌调性统一", "危机公关处理"],
        en: ["Content Strategy Planning", "High-Quality Content Creation", "Follower Growth & Operation", "Activity Planning & Execution", "Data Analysis & Optimization", "Conversion Funnel Design", "Brand Tone Consistency", "Crisis Public Relations Handling"]
      },
      industries: {
        zh: ["房地产", "金融", "教育培训", "生活服务", "零售电商", "医疗健康"],
        en: ["Real Estate", "Finance", "Education & Training", "Life Services", "Retail E-commerce", "Healthcare"]
      }
    },
    
    // 解决方案卡片5：AI智能体开发
    aiAgents: {
      title: { zh: 'AI 智能体开发', en: 'AI Agent Development' },
      description: { zh: '为企业定制开发AI智能体解决方案，包括客户服务机器人、销售助手、数据分析助手等，通过人工智能技术提升运营效率和客户体验。', en: 'Customize and develop AI agent solutions for enterprises, including customer service robots, sales assistants, data analysis assistants, etc., enhancing operational efficiency and customer experience through artificial intelligence technology.' },
      benefits: {
        zh: ["自然语言处理", "个性化对话设计", "业务流程集成", "多渠道部署", "数据分析能力", "持续学习优化", "24/7客户服务", "成本效益分析"],
        en: ["Natural Language Processing", "Personalized Dialogue Design", "Business Process Integration", "Multi-Channel Deployment", "Data Analysis Capability", "Continuous Learning Optimization", "24/7 Customer Service", "Cost-Benefit Analysis"]
      },
      industries: {
        zh: ["客户服务", "金融科技", "医疗健康", "教育培训", "电子商务", "房地产销售"],
        en: ["Customer Service", "FinTech", "Healthcare", "Education & Training", "E-commerce", "Real Estate Sales"]
      }
    },
    
    // 解决方案卡片6：加入我们
    joinUs: {
      title: { zh: '加入我们', en: 'Join Us' },
      description: { zh: '成为我们团队的一员，与行业顶尖人才共同创新，打造前沿的数字解决方案，开启您的职业新篇章。', en: 'Become a member of our team, innovate with top industry talents, create cutting-edge digital solutions, and start a new chapter in your career.' },
      benefits: {
        zh: ["极具竞争力的薪酬待遇", "弹性工作时间", "国际化工作环境", "多元化项目经验", "专业技能培训", "快速职业发展通道", "创新的企业文化", "完善的福利体系"],
        en: ["Highly Competitive Compensation", "Flexible Working Hours", "International Work Environment", "Diverse Project Experience", "Professional Skills Training", "Rapid Career Development Path", "Innovative Corporate Culture", "Comprehensive Welfare System"]
      },
      industries: {
        zh: ["技术研发", "产品设计", "市场营销", "客户服务", "运营管理", "数据分析"],
        en: ["Technology R&D", "Product Design", "Marketing", "Customer Service", "Operations Management", "Data Analysis"]
      }
    },
    
    // 咨询方案按钮
    consultSolution: { zh: '咨询方案', en: 'Consult Solution' },
    
    // 核心优势标题
    coreAdvantages: { zh: '核心优势', en: 'Core Advantages' },
    
    // 适用行业标题
    applicableIndustries: { zh: '适用行业', en: 'Applicable Industries' },
    
    // 联系我们信息
    contactUsMessage: { zh: '如有任何咨询需求，请通过以上电话联系我们，我们将竭诚为您服务。', en: 'For any consultation needs, please contact us through the phone number above. We will serve you wholeheartedly.' }
  },
  
  // 案例研究
  cases: {
    badge: { zh: '成功案例', en: 'Success Cases' },
    title: { zh: '出海成功案例', en: 'Overseas Success Cases' },
    description: { zh: '看看我们如何帮助各行业客户实现数字化转型和业务增长', en: 'See how we help clients from various industries achieve digital transformation and business growth' },
    close: { zh: '关闭', en: 'Close' },
    viewDetails: { zh: '查看详情', en: 'View Details' },
    // 案例1: 奔跑吧
    case1: {
      company: { zh: '《奔跑吧》全球霸屏', en: '"Keep Running" Global Dominance' },
      industry: { zh: '综艺IP出海', en: 'Variety IP Global Launch' },
      challenge: { zh: '作为现象级国产综艺，需突破文化差异壁垒，在海外市场建立持续影响力，同时实现商业价值转化，避免 \'叫好不叫座\'。', en: 'As a phenomenal Chinese variety show, we needed to break through cultural barriers, establish sustained influence in overseas markets, achieve commercial value transformation, and avoid being "popular but unprofitable".' },
      solution: { zh: '多语种本地化布局：采用12种语言翻译配音，适配东南亚、北美等核心市场文化语境；账号矩阵联动：全网搭建多元社媒账号，覆盖YouTube、Facebook等平台，形成 \'主账号+垂类账号\' 协同传播模式；定制化运营策略：结合节日、地域特色设计粉丝福利活动，强化用户粘性；数据驱动优化：通过i-TuBi工具筛选高潜力内容，重点推广互动率高的片段。', en: 'Multi-language localization layout: Using 12 languages for translation and dubbing, adapting to the cultural context of core markets such as Southeast Asia and North America; Account matrix linkage: Building a diverse social media account network across platforms like YouTube and Facebook, forming a collaborative communication model of "main account + vertical account"; Customized operation strategy: Designing fan welfare activities combining festivals and regional characteristics to strengthen user stickiness; Data-driven optimization: Using i-TuBi tools to screen high-potential content and focus on promoting segments with high engagement rates.' },
      results: {
        zh: ["海外总曝光量达数百亿", "单集最高播放2400万+", "累积影响粉丝近千万", "品牌赞助收入增长30%+"],
        en: ["Global exposure reached tens of billions", "Highest single episode views: 24 million+", "Influenced nearly 10 million fans", "Brand sponsorship revenue increased by 30%+"]
      }
    },
    // 案例2: 爱奇艺
    case2: {
      company: { zh: '爱奇艺全球化社媒矩阵搭建', en: 'iQIYI Global Social Media Matrix Building' },
      industry: { zh: '视频平台出海', en: 'Video Platform Global Expansion' },
      challenge: { zh: '作为视频平台，需在海外市场突破Netflix等竞品垄断，触达多元用户群体，同时提升品牌认知度与APP下载转化。', en: 'As a video platform, we needed to break through the monopoly of competitors like Netflix in overseas markets, reach diverse user groups, and improve brand awareness and APP download conversion.' },
      solution: { zh: '垂直赛道细分：针对剧集、综艺、动漫等内容类型搭建49个YouTube专属频道，精准覆盖不同受众；本地化内容运营：组建18+语种团队，制作 \'高光cut\' \'幕后花絮\' 等短内容；跨平台联动：联动Facebook、TikTok发起话题挑战，引导UGC二次创作；数据工具赋能：通过V-Pulse平台监测用户偏好，定向投放APP下载广告。', en: 'Vertical track segmentation: Setting up 49 YouTube channels for different content types like dramas, variety shows, and animations to precisely cover different audiences; Localized content operation: Building an 18+ language team to produce short content such as "highlight clips" and "behind-the-scenes footage"; Cross-platform linkage: Collaborating with Facebook and TikTok to launch topic challenges and guide UGC secondary creation; Data tool empowerment: Using the V-Pulse platform to monitor user preferences and deliver targeted APP download advertisements.' },
      results: {
        zh: ["主账号订阅量达590万+", "总曝光10亿+", "最高单视频播放7000万+", "APP海外下载量增长150%"],
        en: ["Main account subscriptions reached 5.9 million+", "Total exposure: 1 billion+", "Highest single video views: 70 million+", "APP overseas downloads increased by 150%"]
      }
    },
    // 案例3: GAC MOTOR
    case3: {
      company: { zh: 'GAC MOTOR全球品牌破圈', en: 'GAC MOTOR Global Brand Breakthrough' },
      industry: { zh: '汽车品牌出海', en: 'Automotive Brand Global Expansion' },
      challenge: { zh: '作为中国汽车品牌，需在中东、东南亚等市场打破 \'欧美品牌垄断\' 认知，提升本地化用户辨识度与购买意愿。', en: 'As a Chinese automotive brand, we needed to break the perception of "European and American brand monopoly" in markets such as the Middle East and Southeast Asia, and improve local user recognition and purchase intention.' },
      solution: { zh: '事件营销借势：绑定世界杯热点，策划 \'GAC MOTOR世界杯观赛之旅\' 线上活动；本地化社媒运营：开通中东语种社媒账号，发布符合当地文化的内容；线上线下整合：在迪拜、曼谷等核心城市投放户外大屏广告；数据线索沉淀：通过BI工具分析用户互动数据，定向推送试驾预约信息。', en: 'Event marketing leverage: Tying in with the World Cup hotspot, planning "GAC MOTOR World Cup Viewing Tour" online activities; Localized social media operation: Opening Middle East language social media accounts and publishing content that fits local culture; Online and offline integration: Placing outdoor big screen advertisements in core cities such as Dubai and Bangkok; Data lead accumulation: Using BI tools to analyze user interaction data and deliver targeted test drive reservation information.' },
      results: {
        zh: ["中东消费者品牌辨识度上升51%", "社媒粉丝突破120万+", "年曝光7200万+", "海外销量同比增长40%"],
        en: ["Middle East consumer brand recognition increased by 51%", "Social media followers exceeded 1.2 million+", "Annual exposure: 72 million+", "Overseas sales increased by 40% year-over-year"]
      }
    },
    // 案例4: 天官赐福
    case4: {
      company: { zh: '《天官赐福》国漫商业化出海', en: '"Heaven Official\'s Blessing" Domestic Animation Commercial Global Expansion' },
      industry: { zh: '国漫IP出海', en: 'Chinese Animation IP Global Launch' },
      challenge: { zh: '作为国产动画IP，需在海外市场实现 \'内容传播+商业变现\' 双重目标，打破 \'小众圈层\' 局限，提升IP长尾价值。', en: 'As a domestic animation IP, we needed to achieve the dual goals of "content dissemination + commercial monetization" in overseas markets, break through the limitations of "niche circles", and enhance the long-tail value of the IP.' },
      solution: { zh: '内容精准分发：通过iVideoForce平台向Netflix、YouTube等渠道分发多语种版本；社媒电商联动：绑定YouTube Shopping功能，在视频中植入周边购买链接；文化元素深挖：提炼IP中的中国传统美学元素，联合海外潮牌推出联名衍生品；用户私域运营：搭建Discord粉丝社区，定期发布角色设定、创作教程。', en: 'Precise content distribution: Distributing multilingual versions to Netflix, YouTube and other channels through the iVideoForce platform; Social media e-commerce linkage: Binding YouTube Shopping functionality and embedding peripheral purchase links in videos; Cultural element exploration: Extracting traditional Chinese aesthetic elements from the IP and launching co-branded derivatives with overseas trendy brands; User private domain operation: Building a Discord fan community and regularly publishing character settings and creation tutorials.' },
      results: {
        zh: ["海外总播放量破亿", "11个国家Netflix榜单进入TOP10", "衍生品电商访问量上涨226%", "客单价提升41%"],
        en: ["Global views exceeded 100 million", "Entered TOP10 on Netflix charts in 11 countries", "Derivative e-commerce traffic increased by 226%", "Average customer value increased by 41%"]
      }
    },
    // 案例详情标签
    challengeLabel: { zh: '面临挑战', en: 'Challenges' },
    solutionLabel: { zh: '解决方案', en: 'Solutions' },
    resultsLabel: { zh: '实施效果', en: 'Results' }
  },
  
  // 新闻
  news: {
    badge: { zh: '新闻资讯', en: 'NEWS' },
    title: { zh: '最新动态', en: 'Latest Updates' },
    description: { zh: '了解行业最新趋势，获取产品更新信息和技术洞察', en: 'Stay updated with industry trends, product updates and technical insights' },
    readMore: { zh: '阅读全文', en: 'Read More' },
    readTime: { zh: '阅读时间', en: 'Reading Time' },
    backToHome: { zh: '返回首页', en: 'Back to Home' },
    mainTitle: { zh: '最新资讯', en: 'Latest News' }
  },
  
  // 团队新闻
    teamNews: {
      title: { zh: '我们的业务动态', en: 'Our Business Updates' },
      badge: { zh: '业务动态', en: 'Business Updates' },
      description: { zh: '了解我们在IP运营、网站设计和公众号运营领域的最新进展', en: 'Learn about our latest developments in IP operations, website design, and official account management' },
      projectDetails: { zh: '项目详情', en: 'Project Details' },
      item1: {
        category: { zh: '项目进展', en: 'Project Progress' },
        title: { zh: 'IP运营新项目启动，覆盖中东市场', en: 'New IP Operation Project Launched, Covering Middle East Market' },
        summary: { zh: '我们的IP运营团队已启动面向中东市场的全新项目，专注于内容IP的本地化运营和商业变现，将为客户提供全方位的IP增值服务。', en: 'Our IP operation team has launched a new project targeting the Middle East market, focusing on localized operation and commercialization of content IP, providing comprehensive IP value-added services for customers.' },
        projectBackground: { zh: '项目背景', en: 'Project Background' },
        projectBackgroundDesc: { zh: '随着中东市场对优质内容需求的增长，我们针对当地文化特点和用户习惯，精心策划了这套IP运营方案，旨在帮助客户实现品牌出海和商业价值最大化。', en: 'With the growing demand for high-quality content in the Middle East market, we have carefully planned this IP operation solution based on local cultural characteristics and user habits, aiming to help clients achieve brand internationalization and maximize commercial value.' },
        coreServices: { zh: '核心服务', en: 'Core Services' },
        service1: { zh: 'IP内容本地化翻译与文化适配', en: 'IP content localization translation and cultural adaptation' },
        service2: { zh: '社交媒体矩阵运营与粉丝增长', en: 'Social media matrix operation and fan growth' },
        service3: { zh: '商业变现渠道搭建与优化', en: 'Commercial monetization channel building and optimization' },
        packages: { zh: 'IP运营套餐', en: 'IP Operation Packages' },
        packageName: { zh: '套餐名称', en: 'Package Name' },
        serviceContent: { zh: '服务内容', en: 'Service Content' },
        basicPackage: { zh: '基础套餐', en: 'Basic Package' },
        basicPackageContent: { zh: '10分钟视频，包含策划、脚本、剪辑', en: '10-minute video, including planning, scripting, editing' },
        standardPackage: { zh: '标准套餐', en: 'Standard Package' },
        standardPackageContent: { zh: '30分钟视频，包含策划、脚本、剪辑', en: '30-minute video, including planning, scripting, editing' },
        premiumPackage: { zh: '高级套餐', en: 'Premium Package' },
        premiumPackageContent: { zh: '50分钟视频，包含策划、脚本、剪辑', en: '50-minute video, including planning, scripting, editing' },
        flagshipPackage: { zh: '旗舰套餐', en: 'Flagship Package' },
        flagshipPackageContent: { zh: '100分钟视频，包含策划、脚本、剪辑', en: '100-minute video, including planning, scripting, editing' }
      },
      item2: {
        category: { zh: '项目进展', en: 'Project Progress' },
        title: { zh: '响应式网站设计系统全面升级', en: 'Responsive Website Design System Fully Upgraded' },
        summary: { zh: '我们的网站设计团队完成了系统升级，新系统支持多终端自适应，提升了页面加载速度和用户体验，同时简化了后台管理流程。', en: 'Our website design team has completed the system upgrade. The new system supports multi-terminal adaptation, improves page loading speed and user experience, while simplifying backend management processes.' },
        upgradeHighlights: { zh: '升级亮点', en: 'Upgrade Highlights' },
        highlight1: { zh: '基于最新Web标准的响应式设计框架', en: 'Responsive design framework based on latest web standards' },
        highlight2: { zh: '页面加载速度提升40%以上', en: 'Page loading speed improved by over 40%' },
        highlight3: { zh: '全新的可视化编辑后台，无需编程知识即可更新内容', en: 'Brand new visual editing backend, update content without programming knowledge' },
        technicalAdvantages: { zh: '技术优势', en: 'Technical Advantages' },
        technicalDesc: { zh: '系统采用前后端分离架构，支持多终端无缝切换，包括PC、平板和手机端，同时针对中东地区网络环境进行了特别优化，确保全球用户都能获得流畅体验。', en: 'The system adopts a front-end and back-end separation architecture, supporting seamless switching between multiple terminals, including PC, tablet, and mobile phones. It has also been specially optimized for the network environment in the Middle East region to ensure a smooth experience for users worldwide.' },
        websiteServices: { zh: '网站搭建服务价格', en: 'Website Construction Service Prices' },
        serviceItem: { zh: '服务项目', en: 'Service Item' },
        personalWebsite: { zh: '个人网站建设', en: 'Personal Website Construction' },
        personalWebsiteContent: { zh: '网站设计+网站搭建+网站部署', en: 'Website design + website construction + website deployment' },
        uiDesign: { zh: 'UI设计稿', en: 'UI Design Draft' },
        uiDesignContent: { zh: '设计稿+icon切片', en: 'Design draft + icon slicing' },
        mobileLanding: { zh: '移动端落地页', en: 'Mobile Landing Page' },
        mobileLandingContent: { zh: '网站设计+网站搭建+网站部署', en: 'Website design + website construction + website deployment' }
      },
      item3: {
          category: {
            zh: '数据工具',
            en: 'Data Tools'
          },
          title: {
            zh: '中东地区账号运营数据分析工具正式上线',
            en: 'Middle East Account Operation Data Analysis Tool Officially Launched'
          },
          summary: {
            zh: '全新开发的数据分析工具，帮助客户深入了解中东地区账号运营状况',
            en: 'Newly developed data analysis tool to help customers gain deep insights into account operation status in the Middle East'
          },
          toolFeatures: {
            zh: '工具功能',
            en: 'Tool Features'
          },
          feature1: {
            zh: '多维度数据分析报表自动生成',
            en: 'Automatic generation of multi-dimensional data analysis reports'
          },
          feature2: {
            zh: '用户画像精准分析与可视化',
            en: 'Precise user portrait analysis and visualization'
          },
          feature3: {
            zh: '竞品账号表现对比分析',
            en: 'Competitor account performance comparison analysis'
          },
          applicationScenarios: {
            zh: '应用场景',
            en: 'Application Scenarios'
          },
          scenariosDesc: {
            zh: '该工具特别适合需要精细化运营公众号的企业和机构，通过数据驱动的方式优化内容策略，提高粉丝互动率和转化率，实现公众号商业价值的最大化。',
            en: 'This tool is especially suitable for enterprises and institutions that need refined WeChat official account operations. It optimizes content strategy through data-driven approaches, increases fan engagement and conversion rates, and maximizes the commercial value of WeChat official accounts.'
          },
          wechatServicePrice: {
            zh: '公众号运营服务价格',
            en: 'WeChat Official Account Operation Service Price'
          },
          wechatOperation: {
            zh: '公众号运营',
            en: 'WeChat Official Account Operation'
          },
          wechatOperationContent: {
            zh: '20条公众号独家内容+发布',
            en: '20 exclusive WeChat official account contents + publishing'
          },
          wechatDesign: {
            zh: '公众号图片设计',
            en: 'WeChat Official Account Image Design'
          },
          wechatDesignContent: {
            zh: '文章配图设计',
            en: 'Article illustration design'
          },
          wechatMaterials: {
            zh: '公众号其他物料',
            en: 'Other WeChat Official Account Materials'
          },
          wechatMaterialsContent: {
            zh: '文章尾图+banner图',
            en: 'Article end images + banner images'
          }
        }
    },
    
    // 联系我们
    contact: {
      title: { zh: '开启您的中东房产数字化增长', en: 'Start Your Middle East Real Estate Digital Growth' },
      badge: { zh: '联系我们', en: 'Contact Us' },
      description: { zh: '立即咨询，定制IP孵化、网站搭建等专属方案', en: 'Consult now to customize exclusive solutions for IP incubation, website development, etc.' }
    },
    
    // 联系表单
    contactForm: {
      title: { zh: '发送消息', en: 'Send Message' },
      name: { zh: '姓名', en: 'Name' },
      namePlaceholder: { zh: '请输入您的姓名', en: 'Please enter your name' },
      email: { zh: '邮箱', en: 'Email' },
      emailPlaceholder: { zh: '请输入您的邮箱', en: 'Please enter your email' },
      company: { zh: '公司名称', en: 'Company' },
      companyPlaceholder: { zh: '请输入公司名称', en: 'Please enter your company name' },
      message: { zh: '消息内容', en: 'Message' },
      messagePlaceholder: { zh: '请描述您的需求...', en: 'Please describe your needs...' },
      submit: { zh: '发送消息', en: 'Send Message' },
      submitting: { zh: '发送中...', en: 'Sending...' },
      successMessage: { zh: '消息发送成功！我们会尽快与您联系。', en: 'Message sent successfully! We will contact you soon.' },
      errorMessage: { zh: '发送失败，请稍后重试。', en: 'Failed to send, please try again later.' }
    },
    
    // 联系信息
    contactInfo: {
      email: {
        title: { zh: '邮箱联系', en: 'Email Contact' }
      },
      phone: {
        title: { zh: '电话咨询', en: 'Phone Consultation' },
        hours: { zh: '工作日 9:00-18:00', en: 'Weekdays 9:00-18:00' }
      },
      address: {
        title: { zh: '办公地址', en: 'Office Address' }
      }
    },
  
  // 页脚
  footer: {
    about: { zh: '关于我们', en: 'About Us' },
    services: { zh: '我们的服务', en: 'Our Services' },
    contact: { zh: '联系方式', en: 'Contact Us' },
    copyright: { zh: '© KLF STUDIO. 保留所有权利。', en: '© KLF STUDIO. All rights reserved.' },
    description: { zh: '专注中东地产领域的数字营销与科技服务，为中东房产客户提供从IP孵化到区块链应用的全栈解决方案', en: 'Focused on digital marketing and technology services in the Middle East real estate sector, providing full-stack solutions from IP incubation to blockchain applications for Middle East real estate clients' },
    wechat: { zh: '微信', en: 'WeChat' },
    scanQR: { zh: '扫描二维码添加微信', en: 'Scan QR code to add WeChat' },
    coreBusiness: { zh: '核心业务', en: 'Core Business' },
    agentIP: { zh: '经纪人IP孵化', en: 'Agent IP Incubation' },
    realEstateCRM: { zh: '房产CRM系统', en: 'Real Estate CRM System' },
    tokenizationService: { zh: '房产代币化服务', en: 'Real Estate Tokenization Service' },
    socialMedia: { zh: '社媒与内容代运营', en: 'Social Media & Content Management' },
    customerSupport: { zh: '客户支持', en: 'Customer Support' },
    helpCenter: { zh: '帮助中心', en: 'Help Center' },
    caseLibrary: { zh: '案例库', en: 'Case Library' },
    businessCooperation: { zh: '商业合作', en: 'Business Cooperation' },
    privacyPolicy: { zh: '隐私政策', en: 'Privacy Policy' },
    termsOfService: { zh: '服务条款', en: 'Terms of Service' },
    cookiePolicy: { zh: 'Cookie 政策', en: 'Cookie Policy' }
  },
  
  // 按钮
    btn: {
      more: { zh: '了解更多', en: 'Learn More' },
      readMore: { zh: '阅读更多', en: 'Read More' },
      contact: { zh: '联系我们', en: 'Contact Us' },
      submit: { zh: '提交', en: 'Submit' },
      viewMore: { zh: '查看更多资讯', en: 'View More News' }
    },
    
  // 新闻部分
    news: {
      badge: { zh: '新闻资讯', en: 'News' },
      title: { zh: '全球中东地产洞察', en: 'Global Middle East Real Estate Insights' },
      description: { zh: '了解行业最新趋势，获取产品更新信息和技术洞察', en: 'Stay updated with industry trends, product updates, and technical insights' },
      readMore: { zh: '阅读更多', en: 'Read More' },
      backToHome: { zh: '返回首页', en: 'Back to Home' },
      articles: [
        {
          category: { zh: '美团国际扩张', en: 'Meituan International Expansion' },
          title: { zh: '美团Keeta闪击中东！王兴加速全球布局', en: 'Meituan Keeta Strikes Middle East! Wang Xing Accelerates Global Expansion' },
          excerpt: { 
            zh: '当国内互联网企业还在为存量市场厮杀时，美团创始人王兴已将目光投向更广阔的海外版图。近期，美团旗下海外外卖平台Keeta在沙特阿拉伯展开大规模扩张，一口气新开通了11座城市的服务，包括达曼、吉达等重要城市。这一\'闪击\'行动标志着王兴正加速推动美团的全球化战略。', 
            en: 'While domestic internet companies are still competing for market share, Meituan founder Wang Xing has set his sights on broader overseas territories. Recently, Meituan\'s international food delivery platform Keeta has launched a large-scale expansion in Saudi Arabia, opening services in 11 new cities including Dammam and Jeddah. This "lightning strike" operation marks Wang Xing\'s accelerated push for Meituan\'s global strategy.' 
          },
          date: { zh: '2024年', en: '2024' },
          readTime: { zh: '8分钟阅读', en: '8 min read' },
          tags: [
            { zh: '美团', en: 'Meituan' },
            { zh: '海外扩张', en: 'Overseas Expansion' },
            { zh: '中东市场', en: 'Middle East Market' },
            { zh: '巴西市场', en: 'Brazil Market' },
            { zh: '国际化战略', en: 'Globalization Strategy' }
          ]
        },
        {
          category: { zh: '中东城市发展', en: 'Middle East Urban Development' },
          title: { zh: '沙特The Line：从科幻梦想到现实困境', en: 'Saudi Arabia\'s The Line: From Sci-Fi Dream to Realistic Challenges' },
          excerpt: { 
            zh: '作为沙特\'2030愿景\'的旗舰项目，The Line曾被视为人类历史上最雄心勃勃的城市规划之一，计划打造零碳排放、无汽车通行、完全由人工智能管理的未来之城。然而八年过去，项目面临进度滞后、目标缩水、资金危机等多重挑战，从最初的宏大愿景逐渐在现实中褪色。', 
            en: 'As the flagship project of Saudi Arabia\'s "Vision 2030", The Line was once regarded as one of the most ambitious urban plans in human history, aiming to create a zero-carbon, car-free, AI-governed future city. However, eight years later, the project faces multiple challenges including delays, scaled-back goals, and funding crises, gradually fading from its original grand vision into reality.' 
          },
          date: { zh: '2024年', en: '2024' },
          readTime: { zh: '8分钟阅读', en: '8 min read' },
          tags: [
            { zh: '沙特', en: 'Saudi Arabia' },
            { zh: '未来城市', en: 'Future City' },
            { zh: '城市规划', en: 'Urban Planning' }
          ]
        },
        {
          category: { zh: '中东旅游娱乐', en: 'Middle East Tourism & Entertainment' },
          title: { zh: '迪士尼中东首秀：阿布扎比2030年将迎来全球第七座迪士尼乐园', en: 'Disney\'s Middle East Debut: Abu Dhabi to Welcome World\'s Seventh Disneyland in 2030' },
          excerpt: { 
            zh: '2025年5月，华特迪士尼公司正式宣布，将与阿布扎比的米拉尔集团合作，在阿联酋首都阿布扎比兴建一座全新的迪士尼主题公园度假区。这座备受瞩目的主题乐园将坐落于阿布扎比的亚斯岛，预计于2030年初开门迎客。作为迪士尼在全球的第七座大型主题公园度假区、中东地区的第一座迪士尼乐园，它的诞生无疑将为中东乃至全球游客带来前所未有的梦幻体验。', 
            en: 'In May 2025, The Walt Disney Company officially announced its partnership with Abu Dhabi\'s Miral Group to build a brand-new Disney theme park resort in the UAE capital. This highly anticipated theme park will be located on Yas Island, Abu Dhabi, and is expected to open its doors in early 2030. As Disney\'s seventh large-scale theme park resort worldwide and the first in the Middle East, its creation will undoubtedly bring unprecedented magical experiences to tourists from the Middle East and beyond.' 
          },
          date: { zh: '2025年5月', en: 'May 2025' },
          readTime: { zh: '15分钟阅读', en: '15 min read' },
          tags: [
            { zh: '迪士尼', en: 'Disney' },
            { zh: '主题乐园', en: 'Theme Park' },
            { zh: '阿布扎比', en: 'Abu Dhabi' },
            { zh: '旅游发展', en: 'Tourism Development' }
          ]
        },
        {
          category: { zh: '中东科技创新', en: 'Middle East Tech Innovation' },
          title: { zh: '中东首款光子AI芯片量产，能效提升10倍的技术突破', en: 'Middle East\'s First Photonic AI Chip Mass Production, 10x Energy Efficiency Breakthrough' },
          excerpt: { 
            zh: '2025年8月，阿联酋阿布扎比的QuantLase研发中心宣布，其自主设计的中东首款工业级光子AI芯片已完成设计验证，正式进入欧洲晶圆厂的量产制造阶段。该芯片采用光而非电子来执行AI计算的核心矩阵运算，能效比当前最先进的GPU高出至少10倍。', 
            en: 'In August 2025, Abu Dhabi\'s QuantLase R&D Center announced that their independently designed industrial-grade photonic AI chip, the first in the Middle East, has completed design verification and officially entered mass production at a European wafer factory. The chip uses light rather than electrons to perform core matrix operations for AI computing, achieving at least 10 times higher energy efficiency than current state-of-the-art GPUs.' 
          },
          date: { zh: '2025年8月', en: 'August 2025' },
          readTime: { zh: '18分钟阅读', en: '18 min read' },
          tags: [
            { zh: '光子计算', en: 'Photonic Computing' },
            { zh: 'AI芯片', en: 'AI Chip' },
            { zh: '阿联酋', en: 'UAE' },
            { zh: '技术突破', en: 'Tech Breakthrough' }
          ]
        },
        {
          category: { zh: '迪拜房地产市场', en: 'Dubai Real Estate Market' },
          title: { zh: '迪拜人口突破396万，如何把握黄金机会？', en: 'Dubai\'s Population Exceeds 3.96 Million: How to Seize Golden Opportunities?' },
          excerpt: { 
            zh: '据迪拜统计中心数据，截至2025年6月，迪拜常住人口已达396.6769万人，较去年同期增长了约6%。这意味着过去一年中迪拜平均每天新增近200名居民。如此惊人的增长速度，使迪拜成为全球人口增长最快的城市之一。人口的迅猛增长直接导致住房需求激增，引发迪拜房地产市场的供需失衡。', 
            en: 'According to Dubai Statistics Center data, as of June 2025, Dubai\'s permanent population has reached 3,966,769, an increase of approximately 6% compared to the same period last year. This means that Dubai added nearly 200 new residents every day over the past year. Such an astonishing growth rate makes Dubai one of the fastest-growing cities globally. The rapid population growth has directly led to a surge in housing demand, causing an imbalance between supply and demand in Dubai\'s real estate market.' 
          },
          date: { zh: '2025年6月', en: 'June 2025' },
          readTime: { zh: '12分钟阅读', en: '12 min read' },
          tags: [
            { zh: '迪拜人口', en: 'Dubai Population' },
            { zh: '房地产市场', en: 'Real Estate Market' },
            { zh: '投资机会', en: 'Investment Opportunities' },
            { zh: '住房需求', en: 'Housing Demand' }
          ]
        },
        {
          category: { zh: '中东科技创新', en: 'Middle East Tech Innovation' },
          title: { zh: '沙特王子狂掷380亿美金，豪赌中国游戏，下一个《黑神话：悟空》已在路上？', en: 'Saudi Prince Invests $38 Billion in Chinese Gaming: Next "Black Myth: Wukong" On The Horizon?' },
          excerpt: { 
            zh: '沙特阿拉伯正开启一场前所未有的游戏产业革命，投入380亿美元打造全球游戏与电竞中心，将中国市场置于战略核心位置。', 
            en: 'Saudi Arabia is launching an unprecedented gaming industry revolution, investing $38 billion to build a global gaming and esports hub, with the Chinese market at its strategic core.' 
          },
          date: { zh: '2024年5月', en: 'May 2024' },
          readTime: { zh: '10分钟阅读', en: '10 min read' },
          tags: [
            { zh: '沙特投资', en: 'Saudi Investment' },
            { zh: '中国游戏', en: 'Chinese Gaming' },
            { zh: '《黑神话：悟空》', en: 'Black Myth: Wukong' },
            { zh: '游戏产业', en: 'Gaming Industry' },
            { zh: 'AI技术', en: 'AI Technology' }
          ]
        }
      ]
    },
  
  // 默认值 - 当翻译键不存在时使用
    default: { zh: '', en: '' },
      
      // 通用按钮翻译
      common: {
        close: { zh: '关闭', en: 'Close' },
        back: { zh: '返回', en: 'Back' }
      },
      // 测试页面
    test: {
      title: { zh: '测试页面', en: 'Test Page' }
    },
    
    // 图片测试页面
    imageTest: {
      title: { zh: '图片路径测试', en: 'Image Path Test' },
      path: { zh: '路径', en: 'Path' },
      test: { zh: '测试', en: 'Test' },
      status: { zh: '状态', en: 'Status' },
      loading: { zh: '加载中...', en: 'Loading...' },
      loadedSuccess: { zh: '✅ 加载成功', en: '✅ Loaded Successfully' },
      loadedFailed: { zh: '❌ 加载失败', en: '❌ Failed to Load' }
    }
};

// 翻译上下文接口
interface TranslationContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, defaultValue?: string) => string;
  toggleLanguage: () => void;
}

// 创建翻译上下文
const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

// 翻译提供者组件接口
interface TranslationProviderProps {
  children: ReactNode;
}

// 翻译提供者组件
export const TranslationProvider: React.FC<TranslationProviderProps> = ({ children }) => {
  // 从localStorage获取语言设置，如果没有则默认为中文
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const savedLanguage = localStorage.getItem('preferred-language') as Language | null;
      return savedLanguage || 'zh';
    }
    return 'zh';
  });

  // 保存语言设置到localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('preferred-language', language);
    }
  }, [language]);

  // 翻译函数
  const t = (key: string, defaultValue?: string): string => {
    // 支持嵌套键访问，如 'footer.about'
    const keys = key.split('.');
    let value: any = translations;
    
    for (const k of keys) {
      if (value[k] === undefined) {
        return defaultValue || key;
      }
      value = value[k];
    }
    
    if (typeof value === 'object' && value !== null) {
      return value[language];
    }
    
    return defaultValue || key;
  };

  // 切换语言函数
  const toggleLanguage = () => {
    setLanguage(language === 'zh' ? 'en' : 'zh');
  };

  const contextValue: TranslationContextType = {
    language,
    setLanguage,
    t,
    toggleLanguage,
  };

  return React.createElement(
    TranslationContext.Provider,
    { value: contextValue },
    children
  );
};

// 使用翻译钩子
export const useTranslation = (): TranslationContextType => {
  const context = useContext(TranslationContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
};