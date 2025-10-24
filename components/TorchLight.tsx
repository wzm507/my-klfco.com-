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

  // 创建更自然的径向渐变效果，多层渐变增强"点亮"感
  const gradientStyle = {
    background: `radial-gradient(
      circle at center,
      rgba(255, 255, 255, 0.8) 0%,
      ${color} 40%,
      rgba(255, 255, 255, 0.1) 70%,
      transparent ${intensity * 100}%
    )`,
    width: `${size}px`,
    height: `${size}px`,
    boxShadow: `0 0 ${size/2}px ${size/4}px rgba(255, 255, 255, 0.15)`,
  };

  return (
    <div
      ref={torchRef}
      className={cn(
        'fixed pointer-events-none mix-blend-lighten z-50 opacity-90 transition-transform duration-75 ease-out',
        className
      )}
      style={gradientStyle}
    />
  );
}