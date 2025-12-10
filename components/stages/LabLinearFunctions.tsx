
import React, { useState, useEffect } from 'react';
import { CyberCard } from '../UI/CyberCard';
import { CyberButton } from '../UI/CyberButton';
import { Check } from 'lucide-react';
import { soundManager } from '../../utils/sound';

interface LabProps {
  config: {
    instruction: string;
    targetValue: number;
    initialValue: number;
    unit: string;
  };
  onSuccess: () => void;
}

export const LabLinearFunctions: React.FC<LabProps> = ({ config, onSuccess }) => {
  const [m, setM] = useState(1); // Slope
  const [n, setN] = useState(0); // Intercept
  const [isComplete, setIsComplete] = useState(false);

  // Target condition: f(3) = 5 => 3m + n = 5
  
  const currentY = (m * 3) + n;

  useEffect(() => {
    if (currentY === config.targetValue) {
      if (!isComplete) soundManager.playSuccess();
      setIsComplete(true);
    } else {
      setIsComplete(false);
    }
  }, [m, n, config.targetValue, isComplete]);

  const scale = 20; // pixels per unit
  const originX = 150; // center of 300
  const originY = 150; // center of 300

  // Calculate line points for display
  // Line: y = mx + n.
  const x1 = -10; 
  const y1 = (m * x1) + n;
  const x2 = 10;
  const y2 = (m * x2) + n;

  // Map graph coords to SVG coords
  const mapX = (x: number) => originX + (x * scale);
  const mapY = (y: number) => originY - (y * scale);

  return (
    <div className="space-y-6 font-mono">
      <CyberCard>
        <p className="text-lg mb-4 text-indigo-300 border-l-4 border-indigo-500 pl-4 py-2 bg-white/5 shadow-inner">{config.instruction}</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 bg-black border-2 border-gray-800">
          
          {/* Graph Visualizer */}
          <div className="relative bg-gray-900 border-2 border-gray-700 h-[300px] overflow-hidden shadow-inner flex justify-center items-center">
             <div className="absolute top-2 left-2 text-xs text-indigo-400 font-bold z-10">RADAR DE TRAYECTORIA</div>
             
             <svg className="w-[300px] h-[300px]" viewBox="0 0 300 300">
                {/* Grid Lines */}
                <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#333" strokeWidth="1" />
                </pattern>
                <rect width="100%" height="100%" fill="url(#grid)" />

                {/* Axes */}
                <line x1={originX} y1="0" x2={originX} y2="300" stroke="#666" strokeWidth="2" />
                <line x1="0" y1={originY} x2="300" y2={originY} stroke="#666" strokeWidth="2" />

                {/* Target Point (3, 5) */}
                <circle cx={mapX(3)} cy={mapY(5)} r="6" fill="none" stroke="#00f2ff" strokeWidth="2" className="animate-ping" />
                <circle cx={mapX(3)} cy={mapY(5)} r="3" fill="#00f2ff" />
                <text x={mapX(3) + 10} y={mapY(5)} fill="#00f2ff" fontSize="12" className="font-mono">OBJETIVO (3,5)</text>

                {/* The Function Line */}
                <line 
                    x1={mapX(x1)} y1={mapY(y1)} 
                    x2={mapX(x2)} y2={mapY(y2)} 
                    stroke={isComplete ? "#00ff9d" : "#818cf8"} 
                    strokeWidth="4" 
                    strokeLinecap="round"
                    className="transition-all duration-300"
                />
             </svg>
          </div>

          {/* Controls */}
          <div className="flex flex-col justify-center gap-6">
             <div className="text-center p-4 border-2 border-indigo-500/30 bg-indigo-900/10 shadow-[4px_4px_0px_rgba(0,0,0,0.5)]">
               <span className="text-gray-400 text-xs tracking-widest uppercase block mb-2 border-b border-indigo-900/50 pb-1">Ecuación de Ruta</span>
               <div className="text-4xl font-bold text-white my-2">
                 f(x) = <span className="text-indigo-400">{m}</span>x {n >= 0 ? '+' : ''} <span className="text-indigo-400">{n}</span>
               </div>
               <div className="text-sm text-gray-400 mt-2">
                 Posición en x=3: <span className={`font-bold text-xl ${isComplete ? 'text-cyber-success' : 'text-white'}`}>{currentY}</span>
               </div>
             </div>

             <div className="space-y-4">
               <div>
                   <label className="text-xs text-indigo-500 uppercase font-bold flex justify-between">
                       <span>Pendiente (m)</span>
                       <span>{m}</span>
                   </label>
                   <input 
                     type="range" min="-5" max="5" step="1"
                     value={m} 
                     onChange={(e) => { setM(parseInt(e.target.value)); soundManager.playHover(); }}
                     className="w-full h-4 bg-gray-800 appearance-none cursor-pointer border-2 border-gray-600"
                     style={{ accentColor: '#818cf8' }}
                   />
               </div>

               <div>
                   <label className="text-xs text-indigo-500 uppercase font-bold flex justify-between">
                       <span>Posición Inicial (n)</span>
                       <span>{n}</span>
                   </label>
                   <input 
                     type="range" min="-5" max="8" step="1"
                     value={n} 
                     onChange={(e) => { setN(parseInt(e.target.value)); soundManager.playHover(); }}
                     className="w-full h-4 bg-gray-800 appearance-none cursor-pointer border-2 border-gray-600"
                     style={{ accentColor: '#818cf8' }}
                   />
               </div>
             </div>
          </div>

        </div>
      </CyberCard>

      <CyberButton 
        disabled={!isComplete} 
        variant="success" 
        fullWidth 
        onClick={onSuccess}
      >
        {isComplete ? (
          <span className="flex items-center justify-center gap-2">
            <Check /> TRAYECTORIA ALINEADA
          </span>
        ) : "RUTA FUERA DE CURSO"}
      </CyberButton>
    </div>
  );
};
