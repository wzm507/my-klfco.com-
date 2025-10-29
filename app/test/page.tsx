"use client"

import React, { useState, useEffect } from 'react';

// 简单的测试页面，用于验证浏览器兼容性
const TestPage = () => {
  const [count, setCount] = useState(0);
  const [userAgent, setUserAgent] = useState('');
  
  // 只在客户端执行，避免水合错误
  useEffect(() => {
    if (typeof navigator !== 'undefined') {
      setUserAgent(navigator.userAgent);
    }
  }, []);
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold text-center mb-8">测试页面</h1>
      
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <p className="text-gray-600 mb-4">这是一个简单的测试页面，用于验证浏览器兼容性问题。</p>
        
        <div className="mb-6">
          <p className="text-lg font-medium mb-2">计数器: {count}</p>
          <button 
            onClick={() => setCount(count + 1)}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            增加计数
          </button>
        </div>
        
        <div className="text-sm text-gray-500">
          <p>浏览器信息: {userAgent}</p>
          <p className="mt-1">React 版本测试页面 - 不包含复杂动画</p>
        </div>
      </div>
    </div>
  );
};

export default TestPage;