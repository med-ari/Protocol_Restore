
import React from 'react';
import { MODULES } from '../constants';
import { ModuleId } from '../types';
import { PixelSymbol } from './UI/PixelSymbol';
import { soundManager } from '../utils/sound';
import { Logo } from './UI/Logo';

interface ModuleSelectorProps {
    onSelectModule: (id: ModuleId) => void;
}

export const ModuleSelector: React.FC<ModuleSelectorProps> = ({ onSelectModule }) => {
    return (
        <div className="flex flex-col items-center w-full max-w-6xl mx-auto p-4 relative z-20 animate-in fade-in duration-1000">
            <div className="mb-16 text-center relative">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-cyber-primary/5 blur-3xl rounded-full pointer-events-none"></div>
                <Logo size={80} className="mx-auto mb-6 drop-shadow-[0_0_20px_rgba(0,242,255,0.3)] relative z-10" />
                <h1 className="text-4xl md:text-6xl font-sans font-bold text-white mb-2 drop-shadow-md relative z-10">SELECTOR DE MISIÓN</h1>
                <div className="flex items-center justify-center gap-4 text-gray-500 font-mono tracking-widest uppercase text-sm relative z-10">
                    <span className="w-8 h-px bg-gray-700"></span>
                    <span>Acceso a Base de Datos</span>
                    <span className="w-8 h-px bg-gray-700"></span>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full px-4 md:px-12">
                {MODULES.map((mod, index) => {
                    const isCyan = mod.id === 'm1_numbers';
                    const themeColor = isCyan ? 'text-cyber-primary' : 'text-indigo-400';
                    const borderColor = isCyan ? 'border-cyber-primary' : 'border-indigo-500';
                    const glowColor = isCyan ? 'group-hover:shadow-[0_0_30px_rgba(0,242,255,0.2)]' : 'group-hover:shadow-[0_0_30px_rgba(99,102,241,0.2)]';
                    const bgGradient = isCyan ? 'from-cyber-primary/5' : 'from-indigo-500/5';

                    return (
                        <button
                            key={mod.id}
                            onClick={() => { soundManager.playClick(); onSelectModule(mod.id); }}
                            onMouseEnter={() => soundManager.playHover()}
                            className={`
                                group relative w-full h-[320px] text-left transition-all duration-300 ease-out
                                hover:-translate-y-2
                            `}
                        >
                            {/* Outer Glow / Border Container */}
                            <div className={`
                                absolute inset-0 bg-[#050b14] border-2 ${isCyan ? 'border-gray-700' : 'border-gray-700'}
                                group-hover:border-opacity-100 transition-all duration-300
                                ${glowColor}
                            `}>
                                {/* Animated Background Gradient on Hover */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${bgGradient} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                                
                                {/* Scanline Effect */}
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-10 pointer-events-none bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[size:4px_4px] z-0"></div>
                            </div>

                            {/* Main Content Layout */}
                            <div className="relative z-10 h-full flex flex-col p-1">
                                {/* Top Tech Header */}
                                <div className={`flex justify-between items-start p-4 border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm group-hover:bg-gray-900 transition-colors`}>
                                    <div className="flex items-center gap-3">
                                        <div className={`p-2 border ${borderColor} bg-black/50 group-hover:bg-${isCyan ? 'cyan' : 'indigo'}-900/20 transition-colors`}>
                                            <PixelSymbol 
                                                variant={mod.icon as any} 
                                                size={32} 
                                                className={`${themeColor} group-hover:scale-110 transition-transform duration-300`} 
                                            />
                                        </div>
                                        <div>
                                            <div className="text-[10px] text-gray-500 font-mono font-bold">ID_REF</div>
                                            <div className={`text-xl font-bold font-sans leading-none ${themeColor}`}>MOD_0{index + 1}</div>
                                        </div>
                                    </div>
                                    <div className={`text-[10px] font-mono font-bold px-2 py-1 border ${borderColor} text-white bg-black/50 uppercase tracking-widest opacity-50 group-hover:opacity-100 transition-opacity`}>
                                        Online
                                    </div>
                                </div>

                                {/* Body */}
                                <div className="flex-1 p-6 flex flex-col justify-center relative">
                                    {/* Decorative Brackets */}
                                    <div className={`absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 ${isCyan ? 'border-cyan-800' : 'border-indigo-900'} group-hover:${borderColor} transition-colors`}></div>
                                    <div className={`absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 ${isCyan ? 'border-cyan-800' : 'border-indigo-900'} group-hover:${borderColor} transition-colors`}></div>

                                    <h3 className={`text-4xl font-sans font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r ${isCyan ? 'from-white to-cyan-400' : 'from-white to-indigo-400'} transition-all`}>
                                        {mod.title.split(': ')[1]}
                                    </h3>
                                    
                                    {/* Summary - ENHANCED VISIBILITY */}
                                    <div className="mt-2 pl-4 border-l-4 border-gray-700 group-hover:border-white transition-colors">
                                        <p className="text-gray-400 group-hover:text-white font-mono text-base font-bold leading-relaxed max-w-[90%]">
                                            {mod.description}
                                        </p>
                                    </div>
                                </div>

                                {/* Footer / Action */}
                                <div className="p-4 border-t border-gray-800 bg-black/30 flex justify-between items-center group-hover:bg-gray-900/80 transition-colors">
                                    <div className="flex gap-1">
                                        {[1,2,3].map(i => (
                                            <div key={i} className={`w-1 h-3 ${themeColor} opacity-20 group-hover:opacity-100 transition-opacity`} style={{ transitionDelay: `${i * 50}ms` }}></div>
                                        ))}
                                    </div>
                                    <div className={`text-xs font-mono font-bold uppercase tracking-[0.2em] flex items-center gap-2 ${themeColor} opacity-70 group-hover:opacity-100`}>
                                        [ Iniciar Protocolo ]
                                        <PixelSymbol variant="chevron-right" size={14} />
                                    </div>
                                </div>
                            </div>

                            {/* Active Border Overlay on Hover */}
                            <div className={`absolute inset-0 border-2 ${borderColor} opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`}></div>
                        </button>
                    );
                })}
            </div>
        </div>
    );
};
