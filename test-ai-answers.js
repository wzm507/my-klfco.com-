const http = require('http');

// 测试问题列表
const testQuestions = [
  '如何提升品牌出海影响力？',
  '中东市场有哪些特点？',
  'KLF公司介绍',
  '你们是谁'
];

// 创建HTTP请求选项
function createRequestOptions(data) {
  return {
    hostname: 'localhost',
    port: 3000,
    path: '/api/ai-search',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(data)
    }
  };
}

// 测试单个问题
function testQuestion(question) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify({ query: question });
    const options = createRequestOptions(data);

    const req = http.request(options, (res) => {
      let responseData = '';

      res.on('data', (chunk) => {
        responseData += chunk;
      });

      res.on('end', () => {
        try {
          const result = JSON.parse(responseData);
          resolve({ question, result, statusCode: res.statusCode });
        } catch (error) {
          reject(new Error(`解析响应失败: ${error.message}`));
        }
      });
    });

    req.on('error', (error) => {
      reject(new Error(`请求失败: ${error.message}`));
    });

    req.write(data);
    req.end();
  });
}

// 运行所有测试
async function runAllTests() {
  console.log('开始测试AI搜索功能...\n');
  
  for (const question of testQuestions) {
    try {
      console.log(`测试问题: "${question}"`);
      console.log('正在发送请求...');
      
      const startTime = Date.now();
      const { result, statusCode } = await testQuestion(question);
      const endTime = Date.now();
      
      console.log(`状态码: ${statusCode}`);
      console.log(`响应时间: ${endTime - startTime}ms`);
      
      if (result.success && result.data) {
        console.log('搜索结果: 找到了相关答案');
        console.log(`来源: ${result.data.source}`);
        // 打印答案的前100个字符
        console.log(`答案预览: ${result.data.answer.substring(0, 100)}...\n`);
      } else {
        console.log('搜索结果: 未找到相关答案');
        console.log(`错误信息: ${result.message || '未知错误'}\n`);
      }
    } catch (error) {
      console.error(`测试失败: ${error.message}\n`);
    }
  }
  
  console.log('所有测试完成!');
}

// 运行测试
runAllTests().catch(err => {
  console.error('测试过程中发生错误:', err);
});