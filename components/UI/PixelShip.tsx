import React from 'react';

interface PixelShipProps {
  className?: string;
  damage?: boolean;
}

export const PixelShip: React.FC<PixelShipProps> = ({ className = "", damage = false }) => {
  return (
    <svg 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Grid Background */}
      <path d="M0 50 H100 M50 0 V100" stroke="currentColor" strokeOpacity="0.1" strokeWidth="0.5" />
      <circle cx="50" cy="50" r="30" stroke="currentColor" strokeOpacity="0.1" strokeWidth="0.5" strokeDasharray="2 2" />

      {/* Ship Wireframe Main Body */}
      <path 
        d="M50 20 L65 80 L50 70 L35 80 Z" 
        stroke="currentColor" 
        strokeWidth="1.5"
        fill="none"
        className="drop-shadow-[0_0_5px_currentColor]"
      />
      
      {/* Wings */}
      <path d="M65 60 L85 75 L65 70" stroke="currentColor" strokeWidth="1" fill="none" />
      <path d="M35 60 L15 75 L35 70" stroke="currentColor" strokeWidth="1" fill="none" />

      {/* Engine Glow */}
      <path d="M45 80 L50 90 L55 80" fill={damage ? "#ff0055" : "#00f2ff"} fillOpacity="0.5" className="animate-pulse" />

      {/* Damage Indicators (conditionally rendered) */}
      {damage && (
        <>
           <circle cx="40" cy="40" r="2" fill="#ff0055" className="animate-ping" />
           <circle cx="60" cy="50" r="3" fill="#ff0055" className="animate-ping" style={{ animationDelay: '0.5s' }} />
           <circle cx="50" cy="60" r="2" fill="#ff0055" className="animate-ping" style={{ animationDelay: '0.2s' }} />
           <path d="M30 30 L40 40 M70 30 L60 40" stroke="#ff0055" strokeWidth="1" />
           
           {/* Glitch Overlay on ship */}
           <rect x="30" y="20" width="40" height="60" fill="#ff0055" fillOpacity="0.1" className="animate-pulse" />
        </>
      )}

      {/* Cockpit */}
      <path d="M50 40 L52 45 L48 45 Z" fill="currentColor" />
    </svg>
  );
};