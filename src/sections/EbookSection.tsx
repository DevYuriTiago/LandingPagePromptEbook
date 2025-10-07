import React from 'react';
import { ScrollReveal } from '../components/ScrollReveal';

export const EbookSection: React.FC = () => {
  return (
    <section 
      className="section ebook-cta-section" 
      style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '4rem 0'
      }}
    >
      <div className="container">
        <div 
          className="ebook-cta-content" 
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 2fr',
            gap: '3rem',
            alignItems: 'center',
            maxWidth: '1200px',
            margin: '0 auto'
          }}
        >
          {/* Imagem do E-book */}
          <div 
            className="ebook-cta-visual" 
            style={{
              textAlign: 'center',
              position: 'relative'
            }}
          >
            <div 
              style={{
                position: 'relative',
                display: 'inline-block',
                transform: 'rotate(-5deg)',
                transition: 'transform 0.3s ease'
              }}
            >
              <img 
                src="/assets/images/foto_ebook.webp" 
                alt="E-book Guia de Prompts" 
                style={{
                  maxWidth: '280px',
                  width: '100%',
                  borderRadius: '10px',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
                  border: '3px solid rgba(255,255,255,0.2)'
                }}
                loading="lazy"
              />
              <div 
                style={{
                  position: 'absolute',
                  top: '-10px',
                  right: '-10px',
                  background: '#ff6b6b',
                  color: 'white',
                  padding: '0.5rem',
                  borderRadius: '50%',
                  fontSize: '1.2rem',
                  animation: 'pulse 2s infinite'
                }}
              >
                🔥
              </div>
            </div>
          </div>

          {/* Conteúdo do E-book */}
          <div className="ebook-cta-info">
            <div 
              style={{
                background: 'rgba(255,255,255,0.1)',
                padding: '0.5rem 1rem',
                borderRadius: '25px',
                display: 'inline-block',
                marginBottom: '1rem',
                fontSize: '0.9rem',
                fontWeight: '600'
              }}
            >
              🎁 BÔNUS EXCLUSIVO
            </div>
            
            <h2 
              style={{
                fontSize: '2.8rem',
                fontWeight: '700',
                marginBottom: '1rem',
                lineHeight: '1.2'
              }}
            >
              E-book: "Guia Definitivo de<br />
              <span 
                style={{ 
                  background: 'linear-gradient(45deg, #ffd700, #ffed4e)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  color: 'transparent'
                }}
              >
                Prompts para IA"
              </span>
            </h2>
            
            <p 
              style={{
                fontSize: '1.3rem',
                marginBottom: '2rem',
                opacity: '0.9',
                lineHeight: '1.5'
              }}
            >
              <strong>200+ prompts testados</strong> para ChatGPT, Claude, Gemini e outras IAs. 
              Organize seu negócio e aumente sua produtividade em <strong>300%</strong>!
            </p>

            {/* Features rápidas */}
            <div 
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '1rem',
                marginBottom: '2rem'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ fontSize: '1.2rem' }}>📊</span>
                <span><strong>200+</strong> Prompts Testados</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ fontSize: '1.2rem' }}>🎯</span>
                <span><strong>Por Categoria</strong> de Negócio</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ fontSize: '1.2rem' }}>⚡</span>
                <span><strong>Aplicação</strong> Imediata</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ fontSize: '1.2rem' }}>🔓</span>
                <span><strong>Acesso</strong> Vitalício</span>
              </div>
            </div>

            {/* CTAs principais */}
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <a 
                href="#lead-form" 
                style={{
                  background: '#ffd700',
                  color: '#333',
                  padding: '1rem 2rem',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  fontWeight: '700',
                  fontSize: '1.1rem',
                  boxShadow: '0 8px 25px rgba(255, 215, 0, 0.3)',
                  transition: 'all 0.3s ease',
                  display: 'inline-block'
                }}
              >
                🎁 GANHAR E-BOOK GRÁTIS + Projeto
              </a>
              
              <a 
                href="https://pay.kiwify.com.br/seu-link-ebook" 
                target="_blank" 
                rel="noreferrer" 
                style={{
                  background: 'transparent',
                  color: 'white',
                  border: '2px solid white',
                  padding: '1rem 2rem',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  fontWeight: '600',
                  fontSize: '1.1rem',
                  transition: 'all 0.3s ease',
                  display: 'inline-block'
                }}
              >
                💰 Comprar Apenas E-book - R$ 9,97
              </a>
            </div>

            <p 
              style={{
                marginTop: '1rem',
                fontSize: '0.9rem',
                opacity: '0.8'
              }}
            >
              ⏰ <strong>Promoção limitada!</strong> Preço normal: R$ 47,00
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
