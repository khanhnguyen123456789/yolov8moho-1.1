
import React from 'react';

const DiagramNode: React.FC<{ title: string; icon: JSX.Element; children?: React.ReactNode }> = ({ title, icon, children }) => (
    <div className="flex flex-col items-center text-center p-3 bg-gray-800/50 rounded-lg border border-gray-700 w-40 min-h-[120px]">
        <div className="w-12 h-12 mb-2 flex items-center justify-center text-teal-400">
            {icon}
        </div>
        <h4 className="font-bold text-md text-white">{title}</h4>
        {children}
    </div>
);

const Arrow: React.FC<{ label: string; step: number; isVertical?: boolean; isReversed?: boolean }> = ({ label, step, isVertical = false, isReversed = false }) => (
    <div className={`flex items-center text-center text-gray-400 ${isVertical ? 'flex-col w-40' : 'flex-row h-full'}`}>
        <div className={`flex-grow ${isVertical ? 'w-px h-8' : 'h-px w-8'} bg-gray-600`}></div>
        <div className="flex flex-col items-center justify-center mx-2 my-2">
            <div className="w-6 h-6 mb-1 flex items-center justify-center bg-teal-500 text-black text-xs font-bold rounded-full">{step}</div>
            <span className="text-xs max-w-[100px]">{label}</span>
        </div>
        <div className={`flex-grow ${isVertical ? 'w-px h-8' : 'h-px w-8'} bg-gray-600`}></div>
    </div>
);

// --- ICONS ---
const UserIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" /></svg>;
const ClientIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M3 5a2 2 0 012-2h10a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5zm2 0v10h10V5H5z" clipRule="evenodd" /><path d="M7 7a1 1 0 000 2h6a1 1 0 100-2H7zM7 11a1 1 0 100 2h3a1 1 0 100-2H7z" /></svg>;
const ServerIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 20 20" fill="currentColor"><path d="M2 5a2 2 0 012-2h12a2 2 0 012 2v2a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm14 0H4v2h12V5zM2 13a2 2 0 012-2h12a2 2 0 012 2v2a2 2 0 01-2 2H4a2 2 0 01-2-2v-2zm14 0H4v2h12v-2z" /></svg>;
const ApiIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.532 1.532 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.532 1.532 0 01-.947-2.287c1.561-.379-1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" /></svg>;


export const UserApiManagementDiagram: React.FC = () => {
    return (
        <div className="flex flex-col lg:flex-row items-center justify-center gap-4 text-xs">
            <DiagramNode title="Người Dùng" icon={<UserIcon />} />
            
            <Arrow step={1} label="Đăng nhập" />
            
            <DiagramNode title="Frontend (Client)" icon={<ClientIcon />}>
                <p className="text-gray-400 text-xs mt-1">Lưu trữ API Key</p>
            </DiagramNode>

            <div className="flex flex-col">
                <Arrow step={2} label="Yêu cầu API với 'Bearer' Token" />
                <Arrow step={5} label="Nhận kết quả" isReversed />
            </div>

            <DiagramNode title="Backend (Server)" icon={<ServerIcon />}>
                 <p className="text-gray-400 text-xs mt-1">Xác thực API Key</p>
            </DiagramNode>

            <div className="flex flex-col">
                <Arrow step={3} label="Gọi API thay mặt người dùng" />
                <Arrow step={4} label="Dữ liệu trả về" isReversed />
            </div>

            <DiagramNode title="Dịch Vụ AI (Gemini)" icon={<ApiIcon />} />
        </div>
    );
};