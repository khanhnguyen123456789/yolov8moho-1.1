
import React from 'react';

interface SectionProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export const Section: React.FC<SectionProps> = ({ title, children, className = '' }) => {
  return (
    <section className={`py-12 ${className}`}>
      <div className="relative mb-8">
         <h2 className="font-orbitron text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-sky-400 text-glow">{title}</h2>
         <div className="absolute top-1/2 left-0 h-px w-full bg-gradient-to-r from-teal-500/30 via-teal-500/0 to-transparent -translate-y-1/2"></div>
      </div>
      {children}
    </section>
  );
};