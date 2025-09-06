
import React, { useState } from 'react';
import { SprintPhase } from '../types';
import { CodeBlock } from './CodeBlock';

interface FinalSprintRoadmapProps {
  phases: SprintPhase[];
}

export const FinalSprintRoadmap: React.FC<FinalSprintRoadmapProps> = ({ phases }) => {
  const [activePhaseIndex, setActivePhaseIndex] = useState(0);

  const getTabClass = (index: number) => {
    return activePhaseIndex === index
      ? 'border-b-2 border-teal-400 text-white'
      : 'border-b-2 border-transparent text-gray-500 hover:text-gray-300 hover:border-gray-600';
  };
  
  const activePhase = phases[activePhaseIndex];

  return (
    <div className="panel p-6">
      <div className="flex space-x-4 border-b border-[var(--panel-border)] mb-6">
        {phases.map((phase, index) => (
          <button
            key={phase.phase}
            onClick={() => setActivePhaseIndex(index)}
            className={`px-2 pb-3 font-semibold transition-colors duration-200 text-lg ${getTabClass(index)}`}
          >
            Giai Đoạn {phase.phase}
          </button>
        ))}
      </div>
      
      <div className="animate-fade-in-scale">
        <h3 className="font-orbitron text-2xl font-bold text-teal-400 mb-2">{activePhase.title}</h3>
        <p className="text-gray-400 mb-6">{activePhase.description}</p>
        
        <div className="space-y-6">
            {activePhase.tasks.map((task, index) => (
                <div key={index} className="bg-black/20 p-4 rounded-md border border-[var(--panel-border)]">
                    <p className="flex items-start text-gray-300">
                        <svg className="w-5 h-5 text-teal-500 mr-3 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                        {task.description}
                    </p>
                    {task.code && (
                        <div className="mt-4 pl-8">
                             <h4 className="text-md font-semibold text-white mb-2">{task.code.title}</h4>
                             <CodeBlock code={task.code.code} language={task.code.language} />
                        </div>
                    )}
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};