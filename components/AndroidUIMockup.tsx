import React, { useState } from 'react';

const SKELETON_POINTS = [
    { id: 'head', cx: 100, cy: 60, confidence: 0.98 },
    { id: 'neck', cx: 100, cy: 90, confidence: 0.95 },
    { id: 'l_shoulder', cx: 70, cy: 90, confidence: 0.92 },
    { id: 'r_shoulder', cx: 130, cy: 90, confidence: 0.93 },
    { id: 'l_elbow', cx: 50, cy: 140, confidence: 0.85 },
    { id: 'r_elbow', cx: 150, cy: 140, confidence: 0.88 },
    { id: 'l_wrist', cx: 30, cy: 190, confidence: 0.75 },
    { id: 'r_wrist', cx: 170, cy: 190, confidence: 0.0, occluded: true }, // Occluded point
    { id: 'torso_mid', cx: 100, cy: 125, confidence: 0.96 },
    { id: 'hip', cx: 100, cy: 160, confidence: 0.97 },
    { id: 'l_hip', cx: 80, cy: 160, confidence: 0.91 },
    { id: 'r_hip', cx: 120, cy: 160, confidence: 0.90 },
    { id: 'l_knee', cx: 70, cy: 250, confidence: 0.89 },
    { id: 'r_knee', cx: 130, cy: 250, confidence: 0.86 },
    { id: 'l_ankle', cx: 60, cy: 340, confidence: 0.82 },
    { id: 'r_ankle', cx: 140, cy: 340, confidence: 0.84 },
];

const SKELETON_CONNECTIONS = [
    ['head', 'neck'], ['neck', 'l_shoulder'], ['neck', 'r_shoulder'], ['neck', 'torso_mid'],
    ['l_shoulder', 'l_elbow'], ['l_elbow', 'l_wrist'],
    ['r_shoulder', 'r_elbow'], ['r_elbow', 'r_wrist'],
    ['torso_mid', 'hip'], ['hip', 'l_hip'], ['hip', 'r_hip'],
    ['l_hip', 'l_knee'], ['l_knee', 'l_ankle'],
    ['r_hip', 'r_knee'], ['r_knee', 'r_ankle'],
];

const getConfidenceColor = (confidence: number) => {
    if (confidence > 0.9) return '#2dd4bf'; // teal-400 - High
    if (confidence > 0.7) return '#facc15'; // yellow-400 - Medium
    return '#f87171'; // red-400 - Low
};

const SkeletonOverlay = () => {
    const pointMap = new Map(SKELETON_POINTS.map(p => [p.id, p]));

    return (
        <svg viewBox="0 0 200 400" className="absolute inset-0 w-full h-full opacity-90">
            <g>
                {SKELETON_CONNECTIONS.map(([startId, endId], i) => {
                    const start = pointMap.get(startId);
                    const end = pointMap.get(endId);
                    if (!start || !end) return null;
                    const isOccluded = start.occluded || end.occluded;
                    return (
                        <line
                            key={i}
                            x1={start.cx} y1={start.cy}
                            x2={end.cx} y2={end.cy}
                            stroke={isOccluded ? "#9ca3af" : "#4ade80"}
                            strokeWidth="2.5"
                            strokeOpacity={isOccluded ? 0.6 : 1}
                            strokeDasharray={isOccluded ? "3 3" : "none"}
                            strokeLinecap="round"
                        />
                    );
                })}
            </g>
            <g>
                {SKELETON_POINTS.map(p => (
                    <circle
                        key={p.id}
                        cx={p.cx} cy={p.cy} r="4.5"
                        fill={getConfidenceColor(p.confidence)}
                        stroke="#111827"
                        strokeWidth="1.5"
                        strokeOpacity={p.occluded ? 0.6 : 1}
                        fillOpacity={p.occluded ? 0.8 : 1}
                        style={{ transition: 'fill 0.3s ease' }}
                    >
                         <title>Khớp: {p.id}\nĐộ tin cậy: {p.confidence.toFixed(2)}{p.occluded ? '\n(Dự đoán)' : ''}</title>
                    </circle>
                ))}
            </g>
            {SKELETON_POINTS.find(p => p.occluded) && (
                 <text x="10" y="380" fontFamily="Inter, sans-serif" fontSize="8" fill="#f87171" className="font-semibold">
                    * Khớp có độ tin cậy thấp hoặc đường đứt nét được dự đoán
                </text>
            )}
        </svg>
    );
};


export const AndroidUIMockup: React.FC = () => {
    const [isTemporalSmoothing, setIsTemporalSmoothing] = useState(true);

    return (
        <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-700 flex flex-col items-center">
            <div className="w-64 h-[500px] bg-black rounded-3xl p-2 border-4 border-gray-700 shadow-lg">
                <div className="w-full h-full bg-gray-600 rounded-2xl flex flex-col overflow-hidden">
                    {/* Camera View */}
                    <div className="flex-grow bg-cover bg-center relative bg-gray-700" style={{ backgroundImage: `url('https://i.imgur.com/9yG7zI2.png')`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }}>
                         <div className={`transition-opacity duration-300 ${isTemporalSmoothing ? 'opacity-100' : 'opacity-20'}`}>
                            <SkeletonOverlay />
                        </div>
                        <div className="absolute top-2 left-2 bg-black/50 text-green-400 text-xs font-bold px-2 py-1 rounded-full flex items-center">
                            <span className="w-2 h-2 bg-green-400 rounded-full mr-1.5"></span>
                            Đã kết nối
                        </div>
                    </div>
                     {/* Controls */}
                    <div className="bg-black/80 flex flex-col items-center justify-around p-3">
                         <div className="flex items-center justify-between w-full px-2 mb-3">
                            <label htmlFor="temporal-smoothing" className="text-xs text-gray-300 font-medium">Làm mượt (Kalman)</label>
                            <label className="switch" style={{ width: '40px', height: '24px' }}>
                                 <input id="temporal-smoothing" type="checkbox" checked={isTemporalSmoothing} onChange={() => setIsTemporalSmoothing(!isTemporalSmoothing)} />
                                 <span className="slider" style={{'--slider-before-h': '18px', '--slider-before-w': '18px', '--slider-before-left': '3px', '--slider-before-bottom': '3px', '--slider-checked-transform': 'translateX(16px)'} as React.CSSProperties}></span>
                            </label>
                        </div>
                        <div className="flex items-center justify-around w-full">
                            <button className="text-gray-300 flex flex-col items-center hover:text-white" title="Chế độ">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg>
                                <span className="text-xs mt-1">Chính Xác</span>
                            </button>
                            <button className="w-16 h-16 bg-red-600 rounded-full border-4 border-black/50 ring-2 ring-red-600 hover:ring-4" title="Bắt đầu/Dừng Ghi"></button>
                            <button className="text-gray-300 flex flex-col items-center hover:text-white" title="Kết nối bằng Mã QR">
                                 <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 0h-4m4 0l-5-5" /></svg>
                                <span className="text-xs mt-1">Kết nối</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};