import React, { Suspense } from 'react';
import { isMobile, isTouchDevice } from '@/utils';
import { ScrollReveal } from '../components/ScrollReveal';

// Lazy load do componente Spline
const SimpleSpline = React.lazy(() => 
  import('@/components/ui/SimpleSpline').then(m => ({ default: m.SimpleSpline }))
);

export const HeroSection: React.FC = () => {
  return (
    <section 
      className="hero cinematic-hero" 
      style={{ 
        paddingTop: '0', 
        minHeight: '100vh',
        position: 'relative',
        display: 'flex',
        alignItems: 'center'
      }}
    >
      {/* Video Background */}
      <div className="hero-video-background">
        <video className="hero-background-video" autoPlay muted loop playsInline>
          <source src="/assets/video/backgrounds/video_back.mp4" type="video/mp4" />
        </video>
        <div className="hero-video-overlay"></div>
      </div>
      
      <div className="container">
        <div className="hero-content" style={{ position: 'relative' }}>
          {/* Spline 3D Scene - Mobile Background */}
          <div className="spline-3d-mobile-bg" style={{
            display: 'none',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 1,
            opacity: 0.4
          }}>
            <div className="spline-3d-container" style={{
              width: '100%',
              height: '100vh',
              position: 'absolute',
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
              borderRadius: '0',
              overflow: 'hidden',
              background: 'transparent',
              backdropFilter: 'none',
              border: 'none',
              transform: 'scale(1.1)',
              transformOrigin: 'center center'
            }}>
              {!isMobile() && !isTouchDevice() && (
                <Suspense fallback={null}>
                  <SimpleSpline />
                </Suspense>
              )}
              {/* Efeito de fade na parte inferior */}
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: '100%',
                height: '200px',
                background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
                pointerEvents: 'none',
                zIndex: 10
              }}></div>
            </div>
          </div>

          <div className="hero-text" style={{ position: 'relative', zIndex: 5 }}>
            {/* Aurora Text Effect */}
            <ScrollReveal animation="fadeInUp" delay={300}>
              <h1 className="aurora-title">
                <span className="aurora-text" data-text="Aceleradora Digital para Pequenos Negócios">
                  Aceleradora Digital para Pequenos Negócios
                </span>
                <br />
                <span className="aurora-text morphing-text" data-text="e Microinfluenciadores com Mentalidade de Crescimento">
                  e Microinfluenciadores com Mentalidade de Crescimento
                </span>
              </h1>
            </ScrollReveal>
            
            {/* Animated Gradient Text */}
            <ScrollReveal animation="fadeInUp" delay={600}>
              <p className="hero-subtitle animated-gradient-text">
                <strong>Nosso trabalho é transformar pequenos negócios em grandes estruturas</strong>, com tecnologia, IA e marketing inteligente. Focamos em <strong>microempresas e microinfluenciadores que têm visão de crescimento</strong> e querem estrutura para jogar grande. Se você quer se manter pequeno, essa proposta não é para você.
              </p>
            </ScrollReveal>
            
            <ScrollReveal animation="fadeInUp" delay={900}>
              <div className="hero-benefits">
                <div className="benefit-item magic-card">
                  <span className="benefit-icon sparkles-icon">💰</span>
                  <span className="shiny-text">ROI médio de 300% em 90 dias</span>
                </div>
                <div className="benefit-item">
                  <span className="benefit-icon sparkles-icon">⚡</span>
                  <span className="shiny-text">Redução de 60% nos custos operacionais</span>
                </div>
                <div className="benefit-item magic-card">
                  <span className="benefit-icon sparkles-icon">📈</span>
                  <span className="shiny-text">Aumento de 45% na receita mensal</span>
                </div>
              </div>
            </ScrollReveal>
            
            <ScrollReveal animation="fadeIn" delay={1200}>
              <div className="hero-stats">
                <div className="stat shine-border">
                  <span className="stat-number number-ticker" data-value="50">50</span>
                  <span className="stat-label">Negócios Acelerados</span>
                </div>
                <div className="stat shine-border">
                  <span className="stat-number number-ticker" data-value="300">300</span>
                  <span className="stat-label">% ROI Médio</span>
                </div>
                <div className="stat shine-border">
                  <span className="stat-number number-ticker" data-value="45">45</span>
                  <span className="stat-label">% Aumento em Vendas</span>
                </div>
              </div>
            </ScrollReveal>
            
            <ScrollReveal animation="fadeInUp" delay={1500}>
              <a href="#lead-form" className="cta-button rainbow-button">
                Quero Acelerar Meu Negócio Agora
              </a>
            </ScrollReveal>
          </div>
          
          <div className="hero-visual" style={{ position: 'relative', height: '100vh' }}>
            {/* Spline 3D Scene no lugar dos cubos */}
            <div className="spline-3d-container" style={{
              width: '100%',
              height: '100vh',
              position: 'absolute',
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
              borderRadius: '0',
              overflow: 'hidden',
              background: 'transparent',
              backdropFilter: 'none',
              border: 'none',
              transform: 'scale(1.1)',
              zIndex: -1000,
              transformOrigin: 'center center'
            }}>
              {!isMobile() && !isTouchDevice() && (
                <Suspense fallback={null}>
                  <SimpleSpline />
                </Suspense>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
