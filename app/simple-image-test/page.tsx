'use client'

import React, { useState } from 'react';

export default function SimpleImageTest() {
  const [imageLoaded, setImageLoaded] = useState<Record<string, boolean>>({});
  const [errorImages, setErrorImages] = useState<string[]>([]);

  const imagePaths = [
    '/Image/XW1/微信图片_20250819102012.jpg',
    '/Image/XW2/微信图片_20250819101830.jpg',
    '/Image/XW3/微信图片_20250819103236.png',
    '/Image/XW4/微信图片_20250819104152.png',
    '/Image/XW5/微信图片_20250819111920.jpg',
    '/Image/XW6/微信图片_2025-09-09_154838_287.jpg',
    '/Image/微信图片_20250806150417.png',
    '/Image/微信图片_20250806152141.png',
    '/Image/微信图片_20250806152157.png',
    '/Image/微信图片_20250806152203.png',
    '/placeholder.jpg',
  ];

  const handleImageLoad = (path: string) => {
    setImageLoaded(prev => ({ ...prev, [path]: true }));
  };

  const handleImageError = (path: string) => {
    setImageLoaded(prev => ({ ...prev, [path]: false }));
    setErrorImages(prev => [...prev, path]);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-3xl font-bold mb-8">图片路径测试</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {imagePaths.map((path, index) => (
          <div key={index} className="border border-gray-700 rounded-lg p-4">
            <p className="text-sm text-gray-400 mb-2 break-all">路径: {path}</p>
            <div className="h-32 bg-gray-800 rounded flex items-center justify-center overflow-hidden">
              <img
                src={path}
                alt={`Test ${index + 1}`}
                className="max-h-full max-w-full object-contain"
                onLoad={() => handleImageLoad(path)}
                onError={() => handleImageError(path)}
              />
            </div>
            <div className="mt-2 text-sm">
              状态: {imageLoaded[path] === undefined ? '加载中...' : 
                   imageLoaded[path] ? '✅ 加载成功' : '❌ 加载失败'}
            </div>
          </div>
        ))}
      </div>
      
      {errorImages.length > 0 && (
        <div className="mt-8 p-4 bg-red-900/20 border border-red-800/30 rounded-lg">
          <h2 className="text-xl font-bold mb-2 text-red-400">加载失败的图片:</h2>
          <ul className="list-disc list-inside text-gray-300">
            {errorImages.map((path, index) => (
              <li key={index} className="mb-1 break-all">{path}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}