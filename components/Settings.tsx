
import React, { useState, useEffect } from 'react';

// Icons for settings
const GpuIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-400" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zM9 18H7v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2zm0-4H7V5h10v9z"/></svg> );
const AiModelIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-400" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.532 1.532 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.532 1.532 0 01-.947-2.287c1.561-.379-1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" /></svg> );
const ThemeIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-400" viewBox="0 0 20 20" fill="currentColor"> <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" /> </svg> );
const NotificationIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-400" viewBox="0 0 20 20" fill="currentColor"> <path d="M10 2a6 6 0 00-6 6v3.586l-1.707 1.707A1 1 0 003 15h14a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" /> </svg> );
const CloudIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-400" viewBox="0 0 20 20" fill="currentColor"> <path d="M5.5 16a3.5 3.5 0 01-.369-6.98a4 4 0 117.753-1.977A4.5 4.5 0 1113.5 16h-8z" /> </svg> );
const ExternalLinkIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /> </svg> );

const poseModels = [
    { id: 'fast', label: 'Nhanh & Nhẹ', description: 'Tốc độ tối đa, phù hợp xem trước. Sử dụng YOLOv8n-Pose.' },
    { id: 'balanced', label: 'Cân Bằng (Khuyên dùng)', description: 'Kết hợp tốt giữa tốc độ và độ chính xác. Sử dụng YOLOv8l-Pose.' },
    { id: 'accurate', label: 'Chính xác Cao', description: 'Độ chính xác cao nhất, hỗ trợ nhiều đối tượng. Yêu cầu phần cứng mạnh. Sử dụng YOLOv11n-Pose.' }
];

export const Settings: React.FC = () => {
    // State for settings
    const [gpu, setGpu] = useState('auto');
    const [poseModel, setPoseModel] = useState('balanced');
    const [isDarkMode, setIsDarkMode] = useState(true);
    const [notifications, setNotifications] = useState({
        jobComplete: true,
        updates: false,
        community: true,
    });
    const [saveStatus, setSaveStatus] = useState('');

    // Load settings from localStorage on mount
    useEffect(() => {
        try {
            const savedSettings = localStorage.getItem('yolov8moho-settings');
            if (savedSettings) {
                const settings = JSON.parse(savedSettings);
                setGpu(settings.gpu ?? 'auto');
                setPoseModel(settings.poseModel ?? 'balanced');
                setIsDarkMode(settings.isDarkMode ?? true);
                setNotifications(settings.notifications ?? {
                    jobComplete: true,
                    updates: false,
                    community: true,
                });
            }
        } catch (error) {
            console.error("Failed to load settings from localStorage", error);
        }
    }, []);

    // Effect to toggle theme class on body element
    useEffect(() => {
        const body = document.body;
        if (!isDarkMode) {
            body.classList.add('light-theme');
        } else {
            body.classList.remove('light-theme');
        }
    }, [isDarkMode]);

    const handleNotificationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = event.target;
        setNotifications(prev => ({ ...prev, [name]: checked }));
    };

    const handleColabConnect = () => {
        if (gpu === 'colab') {
            // Disconnect and revert to auto
            setGpu('auto');
        } else {
            // Connect
            setGpu('colab');
            window.open('https://colab.research.google.com/', '_blank', 'noopener,noreferrer');
        }
    };

    const handleSave = () => {
        const settingsToSave = {
            gpu,
            poseModel,
            isDarkMode,
            notifications
        };
        try {
            localStorage.setItem('yolov8moho-settings', JSON.stringify(settingsToSave));
            setSaveStatus('Cài đặt đã được lưu!');
            setTimeout(() => setSaveStatus(''), 3000);
        } catch (error) {
            console.error("Failed to save settings to localStorage", error);
            setSaveStatus('Lỗi! Không thể lưu cài đặt.');
            setTimeout(() => setSaveStatus(''), 3000);
        }
    };

    return (
        <div className="panel p-6">
            <div className="space-y-8">
                {/* Performance & AI Settings */}
                <div>
                    <h3 className="text-xl font-semibold text-white mb-4 border-l-4 border-teal-400 pl-4">Hiệu Suất & AI</h3>
                    <div className="space-y-4 p-4 bg-black/20 rounded-md">
                        <div>
                            <div className="flex items-center justify-between py-2">
                                <div className="flex items-center">
                                    <GpuIcon />
                                    <label htmlFor="gpu-select" className="font-medium text-gray-300">Thiết bị Cục bộ</label>
                                </div>
                                <select
                                    id="gpu-select"
                                    value={gpu === 'colab' ? 'auto' : gpu}
                                    onChange={(e) => setGpu(e.target.value)}
                                    disabled={gpu === 'colab'}
                                    className="bg-gray-700 border border-gray-600 text-white text-sm rounded-md focus:ring-teal-500 focus:border-teal-500 block w-1/3 p-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <option value="auto">Tự động</option>
                                    <option value="dgpu">GPU Rời (NVIDIA, AMD)</option>
                                    <option value="igpu">GPU Tích hợp (Intel, AMD)</option>
                                    <option value="cpu">CPU</option>
                                </select>
                            </div>

                            <div className={`mt-2 p-3 rounded-md border transition-all duration-300 ${gpu === 'colab' ? 'bg-teal-500/20 border-teal-500' : 'bg-gray-800/50 border-gray-700'}`}>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <CloudIcon />
                                        <div className="flex flex-col">
                                            <span className="font-medium text-gray-300">GPU trên Đám Mây</span>
                                            <span className="text-xs text-gray-400">Google Colab (Miễn phí)</span>
                                        </div>
                                    </div>
                                    <button
                                        onClick={handleColabConnect}
                                        className={`font-bold py-2 px-4 rounded text-sm transition-colors flex items-center ${gpu === 'colab' ? 'bg-red-600 hover:bg-red-700 text-white' : 'bg-sky-600 hover:bg-sky-700 text-white'}`}
                                    >
                                        {gpu === 'colab' ? 'Ngắt kết nối' : (<>Kết nối<ExternalLinkIcon /></>)}
                                    </button>
                                </div>
                                {gpu === 'colab' && (
                                    <div className="pt-2 mt-2 border-t border-teal-500/20 animate-fade-in-scale">
                                        <p className="text-xs text-teal-300">
                                            Đang hoạt động. Hãy đảm bảo notebook Colab của bạn đang chạy và đã kết nối.
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="border-t border-gray-700/50 pt-4">
                            <h4 className="font-medium text-gray-300 mb-2 flex items-center"><AiModelIcon /> Mô hình Phân tích Pose</h4>
                             <fieldset className="space-y-2">
                                <legend className="sr-only">Pose Model Selection</legend>
                                {poseModels.map(model => (
                                    <label
                                        key={model.id}
                                        htmlFor={`pose-model-${model.id}`}
                                        className={`flex items-center p-3 rounded-md border transition-colors cursor-pointer ${poseModel === model.id ? 'bg-teal-500/20 border-teal-500' : 'bg-gray-800/50 border-gray-700 hover:bg-gray-700/80'}`}
                                    >
                                        <input
                                            type="radio"
                                            id={`pose-model-${model.id}`}
                                            name="pose-model"
                                            value={model.id}
                                            checked={poseModel === model.id}
                                            onChange={(e) => setPoseModel(e.target.value)}
                                            className="h-4 w-4 text-teal-600 bg-gray-700 border-gray-600 focus:ring-2 focus:ring-teal-500"
                                        />
                                        <div className="ml-3 text-sm">
                                            <span className="font-semibold text-white">{model.label}</span>
                                            <p className="text-xs text-gray-400 mt-1">{model.description}</p>
                                        </div>
                                    </label>
                                ))}
                            </fieldset>
                             {poseModel === 'accurate' && (
                                <div className="pt-2 animate-fade-in-scale">
                                    <p className="text-xs text-teal-300">
                                        Lưu ý: Chế độ này hỗ trợ phân tích nhiều đối tượng cùng lúc.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Appearance Settings */}
                <div>
                    <h3 className="text-xl font-semibold text-white mb-4 border-l-4 border-teal-400 pl-4">Giao Diện</h3>
                    <div className="flex items-center justify-between p-4 bg-black/20 rounded-md">
                        <div className="flex items-center">
                            <ThemeIcon />
                            <span className="font-medium text-gray-300">Chế độ tối (Dark Mode)</span>
                        </div>
                        <label className="switch">
                            <input type="checkbox" checked={isDarkMode} onChange={() => setIsDarkMode(!isDarkMode)} />
                            <span className="slider"></span>
                        </label>
                    </div>
                </div>

                {/* Notification Settings */}
                <div>
                    <h3 className="text-xl font-semibold text-white mb-4 border-l-4 border-teal-400 pl-4">Thông Báo</h3>
                    <div className="space-y-2 p-4 bg-black/20 rounded-md">
                        <div className="flex items-center justify-between py-2">
                            <label htmlFor="jobComplete" className="font-medium text-gray-300">Thông báo khi xử lý video hoàn tất</label>
                            <label className="switch">
                                <input type="checkbox" id="jobComplete" name="jobComplete" checked={notifications.jobComplete} onChange={handleNotificationChange} />
                                <span className="slider"></span>
                            </label>
                        </div>
                        <div className="flex items-center justify-between py-2">
                            <label htmlFor="updates" className="font-medium text-gray-300">Thông báo về cập nhật sản phẩm</label>
                            <label className="switch">
                                <input type="checkbox" id="updates" name="updates" checked={notifications.updates} onChange={handleNotificationChange} />
                                <span className="slider"></span>
                            </label>
                        </div>
                        <div className="flex items-center justify-between py-2">
                            <label htmlFor="community" className="font-medium text-gray-300">Thông báo từ cộng đồng</label>
                            <label className="switch">
                                <input type="checkbox" id="community" name="community" checked={notifications.community} onChange={handleNotificationChange} />
                                <span className="slider"></span>
                            </label>
                        </div>
                    </div>
                </div>

                {/* Save Button */}
                <div className="flex items-center justify-end pt-4 border-t border-[var(--panel-border)]">
                     {saveStatus && (
                        <span className="text-green-400 mr-4 animate-fade-in-scale">{saveStatus}</span>
                    )}
                    <button
                        onClick={handleSave}
                        className="bg-teal-600 hover:bg-teal-500 text-white font-bold py-2 px-6 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg shadow-teal-500/20"
                    >
                        Lưu Thay Đổi
                    </button>
                </div>
            </div>
        </div>
    );
};
