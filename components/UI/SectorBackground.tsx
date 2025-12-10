
import React from 'react';
import { SectorId } from '../../types';

interface SectorBackgroundProps {
  sectorId: SectorId | null | 'dashboard';
}

export const SectorBackground: React.FC<SectorBackgroundProps> = ({ sectorId }) => {
  if (!sectorId) return null;

  const renderEffect = () => {
    switch (sectorId) {
      case 'dashboard':
        return (
           <div className="absolute inset-0 flex items-center justify-center overflow-hidden perspective-1000 bg-[#020408]">
              {/* Rotating floor grid - Darker */}
              <div className="absolute w-[200vw] h-[200vw] bg-[linear-gradient(rgba(0,242,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,242,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] rounded-full animate-spin-slow [transform:rotateX(60deg)_translateZ(-200px)] opacity-20"></div>
              
              {/* Floating particles - Smooth Motion */}
              {Array.from({ length: 30 }).map((_, i) => (
                <div 
                  key={i}
                  className="absolute w-1 h-1 bg-cyber-primary rounded-full animate-float"
                  style={{
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 5}s`,
                    opacity: 0.2 + Math.random() * 0.4
                  }}
                />
              ))}

              {/* Orbital Circles - Slower */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-[60vh] h-[60vh] border border-cyber-primary/5 rounded-full animate-orbit" style={{ animationDuration: '60s' }}></div>
                  <div className="w-[80vh] h-[80vh] border border-dashed border-cyber-primary/5 rounded-full animate-orbit" style={{ animationDirection: 'reverse', animationDuration: '40s' }}></div>
                  <div className="absolute w-[2px] h-[10vh] bg-cyber-primary/10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
                  <div className="absolute h-[2px] w-[10vh] bg-cyber-primary/10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
              </div>

              {/* Vignette - Stronger */}
              <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#020408]/80 to-[#020408] pointer-events-none"></div>
           </div>
        );
      case 'integers': // Theme: Cold, Cryo, Snow
        return (
          <>
            <div className="absolute inset-0 bg-gradient-to-b from-blue-900/10 to-transparent pointer-events-none" />
            {Array.from({ length: 20 }).map((_, i) => (
              <div 
                key={i}
                className="absolute w-1 h-1 bg-white opacity-40 animate-snow"
                style={{
                  left: `${Math.random() * 100}%`,
                  animationDuration: `${3 + Math.random() * 5}s`,
                  animationDelay: `-${Math.random() * 5}s`
                }}
              />
            ))}
          </>
        );
      case 'rationals': // Theme: Fluid, Data, Matrix
        return (
          <>
             <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,0,0.03)_1px,transparent_1px)] bg-[size:20px_20px]" />
             {Array.from({ length: 10 }).map((_, i) => (
              <div 
                key={i}
                className="absolute top-0 w-[1px] bg-gradient-to-b from-transparent via-green-500/50 to-transparent h-32 animate-matrix"
                style={{
                  left: `${Math.random() * 100}%`,
                  animationDuration: `${2 + Math.random() * 3}s`,
                  animationDelay: `-${Math.random() * 5}s`
                }}
              />
            ))}
          </>
        );
      case 'percentages': // Theme: Shields, Pulse, Hexagons
        return (
          <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
            <div className="absolute w-[100vw] h-[100vw] opacity-5 animate-spin-slow">
                 {/* Large rotating hex or circle hint */}
                 <div className="w-full h-full border-[20px] border-dashed border-cyber-alert rounded-full"></div>
            </div>
            <div className="absolute w-[50vw] h-[50vw] border border-cyber-primary/10 rounded-full animate-pulse"></div>
          </div>
        );
      case 'powers': // Theme: Energy, Speed, Acceleration
        return (
          <>
             <div className="absolute inset-0 bg-gradient-to-r from-purple-900/10 to-transparent" />
             {Array.from({ length: 15 }).map((_, i) => (
              <div 
                key={i}
                className="absolute h-[1px] w-full bg-gradient-to-r from-transparent via-purple-500/50 to-transparent animate-scan-horizontal"
                style={{
                  top: `${Math.random() * 100}%`,
                  animationDuration: `${0.5 + Math.random() * 1.5}s`,
                  animationDelay: `-${Math.random() * 2}s`
                }}
              />
            ))}
          </>
        );
      case 'roots': // Theme: Radar, Expanding, Scanning
        return (
          <div className="absolute inset-0 overflow-hidden flex items-center justify-center">
             <div className="w-px h-full bg-cyber-success/10 absolute"></div>
             <div className="h-px w-full bg-cyber-success/10 absolute"></div>
             {Array.from({ length: 3 }).map((_, i) => (
                 <div 
                    key={i}
                    className="absolute border border-cyber-success/20 rounded-full animate-radar-ping"
                    style={{
                        width: '200px',
                        height: '200px',
                        animationDelay: `${i * 1}s`
                    }}
                 />
             ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {renderEffect()}
    </div>
  );
};
