
import React from 'react';

const Bone = ({ x1, y1, x2, y2, color, label }: { x1: number, y1: number, x2: number, y2: number, color: string, label?: string }) => (
    <g>
        <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth="3" strokeLinecap="round" />
        <circle cx={x1} cy={y1} r="4" fill={color} />
        <circle cx={x2} cy={y2} r="4" fill={color} />
        {label && <text x={(x1 + x2) / 2 - 10} y={(y1 + y2) / 2 - 8} fill="#A0AEC0" fontSize="10">{label}</text>}
    </g>
);

const Point = ({ cx, cy, color, label }: { cx: number, cy: number, color: string, label: string }) => (
    <g>
        <circle cx={cx} cy={cy} r="4" fill={color} />
        <text x={cx + 6} y={cy + 4} fill="#A0AEC0" fontSize="10">{label}</text>
    </g>
);


export const TwoBoneLayerDiagram: React.FC = () => {
    return (
        <div className="flex flex-col md:flex-row items-center justify-around gap-8 text-xs text-center text-gray-400">
            {/* AI Data Layer */}
            <div className="flex-1">
                <h4 className="font-bold text-lg text-sky-400 mb-2">1. Lớp Dữ liệu (AI)</h4>
                <svg viewBox="0 0 150 150" className="w-full h-auto max-w-[150px] mx-auto">
                    <Point cx={75} cy={30} color="#38B2AC" label="Shoulder" />
                    <Point cx={115} cy={60} color="#38B2AC" label="Elbow" />
                    <Point cx={135} cy={100} color="#38B2AC" label="Wrist" />
                    <line x1={75} y1={30} x2={115} y2={60} stroke="#38B2AC" strokeWidth="2" strokeDasharray="4" />
                    <line x1={115} y1={60} x2={135} y2={100} stroke="#38B2AC" strokeWidth="2" strokeDasharray="4" />
                </svg>
                <p className="mt-2">Dữ liệu 17 điểm AI thô, không có cấu trúc cha-con.</p>
            </div>

            <div className="text-teal-400 transform md:rotate-0 rotate-90 text-2xl font-mono px-4">&gt;&gt;&gt;</div>

            {/* Moho Rig Proxy Layer */}
            <div className="flex-1">
                <h4 className="font-bold text-lg text-purple-400 mb-2">2. Lớp Proxy (Moho Rig)</h4>
                <svg viewBox="0 0 150 150" className="w-full h-auto max-w-[150px] mx-auto">
                    <Bone x1={75} y1={30} x2={115} y2={60} color="#9F7AEA" label="UpperArm" />
                    <Bone x1={115} y1={60} x2={135} y2={100} color="#9F7AEA" label="Forearm" />
                </svg>
                <p className="mt-2">Bản sao ảo của rig, có cấu trúc cha-con đầy đủ.</p>
            </div>
            
            <div className="text-teal-400 transform md:rotate-0 rotate-90 text-2xl font-mono px-4">&gt;&gt;&gt;</div>
            
            {/* Final Result */}
            <div className="flex-1">
                <h4 className="font-bold text-lg text-green-400 mb-2">3. Kết quả Đồng bộ</h4>
                <svg viewBox="0 0 150 150" className="w-full h-auto max-w-[150px] mx-auto">
                     {/* AI Data as guides */}
                    <Point cx={75} cy={30} color="#38B2AC" label="" />
                    <Point cx={115} cy={60} color="#38B2AC" label="" />
                    <Point cx={135} cy={100} color="#38B2AC" label="" />
                    <line x1={75} y1={30} x2={115} y2={60} stroke="#38B2AC" strokeWidth="1" strokeDasharray="2" />
                    <line x1={115} y1={60} x2={135} y2={100} stroke="#38B2AC" strokeWidth="1" strokeDasharray="2" />

                    {/* Rig bones snapped to AI data */}
                    <Bone x1={75} y1={30} x2={115} y2={60} color="#48BB78" />
                    <Bone x1={115} y1={60} x2={135} y2={100} color="#48BB78" />
                </svg>
                <p className="mt-2">Plugin áp dụng phép xoay/tỷ lệ từ Lớp AI lên Lớp Proxy.</p>
            </div>
        </div>
    );
};