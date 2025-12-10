
import React, { useState, useEffect } from 'react';
import { SectorData, StageId } from '../types';
import { CyberButton } from './UI/CyberButton';
import { CyberCard } from './UI/CyberCard';
import { AlertTriangle, ArrowRight, ChevronDown, ChevronUp, BrainCircuit, Lightbulb, Map, Check, X } from 'lucide-react';
import { PixelSymbol } from './UI/PixelSymbol';
import { ConceptAnimation } from './stages/ConceptAnimation';
import { TutorialOverlay } from './TutorialOverlay';
import { MathText } from './UI/MathText';
import { soundManager } from '../utils/sound';
import { SECTOR_THEMES } from '../constants';

// Sub-components
import { LabSector1 } from './stages/LabSector1';
import { LabSector2 } from './stages/LabSector2';
import { LabSector3 } from './stages/LabSector3';
import { LabSector4 } from './stages/LabSector4';
import { LabSector5 } from './stages/LabSector5';
import { LabLinearFunctions } from './stages/LabLinearFunctions';
import { LabAlgebraic } from './stages/LabAlgebraic';
import { LabFactorization } from './stages/LabFactorization';
import { UniversalMission } from './stages/UniversalMission';
import { SimCore } from './stages/SimCore';

interface SectorViewProps {
  sector: SectorData;
  currentStage: StageId;
  onStageChange: (stage: StageId) => void;
  onComplete: () => void;
  setDynamicHint: (hint: string | null) => void;
  isCompleted?: boolean;
}

export const SectorView: React.FC<SectorViewProps> = ({ sector, currentStage, onStageChange, onComplete, setDynamicHint, isCompleted = false }) => {
  const [showTutorial, setShowTutorial] = useState(false);
  const [seenTutorials, setSeenTutorials] = useState<string[]>([]);
  
  const [hookStep, setHookStep] = useState<'intro' | 'question'>('intro');
  const [hookFeedback, setHookFeedback] = useState<'correct' | 'wrong' | null>(null);

  const theme = SECTOR_THEMES[sector.id];

  useEffect(() => {
    const tutorialStages = ['lab', 'manual', 'mission', 'quiz'];
    if (tutorialStages.includes(currentStage) && !seenTutorials.includes(currentStage)) {
         const timer = setTimeout(() => setShowTutorial(true), 500);
         return () => clearTimeout(timer);
    }
    setShowTutorial(false);
  }, [currentStage, seenTutorials]);

  const closeTutorial = () => {
    setShowTutorial(false);
    setSeenTutorials(prev => [...prev, currentStage]);
  };

  const NavTabs = () => {
    if (!isCompleted && sector.id !== 'mini_test_numbers') return null;
    
    const tabs: StageId[] = sector.id === 'mini_test_numbers' 
        ? ['hook', 'manual', 'quiz'] 
        : ['hook', 'lab', 'manual', 'mission', 'quiz'];

    return (
        <div className="w-full max-w-5xl mx-auto mb-8 animate-in slide-in-from-top-4">
             <div className="flex items-center gap-1 border-b-2 border-gray-800 bg-black/50 p-1 overflow-x-auto custom-scrollbar">
                <div className="px-3 py-2 text-xs font-mono text-gray-500 uppercase flex items-center gap-2 border-r border-gray-800 mr-2 shrink-0">
                    <Map size={14} /> NAV TÁCTICA
                </div>
                {tabs.map(stage => (
                    <button
                        key={stage}
                        onClick={() => { soundManager.playClick(); onStageChange(stage); }}
                        className={`
                            px-4 py-2 text-xs font-bold font-mono uppercase tracking-widest border transition-colors shrink-0
                            ${currentStage === stage 
                                ? `bg-${theme.baseColor.split('-')[1]}-900/30 border-${theme.borderColor} ${theme.baseColor}` 
                                : 'bg-transparent border-transparent text-gray-500 hover:text-white hover:bg-gray-800'}
                        `}
                    >
                        {stage === 'hook' ? 'ALERTA' : stage}
                    </button>
                ))}
             </div>
        </div>
    );
  };

  const renderHook = () => {
    if (sector.id === 'integers') {
        return (
            <div className="max-w-3xl mx-auto animate-in zoom-in-95 duration-500">
                <div className="flex justify-center mb-8">
                    <div className={`p-6 border-2 ${theme.borderColor} bg-black shadow-[0_0_30px_rgba(0,242,255,0.15)]`}>
                       <AlertTriangle className={`w-20 h-20 ${theme.baseColor} animate-pulse`} />
                    </div>
                </div>

                {hookStep === 'intro' ? (
                    <div className="animate-in slide-in-from-right-4 fade-in">
                        <CyberCard title={sector.hook.title} className={`mb-8 ${theme.borderColor}`}>
                            <p className="text-xl md:text-2xl leading-relaxed font-mono text-gray-200">
                                <MathText text={sector.hook.message} themeColor={theme.baseColor} />
                            </p>
                        </CyberCard>
                        <CyberButton onClick={() => setHookStep('question')} fullWidth variant="primary" className="text-lg">
                            ANALIZAR ANOMALÍA
                        </CyberButton>
                    </div>
                ) : (
                    <div className="animate-in slide-in-from-right-4 fade-in">
                        <CyberCard title="DIAGNÓSTICO INICIAL: A.L.I." className={`mb-8 ${theme.borderColor}`}>
                            <p className="text-lg md:text-xl font-mono mb-6 text-gray-300">
                                "Comandante, calibración requerida. Si la temperatura es <strong>-5°C</strong> y desciende <strong>3°C</strong> más, ¿cuál es el estado final?"
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <button 
                                    onClick={() => { soundManager.playError(); setHookFeedback('wrong'); }}
                                    className="p-6 border-2 border-gray-700 hover:border-red-500 bg-black hover:bg-red-900/10 text-xl font-mono transition-all text-left group"
                                >
                                    <span className="text-gray-500 group-hover:text-red-400 font-bold mr-2">[A]</span> -2°C
                                </button>
                                <button 
                                    onClick={() => { soundManager.playSuccess(); setHookFeedback('correct'); }}
                                    className="p-6 border-2 border-gray-700 hover:border-cyber-primary bg-black hover:bg-cyber-primary/10 text-xl font-mono transition-all text-left group"
                                >
                                    <span className="text-gray-500 group-hover:text-cyber-primary font-bold mr-2">[B]</span> -8°C
                                </button>
                            </div>
                            
                            {hookFeedback === 'wrong' && (
                                <div className="mt-4 p-4 bg-red-900/20 border border-red-500 text-red-300 font-mono text-sm animate-pulse">
                                    <X className="inline w-4 h-4 mr-2" /> ERROR: Si bajas desde -5, te alejas más del cero (más frío).
                                </div>
                            )}
                             {hookFeedback === 'correct' && (
                                <div className="mt-4 p-4 bg-green-900/20 border border-green-500 text-green-300 font-mono text-sm">
                                    <Check className="inline w-4 h-4 mr-2" /> CORRECTO: Las magnitudes negativas se suman.
                                </div>
                            )}
                        </CyberCard>
                        
                        {hookFeedback === 'correct' && (
                             <CyberButton onClick={() => onStageChange('lab')} fullWidth variant="success" className="text-lg animate-in fade-in">
                                ACCEDER A TERMINAL DE REPARACIÓN
                            </CyberButton>
                        )}
                    </div>
                )}
            </div>
        );
    }

    return (
      <div className="max-w-3xl mx-auto text-center animate-in zoom-in-95 duration-500">
        <div className="flex justify-center mb-8">
          <div className={`p-6 border-2 ${theme.borderColor} bg-black shadow-[0_0_30px_rgba(0,0,0,0.5)]`}>
             <AlertTriangle className={`w-20 h-20 ${theme.baseColor}`} />
          </div>
        </div>
        <CyberCard title={sector.hook.title} className={`mb-8 ${theme.borderColor}`}>
          <p className="text-xl md:text-2xl leading-relaxed font-mono">
            <MathText text={sector.hook.message} themeColor={theme.baseColor} />
          </p>
        </CyberCard>
        <CyberButton 
          onClick={() => {
              onStageChange(sector.id === 'mini_test_numbers' ? 'manual' : 'lab');
          }} 
          fullWidth 
          variant="primary" 
          className="text-lg"
        >
          {sector.id === 'mini_test_numbers' ? 'ACCEDER A ZONA DE COMBATE' : 'ACCEDER A TERMINAL DE REPARACIÓN'}
        </CyberButton>
      </div>
    );
  };

  const renderLab = () => {
    const SpecificLab = {
      'thermometer': LabSector1,
      'fraction-bar': LabSector2,
      'shield-slider': LabSector3,
      'power-growth': LabSector4,
      'root-square': LabSector5,
      'linear-graph': LabLinearFunctions,
      'algebra-sorter': LabAlgebraic,
      'factor-area': LabFactorization,
      'none': () => null
    }[sector.lab.type] || LabSector1;

    return (
      <div className="max-w-5xl mx-auto animate-in slide-in-from-right-10 fade-in duration-500">
        <div className={`flex items-center gap-6 mb-8 border-b-2 ${theme.borderColor} pb-4 bg-black/50 p-6 rounded-t-lg shadow-lg`}>
           <PixelSymbol variant={theme.iconVariant} size={48} className={theme.baseColor} />
           <div>
             <h2 className={`text-3xl font-sans font-bold ${theme.baseColor} tracking-widest leading-none`}>LABORATORIO: {sector.name}</h2>
             <p className="text-base text-gray-400 font-mono uppercase mt-1">Módulo de Experimentación Controlada</p>
           </div>
        </div>

        {/* @ts-ignore */}
        <SpecificLab config={sector.lab} onSuccess={() => onStageChange('manual')} />
      </div>
    );
  };

  const ManualView = () => {
    const [openSection, setOpenSection] = useState<number | null>(0);
    const [revealedRecall, setRevealedRecall] = useState<number[]>([]);

    return (
      <div className="max-w-[1600px] mx-auto animate-in slide-in-from-right-10 fade-in duration-500 px-4">
        
        {/* Title */}
        <div className="text-center mb-12">
            <h2 className={`text-5xl font-sans font-bold ${theme.baseColor} mb-4 text-glow tracking-wide uppercase`}>{sector.manual.title}</h2>
            <div className="h-1 w-48 bg-current mx-auto opacity-50"></div>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-10">
            {/* Left Column: Visual Guide (STICKY and FRAMED) */}
            {sector.id !== 'mini_test_numbers' && (
                <div className="lg:w-[40%] xl:w-[35%] shrink-0">
                    <div className="sticky top-8">
                        {/* THEMED BORDER CONTAINER */}
                        <div className={`border-4 bg-black shadow-[0_0_40px_rgba(0,0,0,0.6)] ${theme.borderColor} relative`}>
                            {/* Header Label */}
                            <div className={`
                                p-3 border-b-4 ${theme.borderColor} bg-gray-900 
                                text-sm text-white uppercase font-bold tracking-[0.2em] 
                                flex items-center justify-center gap-2
                            `}>
                                <PixelSymbol variant="terminal" size={16} className={theme.baseColor} />
                                SIMULACIÓN VISUAL
                            </div>
                            
                            {/* Animation Area */}
                            <div className="h-[350px] relative bg-black/50">
                                <ConceptAnimation sectorId={sector.id} activeSection={openSection !== null ? openSection : 0} />
                            </div>
                            
                            {/* Footer Status */}
                            <div className="p-3 bg-gray-900 border-t-4 border-gray-800 text-[10px] text-gray-400 font-mono text-center uppercase tracking-wider">
                                Sincronizado con Sección: 0{openSection !== null ? openSection + 1 : 1}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Right Column: Content (BIGGER and CLEARER) */}
            <div className="flex-1 space-y-6">
            {sector.manual.sections.map((section, idx) => (
                <div key={idx} className={`border-2 transition-all duration-300 ${openSection === idx ? `${theme.borderColor} bg-gray-900/40 shadow-2xl scale-[1.01]` : 'border-gray-800 bg-black hover:border-gray-600 hover:bg-gray-900/10'}`}>
                    <button 
                        onClick={() => setOpenSection(idx)} 
                        className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                    >
                        <div className="flex items-center gap-6">
                            <span className={`font-mono font-bold text-4xl opacity-40 ${openSection === idx ? theme.baseColor : 'text-gray-700'}`}>
                                0{idx + 1}
                            </span>
                            <span className={`font-sans text-2xl tracking-wide uppercase ${openSection === idx ? 'text-white text-glow' : 'text-gray-400'}`}>
                                {section.title}
                            </span>
                        </div>
                        {openSection === idx ? <ChevronUp className={theme.baseColor} size={32} /> : <ChevronDown className="text-gray-600" size={32} />}
                    </button>
                    
                    {openSection === idx && (
                    <div className="p-8 pt-4 border-t-2 border-gray-800/50">
                        {/* INCREASED FONT SIZE HERE */}
                        <div className="text-2xl font-mono text-gray-200 leading-relaxed space-y-6">
                            <MathText text={section.content} themeColor={theme.baseColor} />
                        </div>
                    </div>
                    )}
                </div>
            ))}
            
            {sector.manual.learnMore && (
                <div className="border-2 border-dashed border-gray-700 bg-[#0a0a0a] p-8 mt-10 shadow-inner relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-2 opacity-10">
                        <PixelSymbol variant="lock" size={100} />
                    </div>
                    <div className="flex items-center gap-4 text-yellow-400 font-bold uppercase tracking-widest mb-6 border-b-2 border-gray-800 pb-2 text-2xl relative z-10">
                        <Lightbulb size={32} /> 
                        {sector.manual.learnMore.title}
                    </div>
                    <p className="text-xl font-mono text-gray-300 leading-relaxed relative z-10">
                        <MathText text={sector.manual.learnMore.content} themeColor="text-yellow-400" />
                    </p>
                </div>
            )}

            {sector.manual.recallQuestions && (
                <div className="mt-16 border-t-4 border-gray-800 pt-8">
                <div className="flex items-center gap-3 text-cyber-success mb-8 font-bold tracking-wider uppercase text-2xl">
                    <BrainCircuit size={32} /> Protocolo de Recuperación Activa
                </div>
                <div className="grid grid-cols-1 gap-4">
                    {sector.manual.recallQuestions.map((q, idx) => (
                        <button 
                            key={idx}
                            onClick={() => setRevealedRecall(prev => prev.includes(idx) ? prev : [...prev, idx])}
                            className={`text-left p-6 border-2 transition-all relative overflow-hidden group ${revealedRecall.includes(idx) ? 'border-cyber-success bg-cyber-success/10' : 'border-gray-700 bg-black hover:border-gray-500'}`}
                        >
                            <div className="font-mono text-xl text-white mb-2 font-bold">{q.question}</div>
                            {revealedRecall.includes(idx) ? (
                            <div className="text-cyber-success font-mono text-xl animate-in fade-in border-t border-cyber-success/20 pt-3 mt-3 font-bold">{q.answer}</div>
                            ) : (
                            <div className="text-sm text-gray-500 font-mono mt-2 uppercase flex items-center gap-2 group-hover:text-gray-300 transition-colors tracking-widest">
                                <PixelSymbol variant="chevron-right" size={14} /> REVELAR RESPUESTA
                            </div>
                            )}
                        </button>
                    ))}
                </div>
                </div>
            )}
            </div>
        </div>

        <div className="mt-20 mb-12">
            <CyberButton 
                onClick={() => onStageChange(sector.id === 'mini_test_numbers' ? 'quiz' : 'mission')} 
                fullWidth 
                variant="primary" 
                className="text-2xl py-8 shadow-[0_0_30px_rgba(0,242,255,0.2)]"
            >
            {sector.id === 'mini_test_numbers' ? 'INICIAR SIMULACIÓN DE COMBATE' : 'INICIAR DIAGNÓSTICO DE SISTEMAS'}
            </CyberButton>
        </div>
      </div>
    );
  };

  const renderMission = () => (
    <div className="max-w-4xl mx-auto animate-in slide-in-from-right-10 fade-in duration-500">
      <div className="text-center mb-8">
        <h2 className={`text-3xl font-sans font-bold ${theme.baseColor} mb-2 tracking-widest uppercase`}>{sector.mission.title}</h2>
        <p className="text-xl text-gray-400 font-mono">{sector.mission.description}</p>
      </div>

      <UniversalMission 
        config={sector.mission} 
        onSuccess={() => onStageChange('quiz')} 
        setDynamicHint={setDynamicHint}
        sectorId={sector.id}
      />
    </div>
  );

  const renderQuiz = () => (
    <div className="max-w-5xl mx-auto animate-in slide-in-from-right-10 fade-in duration-500">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-sans font-bold text-cyber-accent mb-2 tracking-widest uppercase">SIM-CORE: Validación Final</h2>
        <p className="text-lg text-gray-400 font-mono">Confirma los protocolos para restaurar el sector.</p>
      </div>
      
      <SimCore 
        questions={sector.quiz.questions} 
        onComplete={() => onStageChange('bridge')} 
        setDynamicHint={setDynamicHint}
        sectorId={sector.id}
      />
    </div>
  );

  const renderBridge = () => (
    <div className="max-w-3xl mx-auto text-center animate-in zoom-in-95 duration-700 flex flex-col items-center justify-center min-h-[60vh]">
      <h1 className="text-6xl font-sans font-bold text-cyber-success mb-8 drop-shadow-[0_0_20px_rgba(0,255,157,0.5)]">
        SECTOR RESTAURADO
      </h1>
      <CyberCard className="mb-12 border-cyber-success w-full bg-black">
        <p className="text-2xl font-mono text-white leading-relaxed">{sector.outro}</p>
      </CyberCard>
      <CyberButton variant="success" onClick={onComplete} fullWidth className="text-xl py-6">
        VOLVER AL PUENTE DE MANDO <ArrowRight className="inline ml-2" size={24} />
      </CyberButton>
    </div>
  );

  const viewMap = { hook: renderHook(), lab: renderLab(), manual: <ManualView />, mission: renderMission(), quiz: renderQuiz(), bridge: renderBridge(), dashboard: null, final_exam: null, module_complete: null };

  return (
    <>
      <div className="relative">
        {(isCompleted || sector.id === 'mini_test_numbers') && <NavTabs />}
        {viewMap[currentStage]}
      </div>
      {showTutorial && <TutorialOverlay stage={currentStage} onClose={closeTutorial} sectorId={sector.id} />}
    </>
  );
};
