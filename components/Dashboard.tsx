
import React, { useState } from 'react';
import { SectorId, ModuleId } from '../types';
import { SECTOR_THEMES, SECTOR_DISPLAY_NAMES, MODULES, SECTORS } from '../constants';
import { soundManager } from '../utils/sound';
import { Logo } from './UI/Logo';
import { PixelSymbol } from './UI/PixelSymbol';
import { exportSectorHTML, exportSectorMarkdown } from '../utils/exportGenerators';
import { File, FileCode, FileText, Download, X, ChevronLeft, ChevronRight } from 'lucide-react';

interface DashboardProps {
  sectors: SectorId[];
  unlocked: SectorId[];
  completed: SectorId[];
  onSelect: (id: SectorId) => void;
  hasSeenIntro: boolean;
  onIntroClose: () => void;
  onDownloadSector: (id: SectorId) => void;
  currentModuleId: ModuleId;
  onSwitchModule: (id: ModuleId) => void;
}

const ConnectionLines = () => (
    <div className="absolute inset-0 z-0 pointer-events-none opacity-5 hidden lg:block">
        <svg className="w-full h-full">
            <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-cyber-primary" />
                </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
    </div>
);

const WarpOverlay = ({ active, direction }: { active: boolean; direction: 'left' | 'right' }) => (
    <div className={`fixed inset-0 z-50 pointer-events-none transition-opacity duration-300 ${active ? 'opacity-100' : 'opacity-0'}`}>
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm"></div>
        <div className="absolute inset-0 overflow-hidden">
            {Array.from({length: 40}).map((_, i) => (
                <div 
                    key={i} 
                    className={`absolute h-[2px] w-full bg-gradient-to-r from-transparent via-cyber-primary to-transparent opacity-50 animate-warp`}
                    style={{
                        top: `${Math.random() * 100}%`,
                        animationDuration: `${0.1 + Math.random() * 0.2}s`,
                        animationDelay: `-${Math.random()}s`,
                        transformOrigin: direction === 'right' ? 'left' : 'right' 
                    }} 
                />
            ))}
        </div>
    </div>
);

export const Dashboard: React.FC<DashboardProps> = ({ 
    sectors = [], 
    unlocked, 
    completed, 
    onSelect, 
    onDownloadSector,
    currentModuleId,
    onSwitchModule 
}) => {
  const [activeDownloadId, setActiveDownloadId] = useState<SectorId | null>(null);
  
  const [animState, setAnimState] = useState<'idle' | 'out' | 'in'>('idle');
  const [slideDirection, setSlideDirection] = useState<'left' | 'right'>('left');

  const currentModuleIndex = MODULES.findIndex(m => m.id === currentModuleId);
  const currentModuleData = MODULES[currentModuleIndex] || MODULES[0];

  const handleSwitchModule = (direction: 'prev' | 'next') => {
      if (animState !== 'idle') return;

      soundManager.playClick();
      soundManager.playAmbientStart(); 
      
      setSlideDirection(direction === 'next' ? 'left' : 'right');
      setAnimState('out');
      
      setTimeout(() => {
          let nextIndex = direction === 'next' ? currentModuleIndex + 1 : currentModuleIndex - 1;
          if (nextIndex < 0) nextIndex = MODULES.length - 1;
          if (nextIndex >= MODULES.length) nextIndex = 0;
          
          onSwitchModule(MODULES[nextIndex].id);
          setAnimState('in');
          
          setTimeout(() => {
              setAnimState('idle');
          }, 500);
      }, 500);
  };

  const handleSectorClick = (id: SectorId) => {
    if (activeDownloadId === id) return; 
    soundManager.playClick();
    onSelect(id);
  };

  const toggleDownloadMenu = (e: React.MouseEvent, id: SectorId) => {
      e.stopPropagation();
      soundManager.playClick();
      setActiveDownloadId(activeDownloadId === id ? null : id);
  };

  const handleExport = (e: React.MouseEvent, id: SectorId, type: 'pdf' | 'html' | 'md') => {
      e.stopPropagation();
      soundManager.playSuccess();
      if (type === 'pdf') onDownloadSector(id);
      if (type === 'html') exportSectorHTML(id);
      if (type === 'md') exportSectorMarkdown(id);
      setActiveDownloadId(null);
  };

  const getContentTransform = () => {
      if (animState === 'idle') return 'translate-x-0 opacity-100 scale-100';
      if (animState === 'out') {
          return slideDirection === 'left' 
            ? '-translate-x-[20%] opacity-0 scale-95 blur-sm' 
            : 'translate-x-[20%] opacity-0 scale-95 blur-sm';
      }
      if (animState === 'in') {
          return 'translate-x-0 opacity-100 scale-100 animate-in fade-in zoom-in-95 duration-500';
      }
      return '';
  };

  // Theme Colors
  const modColor = currentModuleData.id === 'm1_numbers' ? 'cyber-primary' : 'indigo-500';
  const modShadow = currentModuleData.id === 'm1_numbers' ? '#00f2ff' : '#6366f1';

  return (
    <div className="flex flex-col items-center w-full max-w-7xl mx-auto p-4 relative overflow-hidden min-h-[80vh]">
      <ConnectionLines />
      
      <WarpOverlay active={animState !== 'idle'} direction={slideDirection} />

      <div 
        key={currentModuleId} 
        className={`w-full flex flex-col items-center transition-all duration-500 ease-out ${getContentTransform()}`}
      >

        {/* HEADER */}
        <header className="text-center mb-16 flex flex-col items-center w-full relative z-20">
            
            {/* LOGO: Holographic Projection Style */}
            <div className="mb-8 relative group">
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50 blur-sm"></div>
                <Logo size={120} className="drop-shadow-[0_0_15px_rgba(0,242,255,0.6)] relative z-10" />
            </div>
            
            {/* TITLE: High Contrast Pixel Stack */}
            <div className="relative mb-12 select-none z-30 group">
                <h1 className="text-5xl md:text-8xl font-sans font-bold text-white tracking-tight relative z-10"
                    style={{ 
                        textShadow: `
                            3px 3px 0px #000,
                            -1px -1px 0px #000,
                            1px -1px 0px #000,
                            -1px 1px 0px #000,
                            1px 1px 0px #000,
                            6px 6px 0px #050b14, 
                            10px 10px 0px ${modShadow}
                        `
                    }}>
                    PROTOCOL: RESTORE
                </h1>
            </div>
            
            {/* MODULE NAVIGATOR: Tactical Deck Style */}
            <div className="flex items-center gap-6 animate-in slide-in-from-bottom-4 fade-in duration-700">
                <button 
                    onClick={() => handleSwitchModule('prev')} 
                    className={`p-4 border-2 border-gray-700 bg-black hover:border-${modColor} hover:text-${modColor} transition-all active:scale-95 shadow-[4px_4px_0px_black] hover:shadow-[2px_2px_0px_black] hover:translate-y-1`}
                    disabled={animState !== 'idle'}
                >
                    <PixelSymbol variant="chevron-left" size={24} />
                </button>
                
                <div className={`
                    px-10 py-4 bg-black border-2 border-${modColor} shadow-[6px_6px_0px_0px_${modShadow}]
                    flex items-center gap-6 relative overflow-hidden group
                `}>
                    <div className={`absolute inset-0 bg-${modColor} opacity-0 group-hover:opacity-5 transition-opacity`}></div>
                    <PixelSymbol variant={currentModuleData.icon as any} size={32} className={`text-${modColor}`} />
                    <div className="text-left">
                        <div className={`text-[10px] font-mono font-bold uppercase tracking-widest text-${modColor} opacity-70`}>MÓDULO ACTIVO</div>
                        <div className="text-2xl font-sans font-bold text-white uppercase tracking-wider">{currentModuleData.title.split(': ')[1]}</div>
                    </div>
                </div>

                <button 
                    onClick={() => handleSwitchModule('next')} 
                    className={`p-4 border-2 border-gray-700 bg-black hover:border-${modColor} hover:text-${modColor} transition-all active:scale-95 shadow-[4px_4px_0px_black] hover:shadow-[2px_2px_0px_black] hover:translate-y-1`}
                    disabled={animState !== 'idle'}
                >
                    <PixelSymbol variant="chevron-right" size={24} />
                </button>
            </div>
        </header>

        {/* SECTOR GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full relative z-20 pb-20 px-4">
            {sectors.map((sectorId, index) => {
            const isUnlocked = unlocked.includes(sectorId);
            const isCompleted = completed.includes(sectorId);
            const isNext = isUnlocked && !isCompleted; 
            
            const theme = SECTOR_THEMES[sectorId];
            const sectorData = SECTORS[sectorId];

            return (
                <div key={sectorId} className="relative group">
                    <button
                        disabled={!isUnlocked}
                        onClick={() => handleSectorClick(sectorId)}
                        onMouseEnter={() => isUnlocked && soundManager.playHover()}
                        className={`
                            w-full h-full relative p-6 text-left transition-all duration-300 
                            flex flex-col justify-between min-h-[280px] overflow-hidden
                            border-2
                            ${isUnlocked 
                                ? `border-${theme.borderColor.split('-')[1]}-500 bg-[#080c14] hover:bg-black hover:-translate-y-2` 
                                : 'border-gray-800 bg-[#0a0f16] opacity-60 cursor-not-allowed grayscale'
                            }
                        `}
                        style={{
                            boxShadow: isUnlocked ? `8px 8px 0px 0px ${theme.primaryColor}` : 'none'
                        }}
                    >
                        {/* Status Glitch Overlay for Damaged Sectors */}
                        {isNext && (
                            <div className="absolute inset-0 bg-white/5 animate-glitch opacity-10 pointer-events-none mix-blend-overlay"></div>
                        )}

                        {/* Header: Icon + Status */}
                        <div className="flex justify-between items-start mb-6">
                            <div className={`p-2 border-2 ${isUnlocked ? theme.borderColor : 'border-gray-700'} bg-black`}>
                                <PixelSymbol 
                                    variant={theme.iconVariant} 
                                    size={40} 
                                    className={`${isUnlocked ? theme.baseColor : 'text-gray-700'} ${isNext ? 'animate-pulse' : ''}`} 
                                />
                            </div>
                            
                            <div className="text-right">
                                <div className={`text-[10px] font-bold font-mono ${isUnlocked ? theme.baseColor : 'text-gray-600'}`}>SEC_0{index + 1}</div>
                                {isCompleted ? (
                                     <div className={`text-[10px] font-bold font-mono bg-${theme.baseColor.replace('text-', '')} text-black px-1 mt-1`}>RESTORADO</div>
                                ) : isUnlocked ? (
                                     <div className="text-[10px] font-bold font-mono text-red-500 animate-pulse mt-1">DAÑADO</div>
                                ) : (
                                     <div className="text-[10px] font-bold font-mono text-gray-600 mt-1">OFFLINE</div>
                                )}
                            </div>
                        </div>

                        {/* Titles */}
                        <div className="relative z-10 flex-1 flex flex-col justify-start">
                            {/* SHIP CONTEXT TITLE */}
                            <h3 className={`
                                font-sans text-xl font-bold mb-1 tracking-widest uppercase leading-tight 
                                ${isUnlocked ? 'text-white' : 'text-gray-500'}
                                ${isNext ? 'glitch-text' : ''}
                            `}
                            data-text={sectorData.name.split('[')[0]}
                            >
                                {sectorData.name.split('[')[0]}
                            </h3>
                            
                            {/* MATH TOPIC SUBTITLE */}
                            <div className={`text-sm font-bold font-mono mb-4 ${isUnlocked ? theme.baseColor : 'text-gray-700'}`}>
                                {SECTOR_DISPLAY_NAMES[sectorId]}
                            </div>

                            {/* DESCRIPTION */}
                            <p className="text-xs text-gray-500 font-mono leading-relaxed line-clamp-3">
                                {sectorData.description}
                            </p>
                        </div>

                        {/* Footer Action */}
                        <div className={`mt-6 pt-4 border-t-2 ${isUnlocked ? 'border-gray-800' : 'border-gray-900'} flex items-center justify-between`}>
                            <div className={`h-1 w-12 ${isUnlocked ? theme.baseColor.replace('text-', 'bg-') : 'bg-gray-800'}`}></div>
                            
                            {isNext && (
                                <div className={`flex items-center gap-2 text-xs font-bold font-mono uppercase tracking-widest ${theme.baseColor} group-hover:translate-x-1 transition-transform`}>
                                    INICIAR <PixelSymbol variant="chevron-right" size={12} />
                                </div>
                            )}
                            {isCompleted && (
                                <PixelSymbol variant="check" size={18} className={theme.baseColor} />
                            )}
                        </div>
                    </button>

                    {/* Export Menu */}
                    {isUnlocked && (
                        <div className="absolute bottom-6 right-6 z-30">
                            {activeDownloadId === sectorId && (
                                <div className="absolute bottom-full right-0 mb-2 bg-black border-2 border-gray-700 p-1 flex flex-col gap-1 shadow-[4px_4px_0px_black] animate-in slide-in-from-bottom-2 z-40 w-32">
                                    <button onClick={(e) => handleExport(e, sectorId, 'pdf')} className="flex items-center gap-2 px-3 py-2 hover:bg-gray-800 text-white text-xs font-bold uppercase font-mono"><PixelSymbol variant="file" size={14} /> PDF</button>
                                    <button onClick={(e) => handleExport(e, sectorId, 'html')} className="flex items-center gap-2 px-3 py-2 hover:bg-gray-800 text-cyan-300 text-xs font-bold uppercase font-mono"><PixelSymbol variant="file-code" size={14} /> HTML</button>
                                    <button onClick={(e) => handleExport(e, sectorId, 'md')} className="flex items-center gap-2 px-3 py-2 hover:bg-gray-800 text-yellow-300 text-xs font-bold uppercase font-mono"><PixelSymbol variant="file-text" size={14} /> MD</button>
                                </div>
                            )}
                            <button 
                                onClick={(e) => toggleDownloadMenu(e, sectorId)}
                                className={`
                                    p-2 border-2 border-gray-800 text-gray-500 hover:text-white hover:border-white transition-all bg-black
                                    ${activeDownloadId === sectorId ? 'bg-gray-800 text-white border-white' : ''}
                                `}
                                title="Descargar Datos"
                            >
                                {activeDownloadId === sectorId ? <PixelSymbol variant="x" size={16} /> : <PixelSymbol variant="download" size={16} />}
                            </button>
                        </div>
                    )}
                </div>
            );
            })}
        </div>

      </div>
    </div>
  );
};
