"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Menu, X, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const handleWhatsAppClick = () => {
    window.open('https://wa.me/5511999731501?text=Falei%20com%20o%20Otto,%20quero%20meu%20funcionário%20digital.', '_blank');
  };

  if (pathname?.startsWith('/ferramentas/post-generator')) return null;

  return <motion.header initial={{
    y: -100
  }} animate={{
    y: 0
  }} transition={{
    duration: 0.5
  }} className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled || isMobileMenuOpen ? 'bg-slate-950/95 backdrop-blur-md shadow-lg shadow-cyan-500/10' : 'bg-transparent'}`}>
    <nav className="container mx-auto px-4 py-4">
      <div className="flex items-center justify-between">
        <Link href="/">
          <motion.div initial={{
            opacity: 0
          }} animate={{
            opacity: 1
          }} transition={{
            delay: 0.2
          }} className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">IA</span>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">OttoMatic</span>
          </motion.div>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link href="/blog" className={`text-sm font-medium transition-colors hover:text-cyan-400 ${pathname === '/blog' ? 'text-cyan-400' : 'text-slate-300'}`}>
            Blog
          </Link>
          <Link href="/ferramentas" className={`text-sm font-medium transition-colors hover:text-cyan-400 ${pathname.startsWith('/ferramentas') ? 'text-cyan-400' : 'text-slate-300'}`}>
            Ferramentas
          </Link>
          <Link href="/solutions" className={`text-sm font-medium transition-colors hover:text-cyan-400 ${pathname === '/solutions' ? 'text-cyan-400' : 'text-slate-300'}`}>
            Soluções
          </Link>
          <Link href="/financial-management" className={`text-sm font-medium transition-colors hover:text-cyan-400 ${pathname === '/financial-management' ? 'text-cyan-400' : 'text-slate-300'}`}>
            Gestão Financeira
          </Link>

          <Button onClick={handleWhatsAppClick} className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-6 py-2 rounded-full transition-all duration-300 shadow-lg shadow-green-500/30 hover:shadow-green-500/50 flex items-center gap-2">
            <MessageCircle size={18} />
            Fale Agora
          </Button>
        </div>

        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden text-white p-2 hover:bg-slate-800 rounded-lg transition-colors">
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isMobileMenuOpen && <motion.div initial={{
        opacity: 0,
        y: -20
      }} animate={{
        opacity: 1,
        y: 0
      }} exit={{
        opacity: 0,
        y: -20
      }} className="md:hidden mt-4 pb-4 space-y-4">
        <Link href="/blog" className="block w-full text-center py-2 text-slate-300 hover:text-cyan-400 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
          Blog
        </Link>
        <Link href="/ferramentas" className="block w-full text-center py-2 text-slate-300 hover:text-cyan-400 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
          Ferramentas
        </Link>
        <Link href="/solutions" className="block w-full text-center py-2 text-slate-300 hover:text-cyan-400 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
          Soluções
        </Link>
        <Link href="/financial-management" className="block w-full text-center py-2 text-slate-300 hover:text-cyan-400 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
          Gestão Financeira
        </Link>
        <Button onClick={handleWhatsAppClick} className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-full flex items-center justify-center gap-2">
          <MessageCircle size={18} />
          OttoMação
        </Button>
      </motion.div>}
    </nav>
  </motion.header>;
};
export default Header;
