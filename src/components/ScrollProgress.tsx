import React, { useState, useEffect } from 'react';

export const ScrollProgress: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollPx = document.documentElement.scrollTop;
      const winHeightPx = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = scrollPx / winHeightPx;
      setScrollProgress(scrolled);
    };

    const updateActiveSection = () => {
      const sections = ['intro', 'hero', 'services', 'benefits', 'cases', 'ebook', 'lead-form'];
      const scrollY = window.scrollY;
      
      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          const elementTop = rect.top + scrollY;
          const elementHeight = rect.height;
          
          if (scrollY >= elementTop - 100 && scrollY < elementTop + elementHeight - 100) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    const handleScroll = () => {
      updateScrollProgress();
      updateActiveSection();
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Barra de progresso fixa no topo */}
      <div 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '3px',
          background: 'rgba(255, 255, 255, 0.1)',
          zIndex: 9998,
          pointerEvents: 'none'
        }}
      >
        <div 
          style={{
            height: '100%',
            background: 'linear-gradient(90deg, #1E90FF, #00BFFF, #87CEEB)',
            width: `${scrollProgress * 100}%`,
            transition: 'width 0.1s ease-out',
            boxShadow: '0 0 10px rgba(30, 144, 255, 0.5)'
          }}
        />
      </div>

      {/* Navegação lateral com indicadores */}
      <nav 
        style={{
          position: 'fixed',
          right: '20px',
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 1000,
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          background: 'rgba(0, 0, 0, 0.3)',
          backdropFilter: 'blur(10px)',
          padding: '1rem 0.5rem',
          borderRadius: '25px',
          border: '1px solid rgba(255, 255, 255, 0.1)'
        }}
      >
        {[
          { id: 'intro', label: 'Início', icon: '🏠' },
          { id: 'hero', label: 'Hero', icon: '🚀' },
          { id: 'services', label: 'Serviços', icon: '⚡' },
          { id: 'benefits', label: 'Benefícios', icon: '💎' },
          { id: 'cases', label: 'Cases', icon: '🏆' },
          { id: 'ebook', label: 'E-book', icon: '📚' },
          { id: 'lead-form', label: 'Contato', icon: '📞' }
        ].map((section) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.5rem 0.75rem',
              borderRadius: '15px',
              textDecoration: 'none',
              color: activeSection === section.id ? '#87CEEB' : 'rgba(255, 255, 255, 0.6)',
              background: activeSection === section.id ? 'rgba(135, 206, 235, 0.1)' : 'transparent',
              fontSize: '0.8rem',
              fontWeight: '500',
              transition: 'all 0.3s ease',
              border: activeSection === section.id ? '1px solid rgba(135, 206, 235, 0.3)' : '1px solid transparent',
              minWidth: '40px',
              justifyContent: 'center'
            }}
            title={section.label}
            onClick={(e) => {
              e.preventDefault();
              const element = document.getElementById(section.id);
              if (element) {
                element.scrollIntoView({ 
                  behavior: 'smooth',
                  block: 'start'
                });
              }
            }}
          >
            <span style={{ fontSize: '1rem' }}>{section.icon}</span>
            <span 
              style={{
                opacity: activeSection === section.id ? 1 : 0,
                transform: activeSection === section.id ? 'translateX(0)' : 'translateX(-10px)',
                transition: 'all 0.3s ease',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                maxWidth: activeSection === section.id ? '100px' : '0',
              }}
            >
              {section.label}
            </span>
          </a>
        ))}
      </nav>

      {/* Scroll to top button */}
      {scrollProgress > 0.3 && (
        <button
          onClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          style={{
            position: 'fixed',
            bottom: '80px',
            right: '20px',
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #1E90FF, #00BFFF)',
            border: 'none',
            color: 'white',
            fontSize: '1.2rem',
            cursor: 'pointer',
            zIndex: 1000,
            boxShadow: '0 4px 20px rgba(30, 144, 255, 0.3)',
            transition: 'all 0.3s ease',
            animation: 'fadeInUp 0.3s ease-out'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
          }}
          title="Voltar ao topo"
        >
          ↑
        </button>
      )}

      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          /* Hide nav on mobile */
          @media (max-width: 768px) {
            nav {
              display: none !important;
            }
          }
        `
      }} />
    </>
  );
};
