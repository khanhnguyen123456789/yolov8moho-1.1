
import React, { useEffect } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  icon: JSX.Element;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, icon, children }) => {
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div 
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
    >
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose}></div>
        
        <div className="relative w-full max-w-lg bg-gray-800 border border-gray-700 rounded-lg shadow-xl text-gray-300 transform transition-all duration-300 ease-out scale-95 opacity-0 animate-fade-in-scale">
            <div className="flex items-start justify-between p-5 border-b border-gray-700 rounded-t">
                <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-gray-700/50 rounded-lg">
                        {icon}
                    </div>
                    <h3 className="text-2xl font-semibold text-white" id="modal-title">
                        {title}
                    </h3>
                </div>
                <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-600 hover:text-white rounded-lg text-sm p-1.5 ml-auto inline-flex items-center" onClick={onClose} aria-label="Close modal">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                </button>
            </div>
            
            <div className="p-6 space-y-4">
                {children}
            </div>
        </div>
    </div>
  );
};