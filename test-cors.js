const http = require('http');

// 测试数据
const testData = JSON.stringify({
  name: '测试用户',
  email: 'test@example.com',
  company: '测试公司',
  message: '这是一个测试消息，用于验证CORS配置'
});

// 请求选项
const options = {
  hostname: 'localhost',
  port: 3002,
  path: '/send-email',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(testData)
  }
};

console.log('正在测试email-service.js的CORS配置...');
const req = http.request(options, (res) => {
  console.log(`状态码: ${res.statusCode}`);
  console.log('响应头:', res.headers);
  
  // 检查CORS相关头部是否存在
  if (res.headers['access-control-allow-origin']) {
    console.log('✅ CORS配置生效: Access-Control-Allow-Origin存在');
  } else {
    console.log('❌ CORS配置未生效: Access-Control-Allow-Origin不存在');
  }
  
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    console.log('响应内容:', data);
  });
});

req.on('error', (error) => {
  console.error('请求错误:', error);
});

req.write(testData);
req.end();