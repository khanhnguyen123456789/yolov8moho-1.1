
import React, { useState } from 'react';

const CursorClickIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
        <path d="M6.5 10.5a.5.5 0 01.5-.5h2a.5.5 0 01.5.5v2a.5.5 0 01-.5.5h-2a.5.5 0 01-.5-.5v-2z" />
        <path d="M3.854 3.146a.5.5 0 01.708 0l3.5 3.5a.5.5 0 010 .708l-3.5 3.5a.5.5 0 01-.708-.708L6.793 7 3.854 4.146a.5.5 0 010-.708zM15 15l-2 5L9 9l5-2 2 8z" />
    </svg>
);

const PenToolIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L15.232 5.232z" />
    </svg>
);

export const TrackingFeatures: React.FC = () => {
    const [trackedPerson, setTrackedPerson] = useState<number | null>(null);
    const [isHandTracked, setIsHandTracked] = useState(false);

    const handlePersonClick = (personId: number) => {
        setTrackedPerson(current => (current === personId ? null : personId));
    };

    return (
        <div className="panel p-6 grid md:grid-cols-2 gap-8">
            {/* Auto Tracking Mockup */}
            <div>
                <h3 className="font-orbitron text-xl font-bold text-teal-400 mb-3">Theo dõi Đối tượng Tự động</h3>
                <p className="text-gray-400 mb-4">
                    Nhấn vào một đối tượng trong video để bắt đầu theo dõi tự động. Hệ thống sẽ bám theo đối tượng được chọn, ngay cả khi bị che khuất tạm thời.
                </p>
                <div className="relative w-full aspect-video bg-gray-800 rounded-md overflow-hidden border border-gray-700 group">
                    <img src="https://images.pexels.com/photos/1576937/pexels-photo-1576937.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Woman with a horse" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    <div className="absolute inset-0 bg-black/20"></div>

                    {/* Person clickable area and bounding box */}
                    <div
                        aria-label="Track person"
                        className="absolute cursor-pointer"
                        style={{ top: '15%', left: '45%', width: '30%', height: '80%' }}
                        onClick={() => handlePersonClick(1)}
                    >
                        {trackedPerson === 1 && <div className="absolute inset-0 border-2 border-cyan-400 animate-pulse shadow-lg shadow-cyan-500/50 rounded-md"></div>}
                         <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-black/50 text-white text-xs px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center">
                           <CursorClickIcon />  Nhấn để theo dõi
                        </div>
                    </div>

                     {/* Horse clickable area and bounding box */}
                     <div
                        aria-label="Track horse"
                        className="absolute cursor-pointer"
                        style={{ top: '35%', left: '10%', width: '35%', height: '55%' }}
                        onClick={() => handlePersonClick(2)}
                    >
                        {trackedPerson === 2 && <div className="absolute inset-0 border-2 border-cyan-400 animate-pulse shadow-lg shadow-cyan-500/50 rounded-md"></div>}
                    </div>
                </div>
                <p className="text-xs text-gray-500 mt-2 text-center italic">
                    Hệ thống sẽ tiếp tục theo dõi ngay cả khi đối tượng bị che khuất trong giây lát.
                </p>
            </div>

            {/* Hand Tracking Mockup */}
            <div>
                <h3 className="font-orbitron text-xl font-bold text-teal-400 mb-3">Theo dõi Bàn tay bằng Bút vẽ</h3>
                <p className="text-gray-400 mb-4">
                    Sử dụng công cụ bút vẽ để tô lên bàn tay của đối tượng. AI sẽ tập trung phân tích và theo dõi các cử chỉ tay một cách chi tiết.
                </p>
                <div className="relative w-full aspect-video bg-gray-800 rounded-md overflow-hidden border border-gray-700">
                    <img src="https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Person gesturing at a screen" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/20"></div>
                    {isHandTracked && (
                        <svg className="absolute inset-0 w-full h-full animate-fade-in-scale" viewBox="0 0 200 112.5">
                            <path 
                                d="M110,48 C105,45 100,50 102,55 C105,65 115,70 120,68 C130,65 135,55 132,50 C130,45 125,43 120,45 C115,47 112,49 110,48Z" 
                                fill="rgba(20, 184, 166, 0.4)" 
                                stroke="rgba(94, 234, 212, 0.8)" 
                                strokeWidth="0.5"
                                transform="rotate(10, 120, 55)" 
                            />
                        </svg>
                    )}
                </div>
                <button
                    onClick={() => setIsHandTracked(!isHandTracked)}
                    className="mt-4 w-full bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg text-sm transition-colors flex items-center justify-center border border-gray-600 hover:border-teal-500"
                >
                    <PenToolIcon />
                    {isHandTracked ? 'Xóa Vùng chọn Tay' : 'Mô phỏng Vẽ lên Tay'}
                </button>
            </div>
        </div>
    );
};