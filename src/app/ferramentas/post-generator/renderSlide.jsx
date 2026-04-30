import React from "react";
import styled from "styled-components";
import { Move, Maximize2, ArrowRight, Quote, CheckCircle2, XCircle } from "lucide-react";

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background: ${props => props.bg || "#1e1e1e"};
  color: ${props => props.color || "#fff"};
`;

const SmartEl = ({ children, field, index, pos, onAction, scale = 1 }) => {
  return (
    <div className="smart-group" style={{ 
      position: "relative", 
      transform: `translate(${pos?.x || 0}px, ${pos?.y || 0}px) scale(${pos?.scale || 1})`,
      transformOrigin: "center center",
      width: "fit-content",
      maxWidth: "90%",
      margin: "0 auto"
    }}>
      {children}
      <div className="edit-overlay" style={{ position: "absolute", top: -20, right: -20, display: "flex", gap: 4 }}>
        <button onMouseDown={e => onAction(e, index, field, "drag")} className="smart-drag" 
          style={{ background: "#fff", border: "none", borderRadius: "50%", width: 24, height: 24, display: "flex", alignItems: "center", justifyContent: "center", cursor: "move", boxShadow: "0 2px 8px rgba(0,0,0,0.3)" }}>
          <Move size={12} color="#000" />
        </button>
        <button onMouseDown={e => onAction(e, index, field, "scale")} className="smart-resize"
          style={{ background: "#fff", border: "none", borderRadius: "50%", width: 24, height: 24, display: "flex", alignItems: "center", justifyContent: "center", cursor: "nwse-resize", boxShadow: "0 2px 8px rgba(0,0,0,0.3)" }}>
          <Maximize2 size={12} color="#000" />
        </button>
      </div>
    </div>
  );
};

export const _dragCtx = { onAction: (e, i, f, t) => {}, allPositions: [] };

export function renderSlide(slide, index, selectedTheme, brandHandle, brandCategory, brandProfileImage, brandLogoImage, imagePositions, titleScale, contentScale, slideAspectRatio, onAction, positions) {
  const isDarkOrange = selectedTheme === "dark_orange";
  const isDarkRed = selectedTheme === "dark_red";
  const isWhiteRed = selectedTheme === "white_red";
  const isYellowBlack = selectedTheme === "yellow_black";
  const isBlackEditorial = selectedTheme === "black_editorial";

  const accentColor = isDarkOrange ? "#f97316" : (isDarkRed || isWhiteRed) ? "#e11d48" : isYellowBlack ? "#111" : "#f97316";
  const bgColor = isDarkOrange ? "#1e1e1e" : isDarkRed ? "#0a0a0a" : isWhiteRed ? "#fff" : isYellowBlack ? "#f5c800" : "#0a0a0a";
  const textColor = (isWhiteRed || isYellowBlack) ? "#111" : "#fff";

  const renderLayout = () => {
    const layout = slide.layout;
    const pos = positions || {};

    if (layout === "capa") {
      return (
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", padding: 40, textAlign: "center", gap: 20 }}>
          {slide.imageUrl && <img src={slide.imageUrl} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.3, zIndex: 0 }} />}
          <div style={{ zIndex: 1 }}>
            <SmartEl field="titulo" index={index} pos={pos.titulo} onAction={onAction}>
              <h1 style={{ fontFamily: "'Bebas Neue', Arial Black, sans-serif", fontSize: 60 * (titleScale/100), lineHeight: 1, letterSpacing: "0.02em", color: accentColor, textTransform: "uppercase" }}>
                {slide.titulo}
              </h1>
            </SmartEl>
            <SmartEl field="texto_apoio" index={index} pos={pos.texto_apoio} onAction={onAction}>
              <p style={{ fontSize: 24 * (contentScale/100), marginTop: 15, opacity: 0.9 }}>{slide.texto_apoio}</p>
            </SmartEl>
          </div>
        </div>
      );
    }

    if (layout === "texto_imagem") {
      return (
        <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: 30, gap: 20 }}>
          <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 40 * (titleScale/100), color: accentColor }}>{slide.titulo}</h2>
          <div style={{ flex: 1, position: "relative", borderRadius: 12, overflow: "hidden", background: "#000" }}>
            {slide.imageUrl && <img src={slide.imageUrl} style={{ width: "100%", height: "100%", objectFit: "cover", transform: `translateY(${(imagePositions[index] - 50) * 0.5}%)` }} />}
          </div>
          <p style={{ fontSize: 20 * (contentScale/100) }}>{slide.texto_apoio}</p>
        </div>
      );
    }

    if (layout === "so_texto") {
      return (
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", padding: 50, gap: 20 }}>
          <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 45 * (titleScale/100), color: accentColor }}>{slide.titulo}</h2>
          <div style={{ width: 40, height: 4, background: accentColor }} />
          <p style={{ fontSize: 26 * (contentScale/100), lineHeight: 1.4 }}>{slide.texto_apoio}</p>
        </div>
      );
    }

    if (layout === "impacto") {
      return (
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: 40, background: accentColor, color: (isYellowBlack ? "#000" : "#fff"), textAlign: "center" }}>
          <Quote size={60} opacity={0.2} style={{ marginBottom: 20 }} />
          <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 55 * (titleScale/100), lineHeight: 1.1 }}>{slide.titulo}</h2>
          <p style={{ fontSize: 22 * (contentScale/100), marginTop: 20, fontWeight: 700 }}>{slide.texto_apoio}</p>
        </div>
      );
    }

    if (layout.startsWith("microblog_")) {
      return renderMicroblog(slide, index, accentColor, titleScale, contentScale);
    }

    // Default fallback
    return (
      <div style={{ padding: 40 }}>
        <h2>{slide.titulo}</h2>
        <p>{slide.texto_apoio}</p>
      </div>
    );
  };

  const renderMicroblog = (slide, index, accentColor, titleScale, contentScale) => {
    if (slide.layout === "microblog_capa") {
      return (
        <div style={{ flex: 1, padding: 30, display: "flex", flexDirection: "column", gap: 15 }}>
          <div style={{ fontSize: 12, fontWeight: 900, letterSpacing: "0.2em", textTransform: "uppercase", color: accentColor }}>EXCLUSIVO</div>
          <h1 style={{ fontSize: 48 * (titleScale/100), fontWeight: 900, lineHeight: 1.1 }}>{slide.titulo}</h1>
          <p style={{ fontSize: 18 * (contentScale/100), borderLeft: `4px solid ${accentColor}`, paddingLeft: 15 }}>{slide.texto_apoio}</p>
        </div>
      );
    }
    return (
      <div style={{ flex: 1, padding: 30, display: "flex", flexDirection: "column", gap: 10 }}>
        <h3 style={{ fontSize: 24, fontWeight: 900, color: accentColor }}>{slide.titulo}</h3>
        <p style={{ fontSize: 16, lineHeight: 1.5 }}>{slide.texto_apoio}</p>
      </div>
    );
  };

  return (
    <Container bg={bgColor} color={textColor} style={{ aspectRatio: slideAspectRatio }}>
      {/* Brand Header */}
      <div style={{ padding: "15px 30px", display: "flex", alignItems: "center", justifyContent: "space-between", zIndex: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {brandProfileImage ? <img src={brandProfileImage} style={{ width: 32, height: 32, borderRadius: "50%" }} /> : <div style={{ width: 32, height: 32, borderRadius: "50%", background: accentColor }} />}
          <div>
            <div style={{ fontSize: 12, fontWeight: 900 }}>{brandHandle}</div>
            <div style={{ fontSize: 9, opacity: 0.7 }}>{brandCategory}</div>
          </div>
        </div>
        {brandLogoImage && <img src={brandLogoImage} style={{ height: 20 }} />}
      </div>

      {renderLayout()}

      {/* Footer */}
      <div style={{ padding: "20px 30px", display: "flex", alignItems: "center", justifyContent: "space-between", zIndex: 10 }}>
        <div style={{ fontSize: 14, fontWeight: 900, opacity: 0.5 }}>{slide.slide} / 10</div>
        <div style={{ display: "flex", alignItems: "center", gap: 5, color: accentColor }}>
          <span style={{ fontSize: 10, fontWeight: 900, letterSpacing: "0.1em" }}>ARRANTE PARA O LADO</span>
          <ArrowRight size={14} />
        </div>
      </div>
    </Container>
  );
}
