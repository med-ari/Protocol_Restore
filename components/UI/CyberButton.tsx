
import React from 'react';
import { soundManager } from '../../utils/sound';

export type ButtonVariant = 'primary' | 'accent' | 'success' | 'locked';

interface CyberButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  fullWidth?: boolean;
  loading?: boolean;
}

// --- Configuration ---

const BASE_STYLES = "relative group font-sans text-sm tracking-widest uppercase font-bold py-4 px-6 transition-all duration-200 transform active:translate-y-1 active:translate-x-1 active:shadow-none border-2 overflow-hidden select-none";

const VARIANTS: Record<ButtonVariant, string> = {
  primary: "bg-cyber-primaryDim text-cyber-primary border-cyber-primary hover:bg-cyber-primary hover:text-cyber-bg shadow-[4px_4px_0px_0px_rgba(0,242,255,0.4)] hover:shadow-[6px_6px_0px_0px_rgba(0,242,255,0.6)]",
  accent: "bg-purple-900/20 text-cyber-accent border-cyber-accent hover:bg-cyber-accent hover:text-white shadow-[4px_4px_0px_0px_rgba(157,0,255,0.4)] hover:shadow-[6px_6px_0px_0px_rgba(157,0,255,0.6)]",
  success: "bg-green-900/20 text-cyber-success border-cyber-success hover:bg-cyber-success hover:text-black shadow-[4px_4px_0px_0px_rgba(0,255,157,0.4)] hover:shadow-[6px_6px_0px_0px_rgba(0,255,157,0.6)]",
  locked: "bg-gray-800 text-gray-500 border-gray-600 cursor-not-allowed shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)] active:translate-y-0 active:translate-x-0 hover:translate-x-0 hover:translate-y-0 hover:scale-100 opacity-80"
};

// --- Sub-components ---

const LoadingSpinner = () => (
  <span className="flex items-center justify-center gap-2" role="status">
    <span className="w-2 h-2 bg-current animate-bounce rounded-full"></span>
    <span className="w-2 h-2 bg-current animate-bounce delay-75 rounded-full"></span>
    <span className="w-2 h-2 bg-current animate-bounce delay-150 rounded-full"></span>
  </span>
);

const GlitchOverlay = () => (
  <div 
    className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-75 mix-blend-overlay pointer-events-none z-10"
    aria-hidden="true"
  />
);

const RetroGridOverlay = () => (
    <div className="absolute inset-0 opacity-10 pointer-events-none z-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.2)_50%,transparent_75%,transparent_100%)] bg-[length:4px_4px]" />
);

// --- Main Component ---

export const CyberButton: React.FC<CyberButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false, 
  className = '', 
  disabled,
  loading = false,
  onClick,
  ...props 
}) => {
  
  const isInteractive = !disabled && !loading;
  const computedVariant = isInteractive ? variant : 'locked';

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isInteractive) {
      soundManager.playClick();
      if (onClick) onClick(e);
    }
  };

  const handleMouseEnter = () => {
    if (isInteractive) {
      soundManager.playHover();
    }
  };

  return (
    <button 
      className={`
        ${BASE_STYLES} 
        ${VARIANTS[computedVariant]} 
        ${fullWidth ? 'w-full' : ''} 
        ${className}
      `}
      disabled={disabled || loading}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      {...props}
    >
      {/* Visual Effects (Only when interactive) */}
      {isInteractive && (
        <>
          <GlitchOverlay />
          <RetroGridOverlay />
        </>
      )}
      
      {/* Content */}
      <span className="relative z-20 flex items-center justify-center gap-2">
        {loading ? <LoadingSpinner /> : children}
      </span>
    </button>
  );
};
