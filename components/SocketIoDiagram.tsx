
import React from 'react';

// Reusable components for diagramming
const DiagramNode: React.FC<{ title: string; icon: JSX.Element; children?: React.ReactNode }> = ({ title, icon, children }) => (
    <div className="flex flex-col items-center text-center p-3 bg-gray-800/50 rounded-lg border border-gray-700 w-48 min-h-[130px] justify-center">
        <div className="w-12 h-12 mb-2 flex items-center justify-center text-teal-400">
            {icon}
        </div>
        <h4 className="font-bold text-md text-white">{title}</h4>
        {children}
    </div>
);

const Arrow: React.FC<{ label: string; isReversed?: boolean }> = ({ label, isReversed = false }) => (
    <div className={`flex flex-col items-center text-center text-gray-400 my-2`}>
        <span className="text-xs max-w-[120px] mb-1 font-mono text-gray-500">{label}</span>
        <svg xmlns="http://www.w3.org/2000/svg" className={`h-10 w-10 text-teal-400 ${isReversed ? 'transform -scale-y-100' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
    </div>
);


// --- ICONS ---
const ClientIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M3 5a2 2 0 012-2h10a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5zm2 0v10h10V5H5z" clipRule="evenodd" /><path d="M7 7a1 1 0 000 2h6a1 1 0 100-2H7zM7 11a1 1 0 100 2h3a1 1 0 100-2H7z" /></svg>;
const ServerIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 20 20" fill="currentColor"><path d="M2 5a2 2 0 012-2h12a2 2 0 012 2v2a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm14 0H4v2h12V5zM2 13a2 2 0 012-2h12a2 2 0 012 2v2a2 2 0 01-2 2H4a2 2 0 01-2-2v-2zm14 0H4v2h12v-2z" /></svg>;


export const SocketIoDiagram: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center gap-2 text-xs p-4">
            <DiagramNode title="Yolov8Moho Client" icon={<ClientIcon />}>
                <p className="text-gray-400 text-xs mt-1">(Plugin hoặc App)</p>
            </DiagramNode>
            
            <Arrow label="socket.emit('poseData', data)" />

            <DiagramNode title="Socket.io Server" icon={<ServerIcon />}>
                <p className="text-gray-400 text-xs mt-1">Xử lý AI thời gian thực</p>
            </DiagramNode>

            <Arrow label="socket.emit('poseResult', result)" isReversed />
        </div>
    );
};
