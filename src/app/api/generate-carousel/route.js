import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req) {
  try {
    const { theme, mode, slideCount, brandCategory, brandHandle, useWebSearch } = await req.json();

    if (!theme || !mode) {
      return Response.json({ error: "Missing theme or mode" }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return Response.json({ error: "GEMINI_API_KEY not found in environment variables." }, { status: 500 });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    
    // 1. CONTEXTO E REGRAS PREMIUM
    const contextBlock = `
CONTEXTO DO CRIADOR:
- Nicho/categoria: ${brandCategory || 'Marketing'}
- Handle: ${brandHandle || '@suamarca'}
- Use esse contexto para personalizar exemplos, linguagem e referências ao longo dos slides.

REGRAS GLOBAIS DE QUALIDADE — COPY ENXUTO E LETAL:
1. IDIOMA: Português do Brasil impecável.
2. TÍTULOS: Específicos e curtos. MÁXIMO 6-7 palavras.
3. TEXTO_APOIO: MÁXIMO ABSOLUTO de 35 palavras por slide (75 no modo Microblog).
4. PROFUNDIDADE NA PRÁTICA: Entregue um dado chocante ou instrução não óbvia.
5. SUGESTAO_VISUAL: Sempre em inglês fotográfico descritivo.
6. PROGRESSÃO NARRATIVA: Cada slide deve criar uma "micro-tensão" resolvida no próximo.
7. CTA FINAL: Use CTAs de DM ou comentário específico.`;

    const systemInstruction = mode.prompt + contextBlock + `\n\nResponda ESTRITAMENTE em JSON com array de EXATAMENTE ${slideCount} objetos. 
    Layouts disponíveis: capa / texto_imagem / so_texto / impacto / foto_full / microblog_capa / microblog_texto / microblog_lista / microblog_cta.
    Formato: [{ "slide": 1, "layout": "capa", "titulo": "...", "texto_apoio": "...", "sugestao_visual": "..." }]`;

    // 2. BUSCA DO GOOGLE (GROUNDING)
    let searchContext = "";
    if (useWebSearch) {
      try {
        const searchModel = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });
        const searchRes = await searchModel.generateContent({
          contents: [{ role: "user", parts: [{ text: `Pesquise dados, estatísticas e informações atuais sobre o tema: "${theme}". Nicho: ${brandCategory}. Retorne um resumo objetivo.` }] }],
          tools: [{ googleSearchRetrieval: {} }]
        });
        const searchText = searchRes.response.text();
        if (searchText) {
          searchContext = `\n\nDADOS REAIS ENCONTRADOS NA WEB:\n${searchText.slice(0, 2000)}`;
        }
      } catch (e) {
        console.error("Search grounding failed, continuing without it:", e);
      }
    }

    // 3. MODELO PRINCIPAL (RESTAURADO)
    const model = genAI.getGenerativeModel({ 
      model: "gemini-3-flash-preview",
      systemInstruction: systemInstruction,
    });

    const finalPrompt = `Tema/Texto Base: ${theme}${searchContext}`;

    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: finalPrompt }] }],
      generationConfig: {
        responseMimeType: "application/json",
      }
    });

    const text = result.response.text();
    // Clean JSON safely
    const cleanText = text.replace(/```json/g, '').replace(/```/g, '').trim();
    const slides = JSON.parse(cleanText);

    return Response.json({ slides });

  } catch (error) {
    console.error("Error generating carousel:", error);
    return Response.json({ error: `[PRO] ${error.message || "Failed to generate carousel"}` }, { status: 500 });
  }
}
