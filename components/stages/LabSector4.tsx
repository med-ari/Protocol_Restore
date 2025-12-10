
import React, { useState, useEffect } from 'react';
import { CyberCard } from '../UI/CyberCard';
import { CyberButton } from '../UI/CyberButton';
import { Check, Box } from 'lucide-react';
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

const RecursiveGroup: React.FC<{ depth: number; currentBase: number }> = ({ depth, currentBase }) => {
  if (depth === 1) {
    return (
      <div className="flex gap-1 p-1 bg-yellow-900/40 border-2 border-yellow-600/50">
        {Array.from({ length: currentBase }).map((_, i) => (
          <div key={i} className="w-4 h-4 bg-yellow-400 border border-black shadow-[2px_2px_0px_rgba(0,0,0,0.5)]" />
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-2 p-2 border-2 border-dashed border-gray-600 bg-black/40 items-center justify-center animate-in zoom-in duration-300">
       {Array.from({ length: currentBase }).map((_, i) => (
         <RecursiveGroup key={i} depth={depth - 1} currentBase={currentBase} />
       ))}
    </div>
  );
};

export const LabSector4: React.FC<LabProps> = ({ config, onSuccess }) => {
  const [base, setBase] = useState(2);
  const [exponent, setExponent] = useState(1);
  const [result, setResult] = useState(2);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const calc = Math.pow(base, exponent);
    setResult(calc);
    if (calc === config.targetValue) {
      if (!isComplete) soundManager.playSuccess();
      setIsComplete(true);
    } else {
      setIsComplete(false);
    }
  }, [base, exponent, config.targetValue, isComplete]);

  const handleBaseChange = (b: number) => {
    soundManager.playClick();
    setBase(b);
    setExponent(1); 
  }

  return (
    <div className="space-y-6 font-mono">
      <CyberCard>
        <p className="text-lg mb-4 text-gray-300 border-l-4 border-yellow-500 pl-4 py-2 bg-white/5 shadow-inner">{config.instruction}</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 bg-black border-2 border-gray-800">
          
          {/* Visualizer */}
          <div className="min-h-[250px] bg-gray-900/50 border-2 border-gray-700 p-4 relative overflow-auto flex items-center justify-center bg-dither">
             
             {result <= 64 ? (
               <RecursiveGroup depth={exponent} currentBase={base} />
             ) : (
               <div className="text-center">
                 <Box size={48} className="mx-auto text-yellow-500 animate-pulse mb-2" />
                 <div className="text-yellow-500 font-bold text-xl uppercase">Límite de Renderizado</div>
                 <div className="text-xs text-gray-500">Partículas activas: {result}</div>
               </div>
             )}

             <div className="absolute top-0 right-0 p-1 bg-yellow-900/30 border-l-2 border-b-2 border-yellow-500/30 text-[10px] text-yellow-500 font-bold uppercase">
               VISUALIZADOR_ATÓMICO
             </div>
          </div>

          {/* Controls */}
          <div className="flex flex-col justify-center gap-6">
             <div className="text-center p-4 border-2 border-yellow-500/30 bg-yellow-900/10 shadow-[4px_4px_0px_rgba(0,0,0,0.5)]">
               <span className="text-gray-400 text-xs tracking-widest uppercase block mb-2 border-b border-yellow-900/50 pb-1">Salida de Neutrones</span>
               <div className="text-5xl font-bold text-white my-2 flex items-start justify-center">
                 {base}<sup className="text-yellow-400 text-2xl mt-2 ml-1">{exponent}</sup>
               </div>
               <div className="text-3xl text-yellow-500 font-bold">
                 = {result}
               </div>
             </div>

             <div className="space-y-2">
               <label className="text-xs text-yellow-500 uppercase font-bold">Base (Multiplicador)</label>
               <div className="flex gap-2">
                 {[2, 3, 4].map(b => (
                   <button 
                    key={b} 
                    onClick={() => handleBaseChange(b)}
                    className={`flex-1 p-3 font-bold border-2 transition-all text-lg shadow-[2px_2px_0px_black] active:shadow-none active:translate-y-1 ${base === b ? 'bg-yellow-400 text-black border-yellow-400' : 'bg-transparent border-gray-700 text-gray-500 hover:border-gray-500 hover:text-white'}`}
                   >
                     x{b}
                   </button>
                 ))}
               </div>
             </div>

             <div className="space-y-2">
               <label className="text-xs text-yellow-500 uppercase font-bold">Ciclos de Reacción</label>
               <input 
                 type="range" 
                 min="1" 
                 max="5" 
                 step="1"
                 value={exponent} 
                 onChange={(e) => setExponent(parseInt(e.target.value))}
                 className="w-full h-4 bg-gray-800 appearance-none cursor-pointer border-2 border-gray-600"
                 style={{ accentColor: '#facc15' }}
               />
               <div className="flex justify-between text-xs text-gray-500 font-bold">
                 <span>1 CICLO</span>
                 <span>5 CICLOS</span>
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
            <Check /> SIMULACIÓN COINCIDE
          </span>
        ) : "CRECIMIENTO NO COINCIDE"}
      </CyberButton>
    </div>
  );
};
