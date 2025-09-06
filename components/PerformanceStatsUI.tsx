import React, { useState, useEffect } from 'react';

// Helper function for random number generation
const randomBetween = (min: number, max: number) => Math.random() * (max - min) + min;

// A single stat display component
const StatDisplay: React.FC<{ label: string; value: string; unit: string; }> = ({ label, value, unit }) => (
    <div className="text-center p-2">
        <div className="font-orbitron text-3xl font-bold text-teal-300 text-glow">{value}</div>
        <div className="text-sm text-gray-400">{label} <span className="text-gray-500">({unit})</span></div>
    </div>
);

// A progress bar for resource usage
const ResourceBar: React.FC<{ label: string; percentage: number; color: string; }> = ({ label, percentage, color }) => (
    <div>
        <div className="flex justify-between items-center mb-1">
            <span className="text-sm font-semibold text-gray-300">{label}</span>
            <span className="text-sm font-bold text-white">{percentage.toFixed(0)}%</span>
        </div>
        <div className="w-full bg-gray-700/50 rounded-full h-2.5 overflow-hidden">
            <div
                className={`h-2.5 rounded-full transition-all duration-300 ease-out ${color}`}
                style={{ width: `${percentage}%` }}
            ></div>
        </div>
    </div>
);


export const PerformanceStatsUI: React.FC = () => {
    const [stats, setStats] = useState({
        fps: 0,
        latency: 0,
        avgConfidence: 0,
        cpuUsage: 0,
        gpuUsage: 0,
        memUsage: 0,
    });

    useEffect(() => {
        const interval = setInterval(() => {
            setStats({
                fps: randomBetween(28, 32),
                latency: randomBetween(15, 40),
                avgConfidence: randomBetween(85, 98),
                cpuUsage: randomBetween(40, 60),
                gpuUsage: randomBetween(75, 95),
                memUsage: randomBetween(50, 70),
            });
        }, 1000);

        // Set initial state
        setStats({
                fps: randomBetween(28, 32),
                latency: randomBetween(15, 40),
                avgConfidence: randomBetween(85, 98),
                cpuUsage: randomBetween(40, 60),
                gpuUsage: randomBetween(75, 95),
                memUsage: randomBetween(50, 70),
        });


        return () => clearInterval(interval);
    }, []);

    return (
        <div className="w-full max-w-md mx-auto">
            <div className="bg-gray-900/50 p-6 rounded-lg border border-gray-700 space-y-6">
                <div className="flex items-center space-x-2">
                    <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                    </span>
                    <h4 className="text-lg font-semibold text-gray-300">Bảng Thống Kê Hiệu Suất (Thời gian thực)</h4>
                </div>

                <div className="grid grid-cols-3 divide-x divide-gray-700/50 border-b border-t border-gray-700/50">
                    <StatDisplay label="AI FPS" value={stats.fps.toFixed(1)} unit="fps" />
                    <StatDisplay label="Độ trễ" value={stats.latency.toFixed(0)} unit="ms" />
                    <StatDisplay label="Độ tin cậy TB" value={stats.avgConfidence.toFixed(0)} unit="%" />
                </div>
                
                <div className="space-y-4">
                    <ResourceBar label="Tải CPU" percentage={stats.cpuUsage} color="bg-sky-500" />
                    <ResourceBar label="Tải GPU" percentage={stats.gpuUsage} color="bg-green-500" />
                    <ResourceBar label="Sử dụng RAM" percentage={stats.memUsage} color="bg-purple-500" />
                </div>
            </div>
        </div>
    );
};