const http = require('http');
const fs = require('fs');
const path = require('path');

// 读取.env文件
const envPath = path.resolve(process.cwd(), '.env');
const envContent = fs.readFileSync(envPath, 'utf8');
const envVars = Object.fromEntries(
  envContent.split('\n')
    .filter(line => line && !line.startsWith('#'))
    .map(line => {
      const [key, ...values] = line.split('=');
      return [key.trim(), values.join('=').trim()];
    })
);

// 创建一个简单的HTTP服务器
const server = http.createServer((req, res) => {
  // 添加CORS头部，允许所有来源的请求
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  // 处理OPTIONS预检请求
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }
  if (req.method === 'POST' && req.url === '/send-email') {
    let body = '';

    // 接收请求体数据
    req.on('data', chunk => {
      body += chunk.toString('utf8');
    });

    // 处理请求结束
    req.on('end', () => {
      try {
        // 解析请求体
        const data = JSON.parse(body);
        const { name, email, company, message } = data;

        // 验证输入
        if (!name || !email || !message) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: false, message: '缺少必填字段' }));
          return;
        }

        // 使用真实的邮件发送服务
        const nodemailer = require('nodemailer');
        
        // 创建邮件传输器
        const transporter = nodemailer.createTransport({
          host: envVars.EMAIL_HOST,
          port: envVars.EMAIL_PORT,
          secure: envVars.EMAIL_SECURE === 'true',
          auth: {
            user: envVars.EMAIL_USER,
            pass: envVars.EMAIL_PASS,
          },
        });
        
        // 邮件选项
        const mailOptions = {
          from: envVars.EMAIL_USER,
          to: envVars.RECIPIENT_EMAIL,
          subject: '新消息来自 ' + name + (company ? ' (' + company + ')' : ''),
          text: `姓名: ${name}\n邮箱: ${email}\n公司: ${company || '未提供'}\n消息内容: ${message}`,
        };
        
        // 发送邮件
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.error('发送邮件失败:', error);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: false, message: '发送邮件失败' }));
          } else {
            console.log('邮件发送成功:', info.response);
            // 返回成功响应
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: true, message: '邮件发送成功' }));
          }
        });
      } catch (error) {
        console.error('错误:', error);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, message: '服务器内部错误' }));
      }
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success: false, message: '未找到该路由' }));
  }
});

// 启动服务器
const PORT = 3002;
server.listen(PORT, () => {
  console.log(`邮件服务运行在 http://localhost:${PORT}`);
});

// 导出服务器以便测试
module.exports = server;