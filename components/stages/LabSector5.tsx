
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

export const LabSector5: React.FC<LabProps> = ({ config, onSuccess }) => {
  const [side, setSide] = useState(config.initialValue);
  const [area, setArea] = useState(1);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const a = side * side;
    setArea(a);
    if (side === config.targetValue) {
      if (!isComplete) soundManager.playSuccess();
      setIsComplete(true);
    } else {
      setIsComplete(false);
    }
  }, [side, config.targetValue, isComplete]);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSide(parseInt(e.target.value));
    soundManager.playHover();
  };

  return (
    <div className="space-y-6 font-mono">
      <CyberCard>
        <p className="text-lg mb-6 text-gray-300 border-l-4 border-red-500 pl-4 py-2 bg-white/5 shadow-inner">{config.instruction}</p>
        
        <div className="flex flex-col md:flex-row items-center justify-center gap-12 p-8 bg-black border-2 border-gray-800">
          
          {/* Square Visualization */}
          <div className="relative w-72 h-72 bg-gray-900 border-2 border-gray-700 flex items-center justify-center shadow-[inset_0_0_20px_black]">
             
             {/* Background Grid */}
             <div className="absolute inset-0 opacity-10" 
                  style={{ backgroundImage: 'linear-gradient(#444 1px, transparent 1px), linear-gradient(90deg, #444 1px, transparent 1px)', backgroundSize: '24px 24px' }}>
             </div>

             {/* The Growing Square */}
             <div 
               className={`
                 relative flex items-center justify-center transition-all duration-300 ease-out border-4
                 ${isComplete ? 'border-cyber-success bg-cyber-success/20 shadow-[0_0_30px_rgba(0,255,157,0.3)]' : 'border-red-500 bg-red-900/40'}
               `}
               style={{ 
                 width: `${side * 24}px`, 
                 height: `${side * 24}px`,
               }}
             >
                {/* Inner Pixel Grid Texture */}
                <div className="absolute inset-0 opacity-20 bg-dither"></div>

                {/* Crosshairs */}
               <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-white"></div>
               <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-white"></div>
               <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-white"></div>
               <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-white"></div>

               {/* Center Area Text */}
               <div className="absolute font-bold text-white drop-shadow-md text-2xl z-10">
                 {area}
               </div>
             </div>
             
             <div className="absolute bottom-1 right-2 text-[10px] text-gray-500 uppercase font-bold">
                GRID_SCALE: 1:100
             </div>
          </div>

          {/* Controls */}
          <div className="flex flex-col items-center gap-8 min-w-[240px]">
            <div className="text-center p-6 bg-gray-900 border-2 border-gray-700 w-full relative shadow-[4px_4px_0px_black]">
               <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-red-500 to-transparent"></div>
               <span className="text-gray-400 text-xs block mb-2 uppercase tracking-widest font-bold">Área Total Escaneada</span>
               <div className={`text-6xl font-bold transition-all ${isComplete ? 'text-cyber-success' : 'text-white'}`}>
                 {area} <span className="text-xl text-gray-600">m²</span>
               </div>
               
               <div className="mt-4 pt-4 border-t-2 border-gray-800">
                   <div className="text-sm text-red-400">LADO = √{area} = <span className="text-xl font-bold text-white ml-1">{side}m</span></div>
               </div>
            </div>

            <div className="w-full bg-black p-4 border-2 border-gray-700">
               <label className="text-xs text-red-500 mb-4 block text-center uppercase font-bold tracking-widest">
                 Ajustar Longitud
               </label>
               
               <input 
                 type="range" 
                 min="1" 
                 max="10" 
                 value={side} 
                 onChange={handleSliderChange}
                 className="w-full h-4 bg-gray-800 appearance-none cursor-pointer border border-gray-600"
                 style={{ accentColor: '#ef4444' }}
               />
               
               <div className="flex justify-between mt-2 text-white text-xs text-gray-500 font-bold">
                 <span>1m</span>
                 <span>10m</span>
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
            <Check /> ÁREA CONFIRMADA
          </span>
        ) : "DIMENSIONES INCORRECTAS"}
      </CyberButton>
    </div>
  );
};
