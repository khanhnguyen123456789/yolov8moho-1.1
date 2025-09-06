
import React, { useState, useEffect } from 'react';

type RecoveryState = 'working' | 'saving' | 'crashed' | 'restarting' | 'prompt' | 'restored';

interface StateConfig {
  icon: JSX.Element;
  title: string;
  description: string;
  color: string;
}

const stateDetails: Record<RecoveryState, StateConfig> = {
  working: {
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L15.232 5.232z" /></svg>,
    title: 'Đang làm việc...',
    description: 'Người dùng đang chỉnh sửa dự án. Tự động lưu tiếp theo sau:',
    color: 'text-sky-400',
  },
  saving: {
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h5M20 20v-5h-5" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 12a8 8 0 018-8v0a8 8 0 018 8v0a8 8 0 01-8 8v0a8 8 0 01-8-8v0z" /></svg>,
    title: 'Đang tự động lưu...',
    description: 'Trạng thái hiện tại đang được lưu vào tệp session.autosave.',
    color: 'text-teal-400',
  },
  crashed: {
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>,
    title: 'SỰ CỐ!',
    description: 'Moho bị đóng đột ngột. Tệp autosave vẫn được bảo toàn.',
    color: 'text-red-500',
  },
  restarting: {
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h5M20 20v-5h-5" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 12a8 8 0 018-8v0a8 8 0 018 8v0a8 8 0 01-8 8v0a8 8 0 01-8-8v0z" /></svg>,
    title: 'Đang khởi động lại...',
    description: 'Plugin đang được tải lại và sẽ kiểm tra tệp phục hồi.',
    color: 'text-gray-400',
  },
  prompt: {
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
    title: 'Phát hiện phiên chưa lưu',
    description: 'Plugin đã tìm thấy một tệp autosave từ phiên làm việc trước.',
    color: 'text-yellow-400',
  },
  restored: {
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
    title: 'Đã khôi phục thành công!',
    description: 'Công việc của bạn đã trở lại. Tệp autosave đã được xóa.',
    color: 'text-green-400',
  },
};

const stateCycle: RecoveryState[] = ['working', 'saving', 'crashed', 'restarting', 'prompt', 'restored'];
const AUTOSAVE_INTERVAL = 5; // seconds for simulation

export const SessionRecoveryUI: React.FC = () => {
  const [currentState, setCurrentState] = useState<RecoveryState>('working');
  const [countdown, setCountdown] = useState(AUTOSAVE_INTERVAL);
  const [autosaveFileExists, setAutosaveFileExists] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    // Handle countdown for 'working' state
    if (currentState === 'working' && countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
    
    // If countdown finishes, move to 'saving'
    if (currentState === 'working' && countdown === 0) {
      setCurrentState('saving');
      return;
    }

    // Stop the automatic cycle at the 'prompt' state, waiting for user input
    if (currentState === 'prompt') {
      return; 
    }

    // Logic for advancing to the next state automatically for all other states
    const nextStateIndex = (stateCycle.indexOf(currentState) + 1) % stateCycle.length;
    const nextState = stateCycle[nextStateIndex];
    let delay = 2500;

    if (currentState === 'saving') {
      setAutosaveFileExists(true);
      delay = 1500;
    }
    
    if (currentState === 'restored') {
      setAutosaveFileExists(false);
    }

    timer = setTimeout(() => {
      setCurrentState(nextState);
      if (nextState === 'working') {
        setCountdown(AUTOSAVE_INTERVAL);
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [currentState, countdown]);

  const handleRestore = () => {
    setCurrentState('restored');
  };

  const handleDiscard = () => {
    setAutosaveFileExists(false); // Clean up the file
    setCurrentState('working'); // Go back to working
    setCountdown(AUTOSAVE_INTERVAL); // Reset countdown
  };

  const config = stateDetails[currentState];

  return (
    <div className="w-full max-w-lg mx-auto">
      <div className="bg-gray-900/50 p-6 rounded-lg border border-gray-700 space-y-4">
        <div className="flex items-center space-x-3">
          <div className={config.color}>{config.icon}</div>
          <h4 className={`text-lg font-bold ${config.color}`}>{config.title}</h4>
        </div>
        <p className="text-sm text-gray-400 h-12">
          {config.description}
          {currentState === 'working' && <span className="font-bold text-teal-400 ml-1">{countdown}s</span>}
        </p>

        {currentState === 'prompt' && (
          <div className="bg-gray-800/50 p-4 rounded-md border border-gray-600 animate-fade-in-scale">
            <p className="text-center text-white font-semibold mb-3">Bạn có muốn khôi phục không?</p>
            <div className="flex justify-center space-x-4">
              <button onClick={handleRestore} className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-6 rounded text-sm transition-colors">Có</button>
              <button onClick={handleDiscard} className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-6 rounded text-sm transition-colors">Không</button>
            </div>
          </div>
        )}
        
        <div className="pt-4 border-t border-gray-700/80">
            <h5 className="text-sm font-semibold text-gray-400 mb-2">Trạng thái Tệp Tạm thời</h5>
            <div className={`p-2 rounded-md flex items-center transition-all duration-500 ${autosaveFileExists ? 'bg-green-500/20' : 'bg-gray-700/30'}`}>
                <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 mr-2 ${autosaveFileExists ? 'text-green-400' : 'text-gray-500'}`} viewBox="0 0 20 20" fill="currentColor"><path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" /></svg>
                <span className="font-mono text-sm text-gray-300">/temp/session.autosave</span>
                <span className={`ml-auto text-xs font-bold ${autosaveFileExists ? 'text-green-400' : 'text-gray-500'}`}>
                    {autosaveFileExists ? 'TỒN TẠI' : 'KHÔNG TỒN TẠI'}
                </span>
            </div>
        </div>

      </div>
    </div>
  );
};