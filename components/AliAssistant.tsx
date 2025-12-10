
import React, { useState, useEffect } from 'react';
import { PixelSymbol } from './UI/PixelSymbol';
import { TypewriterText } from './UI/TypewriterText';
import { soundManager } from '../utils/sound';
import { SectorId, StageId } from '../types';

interface AliAssistantProps {
  hint: string;
  currentSectorId: SectorId | null;
  currentStage: StageId;
}

export const AliAssistant: React.FC<AliAssistantProps> = ({ hint, currentSectorId, currentStage }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [prevHint, setPrevHint] = useState('');
  const [mode, setMode] = useState<'HINT' | 'CHAT'>('HINT');
  const [customResponse, setCustomResponse] = useState<string | null>(null);
  const [hasUnread, setHasUnread] = useState(false);
  const [isThinking, setIsThinking] = useState(false);

  // Auto-notification logic
  useEffect(() => {
    if (hint && hint !== prevHint) {
      setPrevHint(hint);
      setCustomResponse(null);
      setMode('HINT');
      soundManager.playMessage();
      setHasUnread(true); 
    }
  }, [hint, prevHint]);

  useEffect(() => {
      if (isOpen) setHasUnread(false);
  }, [isOpen]);

  const handleQuestion = (qId: string) => {
    soundManager.playClick();
    setIsThinking(true);
    setMode('CHAT');
    
    setTimeout(() => {
        setIsThinking(false);
        setCustomResponse(getContextualResponse(qId));
    }, 500);
  };

  const getContextualResponse = (qId: string): string => {
    if (qId === 'who') return "A.L.I.: Soy la Inteligencia Lógica Artificial. Mi CPU está al 40% de capacidad. Necesito tus cálculos para operar.";
    
    if (qId === 'status') {
        if (!currentSectorId) return "A.L.I.: [ESTADO] NAVE EN PELIGRO. Selecciona un sector.";
        return `A.L.I.: [ESTADO] Sector ${currentSectorId.toUpperCase()} inestable. Etapa actual: ${currentStage.toUpperCase()}.`;
    }
    
    if (qId === 'help') {
        if (!currentSectorId) return "A.L.I.: Inicia una misión en el Dashboard.";
        
        switch (currentSectorId) {
            case 'integers': return "A.L.I.: [CONSEJO] Si tienes dudas con signos, dibuja una recta. Moverse a la izquierda es restar, a la derecha es sumar.";
            case 'rationals': return "A.L.I.: [CONSEJO] El denominador (abajo) es el tamaño de la rebanada. No puedes sumar rebanadas de distinto tamaño.";
            case 'percentages': return "A.L.I.: [CONSEJO] 'Por Ciento' significa 'Por cada 100'. 5% es 5 de cada 100 (0.05).";
            case 'powers': return "A.L.I.: [CONSEJO] Exponente negativo = Inversión (1/x). Potencia cero = 1.";
            case 'roots': return "A.L.I.: [CONSEJO] La raíz busca el lado de un cuadrado. √Área = Lado.";
            default: return "A.L.I.: Revisa el manual del sector.";
        }
    }
    return "A.L.I.: Error de sintaxis.";
  };

  const currentText = mode === 'CHAT' && customResponse ? customResponse : hint;
  const isErrorHint = hint.toLowerCase().includes("error") || hint.toLowerCase().includes("incorrecto");

  return (
    <>
      {/* Chat Window - Hard Edges, Terminal Style */}
      {isOpen && (
        <div className="fixed bottom-24 right-4 md:right-12 z-[100] w-[calc(100%-2rem)] md:w-96 animate-in slide-in-from-bottom-5 fade-in duration-300">
          <div className="bg-black border-2 border-cyber-primary shadow-[8px_8px_0px_0px_rgba(0,242,255,0.2)] flex flex-col font-mono">
            
            {/* Header */}
            <div className={`flex items-center gap-2 p-2 border-b-2 border-cyber-primary ${isErrorHint ? 'bg-red-900/30' : 'bg-cyber-primary/10'}`}>
              <PixelSymbol variant="bot" size={20} className={isErrorHint ? 'text-red-500' : 'text-cyber-primary'} />
              <span className={`text-xs font-bold tracking-widest ${isErrorHint ? 'text-red-400' : 'text-cyber-primary'}`}>
                  A.L.I. TERMINAL {isErrorHint ? '[ALERTA]' : '[ONLINE]'}
              </span>
              <button onClick={() => setIsOpen(false)} className="ml-auto text-gray-500 hover:text-white">
                <PixelSymbol variant="x" size={16} />
              </button>
            </div>

            {/* Content */}
            <div className="p-4 bg-black min-h-[8rem] max-h-[40vh] overflow-y-auto">
                {isThinking ? (
                    <div className="flex items-center gap-2 text-cyber-primary animate-pulse text-sm">
                        <PixelSymbol variant="refresh" size={14} className="animate-spin" /> COMPUTANDO...
                    </div>
                ) : (
                    <div className={`text-md leading-snug ${isErrorHint ? 'text-red-300' : 'text-cyber-text'}`}>
                      <TypewriterText key={currentText} text={currentText} speed={10} />
                    </div>
                )}
            </div>

            {/* Actions */}
            <div className="border-t border-gray-800 p-2 grid grid-cols-2 gap-2 bg-gray-900">
                {[
                    { id: 'help', label: 'SOLICITAR PISTA' },
                    { id: 'status', label: 'ESTADO NAVE' },
                    { id: 'who', label: 'IDENTIDAD' }
                ].map(action => (
                    <button 
                        key={action.id}
                        onClick={() => handleQuestion(action.id)} 
                        className="flex items-center gap-2 text-[10px] text-cyber-primary hover:bg-cyber-primary hover:text-black p-2 border border-gray-700 transition-colors uppercase tracking-wider"
                    >
                        <PixelSymbol variant="terminal" size={12} /> {action.label}
                    </button>
                ))}
            </div>
          </div>
        </div>
      )}

      {/* FAB - Sharp Square */}
      <button
        onClick={() => {
          if (!isOpen) soundManager.playClick();
          setIsOpen(!isOpen);
        }}
        className={`
          fixed bottom-6 right-6 md:right-12 z-[100] 
          w-14 h-14 
          flex items-center justify-center 
          border-2 
          bg-black 
          transition-all duration-100 
          active:translate-y-1 active:translate-x-1 active:shadow-none
          group
          ${isOpen ? 'border-gray-500' : 'border-cyber-primary hover:bg-cyber-primary shadow-[4px_4px_0px_0px_rgba(0,242,255,0.4)]'}
          ${hasUnread && !isOpen ? 'animate-bounce border-white' : ''}
        `}
      >
        {isOpen ? (
           <PixelSymbol variant="x" size={24} className="text-gray-400 group-hover:text-black" />
        ) : (
           <div className="relative">
             <PixelSymbol variant="message" size={24} className={`text-cyber-primary group-hover:text-black ${hasUnread ? 'text-white' : ''}`} />
             {hasUnread && (
                 <span className="absolute -top-3 -right-3 flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full bg-cyber-alert opacity-75"></span>
                    <span className="relative inline-flex h-3 w-3 bg-cyber-alert"></span>
                 </span>
             )}
           </div>
        )}
      </button>
    </>
  );
};
