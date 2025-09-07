
import React from 'react';

// --- ICONS ---
const BoneTranslateIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>;
const BoneScaleIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4 2a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V4a2 2 0 00-2-2H4zm10 2a1 1 0 00-1-1H7a1 1 0 00-1 1v4a1 1 0 001 1h6a1 1 0 001-1V4z" clipRule="evenodd" /></svg>;
const BoneRotateIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 110 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" /></svg>;
const BoneShearIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path d="M10.894 2.553a1 1 0 00-1.789 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" /></svg>;

const CameraIcon = ({ number }: { number: number }) => (
    <div className="relative w-5 h-5">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
        <span className="absolute -bottom-1 -right-1 text-xs font-bold bg-gray-800 rounded-full w-3 h-3 flex items-center justify-center text-teal-400">{number}</span>
    </div>
);

// --- COMPONENT PROPS & DATA STRUCTURE ---
interface TimelineLayer {
    id: string;
    name: string;
    icon: JSX.Element;
    keyframes: number[];
    color?: string;
}

const TIMELINE_DATA: TimelineLayer[] = [
    { id: 'bone-translate', name: 'Bone Translate', icon: <BoneTranslateIcon />, keyframes: [0, 12, 15, 18, 21, 24, 27, 30, 33, 36] },
    { id: 'bone-scale', name: 'Bone Scale', icon: <BoneScaleIcon />, keyframes: [0, 12, 36] },
    { id: 'bone-rotate', name: 'Bone Rotate', icon: <BoneRotateIcon />, keyframes: [0, 12, 18, 24, 30, 36] },
    { id: 'bone-shear', name: 'Bone Shear/Squash', icon: <BoneShearIcon />, keyframes: [0] },
    { id: 'camera-track', name: 'Theo dõi Camera (4)', icon: <CameraIcon number={4} />, keyframes: [0, 18, 36, 54], color: '#C4B5FD' /* Violet */ },
    { id: 'camera-zoom', name: 'Thu phóng Camera (5)', icon: <CameraIcon number={5} />, keyframes: [0, 24, 60], color: '#FFD700' /* Gold */ },
    { id: 'camera-rotate', name: 'Xoay Camera (6)', icon: <CameraIcon number={6} />, keyframes: [0, 48], color: '#1E90FF' /* Dodger Blue */ },
    { id: 'camera-pan', name: 'Quét/Nghiêng Camera (7)', icon: <CameraIcon number={7} />, keyframes: [0, 12, 24, 36, 48, 60], color: '#32CD32' /* Lime Green */ },
];

const MAX_FRAMES = 72;
const FRAME_STEP = 6;
const PADDING_LEFT = 40; // px, for icons and names

// --- SUB-COMPONENTS ---
const TimelineRuler: React.FC = () => (
    <div className="relative h-6 flex items-end" style={{ paddingLeft: PADDING_LEFT }}>
        <div className="flex-1 h-full relative">
            {Array.from({ length: MAX_FRAMES / FRAME_STEP + 1 }).map((_, i) => (
                <span
                    key={i}
                    className="absolute bottom-0 text-xs text-gray-500 -translate-x-1/2"
                    style={{ left: `${(i * FRAME_STEP / MAX_FRAMES) * 100}%` }}
                >
                    {i * FRAME_STEP}
                </span>
            ))}
        </div>
    </div>
);

const TimelineLayerRow: React.FC<{ layer: TimelineLayer }> = ({ layer }) => (
    <div className="h-6 flex items-center border-t border-gray-700/50">
        <div className="w-[40px] flex-shrink-0 flex items-center justify-start pl-4 text-gray-400" title={layer.name}>
            {layer.icon}
        </div>
        <div className="flex-1 h-full relative">
            {/* Horizontal Track Line */}
            <div className="absolute top-1/2 -translate-y-1/2 w-full h-px bg-gray-600"></div>

            {/* Keyframes */}
            {layer.keyframes.map(frame => (
                <div
                    key={frame}
                    title={`Keyframe at Frame ${frame}`}
                    className="absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full border border-gray-800 -translate-x-1/2 cursor-pointer hover:scale-125 transition-transform"
                    style={{
                        left: `${(frame / MAX_FRAMES) * 100}%`,
                        backgroundColor: layer.color || '#E5E7EB', // Default to light gray
                    }}
                ></div>
            ))}
        </div>
    </div>
);

// --- MAIN COMPONENT ---
export const Timeline: React.FC = () => {
    return (
        <div className="panel p-2 bg-[#2E2E2E]">
            <div className="relative" style={{ paddingLeft: PADDING_LEFT }}>
                {/* Playhead */}
                <div className="absolute top-0 bottom-0 z-10" style={{ left: `calc(${PADDING_LEFT}px)` }}>
                    <div className="absolute -top-3.5 -translate-x-1/2 w-0 h-0 border-l-[6px] border-r-[6px] border-b-[8px] border-l-transparent border-r-transparent border-b-green-400"></div>
                    <div className="w-px h-full bg-green-400"></div>
                </div>
            </div>
            <TimelineRuler />
            <div className="relative">
                {/* Vertical Grid Lines */}
                <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                    {Array.from({ length: MAX_FRAMES }).map((_, i) => (
                        <div
                            key={i}
                            className={`absolute top-0 bottom-0 w-px ${ (i + 1) % FRAME_STEP === 0 ? 'bg-gray-500/80' : 'bg-gray-600/50'}`}
                            style={{ left: `calc(${PADDING_LEFT}px + ${((i + 1) / MAX_FRAMES) * 100}%)` }}
                        ></div>
                    ))}
                </div>
                
                {/* Layers */}
                <div className="relative">
                    {TIMELINE_DATA.map((layer, index) => (
                         <React.Fragment key={layer.id}>
                            <TimelineLayerRow layer={layer} />
                            {index === 3 && <div className="h-4 border-t border-gray-700/50"></div>}
                         </React.Fragment>
                    ))}
                </div>
            </div>
        </div>
    );
};
