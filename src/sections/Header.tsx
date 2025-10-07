import React, { useState, useEffect } from 'react';

interface HeaderProps {
  headerVisible: boolean;
}

export const Header: React.FC<HeaderProps> = ({ headerVisible }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <header 
      className={`header ${headerVisible ? 'visible' : ''}`} 
      id="header"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        background: headerVisible 
          ? 'rgba(10, 10, 10, 0.95)' 
          : 'transparent',
        backdropFilter: headerVisible ? 'blur(10px)' : 'none',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        padding: isScrolled ? '0.75rem 0' : '1rem 0',
        borderBottom: headerVisible && isScrolled 
          ? '1px solid rgba(255, 255, 255, 0.1)' 
          : '1px solid transparent',
        boxShadow: headerVisible && isScrolled 
          ? '0 4px 20px rgba(0, 0, 0, 0.2)' 
          : 'none'
      }}
    >
      <nav className="navbar" style={{ 
        maxWidth: '1200px', 
        margin: '0 auto', 
        padding: '0 2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div className="nav-logo" style={{ transition: 'transform 0.3s ease' }}>
          <img 
            src="/assets/images/logo_prompts360.png" 
            alt="Prompts360" 
            style={{ 
              height: isScrolled ? '35px' : '40px',
              width: 'auto',
              transition: 'height 0.3s ease',
              filter: 'drop-shadow(0 2px 10px rgba(30, 144, 255, 0.3))'
            }}
          />
        </div>
        
        {/* Desktop Navigation */}
        <div className="nav-links desktop-nav" style={{ display: 'flex' }}>
          <ul style={{
            display: 'flex',
            listStyle: 'none',
            gap: '2rem',
            margin: 0,
            padding: 0,
            alignItems: 'center'
          }}>
            {[
              { href: '#services', label: 'Serviços' },
              { href: '#benefits', label: 'Benefícios' },
              { href: '#cases-section', label: 'Cases' },
              { href: '#ebook', label: 'E-book' }
            ].map((item, index) => (
              <li key={item.href}>
                <a 
                  href={item.href} 
                  className="nav-link"
                  onClick={(e) => handleSmoothScroll(e, item.href.substring(1))}
                  style={{
                    color: 'rgba(255, 255, 255, 0.8)',
                    textDecoration: 'none',
                    fontWeight: '500',
                    fontSize: '0.95rem',
                    padding: '0.5rem 1rem',
                    borderRadius: '8px',
                    transition: 'all 0.3s ease',
                    position: 'relative',
                    animationDelay: `${index * 100}ms`
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#87CEEB';
                    e.currentTarget.style.background = 'rgba(135, 206, 235, 0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'rgba(255, 255, 255, 0.8)';
                    e.currentTarget.style.background = 'transparent';
                  }}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="nav-cta-container desktop-nav">
          <a 
            href="#lead-form" 
            className="nav-cta"
            onClick={(e) => handleSmoothScroll(e, 'lead-form')}
            style={{
              background: 'linear-gradient(135deg, #1E90FF, #00BFFF)',
              color: 'white',
              padding: '0.75rem 1.5rem',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: '600',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 15px rgba(30, 144, 255, 0.3)',
              position: 'relative',
              overflow: 'hidden'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(30, 144, 255, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 4px 15px rgba(30, 144, 255, 0.3)';
            }}
          >
            📞 Diagnóstico Gratuito
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="mobile-menu-btn"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          style={{
            display: 'none',
            background: 'rgba(255, 255, 255, 0.1)',
            border: 'none',
            color: 'white',
            fontSize: '1.5rem',
            cursor: 'pointer',
            padding: '0.5rem',
            borderRadius: '8px',
            transition: 'all 0.3s ease'
          }}
        >
          {isMobileMenuOpen ? '✕' : '☰'}
        </button>
      </nav>

      {/* Mobile Navigation */}
      <div
        className="mobile-nav"
        style={{
          display: isMobileMenuOpen ? 'block' : 'none',
          background: 'rgba(10, 10, 10, 0.98)',
          backdropFilter: 'blur(20px)',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          padding: '1rem 2rem',
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          animation: isMobileMenuOpen ? 'slideDown 0.3s ease-out' : 'none'
        }}
      >
        {[
          { href: '#services', label: 'Serviços' },
          { href: '#benefits', label: 'Benefícios' },
          { href: '#cases-section', label: 'Cases' },
          { href: '#ebook', label: 'E-book' },
          { href: '#lead-form', label: 'Diagnóstico Gratuito', isButton: true }
        ].map((item, index) => (
          <a
            key={item.href}
            href={item.href}
            onClick={(e) => handleSmoothScroll(e, item.href.substring(1))}
            style={{
              display: 'block',
              color: item.isButton ? '#1E90FF' : 'rgba(255, 255, 255, 0.8)',
              textDecoration: 'none',
              fontWeight: item.isButton ? '600' : '500',
              fontSize: '1rem',
              padding: '1rem 0',
              borderBottom: index < 4 ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
              transition: 'color 0.3s ease'
            }}
          >
            {item.isButton ? '📞 ' : ''}{item.label}
          </a>
        ))}
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes slideDown {
            from {
              opacity: 0;
              transform: translateY(-10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          /* Mobile Styles */
          @media (max-width: 768px) {
            .desktop-nav {
              display: none !important;
            }
            .mobile-menu-btn {
              display: block !important;
            }
          }

          /* Desktop Styles */
          @media (min-width: 769px) {
            .mobile-nav {
              display: none !important;
            }
          }
        `
      }} />
    </header>
  );
};
