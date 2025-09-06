
import React from 'react';
import { ReleaseChecklistItem as ReleaseChecklistItemType } from '../types';

interface ChecklistItemProps {
  text: string;
  status: 'completed' | 'in-progress' | 'upcoming';
}

const statusConfig = {
  completed: {
    icon: (
      <svg className="w-6 h-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    textColor: 'text-gray-400 line-through',
  },
  'in-progress': {
    icon: (
      <svg className="w-6 h-6 text-teal-500 animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h5M20 20v-5h-5" /><path d="M4 12a8 8 0 018-8v0a8 8 0 018 8v0a8 8 0 01-8 8v0a8 8 0 01-8-8v0z" />
      </svg>
    ),
    textColor: 'text-white font-semibold',
  },
  upcoming: {
    icon: (
       <svg className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    textColor: 'text-gray-500',
  },
};

const ChecklistItem: React.FC<ChecklistItemProps> = ({ text, status }) => {
  const config = statusConfig[status];
  return (
    <li className="flex items-center space-x-4 py-3">
      <div className="flex-shrink-0">{config.icon}</div>
      <span className={`flex-grow ${config.textColor}`}>{text}</span>
    </li>
  );
};

interface ReleaseChecklistProps {
    items: ReleaseChecklistItemType[];
}

export const ReleaseChecklist: React.FC<ReleaseChecklistProps> = ({ items }) => {
  return (
    <div className="panel p-6">
      <ul className="divide-y divide-gray-700/80">
        {items.map((item, index) => (
          <ChecklistItem key={index} text={item.text} status={item.status} />
        ))}
      </ul>
    </div>
  );
};