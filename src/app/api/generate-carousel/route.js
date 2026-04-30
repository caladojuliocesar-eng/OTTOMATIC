import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req) {
  try {
    const { theme, mode, slideCount, brandCategory, brandHandle } = await req.json();

    if (!theme || !mode) {
      return Response.json({ error: "Missing theme or mode" }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return Response.json({ error: "GEMINI_API_KEY not found in environment variables." }, { status: 500 });
    }

    // Force stable v1 version explicitly in the constructor
    const genAI = new GoogleGenerativeAI(apiKey);
    
    const contextBlock = `
CONTEXTO DO CRIADOR:
- Nicho/categoria: ${brandCategory}
- Handle: ${brandHandle}

REGRAS:
1. IDIOMA: Português do Brasil.
2. TÍTULOS: Curtos (máx 6 palavras).
3. TEXTO: Máx 30 palavras por slide.
4. CTA: DM ou comentário.`;

    const systemInstruction = mode.prompt + contextBlock + `\n\nResponda em JSON: [{ "slide": 1, "layout": "capa", "titulo": "...", "texto_apoio": "...", "sugestao_visual": "..." }]`;

    // We use gemini-1.5-flash-latest on v1 stable API
    const model = genAI.getGenerativeModel(
      { model: "gemini-1.5-flash" },
      { apiVersion: 'v1' }
    );

    const finalPrompt = `${systemInstruction}\n\nTema: ${theme}\nSlides: ${slideCount}`;

    const result = await model.generateContent(finalPrompt);

    const text = result.response.text();
    // Clean JSON if needed
    const cleanText = text.replace(/```json/g, '').replace(/```/g, '').trim();
    const slides = JSON.parse(cleanText);

    return Response.json({ slides });

  } catch (error) {
    console.error("Error generating carousel:", error);
    return Response.json({ error: `[API v2.2] ${error.message || "Failed to generate carousel"}` }, { status: 500 });
  }
}
