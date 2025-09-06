import React, { useState, useMemo } from 'react';

const ControlSlider: React.FC<{
  label: string;
  value: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
}> = ({ label, value, onChange, min = 0, max = 100, step = 1, unit = '' }) => (
  <div className="w-full">
    <label className="flex justify-between items-center text-sm font-medium text-gray-300">
      <span>{label}</span>
      <span className="text-teal-400 font-semibold">{value}{unit}</span>
    </label>
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={onChange}
      className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer range-lg accent-teal-500"
    />
  </div>
);

const MotionDataChart: React.FC<{ originalData: number[]; filteredData: number[] }> = ({ originalData, filteredData }) => (
    <div className="w-full h-40 bg-gray-900/50 rounded-lg border border-gray-700 p-2 relative">
        <svg width="100%" height="100%" viewBox="0 0 200 80">
            {/* Original Data Path */}
            <path
                d={originalData.map((y, i) => `${i === 0 ? 'M' : 'L'} ${i * (200 / (originalData.length - 1))} ${y}`).join(' ')}
                stroke="#6b7280" // gray-500
                strokeWidth="1"
                fill="none"
                strokeDasharray="2 2"
            />
            {/* Filtered Data Path */}
            <path
                d={filteredData.map((y, i) => `${i === 0 ? 'M' : 'L'} ${i * (200 / (filteredData.length - 1))} ${y}`).join(' ')}
                stroke="#00FFFF"
                strokeWidth="1.5"
                fill="none"
                strokeLinejoin="round"
                strokeLinecap="round"
                style={{ transition: 'all 0.3s ease-in-out' }}
            />
        </svg>
        <div className="absolute top-2 right-2 text-xs flex flex-col items-end bg-gray-900/50 p-1 rounded">
            <div className="flex items-center">
                <span className="w-3 h-0.5 bg-cyan-400 mr-2"></span>
                <span className="text-gray-300">Đã lọc</span>
            </div>
            <div className="flex items-center mt-1">
                <div className="w-3 h-px border-t border-dashed border-gray-500 mr-2"></div>
                <span className="text-gray-400">Gốc</span>
            </div>
        </div>
    </div>
);


const TimelineEditorMockup: React.FC = () => {
    const keyframes = [10, 25, 50, 75, 90];
    return (
        <div className="w-full mt-4">
            <h5 className="text-sm font-semibold text-gray-400 mb-2">Timeline Editor</h5>
            <div className="bg-gray-900/50 rounded-lg border border-gray-700 p-3 space-y-2">
                {/* Controls */}
                <div className="flex items-center space-x-2">
                    <button className="p-1.5 bg-gray-700 hover:bg-gray-600 rounded"><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 00-1 1v4a1 1 0 001 1h4a1 1 0 000-2H9V8a1 1 0 00-1-1z" clipRule="evenodd" /></svg></button>
                    <button className="p-1.5 bg-gray-700 hover:bg-gray-600 rounded"><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" /></svg></button>
                    <div className="flex-grow"></div>
                    <button className="text-xs flex items-center p-1.5 bg-green-600/50 hover:bg-green-600 text-green-300 hover:text-white rounded"><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" /></svg> Thêm Key</button>
                    <button className="text-xs flex items-center p-1.5 bg-red-600/50 hover:bg-red-600 text-red-300 hover:text-white rounded"><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z" clipRule="evenodd" /></svg> Xóa Key</button>
                </div>
                {/* Timeline track */}
                <div className="w-full h-8 bg-gray-800 rounded relative">
                    <div className="absolute top-1/2 -translate-y-1/2 w-full h-px bg-gray-600"></div>
                    {keyframes.map(k => (
                        <div key={k} className="absolute top-1/2 -translate-y-1/2 w-2 h-4 bg-yellow-400 rounded-sm cursor-pointer hover:scale-125 transition-transform" style={{ left: `calc(${k}% - 4px)` }}></div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export const MotionFilterUI: React.FC = () => {
    const [jitterReduction, setJitterReduction] = useState(30);
    const [noiseReduction, setNoiseReduction] = useState(15);
    const [motionScale, setMotionScale] = useState(100);
    const [motionExaggeration, setMotionExaggeration] = useState(0);
    
    const originalData = useMemo(() => {
        // Generate a base sine wave with some noise
        return Array.from({ length: 51 }, (_, i) => {
            const sine = Math.sin(i * 0.2) * 20 + 40;
            const noise = (Math.random() - 0.5) * 15;
            return sine + noise;
        });
    }, []);

    const filteredData = useMemo(() => {
        const center = 40;
        
        // Apply motion scale first
        const scaled = originalData.map(y => center + (y - center) * (motionScale / 100));
        
        // Apply smoothing (jitter reduction)
        const smoothFactor = Math.floor(jitterReduction / 10) + 1;
        const smoothed = scaled.map((_, i, arr) => {
            const start = Math.max(0, i - smoothFactor);
            const end = Math.min(arr.length - 1, i + smoothFactor);
            const subset = arr.slice(start, end + 1);
            return subset.reduce((a, b) => a + b) / subset.length;
        });

        // Apply noise reduction
        const noiseReduced = smoothed.map((y, i) => {
            const originalY = scaled[i];
            const reduction = (noiseReduction / 100);
            return originalY * (1 - reduction) + y * reduction;
        });
        
        // Apply exaggeration
        const exaggerated = noiseReduced.map(y => {
            const delta = y - center;
            return center + delta * (1 + motionExaggeration / 100);
        });

        return exaggerated;

    }, [jitterReduction, noiseReduction, motionScale, motionExaggeration, originalData]);

    return (
        <div className="w-full max-w-md mx-auto">
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-gray-300">Bộ lọc Chuyển động</h4>
                <ControlSlider
                    label="Giảm Rung (Jitter Reduction)"
                    value={jitterReduction}
                    onChange={(e) => setJitterReduction(parseInt(e.target.value, 10))}
                />
                <ControlSlider
                    label="Giảm nhiễu (Noise Reduction)"
                    value={noiseReduction}
                    onChange={(e) => setNoiseReduction(parseInt(e.target.value, 10))}
                />
                <ControlSlider
                    label="Tỷ lệ Chuyển động (Scale)"
                    value={motionScale}
                    onChange={(e) => setMotionScale(parseInt(e.target.value, 10))}
                    min={50}
                    max={150}
                    unit="%"
                />
                 <ControlSlider
                    label="Phóng đại (Exaggeration)"
                    value={motionExaggeration}
                    onChange={(e) => setMotionExaggeration(parseInt(e.target.value, 10))}
                    min={0}
                    max={100}
                    unit="%"
                />
            </div>
            <div className="mt-6">
                <h5 className="text-sm font-semibold text-gray-400 mb-2">Xem trước Hiệu ứng (Gốc vs. Đã lọc):</h5>
                <MotionDataChart originalData={originalData} filteredData={filteredData} />
            </div>
            <TimelineEditorMockup />
        </div>
    );
};
