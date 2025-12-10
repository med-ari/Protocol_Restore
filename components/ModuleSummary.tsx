
import React from 'react';
import { CyberCard } from './UI/CyberCard';
import { CyberButton } from './UI/CyberButton';
import { CheckCircle, Trophy, Rocket, Star } from 'lucide-react';
import { TypewriterText } from './UI/TypewriterText';

interface ModuleSummaryProps {
  onRestart: () => void;
}

export const ModuleSummary: React.FC<ModuleSummaryProps> = ({ onRestart }) => {
  return (
    <div className="max-w-4xl mx-auto flex flex-col items-center justify-center min-h-[80vh] animate-in zoom-in-95 duration-1000">
      
      <div className="relative mb-12">
        <div className="absolute -inset-10 bg-cyber-success/20 blur-3xl rounded-full animate-pulse" />
        <Trophy size={120} className="text-cyber-success relative z-10 drop-shadow-[0_0_20px_rgba(0,255,157,0.8)]" />
      </div>

      <h1 className="text-5xl md:text-7xl font-sans font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyber-primary via-white to-cyber-success mb-6 text-center drop-shadow-[0_4px_0px_rgba(0,0,0,1)]">
        MISIÓN CUMPLIDA
      </h1>

      <CyberCard className="w-full max-w-2xl bg-black/90 border-cyber-success shadow-[0_0_40px_rgba(0,255,157,0.2)]">
        <div className="flex items-start gap-4 mb-6">
          <div className="p-3 bg-cyber-success/20 rounded border border-cyber-success">
            <Rocket size={32} className="text-cyber-success" />
          </div>
          <div className="flex-1">
             <h3 className="font-sans text-2xl text-cyber-success mb-2">INFORME DE LA NAVE AXIOM</h3>
             <p className="font-mono text-gray-300 text-lg leading-relaxed">
               <TypewriterText 
                 text="Comandante, todos los sistemas críticos han sido restaurados. La tripulación está a salvo y los motores están al 100%. Gracias a tu dominio de los Números Reales, hemos sobrevivido al Cinturón Khaos." 
                 speed={20} 
               />
             </p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-2 mb-8 border-t border-gray-800 pt-6">
           {['INTEGERS', 'RATIONALS', 'PERCENTS', 'POWERS', 'ROOTS'].map((s, i) => (
             <div key={i} className="flex flex-col items-center gap-2 opacity-0 animate-in slide-in-from-bottom-4 fade-in fill-mode-forwards" style={{ animationDelay: `${2 + i * 0.2}s` }}>
               <div className="w-12 h-12 rounded-full bg-cyber-success/20 border-2 border-cyber-success flex items-center justify-center shadow-[0_0_10px_#00ff9d]">
                 <Star size={20} className="text-cyber-success fill-cyber-success" />
               </div>
               <span className="text-[10px] font-mono text-gray-400 tracking-widest">{s}</span>
             </div>
           ))}
        </div>

        <p className="text-center font-mono text-cyber-primary text-sm uppercase tracking-[0.2em] animate-pulse">
          Módulo 1: Números Reales [COMPLETADO]
        </p>
      </CyberCard>
      
      <div className="mt-12 w-full max-w-md">
        <CyberButton variant="primary" fullWidth onClick={onRestart} className="py-6 text-xl">
          REGRESAR AL MENÚ PRINCIPAL
        </CyberButton>
      </div>
    </div>
  );
};
