import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import './globals.css'
import { TranslationProvider } from '../hooks/use-translation'
import TorchLight from '../components/TorchLight'

export const metadata: Metadata = {
  title: 'KLF 中东数字营销专家',
  description: '为中东房产开发商、经纪人提供营销·代币化·AI智能体等全栈解决方案',
  generator: 'v0.dev',
  icons: {
    icon: '/llllogo.png',
  },
  keywords: ['中东房产', '数字营销', '区块链', '代币化', 'AI智能体', '房产营销', '迪拜房产', '中东市场'],
  authors: [
    {
      name: 'KLF团队',
      url: 'https://my-klfco.com',
    },
  ],
  creator: 'KLF团队',
  publisher: 'KLF公司',
  openGraph: {
    type: 'website',
    title: 'KLF 中东数字营销专家',
    description: '为中东房产开发商、经纪人提供营销·代币化·AI智能体等全栈解决方案',
    url: 'https://my-klfco.com',
    siteName: 'KLF中东数字营销',
    images: [
      {
        url: 'https://my-klfco.com/hero-background.png',
        width: 1200,
        height: 630,
        alt: 'KLF中东数字营销专家',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'KLF 中东数字营销专家',
    description: '为中东房产开发商、经纪人提供营销·代币化·AI智能体等全栈解决方案',
    images: ['https://my-klfco.com/hero-background.png'],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh">
      <head>
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style>
      </head>
      <body>
        <TranslationProvider>
          {children}
          <TorchLight size={50} />
        </TranslationProvider>
      </body>
    </html>
  )
}



