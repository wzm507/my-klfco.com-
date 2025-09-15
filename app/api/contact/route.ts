import { NextResponse } from 'next/server';

// 禁用Next.js的自动body解析
export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(request) {
  try {
    // 手动读取请求体
    const buffer = await request.arrayBuffer();
    const rawBody = Buffer.from(buffer).toString('utf8');

    // 获取请求内容类型
    const contentType = request.headers.get('content-type') || '';

    // 解析请求体数据
    let name = '';
    let email = '';
    let company = '';
    let message = '';

    if (contentType.includes('application/json')) {
      try {
        const data = JSON.parse(rawBody);
        name = data.name || '';
        email = data.email || '';
        company = data.company || '';
        message = data.message || '';
      } catch (error) {
        console.error('JSON解析错误:', error);
        return NextResponse.json(
          { success: false, message: '数据解析失败' },
          { status: 400 }
        );
      }
    } else if (contentType.includes('application/x-www-form-urlencoded')) {
      const formData = new URLSearchParams(rawBody);
      name = formData.get('name') || '';
      email = formData.get('email') || '';
      company = formData.get('company') || '';
      message = formData.get('message') || '';
    } else {
      return NextResponse.json(
        { success: false, message: '不支持的内容类型' },
        { status: 415 }
      );
    }

    // 验证输入数据
    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, message: '缺少必填字段' },
        { status: 400 }
      );
    }

    // 使用真实的邮件发送服务
    const nodemailer = require('nodemailer');
    
    // 创建邮件传输器
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST || 'smtp.qq.com',
      port: parseInt(process.env.EMAIL_PORT || '587'),
      secure: process.env.EMAIL_SECURE === 'true',
      auth: {
        user: process.env.EMAIL_USER || '227694316@qq.com',
        pass: process.env.EMAIL_PASS || 'jumabzaiekhbbhee',
      },
    });
    
    // 邮件选项
    const mailOptions = {
      from: process.env.EMAIL_USER || '227694316@qq.com',
      to: process.env.RECIPIENT_EMAIL || '227694316@qq.com',
      subject: '新消息来自 ' + name + (company ? ' (' + company + ')' : ''),
      text: `姓名: ${name}\n邮箱: ${email}\n公司: ${company || '未提供'}\n消息内容: ${message}`,
    };
    
    try {
      // 发送邮件
      await transporter.sendMail(mailOptions);
      console.log('邮件发送成功');
    } catch (error) {
      console.error('发送邮件失败:', error);
      throw new Error('发送邮件失败');
    }

    // 模拟API调用延迟
    await new Promise(resolve => setTimeout(resolve, 1000));

    return NextResponse.json({
      success: true,
      message: '邮件发送成功'
    });
  } catch (error) {
    console.error('API错误:', error);
    return NextResponse.json(
      { success: false, message: '服务器内部错误' },
      { status: 500 }
    );
  }
}

export function GET() {
  return NextResponse.json(
    { success: false, message: '请使用POST方法提交表单' },
    { status: 405 }
  );
}