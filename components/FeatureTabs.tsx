
import React, { useState } from 'react';
import { FeatureDetail } from '../types';
import { CodeBlock } from './CodeBlock';

interface FeatureTabsProps {
  androidFeatures: FeatureDetail[];
  mohoPluginFeatures: FeatureDetail[];
}

const FeatureList: React.FC<{ features: FeatureDetail[] }> = ({ features }) => (
  <div className="space-y-8">
    {features.map((feature, index) => (
      <div key={index} className="panel p-6">
        <h3 className="font-orbitron text-xl font-bold text-teal-400 mb-3">{feature.title}</h3>
        <p className="text-gray-400 mb-4">{feature.description}</p>
        {feature.subItems && (
          <ul className="space-y-2 pl-4">
            {feature.subItems.map((item, i) => (
              <li key={i} className="flex items-start">
                <svg className="w-4 h-4 text-teal-500 mr-3 flex-shrink-0 mt-1.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
                {item}
              </li>
            ))}
          </ul>
        )}
        {feature.diagram && (
            <div className="mt-6 p-4 bg-gray-900/50 rounded-md border border-gray-700">
                <feature.diagram />
            </div>
        )}
        {feature.interactiveComponent && (
            <div className="mt-6 p-6 bg-gray-900/50 rounded-md border border-gray-700 flex flex-col items-center justify-center">
                <h4 className="text-lg font-semibold text-gray-300 mb-4 self-start">Minh họa Giao diện Tương tác</h4>
                <feature.interactiveComponent />
            </div>
        )}
        {feature.codeExample && (
            <div className="mt-6">
                <h4 className="text-xl font-semibold text-white mb-4">{feature.codeExample.title}</h4>
                <CodeBlock code={feature.codeExample.code} language={feature.codeExample.language} />
            </div>
        )}
      </div>
    ))}
  </div>
);

export const FeatureTabs: React.FC<FeatureTabsProps> = ({ androidFeatures, mohoPluginFeatures }) => {
  const [activeTab, setActiveTab] = useState<'android' | 'moho'>('moho');

  const getTabClass = (tabName: 'android' | 'moho') => {
    return activeTab === tabName
      ? 'border-b-2 border-teal-400 text-white text-glow'
      : 'border-b-2 border-transparent text-gray-500 hover:text-gray-300 hover:border-gray-600';
  };

  return (
    <div>
      <div className="flex space-x-4 border-b border-gray-800 mb-6">
        <button
          onClick={() => setActiveTab('moho')}
          className={`flex items-center px-2 pb-3 font-semibold transition-colors duration-200 text-lg ${getTabClass('moho')}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
          Plugin Moho: "Trạm Chỉ Huy Hoạt Hình"
        </button>
        <button
          onClick={() => setActiveTab('android')}
          className={`flex items-center px-2 pb-3 font-semibold transition-colors duration-200 text-lg ${getTabClass('android')}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
          Ứng Dụng Android: "Bộ Não" Thu Thập
        </button>
      </div>
      <div>
        {activeTab === 'android' && <FeatureList features={androidFeatures} />}
        {activeTab === 'moho' && <FeatureList features={mohoPluginFeatures} />}
      </div>
    </div>
  );
};