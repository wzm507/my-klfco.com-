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
  size = 150,
  intensity = 0.6,
  color = 'rgba(255, 255, 255, 0.3)',
}: TorchLightProps) {
  const torchRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!torchRef.current) return;

      // 更新光斑位置，调整为鼠标中心
      torchRef.current.style.left = `${e.clientX - size / 2}px`;
      torchRef.current.style.top = `${e.clientY - size / 2}px`;
    };

    // 监听鼠标移动
    window.addEventListener('mousemove', handleMouseMove);

    // 清理事件监听器
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [size]);

  // 创建径向渐变效果，确保光斑边缘平滑过渡
  const gradientStyle = {
    background: `radial-gradient(circle at center, ${color}, transparent ${intensity * 100}%)`,
    width: `${size}px`,
    height: `${size}px`,
  };

  return (
    <div
      ref={torchRef}
      className={cn(
        'fixed pointer-events-none mix-blend-overlay z-50 opacity-80 transition-all duration-50 ease-out',
        className
      )}
      style={gradientStyle}
    />
  );
}