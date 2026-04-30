"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Image as ImageIcon } from 'lucide-react';

export default function FerramentasIndex() {
    return (
        <div className="pt-32 pb-20 bg-slate-950 min-h-screen">
            <div className="container mx-auto px-4 max-w-6xl">

                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-medium mb-6"
                    >
                        <Sparkles size={16} />
                        Centro de Ferramentas
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-bold text-white mb-6"
                    >
                        Ferramentas Exclusivas <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">OttoMatic</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-lg text-slate-400 max-w-2xl mx-auto"
                    >
                        Soluções de produtividade desenhadas para multiplicar os seus resultados sem aumentar o seu esforço.
                    </motion.p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* Tool 1: Vision CTA */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <Link href="/ferramentas/vision" className="block group h-full">
                            <div className="h-full bg-slate-900 border border-slate-800 hover:border-cyan-500/30 rounded-2xl p-8 transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/10 flex flex-col">
                                <div className="w-14 h-14 bg-blue-500/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    <ImageIcon className="w-7 h-7 text-blue-400" />
                                </div>
                                <h2 className="text-2xl font-bold text-white mb-4 group-hover:text-cyan-400 transition-colors">
                                    OttoMatic Vision
                                </h2>
                                <p className="text-slate-400 mb-8 flex-grow">
                                    Crie imagens fantásticas com IA. Uma ferramenta de edição vetorial inteligente alimentada por Inteligência Artificial (BYOK), que roda direto no seu navegador.
                                </p>
                                <div className="flex items-center text-cyan-400 font-semibold mt-auto">
                                    Acessar Vision <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-2 transition-transform" />
                                </div>
                            </div>
                        </Link>
                    </motion.div>

                    {/* Tool 2: Ottomatic Post Generator */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        <Link href="/ferramentas/post-generator" className="block group h-full">
                            <div className="h-full bg-slate-900 border border-slate-800 hover:border-cyan-500/30 rounded-2xl p-8 transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/10 flex flex-col overflow-hidden relative">
                                {/* Subtle background glow for this specific tool */}
                                <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl -z-10 group-hover:bg-cyan-500/10 transition-colors"></div>

                                <div className="w-14 h-14 bg-cyan-500/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    <svg className="w-7 h-7 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                    </svg>
                                </div>
                                <h2 className="text-2xl font-bold text-white mb-4 group-hover:text-cyan-400 transition-colors">
                                    Ottomatic Post Generator
                                </h2>
                                <p className="text-slate-400 mb-8 flex-grow">
                                    A linha de produção definitiva para carrosséis de alta conversão. Automatize a criação de posts persuasivos com um design base bloqueado e focado em retenção.
                                </p>
                                <div className="flex items-center text-cyan-400 font-semibold mt-auto">
                                    Acessar o Gerador <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-2 transition-transform" />
                                </div>
                            </div>
                        </Link>
                    </motion.div>

                    {/* Tool 3: LP Bios Pro */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                    >
                        <Link href="/ferramentas/lp-bios-pro" className="block group h-full">
                            <div className="h-full bg-slate-900 border border-slate-800 hover:border-cyan-500/30 rounded-2xl p-8 transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/10 flex flex-col overflow-hidden relative">
                                <div className="w-14 h-14 bg-green-500/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    <svg className="w-7 h-7 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                </div>
                                <h2 className="text-2xl font-bold text-white mb-4 group-hover:text-cyan-400 transition-colors">
                                    LP Bios Pro
                                </h2>
                                <p className="text-slate-400 mb-8 flex-grow">
                                    Transforme visitas em clientes. Uma página profissional para o link da sua bio, focada em conversão direta para o WhatsApp.
                                </p>
                                <div className="flex items-center text-cyan-400 font-semibold mt-auto">
                                    Criar minha LP Bios <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-2 transition-transform" />
                                </div>
                            </div>
                        </Link>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
