'use client';

import React, { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { cn } from '../lib/utils';

interface TorchLightProps {
  className?: string;
  size?: number;
  intensity?: number;
  color?: string;
}

/**
 * 鼠标光斑效果组件
 * 创建一个跟随鼠标移动的光斑，不影响页面内容的可读性
 */
export default function TorchLight({
  className,
  size = 200,
  intensity = 0.5,
  color = 'rgba(255, 255, 255, 0.5)',
}: TorchLightProps) {
  const torchRef = useRef<HTMLDivElement>(null);
  
  // 隐藏默认鼠标指针，让光斑成为唯一可见的"鼠标"
  useEffect(() => {
    // 隐藏默认鼠标指针
    document.body.style.cursor = 'none';
    
    // 清理函数
    return () => {
      // 恢复默认鼠标指针
      document.body.style.cursor = 'default';
    };
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!torchRef.current) return;

      // 使用transform代替直接修改left/top，性能更好
      torchRef.current.style.transform = `translate(${e.clientX - size / 2}px, ${e.clientY - size / 2}px)`;
    };

    // 监听鼠标移动
    window.addEventListener('mousemove', handleMouseMove);

    // 清理事件监听器
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [size]);

  // 创建更美观的光斑效果，优化渐变分布和阴影
  const gradientStyle = {
    background: `radial-gradient(
      circle at center,
      rgba(255, 255, 255, 0.95) 0%,  // 稍微降低中心透明度
      rgba(255, 255, 255, 0.7) 20%,   // 调整渐变节点位置
      rgba(255, 255, 255, 0.4) 45%,   // 使过渡更自然
      rgba(255, 255, 255, 0.15) 75%,  // 延长半透明区域
      transparent 100%
    )`,
    width: `${size}px`,
    height: `${size}px`,
    left: '0px',  // 设置初始位置
    top: '0px',   // 设置初始位置
    borderRadius: '50%',  // 确保圆形
    // 优化阴影效果，使光晕更柔和
    boxShadow: `
      0 0 20px 10px rgba(255, 255, 255, 0.2),
      0 0 40px 20px rgba(255, 255, 255, 0.1)
    `,
  };

  return (
    <div
      ref={torchRef}
      className={cn(
        'fixed pointer-events-none z-50 opacity-100 transition-all duration-150 ease-out',
        className
      )}
      style={gradientStyle}
    />
  );
}