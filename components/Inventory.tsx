
import React, { useState } from 'react';
import { SectorId } from '../types';
import { PixelSymbol } from './UI/PixelSymbol';
import { SECTOR_THEMES, SECTOR_DISPLAY_NAMES, ALL_SECTORS, SECTORS } from '../constants';
import { soundManager } from '../utils/sound';
import { MathText } from './UI/MathText';
import { generateSectorPDF } from '../utils/pdfGenerator';
import { exportSectorHTML, exportSectorMarkdown } from '../utils/exportGenerators';
import { SectorMiniScene } from './UI/SectorMiniScene';

interface InventoryProps {
  unlocked: SectorId[];
  completed: SectorId[];
  onClose: () => void;
}

export const Inventory: React.FC<InventoryProps> = ({ unlocked, completed, onClose }) => {
  const [selectedSector, setSelectedSector] = useState<SectorId | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleSelect = (id: SectorId) => {
      if (completed.includes(id)) {
          soundManager.playClick();
          setSelectedSector(id);
      } else {
          soundManager.playError();
      }
  };

  const handlePDF = async () => {
    if (!selectedSector) return;
    soundManager.playClick();
    setIsGenerating(true);
    setTimeout(async () => {
        const success = await generateSectorPDF('printable-content', `AXIOM_LOG_${selectedSector.toUpperCase()}`);
        if (success) soundManager.playSuccess();
        else soundManager.playError();
        setIsGenerating(false);
    }, 100);
  };

  const handleHTML = async () => {
      if (!selectedSector) return;
      soundManager.playClick();
      setIsGenerating(true);
      await exportSectorHTML(selectedSector);
      soundManager.playSuccess();
      setIsGenerating(false);
  };

  const handleMD = () => {
      if (!selectedSector) return;
      soundManager.playClick();
      exportSectorMarkdown(selectedSector);
      soundManager.playSuccess();
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in zoom-in-95 duration-200 font-mono">
      <div className="w-full max-w-6xl bg-[#0f1929] border-4 border-gray-600 shadow-2xl relative flex flex-col md:flex-row h-[85vh] overflow-hidden">
        
        {/* Close Button */}
        <button 
            onClick={() => { soundManager.playClick(); onClose(); }}
            className="absolute top-4 right-4 z-50 text-gray-400 hover:text-white bg-black border border-gray-600 p-1 hover:border-white transition-colors"
        >
            <PixelSymbol variant="x" size={24} />
        </button>

        {/* Left Sidebar */}
        <div className="w-full md:w-1/3 bg-[#050b14] border-r-4 border-gray-600 flex flex-col">
            <div className="p-4 bg-gray-800 border-b-4 border-gray-600 flex items-center justify-between">
                <span className="text-xl text-white font-bold tracking-widest">INVENTARIO</span>
                <PixelSymbol variant="database" size={24} className="text-gray-400" />
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
                {ALL_SECTORS.filter(s => s !== 'mini_test_numbers').map((sectorId) => {
                    const isUnlocked = unlocked.includes(sectorId);
                    const isCompleted = completed.includes(sectorId);
                    const isSelected = selectedSector === sectorId;
                    const theme = SECTOR_THEMES[sectorId];

                    return (
                        <button 
                            key={sectorId}
                            onClick={() => handleSelect(sectorId)}
                            disabled={!isCompleted}
                            className={`
                                w-full text-left flex items-center gap-3 p-3 border-2 transition-all relative overflow-hidden group
                                ${isSelected ? `bg-gray-800 border-${theme.borderColor}` : ''}
                                ${isCompleted ? 'cursor-pointer hover:bg-gray-800' : 'cursor-not-allowed opacity-50'}
                                ${!isSelected && !isCompleted ? 'border-gray-800 bg-black' : ''}
                            `}
                            style={{ 
                                borderColor: isSelected ? theme.primaryColor : undefined,
                                borderLeftWidth: isCompleted ? '4px' : '2px',
                                borderLeftColor: isCompleted ? theme.primaryColor : undefined 
                            }}
                        >
                            <div className={`
                                w-12 h-12 flex items-center justify-center border-2 shrink-0
                                ${isCompleted ? `border-${theme.borderColor} bg-black` : 'border-gray-700 bg-black'}
                            `}>
                                {isUnlocked ? (
                                    <PixelSymbol variant={theme.iconVariant} size={28} className={theme.baseColor} />
                                ) : (
                                    <PixelSymbol variant="lock" size={16} className="text-gray-600" />
                                )}
                            </div>
                            
                            <div className="flex-1 min-w-0">
                                <div className={`text-sm font-bold truncate font-sans tracking-wide ${isUnlocked ? 'text-white' : 'text-gray-600'}`}>
                                    {SECTOR_DISPLAY_NAMES[sectorId].split('[')[0]}
                                </div>
                                <div className="text-[10px] text-gray-500 uppercase tracking-wider flex justify-between">
                                    <span>{isCompleted ? "DATOS RECUPERADOS" : "BLOQUEADO"}</span>
                                    {isCompleted && <span className="text-green-500">[VER]</span>}
                                </div>
                            </div>
                        </button>
                    );
                })}
            </div>
            
            <div className="p-4 bg-black border-t-4 border-gray-600 text-xs text-gray-500 text-center uppercase font-bold">
                Chips de Datos: {completed.length} / {ALL_SECTORS.length}
            </div>
        </div>

        {/* Right Content */}
        <div className="flex-1 bg-[#1a2639] p-8 flex flex-col relative bg-dither">
             <div className="absolute inset-0 scanlines pointer-events-none opacity-20"></div>

             <div className="border-4 border-gray-600 bg-[#050b14] flex-1 p-0 relative shadow-[inset_0_0_50px_black] overflow-hidden flex flex-col">
                 
                 {selectedSector ? (
                     <div className="flex flex-col h-full animate-in fade-in slide-in-from-right-4 duration-300">
                         <div className={`p-6 border-b-4 border-gray-700 bg-black flex flex-col md:flex-row items-center justify-between gap-4`}>
                             <div className="flex items-center gap-4">
                                <PixelSymbol variant={SECTOR_THEMES[selectedSector].iconVariant} size={48} className={SECTOR_THEMES[selectedSector].baseColor} />
                                <div>
                                    <h2 className={`text-2xl font-bold font-sans ${SECTOR_THEMES[selectedSector].baseColor}`}>
                                        ARCHIVO: {SECTOR_DISPLAY_NAMES[selectedSector]}
                                    </h2>
                                    <p className="text-xs text-gray-400 uppercase tracking-widest">RESUMEN TÁCTICO M1</p>
                                </div>
                             </div>
                             
                             {/* EXPORT BUTTONS GROUP */}
                             <div className="flex items-center gap-2 bg-gray-900 p-1 border border-gray-600">
                                 <span className="text-[10px] text-gray-500 font-bold px-2 uppercase">Exportar:</span>
                                 
                                 <button onClick={handlePDF} disabled={isGenerating} title="Formato PDF (Gráfico)" className="p-2 hover:bg-gray-700 text-gray-300 hover:text-white transition-colors border border-transparent hover:border-gray-500">
                                     {isGenerating ? <span className="animate-pulse text-xs">...</span> : <PixelSymbol variant="file" size={18} />}
                                     <span className="sr-only">PDF</span>
                                 </button>
                                 
                                 <button onClick={handleHTML} disabled={isGenerating} title="Formato HTML (Web)" className="p-2 hover:bg-gray-700 text-cyan-300 hover:text-cyan-100 transition-colors border border-transparent hover:border-cyan-500">
                                     {isGenerating ? <span className="animate-pulse text-xs">...</span> : <PixelSymbol variant="file-code" size={18} />}
                                     <span className="sr-only">HTML</span>
                                 </button>
                                 
                                 <button onClick={handleMD} title="Formato Markdown (Texto)" className="p-2 hover:bg-gray-700 text-yellow-300 hover:text-yellow-100 transition-colors border border-transparent hover:border-yellow-500">
                                     <PixelSymbol variant="file-text" size={18} />
                                     <span className="sr-only">Markdown</span>
                                 </button>
                             </div>
                         </div>

                         <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
                             <div className="prose prose-invert max-w-none font-mono">
                                 
                                 {/* VISUAL CONTAINER WITH ID */}
                                 <div id="inventory-visual-preview" className="mb-8 p-6 border-2 border-gray-700 bg-black flex flex-col items-center relative overflow-hidden">
                                     <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:10px_10px]" />
                                     <div className="scale-150 p-4"><SectorMiniScene sectorId={selectedSector} /></div>
                                     <div className={`mt-4 text-xs font-bold uppercase tracking-[0.2em] ${SECTOR_THEMES[selectedSector].baseColor}`}>
                                         HOLOGRAMA: {SECTOR_DISPLAY_NAMES[selectedSector].split('[')[0]}
                                     </div>
                                 </div>

                                 <div className="mb-6 p-4 border border-gray-700 bg-gray-900/50">
                                     <h4 className="text-white font-bold mb-2 uppercase border-b border-gray-700 pb-1">Conceptos Clave</h4>
                                     <ul className="list-disc pl-4 space-y-2 text-gray-300 text-sm">
                                         {SECTORS[selectedSector].manual.sections.map((sec, i) => (
                                             <li key={i}><MathText text={sec.content.split('\n')[0]} /></li>
                                         ))}
                                     </ul>
                                 </div>

                                 <div className="mb-6">
                                     <h4 className="text-white font-bold mb-2 uppercase border-b border-gray-700 pb-1">Glosario</h4>
                                     <div className="grid grid-cols-1 gap-3">
                                         {SECTORS[selectedSector].manual.glossary?.map((term, i) => (
                                             <div key={i} className="text-sm">
                                                 <span className={`${SECTOR_THEMES[selectedSector].baseColor} font-bold`}>{term.term}:</span> <span className="text-gray-400">{term.definition}</span>
                                             </div>
                                         ))}
                                     </div>
                                 </div>
                             </div>
                         </div>
                     </div>
                 ) : (
                     <div className="h-full flex flex-col items-center justify-center text-gray-600 space-y-6 p-8 text-center">
                         <div className="w-24 h-24 border-4 border-gray-700 flex items-center justify-center bg-black/50">
                             <PixelSymbol variant="database" size={48} className="animate-pulse" />
                         </div>
                         <div>
                             <h3 className="text-xl font-bold font-sans text-gray-500 mb-2">ESPERANDO SELECCIÓN</h3>
                             <p className="text-sm max-w-md mx-auto leading-relaxed">
                                 Selecciona un sector completado (Badge con color) en el panel izquierdo para visualizar el resumen táctico y desbloquear la descarga de datos.
                             </p>
                         </div>
                     </div>
                 )}
             </div>
        </div>

      </div>
    </div>
  );
};
