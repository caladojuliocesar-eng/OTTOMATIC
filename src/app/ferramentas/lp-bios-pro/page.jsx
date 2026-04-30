"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight, Zap, Smartphone, Target, Layout } from 'lucide-react';

export default function LPBiosProPage() {
    return (
        <div className="bg-otto-dark text-slate-50 min-h-screen antialiased selection:bg-otto-cyan selection:text-otto-dark">
            {/* Custom Styles Injection */}
            <style jsx global>{`
                .bg-grid {
                    background-size: 40px 40px;
                    background-image: linear-gradient(to right, rgba(0, 210, 255, 0.05) 1px, transparent 1px),
                                      linear-gradient(to bottom, rgba(0, 210, 255, 0.05) 1px, transparent 1px);
                }

                .glow-text {
                    text-shadow: 0 0 20px rgba(0, 210, 255, 0.3);
                }

                .glass-card {
                    background: rgba(10, 17, 40, 0.6);
                    backdrop-filter: blur(12px);
                    border: 1px solid rgba(0, 210, 255, 0.1);
                }
            `}</style>

            <div className="bg-grid">
                <header className="relative pt-40 pb-20 px-6 overflow-hidden">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-otto-cyan/10 rounded-full blur-[120px] -z-10"></div>
                    <div className="max-w-4xl mx-auto text-center">
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-otto-cyan/10 border border-otto-cyan/20 text-otto-cyan text-xs font-bold tracking-widest uppercase mb-8"
                        >
                            <span className="w-2 h-2 rounded-full bg-otto-cyan animate-pulse"></span>
                            Link da bio que gera clientes
                        </motion.div>
                        <motion.h1 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-5xl md:text-7xl font-black tracking-tight mb-8 leading-[1.1]"
                        >
                            Seu Instagram recebe visitas.<br />
                            Mas quantos <span className="text-otto-cyan glow-text">pedidos de orçamento</span> você realmente recebe?
                        </motion.h1>
                        <motion.p 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-xl md:text-2xl text-slate-400 font-light max-w-3xl mx-auto leading-relaxed mb-12"
                        >
                            Criamos para você a <strong>LP Bios Pro</strong>: uma página personalizada, rápida e profissional que transforma quem visita seu perfil em clientes reais.
                        </motion.p>
                        
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            <a href="https://pay.kiwify.com.br/AZKZsnO" target="_blank" rel="noopener noreferrer" className="inline-block bg-otto-cyan text-otto-dark px-10 py-5 rounded-lg font-black uppercase tracking-widest text-lg hover:bg-white hover:shadow-[0_0_30px_rgba(0,210,255,0.4)] transition-all transform hover:-translate-y-1">
                                Quero minha página profissional agora
                            </a>
                            <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-slate-400">
                                <span className="flex items-center gap-2"><CheckCircle2 size={16} className="text-otto-cyan" /> Sem termos técnicos</span>
                                <span className="flex items-center gap-2"><CheckCircle2 size={16} className="text-otto-cyan" /> Entrega automática</span>
                                <span className="flex items-center gap-2"><CheckCircle2 size={16} className="text-otto-cyan" /> Focado em conversão</span>
                            </div>
                        </motion.div>
                    </div>
                </header>

                <main className="max-w-7xl mx-auto px-6 py-20 space-y-32">
                    
                    {/* Demo Section */}
                    <section className="space-y-16">
                        <div className="text-center space-y-4">
                            <h2 className="text-sm font-bold text-otto-cyan uppercase tracking-widest">Transformação Real</h2>
                            <h3 className="text-4xl md:text-6xl font-black">De um link amador para um <br /><span className="text-otto-cyan">Design de Elite</span></h3>
                        </div>
                        <div className="grid md:grid-cols-2 gap-8">
                            <motion.div 
                                whileHover={{ scale: 1.02 }}
                                className="glass-card rounded-2xl overflow-hidden border border-white/5"
                            >
                                <img src="/images/tools/lp-bios-pro/antes-depois.png" alt="Antes e Depois" className="w-full h-auto" />
                            </motion.div>
                            <motion.div 
                                whileHover={{ scale: 1.02 }}
                                className="glass-card rounded-2xl overflow-hidden border border-white/5"
                            >
                                <img src="/images/tools/lp-bios-pro/anatomia.png" alt="Anatomia da Conversão" className="w-full h-auto" />
                            </motion.div>
                        </div>
                    </section>

                    {/* Problem Section */}
                    <section className="flex flex-col lg:flex-row items-center gap-16">
                        <div className="flex-1 space-y-8">
                            <h2 className="text-sm font-bold text-otto-orange uppercase tracking-widest">O Problema</h2>
                            <h3 className="text-4xl md:text-6xl font-black leading-tight">Por que as visitas não viram clientes?</h3>
                            <p className="text-xl text-slate-400">Isso acontece com a maioria dos negócios que dependem de links genéricos na bio.</p>
                            
                            <div className="grid sm:grid-cols-2 gap-6">
                                {[
                                    { icon: <Target className="text-otto-cyan" />, title: "Visitas sem contato", desc: "Pessoas entram no seu perfil, mas vão embora sem mandar mensagem por falta de clareza." },
                                    { icon: <Layout className="text-otto-cyan" />, title: "Links comuns que confundem", desc: "Links padrão apenas mostram uma lista de botões que não convencem ninguém." },
                                    { icon: <Zap className="text-otto-cyan" />, title: "Falta de Profissionalismo", desc: "Sem uma página que apresente seus serviços, você perde autoridade." },
                                    { icon: <Smartphone className="text-otto-cyan" />, title: "Dificuldade no Contato", desc: "Se o seu WhatsApp não está em destaque estratégico, o cliente desiste." }
                                ].map((item, idx) => (
                                    <div key={idx} className="p-6 bg-otto-panel/50 rounded-xl border border-white/5 space-y-3">
                                        <div className="w-10 h-10 bg-otto-cyan/10 rounded-lg flex items-center justify-center">
                                            {item.icon}
                                        </div>
                                        <h4 className="font-bold text-white">{item.title}</h4>
                                        <p className="text-sm text-slate-400">{item.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Comparison Section */}
                    <section className="space-y-16">
                        <div className="text-center space-y-4">
                            <h2 className="text-sm font-bold text-otto-cyan uppercase tracking-widest">A Diferença</h2>
                            <h3 className="text-4xl md:text-6xl font-black">Links comuns na bio <span className="text-slate-500 text-3xl font-light">vs</span> <span className="text-otto-cyan">LP Bios Pro</span></h3>
                        </div>
                        
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="p-8 rounded-3xl border border-red-500/10 bg-red-500/5 space-y-6">
                                <div className="text-red-400 text-xs font-bold uppercase tracking-widest">❌ Agregadores Genéricos</div>
                                <h4 className="text-2xl font-bold">O cliente clica e se perde</h4>
                                <ul className="space-y-4">
                                    {["Lista fria de botões", "Zero construção de autoridade", "Design amador e engessado", "Várias opções que distraem"].map((item, idx) => (
                                        <li key={idx} className="flex items-center gap-3 text-slate-400">
                                            <span className="text-red-500/50">✗</span> {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            
                            <div className="p-8 rounded-3xl border border-otto-cyan/20 bg-otto-cyan/5 space-y-6">
                                <div className="text-otto-cyan text-xs font-bold uppercase tracking-widest">✅ LP Bios Pro</div>
                                <h4 className="text-2xl font-bold text-white">O cliente clica e chama no Zap</h4>
                                <ul className="space-y-4">
                                    {["Design Premium e exclusivo", "Foco total na sua promessa", "CTA estratégico para o WhatsApp", "Transmite confiança imediata"].map((item, idx) => (
                                        <li key={idx} className="flex items-center gap-3 text-slate-300 font-medium">
                                            <span className="text-otto-cyan">✓</span> {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* Steps Section */}
                    <section className="space-y-16">
                        <div className="text-center space-y-4">
                            <h2 className="text-sm font-bold text-otto-cyan uppercase tracking-widest">Processo</h2>
                            <h3 className="text-4xl md:text-6xl font-black">Simples e Automático</h3>
                        </div>
                        
                        <div className="grid md:grid-cols-3 gap-8">
                            {[
                                { step: "1", title: "Garanta seu Acesso", desc: "Clique no botão para realizar o pagamento único. Sem taxas escondidas." },
                                { step: "2", title: "Preencha seus Dados", desc: "Responda o formulário com seu nome, serviços, fotos e WhatsApp." },
                                { step: "3", title: "Página no Ar", desc: "Nosso sistema gera sua página profissional instantaneamente." }
                            ].map((item, idx) => (
                                <div key={idx} className="relative p-8 bg-otto-panel border border-white/5 rounded-2xl group overflow-hidden">
                                     <div className="absolute top-0 right-0 p-4 text-6xl font-black text-white/5 group-hover:text-otto-cyan/5 transition-colors">{item.step}</div>
                                     <div className="w-12 h-12 bg-otto-cyan text-otto-dark rounded-full flex items-center justify-center font-black text-xl mb-6 shadow-[0_0_20px_rgba(0,210,255,0.3)]">
                                        {item.step}
                                     </div>
                                     <h4 className="text-xl font-bold mb-4">{item.title}</h4>
                                     <p className="text-slate-400">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Offer Section */}
                    <section className="py-20 text-center glass-card rounded-[40px] border-otto-cyan/20 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-96 h-96 bg-otto-cyan/10 rounded-full blur-[100px] -z-10"></div>
                        <div className="max-w-3xl mx-auto space-y-8 px-6">
                            <h2 className="text-sm font-bold text-otto-cyan uppercase tracking-widest">Oferta Exclusiva</h2>
                            <h3 className="text-4xl md:text-6xl font-black">Sua Estrutura Profissional <br /><span className="text-otto-cyan text-2xl font-medium tracking-normal">por um preço simbólico</span></h3>
                            
                            <div className="grid sm:grid-cols-2 gap-4 text-left max-w-lg mx-auto mb-12">
                                {["Página de Alta Conversão", "Design Premium (Glassmorphism)", "Integração Direta com WhatsApp", "Hospedagem Inclusa"].map((item, idx) => (
                                    <div key={idx} className="flex items-center gap-3">
                                        <CheckCircle2 size={18} className="text-otto-cyan shrink-0" />
                                        <span className="text-slate-200">{item}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-2">
                                <p className="text-slate-500 line-through">De R$ 197,00</p>
                                <p className="text-6xl font-black text-otto-cyan">R$ 47,00</p>
                                <p className="text-sm text-slate-400 uppercase tracking-widest">Pagamento Único</p>
                            </div>

                            <a href="https://pay.kiwify.com.br/AZKZsnO" target="_blank" rel="noopener noreferrer" className="inline-block bg-otto-cyan text-otto-dark px-12 py-6 rounded-xl font-black uppercase tracking-widest text-xl hover:bg-white hover:shadow-[0_0_40px_rgba(0,210,255,0.5)] transition-all transform hover:-translate-y-1">
                                Garantir Minha LP Bios Pro
                            </a>
                        </div>
                    </section>
                </main>

                <footer className="border-t border-white/5 bg-otto-dark py-10 mt-20">
                    <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="text-xl font-black tracking-tighter text-slate-500">
                            OTTOMATIC<span className="text-otto-cyan">.</span>
                        </div>
                        <div className="text-sm text-slate-600 font-mono">
                            &copy; 2026 Ottomatic Hub. Inteligência Artificial e Automação.
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    );
}
