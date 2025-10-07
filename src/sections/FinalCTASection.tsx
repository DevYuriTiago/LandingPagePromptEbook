import React from 'react';
import { ScrollReveal } from '../components/ScrollReveal';

export const FinalCTASection: React.FC = () => {
  return (
    <section 
      className="section final-cta-section" 
      style={{
        background: 'linear-gradient(135deg, #1e90ff, #8a2be2)',
        color: 'white',
        textAlign: 'center',
        padding: '4rem 0'
      }}
    >
      <div className="container">
        <h2 
          style={{
            fontSize: '2.5rem',
            marginBottom: '1rem',
            fontWeight: 700
          }}
        >
          Pronto para Transformar seu Negócio em uma Máquina de Lucro?
        </h2>
        <p 
          style={{
            fontSize: '1.2rem',
            marginBottom: '2rem',
            opacity: 0.9
          }}
        >
          Junte-se aos <strong>50+ empresas</strong> que já modernizaram com IA e aumentaram sua receita em <strong>45%</strong>
        </p>
        <div style={{ marginBottom: '2rem' }}>
          <span 
            style={{
              background: 'rgba(255,255,255,0.2)',
              padding: '0.5rem 1rem',
              borderRadius: '25px',
              margin: '0 1rem',
              display: 'inline-block'
            }}
          >
            ⚡ ROI de 300% garantido
          </span>
          <span 
            style={{
              background: 'rgba(255,255,255,0.2)',
              padding: '0.5rem 1rem',
              borderRadius: '25px',
              margin: '0 1rem',
              display: 'inline-block'
            }}
          >
            🎯 Apenas 20 vagas/mês
          </span>
          <span 
            style={{
              background: 'rgba(255,255,255,0.2)',
              padding: '0.5rem 1rem',
              borderRadius: '25px',
              margin: '0 1rem',
              display: 'inline-block'
            }}
          >
            🔒 100% Gratuito
          </span>
        </div>
        <a 
          href="#lead-form" 
          className="cta-button" 
          style={{
            background: '#fff',
            color: '#1e90ff',
            fontSize: '1.2rem',
            padding: '1rem 2rem',
            fontWeight: 700,
            boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
            textDecoration: 'none',
            borderRadius: '8px',
            display: 'inline-block'
          }}
        >
          Quero Meu Diagnóstico Gratuito Agora
        </a>
        <p 
          style={{
            marginTop: '1rem',
            fontSize: '0.9rem',
            opacity: 0.8
          }}
        >
          ⏰ <strong>Restam apenas 12 vagas este mês.</strong> Não perca esta oportunidade!
        </p>
      </div>
    </section>
  );
};
