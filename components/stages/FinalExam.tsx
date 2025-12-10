

import React, { useState } from 'react';
import { CyberCard } from '../UI/CyberCard';
import { CyberButton } from '../UI/CyberButton';
import { ShieldAlert, ShieldCheck, Terminal, BrainCircuit, Activity } from 'lucide-react';
import { soundManager } from '../../utils/sound';
import { FINAL_EXAM_QUESTIONS } from '../../constants';
import { MathText } from '../UI/MathText';

interface FinalExamProps {
  onComplete: () => void;
}

export const FinalExam: React.FC<FinalExamProps> = ({ onComplete }) => {
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [feedback, setFeedback] = useState<string>("");
  const [score, setScore] = useState(0);

  const currentQuestion = FINAL_EXAM_QUESTIONS[currentQIndex];

  const handleSelect = (id: string) => {
      if (selectedOption) return; // Lock choice
      soundManager.playClick();
      setSelectedOption(id);
      
      const option = currentQuestion.options.find(o => o.id === id);
      const correct = option?.isCorrect || false;
      
      setIsCorrect(correct);
      setFeedback(option?.feedback || "");

      if (correct) {
          soundManager.playSuccess();
          setScore(prev => prev + 1);
      } else {
          soundManager.playError();
      }
  };

  const handleNext = () => {
      soundManager.playClick();
      if (currentQIndex < FINAL_EXAM_QUESTIONS.length - 1) {
          setCurrentQIndex(prev => prev + 1);
          setSelectedOption(null);
          setIsCorrect(null);
          setFeedback("");
      } else {
          onComplete();
      }
  };

  const progress = ((currentQIndex) / FINAL_EXAM_QUESTIONS.length) * 100;

  return (
    <div className="max-w-4xl mx-auto min-h-screen flex flex-col justify-center py-8">
        <div className="mb-8 text-center animate-in slide-in-from-top-4">
             <BrainCircuit className="w-16 h-16 text-cyber-accent mx-auto mb-4 animate-pulse" />
             <h1 className="text-4xl font-sans text-cyber-accent text-glow">EXAMEN FINAL: PROTOCOLO OMEGA</h1>
             <p className="text-gray-400 font-mono mt-2">Demuestra tu dominio total de los sistemas numéricos.</p>
        </div>

        <CyberCard className="relative min-h-[500px] flex flex-col justify-between border-cyber-accent">
             {/* Progress Bar */}
             <div className="absolute top-0 left-0 right-0 h-1 bg-gray-800">
                 <div className="h-full bg-cyber-accent transition-all duration-500" style={{ width: `${progress}%` }} />
             </div>

             <div className="pt-6">
                 <div className="flex justify-between items-center mb-6">
                     <span className="font-mono text-cyber-accent font-bold">PREGUNTA {currentQIndex + 1} / {FINAL_EXAM_QUESTIONS.length}</span>
                     <span className="font-mono text-gray-500 text-sm">PUNTAJE: {score}</span>
                 </div>

                 <div className="bg-black/80 p-8 border-l-4 border-cyber-accent mb-8 shadow-lg">
                     <p className="font-mono text-2xl md:text-3xl text-white leading-relaxed"><MathText text={currentQuestion.text} /></p>
                 </div>

                 <div className="space-y-6">
                     {currentQuestion.options.map((opt) => (
                         <button
                            key={opt.id}
                            onClick={() => handleSelect(opt.id)}
                            disabled={selectedOption !== null}
                            className={`
                                w-full p-6 text-left border-2 transition-all font-mono flex items-center justify-between text-xl
                                ${selectedOption === opt.id 
                                    ? isCorrect && opt.isCorrect 
                                        ? 'bg-cyber-success/20 border-cyber-success text-cyber-success' 
                                        : 'bg-cyber-alert/20 border-cyber-alert text-cyber-alert'
                                    : 'bg-gray-900/80 border-gray-600 hover:border-gray-400 text-gray-200'
                                }
                                ${selectedOption !== null && opt.isCorrect ? 'border-cyber-success text-cyber-success ring-2 ring-cyber-success/30' : ''} 
                            `}
                         >
                             <span><MathText text={opt.text} /></span>
                             {selectedOption === opt.id && (
                                 opt.isCorrect ? <ShieldCheck size={28} /> : <ShieldAlert size={28} />
                             )}
                         </button>
                     ))}
                 </div>
             </div>

             {/* Feedback Area */}
             {selectedOption && (
                 <div className="mt-8 animate-in slide-in-from-bottom-2">
                     <div className={`p-6 rounded border ${isCorrect ? 'bg-cyber-success/10 border-cyber-success text-cyber-success' : 'bg-cyber-alert/10 border-cyber-alert text-cyber-alert'}`}>
                         <div className="font-bold flex items-center gap-2 mb-2 text-lg">
                             {isCorrect ? <Activity /> : <ShieldAlert />}
                             {isCorrect ? "ANÁLISIS CORRECTO" : "ERROR DE LÓGICA"}
                         </div>
                         <p className="font-mono text-lg">{feedback}</p>
                     </div>
                     <CyberButton onClick={handleNext} fullWidth className="mt-6 text-xl py-4" variant={isCorrect ? 'success' : 'primary'}>
                         {currentQIndex === FINAL_EXAM_QUESTIONS.length - 1 ? "FINALIZAR SIMULACIÓN" : "SIGUIENTE RETO"}
                     </CyberButton>
                 </div>
             )}
        </CyberCard>
    </div>
  );
};
