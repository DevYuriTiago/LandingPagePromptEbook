import React from 'react';

export const CasesSection: React.FC = () => {
  return (
    <section id="cases-section" className="cases-section">
      <div className="container">
        <div className="section-header">
          <h2>Cases de Sucesso</h2>
          <p>Conheça alguns resultados reais de nossos clientes</p>
        </div>
        
        <div className="cases-grid">
          <div className="case-item">
            <div className="case-video">
              <video 
                src="/assets/video/cases/case1.mp4" 
                poster="/assets/images/cases/case1-poster.jpg"
                controls
                preload="metadata"
              >
                Seu navegador não suporta vídeos.
              </video>
            </div>
            <div className="case-content">
              <h3>Automação Completa</h3>
              <p>Cliente reduziu 80% do tempo em tarefas manuais com nossa solução de automação.</p>
            </div>
          </div>

          <div className="case-item">
            <div className="case-video">
              <video 
                src="/assets/video/cases/case2.mp4" 
                poster="/assets/images/cases/case2-poster.jpg"
                controls
                preload="metadata"
              >
                Seu navegador não suporta vídeos.
              </video>
            </div>
            <div className="case-content">
              <h3>Crescimento de Vendas</h3>
              <p>Aumento de 300% nas conversões com funis otimizados e IA integrada.</p>
            </div>
          </div>

          <div className="case-item">
            <div className="case-video">
              <video 
                src="/assets/video/cases/case3.mp4" 
                poster="/assets/images/cases/case3-poster.jpg"
                controls
                preload="metadata"
              >
                Seu navegador não suporta vídeos.
              </video>
            </div>
            <div className="case-content">
              <h3>Modernização Digital</h3>
              <p>Transformação completa da operação com tecnologia de ponta.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
