// 测试AI搜索API的脚本
const http = require('http');

// 测试数据
const testQuery = 'KLF公司介绍';

const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/api/ai-search',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(JSON.stringify({ query: testQuery }))
  }
};

const req = http.request(options, (res) => {
  let data = '';
  
  console.log(`测试AI搜索API - 状态码: ${res.statusCode}`);
  
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    try {
      const result = JSON.parse(data);
      console.log('搜索结果:');
      console.log('成功:', result.success);
      if (result.success && result.data) {
        console.log('答案:', result.data.answer.substring(0, 200) + '...');
        console.log('来源:', result.data.source);
      } else {
        console.log('错误信息:', result.message);
      }
    } catch (error) {
      console.error('解析响应失败:', error);
      console.log('原始响应:', data);
    }
  });
});

req.on('error', (e) => {
  console.error(`请求错误: ${e.message}`);
});

// 发送请求体
req.write(JSON.stringify({ query: testQuery }));
req.end();