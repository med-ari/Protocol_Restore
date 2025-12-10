
import React from 'react';

interface CyberCardProps {
  children?: React.ReactNode;
  className?: string;
  title?: string;
  loading?: boolean;
}

export const CyberCard: React.FC<CyberCardProps> = ({ children, className = '', title, loading = false }) => {
  return (
    <div className={`relative bg-cyber-panel border-2 border-cyber-primary/50 p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,0.6)] bg-dither ${className}`}>
      
      {/* Loading Skeleton Mode */}
      {loading ? (
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-cyber-primary/20 w-3/4 rounded mb-6"></div>
          <div className="h-4 bg-gray-700 rounded w-full"></div>
          <div className="h-4 bg-gray-700 rounded w-5/6"></div>
          <div className="h-4 bg-gray-700 rounded w-4/6"></div>
        </div>
      ) : (
        <>
          {/* Decorative Pixel Header Line */}
          {title && (
            <div className="mb-6 border-b-2 border-cyber-primary/30 pb-2 flex justify-between items-end">
              <h3 className="text-cyber-primary font-sans text-xl tracking-wider uppercase drop-shadow-[2px_2px_0px_rgba(0,0,0,0.8)] text-glow">
                {title}
              </h3>
              <div className="flex space-x-1">
                 <div className="w-2 h-2 bg-cyber-accent animate-pulse" />
                 <div className="w-2 h-2 bg-cyber-primary opacity-50" />
                 <div className="w-2 h-2 bg-cyber-primary opacity-20" />
              </div>
            </div>
          )}
          
          <div className="text-cyber-text font-mono text-lg leading-relaxed">
            {children}
          </div>
        </>
      )}
      
      {/* Pixel Art Corner Accents */}
      <div className="absolute top-0 left-0 w-2 h-2 bg-cyber-primary" />
      <div className="absolute top-0 right-0 w-2 h-2 bg-cyber-primary" />
      <div className="absolute bottom-0 left-0 w-2 h-2 bg-cyber-primary" />
      <div className="absolute bottom-0 right-0 w-2 h-2 bg-cyber-primary" />
      
      {/* Inner Border Illusion */}
      <div className="absolute inset-1 border border-cyber-primary/10 pointer-events-none" />
    </div>
  );
};