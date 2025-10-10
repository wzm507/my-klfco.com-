/** @type {import('next').NextConfig} */
import path from 'path';
import { fileURLToPath } from 'url';

// 解决ES模块中__dirname未定义的问题
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const nextConfig = {
  webpack: (config) => {
    // 设置路径别名
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': __dirname,
    };

    // 配置处理中文字符
    config.module.rules.push({
      test: /\.(png|jpe?g|gif|svg|webp)$/i,
      loader: 'file-loader',
      options: {
        name: '[name].[hash].[ext]',
        outputPath: 'static/images/',
        publicPath: '/_next/static/images/',
        esModule: false,
      },
    });

    return config;
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: false,
    domains: [],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
      },
    ],
    // 支持中文字符路径
    disableStaticImages: false,
  },
  rewrites: async () => {
    return [
      {
        source: '/@vite/client',
        destination: '/_next/static/chunks/webpack.js',
      },
    ]
  },
}

export default nextConfig
