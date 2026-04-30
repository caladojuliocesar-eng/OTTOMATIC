"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Layout, Instagram, Linkedin, MessageCircle, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function BioPage() {
  const handleWhatsAppClick = () => {
    window.open('https://wa.me/5511999731501?text=Quero%20automatizar%20meu%20atendimento', '_blank');
  };

  const handleCarouselClick = () => {
    window.location.href = '/ferramentas/post-generator';
  };

  return (
    <div className="pt-32 pb-12 px-4 flex flex-col items-center min-h-screen">
      {/* Seção Hero */}
      <section className="max-w-3xl w-full text-center space-y-6 mb-12">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-6xl font-extrabold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent leading-tight tracking-tight"
        >
          Você ainda faz trabalho de robô na sua própria empresa?
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-slate-400 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto"
        >
          Nós colocamos a Inteligência Artificial para trabalhar por você. Sem código, sem "tatiquês" técnico. Pare de perder vendas por demora no WhatsApp e de abandonar sua vitrine no Instagram.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col items-center gap-4 py-12"
        >
          <span className="text-cyan-400 font-bold tracking-widest uppercase text-xs md:text-sm">Escolha qual gargalo vamos resolver hoje:</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown className="text-cyan-500 w-6 h-6" />
          </motion.div>
        </motion.div>
      </section>

      {/* Seção de Soluções */}
      <section className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 mb-20 px-2">
        {/* Card 1: WhatsApp */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-slate-900/40 border border-slate-800 p-8 md:p-10 rounded-[2.5rem] backdrop-blur-md flex flex-col justify-between hover:border-cyan-500/30 transition-all duration-500 group relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/5 blur-[60px] rounded-full -mr-16 -mt-16 group-hover:bg-green-500/10 transition-colors duration-500"></div>
          
          <div>
            <div className="w-16 h-16 bg-green-500/10 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
              <Zap className="text-green-500 w-10 h-10 fill-green-500/20" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 group-hover:text-green-400 transition-colors duration-300">O Fim do Caos no WhatsApp</h2>
            <p className="text-slate-400 mb-10 text-lg leading-relaxed">
              Funcionários Digitais (SDRs) que não dormem. Eles atendem, tiram dúvidas, qualificam seus leads 24h por dia e entregam o cliente pronto para você fechar a venda.
            </p>
          </div>
          <Button 
            onClick={handleWhatsAppClick}
            className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-black text-lg py-8 rounded-2xl shadow-xl shadow-green-500/10 hover:shadow-green-500/30 transition-all duration-500 transform hover:-translate-y-1"
          >
            Quero automatizar meu atendimento
          </Button>
        </motion.div>

        {/* Card 2: Conteúdo */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-slate-900/40 border border-slate-800 p-8 md:p-10 rounded-[2.5rem] backdrop-blur-md flex flex-col justify-between hover:border-cyan-500/30 transition-all duration-500 group relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 blur-[60px] rounded-full -mr-16 -mt-16 group-hover:bg-cyan-500/10 transition-colors duration-500"></div>

          <div>
            <div className="w-16 h-16 bg-cyan-500/10 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 group-hover:-rotate-3 transition-all duration-500">
              <Layout className="text-cyan-500 w-10 h-10" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 group-hover:text-cyan-400 transition-colors duration-300">A Máquina de Conteúdo</h2>
            <p className="text-slate-400 mb-10 text-lg leading-relaxed">
              Chega de lutar contra a folha em branco. Nossa IA gera carrosséis completos para o seu Instagram e LinkedIn em minutos. Do roteiro ao design final, pronto para postar.
            </p>
          </div>
          <Button 
            onClick={handleCarouselClick}
            className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-black text-lg py-8 rounded-2xl shadow-xl shadow-cyan-500/10 hover:shadow-cyan-500/30 transition-all duration-500 transform hover:-translate-y-1"
          >
            Quero criar posts com IA
          </Button>
        </motion.div>
      </section>

      {/* Footer Simples */}
      <footer className="w-full max-w-4xl text-center space-y-8 pt-12 border-t border-slate-900/50">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-4"
        >
          <p className="text-slate-500 text-sm md:text-base font-medium">
            Ottomatic IA Hub © {new Date().getFullYear()}. 
          </p>
          <p className="text-slate-400 italic text-base md:text-lg">
            "A automação não é o futuro, é a sobrevivência."
          </p>
        </motion.div>
        
        <div className="flex items-center justify-center gap-8 pb-8">
          <motion.a 
            whileHover={{ scale: 1.2, color: "#22d3ee" }}
            href="https://instagram.com/ottomatic.ia" 
            target="_blank"
            className="text-slate-600 transition-all duration-300"
          >
            <Instagram size={24} />
          </motion.a>
          <motion.a 
            whileHover={{ scale: 1.2, color: "#22d3ee" }}
            href="https://linkedin.com/company/ottomatic-ia" 
            target="_blank"
            className="text-slate-600 transition-all duration-300"
          >
            <Linkedin size={24} />
          </motion.a>
        </div>
      </footer>
    </div>
  );
}
