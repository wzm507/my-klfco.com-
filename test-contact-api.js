const http = require('http');

// 测试邮件数据
const testData = JSON.stringify({
  name: '测试用户',
  email: 'test@example.com',
  company: '测试公司',
  message: '这是一封测试邮件'
});

// 配置请求选项
const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/api/contact',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(testData)
  }
};

console.log('正在测试联系表单API...');

// 发送请求
const req = http.request(options, (res) => {
  let data = '';
  
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    console.log('响应状态码:', res.statusCode);
    console.log('响应内容:', data);
  });
});

req.on('error', (error) => {
  console.error('发送请求失败:', error);
});

// 写入请求体并结束请求
req.write(testData);
req.end();