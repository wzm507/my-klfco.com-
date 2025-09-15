const http = require('http');

// 测试数据
const testData = JSON.stringify({
  name: '测试用户',
  email: 'test@example.com',
  company: '测试公司',
  message: '这是一个详细的测试消息，用于验证完整的邮件发送流程'
});

console.log('开始测试完整的邮件发送流程...');
console.log('测试数据:', testData);
console.log('\n=== 测试直接调用email-service.js (端口3002) ===');

// 测试直接调用email-service.js
const emailServiceOptions = {
  hostname: 'localhost',
  port: 3002,
  path: '/send-email',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(testData)
  }
};

const emailServiceReq = http.request(emailServiceOptions, (res) => {
  console.log('email-service响应状态码:', res.statusCode);
  console.log('email-service响应头:', res.headers);
  
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    console.log('email-service响应内容:', data);
    
    // 等待2秒后测试通过Next.js API调用
    setTimeout(() => {
      console.log('\n=== 测试通过Next.js API调用 (端口3000) ===');
      testNextjsApi();
    }, 2000);
  });
});

emailServiceReq.on('error', (error) => {
  console.error('email-service请求错误:', error);
  
  // 即使出错也尝试测试Next.js API
  setTimeout(() => {
    console.log('\n=== 测试通过Next.js API调用 (端口3000) ===');
    testNextjsApi();
  }, 2000);
});

emailServiceReq.write(testData);
emailServiceReq.end();

// 测试通过Next.js API调用
function testNextjsApi() {
  const nextjsOptions = {
    hostname: 'localhost',
    port: 3000,
    path: '/api/contact',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(testData)
    }
  };
  
  const nextjsReq = http.request(nextjsOptions, (res) => {
    console.log('Next.js API响应状态码:', res.statusCode);
    console.log('Next.js API响应头:', res.headers);
    
    let data = '';
    res.on('data', (chunk) => {
      data += chunk;
    });
    
    res.on('end', () => {
      console.log('Next.js API响应内容:', data);
      console.log('\n=== 测试完成 ===');
      console.log('请检查两个服务的日志以获取更多详细信息。');
    });
  });
  
  nextjsReq.on('error', (error) => {
    console.error('Next.js API请求错误:', error);
    console.log('\n=== 测试完成，但存在错误 ===');
  });
  
  nextjsReq.write(testData);
  nextjsReq.end();
}