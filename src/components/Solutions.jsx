"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Bot, BarChart3, Zap, Shield, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
const Solutions = () => {
  const handleWhatsAppClick = () => {
    window.open('https://wa.me/5511999731501?text=Falei%20com%20o%20Otto,%20quero%20meu%20funcionário%20digital.', '_blank');
  };
  return <section className="py-20 relative overflow-hidden">
    <div className="absolute inset-0">
      <div className="absolute top-0 left-1/3 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
    </div>

    <div className="container mx-auto px-4 relative z-10">
      <motion.div initial={{
        opacity: 0,
        y: 20
      }} whileInView={{
        opacity: 1,
        y: 0
      }} viewport={{
        once: true
      }} transition={{
        duration: 0.6
      }} className="text-center mb-16">
        <span className="text-cyan-400 font-semibold uppercase tracking-wider text-sm mb-4 block">
          A Solução
        </span>
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Seu Novo
          </span>
          <br />
          <span className="bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
            Time de Vendas Digital
          </span>
        </h2>

        <motion.div initial={{
          opacity: 0,
          scale: 0.9
        }} whileInView={{
          opacity: 1,
          scale: 1.5
        }} viewport={{
          once: true
        }} transition={{
          delay: 0.2,
          duration: 0.5
        }} className="flex flex-col items-center justify-center gap-2 mb-8">
          <span className="text-slate-500 text-sm italic">Motor de Inteligência Artificial:</span>
          <img src="https://horizons-cdn.hostinger.com/8ffd0864-e718-42f0-97cd-9793b452cb7f/selo-branco-sem-fundo-pRmNM.png" alt="Powered by AI" className="h-9 md:h-10 opacity-90 hover:opacity-100 transition-opacity bg-white/5 rounded px-2 py-1" />
        </motion.div>

        <p className="text-xl text-slate-400 max-w-3xl mx-auto">
          Nossa IA especializada transforma cada etapa do seu processo de vendas em um sistema automático e eficiente
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto mb-16">
        <motion.div initial={{
          opacity: 0,
          x: -20
        }} whileInView={{
          opacity: 1,
          x: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.6
        }} className="bg-gradient-to-br from-slate-900 to-slate-800 border border-cyan-500/20 rounded-3xl p-8 hover:border-cyan-500/40 transition-all duration-300 group">
          <div className="flex items-start gap-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
              <Bot className="text-white" size={32} />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                SDR Digital 24/7
              </h3>
              <p className="text-slate-400 leading-relaxed mb-4">
                Agentes de IA que nunca dormem, respondem instantaneamente e qualificam leads automaticamente. Cada visitante é atendido no momento certo, mesmo às 3h da manhã.
              </p>
              <ul className="space-y-2 text-slate-300">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-400"></div>
                  Respostas imediatas 24 horas por dia
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-400"></div>
                  Qualificação automática de leads
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-400"></div>
                  Conversas naturais e personalizadas
                </li>
              </ul>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{
          opacity: 0,
          x: 20
        }} whileInView={{
          opacity: 1,
          x: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.6
        }} className="bg-gradient-to-br from-slate-900 to-slate-800 border border-cyan-500/20 rounded-3xl p-8 hover:border-cyan-500/40 transition-all duration-300 group">
          <div className="flex items-start gap-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
              <Zap className="text-white" size={32} />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                Automação de Processos
              </h3>
              <p className="text-slate-400 leading-relaxed mb-4">
                Elimine tarefas repetitivas e libere sua equipe para focar no que realmente importa: fechar negócios e desenvolver estratégias.
              </p>
              <ul className="space-y-2 text-slate-300">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-400"></div>
                  Follow-ups automáticos
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-400"></div>
                  Integração com CRM e ferramentas
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-400"></div>
                  Agendamento inteligente de reuniões
                </li>
              </ul>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{
          opacity: 0,
          x: -20
        }} whileInView={{
          opacity: 1,
          x: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.6,
          delay: 0.2
        }} className="bg-gradient-to-br from-slate-900 to-slate-800 border border-cyan-500/20 rounded-3xl p-8 hover:border-cyan-500/40 transition-all duration-300 group">
          <div className="flex items-start gap-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
              <BarChart3 className="text-white" size={32} />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                Dashboard Inteligente
              </h3>
              <p className="text-slate-400 leading-relaxed mb-4">
                Tome decisões baseadas em dados com analytics em tempo real. Veja o que funciona e otimize continuamente seus resultados.
              </p>
              <ul className="space-y-2 text-slate-300">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-400"></div>
                  Métricas de conversão em tempo real
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-400"></div>
                  Análise de comportamento do cliente
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-400"></div>
                  Relatórios personalizados
                </li>
              </ul>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{
          opacity: 0,
          x: 20
        }} whileInView={{
          opacity: 1,
          x: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.6,
          delay: 0.2
        }} className="bg-gradient-to-br from-slate-900 to-slate-800 border border-cyan-500/20 rounded-3xl p-8 hover:border-cyan-500/40 transition-all duration-300 group">
          <div className="flex items-start gap-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
              <Shield className="text-white" size={32} />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                Escalabilidade Infinita
              </h3>
              <p className="text-slate-400 leading-relaxed mb-4">
                Cresça sem limites operacionais. Atenda 10x mais clientes sem precisar contratar 10x mais pessoas.
              </p>
              <ul className="space-y-2 text-slate-300">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-400"></div>
                  Capacidade ilimitada de atendimento
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-400"></div>
                  Custos previsíveis e escaláveis
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-400"></div>
                  Implementação rápida e sem complexidade
                </li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div initial={{
        opacity: 0,
        y: 20
      }} whileInView={{
        opacity: 1,
        y: 0
      }} viewport={{
        once: true
      }} transition={{
        duration: 0.6
      }} className="text-center">
        <Button onClick={handleWhatsAppClick} className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-8 py-6 text-lg rounded-full transition-all duration-300 shadow-2xl shadow-cyan-500/30 hover:shadow-cyan-500/50 flex items-center gap-2 mx-auto">
          <MessageCircle size={24} />
          Falar Agora
        </Button>
      </motion.div>
    </div>
  </section>;
};
export default Solutions;

