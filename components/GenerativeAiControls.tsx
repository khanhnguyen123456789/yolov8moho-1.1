import React, { useState } from 'react';

export type SuggestionAction = 'increase_amplitude' | 'decrease_amplitude' | 'shorten_timing' | 'lengthen_timing' | 'add_anticipation';

export interface Suggestion {
    label: string;
    action: SuggestionAction;
}

interface GenerativeAiControlsProps {
    onSuggestionApply: (suggestion: Suggestion) => void;
}

const AiIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
);

const getMockSuggestions = (prompt: string): Suggestion[] => {
    const p = prompt.toLowerCase();
    if (p.includes('sad') || p.includes('heavy') || p.includes('slow')) {
        return [
            { label: 'Giảm Biên độ', action: 'decrease_amplitude' },
            { label: 'Kéo dài Thời gian', action: 'lengthen_timing' },
        ];
    }
    if (p.includes('happy') || p.includes('energetic') || p.includes('fast') || p.includes('quick') || p.includes('powerful')) {
        return [
            { label: 'Tăng Biên độ', action: 'increase_amplitude' },
            { label: 'Rút ngắn Thời gian', action: 'shorten_timing' },
        ];
    }
     if (p.includes('jump') || p.includes('bounce')) {
        return [
            { label: 'Thêm Lấy đà', action: 'add_anticipation' },
            { label: 'Tăng Biên độ', action: 'increase_amplitude' },
            { label: 'Rút ngắn Thời gian', action: 'shorten_timing' },
        ];
    }
    // Default suggestions
    return [
        { label: 'Tăng Biên độ', action: 'increase_amplitude' },
        { label: 'Rút ngắn Thời gian', action: 'shorten_timing' },
    ];
};

export const GenerativeAiControls: React.FC<GenerativeAiControlsProps> = ({ onSuggestionApply }) => {
    const [prompt, setPrompt] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [suggestions, setSuggestions] = useState<Suggestion[]>([]);

    const handleGenerate = () => {
        setIsLoading(true);
        setSuggestions([]);
        setTimeout(() => {
            setSuggestions(getMockSuggestions(prompt));
            setIsLoading(false);
        }, 1500);
    };

    return (
        <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-300 flex items-center">
                <AiIcon />
                Tinh chỉnh bằng AI Tạo sinh
            </h4>
            <div className="relative">
                <input
                    type="text"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="e.g., 'a sad, heavy walk' or 'energetic jump'"
                    className="w-full bg-gray-800 border border-gray-600 text-white placeholder-gray-500 text-sm rounded-md focus:ring-teal-500 focus:border-teal-500 block p-2.5 pr-32"
                    disabled={isLoading}
                />
                <button
                    onClick={handleGenerate}
                    disabled={isLoading || !prompt}
                    className="absolute top-1/2 right-1.5 -translate-y-1/2 bg-teal-600 hover:bg-teal-500 text-white font-bold py-1.5 px-3 rounded text-sm transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed"
                >
                    {isLoading ? 'Đang nghĩ...' : 'Tạo Gợi ý'}
                </button>
            </div>
            {(isLoading || suggestions.length > 0) && (
                <div className="p-2 bg-gray-900/50 rounded-md border border-gray-700">
                    <h5 className="text-sm font-semibold text-gray-400 mb-2">Gợi ý từ AI:</h5>
                    {isLoading ? (
                         <div className="flex items-center justify-center p-2">
                             <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            <span className="text-gray-400">Đang phân tích...</span>
                         </div>
                    ) : (
                        <div className="flex flex-wrap gap-2 animate-fade-in-scale">
                            {suggestions.map((s, i) => (
                                <button
                                    key={i}
                                    onClick={() => onSuggestionApply(s)}
                                    className="bg-gray-700 hover:bg-teal-700 text-gray-300 hover:text-white font-semibold py-1 px-3 rounded-full text-xs transition-colors border border-gray-600 hover:border-teal-500"
                                >
                                    {s.label}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};