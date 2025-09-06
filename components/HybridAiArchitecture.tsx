
import React, { useState, useEffect } from 'react';
import { CodeBlock } from './CodeBlock';
import { SocketIoDiagram } from './SocketIoDiagram';
import { 
    SOCKET_IO_SERVER_CODE,
    LOCAL_AI_FALLBACK_CODE,
    MODEL_SELECTION_CODE
} from '../constants';

// --- Sub-components defined inside the main component ---

// Connection Status Simulator
const ConnectionStatusUI: React.FC<{ selectedModel: 'lightweight' | 'full-size' }> = ({ selectedModel }) => {
    const [isConnected, setIsConnected] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            setIsConnected(prev => !prev);
        }, 5000); // Toggle every 5 seconds
        return () => clearInterval(interval);
    }, []);

    const statusConfig = isConnected 
        ? { color: 'text-green-400', text: 'Đã kết nối' } 
        : { color: 'text-red-400', text: 'Đã ngắt kết nối' };
    
    const activeMode = isConnected 
        ? 'Xử lý phía Server' 
        : `Dự phòng Cục bộ (${selectedModel === 'lightweight' ? 'Lightweight' : 'Full-Size'})`;

    return (
        <div className="space-y-4">
            <div className="p-3 bg-black/20 rounded-md border border-gray-700">
                <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-300">Trạng thái WebSocket:</span>
                    <div className="flex items-center">
                        <span className={`relative flex h-3 w-3 mr-2`}>
                            {isConnected && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>}
                            <span className={`relative inline-flex rounded-full h-3 w-3 ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></span>
                        </span>
                        <span className={`font-bold ${statusConfig.color}`}>{statusConfig.text}</span>
                    </div>
                </div>
                <div className="flex justify-between items-center mt-2">
                    <span className="font-semibold text-gray-300">Chế độ AI đang hoạt động:</span>
                    <span className="font-bold text-teal-400">{activeMode}</span>
                </div>
            </div>
            <div>
                <h4 className="text-md font-semibold text-white mb-2">Logic Chuyển đổi Dự phòng (Fallback)</h4>
                <CodeBlock code={LOCAL_AI_FALLBACK_CODE} language="javascript" />
            </div>
        </div>
    );
};

// AI Model Selector
const AiModelSelectionUI: React.FC<{ 
    selectedModel: 'lightweight' | 'full-size'; 
    setSelectedModel: (model: 'lightweight' | 'full-size') => void;
}> = ({ selectedModel, setSelectedModel }) => {
    return (
        <div className="space-y-4 mt-6">
            <fieldset>
                <legend className="text-lg font-semibold text-white mb-2">Lựa chọn Mô hình AI Cục bộ</legend>
                <div className="space-y-2">
                     <label htmlFor="lightweight" className={`flex p-3 rounded-md border transition-colors cursor-pointer ${selectedModel === 'lightweight' ? 'bg-teal-500/20 border-teal-500' : 'bg-gray-800 border-gray-700 hover:bg-gray-700/80'}`}>
                        <input type="radio" id="lightweight" name="ai-model" value="lightweight" checked={selectedModel === 'lightweight'} onChange={() => setSelectedModel('lightweight')} className="h-4 w-4 mt-1 text-teal-600 bg-gray-700 border-gray-600 focus:ring-teal-500"/>
                        <div className="ml-3 text-sm">
                            <span className="font-medium text-white">Mô hình Lightweight</span>
                            <p className="text-gray-400">Tối ưu hóa cho tốc độ, phù hợp với phần cứng yếu hơn (sử dụng TFLite/ONNX).</p>
                        </div>
                    </label>
                     <label htmlFor="full-size" className={`flex p-3 rounded-md border transition-colors cursor-pointer ${selectedModel === 'full-size' ? 'bg-teal-500/20 border-teal-500' : 'bg-gray-800 border-gray-700 hover:bg-gray-700/80'}`}>
                        <input type="radio" id="full-size" name="ai-model" value="full-size" checked={selectedModel === 'full-size'} onChange={() => setSelectedModel('full-size')} className="h-4 w-4 mt-1 text-teal-600 bg-gray-700 border-gray-600 focus:ring-teal-500"/>
                        <div className="ml-3 text-sm">
                            <span className="font-medium text-white">Mô hình Full-Size</span>
                            <p className="text-gray-400">Độ chính xác tối đa, yêu cầu phần cứng mạnh mẽ hơn.</p>
                        </div>
                    </label>
                </div>
            </fieldset>
            <div>
                 <h4 className="text-md font-semibold text-white mb-2">Logic Tải Mô hình</h4>
                 <CodeBlock code={MODEL_SELECTION_CODE} language="javascript" />
            </div>
        </div>
    );
};


// Main Component for the section
export const HybridAiArchitecture: React.FC = () => {
    const [selectedModel, setSelectedModel] = useState<'lightweight' | 'full-size'>('lightweight');

    return (
        <>
            <p className="mb-8 text-gray-400 leading-relaxed max-w-4xl">
                Để tối ưu hóa hiệu suất và đảm bảo tính linh hoạt, Yolov8Moho 1.0 giới thiệu một kiến trúc xử lý AI hybrid. Hệ thống ưu tiên sử dụng một server WebSocket mạnh mẽ để xử lý thời gian thực, giảm tải cho máy người dùng. Tuy nhiên, khi kết nối không khả dụng, nó sẽ tự động chuyển sang chế độ dự phòng, sử dụng các mô hình AI đã được tối ưu hóa để chạy trực tiếp trên máy cục bộ.
            </p>
            <div className="grid md:grid-cols-2 gap-8">
                {/* Left Panel: WebSocket Server */}
                <div className="panel p-6 flex flex-col">
                    <h3 className="font-orbitron text-xl font-bold text-teal-400 mb-3 text-center">Phương án 1: Xử lý phía Server (Ưu tiên)</h3>
                    <p className="text-gray-400 mb-4 text-center text-sm">Giao tiếp thời gian thực qua Socket.io để giảm tải phần cứng cục bộ.</p>
                    <div className="flex-grow flex items-center justify-center">
                        <SocketIoDiagram />
                    </div>
                    <div className="mt-4">
                        <h4 className="text-md font-semibold text-white mb-2">Ví dụ Server (Node.js & Socket.io)</h4>
                        <CodeBlock code={SOCKET_IO_SERVER_CODE} language="javascript" />
                    </div>
                </div>

                {/* Right Panel: Local Fallback */}
                <div className="panel p-6">
                    <h3 className="font-orbitron text-xl font-bold text-teal-400 mb-3 text-center">Phương án 2: Dự phòng Cục bộ (Offline)</h3>
                    <p className="text-gray-400 mb-4 text-center text-sm">Tự động kích hoạt khi mất kết nối, đảm bảo công việc không bị gián đoạn.</p>
                    <ConnectionStatusUI selectedModel={selectedModel} />
                    <AiModelSelectionUI selectedModel={selectedModel} setSelectedModel={setSelectedModel} />
                </div>
            </div>
        </>
    );
};
