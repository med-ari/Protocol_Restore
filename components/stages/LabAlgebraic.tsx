
import React, { useState, useEffect } from 'react';
import { CyberCard } from '../UI/CyberCard';
import { CyberButton } from '../UI/CyberButton';
import { Check, Box, Minus, Plus } from 'lucide-react';
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

export const LabAlgebraic: React.FC<LabProps> = ({ config, onSuccess }) => {
  const [xCount, setXCount] = useState(0);
  const [yCount, setYCount] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  // Target: 4x + 2y
  useEffect(() => {
    if (xCount === 4 && yCount === 2) {
      if (!isComplete) soundManager.playSuccess();
      setIsComplete(true);
    } else {
      setIsComplete(false);
    }
  }, [xCount, yCount, isComplete]);

  const updateCount = (type: 'x' | 'y', delta: number) => {
      soundManager.playClick();
      if (type === 'x') setXCount(prev => Math.max(0, prev + delta));
      else setYCount(prev => Math.max(0, prev + delta));
  };

  return (
    <div className="space-y-6 font-mono">
      <CyberCard>
        <p className="text-lg mb-4 text-sky-300 border-l-4 border-sky-500 pl-4 py-2 bg-white/5 shadow-inner">{config.instruction}</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 bg-black border-2 border-gray-800">
          
          {/* Visual Container */}
          <div className="bg-gray-900/50 border-2 border-sky-900 p-4 relative overflow-hidden min-h-[250px] flex flex-col">
             <div className="absolute top-0 right-0 p-1 bg-sky-900/30 text-[10px] text-sky-400 font-bold uppercase">VISUALIZADOR DE CARGA</div>
             
             <div className="flex-1 flex gap-4 p-4 items-end justify-center">
                 {/* X Stack */}
                 <div className="flex flex-col items-center gap-1">
                     <div className="flex flex-col-reverse gap-1">
                         {Array.from({length: xCount}).map((_, i) => (
                             <div key={i} className="w-12 h-12 bg-sky-600 border-2 border-sky-300 flex items-center justify-center text-white font-bold shadow-[0_0_10px_rgba(14,165,233,0.5)] animate-in slide-in-from-bottom-2">
                                 X
                             </div>
                         ))}
                         {xCount === 0 && <div className="w-12 h-12 border-2 border-dashed border-gray-700 flex items-center justify-center text-gray-700">?</div>}
                     </div>
                     <span className="text-sky-400 font-bold">{xCount}x</span>
                 </div>

                 <div className="text-2xl text-gray-500 font-bold self-center">+</div>

                 {/* Y Stack */}
                 <div className="flex flex-col items-center gap-1">
                     <div className="flex flex-col-reverse gap-1">
                         {Array.from({length: yCount}).map((_, i) => (
                             <div key={i} className="w-12 h-12 bg-purple-600 border-2 border-purple-300 flex items-center justify-center text-white font-bold shadow-[0_0_10px_rgba(147,51,234,0.5)] animate-in slide-in-from-bottom-2">
                                 Y
                             </div>
                         ))}
                         {yCount === 0 && <div className="w-12 h-12 border-2 border-dashed border-gray-700 flex items-center justify-center text-gray-700">?</div>}
                     </div>
                     <span className="text-purple-400 font-bold">{yCount}y</span>
                 </div>
             </div>
          </div>

          {/* Controls */}
          <div className="flex flex-col justify-center gap-6">
             <div className="text-center p-4 border-2 border-sky-500/30 bg-sky-900/10 shadow-[4px_4px_0px_rgba(0,0,0,0.5)]">
               <span className="text-gray-400 text-xs tracking-widest uppercase block mb-2 border-b border-sky-900/50 pb-1">Expresión Actual</span>
               <div className="text-4xl font-bold text-white my-2">
                 {xCount}x + {yCount}y
               </div>
             </div>

             <div className="grid grid-cols-2 gap-4">
                 <div className="space-y-2">
                     <label className="text-xs text-sky-500 uppercase font-bold text-center block">Cajas Metal (X)</label>
                     <div className="flex items-center justify-center gap-2">
                         <button onClick={() => updateCount('x', -1)} className="p-3 bg-gray-800 border border-gray-600 hover:border-white text-white"><Minus size={16} /></button>
                         <button onClick={() => updateCount('x', 1)} className="p-3 bg-sky-900/50 border border-sky-500 hover:bg-sky-800 text-white"><Plus size={16} /></button>
                     </div>
                 </div>
                 <div className="space-y-2">
                     <label className="text-xs text-purple-500 uppercase font-bold text-center block">Cajas Repuesto (Y)</label>
                     <div className="flex items-center justify-center gap-2">
                         <button onClick={() => updateCount('y', -1)} className="p-3 bg-gray-800 border border-gray-600 hover:border-white text-white"><Minus size={16} /></button>
                         <button onClick={() => updateCount('y', 1)} className="p-3 bg-purple-900/50 border border-purple-500 hover:bg-purple-800 text-white"><Plus size={16} /></button>
                     </div>
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
            <Check /> INVENTARIO CONSOLIDADO
          </span>
        ) : "CARGA DESBALANCEADA"}
      </CyberButton>
    </div>
  );
};
