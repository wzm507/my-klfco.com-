"use client"

import React, { useEffect, useRef } from 'react';

interface LanguageScanAnimationProps {
  isScanning: boolean;
  onAnimationComplete?: () => void;
}

export const LanguageScanAnimation: React.FC<LanguageScanAnimationProps> = ({ isScanning, onAnimationComplete }) => {
  const animationRef = useRef<HTMLDivElement>(null);
  const scanBarRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);

  // 使用JavaScript动画代替CSS动画
  useEffect(() => {
    if (isScanning && animationRef.current) {
      // 重置动画
      animationRef.current.style.transition = 'none';
      animationRef.current.style.transform = 'translateY(-100%)';
      animationRef.current.style.opacity = '0';
      
      // 强制重绘
      void animationRef.current.offsetHeight;
      
      // 开始动画
      animationRef.current.style.transition = 'opacity 0.1s ease-in-out';
      animationRef.current.style.opacity = '1';
      
      // 扫描条动画函数
      const pulseAnimation = () => {
        if (!scanBarRef.current) return;
        
        let opacity = 0.6;
        let direction = 1;
        let animationId: number | undefined;
        let timeoutId: number | undefined;
        
        const animate = () => {
          if (!scanBarRef.current) return;
          
          opacity += 0.04 * direction;
          
          // 检查边界并反转方向
          if (opacity >= 1) {
            opacity = 1;
            direction = -1;
            // 清除之前的定时器
            if (timeoutId) clearTimeout(timeoutId);
            timeoutId = window.setTimeout(() => {
              // 确保在超时回调中仍然有效
              if (scanBarRef.current) {
                animationId = requestAnimationFrame(animate);
              }
            }, 150);
            return;
          } else if (opacity <= 0.6) {
            opacity = 0.6;
            direction = 1;
            // 清除之前的定时器
            if (timeoutId) clearTimeout(timeoutId);
            timeoutId = window.setTimeout(() => {
              // 确保在超时回调中仍然有效
              if (scanBarRef.current) {
                animationId = requestAnimationFrame(animate);
              }
            }, 150);
            return;
          }
          
          scanBarRef.current.style.opacity = opacity.toString();
          animationId = requestAnimationFrame(animate);
        };
        
        animationId = requestAnimationFrame(animate);
        
        // 返回正确的清理函数
        return () => {
          if (animationId !== undefined) cancelAnimationFrame(animationId);
          if (timeoutId !== undefined) clearTimeout(timeoutId);
        };
      };
      
      // 背景动画函数
      const backgroundAnimation = () => {
        if (!backgroundRef.current) return;
        
        let time = 0;
        const duration = 1200;
        let animationId: number | undefined;
        
        const animate = (timestamp: number) => {
          if (!backgroundRef.current) {
            if (animationId !== undefined) {
              cancelAnimationFrame(animationId);
              animationId = undefined;
            }
            return;
          }
          
          if (!time) time = timestamp;
          const progress = ((timestamp - time) % duration) / duration;
          
          // 计算正弦波动画
          const opacity = 0.3 + 0.2 * Math.sin(progress * Math.PI * 2);
          backgroundRef.current.style.opacity = opacity.toString();
          
          animationId = requestAnimationFrame(animate);
        };
        
        animationId = requestAnimationFrame(animate);
        return () => {
          if (animationId !== undefined) {
            cancelAnimationFrame(animationId);
            animationId = undefined;
          }
        };
      };
      
      // 启动动画
      const pulseCleanup = pulseAnimation();
      const bgCleanup = backgroundAnimation();
      
      // 存储所有定时器ID
      const timers: number[] = [];
      
      // 扫描条移动动画
      const timer1 = setTimeout(() => {
        if (animationRef.current) {
          animationRef.current.style.transition = 'transform 1.2s ease-in-out';
          animationRef.current.style.transform = 'translateY(100vh)';
        }
      }, 100);
      timers.push(timer1);
      
      // 动画完成回调
      const timer2 = setTimeout(() => {
        if (animationRef.current) {
          animationRef.current.style.transition = 'opacity 0.1s ease-in-out';
          animationRef.current.style.opacity = '0';
        }
        // 安全地调用回调
        if (typeof onAnimationComplete === 'function') {
          onAnimationComplete();
        }
      }, 1300);
      timers.push(timer2);
      
      // 健壮的清理函数
      return () => {
        // 清除所有定时器
        timers.forEach(id => clearTimeout(id));
        
        // 执行动画清理函数
        if (typeof pulseCleanup === 'function') {
          pulseCleanup();
        }
        if (typeof bgCleanup === 'function') {
          bgCleanup();
        }
        
        // 重置DOM状态
        if (animationRef.current) {
          animationRef.current.style.transition = 'none';
          animationRef.current.style.transform = 'translateY(-100%)';
          animationRef.current.style.opacity = '0';
        }
        if (scanBarRef.current) {
          scanBarRef.current.style.opacity = '0.8';
        }
        if (backgroundRef.current) {
          backgroundRef.current.style.opacity = '0.3';
        }
      };
    }
  }, [isScanning, onAnimationComplete]);

  return (
    <>
      {isScanning && (
        <div className="fixed inset-0 z-50 pointer-events-none">
          {/* 扫描条容器 */}
          <div 
            ref={animationRef}
            className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/10 to-transparent"
          >
            {/* 扫描光效 */}
            <div 
              ref={scanBarRef}
              className="absolute left-0 right-0 h-1 bg-gradient-to-r from-purple-400/70 via-fuchsia-500/70 to-purple-600/70 shadow-lg shadow-purple-500/30"
              style={{ opacity: 0.8 }}
            />
          </div>
          
          {/* 背景微光效果 */}
          <div 
            ref={backgroundRef}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-900/5 to-fuchsia-800/5"
            style={{ opacity: 0.3 }}
          />
        </div>
      )}
    </>
  );
};