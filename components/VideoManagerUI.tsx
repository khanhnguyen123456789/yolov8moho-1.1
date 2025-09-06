import React, { useState } from 'react';

interface VideoFile {
  id: number;
  name: string;
  thumbnail: string;
  duration: string;
}

const videoLibrary: VideoFile[] = [
  { id: 1, name: 'walk_cycle_front.mp4', thumbnail: 'https://i.imgur.com/example_thumbnail_1.jpg', duration: '0:12' },
  { id: 2, name: 'jump_side_view.mp4', thumbnail: 'https://i.imgur.com/example_thumbnail_2.jpg', duration: '0:05' },
  { id: 3, name: 'long_dialogue_take.mov', thumbnail: 'https://i.imgur.com/example_thumbnail_3.jpg', duration: '1:32' },
];

const ControlSlider: React.FC<{
  label: string;
  value: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
}> = ({ label, value, onChange, min = 0, max = 100, step = 1, unit = '' }) => (
  <div>
    <label className="text-sm font-medium text-gray-300">{label}</label>
    <div className="flex items-center gap-2">
      <input type="range" min={min} max={max} step={step} value={value} onChange={onChange} className="w-full h-1.5 bg-gray-600 rounded-lg appearance-none cursor-pointer accent-teal-500" />
      <span className="text-xs font-mono text-gray-400 w-12 text-right">{value}{unit}</span>
    </div>
  </div>
);


export const VideoManagerUI: React.FC = () => {
  const [selectedVideo, setSelectedVideo] = useState<VideoFile>(videoLibrary[0]);
  const [brightness, setBrightness] = useState(50);
  const [speed, setSpeed] = useState(100);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Video Library */}
      <div className="md:col-span-1 bg-gray-800/50 p-3 rounded-lg border border-gray-700">
        <h4 className="font-semibold text-white mb-3 px-1">Thư viện Video</h4>
        <div className="space-y-2 max-h-96 overflow-y-auto">
          {videoLibrary.map(video => (
            <div
              key={video.id}
              onClick={() => setSelectedVideo(video)}
              className={`p-2 rounded-md cursor-pointer flex items-center gap-3 transition-colors ${selectedVideo.id === video.id ? 'bg-teal-500/20' : 'hover:bg-gray-700/70'}`}
            >
              <div className="w-16 h-10 bg-gray-700 rounded flex-shrink-0 bg-cover bg-center" style={{backgroundImage: `url(${video.thumbnail})`}}></div>
              <div>
                <p className="text-sm font-medium text-gray-300 truncate">{video.name}</p>
                <p className="text-xs text-gray-500">{video.duration}</p>
              </div>
            </div>
          ))}
           <button className="w-full mt-2 bg-gray-700 hover:bg-gray-600 text-gray-300 text-sm font-semibold py-2 rounded-md transition-colors">
                + Tải lên Video
            </button>
        </div>
      </div>

      {/* Video Preview and Controls */}
      <div className="md:col-span-2 space-y-4">
        <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden border border-gray-700">
            <div className="w-full h-full bg-cover bg-center flex items-center justify-center" style={{backgroundImage: `url(${selectedVideo.thumbnail})`, filter: `brightness(${brightness / 50})`}}>
                <button className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-white backdrop-blur-sm hover:bg-white/30 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" /></svg>
                </button>
            </div>
             <div className="absolute bottom-2 left-2 right-2 px-2">
                <div className="w-full h-1.5 bg-white/30 rounded-full">
                    <div className="w-1/2 h-full bg-teal-400 rounded-full relative">
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full"></div>
                    </div>
                </div>
            </div>
        </div>

        <div className="panel p-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <ControlSlider label="Độ sáng" value={brightness} onChange={(e) => setBrightness(parseInt(e.target.value))} />
            <ControlSlider label="Tốc độ" value={speed} min={50} max={200} onChange={(e) => setSpeed(parseInt(e.target.value))} unit="%" />
             <div className="sm:col-span-2 flex justify-end gap-3 pt-2">
                <button className="bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-lg text-sm transition-colors">Cắt Video</button>
                <button className="bg-teal-600 hover:bg-teal-500 text-white font-bold py-2 px-4 rounded-lg text-sm transition-colors">Bắt đầu Phân tích</button>
            </div>
        </div>
      </div>
    </div>
  );
};