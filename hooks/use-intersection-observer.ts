import { useState, useEffect, useRef } from 'react';

interface UseIntersectionObserverProps {
  options?: IntersectionObserverInit;
  once?: boolean; // 是否只触发一次
}

/**
 * 自定义Hook，用于检测元素是否在视口中
 * @param options IntersectionObserver配置项
 * @param once 是否只触发一次
 * @returns 包含ref、isVisible状态和observe/unobserve方法的对象
 */
export const useIntersectionObserver = ({
  options = {
    root: null,
    rootMargin: '-50px 0px -50px 0px', // 扩大有效观察区域
    threshold: 0.05, // 当元素5%进入视口时触发
  },
  once = true,
}: UseIntersectionObserverProps = {}) => {
  const [isVisible, setIsVisible] = useState(false);
  const targetRef = useRef<HTMLElement | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const hasBeenVisibleRef = useRef(false);

  useEffect(() => {
    // 清理旧的观察者
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    // 创建新的观察者
    observerRef.current = new IntersectionObserver((entries) => {
      const [entry] = entries;
      
      // 如果once为true且已经可见过，则不再更新状态
      if (once && hasBeenVisibleRef.current) {
        return;
      }
      
      if (entry.isIntersecting) {
        setIsVisible(true);
        hasBeenVisibleRef.current = true;
        
        // 如果只需要触发一次，则在元素可见后断开观察
        if (once) {
          observerRef.current?.disconnect();
        }
      } else if (!once) {
        // 如果不是只触发一次，则在元素离开视口时设置为不可见
        setIsVisible(false);
      }
    }, options);

    // 开始观察目标元素
    if (targetRef.current) {
      observerRef.current.observe(targetRef.current);
    }

    // 清理函数
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [options, once]);

  // 手动观察和取消观察的方法
  const observe = (element: HTMLElement) => {
    if (observerRef.current) {
      observerRef.current.observe(element);
    }
  };

  const unobserve = (element: HTMLElement) => {
    if (observerRef.current) {
      observerRef.current.unobserve(element);
    }
  };

  return {
    ref: targetRef,
    isVisible,
    observe,
    unobserve,
  };
};