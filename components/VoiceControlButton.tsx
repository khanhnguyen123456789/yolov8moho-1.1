
import React, { useState, useEffect } from 'react';

type VoiceState = 'IDLE' | 'LISTENING' | 'PROCESSING' | 'SUCCESS' | 'ERROR';

const stateConfig: { [key in VoiceState]: { icon: JSX.Element; text: string; color: string; } } = {
    IDLE: {
        icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" /></svg>,
        text: 'Nhấn để nói',
        color: 'bg-gray-600 text-gray-300'
    },
    LISTENING: {
        icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" /></svg>,
        text: 'Đang lắng nghe...',
        color: 'bg-sky-500 text-white shadow-lg shadow-sky-500/50 animate-pulse'
    },
    PROCESSING: {
        icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h5M20 20v-5h-5" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 12a8 8 0 018-8v0a8 8 0 018 8v0a8 8 0 01-8 8v0a8 8 0 01-8-8v0z" /></svg>,
        text: 'Đang xử lý...',
        color: 'bg-indigo-500 text-white'
    },
    SUCCESS: {
        icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>,
        text: 'Lệnh đã nhận!',
        color: 'bg-green-500 text-white'
    },
    ERROR: {
        icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" /></svg>,
        text: 'Lỗi! Thử lại.',
        color: 'bg-red-500 text-white'
    },
};

const stateCycle: VoiceState[] = ['IDLE', 'LISTENING', 'PROCESSING', 'SUCCESS', 'IDLE', 'LISTENING', 'ERROR', 'IDLE'];

export const VoiceControlButton: React.FC = () => {
    const [currentStateIndex, setCurrentStateIndex] = useState(0);
    const currentState: VoiceState = stateCycle[currentStateIndex];
    const config = stateConfig[currentState];

    useEffect(() => {
        const getTimeoutDuration = () => {
             switch(stateCycle[currentStateIndex]) {
                case 'LISTENING':
                case 'PROCESSING':
                    return 2000;
                case 'SUCCESS':
                case 'ERROR':
                    return 1500;
                default: // IDLE
                    return 2500;
            }
        }

        const timer = setTimeout(() => {
            setCurrentStateIndex((prevIndex) => (prevIndex + 1) % stateCycle.length);
        }, getTimeoutDuration());

        return () => clearTimeout(timer);
    }, [currentStateIndex]);

    return (
        <div className="flex flex-col items-center gap-4">
            <button
                className={`w-24 h-24 rounded-full flex items-center justify-center transition-all duration-300 ease-in-out transform hover:scale-110 ${config.color}`}
                aria-label={config.text}
            >
                {config.icon}
            </button>
            <p className="text-sm font-semibold text-gray-400 w-32 text-center h-10">{config.text}</p>
        </div>
    );
};