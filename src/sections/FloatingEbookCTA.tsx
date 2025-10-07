import React from 'react';

interface FloatingEbookCTAProps {
  showFloatingCTA: boolean;
}

export const FloatingEbookCTA: React.FC<FloatingEbookCTAProps> = ({ showFloatingCTA }) => {
  if (!showFloatingCTA) return null;

  return (
    <div 
      className="floating-ebook-cta" 
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        background: 'linear-gradient(135deg, #ff6b6b, #ee5a24)',
        color: 'white',
        padding: '1rem 1.5rem',
        borderRadius: '15px',
        boxShadow: '0 8px 25px rgba(255, 107, 107, 0.4)',
        zIndex: 1000,
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        maxWidth: '280px',
        transform: 'scale(0.95)',
        animation: 'float 3s ease-in-out infinite'
      }}
    >
      <div 
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          marginBottom: '0.5rem'
        }}
      >
        <div 
          style={{
            width: '40px',
            height: '50px',
            background: 'url(/assets/images/foto_ebook_tiny.webp) center/cover',
            borderRadius: '4px',
            flexShrink: 0
          }}
        ></div>
        <div>
          <div 
            style={{
              fontSize: '0.9rem',
              fontWeight: '700',
              lineHeight: '1.2'
            }}
          >
            E-book Grátis 🎁
          </div>
          <div 
            style={{
              fontSize: '0.8rem',
              opacity: '0.9'
            }}
          >
            200+ Prompts de IA
          </div>
        </div>
      </div>
      
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <a 
          href="#lead-form" 
          style={{
            background: 'rgba(255,255,255,0.2)',
            color: 'white',
            padding: '0.4rem 0.8rem',
            borderRadius: '6px',
            textDecoration: 'none',
            fontSize: '0.8rem',
            fontWeight: '600',
            flex: 1,
            textAlign: 'center',
            transition: 'all 0.2s ease'
          }}
        >
          GRÁTIS
        </a>
        <a 
          href="https://pay.kiwify.com.br/seu-link-ebook" 
          target="_blank" 
          rel="noreferrer" 
          style={{
            background: 'rgba(255,255,255,0.9)',
            color: '#ff6b6b',
            padding: '0.4rem 0.8rem',
            borderRadius: '6px',
            textDecoration: 'none',
            fontSize: '0.8rem',
            fontWeight: '600',
            flex: 1,
            textAlign: 'center',
            transition: 'all 0.2s ease'
          }}
        >
          R$ 9,97
        </a>
      </div>
    </div>
  );
};
