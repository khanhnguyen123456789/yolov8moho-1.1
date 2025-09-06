import React, { useState } from 'react';

type YoloPointId = 'nose' | 'neck' | 'l_shoulder' | 'l_elbow' | 'l_wrist' | 'r_shoulder' | 'r_elbow' | 'r_wrist' | 'hip' | 'l_knee' | 'l_ankle' | 'r_knee' | 'r_ankle';
type MohoBoneId = 'head' | 'neck_bone' | 'l_upperarm' | 'l_forearm' | 'l_hand' | 'r_upperarm' | 'r_forearm' | 'r_hand' | 'spine' | 'l_thigh' | 'l_shin' | 'r_thigh' | 'r_shin';
type Mappings = Partial<Record<YoloPointId, MohoBoneId>>;

const YOLO_POINTS_DATA: { id: YoloPointId; name: string }[] = [
    { id: 'nose', name: 'Nose' }, { id: 'neck', name: 'Neck' },
    { id: 'l_shoulder', name: 'L.Shoulder' }, { id: 'l_elbow', name: 'L.Elbow' }, { id: 'l_wrist', name: 'L.Wrist' },
    { id: 'r_shoulder', name: 'R.Shoulder' }, { id: 'r_elbow', name: 'R.Elbow' }, { id: 'r_wrist', name: 'R.Wrist' },
    { id: 'hip', name: 'Hip' }, { id: 'l_knee', name: 'L.Knee' }, { id: 'l_ankle', name: 'L.Ankle' },
    { id: 'r_knee', name: 'R.Knee' }, { id: 'r_ankle', name: 'R.Ankle' },
];

const RIG_BONES_DATA: { id: MohoBoneId; name: string; x: number; y: number; group: 'body' | 'arm' | 'leg' }[] = [
    { id: 'head', name: 'Head', x: 150, y: 30, group: 'body' },
    { id: 'neck_bone', name: 'Neck', x: 150, y: 60, group: 'body' },
    { id: 'spine', name: 'Spine', x: 150, y: 110, group: 'body' },
    { id: 'l_upperarm', name: 'L.UpperArm', x: 120, y: 80, group: 'arm' },
    { id: 'l_forearm', name: 'L.Forearm', x: 90, y: 120, group: 'arm' },
    { id: 'l_hand', name: 'L.Hand', x: 60, y: 160, group: 'arm' },
    { id: 'r_upperarm', name: 'R.UpperArm', x: 180, y: 80, group: 'arm' },
    { id: 'r_forearm', name: 'R.Forearm', x: 210, y: 120, group: 'arm' },
    { id: 'r_hand', name: 'R.Hand', x: 240, y: 160, group: 'arm' },
    { id: 'l_thigh', name: 'L.Thigh', x: 130, y: 180, group: 'leg' },
    { id: 'l_shin', name: 'L.Shin', x: 120, y: 230, group: 'leg' },
    { id: 'r_thigh', name: 'R.Thigh', x: 170, y: 180, group: 'leg' },
    { id: 'r_shin', name: 'R.Shin', x: 180, y: 230, group: 'leg' },
];

const INITIAL_MAPPINGS: Mappings = {
    'nose': 'head', 'neck': 'neck_bone', 'hip': 'spine',
    'l_shoulder': 'l_upperarm', 'l_elbow': 'l_forearm', 'l_wrist': 'l_hand',
    'r_shoulder': 'r_upperarm', 'r_elbow': 'r_forearm', 'r_wrist': 'r_hand',
    'l_knee': 'l_thigh', 'l_ankle': 'l_shin', 'r_knee': 'r_thigh', 'r_ankle': 'r_shin',
};

const rigBoneMap = new Map(RIG_BONES_DATA.map(bone => [bone.id, bone]));

interface KeypointItemProps {
    point: { id: YoloPointId; name: string };
    mappedBone: { id: MohoBoneId; name: string; } | null;
    isSelected: boolean;
    onClick: () => void;
    onClear: (e: React.MouseEvent) => void;
}

const KeypointItem: React.FC<KeypointItemProps> = ({ point, mappedBone, isSelected, onClick, onClear }) => (
    <div
        onClick={onClick}
        className={`p-2 rounded-md cursor-pointer flex items-center justify-between transition-all ${isSelected ? 'bg-teal-500/30 ring-2 ring-teal-400' : 'bg-gray-800 hover:bg-gray-700'}`}
    >
        <div>
            <p className="font-semibold text-sm text-sky-300">{point.name}</p>
            <p className="text-xs text-purple-300">{mappedBone ? `-> ${mappedBone.name}` : 'Chưa ánh xạ'}</p>
        </div>
        {mappedBone && (
            <button onClick={onClear} className="text-gray-500 hover:text-red-400 text-xs">Xóa</button>
        )}
    </div>
);


export const BoneMappingUI: React.FC = () => {
    const [mappings, setMappings] = useState<Mappings>(INITIAL_MAPPINGS);
    const [selectedPoint, setSelectedPoint] = useState<YoloPointId | null>(null);
    const [isIkEnabled, setIsIkEnabled] = useState(true);

    const leftPoints = YOLO_POINTS_DATA.filter(p => p.name.startsWith('L.'));
    const rightPoints = YOLO_POINTS_DATA.filter(p => p.name.startsWith('R.'));
    const centerPoints = YOLO_POINTS_DATA.filter(p => !p.name.startsWith('L.') && !p.name.startsWith('R.'));


    const handlePointClick = (pointId: YoloPointId) => {
        setSelectedPoint(current => (current === pointId ? null : pointId));
    };

    const handleBoneClick = (boneId: MohoBoneId) => {
        if (selectedPoint) {
            setMappings(prev => ({ ...prev, [selectedPoint]: boneId }));
            setSelectedPoint(null);
        }
    };

    const clearMappingForPoint = (pointId: YoloPointId) => {
        const newMappings = { ...mappings };
        delete newMappings[pointId];
        setMappings(newMappings);
    };

    return (
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Panel: Center & Left AI Keypoints */}
            <div className="lg:col-span-3 panel p-4">
                <h4 className="font-semibold text-white mb-3">Điểm Keypoint AI</h4>
                <h5 className="text-xs font-bold uppercase text-gray-500 mb-2">Trung tâm</h5>
                <div className="space-y-2 mb-4">
                    {centerPoints.map(point => {
                         const mappedBone = mappings[point.id] ? rigBoneMap.get(mappings[point.id]!) : null;
                         return <KeypointItem key={point.id} point={point} mappedBone={mappedBone} isSelected={selectedPoint === point.id} onClick={() => handlePointClick(point.id)} onClear={(e) => { e.stopPropagation(); clearMappingForPoint(point.id); }} />
                    })}
                </div>
                <hr className="border-gray-700 my-4" />
                <h5 className="text-xs font-bold uppercase text-gray-500 mb-2">Bên Trái</h5>
                <div className="space-y-2">
                     {leftPoints.map(point => {
                         const mappedBone = mappings[point.id] ? rigBoneMap.get(mappings[point.id]!) : null;
                         return <KeypointItem key={point.id} point={point} mappedBone={mappedBone} isSelected={selectedPoint === point.id} onClick={() => handlePointClick(point.id)} onClear={(e) => { e.stopPropagation(); clearMappingForPoint(point.id); }} />
                     })}
                </div>
            </div>


            {/* Center Panel: Retargeting Rig & Controls */}
            <div className="lg:col-span-6 flex flex-col gap-6">
                <div className="panel p-4 flex-grow flex flex-col items-center">
                    <h4 className="font-semibold text-white mb-2">Retargeting Studio</h4>
                    <div className="w-full h-full min-h-[300px] bg-gray-900/50 rounded-md border border-gray-700 relative">
                        <svg width="100%" height="100%" viewBox="0 0 300 300">
                            {/* Render mapping lines */}
                            {Object.entries(mappings).map(([pointId, boneId]) => {
                                const bone = boneId ? rigBoneMap.get(boneId) : null;
                                if (!bone) return null;
                                
                                const leftList = [...centerPoints, ...leftPoints];
                                const rightList = rightPoints;

                                let index = leftList.findIndex(p => p.id === pointId);
                                if (index !== -1) {
                                    const startY = (index / leftList.length) * 280 + 10;
                                    return <line key={`line-${pointId}`} x1={0} y1={startY} x2={bone.x} y2={bone.y} stroke="#4A5568" strokeWidth="1" />;
                                }

                                index = rightList.findIndex(p => p.id === pointId);
                                if (index !== -1) {
                                    const startY = (index / rightList.length) * 280 + 10;
                                    return <line key={`line-${pointId}`} x1={300} y1={startY} x2={bone.x} y2={bone.y} stroke="#4A5568" strokeWidth="1" />;
                                }
                                return null;
                            })}

                            {/* Render bones */}
                            <g>
                                {RIG_BONES_DATA.map(bone => (
                                    <circle
                                        key={bone.id}
                                        cx={bone.x} cy={bone.y} r="6"
                                        className={`cursor-pointer transition-all ${selectedPoint ? 'fill-purple-400 hover:fill-purple-300' : 'fill-gray-600'}`}
                                        onClick={() => handleBoneClick(bone.id)}
                                    >
                                        <title>{bone.name}</title>
                                    </circle>
                                ))}
                            </g>
                        </svg>
                    </div>
                </div>

                 {/* Controls Panel */}
                <div className="panel p-4 space-y-4">
                    <div>
                        <h4 className="font-semibold text-white mb-3">Cấu hình Retargeting</h4>
                        <div className="space-y-2">
                            <button className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded text-sm transition-colors">Tự động Ánh xạ</button>
                            <select className="w-full bg-gray-700 border border-gray-600 text-white text-sm rounded-md focus:ring-purple-500 focus:border-purple-500 block p-2">
                                <option>Tải Cấu hình...</option>
                                <option>Humanoid_Standard</option>
                                <option>Quadruped_Dog</option>
                            </select>
                            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-sm transition-colors">Lưu Cấu hình Hiện tại</button>
                        </div>
                    </div>
                    <div className="pt-4 border-t border-gray-700">
                        <h4 className="font-semibold text-white mb-3">Tùy chọn Nâng cao</h4>
                         <div className="flex items-center justify-between p-2 bg-gray-800 rounded-md">
                            <label htmlFor="ik-toggle" className="font-medium text-gray-300 text-sm">Bật Inverse Kinematics (IK)</label>
                            <label className="switch" style={{ width: '40px', height: '24px' }}>
                                <input type="checkbox" id="ik-toggle" checked={isIkEnabled} onChange={() => setIsIkEnabled(!isIkEnabled)} />
                                <span className="slider" style={{'--slider-before-h': '18px', '--slider-before-w': '18px', '--slider-before-left': '3px', '--slider-before-bottom': '3px', '--slider-checked-transform': 'translateX(16px)'} as React.CSSProperties}></span>
                            </label>
                        </div>
                        <p className="text-xs text-gray-400 mt-2">IK giúp ngăn ngừa trượt chân và giữ cho các chi được kết nối tự nhiên.</p>
                    </div>
                </div>
            </div>

            {/* Right Panel: Right AI Keypoints */}
            <div className="lg:col-span-3 panel p-4">
                 <h4 className="font-semibold text-white mb-3">Điểm Keypoint AI</h4>
                 <h5 className="text-xs font-bold uppercase text-gray-500 mb-2">Bên Phải</h5>
                 <div className="space-y-2">
                      {rightPoints.map(point => {
                          const mappedBone = mappings[point.id] ? rigBoneMap.get(mappings[point.id]!) : null;
                          return <KeypointItem key={point.id} point={point} mappedBone={mappedBone} isSelected={selectedPoint === point.id} onClick={() => handlePointClick(point.id)} onClear={(e) => { e.stopPropagation(); clearMappingForPoint(point.id); }} />
                      })}
                 </div>
            </div>
        </div>
    );
};
