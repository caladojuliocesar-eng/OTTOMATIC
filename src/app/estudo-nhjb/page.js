import React from 'react';

export const metadata = {
  title: "Raio-X: O Futuro da Operação Digital | OttoMatic",
  robots: {
    index: false,
    follow: false,
  },
};

export default function RelatorioPage() {
  return (
    <div className="relatorio-page-container pt-20">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
      <style dangerouslySetInnerHTML={{ __html: `
        /* --- OTTOMATIC BRANDING --- */
        .relatorio-page-container {
            --bg-surface: #0e1526;
            --border-color: #1e293b;
            --text-main: #ffffff;
            --text-muted: #94a3b8;
            --accent-cyan: #00d2ff;
            --accent-orange: #ff6a4d;
            
            color: var(--text-main);
            font-family: 'Inter', sans-serif;
            line-height: 1.6;
        }

        .relatorio-page-container h1, .relatorio-page-container h2, .relatorio-page-container h3 { line-height: 1.2; font-weight: 700; color: #fff; }
        .relatorio-page-container .text-cyan { color: var(--accent-cyan); }
        .relatorio-page-container .text-orange { color: var(--accent-orange); }
        .relatorio-page-container p { color: var(--text-muted); font-size: 1.125rem; }

        .relatorio-page-container .container-custom { max-width: 1200px; margin: 0 auto; padding: 0 24px; }
        .relatorio-page-container section { padding: 100px 0; display: flex; align-items: center; }

        /* --- HERO --- */
        .relatorio-page-container .hero { text-align: center; flex-direction: column; justify-content: center; padding-top: 100px; padding-bottom: 80px; min-height: unset;}
        .relatorio-page-container .tagline { color: var(--accent-cyan); font-weight: 600; letter-spacing: 2px; text-transform: uppercase; font-size: 0.875rem; margin-bottom: 24px; display: inline-block; border: 1px solid rgba(0, 210, 255, 0.3); padding: 6px 16px; border-radius: 20px; background: rgba(0, 210, 255, 0.05);}
        .relatorio-page-container .hero h1 { font-size: 4.5rem; margin-bottom: 24px; max-width: 900px; margin-inline: auto; letter-spacing: -1.5px;}
        .relatorio-page-container .hero p { font-size: 1.35rem; max-width: 700px; margin: 0 auto 50px auto; }

        /* --- GRIDS --- */
        .relatorio-page-container .split-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; }
        @media (max-width: 960px) { .relatorio-page-container .split-grid { grid-template-columns: 1fr; gap: 40px;} }

        /* --- STATS CARDS --- */
        .relatorio-page-container .stat-box {
            background: var(--bg-surface);
            border: 1px solid var(--border-color);
            border-radius: 20px;
            padding: 50px;
            text-align: center;
            box-shadow: 0 20px 40px rgba(0,0,0,0.4);
            position: relative;
            overflow: hidden;
        }
        .relatorio-page-container .stat-box::before {
            content: ''; position: absolute; top: 0; left: 0; width: 100%; height: 4px;
            background: var(--accent-orange);
        }
        .relatorio-page-container .stat-box.cyan-line::before { background: var(--accent-cyan); }
        
        .relatorio-page-container .stat-box .number { font-size: 6.5rem; font-weight: 800; color: var(--text-main); line-height: 1; margin-bottom: 10px; letter-spacing: -2px;}
        .relatorio-page-container .stat-box .label { font-size: 1.25rem; color: var(--text-muted); font-weight: 500; }

        /* --- INFO BLOCKS --- */
        .relatorio-page-container .info-block h2 { font-size: 3rem; margin-bottom: 24px; letter-spacing: -1px;}
        .relatorio-page-container .info-block p { margin-bottom: 20px; }
        .relatorio-page-container .alert-box {
            background: rgba(255, 106, 77, 0.05);
            border-left: 4px solid var(--accent-orange);
            padding: 20px;
            border-radius: 0 8px 8px 0;
            margin-top: 30px;
        }
        .relatorio-page-container .alert-box p { color: var(--text-main); margin: 0; font-size: 1rem; font-weight: 500;}

        /* --- INSIGHTS GRID --- */
        .relatorio-page-container .insights-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 30px; margin-top: 60px; }
        .relatorio-page-container .insight-card { background: var(--bg-surface); border: 1px solid var(--border-color); border-radius: 16px; padding: 40px; }
        .relatorio-page-container .insight-card i { font-size: 2.5rem; color: var(--accent-cyan); margin-bottom: 24px; }
        .relatorio-page-container .insight-card h3 { font-size: 1.5rem; margin-bottom: 16px; color: #fff;}

        /* --- SIGNATURE SECTION --- */
        .relatorio-page-container .signature-section { text-align: center; background: radial-gradient(circle at top, var(--bg-surface) 0%, transparent 100%); border-top: 1px solid var(--border-color); padding: 120px 0;}
        .relatorio-page-container .signature-box { max-width: 600px; margin: 0 auto; text-align: left; padding: 40px; background: rgba(14, 21, 38, 0.5); border-radius: 16px; border: 1px solid rgba(255,255,255,0.05);}

        /* --- ANIMATIONS --- */
        .fade-up { opacity: 0; transform: translateY(30px); transition: opacity 0.8s ease-out, transform 0.8s ease-out; }
        .fade-up.visible { opacity: 1; transform: translateY(0); }

        @media (max-width: 768px) {
            .relatorio-page-container .hero h1 { font-size: 2.8rem; }
            .relatorio-page-container section { padding: 60px 0; }
            .relatorio-page-container .stat-box .number { font-size: 4.5rem; }
            .relatorio-page-container .info-block h2 { font-size: 2.2rem; }
        }
      `}} />

      <section className="hero container-custom">
          <div className="fade-up visible">
              <div className="tagline">Análise de Ecossistema Local</div>
              <h1>O Peso de <span className="text-cyan">Fazer Tudo Sozinho</span></h1>
              <p>Ouvimos os empreendedores e profissionais do nosso condomínio (NHJB) para entender onde estamos perdendo a nossa energia diária e como podemos simplificar a rotina.</p>
          </div>
      </section>

      <section id="diagnostico" style={{ background: 'rgba(14, 21, 38, 0.3)' }}>
          <div className="container-custom split-grid">
              <div className="info-block fade-up visible">
                  <div className="tagline" style={{ color: 'var(--accent-orange)', borderColor: 'rgba(255, 106, 77, 0.3)', background: 'rgba(255, 106, 77, 0.05)' }}>O Custo da Gestão</div>
                  <h2>O Segundo Turno <span className="text-orange">Invisível</span></h2>
                  <p>Nós somos excelentes no que fazemos — seja na terapia, na culinária ou na consultoria. Mas a pesquisa mostrou que estamos exaustos por acumular funções que não são a nossa especialidade.</p>
                  <p>Gastar horas pensando em conteúdo para o Instagram ou respondendo perguntas repetitivas no WhatsApp não é falta de gestão, é a consequência de não termos um sistema nos apoiando.</p>
                  <div className="alert-box">
                      <p><i className="fa-solid fa-lightbulb" style={{ color: 'var(--accent-orange)', marginRight: '8px' }}></i> <strong>Constatação:</strong> Todo mundo no ecossistema está trabalhando muito, mas sentindo que o tempo rende pouco.</p>
                  </div>
              </div>
              <div className="fade-up visible">
                  <div className="stat-box">
                      <div className="number text-orange">&gt;70%</div>
                      <div className="label">Dos vizinhos apontam a criação de conteúdo e o atendimento (WhatsApp) como os maiores sugadores de energia da rotina.</div>
                  </div>
              </div>
          </div>
      </section>

      <section>
          <div className="container-custom split-grid">
              <div className="fade-up visible" style={{ order: 2 }}>
                  <div className="stat-box cyan-line">
                      <div className="number text-cyan">33%</div>
                      <div className="label">Dos serviços ainda são apresentados aos clientes via textos e &quot;fotos soltas&quot; no WhatsApp.</div>
                  </div>
              </div>
              <div className="info-block fade-up visible" style={{ order: 1 }}>
                  <div className="tagline">A Experiência do Cliente</div>
                  <h2>O Atrito na <span className="text-cyan">Hora de Vender</span></h2>
                  <p>Você sabe que o seu serviço tem qualidade, mas como o cliente te enxerga no primeiro contato?</p>
                  <p>Enviar fotos soltas e áudios longos no WhatsApp pode deixar o cliente confuso ou inseguro. Quando organizamos nossa vitrine digital (mesmo que seja apenas uma página simples com o nosso portfólio), nós facilitamos a vida de quem quer comprar e valorizamos instantaneamente o nosso trabalho.</p>
              </div>
          </div>
      </section>

      <section style={{ background: 'rgba(14, 21, 38, 0.3)', display: 'block' }}>
          <div className="container-custom">
              <div className="fade-up visible" style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto', marginBottom: '20px' }}>
                  <div className="tagline" style={{ color: 'var(--accent-cyan)', borderColor: 'rgba(0, 210, 255, 0.3)', background: 'rgba(0, 210, 255, 0.05)' }}>A Ilusão da Ferramenta</div>
                  <h2>Eficiência vs. <span className="text-cyan">Eficácia</span></h2>
                  <p style={{ marginTop: '20px' }}>Notamos um dado paradoxal: <strong>quase 80% dos respondentes relataram que já utilizam o ChatGPT</strong> ou IAs similares. No entanto, são as mesmas pessoas que relatam sobrecarga extrema.</p>
                  <p style={{ marginTop: '15px' }}>A reflexão que fica é: estamos usando a IA para gerar resultados ou apenas para fazer o trabalho braçal de um jeito mais rápido? Pedir para a IA escrever uma legenda avulsa é <em>eficiência</em>. Ter um sistema configurado que explica o seu serviço e filtra curiosos no piloto automático é <em>eficácia</em>.</p>
              </div>

              <div className="insights-grid">
                  <div className="insight-card fade-up visible" style={{ transitionDelay: '0.1s' }}>
                      <i className="fa-solid fa-wand-magic-sparkles"></i>
                      <h3>Automação de Conteúdo</h3>
                      <p>Imagine ter os posts do mês pensados por uma IA para você apenas aprovar, eliminando o bloqueio criativo de encarar a tela em branco.</p>
                  </div>
                  <div className="insight-card fade-up visible" style={{ transitionDelay: '0.2s' }}>
                      <i className="fa-solid fa-globe"></i>
                      <h3>Vitrine Organizada</h3>
                      <p>Substituir os PDFs e fotos do celular por uma página rápida que explica o seu serviço e quebra objeções enquanto você atende outro cliente.</p>
                  </div>
                  <div className="insight-card fade-up visible" style={{ transitionDelay: '0.3s' }}>
                      <i className="fa-solid fa-filter"></i>
                      <h3>Filtro de Atendimento</h3>
                      <p>Sistemas simples que tiram as dúvidas básicas e só deixam chegar no seu WhatsApp o cliente que já está pronto para agendar ou comprar.</p>
                  </div>
              </div>
          </div>
      </section>

      <section className="signature-section">
          <div className="container-custom fade-up visible">
              <h2 style={{ fontSize: '2.5rem', marginBottom: '24px', color: 'var(--text-muted)', fontWeight: 500 }}>Próximos Passos</h2>
              
              <div className="signature-box">
                  <p style={{ marginBottom: '20px' }}>A tecnologia hoje não é mais um bicho de sete cabeças ou um luxo de grandes corporações. Ela existe para que empreendedores reais, como nós aqui do condomínio, possamos voltar a focar no que realmente importa: <strong>o nosso talento e a nossa vida.</strong></p>
                  <p style={{ marginBottom: '30px' }}>O diagnóstico está feito. Agora é hora de simplificar.</p>
                  
                  <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '20px' }}>
                      <p style={{ color: '#fff', fontWeight: 600, margin: 0, fontSize: '1.25rem' }}>Julio Calado</p>
                      <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--accent-cyan)' }}>Ottomatic | Sistemas Inteligentes</p>
                  </div>
              </div>
          </div>
      </section>
    </div>
  );
}
