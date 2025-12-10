
import React, { useState, useEffect } from 'react';
import { SectorId } from '../../types';

interface ConceptAnimationProps {
  sectorId: SectorId;
  activeSection: number;
}

export const ConceptAnimation: React.FC<ConceptAnimationProps> = ({ sectorId, activeSection }) => {
  const [frame, setFrame] = useState(0);

  // Loop internal animation frames
  useEffect(() => {
    setFrame(0); // Reset frame when section changes
    const timer = setInterval(() => {
      setFrame((prev) => (prev + 1));
    }, 2000); // 2s per frame
    return () => clearInterval(timer);
  }, [sectorId, activeSection]);

  const renderIntegers = () => {
    // 0: Number Line (Navigation) with Moving Drone
    if (activeSection === 0) {
        // Example: -2 + 5 = 3
        const step = frame % 4; // 0: Start at -2, 1: Move arrow, 2: Land at 3, 3: Pause
        
        return (
            <div className="w-full flex flex-col items-center justify-center relative h-full pt-4 bg-gray-900/50">
                <div className="absolute top-2 left-2 text-xs text-cyber-primary font-mono bg-black px-2 border border-cyber-primary/30">
                  OPERACIÓN: -2 + 5
                </div>
                
                <div className="w-4/5 h-20 relative flex items-center mt-4">
                    {/* Main Line */}
                    <div className="absolute w-full h-1 bg-gray-600 top-1/2 -translate-y-1/2 z-0"></div>
                    
                    {/* Grid Marks */}
                    {[-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5].map(m => (
                        <div key={m} className="absolute h-full top-0 flex flex-col items-center justify-center z-0 -translate-x-1/2" style={{ left: `${(m + 5) * 10}%` }}>
                            <div className={`w-[2px] ${m === 0 ? 'h-full bg-white opacity-50' : 'h-3 bg-gray-500'}`}></div>
                            <div className={`mt-8 text-[10px] font-mono ${m === 0 ? 'text-white' : 'text-gray-500'}`}>{m}</div>
                        </div>
                    ))}

                    {/* Start Point (-2) at 30% */}
                    <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 bg-red-500 z-10 shadow-[0_0_10px_red]" style={{ left: '30%' }}></div>
                    
                    {/* Movement Arrow from 30% to 80% */}
                    <div className={`absolute top-1/2 -translate-y-full h-8 border-t-2 border-r-2 border-cyber-success transition-all duration-1000 ease-in-out z-20`}
                         style={{ 
                            left: '30%', 
                            width: step >= 1 ? '50%' : '0%', 
                            opacity: step >= 1 ? 1 : 0
                         }}>
                         <div className="absolute -top-6 right-0 text-cyber-success font-bold text-xs translate-x-1/2">+5</div>
                    </div>

                    {/* End Point (3) at 80% */}
                     <div className={`absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 bg-cyber-success z-10 shadow-[0_0_10px_#00ff9d] transition-opacity duration-300`} 
                          style={{ left: '80%', opacity: step >= 2 ? 1 : 0 }}></div>
                </div>
                
                <div className="mt-4 font-mono text-white text-lg h-6">
                    {step === 0 && <span className="text-red-400">Inicio: -2</span>}
                    {step === 1 && <span className="text-cyber-success">Ascenso: +5</span>}
                    {step >= 2 && <span className="text-white font-bold">-2 + 5 = 3</span>}
                </div>
            </div>
        );
    } else if (activeSection === 1) {
        // Signs Clashing
        const scenario = frame % 3; // 0: + +, 1: - -, 2: + -
        const leftSign = scenario === 1 ? '-' : '+';
        const rightSign = scenario === 2 ? '-' : scenario === 1 ? '-' : '+';
        const result = scenario === 2 ? '-' : '+';
        const resultColor = scenario === 2 ? 'text-red-500' : 'text-cyber-success';

        return (
            <div className="flex flex-col items-center justify-center h-full gap-4 bg-black">
                <div className="flex items-center gap-12 relative">
                    <div className="w-12 h-12 border-2 border-white flex items-center justify-center text-2xl font-bold animate-[slideRight_1s_ease-in-out_infinite]">
                        {leftSign}
                    </div>
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white animate-ping opacity-50"></div>
                    <div className="w-12 h-12 border-2 border-white flex items-center justify-center text-2xl font-bold animate-[slideLeft_1s_ease-in-out_infinite]">
                        {rightSign}
                    </div>
                </div>
                <div className="text-gray-400 text-sm mt-2">RESULTADO DE LA COLISIÓN</div>
                <div className={`text-6xl font-bold ${resultColor} drop-shadow-[0_0_15px_currentColor] animate-bounce`}>
                    {result}
                </div>
            </div>
        );
    } else {
        // PAPOMUDAS
        const steps = ["( ) Paréntesis", "x² Potencias", "× ÷ Multi/Div", "+ - Suma/Resta"];
        const activeStep = frame % 4; 
        
        return (
            <div className="flex items-center justify-center h-full gap-8">
                <div className="flex flex-col gap-1">
                    {steps.map((st, i) => (
                        <div key={i} className={`w-48 p-2 border border-gray-600 text-center transition-all duration-300 font-mono text-sm
                            ${i === activeStep ? 'bg-cyber-primary text-black font-bold shadow-[4px_4px_0px_0px_rgba(0,242,255,0.5)] z-10 border-cyber-primary' : 'bg-gray-900 text-gray-500 opacity-50'}
                        `}>
                            {i+1}. {st}
                        </div>
                    ))}
                </div>
            </div>
        );
    }
  };

  const renderRationals = () => {
    if (activeSection === 0) { // Fraction vs Decimal
        const showFrac = frame % 2 === 0;
        return (
            <div className="flex flex-row items-center justify-center h-full gap-12 bg-gray-900/50">
                <div className={`flex flex-col items-center gap-2 transition-all duration-500 ${showFrac ? 'opacity-100' : 'opacity-30 blur-sm'}`}>
                    <div className="w-24 h-48 border-4 border-orange-500 bg-black relative">
                        <div className="absolute bottom-0 w-full h-1/2 bg-orange-500"></div>
                    </div>
                    <span className="font-mono text-orange-500 font-bold text-3xl">1/2</span>
                </div>
                <div className="text-gray-500 font-bold text-4xl">=</div>
                <div className={`flex flex-col items-center gap-2 transition-all duration-500 ${!showFrac ? 'opacity-100' : 'opacity-30 blur-sm'}`}>
                    <div className="w-24 h-48 border-4 border-green-500 bg-black relative flex items-end">
                        <div className="w-full bg-green-500 h-1/2"></div>
                    </div>
                    <span className="font-mono text-green-500 font-bold text-3xl">0.5</span>
                </div>
            </div>
        );
    } else { 
         // LCM Visual - IMPROVED FOR CLARITY (Blue/Green)
         const step = frame % 3; // 0: Different sizes, 1: Cut grid, 2: Merge
         
         return (
             <div className="flex flex-col items-center justify-center h-full w-full max-w-lg mx-auto px-4 bg-gray-900/50 border border-gray-800">
                 <div className="text-sm font-mono text-gray-400 mb-6 text-center w-full uppercase tracking-widest font-bold">
                     {step === 0 ? "PASO 1: BLOQUES DE DISTINTO TAMAÑO" : step === 1 ? "PASO 2: CORTAR EN PARTES IGUALES (MCM)" : "PASO 3: FUSIÓN DE PIEZAS"}
                 </div>
                 
                 <div className="flex items-end justify-center gap-8 w-full h-48">
                     
                     {/* 1/2 Block (Blue) */}
                     <div className="flex flex-col items-center gap-2">
                        <div className={`w-20 h-40 border-2 border-white bg-black flex flex-col justify-end transition-all`}>
                             <div className="w-full h-1/2 bg-blue-500 border-t border-white relative">
                                 {step >= 1 && (
                                     <div className="absolute inset-0 w-full h-1/2 border-b-2 border-black/50 animate-pulse"></div>
                                 )}
                             </div>
                        </div>
                        <span className="font-mono text-blue-400 font-bold text-xl">{step === 0 ? "1/2" : "2/4"}</span>
                     </div>

                     <span className="text-4xl text-gray-500 mb-16 font-bold">+</span>

                     {/* 1/4 Block (Green) */}
                     <div className="flex flex-col items-center gap-2">
                         <div className="w-20 h-40 border-2 border-white bg-black flex flex-col justify-end">
                             <div className="w-full h-1/4 bg-green-500 border-t border-white"></div>
                         </div>
                         <span className="font-mono text-green-400 font-bold text-xl">1/4</span>
                     </div>

                     <span className="text-4xl text-gray-500 mb-16 font-bold">=</span>
                     
                     {/* Result */}
                     <div className={`flex flex-col items-center gap-2 transition-opacity duration-500 ${step === 2 ? 'opacity-100' : 'opacity-20'}`}>
                         <div className="w-20 h-40 border-2 border-white bg-black flex flex-col justify-end">
                             <div className="w-full h-1/4 bg-blue-500 border-t border-white"></div>
                             <div className="w-full h-1/4 bg-blue-500 border-t border-white"></div>
                             <div className="w-full h-1/4 bg-green-500 border-t border-white"></div>
                         </div>
                         <span className="font-mono text-white font-bold text-xl">3/4</span>
                     </div>
                 </div>
             </div>
         );
    }
  };

  const renderPercents = () => {
     if (activeSection === 0) { 
         const charge = (frame % 5) * 25; 
         return (
             <div className="flex flex-col items-center justify-center h-full gap-4 w-full px-8">
                 <div className="relative w-full max-w-md h-12 border-4 border-gray-600 p-1 flex items-center bg-black">
                     <div className="h-full bg-purple-500 transition-all duration-500 ease-out z-0" style={{ width: `${charge}%` }}></div>
                 </div>
                 <div className="font-mono text-2xl font-bold text-white flex gap-4"><span>{charge}%</span></div>
             </div>
         );
     } else {
         return <div className="text-center font-mono text-purple-400 text-xl">FACTOR DE VARIACIÓN: 1.X</div>; 
     }
  };

  const renderPowers = () => {
     const stage = frame % 4; 
     const count = Math.pow(2, stage);
     return (
        <div className="flex flex-col items-center justify-center h-full">
            <div className="grid grid-cols-4 gap-2 w-48 h-32 content-center transition-all duration-500">
                {Array.from({length: count}).map((_, i) => (
                    <div key={i} className="w-6 h-6 bg-yellow-400 border border-black shadow-[2px_2px_0px_rgba(0,0,0,0.5)]"></div>
                ))}
            </div>
            <div className="mt-4 font-mono text-xl bg-black border border-yellow-500 px-4 py-1">
                2^{stage} = <span className="text-yellow-400 font-bold">{count}</span>
            </div>
        </div>
     );
  };

  const renderRoots = () => {
     const showArea = frame % 2 === 0;
     return (
        <div className="flex flex-col items-center justify-center h-full gap-4">
            <div className={`relative w-40 h-40 border-4 transition-all duration-500 flex items-center justify-center bg-gray-900 ${showArea ? 'border-red-500' : 'border-gray-600'}`}>
                {showArea ? (
                    <div className="text-red-500 font-bold text-4xl font-mono bg-black px-2 shadow-lg">16</div>
                ) : (
                    <>
                      <div className="absolute -left-8 top-1/2 -translate-y-1/2 text-white font-bold font-mono text-xl">4</div>
                      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-white font-bold font-mono text-xl">4</div>
                    </>
                )}
            </div>
            <div className="font-mono text-xl bg-black px-6 py-2 border border-gray-700 mt-4">
                {showArea ? <span className="text-red-500">ÁREA = 16</span> : <span>LADO = √16 = 4</span>}
            </div>
        </div>
     );
  };

  const renderContent = () => {
      if (activeSection === 99) return <div className="text-cyber-primary animate-pulse text-center mt-10 font-mono">DATOS CONFIDENCIALES</div>;

      switch(sectorId) {
          case 'integers': return renderIntegers();
          case 'rationals': return renderRationals();
          case 'percentages': return renderPercents();
          case 'powers': return renderPowers();
          case 'roots': return renderRoots();
          default: return null;
      }
  }

  return (
    <div className="w-full h-full bg-black/90 mb-0 overflow-hidden relative shadow-[inset_0_0_40px_rgba(0,0,0,0.8)]">
      <div className="absolute inset-0 opacity-10 pointer-events-none" 
             style={{ backgroundImage: 'linear-gradient(#444 1px, transparent 1px), linear-gradient(90deg, #444 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
      </div>
      <div className="w-full h-full p-4">
        {renderContent()}
      </div>
    </div>
  );
};
