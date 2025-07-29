import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/Button'
import './styles/index.css'

function App() {
  const [loading, setLoading] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => setLoading(false), 500)
          return 100
        }
        return prev + Math.random() * 10
      })
    }, 100)

    return () => clearInterval(interval)
  }, [])

  if (loading) {
    return (
      <div id="loading-screen" className="loading-screen">
        <div className="loading-container">
          <div className="loading-logo">
            <img src="/img/loading.png" alt="Prompts360 Loading" className="loading-image" />
          </div>
          <div className="loading-text">
            <h2>Prompts360</h2>
            <p>Carregando experiência inteligente...</p>
          </div>
          <div className="progress-container">
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${progress}%` }}></div>
            </div>
            <div className="progress-text">
              <span>{Math.round(progress)}%</span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div id="main-content" className="main-content">
      {/* Linha de Conexão Parallax */}
      <div className="connection-line"></div>

      {/* Seção Inicial com Logo */}
      <section className="intro-section">
        <img src="/logo_prompts360.png" alt="Prompts360 Logo" className="intro-logo" />
        <div className="scroll-indicator">
          <span className="scroll-text">Role para descobrir</span>
          <div className="scroll-arrow"></div>
        </div>
      </section>

      {/* Header */}
      <header className="header" id="header">
        <div className="container">
          <nav className="navbar">
            <img src="/logo_prompts360.png" alt="Prompts360 Logo" className="logo" />
            <ul className="nav-menu">
              <li><a href="#services" className="nav-link">Serviços</a></li>
              <li><a href="#benefits" className="nav-link">Benefícios</a></li>
              <li><a href="#cases-section" className="nav-link">Cases</a></li>
              <li><a href="#footer" className="nav-link">Contato</a></li>
            </ul>
            <a href="#lead-form" className="nav-cta">Diagnóstico Gratuito</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero cinematic-hero">
        {/* Video Background */}
        <div className="hero-video-background">
          <video className="hero-background-video" autoPlay muted loop playsInline>
            <source src="/video/backgrounds/video_back.mp4" type="video/mp4" />
          </video>
          <div className="hero-video-overlay"></div>
        </div>
        
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              {/* Aurora Text Effect */}
              <h1 className="aurora-title">
                <span className="aurora-text" data-text="Aceleradora Digital para Pequenos Negócios">
                  Aceleradora Digital para Pequenos Negócios
                </span>
                <br />
                <span className="aurora-text morphing-text" data-text="e Microinfluenciadores com Mentalidade de Crescimento">
                  e Microinfluenciadores com Mentalidade de Crescimento
                </span>
              </h1>
              
              {/* Animated Gradient Text */}
              <p className="hero-subtitle animated-gradient-text">
                <strong>Nosso trabalho é transformar pequenos negócios em grandes estruturas</strong>, com tecnologia, IA e marketing inteligente. Focamos em <strong>microempresas e microinfluenciadores que têm visão de crescimento</strong> e querem estrutura para jogar grande. Se você quer se manter pequeno, essa proposta não é para você.
              </p>
              
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
              
              <a href="#lead-form" className="cta-button rainbow-button">
                Quero Acelerar Meu Negócio Agora
              </a>
            </div>
            
            <div className="hero-visual">
              {/* 3D CSS Scene */}
              <div className="css-3d-scene">
                <div className="floating-elements">
                  <div className="cube cube-1">
                    <div className="face front">IA</div>
                    <div className="face back">AI</div>
                    <div className="face right">🤖</div>
                    <div className="face left">💡</div>
                    <div className="face top">⚡</div>
                    <div className="face bottom">🚀</div>
                  </div>
                  <div className="cube cube-2">
                    <div className="face front">WEB</div>
                    <div className="face back">SITE</div>
                    <div className="face right">🌐</div>
                    <div className="face left">💻</div>
                    <div className="face top">📱</div>
                    <div className="face bottom">⭐</div>
                  </div>
                  <div className="cube cube-3">
                    <div className="face front">ROI</div>
                    <div className="face back">300%</div>
                    <div className="face right">📈</div>
                    <div className="face left">💰</div>
                    <div className="face top">🎯</div>
                    <div className="face bottom">✨</div>
                  </div>
                  <div className="sphere sphere-1"></div>
                  <div className="sphere sphere-2"></div>
                  <div className="sphere sphere-3"></div>
                </div>
                <div className="scene-overlay"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section cinematic-section" id="services">
        <div className="section-connector"></div>
        <div className="container">
          <div className="section-header">
            <h2 className="section-title text-reveal">Como Aceleramos Pequenos Negócios e Microinfluenciadores</h2>
            <p className="section-subtitle hyper-text">Soluções de IA, Automação e Marketing Digital personalizadas para transformar pequenos negócios em grandes estruturas</p>
          </div>
          
          <div className="marquee-container services-marquee">
            <div className="marquee-track pause-on-hover">
              <div className="service-card">
                <div className="service-icon aurora-text">🏗️</div>
                <h3 className="service-title animated-shiny-text">Estrutura Digital Completa</h3>
                <p className="service-description">Sites, Sistemas e Plataformas para negócios modernos. Crie a base sólida que seu negócio precisa para crescer com websites profissionais e sistemas sob medida.</p>
                <ul className="service-features">
                  <li>Websites profissionais responsivos</li>
                  <li>Sistemas internos personalizados</li>
                  <li>Plataformas de vendas integradas</li>
                  <li>Integrações com ferramentas existentes</li>
                </ul>
              </div>
              
              <div className="service-card">
                <div className="service-icon aurora-text">🤖</div>
                <h3 className="service-title animated-shiny-text">IA e Automação para Ganhar Escala</h3>
                <p className="service-description">Automatize vendas, processos e atendimento com inteligência artificial. Chatbots, funis inteligentes e automação que trabalha por você 24/7.</p>
                <ul className="service-features">
                  <li>IA para vendas e atendimento</li>
                  <li>Chatbots inteligentes</li>
                  <li>Automações de processos</li>
                  <li>Inteligência comercial avançada</li>
                </ul>
              </div>
              
              <div className="service-card">
                <div className="service-icon aurora-text">📊</div>
                <h3 className="service-title animated-shiny-text">Otimização de Vendas & Performance</h3>
                <p className="service-description">Estratégias de conversão, funis de vendas e otimização de performance. Aumente suas vendas com dados e estratégias baseadas em resultados.</p>
                <ul className="service-features">
                  <li>Funis de vendas otimizados</li>
                  <li>Análise de performance avançada</li>
                  <li>Estratégias de conversão</li>
                  <li>Testes A/B e otimização</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="section" id="benefits">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Por Que Escolher a Prompts360</h2>
            <p className="section-subtitle">Resultados comprovados que transformam pequenos negócios em grandes estruturas</p>
          </div>
          
          <div className="benefits-grid">
            <div className="benefit-card">
              <div className="benefit-icon">📈</div>
              <h3>ROI Médio de 300%</h3>
              <p>Retorno comprovado em 90 dias com estratégias personalizadas</p>
            </div>
            
            <div className="benefit-card">
              <div className="benefit-icon">⚡</div>
              <h3>Redução de 60% nos Custos</h3>
              <p>Automação inteligente que reduz custos operacionais significativamente</p>
            </div>
            
            <div className="benefit-card">
              <div className="benefit-icon">🎯</div>
              <h3>Aumento de 45% nas Vendas</h3>
              <p>Estratégias de conversão que aumentam receita mensal consistentemente</p>
            </div>
            
            <div className="benefit-card">
              <div className="benefit-icon">🤖</div>
              <h3>IA Personalizada</h3>
              <p>Soluções de inteligência artificial adaptadas ao seu negócio</p>
            </div>
            
            <div className="benefit-card">
              <div className="benefit-icon">🚀</div>
              <h3>Crescimento Acelerado</h3>
              <p>Estrutura para escalar seu negócio rapidamente</p>
            </div>
            
            <div className="benefit-card">
              <div className="benefit-icon">📱</div>
              <h3>Presença Digital</h3>
              <p>Websites e plataformas profissionais que convertem</p>
            </div>
          </div>
        </div>
      </section>

      {/* Lead Form Section */}
      <section className="section lead-section" id="lead-form">
        <div className="container">
          <div className="lead-form-container">
            <div className="lead-form-content">
              <h2 className="lead-title">Diagnóstico Gratuito do Seu Negócio</h2>
              <p className="lead-subtitle">
                Descubra como podemos acelerar seu crescimento em uma consulta gratuita de 30 minutos
              </p>
              
              <div className="lead-benefits">
                <div className="lead-benefit">
                  <span className="check-icon">✅</span>
                  Análise completa do seu negócio atual
                </div>
                <div className="lead-benefit">
                  <span className="check-icon">✅</span>
                  Identificação de oportunidades de crescimento
                </div>
                <div className="lead-benefit">
                  <span className="check-icon">✅</span>
                  Estratégia personalizada para acelerar resultados
                </div>
              </div>
            </div>
            
            <form className="lead-form">
              <div className="form-group">
                <label htmlFor="name">Nome Completo</label>
                <input type="text" id="name" name="name" required />
              </div>
              
              <div className="form-group">
                <label htmlFor="email">E-mail</label>
                <input type="email" id="email" name="email" required />
              </div>
              
              <div className="form-group">
                <label htmlFor="phone">WhatsApp</label>
                <input type="tel" id="phone" name="phone" required />
              </div>
              
              <div className="form-group">
                <label htmlFor="business">Tipo de Negócio</label>
                <select id="business" name="business" required>
                  <option value="">Selecione...</option>
                  <option value="microinfluenciador">Microinfluenciador</option>
                  <option value="ecommerce">E-commerce</option>
                  <option value="servicos">Prestação de Serviços</option>
                  <option value="consultoria">Consultoria</option>
                  <option value="outro">Outro</option>
                </select>
              </div>
              
              <Button type="submit" className="submit-button rainbow-button">
                Quero Minha Consulta Gratuita
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer" id="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-brand">
              <img src="/logo_prompts360.png" alt="Prompts360" className="footer-logo" />
              <p>Aceleradora Digital para Pequenos Negócios e Microinfluenciadores</p>
            </div>
            
            <div className="footer-links">
              <div className="footer-column">
                <h4>Serviços</h4>
                <ul>
                  <li><a href="#services">Estrutura Digital</a></li>
                  <li><a href="#services">IA e Automação</a></li>
                  <li><a href="#services">Otimização de Vendas</a></li>
                </ul>
              </div>
              
              <div className="footer-column">
                <h4>Contato</h4>
                <ul>
                  <li><a href="#lead-form">Diagnóstico Gratuito</a></li>
                  <li><a href="mailto:contato@prompts360.com">contato@prompts360.com</a></li>
                  <li><a href="tel:+5511999999999">(11) 99999-9999</a></li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="footer-bottom">
            <p>&copy; 2024 Prompts360. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
