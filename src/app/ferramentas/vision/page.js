import React from 'react';
import VisionCTA from '@/components/VisionCTA';

export const metadata = {
    title: 'Ferramentas - OttoMatic Vision',
    description: 'Crie imagens fantásticas com IA. Gratuito, seguro e a correr no seu navegador. OttoMatic Vision, a ferramenta de edição vetorial inteligente alimentada por IA (BYOK).',
};

export default function VisionToolsPage() {
    return (
        <>
            <div className="pt-20 bg-slate-950 min-h-screen">
                <VisionCTA />
            </div>
        </>
    );
}
