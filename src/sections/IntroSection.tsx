import React from 'react';
import { ScrollReveal } from '../components/ScrollReveal';

export const IntroSection: React.FC = () => {
  return (
    <section 
      id="intro"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Elementos de fundo animados */}
      <div 
        style={{
          position: 'absolute',
          top: '20%',
          left: '10%',
          width: '200px',
          height: '200px',
          background: 'linear-gradient(45deg, rgba(30, 144, 255, 0.1), rgba(135, 206, 235, 0.1))',
          borderRadius: '50%',
          filter: 'blur(40px)',
          animation: 'float 6s ease-in-out infinite'
        }}
      />
      <div 
        style={{
          position: 'absolute',
          bottom: '30%',
          right: '15%',
          width: '150px',
          height: '150px',
          background: 'linear-gradient(45deg, rgba(255, 107, 107, 0.1), rgba(238, 90, 36, 0.1))',
          borderRadius: '50%',
          filter: 'blur(30px)',
          animation: 'float 8s ease-in-out infinite reverse'
        }}
      />

      <div 
        style={{
          textAlign: 'center',
          maxWidth: '600px',
          zIndex: 1
        }}
      >
        {/* Logo com animação */}
        <ScrollReveal animation="scaleIn" delay={200}>
          <div 
            style={{
              marginBottom: '3rem',
              position: 'relative'
            }}
          >
            <img 
              src="/assets/images/logo_prompts360.png" 
              alt="Prompts360" 
              style={{
                maxWidth: '280px',
                width: '100%',
                height: 'auto',
                filter: 'drop-shadow(0 8px 32px rgba(30, 144, 255, 0.3))'
              }}
            />
            {/* Glow effect */}
            <div 
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '300px',
                height: '100px',
                background: 'linear-gradient(45deg, rgba(30, 144, 255, 0.2), rgba(135, 206, 235, 0.2))',
                borderRadius: '50%',
                filter: 'blur(20px)',
                zIndex: -1,
                animation: 'pulse 3s ease-in-out infinite'
              }}
            />
          </div>
        </ScrollReveal>

        {/* Texto principal */}
        <ScrollReveal animation="fadeInUp" delay={500}>
          <h1 
            style={{
              fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
              fontWeight: '700',
              color: 'white',
              marginBottom: '1.5rem',
              lineHeight: '1.2'
            }}
          >
            Transforme seu Negócio com{' '}
            <span 
              style={{
                background: 'linear-gradient(45deg, #1E90FF, #87CEEB)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent'
              }}
            >
              Inteligência Artificial
            </span>
          </h1>
        </ScrollReveal>

        <ScrollReveal animation="fadeInUp" delay={700}>
          <p 
            style={{
              fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
              color: 'rgba(255, 255, 255, 0.8)',
              marginBottom: '3rem',
              lineHeight: '1.6'
            }}
          >
            Automatizamos processos em <strong>Clínicas</strong>, <strong>Escolas</strong> e <strong>Escritórios Jurídicos</strong><br />
            para aumentar sua eficiência e lucro em até <strong>300%</strong>
          </p>
        </ScrollReveal>

        {/* Scroll indicator */}
        <ScrollReveal animation="fadeIn" delay={1000}>
          <div 
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1rem',
              marginTop: '2rem'
            }}
          >
            <span 
              style={{
                color: 'rgba(255, 255, 255, 0.6)',
                fontSize: '0.9rem',
                fontWeight: '500'
              }}
            >
              Descubra como podemos ajudar
            </span>
            <div 
              style={{
                width: '2px',
                height: '30px',
                background: 'linear-gradient(to bottom, #1E90FF, transparent)',
                borderRadius: '1px',
                animation: 'scrollIndicator 2s ease-in-out infinite'
              }}
            />
            <div 
              style={{
                fontSize: '1.5rem',
                animation: 'bounce 2s ease-in-out infinite'
              }}
            >
              ↓
            </div>
          </div>
        </ScrollReveal>
      </div>

      {/* Estilos das animações */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            33% { transform: translateY(-20px) rotate(1deg); }
            66% { transform: translateY(-10px) rotate(-1deg); }
          }
          
          @keyframes pulse {
            0%, 100% { opacity: 0.3; transform: translate(-50%, -50%) scale(1); }
            50% { opacity: 0.5; transform: translate(-50%, -50%) scale(1.1); }
          }
          
          @keyframes scrollIndicator {
            0%, 100% { opacity: 1; transform: translateY(0); }
            50% { opacity: 0.3; transform: translateY(10px); }
          }
          
          @keyframes bounce {
            0%, 20%, 53%, 80%, 100% { transform: translateY(0); }
            40%, 43% { transform: translateY(-8px); }
            70% { transform: translateY(-4px); }
            90% { transform: translateY(-2px); }
          }
        `
      }} />
    </section>
  );
};
