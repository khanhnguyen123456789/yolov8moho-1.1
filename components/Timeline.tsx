import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { GenerativeAiControls, Suggestion } from './GenerativeAiControls';

// --- ICONS ---
const BoneTranslateIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>;
const BoneScaleIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4 2a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V4a2 2 0 00-2-2H4zm10 2a1 1 0 00-1-1H7a1 1 0 00-1 1v4a1 1 0 001 1h6a1 1 0 001-1V4z" clipRule="evenodd" /></svg>;
const BoneRotateIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 110 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" /></svg>;
const BoneShearIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path d="M10.894 2.553a1 1 0 00-1.789 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" /></svg>;
const UndoIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>;
const RedoIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>;


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

const INITIAL_TIMELINE_DATA: TimelineLayer[] = [
    { id: 'bone-translate', name: 'Bone Translate', icon: <BoneTranslateIcon />, keyframes: [0, 12, 15, 18, 21, 24, 27, 30, 33, 36, 65, 80, 120] },
    { id: 'bone-scale', name: 'Bone Scale', icon: <BoneScaleIcon />, keyframes: [0, 12, 36, 90] },
    { id: 'bone-rotate', name: 'Bone Rotate', icon: <BoneRotateIcon />, keyframes: [0, 12, 18, 24, 30, 36, 72, 150] },
    { id: 'bone-shear', name: 'Bone Shear/Squash', icon: <BoneShearIcon />, keyframes: [0] },
    { id: 'camera-track', name: 'Theo dõi Camera (4)', icon: <CameraIcon number={4} />, keyframes: [0, 18, 36, 54, 180], color: '#C4B5FD' /* Violet */ },
    { id: 'camera-zoom', name: 'Thu phóng Camera (5)', icon: <CameraIcon number={5} />, keyframes: [0, 24, 60, 130], color: '#FFD700' /* Gold */ },
    { id: 'camera-rotate', name: 'Xoay Camera (6)', icon: <CameraIcon number={6} />, keyframes: [0, 48, 96, 144], color: '#1E90FF' /* Dodger Blue */ },
    { id: 'camera-pan', name: 'Quét/Nghiêng Camera (7)', icon: <CameraIcon number={7} />, keyframes: [0, 12, 24, 36, 48, 60, 72, 84, 96, 108, 120], color: '#32CD32' /* Lime Green */ },
];

const PADDING_LEFT = 40; // px, for icons and names

interface SelectedKeyframe {
    layerId: string;
    frame: number;
    originalFrame: number;
}

// --- SUB-COMPONENTS ---

const VideoSettings: React.FC<{
    tempSettings: { duration: string, fps: string };
    onTempChange: (field: 'duration' | 'fps', value: string) => void;
    onApply: () => void;
}> = ({ tempSettings, onTempChange, onApply }) => (
    <div className="p-3 bg-gray-900/50 rounded-lg border border-gray-700 space-y-3">
        <h4 className="text-md font-semibold text-gray-300">Simulated Video Properties</h4>
        <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="w-full sm:w-auto flex-grow">
                <label htmlFor="duration" className="text-sm font-medium text-gray-400">Video Duration (seconds)</label>
                <input
                    id="duration"
                    type="number"
                    value={tempSettings.duration}
                    onChange={(e) => onTempChange('duration', e.target.value)}
                    className="w-full bg-gray-800 border border-gray-600 text-white placeholder-gray-500 text-sm rounded-md focus:ring-teal-500 focus:border-teal-500 block p-2"
                />
            </div>
            <div className="w-full sm:w-auto flex-grow">
                <label htmlFor="fps" className="text-sm font-medium text-gray-400">Video FPS</label>
                <input
                    id="fps"
                    type="number"
                    value={tempSettings.fps}
                    onChange={(e) => onTempChange('fps', e.target.value)}
                    className="w-full bg-gray-800 border border-gray-600 text-white placeholder-gray-500 text-sm rounded-md focus:ring-teal-500 focus:border-teal-500 block p-2"
                />
            </div>
            <button
                onClick={onApply}
                className="w-full sm:w-auto self-end bg-teal-600 hover:bg-teal-500 text-white font-bold py-2 px-4 rounded text-sm transition-colors"
            >
                Apply
            </button>
        </div>
    </div>
);


const TimelineRuler: React.FC<{ config: any }> = ({ config }) => {
    const { maxFramesInView, fps, segmentStartFrame } = config;
    const frameStep = fps >= 30 ? fps / 5 : fps / 2; // Adjust step for readability

    return (
        <div className="relative h-6 flex items-end" style={{ paddingLeft: PADDING_LEFT }}>
            <div className="flex-1 h-full relative">
                {Array.from({ length: maxFramesInView / frameStep + 1 }).map((_, i) => {
                    const frameNumber = Math.round(segmentStartFrame + (i * frameStep));
                    return (
                        <span
                            key={i}
                            className="absolute bottom-0 text-xs text-gray-500 -translate-x-1/2"
                            style={{ left: `${(i * frameStep / maxFramesInView) * 100}%` }}
                        >
                            {frameNumber}
                        </span>
                    );
                })}
            </div>
        </div>
    );
};

const TimelineLayerRow: React.FC<{
    layer: TimelineLayer;
    selectedKeyframe: SelectedKeyframe | null;
    onKeyframeMouseDown: (e: React.MouseEvent, layerId: string, frame: number) => void;
    config: any;
}> = ({ layer, selectedKeyframe, onKeyframeMouseDown, config }) => {
    const { segmentStartFrame, maxFramesInView } = config;
    const segmentEndFrame = segmentStartFrame + maxFramesInView;

    const visibleKeyframes = layer.keyframes.filter(f => f >= segmentStartFrame && f < segmentEndFrame);

    return (
        <div className="h-6 flex items-center border-t border-gray-700/50">
            <div className="w-[40px] flex-shrink-0 flex items-center justify-start pl-4 text-gray-400" title={layer.name}>
                {layer.icon}
            </div>
            <div className="flex-1 h-full relative">
                {/* Horizontal Track Line */}
                <div className="absolute top-1/2 -translate-y-1/2 w-full h-px bg-gray-600"></div>

                {/* Keyframes */}
                {visibleKeyframes.map(frame => {
                    const isSelected = selectedKeyframe?.layerId === layer.id && selectedKeyframe?.frame === frame;
                    const keyframeStyle = {
                        left: `${((frame - segmentStartFrame) / maxFramesInView) * 100}%`,
                        backgroundColor: isSelected ? '#facc15' : (layer.color || '#E5E7EB'),
                    };
                    const keyframeClasses = `absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full border border-gray-800 -translate-x-1/2 cursor-grab transition-transform ${isSelected ? 'shadow-[0_0_8px_2px_rgba(250,204,21,0.7)] scale-125' : 'hover:scale-125'}`;

                    return (
                        <div
                            key={frame}
                            title={`Keyframe at Frame ${frame}`}
                            className={keyframeClasses}
                            style={keyframeStyle}
                            onMouseDown={(e) => onKeyframeMouseDown(e, layer.id, frame)}
                        ></div>
                    );
                })}
            </div>
        </div>
    );
};

// --- MAIN COMPONENT ---
export const Timeline: React.FC = () => {
    const [layers, setLayers] = useState<TimelineLayer[]>(INITIAL_TIMELINE_DATA);
    const [history, setHistory] = useState<{ undo: TimelineLayer[][], redo: TimelineLayer[][] }>({ undo: [], redo: [] });
    const [selectedKeyframe, setSelectedKeyframe] = useState<SelectedKeyframe | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const timelineRef = useRef<HTMLDivElement>(null);
    const dragStartPosRef = useRef({ x: 0 });
    const dragStartStateRef = useRef<TimelineLayer[] | null>(null);

    const [videoSettings, setVideoSettings] = useState({ duration: 75, fps: 30 });
    const [tempSettings, setTempSettings] = useState({ duration: '75', fps: '30' });
    const [currentSegment, setCurrentSegment] = useState(0);

    const timelineConfig = useMemo(() => {
        const segmentDuration = 60;
        const totalSegments = Math.ceil(videoSettings.duration / segmentDuration);
        const segmentStartSec = currentSegment * segmentDuration;
        const segmentEndSec = Math.min(segmentStartSec + segmentDuration, videoSettings.duration);
        
        const maxFramesInView = segmentDuration * videoSettings.fps;
        const segmentStartFrame = Math.floor(segmentStartSec * videoSettings.fps);
        const segmentEndFrame = Math.floor(segmentEndSec * videoSettings.fps);

        return {
            ...videoSettings,
            totalSegments,
            segmentDuration,
            segmentStartSec,
            segmentEndSec,
            maxFramesInView,
            segmentStartFrame,
            segmentEndFrame,
        };
    }, [videoSettings, currentSegment]);

    const handleApplySettings = () => {
        const duration = parseInt(tempSettings.duration, 10) || 1;
        const fps = parseInt(tempSettings.fps, 10) || 1;
        setVideoSettings({ duration, fps });
        setCurrentSegment(0);
    };

    const pushToHistory = (stateToPush: TimelineLayer[]) => {
        setHistory(prev => ({
            undo: [...prev.undo, stateToPush],
            redo: [],
        }));
    };

    const handleUndo = useCallback(() => {
        setHistory(prev => {
            if (prev.undo.length === 0) return prev;
            const lastState = prev.undo[prev.undo.length - 1];
            const newUndoStack = prev.undo.slice(0, -1);
            setLayers(lastState);
            return {
                undo: newUndoStack,
                redo: [...prev.redo, layers],
            };
        });
    }, [layers]);

    const handleRedo = useCallback(() => {
        setHistory(prev => {
            if (prev.redo.length === 0) return prev;
            const nextState = prev.redo[prev.redo.length - 1];
            const newRedoStack = prev.redo.slice(0, -1);
            setLayers(nextState);
            return {
                undo: [...prev.undo, layers],
                redo: newRedoStack,
            };
        });
    }, [layers]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            const isUndo = (e.ctrlKey || e.metaKey) && !e.shiftKey && e.key.toLowerCase() === 'z';
            const isRedo = ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'y') || ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'z');

            if (isUndo) {
                e.preventDefault();
                handleUndo();
            } else if (isRedo) {
                e.preventDefault();
                handleRedo();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handleUndo, handleRedo]);


    const handleKeyframeMouseDown = (e: React.MouseEvent, layerId: string, frame: number) => {
        e.preventDefault();
        e.stopPropagation();

        dragStartStateRef.current = JSON.parse(JSON.stringify(layers));
        dragStartPosRef.current = { x: e.clientX };
        setIsDragging(true);

        if (e.altKey) {
            pushToHistory(layers); // Save state before duplicating
            setLayers(prevLayers => {
                const newLayers = prevLayers.map(l => {
                    if (l.id === layerId) {
                        const newKeyframes = [...l.keyframes, frame].sort((a, b) => a - b);
                        return { ...l, keyframes: [...new Set(newKeyframes)] };
                    }
                    return l;
                });
                return newLayers;
            });
            setSelectedKeyframe({ layerId, frame, originalFrame: frame });
        } else {
            setSelectedKeyframe({ layerId, frame, originalFrame: frame });
        }
    };
    
    const handleMouseMove = (e: MouseEvent) => {
        if (!isDragging || !selectedKeyframe || !timelineRef.current) return;

        const timelineRect = timelineRef.current.getBoundingClientRect();
        const timelineWidth = timelineRect.width - PADDING_LEFT;
        
        const deltaX = e.clientX - dragStartPosRef.current.x;
        const frameOffset = Math.round((deltaX / timelineWidth) * timelineConfig.maxFramesInView);
        let newFrame = selectedKeyframe.originalFrame + frameOffset;

        // Clamp the frame within total video duration
        const totalVideoFrames = timelineConfig.duration * timelineConfig.fps;
        newFrame = Math.max(0, Math.min(totalVideoFrames -1, newFrame));

        if (newFrame !== selectedKeyframe.frame) {
            setLayers(prevLayers => {
                return prevLayers.map(l => {
                    if (l.id === selectedKeyframe.layerId) {
                        const keyframes = new Set(l.keyframes);
                        keyframes.delete(selectedKeyframe.frame);
                        keyframes.add(newFrame);
                        return { ...l, keyframes: Array.from(keyframes).sort((a,b) => a-b) };
                    }
                    return l;
                });
            });
            setSelectedKeyframe(prev => prev ? { ...prev, frame: newFrame } : null);
        }
    };

    const handleMouseUp = () => {
        if (isDragging && selectedKeyframe && dragStartStateRef.current) {
            const initialLayers = dragStartStateRef.current;
            const wasMoved = selectedKeyframe.originalFrame !== selectedKeyframe.frame;
            if (wasMoved) {
                 pushToHistory(initialLayers);
            }
        }
        setIsDragging(false);
        dragStartStateRef.current = null;
    };


    useEffect(() => {
        if (isDragging) {
            document.body.style.cursor = 'grabbing';
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
        } else {
            document.body.style.cursor = 'default';
        }
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
            document.body.style.cursor = 'default';
        };
    }, [isDragging, selectedKeyframe, timelineConfig]);

    const handleTimelineClick = () => {
        if (!isDragging) {
            setSelectedKeyframe(null);
        }
    };

    const handleSuggestionApply = (suggestion: Suggestion) => {
        const targetLayerId = 'bone-rotate';
        pushToHistory(layers);
        setLayers(currentLayers => {
            const layerIndex = currentLayers.findIndex(l => l.id === targetLayerId);
            if (layerIndex === -1) return currentLayers;
            
            const originalLayer = currentLayers[layerIndex];
            let keyframes = [...originalLayer.keyframes];
            if (keyframes.length < 2) return currentLayers;
    
            const minFrame = Math.min(...keyframes);
            const maxFrame = Math.max(...keyframes);
            const duration = maxFrame - minFrame;
            const midFrame = minFrame + duration / 2;
            const totalFrames = videoSettings.duration * videoSettings.fps;
            const clamp = (val: number) => Math.max(0, Math.min(totalFrames, Math.round(val)));
    
            switch (suggestion.action) {
                case 'increase_amplitude': keyframes = keyframes.map(kf => clamp(midFrame + (kf - midFrame) * 1.2)); break;
                case 'decrease_amplitude': keyframes = keyframes.map(kf => clamp(midFrame + (kf - midFrame) * 0.8)); break;
                case 'lengthen_timing': keyframes = keyframes.map(kf => clamp(minFrame + (kf - minFrame) * 1.2)); break;
                case 'shorten_timing': keyframes = keyframes.map(kf => clamp(minFrame + (kf - minFrame) * 0.8)); break;
                case 'add_anticipation': if (minFrame >= 3) { keyframes.unshift(clamp(minFrame - 3)); } break;
            }
    
            const newLayers = [...currentLayers];
            newLayers[layerIndex] = { ...originalLayer, keyframes: [...new Set(keyframes)].sort((a, b) => a - b) };
            return newLayers;
        });
    };

    return (
        <div className="panel p-4 bg-gray-800/50 space-y-4">
            <VideoSettings 
                tempSettings={tempSettings}
                onTempChange={(field, value) => setTempSettings(prev => ({...prev, [field]: value}))}
                onApply={handleApplySettings}
            />
            <div className="p-2 bg-[#2E2E2E] rounded-lg" onMouseDown={handleTimelineClick}>
                <div className="flex items-center justify-between text-xs text-gray-400 mb-2 px-2">
                    <span>Click to select. Drag to move. <span className="font-semibold text-teal-300">Alt+Drag</span> to duplicate.</span>
                     <div className="flex items-center space-x-2">
                        <button onClick={handleUndo} disabled={history.undo.length === 0} className="flex items-center space-x-1 px-2 py-1 rounded bg-gray-700 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors" title="Undo (Ctrl+Z)"><UndoIcon /><span>Undo</span></button>
                        <button onClick={handleRedo} disabled={history.redo.length === 0} className="flex items-center space-x-1 px-2 py-1 rounded bg-gray-700 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors" title="Redo (Ctrl+Y)"><RedoIcon /><span>Redo</span></button>
                    </div>
                </div>
                <div ref={timelineRef}>
                     <div className="relative" style={{ paddingLeft: PADDING_LEFT }}>
                        <div className="absolute top-0 bottom-0 z-10" style={{ left: `calc(${PADDING_LEFT}px)` }}>
                            <div className="absolute -top-3.5 -translate-x-1/2 w-0 h-0 border-l-[6px] border-r-[6px] border-b-[8px] border-l-transparent border-r-transparent border-b-green-400"></div>
                            <div className="w-px h-full bg-green-400"></div>
                        </div>
                    </div>
                    <TimelineRuler config={timelineConfig} />
                    <div className="relative">
                        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                            {Array.from({ length: timelineConfig.maxFramesInView }).map((_, i) => (
                                <div
                                    key={i}
                                    className={`absolute top-0 bottom-0 w-px ${ (i + 1) % timelineConfig.fps === 0 ? 'bg-gray-500/80' : 'bg-gray-600/50'}`}
                                    style={{ left: `calc(${PADDING_LEFT}px + ${((i + 1) / timelineConfig.maxFramesInView) * 100}%)` }}
                                ></div>
                            ))}
                        </div>
                        <div className="relative">
                            {layers.map((layer, index) => (
                                <React.Fragment key={layer.id}>
                                    <TimelineLayerRow 
                                        layer={layer} 
                                        selectedKeyframe={selectedKeyframe}
                                        onKeyframeMouseDown={handleKeyframeMouseDown}
                                        config={timelineConfig}
                                    />
                                    {index === 3 && <div className="h-4 border-t border-gray-700/50"></div>}
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                </div>

                {timelineConfig.totalSegments > 1 && (
                    <div className="flex items-center justify-center space-x-4 mt-3 text-sm">
                        <button onClick={() => setCurrentSegment(prev => Math.max(0, prev - 1))} disabled={currentSegment === 0} className="px-3 py-1 rounded bg-gray-700 hover:bg-gray-600 disabled:opacity-50 transition-colors">Prev</button>
                        <span className="text-gray-400 font-semibold">
                            Segment {currentSegment + 1} / {timelineConfig.totalSegments} 
                            <span className="font-normal text-gray-500 ml-2">({timelineConfig.segmentStartSec.toFixed(0)}s - {timelineConfig.segmentEndSec.toFixed(0)}s)</span>
                        </span>
                        <button onClick={() => setCurrentSegment(prev => Math.min(timelineConfig.totalSegments - 1, prev + 1))} disabled={currentSegment === timelineConfig.totalSegments - 1} className="px-3 py-1 rounded bg-gray-700 hover:bg-gray-600 disabled:opacity-50 transition-colors">Next</button>
                    </div>
                )}
            </div>

            <div className="pt-4 border-t border-gray-700">
                <GenerativeAiControls onSuggestionApply={handleSuggestionApply} />
            </div>
        </div>
    );
};