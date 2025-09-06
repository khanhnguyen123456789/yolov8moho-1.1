
import React from 'react';
import { RoadmapPhase } from '../types';

export const RoadmapStep: React.FC<RoadmapPhase> = ({ phase, title, description, tasks, status }) => {
  const statusStyles = {
    completed: {
      iconBg: 'bg-green-500/20 text-green-400',
      iconShadow: 'shadow-[0_0_10px] shadow-green-500/50',
      border: 'border-green-500/30',
      titleColor: 'text-green-400',
      textColor: 'text-gray-400',
      taskIconColor: 'text-green-500',
    },
    'in-progress': {
      iconBg: 'bg-teal-500/20 text-teal-400 animate-pulse',
      iconShadow: 'shadow-[0_0_15px] shadow-teal-500/60',
      border: 'border-teal-500/50',
      titleColor: 'text-teal-400',
      textColor: 'text-gray-300',
      taskIconColor: 'text-teal-500',
    },
    upcoming: {
      iconBg: 'bg-gray-700/50 text-gray-500',
      iconShadow: '',
      border: 'border-gray-700',
      titleColor: 'text-gray-500',
      textColor: 'text-gray-500',
      taskIconColor: 'text-gray-600',
    },
  };

  const currentStyle = statusStyles[status];

  return (
    <div className="ml-12 mb-8 relative">
      <div className={`absolute -left-15 w-10 h-10 ${currentStyle.iconBg} ${currentStyle.iconShadow} rounded-full flex items-center justify-center font-bold text-lg ring-4 ring-[var(--bg-dark)]`}>
        {phase}
      </div>
      <div className={`panel p-6 border ${currentStyle.border} transition-colors duration-500`}>
        <h3 className={`text-2xl font-bold ${currentStyle.titleColor} mb-2 font-orbitron`}>{title}</h3>
        <p className={`${currentStyle.textColor} mb-4`}>{description}</p>
        <ul className="space-y-2">
          {tasks.map((task, index) => (
            <li key={index} className="flex items-start">
               <svg className={`w-5 h-5 ${currentStyle.taskIconColor} mr-2 flex-shrink-0 mt-1`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              <span className={currentStyle.textColor}>{task}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};