
import React from 'react';
import { TechStackItem } from '../types';

interface IconCardProps extends TechStackItem {
  onClick: (item: TechStackItem) => void;
}

export const IconCard: React.FC<IconCardProps> = ({ name, icon, description, onClick }) => {
  const item = { name, icon, description };
  return (
    <button
      onClick={() => onClick(item)}
      className="panel p-4 flex items-start space-x-4 hover:border-teal-400 transition-all duration-300 w-full text-left"
      aria-label={`Learn more about ${name}`}
    >
      <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-gray-900/50 rounded-lg border border-gray-700">
        {icon}
      </div>
      <div>
        <h4 className="font-bold text-lg text-white">{name}</h4>
        <p className="text-sm text-gray-400">{description}</p>
      </div>
    </button>
  );
};