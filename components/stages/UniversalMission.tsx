
import React, { useState, useEffect } from 'react';
import { CyberCard } from '../UI/CyberCard';
import { CyberButton } from '../UI/CyberButton';
import { MissionStep, SectorId } from '../../types';
import { PixelSymbol } from '../UI/PixelSymbol';
import { soundManager } from '../../utils/sound';
import { MathText } from '../UI/MathText';
import { ParticleBurst } from '../UI/ParticleBurst';
import { SECTOR_THEMES } from '../../constants';

interface MissionProps {
  config: {
    steps: MissionStep[];
  };
  onSuccess: () => void;
  setDynamicHint: (hint: string | null) => void;
  sectorId?: SectorId;
}

export const UniversalMission: React.FC<MissionProps> = ({ config, onSuccess, setDynamicHint, sectorId }) => {
  const [inputs, setInputs] = useState<Record<string, string>>({});
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const theme = sectorId ? SECTOR_THEMES[sectorId] : SECTOR_THEMES.integers;

  useEffect(() => {
    setInputs({});
    setFeedback(null);
    setIsSuccess(false);
    setDynamicHint(null);
  }, [config, setDynamicHint]);

  const handleChange = (id: string, val: string) => {
    setInputs(prev => ({ ...prev, [id]: val }));
    setFeedback(null); 
    setDynamicHint(null); 
  };

  const analyzeError = (userVal: number, correctVal: number, stepLabel: string): string => {
    const diff = Math.abs(userVal - correctVal);
    const absUser = Math.abs(userVal);
    const absCorrect = Math.abs(correctVal);

    if (absUser === absCorrect && userVal !== correctVal) {
      return "ERROR DE SIGNO: La magnitud es correcta, pero el signo es opuesto. ¿Recuerdas qué sucede al multiplicar dos negativos?";
    }

    if (correctVal !== 0) {
      const ratio = userVal / correctVal;
      if (Math.abs(ratio - 10) < 0.001 || Math.abs(ratio - 0.1) < 0.001) {
        return "ERROR DE FORMATO: Revisa la posición de la coma decimal. ¿Te has movido un espacio de más?";
      }
    }

    if (correctVal !== 0 && userVal !== 0) {
       if (Math.abs(userVal - (1 / correctVal)) < 0.001) {
         return "ERROR DE PROPIEDAD: ¿Confundiste un exponente negativo con una inversión?";
       }
    }

    if (diff < Math.abs(correctVal * 0.1) || diff < 0.5) {
      return "PRECISIÓN INSUFICIENTE: Estás muy cerca. ¿Verificaste el redondeo o el último dígito?";
    }
    
    if (sectorId === 'rationals') {
        if (Math.abs(userVal - 0.333) < 0.01 && correctVal === 0.75) {
            return "ERROR CRÍTICO DE MEZCLA: ¡Has sumado los denominadores! (2+4=6). Nunca cambies el tamaño del contenedor al sumar. Usa el MCM.";
        }
        if (Math.abs(userVal - (1/correctVal)) < 0.01) {
            return "INVERSIÓN DETECTADA: Has invertido el numerador y denominador.";
        }
    }

    if (sectorId === 'integers') {
        if (userVal > correctVal) return "CÁLCULO INCORRECTO: El resultado debería ser menor. ¿Restaste correctamente los valores negativos?";
        if (userVal < correctVal) return "CÁLCULO INCORRECTO: El resultado debería ser mayor.";
    }
    
    if (absCorrect > 0 && (absUser > absCorrect * 10 || absUser < absCorrect / 10)) {
       return "ERROR DE MAGNITUD: El resultado está en una escala completamente diferente. Revisa la operación base.";
    }

    return "INCONSISTENCIA DETECTADA: Revisa los pasos anteriores. ¿Has seguido el orden PAPOMUDAS?";
  };

  const checkAnswers = () => {
    soundManager.playClick();
    let allCorrect = true;
    let firstErrorStep: MissionStep | null = null;
    let userErrorValue: number | null = null;

    config.steps.forEach((step) => {
      const rawVal = inputs[step.id] || "";
      const userVal = parseFloat(rawVal.replace(',', '.'));
      
      if (isNaN(userVal) || Math.abs(userVal - step.correctValue) > 0.001) {
        allCorrect = false;
        if (!firstErrorStep) {
            firstErrorStep = step;
            userErrorValue = userVal;
        }
      }
    });

    if (allCorrect) {
      setIsSuccess(true);
      soundManager.playSuccess();
      setFeedback(null);
      setDynamicHint("¡Datos verificados! Sistemas sincronizados.");
    } else {
      soundManager.playError();
      
      const step = firstErrorStep!;
      const correct = step.correctValue;
      const userVal = userErrorValue;

      let specificHint = step.errorFeedback;
      
      if (!specificHint && userVal !== null && !isNaN(userVal)) {
          specificHint = analyzeError(userVal, correct, step.label);
      } else if (!specificHint) {
          specificHint = "VALOR INVÁLIDO: Ingresa un número para procesar la secuencia.";
      }
      
      setFeedback(specificHint);
      setDynamicHint(specificHint);
    }
  };

  const getIconVariant = (idx: number): any => {
    const variants = {
      integers: ['thermometer', 'info', 'alert'],
      rationals: ['fraction', 'info', 'alert'],
      percentages: ['shield', 'alert', 'info'],
      powers: ['reactor', 'zap', 'info'],
      roots: ['square', 'info', 'alert']
    };
    
    const set = variants[sectorId as keyof typeof variants] || ['info', 'info', 'info'];
    return set[idx % set.length];
  }

  return (
    <div className="relative">
      {isSuccess && <ParticleBurst />}
      
      <div className="space-y-6">
        {config.steps.map((step, index) => (
          <CyberCard key={step.id} className={`transition-all duration-300 ${isSuccess ? 'border-cyber-success bg-cyber-success/5' : `border-gray-700 ${theme.borderColor}/30`}`}>
             <div className="flex flex-col md:flex-row gap-6 items-start">
               <div className={`flex-shrink-0 mt-1 p-2 bg-black border rounded ${theme.borderColor}`}>
                 <PixelSymbol variant={getIconVariant(index)} className={theme.baseColor} size={20} />
               </div>

               <div className="flex-1 w-full">
                 <h4 className={`font-mono text-sm ${theme.baseColor} mb-2 uppercase tracking-widest border-b border-gray-800 pb-1`}>
                   Paso de Secuencia {index + 1}
                 </h4>
                 <div className="text-lg md:text-xl font-mono text-gray-200 mb-4 leading-relaxed whitespace-pre-wrap">
                   <MathText text={step.label} />
                 </div>
                 
                 <div className="flex items-center gap-4">
                   <div className="relative flex-1">
                     <input 
                        type="text"
                        placeholder={step.placeholder || "Ingresar valor..."}
                        value={inputs[step.id] || ''}
                        onChange={(e) => handleChange(step.id, e.target.value)}
                        disabled={isSuccess}
                        className={`
                          w-full bg-black/50 border-2 p-3 font-mono text-lg outline-none transition-all
                          ${isSuccess 
                            ? 'border-cyber-success text-cyber-success' 
                            : `${theme.borderColor} text-white focus:${theme.borderColor} focus:${theme.shadowColor}`}
                        `}
                     />
                     <div className={`absolute top-0 right-0 w-2 h-2 border-t border-r ${theme.borderColor} pointer-events-none`}></div>
                     <div className={`absolute bottom-0 left-0 w-2 h-2 border-b border-l ${theme.borderColor} pointer-events-none`}></div>
                   </div>
                   
                   {isSuccess && <PixelSymbol variant="check" className="text-cyber-success animate-in zoom-in" size={28} />}
                 </div>
               </div>
             </div>
          </CyberCard>
        ))}
      </div>

      {feedback && (
        <div className="mt-6 p-4 border-l-4 border-cyber-alert bg-cyber-alert/10 animate-in slide-in-from-left-2 shadow-[0_0_20px_rgba(255,0,85,0.2)]">
           <div className="flex items-center gap-2 text-cyber-alert font-bold mb-1">
             <PixelSymbol variant="alert" size={18} />
             <span>ERROR DE CÁLCULO</span>
           </div>
           <p className="font-mono text-white">{feedback}</p>
        </div>
      )}

      <div className="mt-8">
        {isSuccess ? (
           <CyberButton onClick={onSuccess} variant="success" fullWidth className="text-xl py-6 animate-pulse">
             PROCEDER A VALIDACIÓN <PixelSymbol variant="chevron-right" className="inline ml-2" size={20} />
           </CyberButton>
        ) : (
           <CyberButton onClick={checkAnswers} variant="primary" fullWidth className="text-xl py-6">
             EJECUTAR DIAGNÓSTICO
           </CyberButton>
        )}
      </div>
    </div>
  );
};
