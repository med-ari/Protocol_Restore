
import React, { useState, useEffect } from 'react';
import { CyberCard } from '../UI/CyberCard';
import { CyberButton } from '../UI/CyberButton';
import { Check } from 'lucide-react';
import { soundManager } from '../../utils/sound';
import { PixelSymbol } from '../UI/PixelSymbol';

interface LabProps {
  config: {
    instruction: string;
    targetValue: number;
    initialValue: number;
    unit: string;
  };
  onSuccess: () => void;
}

export const LabSector3: React.FC<LabProps> = ({ config, onSuccess }) => {
  const [value, setValue] = useState(config.initialValue);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (Math.abs(value - config.targetValue) <= 1) { 
      if (!isComplete) soundManager.playSuccess();
      setIsComplete(true);
    } else {
      setIsComplete(false);
    }
  }, [value, config.targetValue, isComplete]);

  return (
    <div className="space-y-6 font-mono">
      <CyberCard>
        <p className="text-lg mb-4 text-gray-300 border-l-4 border-purple-500 pl-4 py-2 bg-white/5 shadow-inner">{config.instruction}</p>
        
        <div className="flex flex-col items-center justify-center gap-10 p-8 bg-black border-2 border-gray-800 relative overflow-hidden">
          
          {/* Shield Visual - Pixel Art Style */}
          <div className="relative">
             <div className={`absolute inset-0 bg-purple-500 blur-[40px] opacity-20 transition-opacity duration-300 ${isComplete ? 'opacity-50' : 'opacity-10'}`}></div>
             
             <div className={`transition-all duration-300 ${isComplete ? 'text-cyber-success scale-105' : 'text-gray-800'}`}>
                <PixelSymbol variant="shield" size={160} className={isComplete ? 'text-cyber-success' : 'text-purple-900'} />
             </div>

             <div className="absolute inset-0 flex items-center justify-center flex-col z-10">
               <span className={`text-5xl font-bold drop-shadow-[2px_2px_0px_black] ${isComplete ? 'text-white' : 'text-purple-300'}`}>
                   {value}%
               </span>
               <span className="text-xs text-purple-400 tracking-widest uppercase mt-1 bg-black/50 px-2">Integridad</span>
             </div>
          </div>

          <div className="w-full max-w-md">
              <input 
                type="range" 
                min="0" 
                max="100" 
                value={value} 
                onChange={(e) => setValue(parseInt(e.target.value))}
                className="w-full h-8 bg-gray-900 appearance-none cursor-pointer border-2 border-gray-600 focus:outline-none focus:border-purple-500 slider-thumb-pixel"
              />
              <style>{`
                .slider-thumb-pixel::-webkit-slider-thumb {
                    -webkit-appearance: none;
                    appearance: none;
                    width: 24px;
                    height: 32px;
                    background: #c084fc;
                    border: 2px solid white;
                    cursor: pointer;
                    box-shadow: 2px 2px 0px black;
                }
                .slider-thumb-pixel::-webkit-slider-thumb:hover {
                    background: #d8b4fe;
                }
              `}</style>
              
              <div className="flex justify-between w-full text-xs text-gray-500 mt-2 uppercase tracking-widest font-bold">
                <span>0% (CRÍTICO)</span>
                <span className="text-cyber-success relative">
                    80% (ÓPTIMO)
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-[2px] h-8 bg-cyber-success/50"></div>
                </span>
                <span className="text-cyber-alert">100%</span>
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
            <Check /> ESCUDOS ESTABILIZADOS
          </span>
        ) : "NIVEL DE ENERGÍA INCORRECTO"}
      </CyberButton>
    </div>
  );
};
