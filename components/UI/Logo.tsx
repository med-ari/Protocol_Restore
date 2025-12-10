
import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
}

export const Logo: React.FC<LogoProps> = ({ className = "", size = 64 }) => {
  return (
    <svg 
      width={size} 
      height={size * 2} 
      viewBox="0 0 200 400" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <style>
          {`
            .dark-purple { fill: #8c52ff; }
            .light-purple { fill: #dcbdfc; }
            
            /* Move Left (Away from center) */
            @keyframes float-out-left {
              0%, 100% { transform: translateX(0); }
              50% { transform: translateX(-8px); }
            }
            .animate-left {
              animation: float-out-left 3s ease-in-out infinite;
            }

            /* Move Right (Away from center) */
            @keyframes float-out-right {
              0%, 100% { transform: translateX(0); }
              50% { transform: translateX(8px); }
            }
            .animate-right {
              animation: float-out-right 3s ease-in-out infinite;
            }

            /* Vertical Float for Top */
            @keyframes float-y {
              0%, 100% { transform: translateY(0); }
              50% { transform: translateY(-6px); }
            }
            .animate-y {
              animation: float-y 4s ease-in-out infinite;
            }
          `}
        </style>
        
        <mask id="totem-mask">
          <rect width="100%" height="100%" fill="white"/>
          <rect x="70" y="0" width="60" height="35" fill="black" />
          <circle cx="100" cy="28" r="18" fill="black" />
          <rect x="0" y="168" width="200" height="30" fill="black" />
          <circle cx="100" cy="183" r="32" fill="black" />
          <rect x="70" y="342" width="60" height="31" fill="black" />
          <rect x="17" y="360" width="16" height="14" fill="black" />
          <rect x="167" y="360" width="16" height="14" fill="black" />
        </mask>
      </defs>

      {/* GROUP 1: Masked Main Body (Static) */}
      <g mask="url(#totem-mask)">
        <path class="dark-purple" d="M55,30 Q55,20 65,20 L80,20 A 15 15 0 0 1 120 20 L135,20 Q145,20 145,30 L145,180 L55,180 Z" />
        <rect x="88" y="55" width="24" height="85" class="light-purple" />
        <rect x="55" y="170" width="90" height="60" class="dark-purple" />
        <rect x="55" y="210" width="90" height="140" class="dark-purple" />
        <rect x="88" y="230" width="24" height="85" class="light-purple" />
        <rect x="17" y="325" width="17" height="15" class="light-purple" />
        <rect x="166" y="325" width="17" height="15" class="light-purple" />
        <path class="dark-purple" d="M10,355 L43,355 L43,365 L157,365 L157,355 L190,355 L190,380 L10,380 Z" />
      </g>

      {/* GROUP 2: Floating Elements */}
      
      {/* Top: Vertical Motion */}
      <g className="animate-y">
        <circle cx="100" cy="28" r="9" class="dark-purple" />
        <circle cx="100" cy="28" r="4" class="light-purple" />
      </g>

      {/* Sides: Horizontal Motion (Synchronized Out/In) */}
      {/* Left moves Left (-x), Right moves Right (+x) */}
      <rect x="42" y="175" width="20" height="15" class="light-purple animate-left" />
      <rect x="138" y="175" width="20" height="15" class="light-purple animate-right" />
      
      {/* Center: Static Pulse */}
      <g>
        <circle cx="100" cy="183" r="24" class="dark-purple" />
        <circle cx="100" cy="183" r="11" class="light-purple animate-pulse" />
      </g>
      
      {/* Bottom Center: Static */}
      <rect x="90" y="345" width="20" height="25" class="light-purple" />
      
      {/* Bottom Corners: Static (as requested "not the one below them") */}
      <rect x="20" y="363" width="10" height="8" class="light-purple" />
      <rect x="170" y="363" width="10" height="8" class="light-purple" />
    </svg>
  );
};
