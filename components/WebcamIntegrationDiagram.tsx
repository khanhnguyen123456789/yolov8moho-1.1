
import React from 'react';

const IconWrapper: React.FC<{ children: React.ReactNode; title: string; description: string }> = ({ children, title, description }) => (
    <div className="flex-1 flex flex-col items-center text-center max-w-xs">
        <div className="w-16 h-16 mb-3 flex items-center justify-center bg-gray-800 rounded-full border-2 border-gray-700">
            {children}
        </div>
        <h4 className="font-bold text-lg text-white font-orbitron">{title}</h4>
        <p className="text-sm text-gray-400">{description}</p>
    </div>
);

const Arrow: React.FC = () => (
    <div className="text-teal-400 transform md:rotate-0 rotate-90 text-glow self-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
        </svg>
    </div>
);

export const WebcamIntegrationDiagram: React.FC = () => {
    return (
        <div className="flex flex-col md:flex-row items-stretch justify-around gap-6 text-xs text-center text-gray-400 p-4">
            <IconWrapper title="Webcam PC" description="Lấy video stream trực tiếp từ webcam trên máy tính.">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-sky-400" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2 6a2 2 0 012-2h12a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
                    <path d="M10 14a3 3 0 100-6 3 3 0 000 6z" />
                </svg>
            </IconWrapper>

            <Arrow />

            <IconWrapper title="Xử lý trên PC" description="OpenCV đọc frame, sau đó AI xử lý tư thế (pose estimation).">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 5a2 2 0 012-2h10a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5zm2 0v10h10V5H5z" clipRule="evenodd" />
                    <path d="M7 7a1 1 0 000 2h6a1 1 0 100-2H7zM7 11a1 1 0 100 2h2a1 1 0 100-2H7z" />
                </svg>
            </IconWrapper>

            <Arrow />

            <IconWrapper title="Plugin Moho" description="Dữ liệu tư thế được áp dụng vào nhân vật trong thời gian thực.">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 3.5a1.5 1.5 0 013 0V4a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-.5a1.5 1.5 0 000 3h.5a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 00-1 1v.5a1.5 1.5 0 01-3 0v-.5a1 1 0 00-1-1H6a1 1 0 01-1-1v-3a1 1 0 011-1h.5a1.5 1.5 0 000-3H6a1 1 0 01-1-1V6a1 1 0 011-1h3a1 1 0 001-1v-.5z" />
                </svg>
            </IconWrapper>
        </div>
    );
};