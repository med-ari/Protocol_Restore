
import React from 'react';
import { SectorId } from '../../types';
import { PixelSymbol } from './PixelSymbol';

interface SectorMiniSceneProps {
  sectorId: SectorId;
}

export const SectorMiniScene: React.FC<SectorMiniSceneProps> = ({ sectorId }) => {
  // Inline styles added to ensure dimensions persist in HTML exports before CSS loads
  const containerStyle = { width: '100%', height: '160px', minHeight: '160px' };

  switch(sectorId) {
      case 'integers':
          return (
              <div style={containerStyle} className="w-full h-40 relative bg-gray-900 border border-gray-700 flex flex-col items-center justify-center overflow-hidden p-4">
                  {/* Number Line Visual */}
                  <div className="w-full h-1 bg-gray-500 relative mt-4">
                      {/* Ticks */}
                      {[0, 20, 40, 60, 80, 100].map((pos) => (
                          <div key={pos} className="absolute h-3 w-0.5 bg-gray-600 top-1/2 -translate-y-1/2" style={{left: `${pos}%`}}></div>
                      ))}
                      {/* Center Zero */}
                      <div className="absolute h-full w-1 bg-white top-0 left-1/2 -translate-x-1/2"></div>
                      
                      {/* Vector Arrow (Negative Movement) */}
                      <div className="absolute top-[-10px] h-1 bg-red-500" style={{ left: '20%', width: '30%' }}></div>
                      <div className="absolute top-[-13px] left-[20%] w-0 h-0 border-t-[4px] border-t-transparent border-r-[8px] border-r-red-500 border-b-[4px] border-b-transparent"></div>
                      
                      {/* Labels */}
                      <div className="absolute top-4 left-[20%] -translate-x-1/2 text-red-400 font-mono text-xs font-bold">-3</div>
                      <div className="absolute top-4 left-1/2 -translate-x-1/2 text-white font-mono text-xs font-bold">0</div>
                  </div>
                  <div className="mt-8 text-xs text-gray-400 font-mono uppercase tracking-widest">VECTOR DE DESPLAZAMIENTO</div>
              </div>
          );
      case 'rationals':
           return (
              <div style={containerStyle} className="w-full h-40 relative bg-gray-900 border border-gray-700 flex flex-col items-center justify-center gap-4 p-6">
                  {/* Fraction Comparison */}
                  <div className="w-full max-w-[200px] space-y-2">
                      <div className="w-full h-8 bg-black border border-orange-500 relative flex">
                          <div className="w-1/2 h-full bg-orange-500/50 flex items-center justify-center text-white text-xs font-bold border-r border-orange-500">1/2</div>
                          <div className="w-1/2 h-full"></div>
                      </div>
                      <div className="flex w-full text-white text-center font-bold text-xl leading-none justify-center">=</div>
                      <div className="w-full h-8 bg-black border border-green-500 relative flex">
                          <div className="w-1/4 h-full bg-green-500/50 flex items-center justify-center text-white text-xs border-r border-green-500">1/4</div>
                          <div className="w-1/4 h-full bg-green-500/50 flex items-center justify-center text-white text-xs border-r border-green-500">1/4</div>
                          <div className="w-1/2 h-full"></div>
                      </div>
                  </div>
                  <div className="text-xs text-gray-400 font-mono uppercase tracking-widest">EQUIVALENCIA VISUAL</div>
              </div>
          );
      case 'percentages':
          return (
              <div style={containerStyle} className="w-full h-40 relative bg-gray-900 border border-gray-700 flex flex-col items-center justify-center p-6">
                  <div className="w-full max-w-[240px] relative">
                      {/* Bar Container */}
                      <div className="h-12 w-full border-2 border-gray-600 bg-black p-1 relative">
                          {/* Fill */}
                          <div className="h-full bg-purple-500 w-[80%] relative">
                              <div className="absolute right-0 top-0 bottom-0 w-1 bg-white animate-pulse"></div>
                          </div>
                          {/* Markers */}
                          <div className="absolute top-full left-0 text-[10px] text-gray-500 font-bold mt-1">0%</div>
                          <div className="absolute top-full right-0 text-[10px] text-gray-500 font-bold mt-1">100%</div>
                      </div>
                      {/* Label */}
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-bold text-white drop-shadow-md text-xl">80%</div>
                  </div>
                  <div className="mt-6 text-xs text-gray-400 font-mono uppercase tracking-widest">EFICIENCIA DE ESCUDO</div>
              </div>
          );
      case 'powers':
          return (
               <div style={containerStyle} className="w-full h-40 relative bg-gray-900 border border-gray-700 flex flex-col items-center justify-center p-4">
                   {/* Recursive Grid */}
                   <div className="flex gap-4 items-center">
                       <div className="w-8 h-8 border border-yellow-500 bg-yellow-900/20 flex items-center justify-center text-[10px] text-yellow-500">2^1</div>
                       <div className="text-gray-600">→</div>
                       <div className="grid grid-cols-2 gap-1">
                           <div className="w-6 h-6 bg-yellow-500 border border-black"></div>
                           <div className="w-6 h-6 bg-yellow-500 border border-black"></div>
                       </div>
                       <div className="text-gray-600">→</div>
                       <div className="grid grid-cols-2 gap-1">
                           <div className="grid grid-cols-2 gap-px w-6 h-6">
                                <div className="bg-yellow-400"></div><div className="bg-yellow-400"></div>
                                <div className="bg-yellow-400"></div><div className="bg-yellow-400"></div>
                           </div>
                           <div className="grid grid-cols-2 gap-px w-6 h-6">
                                <div className="bg-yellow-400"></div><div className="bg-yellow-400"></div>
                                <div className="bg-yellow-400"></div><div className="bg-yellow-400"></div>
                           </div>
                       </div>
                   </div>
                   <div className="mt-4 text-xs text-gray-400 font-mono uppercase tracking-widest">CRECIMIENTO EXPONENCIAL</div>
               </div>
          );
      case 'roots':
          return (
               <div style={containerStyle} className="w-full h-40 relative bg-gray-900 border border-gray-700 flex flex-col items-center justify-center p-4">
                   <div className="flex items-end gap-4">
                       {/* The Square */}
                       <div className="w-24 h-24 border-2 border-red-500 bg-red-900/20 flex items-center justify-center relative">
                           <div className="absolute -left-4 top-1/2 -translate-y-1/2 text-red-500 font-bold font-mono text-xs rotate-[-90deg]">LADO</div>
                           <div className="text-white font-bold font-mono text-lg">ÁREA</div>
                       </div>
                       
                       {/* Formula */}
                       <div className="font-mono text-xs text-gray-400 mb-2">
                           <div>L² = A</div>
                           <div>L = √A</div>
                       </div>
                   </div>
                   <div className="mt-4 text-xs text-gray-400 font-mono uppercase tracking-widest">GEOMETRÍA RADICAL</div>
               </div>
          );
      case 'linear_functions':
          return (
               <div style={containerStyle} className="w-full h-40 relative bg-gray-900 border border-gray-700 flex flex-col items-center justify-center p-4">
                   <div className="relative w-32 h-32 border border-indigo-900 bg-black flex items-center justify-center">
                       {/* Axes */}
                       <div className="absolute w-full h-px bg-indigo-500/50 top-1/2"></div>
                       <div className="absolute h-full w-px bg-indigo-500/50 left-1/2"></div>
                       {/* Line */}
                       <div className="absolute w-full h-1 bg-indigo-400 rotate-45"></div>
                       {/* Point */}
                       <div className="absolute w-2 h-2 bg-white rounded-full top-[30%] left-[70%]"></div>
                   </div>
                   <div className="mt-4 text-xs text-indigo-400 font-mono uppercase tracking-widest">TRAYECTORIA f(x)=mx+n</div>
               </div>
          );
      case 'algebraic_expressions':
          return (
               <div style={containerStyle} className="w-full h-40 relative bg-gray-900 border border-gray-700 flex flex-col items-center justify-center p-4">
                   <div className="flex gap-4 items-end">
                       <div className="flex flex-col gap-1 items-center">
                           <div className="w-8 h-8 bg-sky-500 border border-white flex items-center justify-center text-xs font-bold">X</div>
                           <div className="w-8 h-8 bg-sky-500 border border-white flex items-center justify-center text-xs font-bold">X</div>
                           <span className="text-sky-400 text-xs font-bold">2x</span>
                       </div>
                       <div className="text-gray-500 font-bold mb-4">+</div>
                       <div className="flex flex-col gap-1 items-center">
                           <div className="w-8 h-8 bg-purple-500 border border-white flex items-center justify-center text-xs font-bold">Y</div>
                           <span className="text-purple-400 text-xs font-bold">y</span>
                       </div>
                   </div>
                   <div className="mt-4 text-xs text-sky-400 font-mono uppercase tracking-widest">CLASIFICACIÓN DE TÉRMINOS</div>
               </div>
          );
      case 'factorization':
          return (
               <div style={containerStyle} className="w-full h-40 relative bg-gray-900 border border-gray-700 flex flex-col items-center justify-center p-4">
                   <div className="relative w-24 h-24 bg-fuchsia-900/30 border border-fuchsia-500 flex flex-wrap">
                       <div className="w-16 h-16 bg-fuchsia-600 border border-white"></div>
                       <div className="w-8 h-16 bg-purple-500/50 border border-purple-400"></div>
                       <div className="w-16 h-8 bg-purple-500/50 border border-purple-400"></div>
                       <div className="w-8 h-8 bg-yellow-500/50 border border-yellow-400"></div>
                   </div>
                   <div className="mt-4 text-xs text-fuchsia-400 font-mono uppercase tracking-widest">ÁREA (a+b)²</div>
               </div>
          );
      default:
          return <div style={containerStyle} className="flex items-center justify-center w-full h-32 bg-gray-900"><PixelSymbol variant="database" size={64} className="text-gray-500" /></div>;
  }
};
