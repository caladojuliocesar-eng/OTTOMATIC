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
    
    const contextBlock = `
CONTEXTO DO CRIADOR:
- Nicho/categoria: ${brandCategory}
- Handle: ${brandHandle}
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

    let searchContext = "";
    if (useWebSearch) {
      try {
        // Use gemini-1.5-flash which is robust
        const searchModel = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const searchRes = await searchModel.generateContent({
          contents: [{ role: "user", parts: [{ text: `Pesquise dados e estatísticas atuais sobre o tema: "${theme}". Nicho: ${brandCategory}. Retorne um resumo objetivo.` }] }],
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

    // Try using gemini-1.5-flash-latest or gemini-1.5-flash
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
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
    const slides = JSON.parse(text);

    return Response.json({ slides });

  } catch (error) {
    console.error("Error generating carousel:", error);
    return Response.json({ error: error.message || "Failed to generate carousel" }, { status: 500 });
  }
}
