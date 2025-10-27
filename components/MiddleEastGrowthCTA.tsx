"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Mail, Phone, MapPin } from 'lucide-react'
import { useTranslation } from '@/hooks/use-translation'

export default function MiddleEastGrowthCTA() {
  const { t } = useTranslation()
  
  // 表单状态
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<'success' | 'error' | null>(null);
  const [statusMessage, setStatusMessage] = useState('');

  // 表单提交处理
  const handleSubmit = async () => {
    // 简单验证
    if (!formData.name || !formData.email || !formData.message) {
      setStatus('error');
      setStatusMessage('请填写必填字段');
      return;
    }

    setIsSubmitting(true);
    setStatus(null);
    setStatusMessage('');

    try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

      const data = await response.json();

      if (data.success) {
        setStatus('success');
        setStatusMessage('消息发送成功，我们会尽快与您联系');
        // 重置表单
        setFormData({
          name: '',
          email: '',
          company: '',
          message: '',
        });
      } else {
        setStatus('error');
        setStatusMessage(data.message || '消息发送失败，请稍后再试');
      }
    } catch (error) {
      setStatus('error');
      setStatusMessage('网络错误，请稍后再试');
      console.error('提交表单时出错:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-24 relative bg-gradient-to-b from-[#030014] to-[#0a0529]">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(124,58,237,0.3),transparent_70%)]"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mb-20">
          {/* 删除指定的三段文本 */}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="bg-gray-900/50 border-gray-800">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-white">{t('contactForm.title') || '发送消息'}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">{t('contactForm.name') || '姓名'}</label>
                  <Input
                    placeholder={t('contactForm.namePlaceholder') || '请输入您的姓名'}
                    className="bg-gray-800 border-gray-700 text-white"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">{t('contactForm.email') || '邮箱'}</label>
                  <Input
                    type="email"
                    placeholder={t('contactForm.emailPlaceholder') || '请输入您的邮箱'}
                    className="bg-gray-800 border-gray-700 text-white"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">{t('contactForm.company') || '公司名称'}</label>
                <Input
                  placeholder={t('contactForm.companyPlaceholder') || '请输入公司名称'}
                  className="bg-gray-800 border-gray-700 text-white"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">{t('contactForm.message') || '留言'}</label>
                <Textarea
                  placeholder={t('contactForm.messagePlaceholder') || '请输入您的留言'}
                  rows={4}
                  className="bg-gray-800 border-gray-700 text-white"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
              </div>
              <Button
                className={`w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                onClick={handleSubmit}
                disabled={isSubmitting}
              >
                {isSubmitting ? t('contactForm.submitting') || '发送中...' : t('contactForm.submit') || '发送消息'}
              </Button>
              {statusMessage && (
                <div className={`text-center ${status === 'success' ? 'text-green-500' : 'text-red-500'} mt-4`}>
                  {status === 'success' ? t('contactForm.successMessage') || '消息发送成功' : t('contactForm.errorMessage') || '发送失败'}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Contact Info */}
          <div className="space-y-8">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center">
                <Mail className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">{t('contactInfo.email.title') || '邮箱联系'}</h3>
                <p className="text-gray-400">Robin@klfco.com</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center">
                <Phone className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">{t('contactInfo.phone.title') || '电话咨询'}</h3>
                <p className="text-gray-400">+86 158-1886-1497</p>
                <p className="text-gray-400">{t('contactInfo.phone.hours') || '工作日 9:00-18:00'}</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center">
                <MapPin className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">{t('contactInfo.address.title') || '办公地址'}</h3>
                <p className="text-gray-400">广州市番禺区基盛中心大厦八楼A12</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}