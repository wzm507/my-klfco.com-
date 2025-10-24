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
          <TorchLight size={220} intensity={0.55} color="rgba(255, 255, 255, 0.6)" />
        </TranslationProvider>
      </body>
    </html>
  )
}



