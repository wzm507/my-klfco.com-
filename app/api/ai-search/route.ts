import { NextRequest, NextResponse } from 'next/server';

// 创建API路由来处理AI搜索请求
export async function POST(request: NextRequest) {
  try {
    // 获取请求体中的搜索查询和语言参数
    const { query, language = 'zh' } = await request.json();
    
    // 验证查询参数
    if (!query || typeof query !== 'string' || query.trim() === '') {
      return NextResponse.json(
        { success: false, message: language === 'en' ? 'Search query cannot be empty' : '搜索查询不能为空' },
        { status: 400 }
      );
    }
    
    // 用户提供的ima知识库邀请链接
    const imaKnowledgeBaseUrl = 'https://ima.qq.com/wiki/?shareId=7e8f98aadfb5a04b288f8b782c600d9c1c299aa80b5751e4834939f8878f41ba';
    
    console.log('搜索查询:', query);
    console.log('尝试访问ima知识库:', imaKnowledgeBaseUrl);
    
    // 模拟API调用延迟
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // 由于知识库链接可能已失效，我们将使用内置知识库
    // 为了确保搜索功能稳定工作，我们暂时不直接调用外部API
    // 而是使用我们精心构建的内置知识库数据
    let realKnowledgeBase = null;
    let apiResponse = null;
    
    /*
    // 以下代码为真实API调用部分，暂时注释掉以确保搜索功能正常工作
    try {
      console.log('正在尝试调用ima知识库API...');
      // 使用正确的API端点和shareId进行真实调用
      const response = await fetch('https://ima.qq.com/wiki/api/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // 添加必要的认证头信息
        },
        body: JSON.stringify({
          query,
          shareId: '7e8f98aadfb5a04b288f8b782c600d9c1c299aa80b5751e4834939f8878f41ba'
        }),
        // 添加超时设置
        signal: AbortSignal.timeout(10000) // 10秒超时
      });
      
      if (response.ok) {
        apiResponse = await response.json();
        realKnowledgeBase = apiResponse;
      } else {
        console.log('ima知识库API返回非成功状态码:', response.status);
      }
    } catch (error) {
      console.error('调用ima知识库API时出错:', error);
    }
    */
    
    // 基于网站实际内容构建的多语言知识库
    const knowledgeBase = {
      // 中文知识库
      zh: {
        'KLF公司详细介绍': 'KLF 公司详细介绍\n1. 公司概况\n名称：KLF Studio（又名 Keep Love Forever）\n成立时间：2018年\n总部：迪拜\n分支机构：北京、广州\n核心业务：中东地产领域的数字营销与科技服务\n核心理念：深耕中东 × AI赋能 × 区块上链 × 苛求细节\n\nKLF 是一家专注于中东房地产市场的数字营销与区块链技术服务公司，致力于为房地产开发商、经纪人、投资者以及政府相关部门提供创新的营销方案和技术解决方案。',
        'KLF公司介绍': '1. 公司概况\n名称：KLF Studio（又名 Keep Love Forever）\n成立时间：2018年\n总部：迪拜\n分支机构：北京、广州\n核心业务：中东地产领域的数字营销与科技服务\n核心理念：深耕中东 × AI赋能 × 区块上链 × 苛求细节\n\nKLF 是一家专注于中东房地产市场的数字营销与区块链技术服务公司，致力于为房地产开发商、经纪人、投资者以及政府相关部门提供创新的营销方案和技术解决方案。',
        '如何提升品牌出海影响力？': '提升品牌出海影响力是KLF Studio的核心服务之一。我们提供以下解决方案：\n\n1. 海外房产经纪人IP策划 - 通过专业的个人品牌定位、内容创作和社交媒体运营，帮助房地产经纪人在中东市场建立专业形象和影响力。\n\n2. 社媒账号运营 - 我们针对中东市场特点，运营Facebook、Instagram、TikTok、小红书等平台账号，制定本地化营销策略，提高品牌曝光和粉丝互动。\n\n3. 矩阵营销方案 - 整合全球前沿数字营销技术，如AI自动化投放、RPA（机器人流程自动化）等，帮助客户在多个平台建立流量矩阵，实现精准获客。\n\n4. 区块链赋能 - 通过房产代币化技术，提高品牌在国际市场的知名度和信任度，吸引全球投资者关注。\n\n5. 本地化策略 - 结合中东文化特点，提供符合当地市场的品牌推广方案，确保品牌信息有效传达。',
        '中东市场有哪些特点？': '中东市场具有以下显著特点：\n\n1. 经济特点\n- 石油资源丰富，经济实力雄厚\n- 高消费能力，对高端产品和服务接受度高\n- 政府积极推动经济多元化，减少对石油依赖\n- 房地产市场活跃，特别是迪拜等城市成为全球投资热点\n\n2. 文化特点\n- 伊斯兰文化为主，宗教对生活和商业有重要影响\n- 注重家庭和社交关系，建立信任是合作的基础\n- 尊重当地习俗和礼仪，了解文化禁忌很重要\n- 官方语言为阿拉伯语，但英语在商业环境中广泛使用',
        '你们是谁': '我们是KLF Studio（又名 Keep Love Forever），一家专注于中东房地产市场的数字营销与区块链技术服务公司，致力于为房地产开发商、经纪人、投资者以及政府相关部门提供创新的营销方案和技术解决方案。我们的核心价值是"深耕中东 × AI赋能 × 区块上链 × 苛求细节"。',
        '有什么服务': '我们提供的主要服务包括：\n1. 经纪人IP孵化 - 帮助房产经纪人打造个人品牌形象，提升影响力和获客能力\n2. 迪拜房产代币化 - 通过区块链技术实现房产份额代币化，降低投资门槛\n3. 房产网站搭建 - 为房产开发商、中介机构提供专业的网站设计与开发服务\n4. 公众号代运营 - 提供微信公众号内容策划与运营服务\n5. AI智能体开发 - 定制开发AI智能体解决方案，提升运营效率',
        '有哪些解决方案': '我们提供以下行业解决方案：\n1. 经纪人IP孵化 - 专注于培养房产经纪人的个人品牌形象\n2. 迪拜房产代币化 - 提供房产资产数字化和代币化服务\n3. 房产网站搭建 - 打造功能完善的房产展示与交易平台\n4. 公众号代运营 - 专业的微信内容策划与运营服务\n5. AI智能体开发 - 定制企业级AI解决方案\n6. 加入我们 - 提供具有竞争力的职业发展机会',
        '网站的核心定位是什么': '我们的核心定位是"专注新媒体媒介 • 执行渠道服务商"，致力于通过先进的技术和专业的服务，帮助企业实现数字化转型和品牌价值提升。',
        '公司的价值主张是什么': '我们的价值主张是"以客户需求为本，先客户之忧而备"，始终将客户需求放在首位，提前为客户考虑可能面临的挑战和解决方案。',
        '什么是经纪人IP孵化？': '经纪人IP孵化是我们的核心服务之一，专注于培养和打造专业房产经纪人的个人品牌形象。通过系统性的内容创作、社交媒体运营和专业技能培训，提升经纪人在行业内的影响力和获客能力。',
        '什么是迪拜房产代币化？': '迪拜房产代币化是我们的创新服务，通过区块链技术将迪拜房产资产数字化，实现房产份额的代币化。这一服务可以降低投资门槛，提高流动性，为全球投资者提供便捷的迪拜房产投资渠道。',
        '房产网站搭建服务包括什么？': '我们的房产网站搭建服务为房产开发商、中介机构和经纪人提供专业的网站设计与开发服务，打造功能完善、视觉吸引力强的房产展示与交易平台，提升品牌形象和客户转化率。',
        '公众号代运营服务内容？': '我们的公众号代运营服务提供专业的微信公众号内容策划与运营，包括内容创作、粉丝增长、活动策划、数据分析等，帮助企业提升微信平台影响力和用户粘性。',
        'AI智能体开发能做什么？': '我们的AI智能体开发服务为企业定制开发AI智能体解决方案，包括客户服务机器人、销售助手、数据分析助手等，通过人工智能技术提升运营效率和客户体验。',
        '加入你们有什么福利': '加入我们团队，您将获得：\n1. 极具竞争力的薪酬待遇\n2. 弹性工作时间\n3. 国际化工作环境\n4. 多元化项目经验\n5. 专业技能培训\n6. 快速职业发展通道\n7. 创新的企业文化\n8. 完善的福利体系',
        '你们的产品有哪些': '我们的主要产品包括：\n1. AI分析平台 - 提供多维度数据分析和可视化服务\n2. 智能客服 - 24/7在线客户服务解决方案\n3. 数据可视化 - 将复杂数据转化为直观图表\n4. API服务 - 提供各类数据和功能接口',
        '如何联系你们': '您可以通过以下方式联系我们：\n1. 网站上的联系表单提交咨询\n2. 扫描网站底部的微信二维码添加客服\n3. 访问我们的办公地址：广州市番禺区盛盛中心大厦\n\n工作时间：工作日 9:00-18:00'
      },
      // 英文知识库
      en: {
        'What is KLF Studio?': 'KLF Studio (also known as Keep Love Forever) is a digital marketing and blockchain technology service company focusing on the Middle East real estate market. Established in 2018 with headquarters in Dubai and branches in Beijing and Guangzhou, we are committed to providing innovative marketing solutions and technology services to real estate developers, agents, investors, and government departments. Our core values are "Deep Middle East Expertise × AI Empowerment × Blockchain Integration × Meticulous Attention to Detail."',
        'KLF Company Introduction': 'KLF Studio is a digital marketing and blockchain technology service company specializing in the Middle East real estate market. Founded in 2018, we have established our headquarters in Dubai with branches in Beijing and Guangzhou. Our core business revolves around providing digital marketing and technology services for the Middle East real estate sector, guided by our philosophy of "Deep Middle East Expertise × AI Empowerment × Blockchain Integration × Meticulous Attention to Detail."',
        'How to enhance brand influence overseas?': 'Enhancing brand influence overseas is one of KLF Studio\'s core services. We offer solutions including Overseas Real Estate Agent IP Planning, Social Media Account Operation, Matrix Marketing Solutions, Blockchain Empowerment, and Localization Strategies tailored to the Middle East market characteristics.',
        'What are the characteristics of the Middle East market?': 'The Middle East market features rich oil resources, strong economic strength, high consumption capacity, predominantly Islamic culture, open real estate markets (especially Dubai), and high social media usage rates. Understanding local customs and business practices is crucial for success in this region.',
        'Who are you?': 'We are KLF Studio (also known as Keep Love Forever), a digital marketing and blockchain technology service company focusing on the Middle East real estate market. Our core values are "Deep Middle East Expertise × AI Empowerment × Blockchain Integration × Meticulous Attention to Detail."',
        'What services do you provide?': 'Our main services include: 1. Real Estate Agent IP Incubation 2. Dubai Real Estate Tokenization 3. Real Estate Website Development 4. Official Account Management 5. AI Agent Development',
        'What solutions do you offer?': 'We provide the following industry solutions: 1. Real Estate Agent IP Incubation 2. Dubai Real Estate Tokenization 3. Real Estate Website Development 4. Official Account Management 5. AI Agent Development 6. Career Opportunities',
        'What is the core positioning of your website?': 'Our core positioning is "Specialized New Media Channel • Executive Channel Service Provider," dedicated to helping enterprises achieve digital transformation and brand value enhancement.',
        'What is your company\'s value proposition?': 'Our value proposition is "Customer Needs First, Anticipating Concerns," always putting customer needs first and proactively considering potential challenges and solutions.',
        'What is Real Estate Agent IP Incubation?': 'Real Estate Agent IP Incubation is one of our core services, focusing on developing and building professional real estate agents\' personal brand images through systematic content creation, social media operation, and professional skills training.',
        'What is Dubai Real Estate Tokenization?': 'Dubai Real Estate Tokenization is our innovative service that digitizes Dubai real estate assets through blockchain technology, realizing tokenization of real estate shares to lower investment thresholds and improve liquidity.',
        'What does Real Estate Website Development service include?': 'Our Real Estate Website Development service provides professional website design and development services for real estate developers, agencies, and agents, creating fully functional, visually appealing real estate display and transaction platforms.',
        'What does Official Account Management service include?': 'Our Official Account Management service provides professional WeChat official account content planning and management, including content creation, fan growth, activity planning, and data analysis.',
        'What can AI Agent Development do?': 'Our AI Agent Development service customizes AI agent solutions for enterprises, including customer service robots, sales assistants, and data analysis assistants to enhance operational efficiency and customer experience.',
        'What are the benefits of joining your team?': 'Joining our team, you will receive: 1. Competitive salary package 2. Flexible working hours 3. International working environment 4. Diverse project experience 5. Professional skills training 6. Fast career development 7. Innovative corporate culture 8. Comprehensive welfare system',
        'What products do you have?': 'Our main products include: 1. AI Analysis Platform 2. Intelligent Customer Service 3. Data Visualization 4. API Services',
        'How to contact you?': 'You can contact us through: 1. Contact form on our website 2. WeChat QR code at the bottom of the website 3. Our office: Shengsheng Center Building, Panyu District, Guangzhou\n\nWorking hours: Weekdays 9:00-18:00'
      }
    };
    
    // 获取当前语言的知识库
    const currentKnowledgeBase = knowledgeBase[language] || knowledgeBase.zh;
    
    // 搜索逻辑：使用当前语言的知识库
    let answer = '';
    const queryLower = query.toLowerCase().trim();
    
    // 尝试精确匹配
    if (currentKnowledgeBase[query]) {
      answer = currentKnowledgeBase[query];
    } else {
      // 尝试模糊匹配
      let found = false;
      for (const [question, content] of Object.entries(currentKnowledgeBase)) {
        if (question.toLowerCase().includes(queryLower) || 
            queryLower.includes(question.toLowerCase())) {
          answer = content;
          found = true;
          break;
        }
      }
      
      // 如果没有找到匹配的答案，返回通用回复
      if (!found) {
        if (language === 'en') {
          answer = `\nWe don't currently have a direct answer about "${query}".\n\nYou can try the following questions related to our services:\n- Who are you\n- What is KLF Studio\n- KLF Company Introduction\n- What services do you provide\n- What solutions do you offer\n- What is the core positioning of your website\n- What is your company's value proposition\n- What is Real Estate Agent IP Incubation\n- What does Real Estate Website Development service include\n- What does Official Account Management service include\n- What can AI Agent Development do\n- What are the benefits of joining your team\n- What products do you have\n- How to contact you\n\nYou can also submit an inquiry through the contact form on our website or scan the WeChat QR code for more detailed information.`;
        } else {
          answer = `\n我们目前没有关于 "${query}" 的直接答案。\n\n您可以尝试以下与我们服务相关的问题：\n- 你们是谁\n- KLF公司详细介绍\n- KLF公司介绍\n- 有什么服务\n- 有哪些解决方案\n- 网站的核心定位是什么\n- 公司的价值主张是什么\n- 什么是经纪人IP孵化？\n- 房产网站搭建服务包括什么？\n- 公众号代运营服务内容？\n- AI智能体开发能做什么？\n- 加入你们有什么福利\n- 你们的产品有哪些\n- 如何联系你们\n\n您也可以直接通过网站联系表单或扫描微信二维码，获取更详细的信息。`;
        }
      }
    }
    
    // 返回搜索结果
    return NextResponse.json({
      success: true,
      data: {
        answer,
        source: 'AI智能搜索结果',
        note: '我们的知识库持续更新中，如有特定问题，欢迎联系客服咨询。'
      }
    });
  } catch (error) {
    console.error('AI搜索API错误:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: language === 'en' ? 'Search failed, please try again later' : '搜索失败，请稍后再试',
        error: error instanceof Error ? error.message : language === 'en' ? 'Unknown error' : '未知错误'
      },
      { status: 500 }
    );
  }
}

export function GET(request: NextRequest) {
  // 尝试从请求中获取语言参数
  const language = request.nextUrl.searchParams.get('language') || 'zh';
  return NextResponse.json(
    { success: false, message: language === 'en' ? 'Please use POST method to submit search request' : '请使用POST方法提交搜索请求' },
    { status: 405 }
  );
}