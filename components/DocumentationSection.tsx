import React, { useState } from 'react';
import { DocumentationArticle, DocStep } from '../types';

interface DocumentationSectionProps {
  articles: DocumentationArticle[];
}

const DocStepView: React.FC<{ step: DocStep, index: number }> = ({ step, index }) => (
    <div className="flex items-start">
        <div className="flex-shrink-0 w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center font-bold text-lg text-teal-400 border-2 border-gray-700 mr-4">
            {index + 1}
        </div>
        <div>
            <h4 className="font-bold text-lg text-white mb-1">{step.title}</h4>
            <p className="text-gray-400">{step.content}</p>
        </div>
    </div>
);


export const DocumentationSection: React.FC<DocumentationSectionProps> = ({ articles }) => {
  const [activeTabId, setActiveTabId] = useState<string>(articles[0].id);

  const getTabClass = (articleId: string) => {
    return activeTabId === articleId
      ? 'border-b-2 border-teal-400 text-white'
      : 'border-b-2 border-transparent text-gray-500 hover:text-gray-300 hover:border-gray-600';
  };
  
  const activeArticle = articles.find(a => a.id === activeTabId);

  return (
    <div className="panel p-0 overflow-hidden">
      <div className="flex space-x-1 border-b border-[var(--panel-border)] bg-gray-900/30 px-6 overflow-x-auto">
        {articles.map((article) => (
          <button
            key={article.id}
            onClick={() => setActiveTabId(article.id)}
            className={`flex items-center px-2 py-4 font-semibold transition-colors duration-200 text-md flex-shrink-0 ${getTabClass(article.id)}`}
          >
            <span className="mr-2">{article.icon}</span>
            <span>{article.title}</span>
          </button>
        ))}
      </div>
      
      {activeArticle && (
        <div className="p-6 animate-fade-in-scale">
            <p className="text-gray-300 mb-8 max-w-4xl">{activeArticle.description}</p>
            
            {activeArticle.steps && (
              <div className="space-y-6">
                  {activeArticle.steps.map((step, index) => (
                      <DocStepView key={index} step={step} index={index} />
                  ))}
              </div>
            )}

            {activeArticle.interactiveComponent && (
                <div className={`${activeArticle.steps ? 'mt-6 border-t' : ''} -mx-6 -mb-6 p-6 bg-gray-900/50 border-[var(--panel-border)]`}>
                    <activeArticle.interactiveComponent />
                </div>
            )}
        </div>
      )}
    </div>
  );
};