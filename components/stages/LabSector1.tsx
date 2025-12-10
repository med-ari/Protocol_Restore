
import React, { useState, useEffect, useRef } from 'react';
import { CyberCard } from '../UI/CyberCard';
import { CyberButton } from '../UI/CyberButton';
import { ArrowUp, ArrowDown, Check, Terminal, Trash2, RotateCcw } from 'lucide-react';
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

const STORAGE_KEY = 'axiom_lab_sector_1_state';

export const LabSector1: React.FC<LabProps> = ({ config, onSuccess }) => {
  const [commands, setCommands] = useState<number[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  });
  
  const [currentValue, setCurrentValue] = useState(config.initialValue);
  const [isComplete, setIsComplete] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(commands));
  }, [commands]);

  useEffect(() => {
    const total = commands.reduce((acc, cmd) => acc + cmd, config.initialValue);
    setCurrentValue(total);

    if (total === config.targetValue) {
      if (!isComplete) soundManager.playSuccess();
      setIsComplete(true);
    } else {
      setIsComplete(false);
    }
    
    if(scrollRef.current) {
      setTimeout(() => {
        if(scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }, 100);
    }
  }, [commands, config.targetValue, config.initialValue, isComplete]);

  const addCommand = (delta: number) => {
    if(isComplete) return;
    soundManager.playClick();
    setCommands(prev => [...prev, delta]);
  };

  const undoLast = () => {
    if (commands.length === 0 || isComplete) return;
    soundManager.playClick();
    setCommands(prev => prev.slice(0, -1));
  };

  const reset = () => {
    soundManager.playError();
    setCommands([]);
  };

  return (
    <div className="space-y-6 font-mono">
      <CyberCard className="bg-gray-900 border-2 border-gray-700 shadow-xl overflow-hidden relative">
        <div className="flex items-center gap-2 mb-6 border-b-2 border-gray-700 pb-2 bg-black/50 px-2 rounded-t relative z-10">
            <Terminal size={18} className="text-cyber-primary" />
            <span className="text-sm text-cyber-primary tracking-widest uppercase font-bold">CRYO_STABILIZER_V9</span>
            <span className={`ml-auto text-[10px] animate-pulse px-2 border ${isComplete ? 'bg-green-900 text-green-400 border-green-500' : 'bg-gray-800 text-gray-500 border-gray-700'}`}>
                {isComplete ? 'STABLE' : 'UNSTABLE'}
            </span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
            
            {/* Left: Controls */}
            <div className="space-y-6">
                <p className="text-xl text-cyan-100 border-l-4 border-cyber-primary pl-4 py-2 bg-cyber-primary/10 shadow-inner font-bold leading-relaxed">
                  {config.instruction}
                </p>
                
                <div className="grid grid-cols-2 gap-3">
                    <button onClick={() => addCommand(5)} className="p-6 bg-gray-800 border-2 border-cyan-500/50 hover:bg-cyan-900/50 hover:border-cyan-400 text-cyan-300 transition-all font-bold text-xl flex flex-col items-center justify-center shadow-lg active:translate-y-1">
                        <ArrowUp size={32} /> SUBIR +5
                    </button>
                    <button onClick={() => addCommand(1)} className="p-6 bg-gray-800 border-2 border-cyan-500/30 hover:bg-cyan-900/30 hover:border-cyan-400 text-cyan-200 transition-all font-bold text-lg flex flex-col items-center justify-center shadow-lg active:translate-y-1">
                        <ArrowUp size={24} /> AJUSTE +1
                    </button>
                    
                    <button onClick={() => addCommand(-5)} className="p-6 bg-gray-800 border-2 border-red-500/50 hover:bg-red-900/50 hover:border-red-400 text-red-300 transition-all font-bold text-xl flex flex-col items-center justify-center shadow-lg active:translate-y-1">
                        <ArrowDown size={32} /> BAJAR -5
                    </button>
                     <button onClick={() => addCommand(-1)} className="p-6 bg-gray-800 border-2 border-red-500/30 hover:bg-red-900/30 hover:border-red-400 text-red-200 transition-all font-bold text-lg flex flex-col items-center justify-center shadow-lg active:translate-y-1">
                        <ArrowDown size={24} /> AJUSTE -1
                    </button>
                </div>

                <div className="flex gap-3">
                  <button onClick={undoLast} className="flex-1 py-3 border-2 border-gray-600 bg-black hover:bg-gray-800 text-gray-400 hover:text-white transition-all flex items-center justify-center gap-2">
                    <RotateCcw size={16} /> UNDO
                  </button>
                  <button onClick={reset} className="px-6 py-3 border-2 border-red-900/50 bg-black hover:bg-red-900/20 text-red-600 hover:text-red-400 transition-all flex items-center justify-center">
                    <Trash2 size={20} />
                  </button>
                </div>
            </div>

            {/* Right: Visualization */}
            <div className="bg-black border-4 border-gray-700 p-6 flex gap-6 h-full min-h-[400px] relative shadow-[inset_0_0_40px_rgba(0,0,0,0.8)]">
                
                {/* Vertical Gauge */}
                <div className="w-24 bg-gray-900 border-2 border-gray-600 relative flex justify-center rounded overflow-hidden">
                    {/* Gradient Background */}
                    <div className="absolute inset-x-0 top-0 bottom-0 bg-gradient-to-t from-red-900 via-green-900 to-blue-900 opacity-40"></div>
                    
                    {/* Ticks */}
                    {[-10, -5, 0, 5, 10].map(val => (
                        <div key={val} className="absolute w-full border-t border-gray-500/50 text-[10px] text-gray-300 text-right pr-2 flex items-center justify-end font-bold" 
                             style={{ top: `${50 - (val * 4)}%` }}>
                            {val}°
                        </div>
                    ))}

                    {/* Target Line */}
                    <div className="absolute w-full border-t-2 border-green-400 z-10 box-content" style={{ top: `${50 - (config.targetValue * 4)}%` }}>
                        <span className="absolute right-full mr-2 text-xs text-green-400 font-bold bg-black px-1 border border-green-900">META</span>
                    </div>

                    {/* Current Indicator */}
                    <div className={`absolute w-full h-1 z-20 transition-all duration-700 ease-out ${currentValue === config.targetValue ? 'bg-green-400 shadow-[0_0_15px_#4ade80]' : 'bg-white shadow-[0_0_10px_white]'}`}
                         style={{ top: `${50 - (currentValue * 4)}%` }}>
                         <div className="absolute left-full ml-1 w-0 h-0 border-y-[8px] border-y-transparent border-l-[10px] border-l-white"></div>
                    </div>
                </div>

                {/* Readout */}
                <div className="flex-1 flex flex-col">
                    <div className="flex-1 bg-[#0a0f14] border-2 border-gray-800 p-4 font-mono text-sm text-cyan-400 overflow-y-auto custom-scrollbar shadow-inner relative">
                        <div className="absolute inset-0 scanlines pointer-events-none opacity-20"></div>
                        <div className="text-gray-500 mb-2 border-b border-gray-800 pb-1">--- SYSTEM LOG ---</div>
                        {commands.map((cmd, i) => (
                            <div key={i} className="flex justify-between border-b border-gray-800/30 py-1 font-bold">
                                <span>OP_{i+1}</span>
                                <span className={cmd > 0 ? 'text-cyan-300' : 'text-red-400'}>{cmd > 0 ? `+${cmd}` : cmd}</span>
                            </div>
                        ))}
                        {commands.length === 0 && <div className="text-gray-700 italic text-center mt-10">Esperando input...</div>}
                    </div>
                    
                    <div className="mt-6 text-right">
                        <div className="text-xs text-gray-500 uppercase tracking-widest font-bold mb-1">Temperatura Actual</div>
                        <div className={`text-6xl font-black font-mono tracking-tighter transition-colors ${currentValue === config.targetValue ? 'text-green-400 text-glow-accent' : currentValue < config.targetValue ? 'text-blue-400' : 'text-red-400'}`}>
                            {currentValue}°C
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
        onClick={() => {
          localStorage.removeItem(STORAGE_KEY); 
          onSuccess();
        }}
        className="py-6 text-xl"
      >
        {isComplete ? (
          <span className="flex items-center justify-center gap-2">
            <Check size={28} /> ESTABILIZACIÓN CONFIRMADA
          </span>
        ) : "SISTEMA DESESTABILIZADO - AJUSTAR"}
      </CyberButton>
    </div>
  );
};
