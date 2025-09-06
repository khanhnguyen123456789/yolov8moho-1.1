
import React from 'react';
import { APP_LOGO_BASE64 } from '../constants';

export const Header: React.FC = () => {
  return (
    <header className="text-center py-8 relative">
      <div className="relative z-10">
        <div className="inline-block bg-gray-900/50 p-1 mb-4 rounded-2xl border border-gray-700 shadow-xl">
          <img src={APP_LOGO_BASE64} alt="Yolov8Moho Logo" className="w-20 h-20 rounded-xl" />
        </div>
        <h1 className="font-orbitron text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-200 via-white to-gray-200 text-glow uppercase">
          Yolov8Moho
        </h1>
        <p className="mt-4 text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto">
          Xóa nhòa ranh giới giữa diễn hoạt thủ công và motion capture tự động trong lĩnh vực hoạt hình 2D.
        </p>
      </div>
    </header>
  );
};