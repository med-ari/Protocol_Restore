
import React from 'react';

export type PixelSymbolVariant = 
  'database' | 'thermometer' | 'fraction' | 'shield' | 'reactor' | 'square' | 
  'volume-on' | 'volume-off' | 'lock' | 'check' | 'chevron-right' | 'chevron-down' | 
  'chevron-up' | 'chevron-left' | 'trash' | 'undo' | 'arrow-up' | 'arrow-down' | 'arrow-right' | 
  'brain' | 'star' | 'info' | 'alert' | 'download' | 'home' | 'bot' | 'message' | 'terminal' | 
  'refresh' | 'x' | 'file' | 'file-code' | 'file-text' | 'zap' | 'target';

interface PixelSymbolProps {
  variant: PixelSymbolVariant;
  className?: string;
  size?: number;
}

export const PixelSymbol: React.FC<PixelSymbolProps> = ({ variant, className = "", size = 48 }) => {
  const colorClass = className.includes('text-') ? '' : 'text-cyber-primary'; 

  const paths: Record<PixelSymbolVariant, React.ReactNode> = {
    database: (
      <>
        <path d="M4,6 L20,6 L20,10 L4,10 Z" fill="currentColor" />
        <rect x="4" y="5" width="16" height="2" fillOpacity="0.5" />
        <path d="M4,12 L20,12 L20,16 L4,16 Z" fill="currentColor" opacity="0.8" />
        <path d="M4,18 L20,18 L20,22 L4,22 Z" fill="currentColor" opacity="0.6" />
        <rect x="6" y="7" width="2" height="2" fill="black" />
        <rect x="6" y="13" width="2" height="2" fill="black" />
        <rect x="6" y="19" width="2" height="2" fill="black" />
      </>
    ),
    thermometer: (
      <>
        <rect x="10" y="2" width="4" height="14" fill="currentColor" opacity="0.5" />
        <rect x="11" y="4" width="2" height="10" fill="currentColor" />
        <rect x="8" y="15" width="8" height="8" rx="1" fill="currentColor" />
        <rect x="10" y="17" width="4" height="4" fill="black" opacity="0.5" />
      </>
    ),
    fraction: (
      <>
        <rect x="4" y="4" width="6" height="6" fill="currentColor" />
        <rect x="4" y="12" width="16" height="2" fill="currentColor" />
        <rect x="14" y="16" width="6" height="6" fill="currentColor" opacity="0.8" />
      </>
    ),
    shield: (
      <>
        <path d="M4,4 L20,4 L20,14 L12,22 L4,14 Z" fill="currentColor" opacity="0.2" />
        <path d="M6,6 L18,6 L18,13 L12,19 L6,13 Z" fill="none" stroke="currentColor" strokeWidth="2" />
        <rect x="11" y="8" width="2" height="6" fill="currentColor" />
      </>
    ),
    reactor: (
      <>
         <circle cx="12" cy="12" r="4" fill="currentColor" />
         <path d="M12,2 L12,6 M12,18 L12,22 M2,12 L6,12 M18,12 L22,12" stroke="currentColor" strokeWidth="2" />
         <circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
      </>
    ),
    square: (
      <>
        <rect x="4" y="4" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" />
        <rect x="4" y="4" width="4" height="4" fill="currentColor" />
        <rect x="16" y="16" width="4" height="4" fill="currentColor" />
        <rect x="16" y="4" width="4" height="4" fill="currentColor" opacity="0.5" />
        <rect x="4" y="16" width="4" height="4" fill="currentColor" opacity="0.5" />
      </>
    ),
    'volume-on': (
      <>
        <path d="M2,9 L6,9 L11,4 L11,20 L6,15 L2,15 Z" fill="currentColor" />
        <rect x="14" y="9" width="2" height="6" fill="currentColor" />
        <rect x="17" y="7" width="2" height="10" fill="currentColor" />
        <rect x="20" y="5" width="2" height="14" fill="currentColor" />
      </>
    ),
    'volume-off': (
      <>
        <path d="M2,9 L6,9 L11,4 L11,20 L6,15 L2,15 Z" fill="currentColor" opacity="0.5" />
        <path d="M15,10 L19,14 M19,10 L15,14" stroke="currentColor" strokeWidth="2" />
      </>
    ),
    lock: (
      <>
        <rect x="6" y="10" width="12" height="10" fill="currentColor" />
        <path d="M8,10 L8,6 C8,4 10,2 12,2 C14,2 16,4 16,6 L16,10" stroke="currentColor" strokeWidth="2" fill="none" />
        <circle cx="12" cy="15" r="1.5" fill="black" />
      </>
    ),
    check: (
      <path d="M4,12 L9,17 L20,6" stroke="currentColor" strokeWidth="3" fill="none" />
    ),
    'chevron-right': (
      <path d="M8,4 L16,12 L8,20" stroke="currentColor" strokeWidth="3" fill="none" />
    ),
    'chevron-left': (
      <path d="M16,4 L8,12 L16,20" stroke="currentColor" strokeWidth="3" fill="none" />
    ),
    'chevron-down': (
      <path d="M4,8 L12,16 L20,8" stroke="currentColor" strokeWidth="3" fill="none" />
    ),
    'chevron-up': (
      <path d="M4,16 L12,8 L20,16" stroke="currentColor" strokeWidth="3" fill="none" />
    ),
    trash: (
      <>
        <path d="M4,6 L20,6 L18,20 L6,20 Z" fill="currentColor" opacity="0.8" />
        <rect x="8" y="2" width="8" height="2" fill="currentColor" />
        <line x1="10" y1="10" x2="10" y2="16" stroke="black" strokeWidth="1" />
        <line x1="14" y1="10" x2="14" y2="16" stroke="black" strokeWidth="1" />
      </>
    ),
    undo: (
       <path d="M4,10 L4,6 L20,6 L20,14 L12,14 L12,18 L22,18 L22,4 L2,4 L2,10 L6,10" fill="currentColor" />
    ),
    'arrow-up': (
       <path d="M12,4 L4,12 L20,12 Z M10,12 L10,20 L14,20 L14,12" fill="currentColor" />
    ),
    'arrow-down': (
       <path d="M12,20 L4,12 L20,12 Z M10,12 L10,4 L14,4 L14,12" fill="currentColor" />
    ),
    'arrow-right': (
       <path d="M20,12 L12,4 L12,20 Z M12,10 L4,10 L4,14 L12,14" fill="currentColor" />
    ),
    brain: (
       <>
         <rect x="6" y="8" width="12" height="10" rx="2" fill="currentColor" opacity="0.5" />
         <path d="M4,12 L2,12 M22,12 L20,12 M12,2 L12,4 M12,20 L12,22" stroke="currentColor" strokeWidth="2" />
         <rect x="8" y="10" width="2" height="2" fill="black" />
         <rect x="14" y="10" width="2" height="2" fill="black" />
         <rect x="11" y="14" width="2" height="2" fill="black" />
       </>
    ),
    star: (
        <path d="M12,2 L15,8 L22,9 L17,14 L18,21 L12,17 L6,21 L7,14 L2,9 L9,8 Z" fill="currentColor" />
    ),
    info: (
       <>
         <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
         <rect x="11" y="10" width="2" height="8" fill="currentColor" />
         <rect x="11" y="6" width="2" height="2" fill="currentColor" />
       </>
    ),
    alert: (
        <path d="M12,2 L22,20 L2,20 Z" stroke="currentColor" strokeWidth="2" fill="none" />
    ),
    download: (
        <>
            <path d="M12,4 L12,16" stroke="currentColor" strokeWidth="2" />
            <path d="M6,10 L12,16 L18,10" stroke="currentColor" strokeWidth="2" fill="none" />
            <rect x="4" y="18" width="16" height="2" fill="currentColor" />
        </>
    ),
    home: (
        <>
            <path d="M12,2 L2,10 L22,10 Z" fill="currentColor" />
            <rect x="4" y="10" width="16" height="12" fill="none" stroke="currentColor" strokeWidth="2" />
            <rect x="10" y="14" width="4" height="8" fill="currentColor" opacity="0.5" />
        </>
    ),
    bot: (
        <>
            <rect x="4" y="8" width="16" height="12" rx="2" fill="none" stroke="currentColor" strokeWidth="2" />
            <path d="M2,12 L4,12 M20,12 L22,12" stroke="currentColor" strokeWidth="2" />
            <rect x="8" y="4" width="2" height="4" fill="currentColor" />
            <rect x="14" y="4" width="2" height="4" fill="currentColor" />
            <rect x="7" y="12" width="4" height="2" fill="currentColor" />
            <rect x="13" y="12" width="4" height="2" fill="currentColor" />
        </>
    ),
    message: (
        <>
            <path d="M2,4 L22,4 L22,16 L12,16 L8,20 L8,16 L2,16 Z" fill="none" stroke="currentColor" strokeWidth="2" />
            <rect x="6" y="8" width="12" height="2" fill="currentColor" />
            <rect x="6" y="12" width="8" height="2" fill="currentColor" />
        </>
    ),
    terminal: (
        <>
            <rect x="2" y="4" width="20" height="16" fill="none" stroke="currentColor" strokeWidth="2" />
            <path d="M6,8 L10,12 L6,16" stroke="currentColor" strokeWidth="2" fill="none" />
            <rect x="12" y="14" width="6" height="2" fill="currentColor" />
        </>
    ),
    refresh: (
        <>
            <path d="M20,10 C20,5.58 16.42,2 12,2 C7.58,2 4,5.58 4,10" stroke="currentColor" strokeWidth="2" fill="none" />
            <path d="M4,14 C4,18.42 7.58,22 12,22 C16.42,22 20,18.42 20,14" stroke="currentColor" strokeWidth="2" fill="none" />
            <path d="M20,6 L20,10 L16,10" stroke="currentColor" strokeWidth="2" fill="none" />
            <path d="M4,18 L4,14 L8,14" stroke="currentColor" strokeWidth="2" fill="none" />
        </>
    ),
    x: (
        <path d="M4,4 L20,20 M20,4 L4,20" stroke="currentColor" strokeWidth="3" fill="none" />
    ),
    file: (
        <>
            <path d="M6,2 L14,2 L18,6 L18,22 L6,22 Z" fill="none" stroke="currentColor" strokeWidth="2" />
            <path d="M14,2 L14,6 L18,6" stroke="currentColor" strokeWidth="2" fill="none" />
        </>
    ),
    'file-code': (
        <>
            <path d="M6,2 L14,2 L18,6 L18,22 L6,22 Z" fill="none" stroke="currentColor" strokeWidth="2" />
            <path d="M14,2 L14,6 L18,6" stroke="currentColor" strokeWidth="2" fill="none" />
            <path d="M10,12 L8,14 L10,16 M14,12 L16,14 L14,16" stroke="currentColor" strokeWidth="2" fill="none" />
        </>
    ),
    'file-text': (
        <>
            <path d="M6,2 L14,2 L18,6 L18,22 L6,22 Z" fill="none" stroke="currentColor" strokeWidth="2" />
            <path d="M14,2 L14,6 L18,6" stroke="currentColor" strokeWidth="2" fill="none" />
            <rect x="8" y="10" width="8" height="2" fill="currentColor" />
            <rect x="8" y="14" width="8" height="2" fill="currentColor" />
            <rect x="8" y="18" width="6" height="2" fill="currentColor" />
        </>
    ),
    zap: (
        <path d="M13,2 L3,14 L12,14 L11,22 L21,10 L12,10 L13,2 Z" fill="currentColor" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" />
    ),
    target: (
        <>
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
            <circle cx="12" cy="12" r="6" stroke="currentColor" strokeWidth="1" fill="none" />
            <rect x="11" y="2" width="2" height="20" fill="currentColor" opacity="0.5" />
            <rect x="2" y="11" width="20" height="2" fill="currentColor" opacity="0.5" />
        </>
    )
  };

  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} ${colorClass}`}
      shapeRendering="crispEdges" // Enforce pixel look
    >
      {paths[variant] || paths.database}
    </svg>
  );
};
