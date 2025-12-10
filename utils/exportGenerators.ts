
import { SECTORS, SECTOR_DISPLAY_NAMES, SECTOR_THEMES } from "../constants";
import { SectorId } from "../types";

// Helper to trigger download
const downloadFile = (filename: string, content: string, mimeType: string) => {
  const blob = new Blob([content], { type: mimeType });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};

const getSectorInteractiveScript = (id: SectorId, themeColor: string) => {
    // Logic to inject Vanilla JS mini-apps into the exported HTML
    
    switch(id) {
        case 'integers':
            return `
                const root = document.getElementById('interactive-demo');
                let val = 0;
                const render = () => {
                    root.innerHTML = \`
                        <div class="p-6 border-2 border-dashed border-gray-700 bg-gray-900/80 text-center font-mono rounded relative overflow-hidden">
                            <h4 class="text-gray-400 text-xs uppercase tracking-widest mb-4">SIMULADOR TÉRMICO</h4>
                            <div class="mb-6 relative">
                                <div class="text-6xl font-bold transition-colors duration-300" style="color: \${val < 0 ? '#f87171' : val > 0 ? '#22d3ee' : '#fff'}">\${val > 0 ? '+' : ''}\${val}°C</div>
                                <div class="h-1 w-full bg-gray-700 mt-4 relative">
                                    <div class="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-[0_0_10px_white] transition-all duration-300" style="left: \${Math.max(0, Math.min(100, ((val + 20) / 40) * 100))}%"></div>
                                </div>
                            </div>
                            <div class="flex gap-2 justify-center flex-wrap">
                                <button onclick="updateInt(-5)" class="px-4 py-2 bg-red-900/50 text-red-200 border border-red-500 font-bold">-5</button>
                                <button onclick="updateInt(-1)" class="px-4 py-2 bg-red-900/30 text-red-200 border border-red-500/50 font-bold">-1</button>
                                <button onclick="resetInt()" class="px-4 py-2 bg-gray-800 text-white border border-gray-600 font-bold">RESET</button>
                                <button onclick="updateInt(1)" class="px-4 py-2 bg-cyan-900/30 text-cyan-200 border border-cyan-500/50 font-bold">+1</button>
                                <button onclick="updateInt(5)" class="px-4 py-2 bg-cyan-900/50 text-cyan-200 border border-cyan-500 font-bold">+5</button>
                            </div>
                        </div>
                    \`;
                };
                window.updateInt = (delta) => { val += delta; render(); };
                window.resetInt = () => { val = 0; render(); };
                if(root) render();
            `;
        case 'rationals':
            return `
                const root = document.getElementById('interactive-demo');
                let parts = [false, false, false, false];
                const render = () => {
                    const total = parts.filter(x => x).length;
                    const decimal = total * 0.25;
                    root.innerHTML = \`
                        <div class="p-6 border-2 border-dashed border-orange-500/30 bg-black text-center font-mono">
                            <h4 class="text-orange-400 text-xs uppercase tracking-widest mb-4">MEZCLADOR DE FLUIDOS (1/4)</h4>
                            <div class="flex gap-2 h-24 mb-6">
                                \${parts.map((active, i) => \`
                                    <div onclick="togglePart(\${i})" class="flex-1 border-2 cursor-pointer transition-all relative group \${active ? 'bg-orange-500 border-orange-300' : 'bg-gray-900 border-gray-700'}">
                                        <div class="absolute inset-0 flex items-center justify-center font-bold \${active ? 'text-black' : 'text-gray-600'}">1/4</div>
                                    </div>
                                \`).join('')}
                            </div>
                            <div class="flex justify-between items-end border-t border-gray-700 pt-4">
                                <div class="text-left"><div class="text-xs text-gray-500">FRACCIÓN</div><div class="text-2xl text-white font-bold">\${total}/4</div></div>
                                <div class="text-right"><div class="text-xs text-gray-500">DECIMAL</div><div class="text-4xl text-orange-400 font-bold">\${decimal.toFixed(2)}</div></div>
                            </div>
                        </div>
                    \`;
                };
                window.togglePart = (i) => { parts[i] = !parts[i]; render(); };
                if(root) render();
            `;
        case 'percentages':
            return `
                const root = document.getElementById('interactive-demo');
                const render = (val) => {
                    root.innerHTML = \`
                        <div class="p-6 border-2 border-dashed border-purple-500/30 bg-gray-900 font-mono">
                            <h4 class="text-purple-400 text-xs uppercase tracking-widest mb-4">MODULADOR DE ESCUDO</h4>
                            <div class="relative h-12 w-full bg-black border-2 border-gray-600 mb-6 overflow-hidden">
                                <div class="h-full bg-purple-500 transition-all duration-100" style="width: \${val}%"></div>
                                <div class="absolute inset-0 flex items-center justify-center font-bold text-white drop-shadow-md text-lg">\${val}%</div>
                            </div>
                            <input type="range" min="0" max="100" value="\${val}" class="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer" oninput="updateShield(this.value)">
                        </div>
                    \`;
                };
                window.updateShield = (val) => render(val);
                if(root) render(50);
            `;
        case 'powers':
            return `
                const root = document.getElementById('interactive-demo');
                const render = (b, e) => {
                    const res = Math.pow(b, e);
                    let visHTML = '';
                    if(res <= 64) {
                        for(let i=0; i<res; i++) visHTML += '<div class="w-2 h-2 bg-yellow-500 rounded-full"></div>';
                    } else { visHTML = '<div class="text-xs text-gray-500">VISUALIZACIÓN LIMITADA (>64)</div>'; }
                    
                    root.innerHTML = \`
                        <div class="p-6 border-2 border-dashed border-yellow-500/30 bg-black font-mono text-center">
                            <h4 class="text-yellow-400 text-xs uppercase tracking-widest mb-4">CALCULADORA EXPONENCIAL</h4>
                            <div class="flex items-center justify-center gap-4 mb-6">
                                <div class="flex flex-col"><label class="text-xs text-gray-500">BASE</label><input type="number" value="\${b}" class="w-16 bg-gray-800 text-white text-center p-2 font-bold" onchange="calcPower(this.value, \${e})"></div>
                                <div class="text-gray-500 text-xl">^</div>
                                <div class="flex flex-col"><label class="text-xs text-gray-500">EXP</label><input type="number" value="\${e}" class="w-16 bg-gray-800 text-white text-center p-2 font-bold" onchange="calcPower(\${b}, this.value)"></div>
                                <div class="text-gray-500 text-xl">=</div>
                                <div class="text-4xl text-yellow-400 font-bold">\${res}</div>
                            </div>
                            <div class="flex flex-wrap gap-1 justify-center max-h-32 overflow-hidden opacity-50">\${visHTML}</div>
                        </div>
                    \`;
                };
                window.calcPower = (b, e) => render(b,e);
                if(root) render(2,3);
            `;
        case 'roots':
            return `
                const root = document.getElementById('interactive-demo');
                const render = (s) => {
                    const side = parseInt(s);
                    const area = side * side;
                    const px = side * 20;
                    root.innerHTML = \`
                        <div class="p-6 border-2 border-dashed border-red-500/30 bg-gray-900 font-mono flex flex-col items-center">
                            <h4 class="text-red-400 text-xs uppercase tracking-widest mb-6">GEOMETRÍA RADICAL</h4>
                            <div class="border-2 border-red-500 bg-red-900/20 flex items-center justify-center relative mb-6 transition-all duration-300" style="width: \${px}px; height: \${px}px;">
                                <div class="absolute -left-6 top-1/2 -translate-y-1/2 text-xs text-red-400 font-bold -rotate-90">LADO \${side}</div>
                                <div class="text-white font-bold drop-shadow-md text-center">ÁREA<br>\${area}</div>
                            </div>
                            <input type="range" min="1" max="10" value="\${side}" class="w-64 h-2 bg-black appearance-none cursor-pointer" oninput="updateRoot(this.value)">
                        </div>
                    \`;
                };
                window.updateRoot = (s) => render(s);
                if(root) render(5);
            `;
        case 'linear_functions':
            return `
                const root = document.getElementById('interactive-demo');
                const render = (m, n) => {
                    m = parseInt(m);
                    n = parseInt(n);
                    const x1 = -5; const y1 = (m * x1) + n;
                    const x2 = 10; const y2 = (m * x2) + n;
                    const scale = 20; const originX = 150; const originY = 150;
                    const mapX = (x) => originX + (x * scale);
                    const mapY = (y) => originY - (y * scale);

                    root.innerHTML = \`
                        <div class="p-6 border-2 border-dashed border-indigo-500/30 bg-black font-mono text-center">
                            <h4 class="text-indigo-400 text-xs uppercase tracking-widest mb-4">RADAR DE TRAYECTORIA</h4>
                            <div class="relative bg-gray-900 border-2 border-gray-700 h-[300px] overflow-hidden mx-auto max-w-[300px] mb-6">
                                 <svg class="w-full h-full" viewBox="0 0 300 300">
                                    <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M 20 0 L 0 0 0 20" fill="none" stroke="#333" stroke-width="1" /></pattern>
                                    <rect width="100%" height="100%" fill="url(#grid)" />
                                    <line x1="150" y1="0" x2="150" y2="300" stroke="#666" stroke-width="2" />
                                    <line x1="0" y1="150" x2="300" y2="150" stroke="#666" stroke-width="2" />
                                    <line x1="\${mapX(x1)}" y1="\${mapY(y1)}" x2="\${mapX(x2)}" y2="\${mapY(y2)}" stroke="#818cf8" stroke-width="4" stroke-linecap="round" />
                                    <circle cx="\${mapX(3)}" cy="\${mapY(5)}" r="4" fill="#00f2ff" />
                                 </svg>
                            </div>
                            <div class="flex flex-col gap-4 max-w-xs mx-auto">
                                <div class="text-xl font-bold text-white">f(x) = \${m}x + \${n}</div>
                                <input type="range" min="-5" max="5" value="\${m}" class="w-full" oninput="updateFunc(this.value, \${n})">
                                <input type="range" min="-5" max="8" value="\${n}" class="w-full" oninput="updateFunc(\${m}, this.value)">
                            </div>
                        </div>
                    \`;
                };
                window.updateFunc = (m, n) => render(m, n);
                if(root) render(1, 0);
            `;
        case 'algebraic_expressions':
            return `
                const root = document.getElementById('interactive-demo');
                let xc = 2, yc = 1;
                const render = () => {
                    const xBoxes = Array(xc).fill('<div class="w-8 h-8 bg-sky-600 border border-white flex items-center justify-center text-white">X</div>').join('');
                    const yBoxes = Array(yc).fill('<div class="w-8 h-8 bg-purple-600 border border-white flex items-center justify-center text-white">Y</div>').join('');
                    root.innerHTML = \`
                        <div class="p-6 border-2 border-dashed border-sky-500/30 bg-black font-mono text-center">
                            <h4 class="text-sky-400 text-xs uppercase tracking-widest mb-4">CLASIFICADOR DE CARGA</h4>
                            <div class="bg-gray-900 border border-sky-900 p-4 min-h-[150px] flex items-end justify-center gap-8 mb-4">
                                <div class="flex flex-col items-center gap-1"><div class="flex flex-col-reverse gap-1">\${xBoxes}</div><span class="text-sky-400 font-bold">\${xc}x</span></div>
                                <div class="text-2xl text-gray-500 font-bold self-center">+</div>
                                <div class="flex flex-col items-center gap-1"><div class="flex flex-col-reverse gap-1">\${yBoxes}</div><span class="text-purple-400 font-bold">\${yc}y</span></div>
                            </div>
                            <div class="flex justify-center gap-4">
                                <button onclick="modX(1)" class="px-3 py-1 bg-sky-900 text-white border border-sky-500">+X</button>
                                <button onclick="modY(1)" class="px-3 py-1 bg-purple-900 text-white border border-purple-500">+Y</button>
                            </div>
                        </div>
                    \`;
                };
                window.modX = (d) => { xc = Math.max(0, xc+d); render(); };
                window.modY = (d) => { yc = Math.max(0, yc+d); render(); };
                if(root) render();
            `;
        case 'factorization':
            return `
                const root = document.getElementById('interactive-demo');
                const render = (a, b) => {
                    a = parseInt(a); b = parseInt(b);
                    const scale = 20;
                    root.innerHTML = \`
                        <div class="p-6 border-2 border-dashed border-fuchsia-500/30 bg-black font-mono text-center">
                            <h4 class="text-fuchsia-400 text-xs uppercase tracking-widest mb-4">INGENIERÍA INVERSA (ÁREA)</h4>
                            <div class="bg-gray-900 border border-fuchsia-900 h-[200px] flex items-center justify-center mb-4">
                                <div style="display: grid; grid-template-columns: 60px \${a*scale}px; grid-template-rows: 60px \${b*scale}px; gap: 2px;">
                                    <div class="bg-fuchsia-600 flex items-center justify-center text-white font-bold">x²</div>
                                    <div class="bg-purple-500/50 flex items-center justify-center text-white text-xs">\${a}x</div>
                                    <div class="bg-purple-500/50 flex items-center justify-center text-white text-xs">\${b}x</div>
                                    <div class="bg-yellow-500/50 flex items-center justify-center text-white text-xs">\${a*b}</div>
                                </div>
                            </div>
                            <div class="text-white font-bold mb-2">Área = (x + \${a})(x + \${b})</div>
                            <input type="range" min="1" max="5" value="\${a}" class="w-full mb-2" oninput="updA(this.value, \${b})">
                            <input type="range" min="1" max="5" value="\${b}" class="w-full" oninput="updA(\${a}, this.value)">
                        </div>
                    \`;
                };
                window.updA = (a, b) => render(a, b);
                if(root) render(1, 1);
            `;
        default:
            return `
              if(document.getElementById('interactive-demo')) {
                document.getElementById('interactive-demo').innerHTML = '<div class="p-4 text-gray-500 text-center border border-gray-800">Visualización estática.</div>';
              }
            `;
    }
};

// ... (Rest of the file: exportSectorMarkdown and exportSectorHTML logic remains mostly the same, updated to call this function)
export const exportSectorMarkdown = (sectorId: SectorId) => {
  const sector = SECTORS[sectorId];
  const title = SECTOR_DISPLAY_NAMES[sectorId];

  let md = `# PROTOCOL: RESTORE // REPORTE TÁCTICO\n`;
  md += `# SECTOR: ${title}\n\n`;
  
  md += `## 1. INFORME DE SITUACIÓN\n`;
  md += `**${sector.hook.title}**\n`;
  md += `> ${sector.hook.message}\n\n`;

  if (sector.lab.type !== 'none') {
    md += `## 2. PROTOCOLO DE LABORATORIO\n`;
    md += `*Instrucción:* ${sector.lab.instruction}\n`;
    md += `*Meta:* ${sector.lab.targetValue} ${sector.lab.unit}\n\n`;
  }

  md += `## 3. BASE DE CONOCIMIENTO\n`;
  sector.manual.sections.forEach(sec => {
    md += `### ${sec.title}\n`;
    md += `${sec.content}\n\n`;
  });

  if (sector.manual.glossary) {
    md += `### GLOSARIO TÉCNICO\n`;
    sector.manual.glossary.forEach(term => {
      md += `- **${term.term}**: ${term.definition}\n`;
    });
    md += `\n`;
  }

  if (sector.mission.steps.length > 0) {
    md += `## 4. MISIÓN OPERATIVA\n`;
    sector.mission.steps.forEach((step, i) => {
      md += `**PASO ${i + 1}:** ${step.label}\n`;
      md += `*Valor Correcto:* ${step.correctValue}\n\n`;
    });
  }

  md += `---\nGENERADO POR AXIOM SYSTEMS // EDU-CORE M1`;
  downloadFile(`AXIOM_DATA_${sectorId.toUpperCase()}.md`, md, 'text/markdown');
};

export const exportSectorHTML = async (sectorId: SectorId, visualElementId?: string) => {
  const sector = SECTORS[sectorId];
  const theme = SECTOR_THEMES[sectorId];
  const title = SECTOR_DISPLAY_NAMES[sectorId];

  // Get Interactive Script
  const interactiveScript = getSectorInteractiveScript(sectorId, theme.primaryColor);

  // Inject the app's tailwind configuration
  const tailwindConfigScript = `
    tailwind.config = {
      theme: {
        extend: {
          fontFamily: {
            mono: ['"VT323"', 'monospace'],
            sans: ['"Silkscreen"', 'cursive'],
          },
          colors: {
            cyber: {
              bg: '#020408',
              panel: '#0f1929',
              primary: '#00f2ff',
              accent: '#9d00ff',
              success: '#00ff9d',
              alert: '#ff0055',
              text: '#e0fbfc',
            }
          }
        }
      }
    }
  `;

  const htmlContent = `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AXIOM LOG: ${title}</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Silkscreen:wght@400;700&family=VT323&display=swap" rel="stylesheet">
    <script>
      ${tailwindConfigScript}
    </script>
    <style>
        body { font-family: 'VT323', monospace; background-color: #020408; color: #e0fbfc; overflow-x: hidden; }
        h1, h2, h3 { font-family: 'Silkscreen', cursive; }
        .theme-text { color: ${theme.primaryColor}; }
        .theme-border { border-color: ${theme.primaryColor}; }
        details summary::-webkit-details-marker { display:none; }
        details > summary { list-style: none; }
        
        /* Tab Logic */
        .tab-content { display: none; animation: fadeIn 0.5s ease-out; }
        .tab-content.active { display: block; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        
        .tab-btn.active { 
            border-bottom-color: ${theme.primaryColor}; 
            color: ${theme.primaryColor};
            background-color: rgba(0,0,0,0.3);
        }
    </style>
</head>
<body class="p-4 md:p-8 max-w-5xl mx-auto border-x-0 md:border-x-2 border-gray-800 min-h-screen relative flex flex-col">
    
    <div style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: -1; opacity: 0.05; background-image: linear-gradient(#444 1px, transparent 1px), linear-gradient(90deg, #444 1px, transparent 1px); background-size: 20px 20px;"></div>

    <header class="border-b-4 border-white pb-6 mb-8 flex justify-between items-end">
        <div>
            <h1 class="text-2xl md:text-4xl font-bold text-white mb-2 drop-shadow-[2px_2px_0_black]">PROTOCOL: RESTORE</h1>
            <div class="text-xs md:text-sm tracking-[0.3em] uppercase text-gray-400">REPORTE TÁCTICO: <span class="theme-text">${title}</span></div>
        </div>
        <div class="text-right opacity-50 hidden md:block">
            <div class="text-xs">SEC_ID: ${sectorId.toUpperCase()}</div>
            <div class="text-xs">DATE: ${new Date().toLocaleDateString()}</div>
        </div>
    </header>

    <!-- NAVIGATION -->
    <nav class="flex border-b border-gray-800 mb-8 overflow-x-auto bg-black/50">
        <button onclick="switchTab('hook')" class="tab-btn active px-6 py-3 border-b-4 border-transparent text-gray-500 hover:text-white font-bold font-mono uppercase transition-all whitespace-nowrap">ALERTA</button>
        ${sector.lab.type !== 'none' ? `<button onclick="switchTab('lab')" class="tab-btn px-6 py-3 border-b-4 border-transparent text-gray-500 hover:text-white font-bold font-mono uppercase transition-all whitespace-nowrap">LABORATORIO</button>` : ''}
        <button onclick="switchTab('manual')" class="tab-btn px-6 py-3 border-b-4 border-transparent text-gray-500 hover:text-white font-bold font-mono uppercase transition-all whitespace-nowrap">MANUAL</button>
        ${sector.mission.steps.length > 0 ? `<button onclick="switchTab('mission')" class="tab-btn px-6 py-3 border-b-4 border-transparent text-gray-500 hover:text-white font-bold font-mono uppercase transition-all whitespace-nowrap">MISIÓN</button>` : ''}
        ${sector.quiz.questions.length > 0 ? `<button onclick="switchTab('quiz')" class="tab-btn px-6 py-3 border-b-4 border-transparent text-gray-500 hover:text-white font-bold font-mono uppercase transition-all whitespace-nowrap">SIM-CORE</button>` : ''}
    </nav>

    <!-- CONTENT: HOOK -->
    <div id="view-hook" class="tab-content active">
        <div class="bg-gray-900 p-8 border-l-4 theme-border shadow-lg max-w-3xl mx-auto mt-8">
            <h2 class="text-2xl font-bold mb-4 uppercase theme-text font-sans">1. Informe de Situación</h2>
            <h3 class="text-xl text-white mb-4 font-bold">${sector.hook.title}</h3>
            <p class="text-lg text-gray-300 leading-relaxed font-mono">${sector.hook.message}</p>
        </div>
    </div>

    <!-- CONTENT: LAB -->
    <div id="view-lab" class="tab-content">
        <div class="max-w-4xl mx-auto">
            <h2 class="text-xl font-bold mb-6 uppercase text-gray-500 font-sans border-b border-gray-800 pb-2">Protocolo de Laboratorio</h2>
            <p class="text-xl text-white italic mb-8 text-center">"${sector.lab.instruction}"</p>
            <div id="interactive-demo" class="w-full max-w-2xl mx-auto"></div>
            <div class="mt-4 text-[10px] text-gray-600 uppercase tracking-widest text-center">MÓDULO OFFLINE HABILITADO</div>
        </div>
    </div>

    <!-- CONTENT: MANUAL -->
    <div id="view-manual" class="tab-content">
        <div class="max-w-4xl mx-auto">
            <h2 class="text-xl font-bold mb-6 uppercase text-gray-500 font-sans border-b border-gray-800 pb-2">Base de Conocimiento</h2>
            <div class="space-y-4">
                ${sector.manual.sections.map(sec => `
                    <details class="bg-gray-900/50 border border-gray-700 group open:bg-gray-900 open:border-${theme.borderColor.split('-')[1]}-500 transition-all">
                        <summary class="p-4 text-xl font-bold theme-text cursor-pointer flex justify-between items-center select-none hover:bg-gray-800 font-sans">
                            ${sec.title}
                            <span class="text-gray-500 group-open:rotate-180 transition-transform">▼</span>
                        </summary>
                        <div class="p-4 pt-0 text-lg text-gray-300 whitespace-pre-wrap border-t border-gray-800 mt-2 font-mono leading-relaxed">${sec.content}</div>
                    </details>
                `).join('')}
            </div>

            ${sector.manual.glossary ? `
            <div class="mt-12">
                <div class="text-xl font-bold uppercase text-gray-500 mb-4 font-sans border-b border-gray-800 pb-2">Glosario Técnico</div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                ${sector.manual.glossary.map(term => `
                    <div class="border border-gray-800 p-4 bg-black hover:border-white transition-colors">
                        <div class="font-bold theme-text mb-2 font-mono uppercase">${term.term}</div>
                        <div class="text-sm text-gray-400 font-mono">${term.definition}</div>
                    </div>
                `).join('')}
                </div>
            </div>
            ` : ''}
        </div>
    </div>

    <!-- CONTENT: MISSION -->
    <div id="view-mission" class="tab-content">
        <div class="max-w-3xl mx-auto">
            <h2 class="text-xl font-bold mb-6 uppercase text-gray-500 font-sans border-b border-gray-800 pb-2">Misión Operativa</h2>
            <div class="grid gap-4">
                ${sector.mission.steps.map((step, i) => `
                    <div class="flex flex-col md:flex-row gap-4 p-6 bg-black border border-gray-800 items-start md:items-center hover:border-${theme.borderColor.split('-')[1]}-500 transition-colors">
                        <div class="font-bold text-gray-500 text-xs w-16 shrink-0 font-mono uppercase">PASO 0${i+1}</div>
                        <div class="text-lg text-gray-300 flex-1 font-mono">${step.label}</div>
                        <div class="text-xl font-bold text-white border-l-0 md:border-l border-gray-700 pl-0 md:pl-6 pt-2 md:pt-0 border-t md:border-t-0 w-full md:w-auto text-right font-mono">
                            ${step.correctValue}
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    </div>

    <!-- CONTENT: QUIZ -->
    <div id="view-quiz" class="tab-content">
        <div class="max-w-4xl mx-auto">
            <h2 class="text-xl font-bold mb-6 uppercase text-gray-500 font-sans border-b border-gray-800 pb-2">Banco de Simulación</h2>
            <div class="space-y-8">
                ${sector.quiz.questions.map((q, i) => `
                    <div class="border-b border-gray-800 pb-8">
                        <div class="font-bold text-gray-500 mb-2 font-mono text-xs tracking-widest">PREGUNTA ${i+1} [${q.difficulty}]</div>
                        <p class="text-xl text-white mb-6 font-mono leading-relaxed">${q.text}</p>
                        <ul class="space-y-3">
                            ${q.options.map(opt => `
                                <li class="p-3 border ${opt.isCorrect ? 'border-white bg-white/10' : 'border-transparent bg-gray-900/30'} flex items-center gap-4 font-mono text-sm">
                                    ${opt.isCorrect ? '<span class="theme-text font-bold">[OK]</span>' : '<span class="text-gray-600">[-]</span>'}
                                    <span class="${opt.isCorrect ? 'text-white font-bold' : 'text-gray-400'}">${opt.text}</span>
                                    ${opt.isCorrect ? `<div class="ml-auto text-xs text-green-400 opacity-70 hidden md:block">${opt.feedback || ''}</div>` : ''}
                                </li>
                            `).join('')}
                        </ul>
                    </div>
                `).join('')}
            </div>
        </div>
    </div>

    <footer class="mt-auto pt-12 pb-6 border-t border-gray-800 flex justify-between text-xs text-gray-600 uppercase tracking-widest font-mono">
        <div>AXIOM SYSTEMS // EDU-CORE M1</div>
        <div>EXPORT: ${new Date().toISOString()}</div>
    </footer>

    <script>
        function switchTab(id) {
            // Hide all contents
            document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
            // Show target
            document.getElementById('view-' + id).classList.add('active');
            
            // Update buttons
            document.querySelectorAll('.tab-btn').forEach(el => el.classList.remove('active'));
            // Activate target button
            const btns = document.querySelectorAll('.tab-btn');
            if(id === 'hook') btns[0]?.classList.add('active');
            if(id === 'lab') {
               const btn = Array.from(btns).find(b => b.innerText === 'LABORATORIO');
               if(btn) btn.classList.add('active');
            }
            if(id === 'manual') {
               const btn = Array.from(btns).find(b => b.innerText === 'MANUAL');
               if(btn) btn.classList.add('active');
            }
            if(id === 'mission') {
               const btn = Array.from(btns).find(b => b.innerText === 'MISIÓN');
               if(btn) btn.classList.add('active');
            }
            if(id === 'quiz') {
               const btn = Array.from(btns).find(b => b.innerText === 'SIM-CORE');
               if(btn) btn.classList.add('active');
            }
        }

        // Inject Interactive Logic
        ${interactiveScript}
    </script>

</body>
</html>
  `;

  downloadFile(`AXIOM_LOG_${sectorId.toUpperCase()}.html`, htmlContent, 'text/html');
};
