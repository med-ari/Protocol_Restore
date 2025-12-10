
import React from 'react';
import { SectorId } from '../types';
import { SECTORS, SECTOR_THEMES, SECTOR_DISPLAY_NAMES } from '../constants';
import { Logo } from './UI/Logo';
import { MathText } from './UI/MathText';
import { SectorMiniScene } from './UI/SectorMiniScene';

interface PrintableSectorProps {
  sectorId: SectorId;
  id?: string;
}

export const PrintableSector: React.FC<PrintableSectorProps> = ({ sectorId, id = "printable-sector" }) => {
  const sector = SECTORS[sectorId];
  const theme = SECTOR_THEMES[sectorId];

  return (
    <div id={id} className="bg-[#020408] text-white p-8 font-mono" style={{ width: '794px', minHeight: '1123px' }}>
      
      {/* HEADER */}
      <div className="flex items-center justify-between border-b-4 border-white pb-4 mb-8">
          <div className="flex items-center gap-4">
              <Logo size={64} />
              <div>
                  <h1 className="text-4xl font-sans font-bold text-white">PROTOCOL: RESTORE</h1>
                  <p className="text-sm tracking-widest uppercase">REPORTE TÁCTICO: {SECTOR_DISPLAY_NAMES[sectorId].split('[')[0]}</p>
              </div>
          </div>
          <div className="text-right">
               <div className="text-4xl font-bold text-white opacity-20">{theme.iconVariant.toUpperCase()}</div>
               <div className="text-xs uppercase">CLASIFICACIÓN: TOP SECRET</div>
          </div>
      </div>

      {/* HOOK & VISUAL */}
      <div className="grid grid-cols-3 gap-6 mb-8">
          <div className="col-span-2 bg-gray-900 p-6 border-l-4" style={{ borderColor: theme.primaryColor }}>
              <h3 className="font-bold text-lg mb-2 uppercase" style={{ color: theme.primaryColor }}>Informe de Situación</h3>
              <p className="text-sm text-gray-300 leading-relaxed"><MathText text={sector.hook.message} /></p>
          </div>
          <div className="col-span-1 bg-black border border-gray-700 p-4 flex items-center justify-center">
              <SectorMiniScene sectorId={sectorId} />
          </div>
      </div>

      {/* LAB INSTRUCTION */}
      {sector.lab.type !== 'none' && (
        <div className="mb-8 p-4 border-2 border-dashed border-gray-700">
            <h3 className="font-bold text-sm mb-1 uppercase text-gray-500">Protocolo de Laboratorio</h3>
            <p className="text-sm text-white italic"><MathText text={sector.lab.instruction} /></p>
        </div>
      )}

      {/* MANUAL (CONCEPTS) */}
      <div className="mb-8">
           <h2 className="text-2xl font-bold border-b-2 border-white mb-4 uppercase flex items-center gap-2">
              <span style={{ color: theme.primaryColor }}>◼</span> Base de Conocimiento
           </h2>
           <div className="space-y-4">
               {sector.manual.sections.map((sec, i) => (
                   <div key={i} className="bg-gray-900 p-4 border-l-4 border-white">
                       <h3 className="font-bold text-lg mb-1" style={{ color: theme.primaryColor }}>{sec.title}</h3>
                       <p className="text-sm text-gray-300 leading-relaxed whitespace-pre-wrap"><MathText text={sec.content} /></p>
                   </div>
               ))}
           </div>
      </div>

      {/* GLOSSARY & LEARN MORE */}
      <div className="grid grid-cols-2 gap-6 mb-8">
          {sector.manual.glossary && (
              <div>
                  <h3 className="font-bold text-white border-b border-gray-600 mb-3 pb-1 uppercase">Glosario</h3>
                  <div className="space-y-2">
                      {sector.manual.glossary.map((term, i) => (
                          <div key={i} className="text-xs border border-gray-800 p-2">
                              <span style={{ color: theme.primaryColor }} className="font-bold">{term.term}:</span> {term.definition}
                          </div>
                      ))}
                  </div>
              </div>
          )}
          {sector.manual.learnMore && (
              <div className="bg-gray-900 p-4 border border-gray-700">
                  <h3 className="font-bold text-white mb-2 uppercase text-xs tracking-wider">{sector.manual.learnMore.title}</h3>
                  <p className="text-xs text-gray-400 leading-relaxed"><MathText text={sector.manual.learnMore.content} /></p>
              </div>
          )}
      </div>

      {/* MISSION */}
      {sector.mission.steps.length > 0 && (
          <div className="mb-8 break-inside-avoid">
              <h2 className="text-2xl font-bold border-b-2 border-white mb-4 uppercase flex items-center gap-2">
                  <span style={{ color: theme.primaryColor }}>◼</span> Misión Operativa
              </h2>
              <div className="grid grid-cols-1 gap-2">
                  {sector.mission.steps.map((step, i) => (
                      <div key={i} className="flex gap-4 p-3 bg-black border border-gray-800">
                          <div className="font-bold text-gray-500 text-xs w-16 shrink-0">PASO 0{i+1}</div>
                          <div className="text-sm text-gray-300 flex-1"><MathText text={step.label} /></div>
                          <div className="text-sm font-bold text-white border-l border-gray-700 pl-4 w-24 text-right">
                              {step.correctValue}
                          </div>
                      </div>
                  ))}
              </div>
          </div>
      )}

      {/* QUIZ BANK */}
      {sector.quiz.questions.length > 0 && (
          <div className="mb-8 break-inside-avoid">
              <h2 className="text-2xl font-bold border-b-2 border-white mb-4 uppercase flex items-center gap-2">
                  <span style={{ color: theme.primaryColor }}>◼</span> Banco de Simulación
              </h2>
              <div className="space-y-4">
                  {sector.quiz.questions.map((q, i) => (
                      <div key={i} className="text-sm">
                          <div className="font-bold text-gray-400 mb-1">PREGUNTA {i+1} [{q.difficulty}]</div>
                          <div className="mb-2 text-white"><MathText text={q.text} /></div>
                          <div className="grid grid-cols-2 gap-2">
                              {q.options.map((opt) => (
                                  <div key={opt.id} className={`p-1 px-2 border ${opt.isCorrect ? 'border-white bg-white/10 font-bold' : 'border-gray-800 text-gray-500'}`}>
                                      {opt.isCorrect && <span className="mr-2" style={{ color: theme.primaryColor }}>[OK]</span>}
                                      <MathText text={opt.text} />
                                  </div>
                              ))}
                          </div>
                      </div>
                  ))}
              </div>
          </div>
      )}

      {/* FOOTER */}
      <div className="mt-auto border-t-2 border-white pt-4 flex justify-between text-xs text-gray-500 uppercase tracking-widest">
          <div>AXIOM SYSTEMS // EDU-CORE M1</div>
          <div>EXPORT_ID: {Date.now().toString(36).toUpperCase()}</div>
      </div>

    </div>
  );
};
