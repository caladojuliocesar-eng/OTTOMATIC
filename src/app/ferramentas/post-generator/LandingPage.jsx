"use client";

import React, { useState } from 'react';
import { Loader2, Mail, User, Phone, ArrowRight, Star, ShieldCheck, Zap } from 'lucide-react';
import styled from 'styled-components';

const Hero = styled.div`
  min-height: 100vh;
  background: #060606;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  text-align: center;
`;

const Card = styled.div`
  background: #0d0d0d;
  border: 1px solid #1a1a1a;
  border-radius: 12px;
  padding: 40px;
  max-width: 450px;
  width: 100%;
  box-shadow: 0 20px 50px rgba(0,0,0,0.5);
`;

const InputGroup = styled.div`
  margin-bottom: 20px;
  text-align: left;
`;

const Label = styled.label`
  display: block;
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #888;
  margin-bottom: 8px;
  font-weight: 700;
`;

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const Input = styled.input`
  width: 100%;
  background: #050505;
  border: 1px solid #222;
  border-radius: 6px;
  padding: 12px 12px 12px 40px;
  color: white;
  font-size: 14px;
  transition: all 0.2s;

  &:focus {
    border-color: #f97316;
    background: #0a0a0a;
    outline: none;
    box-shadow: 0 0 0 4px rgba(249, 115, 22, 0.1);
  }
`;

const IconWrapper = styled.div`
  position: absolute;
  left: 14px;
  color: #444;
`;

const SubmitButton = styled.button`
  width: 100%;
  background: #f97316;
  color: black;
  border: none;
  border-radius: 6px;
  padding: 16px;
  font-weight: 900;
  font-size: 13px;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  transition: all 0.2s;
  margin-top: 10px;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    filter: brightness(1.1);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export default function LandingPage({ onSuccess }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', whatsapp: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // For now, we mock the success since we haven't set up Firebase yet
      // In a real scenario, we'd call authenticateAnonymously() and createLead()
      console.log('Lead captured:', formData);
      setTimeout(() => {
        onSuccess();
        setLoading(false);
      }, 1500);
    } catch (err) {
      console.error(err);
      alert('Erro ao salvar seus dados. Tente novamente.');
      setLoading(false);
    }
  };

  return (
    <Hero>
      <div style={{ marginBottom: 40 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginBottom: 15 }}>
          <Zap size={24} color="#f97316" fill="#f97316" />
          <span style={{ fontSize: 12, fontWeight: 900, letterSpacing: '0.3em', color: '#f97316' }}>OTTOMATIC AI</span>
        </div>
        <h1 style={{ fontFamily: "'Bebas Neue', Arial Black, sans-serif", fontSize: 56, lineHeight: 1, letterSpacing: '0.05em', marginBottom: 15 }}>
          FÁBRICA DE <span style={{ color: '#f97316' }}>CARROSSEIS</span>
        </h1>
        <p style={{ color: '#888', maxWidth: 500, margin: '0 auto', fontSize: 16, lineHeight: 1.6 }}>
          Transforme ideias, PDFs ou sites em carrosséis virais de alta conversão em segundos. 
          Use o poder da IA Pro para dominar o algoritmo.
        </p>
      </div>

      <Card>
        <div style={{ marginBottom: 30 }}>
          <div style={{ fontSize: 11, fontWeight: 900, color: '#f97316', textTransform: 'uppercase', marginBottom: 5 }}>Degustação Gratuita</div>
          <h2 style={{ fontSize: 20, fontWeight: 800 }}>Ganhe 2 gerações grátis</h2>
        </div>

        <form onSubmit={handleSubmit}>
          <InputGroup>
            <Label>Seu Nome</Label>
            <InputWrapper>
              <IconWrapper><User size={16} /></IconWrapper>
              <Input 
                type="text" 
                placeholder="Ex: Julio Calado" 
                required 
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
              />
            </InputWrapper>
          </InputGroup>

          <InputGroup>
            <Label>Seu melhor E-mail</Label>
            <InputWrapper>
              <IconWrapper><Mail size={16} /></IconWrapper>
              <Input 
                type="email" 
                placeholder="nome@email.com" 
                required 
                value={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
              />
            </InputWrapper>
          </InputGroup>

          <InputGroup>
            <Label>WhatsApp (Opcional)</Label>
            <InputWrapper>
              <IconWrapper><Phone size={16} /></IconWrapper>
              <Input 
                type="tel" 
                placeholder="(00) 00000-0000" 
                value={formData.whatsapp}
                onChange={e => setFormData({...formData, whatsapp: e.target.value})}
              />
            </InputWrapper>
          </InputGroup>

          <SubmitButton type="submit" disabled={loading}>
            {loading ? <Loader2 className="spin" size={18} /> : <>ACESSAR FÁBRICA <ArrowRight size={18} /></>}
          </SubmitButton>
        </form>

        <div style={{ marginTop: 30, display: 'flex', justifyContent: 'center', gap: 20, opacity: 0.4 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 10, fontWeight: 700 }}>
            <ShieldCheck size={12} /> SEGURO
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 10, fontWeight: 700 }}>
            <Star size={12} /> PREMIUM
          </div>
        </div>
      </Card>

      <div style={{ marginTop: 60, fontSize: 11, color: '#444', letterSpacing: '0.1em' }}>
        © 2026 OTTOMATIC · POWERED BY GOOGLE GEMINI 2.0
      </div>
    </Hero>
  );
}
