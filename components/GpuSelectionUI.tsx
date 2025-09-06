
import React, { useState, useEffect, useMemo } from 'react';

type ProcessingUnit = 'cpu' | 'igpu' | 'dgpu' | 'auto' | 'colab' | 'kaggle';
type SystemStatusType = 'searching' | 'success' | 'warning' | 'error';

interface SystemStatus {
    type: SystemStatusType;
    message: string;
}

const detectedGpus = {
  igpu: 'Intel Iris Xe Graphics',
  dgpu: 'NVIDIA GeForce RTX 3080',
};

// --- ICONS ---
const CpuIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a2 2 0 0 0-2 2v2H8a2 2 0 0 0-2 2v2H4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h2v2a2 2 0 0 0 2 2h2v2a2 2 0 0 0 2 2a2 2 0 0 0 2-2v-2h2a2 2 0 0 0 2-2v-2h2a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2h-2V8a2 2 0 0 0-2-2h-2V4a2 2 0 0 0-2-2zm-4 8h8v4H8v-4z"/></svg> );
const GpuIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zM9 18H7v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2zm0-4H7V5h10v9z"/></svg> );
const CloudIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor"> <path d="M5.5 16a3.5 3.5 0 01-.369-6.98a4 4 0 117.753-1.977A4.5 4.5 0 1113.5 16h-8z" /> </svg> );
const ExternalLinkIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1.5 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /> </svg> );

const SystemStatusIcon: React.FC<{ type: SystemStatusType }> = ({ type }) => {
    switch (type) {
        case 'searching':
            return <svg className="h-5 w-5 text-sky-400 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>;
        case 'success':
            return <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>;
        case 'warning':
             return <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M8.257 3.099c.636-1.21 2.864-1.21 3.5 0l5.416 10.332a2 2 0 01-1.75 2.903H4.59a2 2 0 01-1.75-2.903L8.257 3.099zM10 13a1 1 0 110-2 1 1 0 010 2zm-1-3a1 1 0 001 1h.01a1 1 0 001-1V7a1 1 0 00-2 0v3z" clipRule="evenodd" /></svg>;
        case 'error':
            return <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" /></svg>;
        default:
            return null;
    }
};

const statusCycle: SystemStatus[] = [
    { type: 'searching', message: 'Đang tìm kiếm thiết bị tối ưu...' },
    { type: 'success', message: `Phát hiện dGPU: ${detectedGpus.dgpu}. Đã chọn làm thiết bị chính.` },
    { type: 'searching', message: 'Kịch bản 2: Không tìm thấy dGPU. Đang kết nối tới Google Colab...' },
    { type: 'success', message: 'Đã kết nối thành công với Google Colab.' },
    { type: 'warning', message: 'Cảnh báo: Phiên Google Colab sẽ hết hạn trong 5 phút.' },
    { type: 'error', message: 'Mất kết nối với Google Colab. Tự động chuyển về CPU.' },
];

export const GpuSelectionUI: React.FC = () => {
    const [activeSelection, setActiveSelection] = useState<ProcessingUnit>('auto');
    const [simulatedDevice, setSimulatedDevice] = useState<string>(detectedGpus.dgpu);
    const [systemStatusIndex, setSystemStatusIndex] = useState(0);

    const systemStatus = statusCycle[systemStatusIndex];
    
    // Effect for cycling through system status messages to simulate auto-detection
    useEffect(() => {
        const timer = setTimeout(() => {
            setSystemStatusIndex((prevIndex) => (prevIndex + 1) % statusCycle.length);
        }, 3500);
        return () => clearTimeout(timer);
    }, [systemStatusIndex]);
    
    // Effect to update the simulated active device based on the current status message
    useEffect(() => {
      const currentStatus = statusCycle[systemStatusIndex];
      if (currentStatus.message.includes(detectedGpus.dgpu)) {
        setSimulatedDevice(detectedGpus.dgpu);
      } else if (currentStatus.message.includes('Google Colab')) {
        setSimulatedDevice('Google Colab (Cloud GPU)');
      } else if (currentStatus.message.includes('CPU')) {
        setSimulatedDevice('Intel Core i9-12900HK');
      }
    }, [systemStatusIndex]);
    
    const activeDeviceName = useMemo(() => {
        if (activeSelection !== 'auto') {
            switch(activeSelection) {
                case 'cpu': return 'Intel Core i9-12900HK';
                case 'igpu': return detectedGpus.igpu;
                case 'dgpu': return detectedGpus.dgpu;
                case 'colab': return 'Google Colab (Cloud GPU)';
                case 'kaggle': return 'Kaggle Notebooks (Cloud GPU)';
                default: return '';
            }
        }
        return `${simulatedDevice} (Tự động)`;
    }, [activeSelection, simulatedDevice]);
    
    const localOptions: { id: 'auto' | 'dgpu' | 'igpu' | 'cpu'; label: string; description: string; icon: JSX.Element; }[] = [
        { id: 'auto', label: 'Tự động', description: 'Ưu tiên GPU rời', icon: <GpuIcon/> },
        { id: 'dgpu', label: 'GPU Rời', description: detectedGpus.dgpu, icon: <GpuIcon/> },
        { id: 'igpu', label: 'GPU Tích hợp', description: detectedGpus.igpu, icon: <GpuIcon/> },
        { id: 'cpu', label: 'CPU', description: 'Sử dụng cho máy không có GPU', icon: <CpuIcon/> },
    ];

    const handleCloudConnect = (service: 'colab' | 'kaggle') => {
        setActiveSelection(service);
        const url = service === 'colab' 
            ? 'https://colab.research.google.com/' 
            : 'https://www.kaggle.com/notebooks';
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    return (
        <div className="w-full max-w-lg mx-auto">
            <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-700 space-y-4">
                
                {/* --- Lựa chọn thủ công --- */}
                <fieldset>
                    <legend className="text-lg font-semibold text-gray-300 mb-3">Lựa chọn của người dùng</legend>
                    <div className="space-y-3">
                        {localOptions.map(option => (
                            <label key={option.id} htmlFor={option.id} className={`flex items-center p-3 rounded-md border transition-colors cursor-pointer ${activeSelection === option.id ? 'bg-teal-500/20 border-teal-500' : 'bg-gray-800 border-gray-700 hover:bg-gray-700/80'}`}>
                                <input type="radio" id={option.id} name="processing-unit" value={option.id} checked={activeSelection === option.id} onChange={(e) => setActiveSelection(e.target.value as ProcessingUnit)} className="h-4 w-4 text-teal-600 bg-gray-700 border-gray-600 focus:ring-teal-500"/>
                                <div className="ml-3 text-sm flex-grow">
                                    <span className="font-medium text-white flex items-center">{option.icon} {option.label}</span>
                                    <p className="text-gray-400">{option.description}</p>
                                </div>
                            </label>
                        ))}
                    </div>
                </fieldset>

                <fieldset>
                    <legend className="text-lg font-semibold text-gray-300 mb-3 pt-4 border-t border-gray-700/80">GPU trên Đám Mây (Miễn phí)</legend>
                    <div className="space-y-3">
                        <div className={`flex items-center p-3 rounded-md border transition-colors ${activeSelection === 'colab' ? 'bg-teal-500/20 border-teal-500' : 'bg-gray-800 border-gray-700'}`}>
                            <div className="text-sm flex-grow">
                                <span className="font-medium text-white flex items-center"><CloudIcon /> Google Colab</span>
                                <p className="text-gray-400">Sử dụng GPU miễn phí qua Colab notebooks.</p>
                            </div>
                            <button onClick={() => handleCloudConnect('colab')} className="ml-4 flex-shrink-0 bg-sky-600 hover:bg-sky-700 text-white font-bold py-2 px-3 rounded-md text-sm transition-colors flex items-center">Kết nối <ExternalLinkIcon /></button>
                        </div>
                        <div className={`flex items-center p-3 rounded-md border transition-colors ${activeSelection === 'kaggle' ? 'bg-teal-500/20 border-teal-500' : 'bg-gray-800 border-gray-700'}`}>
                            <div className="text-sm flex-grow">
                                <span className="font-medium text-white flex items-center"><CloudIcon /> Kaggle Notebooks</span>
                                <p className="text-gray-400">Một lựa chọn khác cho GPU miễn phí trên cloud.</p>
                            </div>
                            <button onClick={() => handleCloudConnect('kaggle')} className="ml-4 flex-shrink-0 bg-sky-600 hover:bg-sky-700 text-white font-bold py-2 px-3 rounded-md text-sm transition-colors flex items-center">Kết nối <ExternalLinkIcon /></button>
                        </div>
                    </div>
                </fieldset>

                {/* --- Trạng thái Hệ thống (Mô phỏng) --- */}
                <div className="mt-4 pt-4 border-t border-gray-700 space-y-3">
                    <div>
                        <h5 className="text-sm font-semibold text-gray-400">Trạng thái Hệ thống (Chế độ Tự động):</h5>
                        <div className="flex items-center mt-2 p-2 bg-black/20 rounded-md">
                            <div className="flex-shrink-0 w-6 text-center"><SystemStatusIcon type={systemStatus.type} /></div>
                            <p className="text-sm text-gray-300 ml-2">{systemStatus.message}</p>
                        </div>
                    </div>
                     <div>
                        <h5 className="text-sm font-semibold text-gray-400">Thiết bị đang hoạt động:</h5>
                        <p className="text-lg font-bold text-teal-400 mt-1 animate-fade-in-scale">{activeDeviceName}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};