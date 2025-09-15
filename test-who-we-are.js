// 测试AI搜索API中"你们是谁"的回答是否已更新为KLF Studio

const http = require('http');

// 构建请求选项
const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/api/ai-search',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
};

// 测试数据
const testData = {
  query: '你们是谁',
};

// 发送请求
const req = http.request(options, (res) => {
  let data = '';

  // 接收响应数据
  res.on('data', (chunk) => {
    data += chunk;
  });

  // 响应完成时处理结果
  res.on('end', () => {
    try {
      const result = JSON.parse(data);
      console.log('状态码:', res.statusCode);
      console.log('响应成功:', result.success);
      if (result.success && result.data) {
        console.log('回答内容:', result.data.answer);
        console.log('来源:', result.data.source);
        // 检查是否包含KLF Studio
        if (result.data.answer.includes('KLF Studio')) {
          console.log('✓ 验证成功: 公司名称已正确更新为KLF Studio');
        } else {
          console.log('✗ 验证失败: 回答中未包含KLF Studio');
        }
      }
    } catch (error) {
      console.error('解析响应失败:', error);
    }
  });
});

// 处理请求错误
req.on('error', (error) => {
  console.error('请求失败:', error);
});

// 发送请求体
req.write(JSON.stringify(testData));
req.end();