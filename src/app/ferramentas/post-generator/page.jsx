"use client";

import React, { useState, useEffect } from 'react';
import LandingPage from './LandingPage';
import CarouselApp from './CarouselApp';
import { Loader2 } from 'lucide-react';

export default function PostGeneratorPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [leadData, setLeadData] = useState(null);

  useEffect(() => {
    // Check if user has already signed up (mocking lead persistence for now)
    const savedLead = localStorage.getItem('ottomatic_carousel_lead');
    if (savedLead) {
      setLeadData(JSON.parse(savedLead));
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const handleSuccess = () => {
    const mockLead = {
      uid: 'user_' + Math.random().toString(36).substr(2, 9),
      name: 'User',
      generationsCount: 0
    };
    localStorage.setItem('ottomatic_carousel_lead', JSON.stringify(mockLead));
    setLeadData(mockLead);
    setIsAuthenticated(true);
  };

  const handleGenerationComplete = () => {
    if (leadData) {
      const updatedLead = { ...leadData, generationsCount: leadData.generationsCount + 1 };
      setLeadData(updatedLead);
      localStorage.setItem('ottomatic_carousel_lead', JSON.stringify(updatedLead));
    }
  };

  if (isLoading) {
    return (
      <div style={{ minHeight: '100vh', background: '#060606', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Loader2 size={32} color="#f97316" className="spin" />
      </div>
    );
  }

  return (
    <div style={{ background: '#060606', minHeight: '100vh' }}>
      {isAuthenticated && leadData ? (
        <CarouselApp leadData={leadData} onGenerationComplete={handleGenerationComplete} />
      ) : (
        <LandingPage onSuccess={handleSuccess} />
      )}
    </div>
  );
}
