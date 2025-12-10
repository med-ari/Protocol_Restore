
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

export const LabFactorization: React.FC<LabProps> = ({ config, onSuccess }) => {
  const [a, setA] = useState(1);
  const [b, setB] = useState(1);
  const [isComplete, setIsComplete] = useState(false);

  // Target: x^2 + 5x + 6 => (x+2)(x+3) => a=2, b=3 OR a=3, b=2
  useEffect(() => {
    if ((a === 2 && b === 3) || (a === 3 && b === 2)) {
      if (!isComplete) soundManager.playSuccess();
      setIsComplete(true);
    } else {
      setIsComplete(false);
    }
  }, [a, b, isComplete]);

  return (
    <div className="space-y-6 font-mono">
      <CyberCard>
        <p className="text-lg mb-4 text-fuchsia-300 border-l-4 border-fuchsia-500 pl-4 py-2 bg-white/5 shadow-inner">{config.instruction}</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 bg-black border-2 border-gray-800">
          
          {/* Geometric Visualizer */}
          <div className="relative bg-gray-900 border-2 border-fuchsia-900 h-[300px] overflow-hidden flex items-center justify-center p-4">
             <div className="flex flex-col gap-1 items-start">
                 <div className="flex gap-1 items-end">
                     {/* x^2 */}
                     <div className="w-24 h-24 bg-fuchsia-600 border border-white flex items-center justify-center text-white font-bold text-xl relative">
                         x²
                         <span className="absolute -top-6 text-xs text-gray-400">x</span>
                         <span className="absolute -left-4 text-xs text-gray-400 -rotate-90">x</span>
                     </div>
                     {/* ax */}
                     <div 
                        className="h-24 bg-purple-500/50 border border-purple-400 flex items-center justify-center text-white transition-all duration-300 relative"
                        style={{ width: `${a * 20}px` }}
                     >
                         {a}x
                         <span className="absolute -top-6 text-xs text-gray-400">{a}</span>
                     </div>
                 </div>
                 <div className="flex gap-1 items-start">
                     {/* bx */}
                     <div 
                        className="w-24 bg-purple-500/50 border border-purple-400 flex items-center justify-center text-white transition-all duration-300 relative"
                        style={{ height: `${b * 20}px` }}
                     >
                         {b}x
                         <span className="absolute -left-4 text-xs text-gray-400 -rotate-90">{b}</span>
                     </div>
                     {/* ab (constant) */}
                     <div 
                        className="bg-yellow-500/80 border border-yellow-300 flex items-center justify-center text-black font-bold transition-all duration-300"
                        style={{ width: `${a * 20}px`, height: `${b * 20}px` }}
                     >
                         {a*b}
                     </div>
                 </div>
             </div>
          </div>

          {/* Controls */}
          <div className="flex flex-col justify-center gap-6">
             <div className="text-center p-4 border-2 border-fuchsia-500/30 bg-fuchsia-900/10 shadow-[4px_4px_0px_rgba(0,0,0,0.5)]">
               <span className="text-gray-400 text-xs tracking-widest uppercase block mb-2 border-b border-fuchsia-900/50 pb-1">Área Calculada</span>
               <div className="text-2xl font-bold text-white my-2">
                 x² + <span className="text-purple-400">{a+b}x</span> + <span className="text-yellow-400">{a*b}</span>
               </div>
               <div className="text-sm text-gray-400">
                 Dimensiones: (x + {a})(x + {b})
               </div>
             </div>

             <div className="space-y-4">
               <div>
                   <label className="text-xs text-fuchsia-500 uppercase font-bold flex justify-between">
                       <span>Valor A (Largo extra)</span>
                       <span>{a}</span>
                   </label>
                   <input 
                     type="range" min="1" max="5" step="1"
                     value={a} 
                     onChange={(e) => { setA(parseInt(e.target.value)); soundManager.playHover(); }}
                     className="w-full h-4 bg-gray-800 appearance-none cursor-pointer border-2 border-gray-600"
                     style={{ accentColor: '#d946ef' }}
                   />
               </div>

               <div>
                   <label className="text-xs text-fuchsia-500 uppercase font-bold flex justify-between">
                       <span>Valor B (Alto extra)</span>
                       <span>{b}</span>
                   </label>
                   <input 
                     type="range" min="1" max="5" step="1"
                     value={b} 
                     onChange={(e) => { setB(parseInt(e.target.value)); soundManager.playHover(); }}
                     className="w-full h-4 bg-gray-800 appearance-none cursor-pointer border-2 border-gray-600"
                     style={{ accentColor: '#d946ef' }}
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
            <Check /> DIMENSIONES CORRECTAS
          </span>
        ) : "ÁREA NO COINCIDE"}
      </CyberButton>
    </div>
  );
};
