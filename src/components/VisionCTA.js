import React from 'react';

const VisionCTA = () => {
  return (
    <section className="relative py-24 overflow-hidden bg-slate-950 border-t border-slate-800/50">
      {/* Background Effects */}
      <div className="absolute top-0 right-[-10%] w-[50%] h-[50%] bg-cyan-500 rounded-full mix-blend-screen filter blur-[150px] opacity-10 pointer-events-none"></div>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`,
          backgroundSize: '20px 20px',
        }}
      ></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-6">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">Novo Lead Magnet Grátis</span>
            </div>

            <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-6 leading-tight">
              Crie Imagens Fantásticas com IA.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400">Projetado para a Sua Privacidade.</span>
            </h2>

            <p className="text-lg text-slate-300 mb-8 leading-relaxed">
              Conheça o <strong>OttoMatic Vision</strong>: O mini-SaaS que lhe dá um estúdio de design diretamente no seu navegador. Rápido, leve e alimentado unicamente pela sua chave Gemini (BYOK).
            </p>

            <ul className="space-y-4 mb-10">
              <li className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-cyan-500/10 flex items-center justify-center border border-cyan-500/30 mt-0.5">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#22d3ee" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                </div>
                <div>
                  <h4 className="text-white font-semibold text-base">Sem Mensalidades</h4>
                  <p className="text-slate-400 text-sm mt-1">Adicione e use a sua API Key grátis para síntese sem limites.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-cyan-500/10 flex items-center justify-center border border-cyan-500/30 mt-0.5">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#22d3ee" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                </div>
                <div>
                  <h4 className="text-white font-semibold text-base">100% Client-Side</h4>
                  <p className="text-slate-400 text-sm mt-1">Nenhuma das suas criações passa pelos nossos servidores. Total confidencialidade.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-cyan-500/10 flex items-center justify-center border border-cyan-500/30 mt-0.5">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#22d3ee" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                </div>
                <div>
                  <h4 className="text-white font-semibold text-base">Geração e Edição Vetorial</h4>
                  <p className="text-slate-400 text-sm mt-1">Gere via IA, adicione textos vibrantes, camadas vetoriais e exporte num clique.</p>
                </div>
              </li>
            </ul>

            <div>
              <a
                href="/vision/index.html"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-bold text-lg rounded-full shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] transition-all transform hover:-translate-y-1 w-full sm:w-auto group"
              >
                Abrir OttoMatic Vision
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </a>
              <p className="text-slate-500 text-xs font-mono mt-4 text-center sm:text-left">Abre num novo separador. Nenhum registo necessário.</p>
            </div>
          </div>

          {/* Visual Element */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative rounded-2xl border border-slate-800 bg-slate-900/80 backdrop-blur-xl p-2 shadow-2xl overflow-hidden">
              {/* Fake Browser Mac Header */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-800/50 bg-slate-950/50">
                <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                <div className="mx-auto flex items-center bg-slate-800 rounded-md px-4 py-1.5 text-xs text-slate-400 font-mono border border-slate-700/50 shadow-inner">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mr-2 text-cyan-400"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                  ottomatic.com/vision
                </div>
              </div>

              {/* Mockup Interface Visual */}
              <div className="flex aspect-video bg-slate-950 relative overflow-hidden">
                {/* Sidebar mock */}
                <div className="w-1/4 max-w-[120px] lg:max-w-none border-r border-slate-800/50 bg-slate-900 p-3 hidden sm:flex flex-col gap-3">
                  <div className="h-2 w-1/2 bg-slate-700 rounded-full mb-2"></div>
                  <div className="h-8 w-full bg-slate-800 rounded border border-cyan-500/30"></div>
                  <div className="h-20 w-full bg-slate-950 rounded border border-slate-700 mt-2 border-dashed flex items-center justify-center">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" /></svg>
                  </div>
                  <div className="h-8 w-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded mt-2 opacity-80"></div>
                </div>

                {/* Main canvas mock */}
                <div className="flex-1 p-4 flex items-center justify-center relative">
                  {/* Grid background */}
                  <div className="absolute inset-4 border border-slate-800/50 rounded mix-blend-screen bg-cover" style={{ backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`, backgroundSize: '10px 10px' }}></div>

                  {/* Generated Image Mock */}
                  <div className="relative w-full max-w-[80%] aspect-video bg-slate-800 rounded shadow-[0_0_30px_rgba(0,0,0,0.8)] border border-slate-700 flex flex-col items-center justify-center overflow-hidden z-10">
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/40 via-purple-900/40 to-cyan-500/20"></div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-20">
                      <svg className="w-24 h-24 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><path strokeLinecap="round" strokeLinejoin="round" d="M14.5 4H19M19 4V8.5M19 4L13 10M9 20V15.5M9 20H4.5M9 20L15 14" /></svg>
                    </div>
                    <h3 className="font-bold text-3xl md:text-5xl text-white font-sans drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)] tracking-tight rotate-[-2deg] z-10 transition-transform duration-500 hover:scale-110 cursor-pointer">
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-white">AI</span> VISION
                    </h3>

                    {/* Bounding box mock */}
                    <div className="absolute border border-cyan-400 w-[70%] h-[40%] flex items-center justify-center pointer-events-none">
                      <div className="absolute -top-1 -left-1 w-2 h-2 rounded-full bg-cyan-400"></div>
                      <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-cyan-400"></div>
                      <div className="absolute -bottom-1 -left-1 w-2 h-2 rounded-full bg-cyan-400"></div>
                      <div className="absolute -bottom-1 -right-1 w-2 h-2 rounded-full bg-cyan-400"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisionCTA;
