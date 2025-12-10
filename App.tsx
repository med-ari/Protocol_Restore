
import React, { useState, useMemo, useEffect } from 'react';
import { AppState, SectorId, StageId, ModuleId } from './types';
import { SECTORS, SECTOR_ORDER } from './constants';
import { Dashboard } from './components/Dashboard';
import { SectorView } from './components/SectorView';
import { AliAssistant } from './components/AliAssistant';
import { ModuleSummary } from './components/ModuleSummary';
import { FinalExam } from './components/stages/FinalExam';
import { IntroSequence } from './components/IntroSequence';
import { soundManager } from './utils/sound';
import { PixelSymbol } from './components/UI/PixelSymbol';
import { SectorBackground } from './components/UI/SectorBackground';
import { Inventory } from './components/Inventory';
import { PrintableSector } from './components/PrintableSector';
import { generateSectorPDF } from './utils/pdfGenerator';
import { ModuleSelector } from './components/ModuleSelector';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>({
    currentModuleId: 'm1_numbers', 
    currentSectorId: null,
    currentStage: 'dashboard', 
    // ALL SECTORS UNLOCKED BY DEFAULT FOR TESTING/NAVIGATION
    unlockedSectors: [
        'integers', 'rationals', 'percentages', 'powers', 'roots', 'mini_test_numbers', 
        'linear_functions', 'algebraic_expressions', 'factorization'
    ],
    completedSectors: [],
    hasSeenIntro: false,
  });

  const [isMuted, setIsMuted] = useState(false);
  const [showInventory, setShowInventory] = useState(false);
  const [dynamicHint, setDynamicHint] = useState<string | null>(null);
  
  const [sectorToPrint, setSectorToPrint] = useState<SectorId | null>(null);

  useEffect(() => {
    setIsMuted(soundManager.getMuteState());
    const handleInteraction = () => {
        if (!soundManager.getMuteState()) soundManager.playAmbientStart();
        window.removeEventListener('click', handleInteraction);
    };
    window.addEventListener('click', handleInteraction);
    return () => window.removeEventListener('click', handleInteraction);
  }, []);

  const toggleMute = () => {
    const muted = soundManager.toggleMute();
    setIsMuted(muted);
  };

  const progressPercent = useMemo(() => {
    const completedCount = state.completedSectors.length;
    const totalSectors = Object.keys(SECTORS).length; 
    return (completedCount / totalSectors) * 100;
  }, [state.completedSectors]);

  // --- Navigation Handlers ---

  const handleIntroComplete = () => {
    setState(prev => ({ ...prev, hasSeenIntro: true, currentStage: 'dashboard' }));
    if(!isMuted) soundManager.playAmbientStart();
  };

  const handleSwitchModule = (id: ModuleId) => {
      setState(prev => ({ ...prev, currentModuleId: id }));
  };

  const handleGoHome = () => {
      soundManager.playClick();
      setState(prev => ({ ...prev, currentModuleId: 'm1_numbers', currentSectorId: null, currentStage: 'dashboard' }));
  };

  const handleSelectSector = (id: SectorId) => {
    setDynamicHint(null);
    setState(prev => ({
      ...prev,
      currentSectorId: id,
      currentStage: 'hook'
    }));
    soundManager.playAmbientStart();
  };

  const handleStageChange = (stage: StageId) => {
    setDynamicHint(null); 
    setState(prev => ({ ...prev, currentStage: stage }));
  };

  const handleSectorComplete = () => {
    soundManager.playSuccess();
    if (!state.currentSectorId || !state.currentModuleId) return;
    
    const currentId = state.currentSectorId;
    const moduleSectors = SECTOR_ORDER[state.currentModuleId] || [];
    
    const newCompleted = state.completedSectors.includes(currentId) 
      ? state.completedSectors 
      : [...state.completedSectors, currentId];

    const allDone = moduleSectors.length > 0 && moduleSectors.every(s => newCompleted.includes(s));

    if (allDone && state.currentModuleId === 'm1_numbers') {
        setState(prev => ({
            ...prev,
            currentSectorId: null,
            currentStage: 'final_exam', 
            completedSectors: newCompleted,
        }));
    } else {
        setState(prev => ({
            ...prev,
            currentSectorId: null,
            currentStage: 'dashboard',
            completedSectors: newCompleted,
        }));
    }
  };
  
  const handleFinalExamComplete = () => {
      soundManager.playSuccess();
      setState(prev => ({ ...prev, currentStage: 'module_complete' }));
  };

  const handleRestart = () => {
     setState(prev => ({ 
         ...prev, 
         currentStage: 'dashboard', 
         currentModuleId: 'm1_numbers',
     })); 
  };

  const handleDownloadSector = (id: SectorId) => {
      soundManager.playClick();
      setSectorToPrint(id);
      setTimeout(async () => {
          const success = await generateSectorPDF('global-print-target', `AXIOM_DATA_${id.toUpperCase()}`);
          if (success) soundManager.playSuccess();
          else soundManager.playError();
          setSectorToPrint(null);
      }, 500);
  };

  const currentHint = useMemo(() => {
    if (dynamicHint) return dynamicHint;
    if (state.currentStage === 'dashboard') return "Selecciona un sector disponible en el Módulo activo.";
    if (!state.currentSectorId) return "";

    const sector = SECTORS[state.currentSectorId];
    switch (state.currentStage) {
      case 'hook': return "Inicializa el protocolo.";
      case 'lab': return sector.lab.hint;
      case 'manual': return sector.manual.hint;
      case 'mission': return sector.mission.hint;
      case 'quiz': return sector.quiz.hint;
      case 'bridge': return "Excelente trabajo.";
      default: return "Estoy aquí para ayudarte.";
    }
  }, [state.currentStage, state.currentSectorId, dynamicHint]);

  const activeDashboardSectors = state.currentModuleId ? (SECTOR_ORDER[state.currentModuleId] || []) : [];

  return (
    <div className="min-h-screen bg-cyber-bg text-cyber-text font-mono selection:bg-cyber-accent selection:text-white pb-24 relative overflow-hidden">
      
      <SectorBackground sectorId={state.currentSectorId || 'dashboard'} />

      <div className="fixed top-0 left-0 w-full h-1 bg-gray-900 z-50">
        <div 
            className="h-full bg-gradient-to-r from-cyber-primary to-cyber-accent transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(0,242,255,0.5)]" 
            style={{ width: `${progressPercent}%` }} 
        />
      </div>

      <div className="fixed top-4 right-4 z-50 flex gap-4">
        {state.hasSeenIntro && (
            <button 
                onClick={() => { soundManager.playClick(); setShowInventory(true); }}
                className="p-2 bg-cyber-panel border border-cyber-primary/30 text-cyber-primary hover:bg-cyber-primary hover:text-black transition-colors shadow-lg group relative"
            >
                <PixelSymbol variant="database" size={24} />
            </button>
        )}

        <button 
            onClick={toggleMute}
            className="p-2 bg-cyber-panel border border-cyber-primary/30 text-cyber-primary hover:bg-cyber-primary hover:text-black transition-colors shadow-lg"
        >
            <PixelSymbol variant={isMuted ? 'volume-off' : 'volume-on'} size={24} />
        </button>
      </div>

      {!state.hasSeenIntro ? (
        <IntroSequence onComplete={handleIntroComplete} />
      ) : (
        <main className="relative z-10 container mx-auto py-8 px-4 min-h-screen flex flex-col pt-12">
          
          {state.currentSectorId && (
            <button 
              onClick={() => {
                soundManager.playClick();
                setDynamicHint(null);
                setState(prev => ({ ...prev, currentSectorId: null, currentStage: 'dashboard' }));
              }}
              className="self-start text-xs font-mono text-gray-500 hover:text-cyber-primary mb-4 uppercase tracking-widest border border-gray-800 px-3 py-1 hover:border-cyber-primary transition-all bg-black/50"
            >
              &lt; ABORTAR MISIÓN
            </button>
          )}

          {state.currentStage === 'final_exam' ? (
             <FinalExam onComplete={handleFinalExamComplete} />
          ) : state.currentStage === 'module_complete' ? (
            <ModuleSummary onRestart={handleRestart} />
          ) : !state.currentSectorId ? (
            <Dashboard 
              sectors={activeDashboardSectors}
              unlocked={state.unlockedSectors.filter(id => activeDashboardSectors.includes(id))}
              completed={state.completedSectors}
              onSelect={handleSelectSector}
              hasSeenIntro={true}
              onIntroClose={() => {}}
              onDownloadSector={handleDownloadSector}
              currentModuleId={state.currentModuleId}
              onSwitchModule={handleSwitchModule}
            />
          ) : (
            <SectorView 
              sector={SECTORS[state.currentSectorId]}
              currentStage={state.currentStage}
              onStageChange={handleStageChange}
              onComplete={handleSectorComplete}
              setDynamicHint={setDynamicHint}
              isCompleted={state.completedSectors.includes(state.currentSectorId)}
            />
          )}

        </main>
      )}

      {showInventory && (
          <Inventory 
              unlocked={state.unlockedSectors} 
              completed={state.completedSectors} 
              onClose={() => setShowInventory(false)} 
          />
      )}

      <AliAssistant 
        hint={currentHint} 
        currentSectorId={state.currentSectorId}
        currentStage={state.currentStage}
      />

      {sectorToPrint && (
          <div className="fixed -top-[9999px] left-0">
              <PrintableSector sectorId={sectorToPrint} id="global-print-target" />
          </div>
      )}
    </div>
  );
};
export default App;
