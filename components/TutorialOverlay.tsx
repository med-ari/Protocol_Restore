
import React from 'react';
import { StageId, SectorId } from '../types';
import { CyberButton } from './UI/CyberButton';
import { soundManager } from '../utils/sound';
import { TypewriterText } from './UI/TypewriterText';
import { Bot, Terminal } from 'lucide-react';
import { SECTORS } from '../constants';

interface TutorialOverlayProps {
  stage: StageId;
  onClose: () => void;
  sectorId?: SectorId;
}

export const TutorialOverlay: React.FC<TutorialOverlayProps> = ({ stage, onClose, sectorId }) => {
  
  const getMessage = () => {
      // Generic Fallback
      if (!sectorId) {
          switch(stage) {
            case 'lab': return "A.L.I.: Entorno de pruebas seguro. Ajusta las variables para entender la relación causa-efecto.";
            case 'manual': return "A.L.I.: Base de datos de conocimiento. Aquí encontrarás las reglas axiomáticas del universo.";
            case 'mission': return "A.L.I.: Aplicación práctica. Resuelve la secuencia lógica paso a paso.";
            case 'quiz': return "A.L.I.: Validación final de competencia. Demuestra tu dominio.";
            default: return "A.L.I.: Sistema en espera.";
          }
      }

      // Specific per Sector & Stage
      const contextMessages: Record<string, string> = {
          // INTEGERS
          'integers-lab': "A.L.I.: [TERMODINÁMICA] En este laboratorio, subir temperatura es sumar (+), bajar es restar (-). Observa cómo se cancelan.",
          'integers-manual': "A.L.I.: Revisa la 'Ley de Signos'. Un error común es confundir resta (-5 - 5) con multiplicación (-5 * -5).",
          // RATIONALS
          'rationals-lab': "A.L.I.: [MEZCLAS] Las fracciones son divisiones. 1/4 es dividir un entero en 4 partes. Observa la barra visual.",
          'rationals-manual': "A.L.I.: ¡Atención! Nunca sumes denominadores. Es el error más fatal en la navegación espacial.",
          // PERCENTS
          'percentages-lab': "A.L.I.: [ESCUDOS] 100% es el total. Si bajas al 80%, has perdido 20 partes de 100. Visualízalo en el escudo.",
          'percentages-manual': "A.L.I.: Recuerda que los porcentajes no son reversibles linealmente. Subir 50% y bajar 50% no te deja igual.",
          // POWERS
          'powers-lab': "A.L.I.: [REACTOR] El crecimiento exponencial es explosivo. Un pequeño cambio en el exponente duplica la energía.",
          'powers-manual': "A.L.I.: Revisa la diferencia entre multiplicar potencias (suma exponentes) y elevar potencias (multiplica exponentes).",
          // ROOTS
          'roots-lab': "A.L.I.: [ESCANER] La raíz cuadrada busca el lado de un cuadrado. Si el área es 25, ¿cuánto mide el lado?",
          'roots-manual': "A.L.I.: No distribuyas raíces en sumas. √9 + √16 no es igual a √(9+16)."
      };

      const key = `${sectorId}-${stage}`;
      return contextMessages[key] || "A.L.I.: Analiza los datos del sector para proceder.";
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center pointer-events-none pb-24 px-4">
      <div className="bg-black border-t-4 border-cyber-primary p-6 max-w-3xl w-full pointer-events-auto animate-in slide-in-from-bottom-10 fade-in duration-500 shadow-2xl">
        
        <div className="flex flex-col md:flex-row gap-6 relative z-10">
          <div className="flex-shrink-0 flex flex-col items-center gap-2">
             <div className="w-16 h-16 bg-cyber-primary/10 border border-cyber-primary flex items-center justify-center shadow-[0_0_10px_rgba(0,242,255,0.3)]">
                <Bot className="text-cyber-primary w-8 h-8" />
             </div>
             <span className="text-[10px] font-mono text-cyber-primary tracking-widest bg-cyber-primary/10 px-1">ONLINE</span>
          </div>
          
          <div className="flex-1">
             <div className="flex items-center justify-between mb-3 border-b border-gray-800 pb-2">
                <div className="flex items-center gap-2">
                    <Terminal size={14} className="text-cyber-primary" />
                    <h4 className="text-cyber-primary font-sans font-bold tracking-wider uppercase">Mensaje Prioritario</h4>
                </div>
                <div className="text-xs font-mono text-gray-500">CANAL SEGURO</div>
             </div>
             
             <div className="text-gray-300 font-mono text-lg leading-relaxed min-h-[4rem]">
               <TypewriterText text={getMessage()} speed={15} />
             </div>
             
             <div className="mt-4 flex justify-end">
               <CyberButton onClick={() => { soundManager.playClick(); onClose(); }} variant="primary" className="py-2 px-6 text-xs">
                 ENTENDIDO
               </CyberButton>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};
