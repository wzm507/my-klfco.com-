"use client"

import React, { forwardRef } from 'react';
import { useIntersectionObserver } from '../hooks/use-intersection-observer';

interface FadeInOnScrollProps extends React.HTMLAttributes<HTMLDivElement> {
  delay?: number; // 动画延迟时间（毫秒）
  duration?: number; // 动画持续时间（毫秒）
  offset?: number; // 垂直偏移量（像素）
  once?: boolean; // 是否只触发一次动画
  children: React.ReactNode;
}

/**
 * 滚动时淡入的动画组件
 * 当元素进入视口时，会执行淡入并上移的动画效果
 */
export const FadeInOnScroll = forwardRef<
  HTMLDivElement,
  FadeInOnScrollProps
>((
  {
    className = '',
    children,
    delay = 0,
    duration = 600,
    offset = 40,
    once = true,
    ...props
  },
  ref
) => {
  const {
    ref: intersectionRef,
    isVisible
  } = useIntersectionObserver({
    options: {
      threshold: 0.05,
      rootMargin: `-${offset * 2}px 0px -${offset * 2}px 0px`, // 增加根边距以更早触发动画
    },
    once
  });

  // 合并ref以确保forwardRef正常工作
  const mergedRef = (node: HTMLDivElement | null) => {
    if (ref) {
      if (typeof ref === 'function') {
        ref(node);
      } else {
        ref.current = node;
      }
    }
    intersectionRef.current = node;
  };

  // 构建动画样式
  const animationStyle: React.CSSProperties = {
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0) scale(1)' : `translateY(${offset}px) scale(0.95)`,
    transition: `opacity ${duration}ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms, 
                 transform ${duration}ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms`
  };

  return (
    <div
      ref={mergedRef}
      className={`transition-opacity transition-transform ${className}`}
      style={animationStyle}
      {...props}
    >
      {children}
    </div>
  );
});

FadeInOnScroll.displayName = 'FadeInOnScroll';