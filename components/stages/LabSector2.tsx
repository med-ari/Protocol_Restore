
import React, { useState, useEffect } from 'react';
import { CyberCard } from '../UI/CyberCard';
import { CyberButton } from '../UI/CyberButton';
import { Check, Droplet } from 'lucide-react';
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

export const LabSector2: React.FC<LabProps> = ({ config, onSuccess }) => {
  const [activeSegments, setActiveSegments] = useState<boolean[]>([false, false, false, false]); 
  const [currentTotal, setCurrentTotal] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const toggleSegment = (idx: number) => {
    soundManager.playClick();
    const newSegments = [...activeSegments];
    newSegments[idx] = !newSegments[idx];
    setActiveSegments(newSegments);
  };

  useEffect(() => {
    const total = activeSegments.filter(Boolean).length * 0.25;
    setCurrentTotal(total);
    if (total === config.targetValue) {
      if (!isComplete) soundManager.playSuccess();
      setIsComplete(true);
    } else {
      setIsComplete(false);
    }
  }, [activeSegments, config.targetValue, isComplete]);

  return (
    <div className="space-y-8 font-mono">
      <CyberCard className="bg-[#050b14] border-2 border-orange-500/30">
        <p className="text-xl mb-8 text-gray-200 border-l-4 border-orange-500 pl-6 py-4 bg-orange-900/10 shadow-inner font-bold leading-relaxed">
            {config.instruction}
        </p>
        
        <div className="flex flex-col items-center justify-center gap-10 p-10 bg-black border-2 border-gray-800 rounded-lg shadow-inner relative overflow-hidden">
          
          <div className="absolute inset-0 bg-dither opacity-10 pointer-events-none"></div>

          <div className="w-full max-w-4xl relative z-10">
            <div className="flex justify-between w-full mb-4 px-1 font-bold text-xs uppercase tracking-widest text-gray-500">
                <span>Estado del Tanque</span>
                <span>Capacidad: 4 Unidades (1/4 c/u)</span>
            </div>

            {/* Interactive Containers */}
            <div className="flex gap-4">
                {activeSegments.map((isActive, idx) => (
                <button
                    key={idx}
                    onClick={() => toggleSegment(idx)}
                    className={`
                    h-48 flex-1 transition-all duration-300 relative group overflow-hidden border-4 rounded-lg flex flex-col justify-end
                    ${isActive 
                        ? 'bg-orange-900/20 border-orange-500 shadow-[0_0_20px_rgba(251,146,60,0.3)]' 
                        : 'bg-[#0f1929] border-gray-700 hover:border-gray-500'}
                    `}
                >
                    {/* Liquid Level */}
                    <div className={`w-full transition-all duration-500 ease-in-out relative ${isActive ? 'h-full bg-orange-500' : 'h-0 bg-gray-800'}`}>
                        {isActive && (
                            <>
                                <div className="absolute top-0 w-full h-2 bg-white/30 animate-pulse"></div>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <Droplet className="text-black/50 w-12 h-12 animate-bounce" />
                                </div>
                            </>
                        )}
                    </div>
                    
                    <span className={`absolute top-2 left-1/2 -translate-x-1/2 font-bold text-2xl font-sans drop-shadow-md transition-colors ${isActive ? 'text-white' : 'text-gray-600'}`}>
                        1/4
                    </span>
                </button>
                ))}
            </div>
          </div>

          {/* Readout Panel */}
          <div className="flex items-center gap-8 p-6 border-2 border-orange-500/50 bg-orange-950/20 w-full max-w-2xl shadow-[0_8px_0_rgba(0,0,0,0.5)] rounded">
             <div className="flex-1 text-center">
                 <div className="text-xs text-orange-400 mb-2 uppercase tracking-[0.2em] font-bold">Fracción Total</div>
                 <div className="text-6xl font-bold text-white tracking-tighter drop-shadow-lg font-mono">
                   {activeSegments.filter(Boolean).length}/4
                 </div>
             </div>
             
             <div className="w-px h-20 bg-orange-500/30"></div>

             <div className="flex-1 text-center">
                 <div className="text-xs text-orange-400 mb-2 uppercase tracking-[0.2em] font-bold">Decimal</div>
                 <div className="text-6xl font-bold text-white tracking-tighter drop-shadow-lg font-mono">
                   {currentTotal.toFixed(2)}
                 </div>
             </div>

             <div className="w-px h-20 bg-orange-500/30"></div>

             <div className="flex-1 text-center">
                 <div className="text-xs text-gray-500 mb-2 uppercase tracking-[0.2em] font-bold">Estado</div>
                 <div className={`text-xl font-bold uppercase tracking-wider ${isComplete ? 'text-green-400 animate-pulse' : 'text-orange-400'}`}>
                     {isComplete ? 'OPTIMAL' : 'ERROR'}
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
        className="py-6 text-xl"
      >
        {isComplete ? (
          <span className="flex items-center justify-center gap-3">
            <Check size={28} /> CONFIRMAR MEZCLA
          </span>
        ) : "NIVEL DE MEZCLA INCORRECTO - AJUSTAR"}
      </CyberButton>
    </div>
  );
};
