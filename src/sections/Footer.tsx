import React from 'react';
import { ScrollReveal } from '../components/ScrollReveal';

export const Footer: React.FC = () => {
  return (
    <footer className="footer" id="footer" style={{ background: '#1a1a1a', color: 'white', padding: '3rem 0 2rem' }}>
      <div className="container">
        <div 
          className="footer-content"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '2rem',
            marginBottom: '2rem'
          }}
        >
          <div className="footer-section">
            <img 
              src="/assets/images/logo_prompts360.png" 
              alt="Prompts360 Logo" 
              className="logo mb-2"
              style={{
                maxWidth: '150px',
                marginBottom: '1rem'
              }}
              loading="lazy" 
            />
            <p style={{ fontSize: '0.9rem', lineHeight: '1.6', opacity: 0.8 }}>
              Modernizamos Clínicas, Escolas e Escritórios Jurídicos com IA, Automação e Tecnologia para gerar mais lucro e eficiência.
            </p>
          </div>
          
          <div className="footer-section">
            <h4 style={{ fontSize: '1.1rem', marginBottom: '1rem', fontWeight: '600' }}>Soluções por Setor</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <a href="#services" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.3s ease' }}>
                Automação para Clínicas
              </a>
              <a href="#services" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.3s ease' }}>
                Tecnologia para Educação
              </a>
              <a href="#services" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.3s ease' }}>
                Automação Jurídica
              </a>
              <a href="#services" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.3s ease' }}>
                Marketing Digital Inteligente
              </a>
              <a href="#services" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.3s ease' }}>
                Chatbots & Assistentes
              </a>
              <a href="#services" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.3s ease' }}>
                Automação de Processos
              </a>
              <a href="#services" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.3s ease' }}>
                Analytics & BI
              </a>
            </div>
          </div>
          
          <div className="footer-section">
            <h4 style={{ fontSize: '1.1rem', marginBottom: '1rem', fontWeight: '600' }}>Empresa</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <a href="#benefits" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.3s ease' }}>
                Sobre Nós
              </a>
              <a href="#cases-section" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.3s ease' }}>
                Cases de Sucesso
              </a>
              <a href="#footer" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.3s ease' }}>
                Contato
              </a>
              <a href="#lead-form" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.3s ease' }}>
                Diagnóstico Gratuito
              </a>
            </div>
          </div>
          
          <div className="footer-section">
            <h4 style={{ fontSize: '1.1rem', marginBottom: '1rem', fontWeight: '600' }}>Contato</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <p style={{ fontSize: '0.9rem', margin: 0, opacity: 0.8 }}>
                <strong>Email:</strong> contato@prompts360.com
              </p>
              <p style={{ fontSize: '0.9rem', margin: 0, opacity: 0.8 }}>
                <strong>Telefone:</strong> (81) 97100-9601
              </p>
              <p style={{ fontSize: '0.9rem', margin: 0, opacity: 0.8 }}>
                <strong>Local:</strong> Recife, Brasil
              </p>
            </div>
          </div>
        </div>
        
        <div 
          className="footer-bottom"
          style={{
            borderTop: '1px solid rgba(255,255,255,0.1)',
            paddingTop: '1.5rem',
            textAlign: 'center'
          }}
        >
          <p style={{ margin: 0, fontSize: '0.9rem', opacity: 0.6 }}>
            &copy; 2024 Prompts360. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};
