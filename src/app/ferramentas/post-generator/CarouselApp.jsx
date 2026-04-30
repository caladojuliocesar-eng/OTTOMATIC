"use client";

import React, { useState, useEffect } from "react";
import { Loader2, Send, Copy, CheckCircle2, AlertCircle, LayoutTemplate, ImageIcon, Upload, Settings2, Download, Palette, Type, FileText, Edit3, ChevronDown, Lock } from "lucide-react";
import { THEMES, CAROUSEL_MODES } from "./constants";
import { renderSlide, _dragCtx } from "./renderSlide";

export default function CarouselApp({ leadData, onGenerationComplete }) {
  const [selectedTheme, setSelectedTheme] = useState("dark_orange");
  const [selectedMode, setSelectedMode] = useState(null);
  const [theme, setTheme] = useState("");
  const [slides, setSlides] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState("");
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [viewMode, setViewMode] = useState("visual");
  const [slideCount, setSlideCount] = useState(6);
  const [isProcessingPdf, setIsProcessingPdf] = useState(false);
  const [pdfImages, setPdfImages] = useState([]);
  const [imagePositions, setImagePositions] = useState({});
  const [isExporting, setIsExporting] = useState(false);
  const [brandHandle, setBrandHandle] = useState("@suamarca");
  const [brandCategory, setBrandCategory] = useState("Marketing");
  const [brandProfileImage, setBrandProfileImage] = useState(null);
  const [brandLogoImage, setBrandLogoImage] = useState(null);
  const [titleScale, setTitleScale] = useState(100);
  const [contentScale, setContentScale] = useState(100);
  const [showImagePanel, setShowImagePanel] = useState({});
  const [slideAspectRatio, setSlideAspectRatio] = useState("4/5");
  const [useWebSearch, setUseWebSearch] = useState(true);

  const [showThemeSelect, setShowThemeSelect] = useState(false);
  const [showModeSelect, setShowModeSelect] = useState(false);

  const [actionInfo, setActionInfo] = useState(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!actionInfo) return;
      if (e.cancelable) e.preventDefault();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      const dx = clientX - actionInfo.startX;
      const dy = clientY - actionInfo.startY;
      const ai = actionInfo;
      setSlides(prev => prev.map((s, i) => {
        if (i !== ai.index) return s;
        const allPos = s.positions || {};
        const pos = allPos[ai.field] || { x: 0, y: 0, scale: 1 };
        const newPos = Object.assign({}, allPos);
        if (ai.type === "drag") {
          newPos[ai.field] = { x: ai.origX + dx, y: ai.origY + dy, scale: pos.scale };
        } else {
          newPos[ai.field] = { x: pos.x, y: pos.y, scale: Math.max(0.3, ai.origScale + (dx + dy) * 0.005) };
        }
        return Object.assign({}, s, { positions: newPos });
      }));
    };
    const handleMouseUp = () => { if (actionInfo) setActionInfo(null); };
    if (actionInfo) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      window.addEventListener("touchmove", handleMouseMove, { passive: false });
      window.addEventListener("touchend", handleMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleMouseMove);
      window.removeEventListener("touchend", handleMouseUp);
    };
  }, [actionInfo]);

  const handleActionStart = (e, index, field, type) => {
    if (!e.touches && e.button !== 0) return;
    if (e.cancelable) e.preventDefault();
    e.stopPropagation();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    const pos = slides[index].positions?.[field] || { x: 0, y: 0, scale: 1 };
    setActionInfo({ type, index, field, startX: clientX, startY: clientY, origX: pos.x, origY: pos.y, origScale: pos.scale || 1 });
  };

  const themeAccent = selectedTheme === "dark_orange" ? "#f97316" : selectedTheme === "dark_red" ? "#e11d48" : selectedTheme === "white_red" ? "#e11d48" : selectedTheme === "yellow_black" ? "#f5c800" : "#f97316";

  const toggleImagePanel = (index) => setShowImagePanel((prev) => ({ ...prev, [index]: !prev[index] }));

  const handleModeSelect = (mode) => {
    setSelectedMode(mode);
    setSlideCount(mode.defaultSlides);
    setSlides([]);
    setError("");
    if (mode.id === "microblog_denso") setSelectedTheme("black_editorial");
    else if (selectedTheme === "black_editorial") setSelectedTheme("dark_orange");
  };

  const handleProfileImageUpload = (e) => { const f = e.target.files[0]; if (f) setBrandProfileImage(URL.createObjectURL(f)); };
  const handleLogoUpload = (e) => { const f = e.target.files[0]; if (f) setBrandLogoImage(URL.createObjectURL(f)); };
  const handleImageUpload = (index, e) => {
    const f = e.target.files[0]; if (!f) return;
    setSlides(prev => prev.map((s, i) => i === index ? { ...s, imageUrl: URL.createObjectURL(f) } : s));
    setImagePositions((prev) => ({ ...prev, [index]: 50 }));
  };

  const handlePdfUpload = async (event) => {
    const file = event.target.files[0];
    if (!file || file.type !== "application/pdf") { setError("Isso não é um PDF."); return; }
    setIsProcessingPdf(true); setError(""); setPdfImages([]);
    try {
      if (!window.pdfjsLib) {
        await new Promise((resolve, reject) => {
          const script = document.createElement("script");
          script.src = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js";
          script.onload = () => { window.pdfjsLib.GlobalWorkerOptions.workerSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js"; resolve(); };
          script.onerror = reject; document.head.appendChild(script);
        });
      }
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await window.pdfjsLib.getDocument({ data: arrayBuffer }).promise;

      let fullText = '';
      const rawImages = [];
      const totalPages = pdf.numPages;

      for (let i = 1; i <= totalPages; i++) {
          const page = await pdf.getPage(i);
          const textContent = await page.getTextContent();
          const pageText = textContent.items.map((item) => item.str).join(' ');
          fullText += '\n--- PÁGINA ' + i + ' ---\n' + pageText + '\n';

          if (i <= 10) {
              try {
                  const ops = await page.getOperatorList();
                  for (let j = 0; j < ops.fnArray.length; j++) {
                      if (ops.fnArray[j] === window.pdfjsLib.OPS.paintImageXObject || ops.fnArray[j] === window.pdfjsLib.OPS.paintJpegXObject) {
                          const imgKey = ops.argsArray[j][0];
                          const img = await new Promise(resolve => page.objs.get(imgKey, resolve));

                          if (!img || img.width < 150 || img.height < 150) continue;

                          const canvas = document.createElement('canvas');
                          canvas.width = img.width;
                          canvas.height = img.height;
                          const ctx = canvas.getContext('2d');
                          if (!ctx) continue;
                          let extracted = false;

                          if (img.bitmap) {
                              ctx.drawImage(img.bitmap, 0, 0);
                              extracted = true;
                          } else if (img.data) {
                              let rgbaData;
                              if (img.data.length === img.width * img.height * 3) {
                                  rgbaData = new Uint8ClampedArray(img.width * img.height * 4);
                                  let ptr = 0;
                                  for (let k = 0; k < img.data.length; k += 3) {
                                      rgbaData[ptr++] = img.data[k];
                                      rgbaData[ptr++] = img.data[k + 1];
                                      rgbaData[ptr++] = img.data[k + 2];
                                      rgbaData[ptr++] = 255;
                                  }
                              } else if (img.data.length === img.width * img.height * 4) {
                                  rgbaData = new Uint8ClampedArray(img.data);
                              }

                              if (rgbaData) {
                                  const imageData = new ImageData(rgbaData, img.width, img.height);
                                  ctx.putImageData(imageData, 0, 0);
                                  extracted = true;
                              }
                          }

                          if (extracted) {
                              rawImages.push(canvas.toDataURL('image/jpeg', 0.9));
                          }
                      }
                  }
              } catch (e) {
                  console.warn("Erro ao extrair imagem na página", i);
              }
          }
      }

      if (rawImages.length === 0) {
          for (let i = 1; i <= Math.min(10, totalPages); i++) {
              const page = await pdf.getPage(i);
              const viewport = page.getViewport({ scale: 1.5 });
              const canvas = document.createElement('canvas');
              const context = canvas.getContext('2d');
              if(!context) continue;
              canvas.height = viewport.height;
              canvas.width = viewport.width;
              await page.render({ canvasContext: context, viewport: viewport }).promise;
              rawImages.push(canvas.toDataURL('image/jpeg', 0.8));
          }
      }

      setTheme(prev => (prev ? prev + '\n\n' : '') + '--- TEXTO EXTRAÍDO DO PDF ---\n' + fullText);
      setPdfImages(rawImages);

      if (totalPages > 10) {
          setError('Aviso: Extraí o texto de tudo, mas limitei a busca de imagens às primeiras 10 páginas.');
      }

    } catch (err) {
        console.error(err);
        setError('Deu pau na hora de ler o PDF. O arquivo está corrompido, protegido com senha ou em formato não suportado.');
    } finally { setIsProcessingPdf(false); event.target.value = ""; }
  };

  const handleSlideTextChange = (index, field, val) => setSlides(prev => prev.map((s, i) => i === index ? { ...s, [field]: val } : s));
  const handlePositionChange = (index, val) => setImagePositions((prev) => ({ ...prev, [index]: val }));

  const generateCarousel = async () => {
    if (!selectedMode) { setError("Escolha um modo primeiro!"); return; }
    if (!theme.trim()) { setError("Cola um tema ou texto base."); return; }

    if (leadData.generationsCount >= 2) {
      setError("Você atingiu o limite de 2 carrosséis gratuitos nesta versão de degustação.");
      return;
    }

    setIsGenerating(true); setError(""); setSlides([]); setImagePositions({});

    try {
      const response = await fetch('/api/generate-carousel', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          theme,
          mode: selectedMode,
          slideCount,
          brandCategory,
          brandHandle,
          useWebSearch
        })
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || "Erro na geração");
      }

      const data = await response.json();
      setSlides(data.slides);

      // await incrementGeneration(leadData.uid, leadData.generationsCount);
      onGenerationComplete();

    } catch(err) { 
      setError(err.message || "Falha na geração. Tenta de novo."); 
    } finally { 
      setIsGenerating(false); 
    }
  };

  const exportAllToPNG = async () => {
    setIsExporting(true);
    if (document.activeElement instanceof HTMLElement) document.activeElement.blur();
    await document.fonts.ready;
    try {
      if (!window.htmlToImage) {
        await new Promise((resolve, reject) => {
          const script = document.createElement("script");
          script.src = "https://cdnjs.cloudflare.com/ajax/libs/html-to-image/1.11.11/html-to-image.min.js";
          script.onload = () => resolve(); script.onerror = reject; document.head.appendChild(script);
        });
      }
      const slideCards = Array.from(document.querySelectorAll(".slide-card"));
      for (let i = 0; i < slideCards.length; i++) {
        const element = slideCards[i];
        if (!element) continue;
        const dataUrl = await window.htmlToImage.toPng(element, { pixelRatio: 3 });
        const link = document.createElement("a");
        link.download = `${brandHandle.replace("@","")}_slide_${i+1}.png`;
        link.href = dataUrl; link.click();
        await new Promise(r => setTimeout(r, 600));
      }
    } catch(err) { setError("Erro ao exportar PNGs."); }
    finally {
      setIsExporting(false);
    }
  };

  const copyToClipboard = (text, index) => {
    const ta = document.createElement("textarea"); ta.value = text; document.body.appendChild(ta); ta.select();
    try { document.execCommand("copy"); setCopiedIndex(index); setTimeout(() => setCopiedIndex(null), 2000); } catch(e) {}
    document.body.removeChild(ta);
  };
  const copyAll = () => copyToClipboard(slides.map(s => `[Slide ${s.slide} - ${s.layout}]\nHeadline: ${s.titulo}\nTexto: ${s.texto_apoio}\nVisual: ${s.sugestao_visual||""}\n`).join("\n---\n\n"), "all");

  const drawslide = (sl, idx) => renderSlide(sl, idx, selectedTheme, brandHandle, brandCategory, brandProfileImage, brandLogoImage, imagePositions, titleScale, contentScale, slideAspectRatio, handleActionStart, sl.positions);

  _dragCtx.onAction = handleActionStart; _dragCtx.allPositions = slides.map((s) => s.positions || {});

  return (
    <div className="root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        .root { min-height:100vh; background:#060606; color:#ffffff; font-family:Arial,sans-serif; }
        .scr::-webkit-scrollbar{height:5px;} .scr::-webkit-scrollbar-track{background:#0a0a0a;} .scr::-webkit-scrollbar-thumb{background:#222;border-radius:3px;} .scr::-webkit-scrollbar-thumb:hover{background:#f97316;}
        input[type=range]{-webkit-appearance:none;height:2px;outline:none;cursor:pointer;border-radius:1px;}
        input[type=range]::-webkit-slider-thumb{-webkit-appearance:none;width:12px;height:12px;border-radius:50%;cursor:pointer;}
        textarea,input[type=text],input[type=email]{outline:none;transition:border-color 0.15s;} textarea:focus,input[type=text]:focus,input[type=email]:focus{border-color:#f97316!important;}
        select{outline:none;} select:focus{border-color:#f97316!important;}
        .btn-p{display:flex;align-items:center;justify-content:center;gap:7px;width:100%;padding:12px;border:none;border-radius:3px;font-family:Arial,sans-serif;font-size:12px;font-weight:900;letter-spacing:0.1em;text-transform:uppercase;cursor:pointer;transition:filter 0.15s,transform 0.1s;}
        .btn-p:hover:not(:disabled){filter:brightness(1.08);transform:translateY(-1px);} .btn-p:disabled{opacity:0.35;cursor:not-allowed;transform:none;}
        .btn-g{display:flex;align-items:center;justify-content:center;gap:5px;padding:8px 12px;background:#111;border:1px solid #222;border-radius:3px;color:#ffffff;font-size:11px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;cursor:pointer;transition:all 0.14s;font-family:Arial,sans-serif;}
        .btn-g:hover{background:#1a1a1a;color:#ffffff;border-color:#444;}
        .ulabel{display:flex;align-items:center;justify-content:center;gap:5px;padding:7px 10px;background:#111;border:1px solid #1e1e1e;border-radius:3px;color:#ffffff;font-size:10px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;cursor:pointer;transition:all 0.14s;font-family:Arial,sans-serif;}
        .ulabel:hover{background:#1a1a1a;color:#ffffff;}
        .tag{display:inline-flex;align-items:center;gap:3px;font-size:9px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;padding:3px 7px;border-radius:2px;font-family:Arial,sans-serif;}
        @keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}} .spin{animation:spin 1s linear infinite;}
        .smart-group:hover .smart-drag{opacity:1!important;} .smart-group:hover .smart-resize{opacity:1!important;}
      `}</style>

      <div style={{ borderBottom:"1px solid #111", padding:"16px 24px", display:"flex", alignItems:"center", justifyContent:"space-between", gap:12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width:4, height:26, background:themeAccent, borderRadius:1 }} />
          <div>
            <div style={{ fontFamily:"'Bebas Neue',Arial Black,sans-serif", fontSize:24, letterSpacing:"0.1em", color:"#fff", lineHeight:1 }}>
              Fábrica de Carrosséis <span style={{ color:themeAccent }}>OTTOMATIC</span> AI PRO
            </div>
            <div style={{ fontSize:9, color:"#ccc", letterSpacing:"0.14em", textTransform:"uppercase", marginTop:2 }}>
              5 estilos visuais · 6 modos de carrossel · geração por objetivo
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#111', padding: '6px 12px', borderRadius: 4, border: '1px solid #222' }}>
          <span style={{ fontSize: 10, color: '#888', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.1em' }}>Uso:</span>
          <span style={{ fontSize: 12, color: leadData.generationsCount >= 2 ? '#ef4444' : '#10b981', fontWeight: 900 }}>{leadData.generationsCount}/2</span>
        </div>
      </div>

      <div style={{ padding:"20px 24px", maxWidth:1500, margin:"0 auto" }}>
        <div style={{ display:"flex", gap:20, marginBottom:20, position:"relative", zIndex:50 }}>
          <div style={{ flex:1, position:"relative" }}>
            <div style={{ fontSize:9, fontWeight:700, letterSpacing:"0.14em", textTransform:"uppercase", color:"#fff", display:"flex", alignItems:"center", gap:8, marginBottom:8 }}>
              <span style={{ background:themeAccent, color:"#000", padding:"1px 7px", borderRadius:2, fontSize:8, fontWeight:900 }}>01</span>
              Estilo Visual
            </div>
            {showThemeSelect && <div style={{position:"fixed", inset:0, zIndex:40}} onClick={() => setShowThemeSelect(false)} />}
            <div onClick={() => setShowThemeSelect(!showThemeSelect)}
              style={{ padding:"12px 16px", background:"#0d0d0d", border:`1px solid ${showThemeSelect ? themeAccent : "#1a1a1a"}`, borderRadius:4, cursor:"pointer", display:"flex", justifyContent:"space-between", alignItems:"center", position:"relative", zIndex:41 }}>
              <div style={{ display:"flex", alignItems:"center", gap:12 }}>
                {THEMES.find(t => t.id === selectedTheme) && (
                  <>
                    <div style={{ display:"flex", gap:3 }}>
                      {THEMES.find(t => t.id === selectedTheme)?.preview.map((c,i) => <div key={i} style={{ width:16, height:16, borderRadius:2, background:c, border:"1px solid rgba(255,255,255,0.1)" }} />)}
                    </div>
                    <span style={{ fontFamily:"'Bebas Neue',Arial Black,sans-serif", fontSize:16, letterSpacing:"0.04em", color:"#fff", marginTop:2 }}>{THEMES.find(t => t.id === selectedTheme)?.name}</span>
                  </>
                )}
              </div>
              <ChevronDown size={16} style={{ color:"#666", transform: showThemeSelect ? "rotate(180deg)" : "none", transition:"transform 0.2s" }} />
            </div>

            {showThemeSelect && (
              <div style={{ position:"absolute", top:"100%", left:0, right:0, background:"#0d0d0d", border:"1px solid #222", borderRadius:4, marginTop:6, zIndex:50, overflow:"hidden" }}>
                {THEMES.map(t => {
                  const isMicroblog = selectedMode?.id === "microblog_denso";
                  const isEditorial = t.id === "black_editorial";
                  const isBlocked = isMicroblog ? !isEditorial : isEditorial;
                  return (
                    <div key={t.id} onClick={() => { if(!isBlocked) { setSelectedTheme(t.id); setShowThemeSelect(false); } }}
                      style={{ padding:"12px 16px", display:"flex", alignItems:"center", gap:12, cursor:isBlocked ? "not-allowed" : "pointer", borderBottom:"1px solid #141414", background: selectedTheme===t.id ? "#111" : "transparent", opacity: isBlocked ? 0.3 : 1 }}>
                      <div style={{ display:"flex", gap:3 }}>
                        {t.preview.map((c,i) => <div key={i} style={{ width:16, height:16, borderRadius:2, background:c, border:"1px solid rgba(255,255,255,0.1)" }} />)}
                      </div>
                      <div style={{ flex:1 }}>
                        <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                          <span style={{ fontFamily:"'Bebas Neue',Arial Black,sans-serif", fontSize:16, letterSpacing:"0.04em", color:selectedTheme===t.id ? themeAccent : "#fff", marginTop:2 }}>{t.name}</span>
                          {isBlocked && <span style={{ fontSize:8, fontWeight:900, letterSpacing:"0.1em", textTransform:"uppercase", background:"#222", color:"#888", padding:"2px 5px", borderRadius:2 }}>{isMicroblog ? "Só Microblog" : "Só Editorial"}</span>}
                        </div>
                        <div style={{ fontSize:10, color:"#888", marginTop:2 }}>{t.desc}</div>
                      </div>
                      {selectedTheme===t.id && <CheckCircle2 size={14} style={{ color:themeAccent }} />}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div style={{ flex:1, position:"relative" }}>
            <div style={{ fontSize:9, fontWeight:700, letterSpacing:"0.14em", textTransform:"uppercase", color:"#fff", display:"flex", alignItems:"center", gap:8, marginBottom:8 }}>
              <span style={{ background:themeAccent, color:"#000", padding:"1px 7px", borderRadius:2, fontSize:8, fontWeight:900 }}>02</span>
              Modo do Carrossel
            </div>
            {showModeSelect && <div style={{position:"fixed", inset:0, zIndex:40}} onClick={() => setShowModeSelect(false)} />}
            <div onClick={() => setShowModeSelect(!showModeSelect)}
              style={{ padding:"12px 16px", background:"#0d0d0d", border:`1px solid ${showModeSelect ? themeAccent : "#1a1a1a"}`, borderRadius:4, cursor:"pointer", display:"flex", justifyContent:"space-between", alignItems:"center", position:"relative", zIndex:41 }}>
              <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                {selectedMode ? (
                  <>
                    <span style={{ fontSize:18 }}>{selectedMode.icon}</span>
                    <span style={{ fontFamily:"'Bebas Neue',Arial Black,sans-serif", fontSize:16, letterSpacing:"0.04em", color:"#fff", marginTop:2 }}>{selectedMode.label}</span>
                    <span style={{ fontSize:9, fontWeight:900, letterSpacing:"0.1em", textTransform:"uppercase", color:selectedMode.cor, border:`1px solid ${selectedMode.cor}40`, padding:"1px 6px", borderRadius:2, marginLeft:4 }}>{selectedMode.objetivo}</span>
                  </>
                ) : (
                  <span style={{ fontFamily:"Arial", fontSize:13, color:"#666" }}>Selecione o objetivo...</span>
                )}
              </div>
              <ChevronDown size={16} style={{ color:"#666", transform: showModeSelect ? "rotate(180deg)" : "none", transition:"transform 0.2s" }} />
            </div>

            {showModeSelect && (
              <div style={{ position:"absolute", top:"100%", left:0, right:0, background:"#0d0d0d", border:"1px solid #222", borderRadius:4, marginTop:6, zIndex:50, overflow:"hidden" }}>
                {CAROUSEL_MODES.map(m => (
                  <div key={m.id} onClick={() => { handleModeSelect(m); setShowModeSelect(false); }}
                    style={{ padding:"12px 16px", display:"flex", alignItems:"center", gap:12, cursor:"pointer", borderBottom:"1px solid #141414", background: selectedMode?.id===m.id ? "#111" : "transparent" }}>
                    <span style={{ fontSize:20 }}>{m.icon}</span>
                    <div style={{ flex:1 }}>
                      <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                        <span style={{ fontFamily:"'Bebas Neue',Arial Black,sans-serif", fontSize:16, letterSpacing:"0.04em", color:selectedMode?.id===m.id ? m.cor : "#fff", marginTop:2 }}>{m.label}</span>
                        <span style={{ fontSize:8, fontWeight:900, letterSpacing:"0.1em", textTransform:"uppercase", color:m.cor }}>{m.objetivo}</span>
                      </div>
                      <div style={{ fontSize:10, color:"#888", marginTop:2 }}>{m.slideRange[0]}–{m.slideRange[1]} slides</div>
                    </div>
                    {selectedMode?.id===m.id && <CheckCircle2 size={14} style={{ color:m.cor }} />}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div style={{ display:"grid", gridTemplateColumns:"300px 1fr", gap:18 }}>
          <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
            <div style={{ background:"#0d0d0d", border:"1px solid #1a1a1a", borderRadius:4, padding:16 }}>
              <div style={{ fontSize:9, fontWeight:700, letterSpacing:"0.14em", textTransform:"uppercase", color:"#fff", display:"flex", alignItems:"center", gap:6, marginBottom:12 }}>
                <Settings2 size={11} style={{ color:themeAccent }} /> Brand Kit
              </div>
              <div style={{ display:"flex", gap:7, marginBottom:8 }}>
                <div style={{ flex:1 }}>
                  <div style={{ fontSize:9, color:"#fff", letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:5 }}>Handle</div>
                  <input type="text" value={brandHandle} onChange={e => setBrandHandle(e.target.value)}
                    style={{ background:"#0a0a0a", border:"1px solid #1e1e1e", borderRadius:3, color:"#fff", fontFamily:"Arial", fontSize:13, padding:"7px 9px", width:"100%" }} />
                </div>
                <div>
                  <div style={{ fontSize:9, color:"#fff", letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:5 }}>Categoria</div>
                  <input type="text" value={brandCategory} onChange={e => setBrandCategory(e.target.value)}
                    style={{ background:"#0a0a0a", border:"1px solid #1e1e1e", borderRadius:3, color:"#fff", fontFamily:"Arial", fontSize:13, padding:"7px 9px", width:80 }} />
                </div>
              </div>
              <div style={{ display:"flex", gap:7 }}>
                <label className="ulabel" style={{ flex:1 }}><Upload size={10} />{brandProfileImage?"✓ Avatar":"Avatar"}<input type="file" accept="image/*" style={{ display:"none" }} onChange={handleProfileImageUpload} /></label>
                <label className="ulabel" style={{ flex:1 }}><Upload size={10} />{brandLogoImage?"✓ Logo":"Logo"}<input type="file" accept="image/*" style={{ display:"none" }} onChange={handleLogoUpload} /></label>
              </div>
              <div style={{ height:1, background:"#151515", margin:"12px 0" }} />

              <div style={{ fontSize:9, fontWeight:700, letterSpacing:"0.14em", textTransform:"uppercase", color:"#fff", display:"flex", alignItems:"center", gap:6, marginBottom:8 }}>
                <Palette size={11} style={{ color:themeAccent }} /> Proporção do Slide
              </div>
              <div style={{ display:"flex", gap:6 }}>
                {[["4/5","4:5","Instagram"],["1/1","1:1","Quadrado"],["4/3","4:3","Landscape"],["9/16","9:16","Stories"]].map(([val,ratio,name]) => (
                  <button key={val} onClick={() => setSlideAspectRatio(val)}
                    style={{ flex:1, padding:"7px 4px", border:`1px solid ${slideAspectRatio===val ? themeAccent : "#1e1e1e"}`, borderRadius:3, background: slideAspectRatio===val ? themeAccent+"18" : "#0a0a0a", cursor:"pointer", color: slideAspectRatio===val ? themeAccent : "#fff", fontSize:9, fontWeight:700, letterSpacing:"0.06em", textTransform:"uppercase", lineHeight:1.3, fontFamily:"Arial,sans-serif", textAlign:"center" }}>
                    <div>{ratio}</div>
                    <div style={{ fontSize:7, opacity:0.8, marginTop:1 }}>{name}</div>
                  </button>
                ))}
              </div>

              <div style={{ height:1, background:"#151515", margin:"12px 0" }} />
              <div style={{ fontSize:9, fontWeight:700, letterSpacing:"0.14em", textTransform:"uppercase", color:"#fff", display:"flex", alignItems:"center", gap:6, marginBottom:10 }}>
                <Type size={11} style={{ color:themeAccent }} /> Escala
              </div>
              {[["Títulos",titleScale,setTitleScale],["Conteúdo",contentScale,setContentScale]].map(([l,v,s]) => (
                <div key={l} style={{ marginBottom:9 }}>
                  <div style={{ display:"flex", justifyContent:"space-between", marginBottom:5 }}>
                    <span style={{ fontSize:9, color:"#fff", letterSpacing:"0.1em", textTransform:"uppercase" }}>{l}</span>
                    <span style={{ fontSize:10, color:themeAccent, fontWeight:700 }}>{v}%</span>
                  </div>
                  <input type="range" min="60" max="150" value={v} onChange={e => s(parseInt(e.target.value))}
                    style={{ width:"100%", background:`linear-gradient(to right,${themeAccent} ${(v-60)/90*100}%,#1e1e1e ${(v-60)/90*100}%)` }} />
                </div>
              ))}
            </div>

            <div style={{ background:"#0d0d0d", border:"1px solid #1a1a1a", borderRadius:4, padding:16 }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:10 }}>
                <div style={{ fontSize:9, fontWeight:700, letterSpacing:"0.14em", textTransform:"uppercase", color:"#fff", display:"flex", alignItems:"center", gap:6 }}>
                  <span style={{ background:themeAccent, color:"#000", padding:"1px 7px", borderRadius:2, fontSize:8, fontWeight:900 }}>03</span>
                  Tema ou texto base
                </div>
                <label className="ulabel">
                  {isProcessingPdf ? <Loader2 size={10} className="spin" /> : <FileText size={10} style={{ color:themeAccent }} />}
                  {isProcessingPdf?"...":"PDF"}
                  <input type="file" accept="application/pdf" style={{ display:"none" }} onChange={handlePdfUpload} disabled={isProcessingPdf} />
                </label>
              </div>
              <textarea
                style={{ background:"#0a0a0a", border:"1px solid #1e1e1e", borderRadius:3, color:"#fff", fontFamily:"Arial", fontSize:12, padding:"9px 10px", width:"100%", height:110, resize:"none", lineHeight:1.6 }}
                placeholder={selectedMode ? `Tema para "${selectedMode.label}"...` : "Escolha modo e tema..."}
                value={theme} onChange={e => setTheme(e.target.value)} disabled={!selectedMode}
              />
              <div style={{ marginTop:12 }}>
                <div style={{ display:"flex", justifyContent:"space-between", marginBottom:5 }}>
                  <span style={{ fontSize:9, color:"#fff", letterSpacing:"0.1em", textTransform:"uppercase" }}>Slides</span>
                  <span style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:15, color:themeAccent, letterSpacing:"0.1em" }}>{slideCount}</span>
                </div>
                <input type="range" min={selectedMode?selectedMode.slideRange[0]:4} max={selectedMode?selectedMode.slideRange[1]:10}
                  value={slideCount} onChange={e => setSlideCount(parseInt(e.target.value))} disabled={!selectedMode}
                  style={{ width:"100%", background:`linear-gradient(to right,${themeAccent} ${((slideCount-(selectedMode?.slideRange[0]||4))/((selectedMode?.slideRange[1]||10)-(selectedMode?.slideRange[0]||4)))*100}%,#1e1e1e ${((slideCount-(selectedMode?.slideRange[0]||4))/((selectedMode?.slideRange[1]||10)-(selectedMode?.slideRange[0]||4)))*100}%)` }} />
              </div>
              {error && (
                <div style={{ marginTop:10, padding:"8px 10px", background:"rgba(239,68,68,0.07)", border:"1px solid rgba(239,68,68,0.18)", borderRadius:3, display:"flex", alignItems:"flex-start", gap:6, fontSize:11, color:"#f87171" }}>
                  <AlertCircle size={12} style={{ flexShrink:0, marginTop:1 }} />{error}
                </div>
              )}
              <div onClick={() => setUseWebSearch(v => !v)}
                style={{ marginTop:12, display:"flex", alignItems:"center", justifyContent:"space-between", padding:"9px 11px", background: useWebSearch ? "rgba(16,185,129,0.07)" : "#0a0a0a", border: `1px solid ${useWebSearch ? "rgba(16,185,129,0.25)" : "#1e1e1e"}`, borderRadius:3, cursor:"pointer" }}>
                <div style={{ display:"flex", alignItems:"center", gap:7 }}>
                  <div style={{ width:8, height:8, borderRadius:"50%", background: useWebSearch ? "#10b981" : "#333" }} />
                  <div>
                    <div style={{ fontSize:10, fontWeight:700, letterSpacing:"0.08em", textTransform:"uppercase", color: useWebSearch ? "#10b981" : "#fff" }}>Google Search Grounding</div>
                    <div style={{ fontSize:9, color:"#ccc", marginTop:1 }}>{useWebSearch ? "IA busca dados reais antes de gerar" : "Desativado"}</div>
                  </div>
                </div>
              </div>

              <button className="btn-p" onClick={generateCarousel} disabled={isGenerating||isProcessingPdf||!selectedMode||leadData.generationsCount>=2}
                style={{ marginTop:10, background:selectedMode?selectedMode.cor:themeAccent, color:"#000" }}>
                {isGenerating ? <><Loader2 size={13} className="spin" /> Gerando...</> : <><Send size={13} /> {selectedMode?`Gerar ${selectedMode.icon} ${selectedMode.label}`:"Gerar Roteiro"}</>}
              </button>
            </div>
          </div>

          <div style={{ minWidth: 0 }}>
            {slides.length === 0 && !isGenerating ? (
              <div style={{ minHeight:360, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", border:"1px dashed #333", borderRadius:4, gap:10, color:"#fff" }}>
                <LayoutTemplate size={34} style={{ opacity:0.5 }} />
                {selectedMode
                  ? <><span style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:15, letterSpacing:"0.12em", color:selectedMode.cor }}>{selectedMode.icon} {selectedMode.label} PRONTO</span><span style={{ fontSize:11, color:"#ccc" }}>Cole o tema e clique em Gerar</span></>
                  : <span style={{ fontSize:11, color:"#ccc" }}>Complete os passos 01, 02 e 03</span>
                }
              </div>
            ) : isGenerating ? (
              <div style={{ minHeight:360, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", border:"1px solid #111", borderRadius:4, gap:14, background:"#0a0a0a" }}>
                <Loader2 size={30} style={{ color:selectedMode?.cor||themeAccent }} className="spin" />
                <span style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:13, letterSpacing:"0.18em", color:"#fff" }}>ARQUITETANDO ROTEIRO...</span>
              </div>
            ) : (
              <div>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:14, flexWrap:"wrap", gap:8 }}>
                  <div style={{ display:"flex", alignItems:"center", gap:10, flexWrap:"wrap" }}>
                    <span style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:15, letterSpacing:"0.1em", color:"#fff" }}>{slides.length} SLIDES</span>
                    <div style={{ display:"flex", background:"#0a0a0a", border:"1px solid #141414", borderRadius:3, overflow:"hidden" }}>
                      {["visual","text"].map(v => (
                        <button key={v} onClick={() => setViewMode(v)}
                          style={{ padding:"6px 11px", border:"none", cursor:"pointer", fontFamily:"Arial,sans-serif", fontSize:10, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", transition:"all 0.14s", background:viewMode===v?"#161616":"transparent", color:viewMode===v?"#fff":"#ccc" }}>
                          {v==="visual"?"Visual":"Copy"}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div style={{ display:"flex", gap:7 }}>
                    {viewMode==="visual" && <button className="btn-g" onClick={exportAllToPNG} disabled={isExporting}>{isExporting?<Loader2 size={12} className="spin" />:<Download size={12} />}{isExporting?"Baixando...":"Baixar PNGs"}</button>}
                    <button className="btn-g" onClick={copyAll}>{copiedIndex==="all"?<CheckCircle2 size={12} style={{ color:"#4ade80" }} />:<Copy size={12} />}{copiedIndex==="all"?"Copiado!":"Copiar Copy"}</button>
                  </div>
                </div>

                {viewMode==="text" ? (
                  <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
                    {slides.map((slide,index) => (
                      <div key={index} style={{ background:"#0a0a0a", border:"1px solid #141414", borderRadius:4, overflow:"hidden" }}>
                        <div style={{ padding:"9px 14px", borderBottom:"1px solid #141414", display:"flex", gap:8, background:"#070707" }}>
                          <span className="tag" style={{ background:themeAccent, color:"#000" }}>Slide {slide.slide}</span>
                          <span className="tag" style={{ background:"#141414", color:"#ccc", border:"1px solid #1e1e1e" }}>{slide.layout}</span>
                        </div>
                        <div style={{ padding:"14px 18px" }}>
                          <h3 style={{ fontFamily:"'Bebas Neue',Arial Black,sans-serif", fontSize:22, letterSpacing:"0.04em", color:"#fff", marginBottom:7 }}>{slide.titulo}</h3>
                          <p style={{ fontSize:12, color:"#ccc", lineHeight:1.6 }}>{slide.texto_apoio}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="scr" style={{ display:"flex", gap:16, overflowX:"auto", paddingBottom:16, paddingTop:2 }}>
                    {slides.map((slide,index) => (
                      <div key={index} style={{ display:"flex", flexDirection:"column", gap:10, width:320, flexShrink:0 }}>
                        <div className="slide-card">
                          {drawslide(slide, index)}
                        </div>
                        <div style={{ background:"#0d0d0d", border:"1px solid #1a1a1a", borderRadius:4, padding:13 }}>
                          <div style={{ fontSize:9, fontWeight:700, letterSpacing:"0.14em", textTransform:"uppercase", color:"#fff", display:"flex", alignItems:"center", gap:5, marginBottom:10, borderBottom:"1px solid #141414", paddingBottom:8 }}>
                            <Edit3 size={10} style={{ color:themeAccent }} /> Editor
                          </div>
                          <div style={{ marginBottom:7 }}>
                            <div style={{ fontSize:9, color:"#fff", letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:4 }}>Layout</div>
                            <select style={{ background:"#0a0a0a", border:"1px solid #1e1e1e", borderRadius:3, color:"#fff", fontFamily:"Arial", fontSize:11, padding:"6px 8px", width:"100%" }}
                              value={slide.layout} onChange={e => handleSlideTextChange(index,"layout",e.target.value)}>
                              <option value="capa">Capa</option>
                              <option value="texto_imagem">Texto + Imagem</option>
                              <option value="so_texto">Só Texto</option>
                              <option value="impacto">Impacto</option>
                            </select>
                          </div>
                          <div style={{ marginBottom:7 }}>
                            <div style={{ fontSize:9, color:"#fff", letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:4 }}>Título</div>
                            <textarea style={{ background:"#0a0a0a", border:"1px solid #1e1e1e", borderRadius:3, color:"#fff", fontFamily:"Arial", fontSize:11, padding:"6px 8px", width:"100%", resize:"none" }} rows={2}
                              value={slide.titulo} onChange={e => handleSlideTextChange(index,"titulo",e.target.value)} />
                          </div>
                          <div style={{ marginBottom:7 }}>
                            <div style={{ fontSize:9, color:"#fff", letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:4 }}>Texto de apoio</div>
                            <textarea style={{ background:"#0a0a0a", border:"1px solid #1e1e1e", borderRadius:3, color:"#fff", fontFamily:"Arial", fontSize:11, padding:"6px 8px", width:"100%", resize:"none" }} rows={3}
                              value={slide.texto_apoio} onChange={e => handleSlideTextChange(index,"texto_apoio",e.target.value)} />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
