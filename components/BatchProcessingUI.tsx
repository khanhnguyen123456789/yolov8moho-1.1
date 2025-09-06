import React, { useState, useEffect } from 'react';

type FileStatus = 'waiting' | 'processing' | 'completed' | 'error';

interface ProcessFile {
    id: number;
    name: string;
    status: FileStatus;
    progress: number;
}

const statusConfig: Record<FileStatus, { text: string; color: string; icon: JSX.Element }> = {
    waiting: {
        text: 'Đang chờ',
        color: 'text-gray-400',
        icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" /></svg>
    },
    processing: {
        text: 'Đang xử lý...',
        color: 'text-sky-400',
        icon: <svg className="h-5 w-5 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
    },
    completed: {
        text: 'Hoàn thành',
        color: 'text-green-400',
        icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
    },
    error: {
        text: 'Lỗi',
        color: 'text-red-400',
        icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" /></svg>
    },
};

const initialFiles: ProcessFile[] = [
    { id: 1, name: 'scene_01_take_03.mp4', status: 'completed', progress: 100 },
    { id: 2, name: 'character_jump_cycle.mov', status: 'completed', progress: 100 },
    { id: 3, name: 'dialogue_sequence_long.mp4', status: 'processing', progress: 45 },
    { id: 4, name: 'walk_cycle_ref.avi', status: 'waiting', progress: 0 },
    { id: 5, name: 'combat_scene_final.mp4', status: 'waiting', progress: 0 },
    { id: 6, name: 'test_anim_001.mp4', status: 'error', progress: 0 },
];

export const BatchProcessingUI: React.FC = () => {
    const [files, setFiles] = useState<ProcessFile[]>(initialFiles);
    const [isDragOver, setIsDragOver] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setFiles(currentFiles => 
                currentFiles.map(file => {
                    if (file.status === 'processing' && file.progress < 100) {
                        const newProgress = Math.min(100, file.progress + Math.random() * 10);
                        return {
                            ...file,
                            progress: newProgress,
                            status: newProgress === 100 ? 'completed' : 'processing',
                        };
                    }
                    return file;
                })
            );
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const handleDragEvents = (e: React.DragEvent<HTMLDivElement>, isOver: boolean) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragOver(isOver);
    };

    return (
        <div className="w-full max-w-2xl mx-auto">
            <div 
                className={`p-8 border-2 border-dashed rounded-lg text-center transition-all duration-300 ${isDragOver ? 'border-teal-400 bg-teal-500/10' : 'border-gray-600 hover:border-gray-500'}`}
                onDragOver={(e) => handleDragEvents(e, true)}
                onDragLeave={(e) => handleDragEvents(e, false)}
                onDrop={(e) => handleDragEvents(e, false)} // In a real app, handle file drop here
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
                <p className="mt-2 text-sm text-gray-400">
                    <span className="font-semibold text-teal-400">Kéo và thả</span> thư mục video của bạn vào đây
                </p>
                <p className="text-xs text-gray-500">hoặc nhấn để duyệt</p>
            </div>

            <div className="mt-6 bg-gray-900/50 rounded-lg border border-gray-700 max-h-80 overflow-y-auto">
                <ul className="divide-y divide-gray-700/50">
                    {files.map(file => {
                        const config = statusConfig[file.status];
                        return (
                            <li key={file.id} className="p-3 flex items-center gap-4">
                                <div className={`flex-shrink-0 w-6 text-center ${config.color}`}>{config.icon}</div>
                                <div className="flex-grow">
                                    <p className="text-sm font-medium text-gray-300 truncate">{file.name}</p>
                                    {file.status === 'processing' ? (
                                        <div className="w-full bg-gray-700 rounded-full h-1.5 mt-1">
                                            <div className="bg-sky-500 h-1.5 rounded-full" style={{ width: `${file.progress}%` }}></div>
                                        </div>
                                    ) : (
                                        <p className={`text-xs ${config.color}`}>{config.text}</p>
                                    )}
                                </div>
                                <div className="text-sm font-semibold text-gray-400">
                                    {file.status === 'processing' && `${Math.round(file.progress)}%`}
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
};