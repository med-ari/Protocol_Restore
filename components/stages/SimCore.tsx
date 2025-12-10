
import React, { useState, useEffect } from 'react';
import { Question, SectorId } from '../../types';
import { CyberButton } from '../UI/CyberButton';
import { PixelSymbol } from '../UI/PixelSymbol';
import { soundManager } from '../../utils/sound';
import { MathText } from '../UI/MathText';
import { SECTORS } from '../../constants';

interface SimCoreProps {
  questions: Question[];
  onComplete: () => void;
  setDynamicHint: (hint: string | null) => void;
  sectorId?: SectorId;
}

export const SimCore: React.FC<SimCoreProps> = ({ questions, onComplete, setDynamicHint, sectorId }) => {
  const [activeQuestions, setActiveQuestions] = useState<Question[]>([]);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [feedbackText, setFeedbackText] = useState("");
  
  const [xp, setXp] = useState(0);
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    const initQuiz = () => {
      let quizSet = [...questions];
      if (sectorId) {
         const allIds = Object.keys(SECTORS);
         const currentIndex = allIds.indexOf(sectorId);
         
         if (currentIndex > 0) {
             const randomPrevIndex = Math.floor(Math.random() * currentIndex);
             const prevSectorId = allIds[randomPrevIndex] as SectorId;
             const prevQuestions = SECTORS[prevSectorId].quiz.questions;
             
             if (prevQuestions.length > 0) {
                 const randomQ = prevQuestions[Math.floor(Math.random() * prevQuestions.length)];
                 const reviewQ = {
                     ...randomQ,
                     hint: `[REPASO: ${SECTORS[prevSectorId].symbol}] ${randomQ.hint}`,
                     id: `review-${randomQ.id}` 
                 };
                 const insertPos = Math.floor(Math.random() * (quizSet.length + 1));
                 quizSet.splice(insertPos, 0, reviewQ); 
             }
         }
      }
      setActiveQuestions(quizSet);
    };

    if (activeQuestions.length === 0) {
        initQuiz();
    }
  }, [questions, sectorId]);

  const currentQuestion = activeQuestions[currentQIndex];

  if (!currentQuestion) return <div>Inicializando Simulación...</div>;

  const handleOptionSelect = (optionId: string) => {
    if (isCorrect === true) return;
    soundManager.playClick();
    setSelectedOption(optionId);
  };

  const handleSubmit = () => {
    if (!selectedOption) return;

    const option = currentQuestion.options.find(o => o.id === selectedOption);
    
    if (option?.isCorrect) {
      setIsCorrect(true);
      soundManager.playSuccess();
      
      const streakBonus = streak * 50;
      const points = 100 + streakBonus;
      setXp(prev => prev + points);
      setStreak(prev => prev + 1);

      setFeedbackText(option.feedback || "Respuesta Correcta.");
      setDynamicHint("Datos procesados correctamente. Sistema sincronizado.");
      
      setTimeout(() => {
        if (currentQIndex < activeQuestions.length - 1) {
          setCurrentQIndex(prev => prev + 1);
          setSelectedOption(null);
          setIsCorrect(null);
          setDynamicHint(null);
        } else {
          onComplete();
        }
      }, 2000);
      
    } else {
      setIsCorrect(false);
      soundManager.playError();
      setStreak(0);
      
      setFeedbackText(option?.feedback || "Error de lógica.");
      setDynamicHint(`¡Error! ${option?.feedback}`);
      setShowFeedbackModal(true);
    }
  };

  const handleRetry = () => {
    soundManager.playClick();
    setShowFeedbackModal(false);
    setSelectedOption(null);
    setIsCorrect(null);
    setDynamicHint(currentQuestion.hint); 
  };

  const isReview = currentQuestion.id.startsWith('review');

  return (
    <div className="relative min-h-[600px] bg-black border-2 border-gray-800 p-6 flex flex-col justify-between overflow-hidden shadow-2xl">
      
      <div className="absolute top-0 right-0 w-32 h-32 bg-cyber-primary/5 rounded-full blur-3xl pointer-events-none"></div>

      {/* HUD HEADER */}
      <div className="flex justify-between items-start border-b-2 border-gray-800 pb-4 mb-6 relative z-10">
        <div>
           <div className="flex items-center gap-2 mb-1">
             <PixelSymbol variant="terminal" size={18} className="text-cyber-primary" />
             <span className="font-mono text-sm text-cyber-primary font-bold tracking-widest">SIM-CORE v9.0</span>
           </div>
           <div className="flex items-center gap-3">
              <span className={`text-xs font-bold px-2 py-0.5 rounded-sm ${currentQuestion.difficulty === 'HARD' ? 'bg-red-900 text-red-300' : 'bg-gray-800 text-gray-300'}`}>
                {currentQuestion.difficulty}
              </span>
              {isReview && (
                  <span className="text-xs font-bold px-2 py-0.5 bg-yellow-900 text-yellow-300 flex items-center gap-1">
                      <PixelSymbol variant="undo" size={10} /> REPASO
                  </span>
              )}
           </div>
        </div>

        <div className="text-right">
           <div className="font-mono text-2xl font-bold text-cyber-primary flex items-center justify-end gap-2">
              <PixelSymbol variant="zap" size={20} className={streak > 1 ? 'animate-pulse text-yellow-400' : ''} />
              {xp}
           </div>
           {streak > 1 && (
               <div className="text-xs text-yellow-400 font-bold animate-bounce">
                   RACHA x{streak}
               </div>
           )}
        </div>
      </div>

      {/* QUESTION AREA */}
      <div className="flex-1 relative z-10">
         <div className="bg-gray-900/50 p-6 border-l-4 border-cyber-primary mb-8">
            <p className="font-mono text-xl md:text-2xl text-gray-100 leading-relaxed">
               <MathText text={currentQuestion.text} />
            </p>
         </div>

         <div className="space-y-4">
            {currentQuestion.options.map((opt) => (
                <button
                   key={opt.id}
                   onClick={() => handleOptionSelect(opt.id)}
                   disabled={isCorrect === true}
                   className={`
                      w-full p-4 text-left border-2 transition-all duration-200 font-mono text-lg flex justify-between items-center group
                      ${selectedOption === opt.id 
                         ? isCorrect === true
                           ? 'bg-cyber-success/20 border-cyber-success text-cyber-success'
                           : isCorrect === false
                             ? 'bg-cyber-alert/20 border-cyber-alert text-cyber-alert'
                             : 'bg-cyber-primary/20 border-cyber-primary text-white'
                         : 'bg-black border-gray-700 hover:border-gray-500 text-gray-400 hover:text-white'
                      }
                   `}
                >
                   <span className="flex items-center gap-4">
                      <span className={`font-bold w-8 h-8 flex items-center justify-center border rounded-sm text-sm ${selectedOption === opt.id ? 'border-current' : 'border-gray-700 bg-gray-900'}`}>
                          {opt.id.toUpperCase()}
                      </span>
                      <MathText text={opt.text} />
                   </span>
                   
                   {selectedOption === opt.id && isCorrect === true && <PixelSymbol variant="check" className="animate-bounce" size={24} />}
                   {selectedOption === opt.id && isCorrect === false && <PixelSymbol variant="alert" className="animate-pulse" size={24} />}
                </button>
            ))}
         </div>
      </div>

      {/* FEEDBACK MODAL */}
      {showFeedbackModal && (
          <div className="absolute inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-6 animate-in fade-in zoom-in-95 duration-200">
              <div className="bg-gray-900 border-2 border-cyber-alert p-6 max-w-md w-full shadow-[0_0_50px_rgba(255,0,85,0.3)]">
                  <div className="flex items-center gap-3 text-cyber-alert mb-4 border-b border-cyber-alert/30 pb-3">
                      <PixelSymbol variant="alert" size={32} />
                      <h3 className="font-bold text-xl uppercase tracking-widest">Fallo de Lógica</h3>
                  </div>
                  <p className="font-mono text-gray-300 text-lg mb-8 leading-relaxed">
                      {feedbackText}
                  </p>
                  <CyberButton onClick={handleRetry} fullWidth variant="accent">
                      REINTENTAR SIMULACIÓN
                  </CyberButton>
              </div>
          </div>
      )}

      <div className="mt-8 border-t border-gray-800 pt-6 flex justify-between items-center relative z-10">
         <div className="text-gray-600 font-mono text-sm">
            PROGRESO: {currentQIndex + 1} / {activeQuestions.length}
         </div>
         <div className="w-1/2">
            <CyberButton 
               onClick={handleSubmit} 
               disabled={!selectedOption || isCorrect === true} 
               fullWidth
               variant={isCorrect === true ? 'success' : 'primary'}
            >
               {isCorrect === true ? 'SIGUIENTE SECTOR' : 'CONFIRMAR RESPUESTA'}
            </CyberButton>
         </div>
      </div>

    </div>
  );
};
