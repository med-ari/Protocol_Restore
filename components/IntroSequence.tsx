
import React, { useState, useEffect, useCallback } from 'react';
import { TypewriterText } from './UI/TypewriterText';
import { soundManager } from '../utils/sound';
import { Logo } from './UI/Logo';
import { PixelShip } from './UI/PixelShip';
import { Terminal } from 'lucide-react';
import { PixelSymbol } from './UI/PixelSymbol';

interface IntroSequenceProps {
  onComplete: () => void;
}

export const IntroSequence: React.FC<IntroSequenceProps> = ({ onComplete }) => {
  const [step, setStep] = useState(0);
  const [glimpseIndex, setGlimpseIndex] = useState(0);
  const [showButton, setShowButton] = useState(false);
  
  // Sequence timing management
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    const sequence = async () => {
      if (step === 0) {
        timer = setTimeout(() => setStep(1), 500);
      }
      else if (step === 1) {
        timer = setTimeout(() => setStep(2), 4000);
      }
      else if (step === 2) {
        soundManager.playError();
        timer = setTimeout(() => setStep(3), 4000);
      }
      else if (step === 3) {
        const interval = setInterval(() => {
          setGlimpseIndex(prev => {
            if (prev >= 4) {
              clearInterval(interval);
              setStep(4);
              return 0;
            }
            soundManager.playClick();
            return prev + 1;
          });
        }, 800);
        return () => clearInterval(interval);
      }
    };

    sequence();
    return () => clearTimeout(timer);
  }, [step]);

  // FIX: Memoize callback to prevent re-renders of TypewriterText
  const handleTextComplete = useCallback(() => {
      // Delay button appearance slightly for effect
      setTimeout(() => setShowButton(true), 1000);
  }, []);

  const skip = () => {
    soundManager.playClick();
    onComplete();
  };

  const glimpses = [
    { icon: <PixelSymbol variant="thermometer" size={64} className="text-cyber-primary" />, label: "SECTOR 1: TERMODINÁMICA [Enteros]", color: "text-cyber-primary" },
    { icon: <PixelSymbol variant="fraction" size={64} className="text-green-400" />, label: "SECTOR 2: MEZCLAS [Racionales]", color: "text-green-400" },
    { icon: <PixelSymbol variant="shield" size={64} className="text-purple-400" />, label: "SECTOR 3: ESCUDOS [Porcentajes]", color: "text-purple-400" },
    { icon: <PixelSymbol variant="reactor" size={64} className="text-yellow-400" />, label: "SECTOR 4: REACTOR [Potencias]", color: "text-yellow-400" },
    { icon: <PixelSymbol variant="square" size={64} className="text-red-400" />, label: "SECTOR 5: CARTOGRAFÍA [Raíces]", color: "text-red-400" }
  ];

  return (
    <div className="fixed inset-0 bg-black z-[100] flex flex-col items-center justify-center overflow-hidden font-mono select-none">
      
      {/* Cleaner Background - No Scanlines */}
      <div className="absolute inset-0 bg-radial-gradient from-gray-900 to-black pointer-events-none"></div>

      {/* Skip Button */}
      <button 
        onClick={skip}
        className="absolute top-4 right-4 text-[10px] border border-gray-800 text-gray-600 px-3 py-1 hover:text-cyber-primary hover:border-cyber-primary transition-colors z-50 uppercase tracking-widest bg-black"
      >
        [ SALTAR INTRO ]
      </button>

      {/* MAIN CONTAINER */}
      <div className="relative z-10 w-full max-w-4xl p-6 flex flex-col items-center h-full justify-center">

        {/* PHASE 1: BIOS TEXT */}
        <div className={`
          absolute top-10 left-4 md:left-10 text-xs md:text-sm font-mono space-y-1 text-green-700/80 transition-all duration-1000
          ${step > 1 ? 'opacity-20 blur-[1px]' : 'opacity-100'}
        `}>
          <div className="mb-2">AXIOM-BIOS v.9.0.1 (c) 2142 Galactic Core Inc.</div>
          {step >= 1 && (
            <>
              <div className="animate-[fadeIn_0.5s_forwards]">Memoria base: 64TB... OK</div>
              <div className="animate-[fadeIn_0.5s_forwards_0.5s]">Coprocesadores Lógicos... <span className="text-red-600 font-bold bg-red-900/10 px-1">DAÑADOS</span></div>
              <div className="animate-[fadeIn_0.5s_forwards_1.0s]">Sistema de Navegación... <span className="text-yellow-600 font-bold">OFFLINE</span></div>
              <div className="animate-[fadeIn_0.5s_forwards_1.5s]">Iniciando Módulo de Recuperación...</div>
              <div className="animate-[fadeIn_0.5s_forwards_2.0s] text-cyber-primary mt-2">Cargando A.L.I. (Asistente Lógico)...</div>
            </>
          )}
        </div>

        {/* PHASE 2: SHIP DIAGNOSTIC */}
        {step === 2 && (
          <div className="flex flex-col items-center animate-in zoom-in duration-500">
             <div className="relative w-64 h-64 md:w-80 md:h-80 mb-6">
                <div className="absolute inset-0 border border-red-500/20 rounded-full animate-ping opacity-20"></div>
                <div className="absolute inset-0 border border-cyber-primary/30 rounded-full animate-spin-slow"></div>
                <PixelShip className="w-full h-full text-cyber-primary drop-shadow-[0_0_10px_rgba(0,242,255,0.3)]" damage={true} />
                
                <div className="absolute top-10 right-0 bg-red-900/80 text-red-500 border border-red-500 text-xs px-2 py-1 animate-pulse font-bold">
                   ALERTA DE IMPACTO
                </div>
                <div className="absolute bottom-10 left-0 bg-yellow-900/80 text-yellow-500 border border-yellow-500 text-xs px-2 py-1">
                   INTEGRIDAD 65%
                </div>
             </div>
             <h2 className="text-2xl text-red-500 font-bold tracking-widest animate-pulse bg-black px-4 py-1 border border-red-900">
               DAÑO CRÍTICO DETECTADO
             </h2>
          </div>
        )}

        {/* PHASE 3: GLIMPSES */}
        {step === 3 && (
          <div className="flex flex-col items-center justify-center w-full h-64 animate-in fade-in duration-200">
             <div className="text-gray-500 text-xs tracking-[0.5em] mb-8 uppercase">Escaneando Sectores Dañados...</div>
             
             <div className="relative p-10 border border-gray-700 bg-black shadow-2xl flex flex-col items-center gap-6 w-full max-w-md">
                <div className="absolute top-0 left-0 w-full h-px bg-cyber-primary/50 animate-scan-horizontal"></div>

                <div className="relative z-10 scale-125">
                   {glimpses[glimpseIndex].icon}
                </div>
                
                <div className={`relative z-10 text-xl font-bold font-sans text-center ${glimpses[glimpseIndex].color}`}>
                   {glimpses[glimpseIndex].label}
                </div>
                
                <div className="absolute bottom-2 right-2 text-[10px] text-red-500 font-mono bg-red-900/10 px-1 border border-red-900">
                   REQUERIDO
                </div>
             </div>
          </div>
        )}

        {/* PHASE 4: NARRATIVE & CTA */}
        {step >= 4 && (
          <div className="flex flex-col items-center text-center animate-in slide-in-from-bottom-10 fade-in duration-1000 max-w-2xl bg-black border border-cyber-primary/20 p-8 shadow-2xl">
             
             <div className="mb-6">
                <Logo size={80} className="animate-pulse drop-shadow-[0_0_15px_rgba(0,255,157,0.3)]" />
             </div>
             
             <div className="text-cyber-primary text-xl tracking-[0.2em] uppercase font-bold border-b border-cyber-primary/30 pb-4 mb-6 w-full">
               PROTOCOLO DE EMERGENCIA
             </div>
             
             {/* Fixed Height Container to prevent layout shift */}
             <div className="text-lg md:text-xl leading-relaxed text-gray-300 min-h-[180px] text-left font-mono">
               <TypewriterText 
                 text="La nave AXIOM ha colisionado con el cinturón de asteroides 'Khaos'. La Inteligencia Artificial Central está fragmentada y los sistemas de soporte vital fallan. Solo un piloto con dominio absoluto de la lógica matemática puede restaurar los sectores y salvar a la tripulación." 
                 speed={20}
                 onComplete={handleTextComplete}
               />
             </div>

             <div className={`mt-8 transition-opacity duration-1000 ${showButton ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
               <button 
                 onClick={skip}
                 className="group relative px-10 py-4 bg-cyber-primary/10 border border-cyber-primary text-cyber-primary font-bold text-lg uppercase tracking-widest hover:bg-cyber-primary hover:text-black transition-all shadow-[0_0_20px_rgba(0,242,255,0.1)]"
               >
                 <span className="relative flex items-center gap-3">
                    <Terminal size={20} /> 
                    INICIAR SISTEMA
                 </span>
               </button>
             </div>
          </div>
        )}

      </div>
    </div>
  );
};
