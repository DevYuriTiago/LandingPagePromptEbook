import { useState, useEffect, lazy, Suspense } from 'react'
import { Button } from '@/components/ui/Button'
const SimpleSpline = lazy(() => import('@/components/ui/SimpleSpline').then(m => ({ default: m.SimpleSpline })))
import { isValidEmail, isValidPhone, formatPhone, isMobile, isTouchDevice } from '@/utils'
import { submitLead } from '@/utils/googleSheets'
import './styles/index.css'

function App() {
  const [loading, setLoading] = useState(true)
  const [progress, setProgress] = useState(0)
  const [mainVisible, setMainVisible] = useState(false)
  const [headerVisible, setHeaderVisible] = useState(false)
  const [showFloatingCTA, setShowFloatingCTA] = useState(false)
  const [formLoading, setFormLoading] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)
  const [formSuccess, setFormSuccess] = useState<boolean>(false)

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => {
            setLoading(false)
            setMainVisible(true) // Torna visível imediatamente após loading
          }, 500)
          return 100
        }
        return prev + Math.random() * 10
      })
    }, 100)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      if (scrollY > 50) { // Header só aparece após 50px de scroll
        setHeaderVisible(true)
      } else {
        setHeaderVisible(false) // Desaparece quando volta ao topo
      }

      // Controla a visibilidade do CTA flutuante - só aparece após a seção Hero
      if (scrollY > window.innerHeight * 0.8) { // 80% da altura da tela (final do Hero)
        setShowFloatingCTA(true)
      } else {
        setShowFloatingCTA(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [loading])

  // Lazy play/pause de vídeos dos cases
  useEffect(() => {
    const videos = Array.from(document.querySelectorAll<HTMLVideoElement>('video.lazy-video'))
    if (!('IntersectionObserver' in window) || videos.length === 0) return
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const vid = entry.target as HTMLVideoElement
        if (entry.isIntersecting) {
          // força load antes de play
          if (vid.preload === 'none') {
            vid.preload = 'metadata'
          }
          vid.play().catch(() => {})
        } else {
          vid.pause()
        }
      })
    }, { threshold: 0.25 })
    videos.forEach(v => obs.observe(v))
    return () => obs.disconnect()
  }, [])

  if (loading) {
    return (
      <div id="loading-screen" className="loading-screen">
        <div className="loading-container">
          <div className="loading-logo">
            <img src="/assets/img/loading.png" alt="Prompts360 Loading" className="loading-image" />
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
    <div id="main-content" className={`main-content ${mainVisible ? 'visible' : ''}`}>
      {/* Linha de Conexão Parallax */}
      <div className="connection-line"></div>

      {/* Seção Inicial com Logo */}
      <section className="intro-section">
  <img src="/assets/images/logo_prompts360.png" alt="Prompts360 Logo" className="intro-logo" loading="lazy" />
        <div className="scroll-indicator">
          <span className="scroll-text">Role para descobrir</span>
          <div className="scroll-arrow"></div>
        </div>
      </section>

      {/* Header */}
      <header className={`header ${headerVisible ? 'visible' : ''}`} id="header">
        <div className="container">
          <nav className="navbar">
            <img src="/assets/images/logo_prompts360.png" alt="Prompts360 Logo" className="logo" loading="lazy" />
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
              
              <div className="service-card">
                <div className="service-icon aurora-text">📈</div>
                <h3 className="service-title animated-shiny-text">Funis de Vendas & Jornada do Cliente</h3>
                <p className="service-description">Construa sua máquina previsível de geração de clientes. Funis que levam da descoberta à compra de forma automática, mensurável e escalável.</p>
                <ul className="service-features">
                  <li>Estruturação de funis completos</li>
                  <li>Automação de leads qualificados</li>
                  <li>Remarketing inteligente</li>
                  <li>Acompanhamento de performance</li>
                </ul>
              </div>
              
              <div className="service-card">
                <div className="service-icon aurora-text">🎯</div>
                <h3 className="service-title animated-shiny-text">Consultoria e Estratégia de Crescimento</h3>
                <p className="service-description">Clareza, direcionamento e acompanhamento para seu crescimento. Consultoria contínua com análises, diagnósticos e planos personalizados.</p>
                <ul className="service-features">
                  <li>Mentoria estratégica contínua</li>
                  <li>Diagnósticos de negócio</li>
                  <li>Estratégia comercial personalizada</li>
                  <li>Planejamento com IA</li>
                </ul>
              </div>
              
              <div className="service-card">
                <div className="service-icon aurora-text">⚡</div>
                <h3 className="service-title animated-shiny-text">Conteúdo Premium e Posicionamento</h3>
                <p className="service-description">Impulsione sua marca com conteúdos que geram desejo e vendas. Conteúdo inteligente para engajar, converter e posicionar como autoridade.</p>
                <ul className="service-features">
                  <li>Conteúdo estratégico roteirizado</li>
                  <li>Vídeos e podcasts profissionais</li>
                  <li>IA criativa para produção</li>
                  <li>Posicionamento de autoridade</li>
                </ul>
              </div>
            </div>
            
            {/* Segunda repetição do track para marquee infinito */}
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
              
              <div className="service-card">
                <div className="service-icon aurora-text">📈</div>
                <h3 className="service-title animated-shiny-text">Funis de Vendas & Jornada do Cliente</h3>
                <p className="service-description">Construa sua máquina previsível de geração de clientes. Funis que levam da descoberta à compra de forma automática, mensurável e escalável.</p>
                <ul className="service-features">
                  <li>Estruturação de funis completos</li>
                  <li>Automação de leads qualificados</li>
                  <li>Remarketing inteligente</li>
                  <li>Acompanhamento de performance</li>
                </ul>
              </div>
              
              <div className="service-card">
                <div className="service-icon aurora-text">🎯</div>
                <h3 className="service-title animated-shiny-text">Consultoria e Estratégia de Crescimento</h3>
                <p className="service-description">Clareza, direcionamento e acompanhamento para seu crescimento. Consultoria contínua com análises, diagnósticos e planos personalizados.</p>
                <ul className="service-features">
                  <li>Mentoria estratégica contínua</li>
                  <li>Diagnósticos de negócio</li>
                  <li>Estratégia comercial personalizada</li>
                  <li>Planejamento com IA</li>
                </ul>
              </div>
              
              <div className="service-card">
                <div className="service-icon aurora-text">⚡</div>
                <h3 className="service-title animated-shiny-text">Conteúdo Premium e Posicionamento</h3>
                <p className="service-description">Impulsione sua marca com conteúdos que geram desejo e vendas. Conteúdo inteligente para engajar, converter e posicionar como autoridade.</p>
                <ul className="service-features">
                  <li>Conteúdo estratégico roteirizado</li>
                  <li>Vídeos e podcasts profissionais</li>
                  <li>IA criativa para produção</li>
                  <li>Posicionamento de autoridade</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="section" id="benefits">
        <div className="section-connector"></div>
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Por Que Escolher a Prompts360 como sua Aceleradora Digital?</h2>
            <p className="section-subtitle">Transformamos negócios com tecnologia, estratégia e IA aplicada, entregando crescimento real e sustentável</p>
          </div>
          
          <div className="marquee-container benefits-marquee">
            <div className="marquee-track pause-on-hover">
              <div className="service-card">
                <div className="service-icon">🔵</div>
                <h3 className="service-title">Crescimento com Inteligência</h3>
                <p className="service-description">Estrutura e estratégia para escalar com consistência. Você terá uma operação pensada para crescer de forma previsível, com tecnologia, IA e marketing alinhados ao seu negócio.</p>
              </div>
              
              <div className="service-card">
                <div className="service-icon">🟩</div>
                <h3 className="service-title">Mais Vendas, Mais Resultado</h3>
                <p className="service-description">Funis, automação e marketing que convertem. Geramos leads, vendas e autoridade com estratégias práticas, inteligentes e mensuráveis.</p>
              </div>
              
              <div className="service-card">
                <div className="service-icon">🟨</div>
                <h3 className="service-title">Modernização Completa</h3>
                <p className="service-description">Sites, sistemas e plataformas sob medida. Tecnologia sob controle para modernizar processos, otimizar operações e gerar lucro com eficiência.</p>
              </div>
              
              <div className="service-card">
                <div className="service-icon">�</div>
                <h3 className="service-title">Posicionamento de Autoridade</h3>
                <p className="service-description">Construímos a sua imagem como referência no seu mercado. Sua marca terá mais força, clareza e reconhecimento, com conteúdo estratégico e marketing que gera percepção de valor.</p>
              </div>
              
              <div className="service-card">
                <div className="service-icon">🔴</div>
                <h3 className="service-title">Suporte e Acompanhamento Contínuo</h3>
                <p className="service-description">Você não fica sozinho depois da entrega. Consultoria, suporte técnico e acompanhamento estratégico para manter sua evolução constante.</p>
              </div>
              
              <div className="service-card">
                <div className="service-icon">🟫</div>
                <h3 className="service-title">IA Aplicada ao Seu Negócio</h3>
                <p className="service-description">Automação inteligente para facilitar sua vida e escalar sua operação. IA para processos, vendas, atendimento e conteúdo, trabalhando a seu favor.</p>
              </div>
            </div>
            
            {/* Segunda repetição do track */}
            <div className="marquee-track pause-on-hover">
              <div className="service-card">
                <div className="service-icon">🔵</div>
                <h3 className="service-title">Crescimento com Inteligência</h3>
                <p className="service-description">Estrutura e estratégia para escalar com consistência. Você terá uma operação pensada para crescer de forma previsível, com tecnologia, IA e marketing alinhados ao seu negócio.</p>
              </div>
              
              <div className="service-card">
                <div className="service-icon">🟩</div>
                <h3 className="service-title">Mais Vendas, Mais Resultado</h3>
                <p className="service-description">Funis, automação e marketing que convertem. Geramos leads, vendas e autoridade com estratégias práticas, inteligentes e mensuráveis.</p>
              </div>
              
              <div className="service-card">
                <div className="service-icon">🟨</div>
                <h3 className="service-title">Modernização Completa</h3>
                <p className="service-description">Sites, sistemas e plataformas sob medida. Tecnologia sob controle para modernizar processos, otimizar operações e gerar lucro com eficiência.</p>
              </div>
              
              <div className="service-card">
                <div className="service-icon">�</div>
                <h3 className="service-title">Posicionamento de Autoridade</h3>
                <p className="service-description">Construímos a sua imagem como referência no seu mercado. Sua marca terá mais força, clareza e reconhecimento, com conteúdo estratégico e marketing que gera percepção de valor.</p>
              </div>
              
              <div className="service-card">
                <div className="service-icon">�</div>
                <h3 className="service-title">Suporte e Acompanhamento Contínuo</h3>
                <p className="service-description">Você não fica sozinho depois da entrega. Consultoria, suporte técnico e acompanhamento estratégico para manter sua evolução constante.</p>
              </div>
              
              <div className="service-card">
                <div className="service-icon">🟫</div>
                <h3 className="service-title">IA Aplicada ao Seu Negócio</h3>
                <p className="service-description">Automação inteligente para facilitar sua vida e escalar sua operação. IA para processos, vendas, atendimento e conteúdo, trabalhando a seu favor.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cases Section */}
      <section className="section" id="cases-section">
        <div className="section-connector"></div>
        <div className="cases-container">
          <div className="cases-header">
            <h2 className="cases-title animate-on-scroll">
              <span className="title-main">Cases de Sucesso</span>
              <span className="title-subtitle">Transformações reais com resultados comprovados</span>
            </h2>
          </div>
          
          <div className="marquee-container cases-marquee">
            {/* Primeiro track - 6 cards */}
            <div className="marquee-track pause-on-hover">
              <div className="case-card glass-card" data-case-id="case1">
                <div className="case-header">
                  <div className="case-category">Clínica Médica</div>
                  <h3 className="case-title">Automação para Clínica</h3>
                  <div className="case-company">Clínica São Paulo</div>
                </div>
                
                <div className="case-content">
                  <div className="case-video-container">
                    <video className="case-video lazy-video" 
                           src="/assets/video/cases/case1.mp4" 
                           muted 
                           loop 
                           playsInline 
                           preload="none">
                      <source src="/assets/video/cases/case1.mp4" type="video/mp4" />
                      Seu navegador não suporta vídeos HTML5.
                    </video>
                  </div>
                  
                  <div className="case-details">
                    <div className="case-challenge">
                      <h4>Desafio</h4>
                      <p>Agendamentos manuais causavam conflitos e perda de pacientes</p>
                    </div>
                    
                    <div className="case-solution">
                      <h4>Solução</h4>
                      <p>Sistema inteligente de agendamento + IA para triagem</p>
                    </div>
                    
                    <div className="case-results">
                      <h4>Resultados</h4>
                      <ul className="results-list">
                        <li className="result-item">
                          <span className="result-icon">✓</span>
                          <span>40% aumento na receita</span>
                        </li>
                        <li className="result-item">
                          <span className="result-icon">✓</span>
                          <span>80% redução em conflitos</span>
                        </li>
                        <li className="result-item">
                          <span className="result-icon">✓</span>
                          <span>95% satisfação dos pacientes</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="case-card glass-card" data-case-id="case2">
                <div className="case-header">
                  <div className="case-category">E-commerce</div>
                  <h3 className="case-title">IA para Vendas Online</h3>
                  <div className="case-company">Loja Fashion Pro</div>
                </div>
                
                <div className="case-content">
                  <div className="case-video-container">
                    <video className="case-video lazy-video" 
                           src="/assets/video/cases/case2.mp4" 
                           muted 
                           loop 
                           playsInline 
                           preload="none">
                      <source src="/assets/video/cases/case2.mp4" type="video/mp4" />
                      Seu navegador não suporta vídeos HTML5.
                    </video>
                  </div>
                  
                  <div className="case-details">
                    <div className="case-challenge">
                      <h4>Desafio</h4>
                      <p>Baixa conversão e abandono de carrinho alto</p>
                    </div>
                    
                    <div className="case-solution">
                      <h4>Solução</h4>
                      <p>Chatbot inteligente + funil otimizado</p>
                    </div>
                    
                    <div className="case-results">
                      <h4>Resultados</h4>
                      <ul className="results-list">
                        <li className="result-item">
                          <span className="result-icon">✓</span>
                          <span>300% aumento nas vendas</span>
                        </li>
                        <li className="result-item">
                          <span className="result-icon">✓</span>
                          <span>70% redução no abandono</span>
                        </li>
                        <li className="result-item">
                          <span className="result-icon">✓</span>
                          <span>ROI de 500% em 60 dias</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="case-card glass-card" data-case-id="case3">
                <div className="case-header">
                  <div className="case-category">Consultoria</div>
                  <h3 className="case-title">Automação Completa</h3>
                  <div className="case-company">Consultoria Digital Pro</div>
                </div>
                
                <div className="case-content">
                  <div className="case-video-container">
                    <video className="case-video lazy-video" 
                           src="/assets/video/cases/case3.mp4" 
                           muted 
                           loop 
                           playsInline 
                           preload="none">
                      <source src="/assets/video/cases/case3.mp4" type="video/mp4" />
                      Seu navegador não suporta vídeos HTML5.
                    </video>
                  </div>
                  
                  <div className="case-details">
                    <div className="case-challenge">
                      <h4>Desafio</h4>
                      <p>Processos manuais limitavam crescimento</p>
                    </div>
                    
                    <div className="case-solution">
                      <h4>Solução</h4>
                      <p>Automação completa de processos e IA</p>
                    </div>
                    
                    <div className="case-results">
                      <h4>Resultados</h4>
                      <ul className="results-list">
                        <li className="result-item">
                          <span className="result-icon">✓</span>
                          <span>250% crescimento em clientes</span>
                        </li>
                        <li className="result-item">
                          <span className="result-icon">✓</span>
                          <span>90% economia de tempo</span>
                        </li>
                        <li className="result-item">
                          <span className="result-icon">✓</span>
                          <span>ROI de 400% sustentável</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="case-card glass-card" data-case-id="case1-dup">
                <div className="case-header">
                  <div className="case-category">Clínica Médica</div>
                  <h3 className="case-title">Automação para Clínica</h3>
                  <div className="case-company">Clínica São Paulo</div>
                </div>
                
                <div className="case-content">
                  <div className="case-video-container">
                    <video className="case-video lazy-video" 
                           src="/assets/video/cases/case1.mp4" 
                           muted 
                           loop 
                           playsInline 
                           preload="none">
                      <source src="/assets/video/cases/case1.mp4" type="video/mp4" />
                      Seu navegador não suporta vídeos HTML5.
                    </video>
                  </div>
                  
                  <div className="case-details">
                    <div className="case-challenge">
                      <h4>Desafio</h4>
                      <p>Agendamentos manuais causavam conflitos e perda de pacientes</p>
                    </div>
                    
                    <div className="case-solution">
                      <h4>Solução</h4>
                      <p>Sistema inteligente de agendamento + IA para triagem</p>
                    </div>
                    
                    <div className="case-results">
                      <h4>Resultados</h4>
                      <ul className="results-list">
                        <li className="result-item">
                          <span className="result-icon">✓</span>
                          <span>40% aumento na receita</span>
                        </li>
                        <li className="result-item">
                          <span className="result-icon">✓</span>
                          <span>80% redução em conflitos</span>
                        </li>
                        <li className="result-item">
                          <span className="result-icon">✓</span>
                          <span>95% satisfação dos pacientes</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="case-card glass-card" data-case-id="case2-dup">
                <div className="case-header">
                  <div className="case-category">E-commerce</div>
                  <h3 className="case-title">IA para Vendas Online</h3>
                  <div className="case-company">Loja Fashion Pro</div>
                </div>
                
                <div className="case-content">
                  <div className="case-video-container">
                    <video className="case-video lazy-video" 
                           src="/assets/video/cases/case2.mp4" 
                           muted 
                           loop 
                           playsInline 
                           preload="none">
                      <source src="/assets/video/cases/case2.mp4" type="video/mp4" />
                      Seu navegador não suporta vídeos HTML5.
                    </video>
                  </div>
                  
                  <div className="case-details">
                    <div className="case-challenge">
                      <h4>Desafio</h4>
                      <p>Baixa conversão e abandono de carrinho alto</p>
                    </div>
                    
                    <div className="case-solution">
                      <h4>Solução</h4>
                      <p>Chatbot inteligente + funil otimizado</p>
                    </div>
                    
                    <div className="case-results">
                      <h4>Resultados</h4>
                      <ul className="results-list">
                        <li className="result-item">
                          <span className="result-icon">✓</span>
                          <span>300% aumento nas vendas</span>
                        </li>
                        <li className="result-item">
                          <span className="result-icon">✓</span>
                          <span>70% redução no abandono</span>
                        </li>
                        <li className="result-item">
                          <span className="result-icon">✓</span>
                          <span>ROI de 500% em 60 dias</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="case-card glass-card" data-case-id="case3-dup">
                <div className="case-header">
                  <div className="case-category">Consultoria</div>
                  <h3 className="case-title">Automação Completa</h3>
                  <div className="case-company">Consultoria Digital Pro</div>
                </div>
                
                <div className="case-content">
                  <div className="case-video-container">
                    <video className="case-video lazy-video" 
                           src="/assets/video/cases/case3.mp4" 
                           muted 
                           loop 
                           playsInline 
                           preload="none">
                      <source src="/assets/video/cases/case3.mp4" type="video/mp4" />
                      Seu navegador não suporta vídeos HTML5.
                    </video>
                  </div>
                  
                  <div className="case-details">
                    <div className="case-challenge">
                      <h4>Desafio</h4>
                      <p>Processos manuais limitavam crescimento</p>
                    </div>
                    
                    <div className="case-solution">
                      <h4>Solução</h4>
                      <p>Automação completa de processos e IA</p>
                    </div>
                    
                    <div className="case-results">
                      <h4>Resultados</h4>
                      <ul className="results-list">
                        <li className="result-item">
                          <span className="result-icon">✓</span>
                          <span>250% crescimento em clientes</span>
                        </li>
                        <li className="result-item">
                          <span className="result-icon">✓</span>
                          <span>90% economia de tempo</span>
                        </li>
                        <li className="result-item">
                          <span className="result-icon">✓</span>
                          <span>ROI de 400% sustentável</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Segundo track - marquee infinito */}
            <div className="marquee-track marquee-reverse pause-on-hover">
              <div className="case-card glass-card" data-case-id="case1-copy">
                <div className="case-header">
                  <div className="case-category">Clínica Médica</div>
                  <h3 className="case-title">Automação para Clínica</h3>
                  <div className="case-company">Clínica São Paulo</div>
                </div>
                
                <div className="case-content">
                  <div className="case-video-container">
                    <video className="case-video lazy-video" 
                           src="/assets/video/cases/case1.mp4" 
                           muted 
                           loop 
                           playsInline 
                           preload="none">
                      <source src="/assets/video/cases/case1.mp4" type="video/mp4" />
                      Seu navegador não suporta vídeos HTML5.
                    </video>
                  </div>
                  
                  <div className="case-details">
                    <div className="case-challenge">
                      <h4>Desafio</h4>
                      <p>Agendamentos manuais causavam conflitos e perda de pacientes</p>
                    </div>
                    
                    <div className="case-solution">
                      <h4>Solução</h4>
                      <p>Sistema inteligente de agendamento + IA para triagem</p>
                    </div>
                    
                    <div className="case-results">
                      <h4>Resultados</h4>
                      <ul className="results-list">
                        <li className="result-item">
                          <span className="result-icon">✓</span>
                          <span>40% aumento na receita</span>
                        </li>
                        <li className="result-item">
                          <span className="result-icon">✓</span>
                          <span>80% redução em conflitos</span>
                        </li>
                        <li className="result-item">
                          <span className="result-icon">✓</span>
                          <span>95% satisfação dos pacientes</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="case-card glass-card" data-case-id="case2-2">
                <div className="case-header">
                  <div className="case-category">E-commerce</div>
                  <h3 className="case-title">IA para Vendas Online</h3>
                  <div className="case-company">Loja Fashion Pro</div>
                </div>
                
                <div className="case-content">
                  <div className="case-video-container">
                    <video className="case-video lazy-video" 
                           src="/assets/video/cases/case2.mp4" 
                           muted 
                           loop 
                           playsInline 
                           preload="none">
                      <source src="/assets/video/cases/case2.mp4" type="video/mp4" />
                      Seu navegador não suporta vídeos HTML5.
                    </video>
                  </div>
                  
                  <div className="case-details">
                    <div className="case-challenge">
                      <h4>Desafio</h4>
                      <p>Baixa conversão e abandono de carrinho alto</p>
                    </div>
                    
                    <div className="case-solution">
                      <h4>Solução</h4>
                      <p>Chatbot inteligente + funil otimizado</p>
                    </div>
                    
                    <div className="case-results">
                      <h4>Resultados</h4>
                      <ul className="results-list">
                        <li className="result-item">
                          <span className="result-icon">✓</span>
                          <span>300% aumento nas vendas</span>
                        </li>
                        <li className="result-item">
                          <span className="result-icon">✓</span>
                          <span>70% redução no abandono</span>
                        </li>
                        <li className="result-item">
                          <span className="result-icon">✓</span>
                          <span>ROI de 500% em 60 dias</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="case-card glass-card" data-case-id="case3-2">
                <div className="case-header">
                  <div className="case-category">Consultoria</div>
                  <h3 className="case-title">Automação Completa</h3>
                  <div className="case-company">Consultoria Digital Pro</div>
                </div>
                
                <div className="case-content">
                  <div className="case-video-container">
                    <video className="case-video lazy-video" 
                           src="/assets/video/cases/case3.mp4" 
                           muted 
                           loop 
                           playsInline 
                           preload="none">
                      <source src="/assets/video/cases/case3.mp4" type="video/mp4" />
                      Seu navegador não suporta vídeos HTML5.
                    </video>
                  </div>
                  
                  <div className="case-details">
                    <div className="case-challenge">
                      <h4>Desafio</h4>
                      <p>Processos manuais limitavam crescimento</p>
                    </div>
                    
                    <div className="case-solution">
                      <h4>Solução</h4>
                      <p>Automação completa de processos e IA</p>
                    </div>
                    
                    <div className="case-results">
                      <h4>Resultados</h4>
                      <ul className="results-list">
                        <li className="result-item">
                          <span className="result-icon">✓</span>
                          <span>250% crescimento em clientes</span>
                        </li>
                        <li className="result-item">
                          <span className="result-icon">✓</span>
                          <span>90% economia de tempo</span>
                        </li>
                        <li className="result-item">
                          <span className="result-icon">✓</span>
                          <span>ROI de 400% sustentável</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Terceira repetição dos cases */}
              <div className="case-card glass-card" data-case-id="case1-3">
                <div className="case-header">
                  <div className="case-category">Clínica Médica</div>
                  <h3 className="case-title">Automação para Clínica</h3>
                  <div className="case-company">Clínica São Paulo</div>
                </div>
                
                <div className="case-content">
                  <div className="case-video-container">
                    <video className="case-video lazy-video" 
                           src="/assets/video/cases/case1.mp4" 
                           muted 
                           loop 
                           playsInline 
                           preload="none">
                      <source src="/assets/video/cases/case1.mp4" type="video/mp4" />
                      Seu navegador não suporta vídeos HTML5.
                    </video>
                  </div>
                  
                  <div className="case-details">
                    <div className="case-challenge">
                      <h4>Desafio</h4>
                      <p>Agendamentos manuais causavam conflitos e perda de pacientes</p>
                    </div>
                    
                    <div className="case-solution">
                      <h4>Solução</h4>
                      <p>Sistema inteligente de agendamento + IA para triagem</p>
                    </div>
                    
                    <div className="case-results">
                      <h4>Resultados</h4>
                      <ul className="results-list">
                        <li className="result-item">
                          <span className="result-icon">✓</span>
                          <span>40% aumento na receita</span>
                        </li>
                        <li className="result-item">
                          <span className="result-icon">✓</span>
                          <span>80% redução em conflitos</span>
                        </li>
                        <li className="result-item">
                          <span className="result-icon">✓</span>
                          <span>95% satisfação dos pacientes</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="case-card glass-card" data-case-id="case2-3">
                <div className="case-header">
                  <div className="case-category">E-commerce</div>
                  <h3 className="case-title">IA para Vendas Online</h3>
                  <div className="case-company">Loja Fashion Pro</div>
                </div>
                
                <div className="case-content">
                  <div className="case-video-container">
                    <video className="case-video lazy-video" 
                           src="/assets/video/cases/case2.mp4" 
                           muted 
                           loop 
                           playsInline 
                           preload="none">
                      <source src="/assets/video/cases/case2.mp4" type="video/mp4" />
                      Seu navegador não suporta vídeos HTML5.
                    </video>
                  </div>
                  
                  <div className="case-details">
                    <div className="case-challenge">
                      <h4>Desafio</h4>
                      <p>Baixa conversão e abandono de carrinho alto</p>
                    </div>
                    
                    <div className="case-solution">
                      <h4>Solução</h4>
                      <p>Chatbot inteligente + funil otimizado</p>
                    </div>
                    
                    <div className="case-results">
                      <h4>Resultados</h4>
                      <ul className="results-list">
                        <li className="result-item">
                          <span className="result-icon">✓</span>
                          <span>300% aumento nas vendas</span>
                        </li>
                        <li className="result-item">
                          <span className="result-icon">✓</span>
                          <span>70% redução no abandono</span>
                        </li>
                        <li className="result-item">
                          <span className="result-icon">✓</span>
                          <span>ROI de 500% em 60 dias</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="case-card glass-card" data-case-id="case3-3">
                <div className="case-header">
                  <div className="case-category">Consultoria</div>
                  <h3 className="case-title">Automação Completa</h3>
                  <div className="case-company">Consultoria Digital Pro</div>
                </div>
                
                <div className="case-content">
                  <div className="case-video-container">
                    <video className="case-video lazy-video" 
                           src="/assets/video/cases/case3.mp4" 
                           muted 
                           loop 
                           playsInline 
                           preload="none">
                      <source src="/assets/video/cases/case3.mp4" type="video/mp4" />
                      Seu navegador não suporta vídeos HTML5.
                    </video>
                  </div>
                  
                  <div className="case-details">
                    <div className="case-challenge">
                      <h4>Desafio</h4>
                      <p>Processos manuais limitavam crescimento</p>
                    </div>
                    
                    <div className="case-solution">
                      <h4>Solução</h4>
                      <p>Automação completa de processos e IA</p>
                    </div>
                    
                    <div className="case-results">
                      <h4>Resultados</h4>
                      <ul className="results-list">
                        <li className="result-item">
                          <span className="result-icon">✓</span>
                          <span>250% crescimento em clientes</span>
                        </li>
                        <li className="result-item">
                          <span className="result-icon">✓</span>
                          <span>90% economia de tempo</span>
                        </li>
                        <li className="result-item">
                          <span className="result-icon">✓</span>
                          <span>ROI de 400% sustentável</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Segunda repetição do track para marquee infinito - igual aos serviços */}
            <div className="marquee-track pause-on-hover">
              <div className="case-card glass-card" data-case-id="case1-copy">
                <div className="case-header">
                  <div className="case-category">Clínica Médica</div>
                  <h3 className="case-title">Automação para Clínica</h3>
                  <div className="case-company">Clínica São Paulo</div>
                </div>
                
                <div className="case-content">
                  <div className="case-video-container">
                    <video className="case-video lazy-video" 
                           src="/assets/video/cases/case1.mp4" 
                           muted 
                           loop 
                           playsInline 
                           preload="none">
                      <source src="/assets/video/cases/case1.mp4" type="video/mp4" />
                      Seu navegador não suporta vídeos HTML5.
                    </video>
                  </div>
                  
                  <div className="case-details">
                    <div className="case-challenge">
                      <h4>Desafio</h4>
                      <p>Agendamentos manuais causavam conflitos e perda de pacientes</p>
                    </div>
                    
                    <div className="case-solution">
                      <h4>Solução</h4>
                      <p>Sistema inteligente de agendamento + IA para triagem</p>
                    </div>
                    
                    <div className="case-results">
                      <h4>Resultados</h4>
                      <ul className="results-list">
                        <li className="result-item">
                          <span className="result-icon">✓</span>
                          <span>40% aumento na receita</span>
                        </li>
                        <li className="result-item">
                          <span className="result-icon">✓</span>
                          <span>80% redução em conflitos</span>
                        </li>
                        <li className="result-item">
                          <span className="result-icon">✓</span>
                          <span>95% satisfação dos pacientes</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="case-card glass-card" data-case-id="case2-copy">
                <div className="case-header">
                  <div className="case-category">E-commerce</div>
                  <h3 className="case-title">IA para Vendas Online</h3>
                  <div className="case-company">Loja Fashion Pro</div>
                </div>
                
                <div className="case-content">
                  <div className="case-video-container">
                    <video className="case-video lazy-video" 
                           src="/assets/video/cases/case2.mp4" 
                           muted 
                           loop 
                           playsInline 
                           preload="none">
                      <source src="/assets/video/cases/case2.mp4" type="video/mp4" />
                      Seu navegador não suporta vídeos HTML5.
                    </video>
                  </div>
                  
                  <div className="case-details">
                    <div className="case-challenge">
                      <h4>Desafio</h4>
                      <p>Baixa conversão e abandono de carrinho alto</p>
                    </div>
                    
                    <div className="case-solution">
                      <h4>Solução</h4>
                      <p>Chatbot inteligente + funil otimizado</p>
                    </div>
                    
                    <div className="case-results">
                      <h4>Resultados</h4>
                      <ul className="results-list">
                        <li className="result-item">
                          <span className="result-icon">✓</span>
                          <span>300% aumento nas vendas</span>
                        </li>
                        <li className="result-item">
                          <span className="result-icon">✓</span>
                          <span>70% redução no abandono</span>
                        </li>
                        <li className="result-item">
                          <span className="result-icon">✓</span>
                          <span>ROI de 500% em 60 dias</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="case-card glass-card" data-case-id="case3-copy">
                <div className="case-header">
                  <div className="case-category">Consultoria</div>
                  <h3 className="case-title">Automação Completa</h3>
                  <div className="case-company">Consultoria Digital Pro</div>
                </div>
                
                <div className="case-content">
                  <div className="case-video-container">
                    <video className="case-video lazy-video" 
                           src="/assets/video/cases/case3.mp4" 
                           muted 
                           loop 
                           playsInline 
                           preload="none">
                      <source src="/assets/video/cases/case3.mp4" type="video/mp4" />
                      Seu navegador não suporta vídeos HTML5.
                    </video>
                  </div>
                  
                  <div className="case-details">
                    <div className="case-challenge">
                      <h4>Desafio</h4>
                      <p>Processos manuais limitavam crescimento</p>
                    </div>
                    
                    <div className="case-solution">
                      <h4>Solução</h4>
                      <p>Automação completa de processos e IA</p>
                    </div>
                    
                    <div className="case-results">
                      <h4>Resultados</h4>
                      <ul className="results-list">
                        <li className="result-item">
                          <span className="result-icon">✓</span>
                          <span>250% crescimento em clientes</span>
                        </li>
                        <li className="result-item">
                          <span className="result-icon">✓</span>
                          <span>90% economia de tempo</span>
                        </li>
                        <li className="result-item">
                          <span className="result-icon">✓</span>
                          <span>ROI de 400% sustentável</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="case-card glass-card" data-case-id="case1-dup-copy">
                <div className="case-header">
                  <div className="case-category">Clínica Médica</div>
                  <h3 className="case-title">Automação para Clínica</h3>
                  <div className="case-company">Clínica São Paulo</div>
                </div>
                
                <div className="case-content">
                  <div className="case-video-container">
                    <video className="case-video lazy-video" 
                           src="/assets/video/cases/case1.mp4" 
                           muted 
                           loop 
                           playsInline 
                           preload="none">
                      <source src="/assets/video/cases/case1.mp4" type="video/mp4" />
                      Seu navegador não suporta vídeos HTML5.
                    </video>
                  </div>
                  
                  <div className="case-details">
                    <div className="case-challenge">
                      <h4>Desafio</h4>
                      <p>Agendamentos manuais causavam conflitos e perda de pacientes</p>
                    </div>
                    
                    <div className="case-solution">
                      <h4>Solução</h4>
                      <p>Sistema inteligente de agendamento + IA para triagem</p>
                    </div>
                    
                    <div className="case-results">
                      <h4>Resultados</h4>
                      <ul className="results-list">
                        <li className="result-item">
                          <span className="result-icon">✓</span>
                          <span>40% aumento na receita</span>
                        </li>
                        <li className="result-item">
                          <span className="result-icon">✓</span>
                          <span>80% redução em conflitos</span>
                        </li>
                        <li className="result-item">
                          <span className="result-icon">✓</span>
                          <span>95% satisfação dos pacientes</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="case-card glass-card" data-case-id="case2-dup-copy">
                <div className="case-header">
                  <div className="case-category">E-commerce</div>
                  <h3 className="case-title">IA para Vendas Online</h3>
                  <div className="case-company">Loja Fashion Pro</div>
                </div>
                
                <div className="case-content">
                  <div className="case-video-container">
                    <video className="case-video lazy-video" 
                           src="/assets/video/cases/case2.mp4" 
                           muted 
                           loop 
                           playsInline 
                           preload="none">
                      <source src="/assets/video/cases/case2.mp4" type="video/mp4" />
                      Seu navegador não suporta vídeos HTML5.
                    </video>
                  </div>
                  
                  <div className="case-details">
                    <div className="case-challenge">
                      <h4>Desafio</h4>
                      <p>Baixa conversão e abandono de carrinho alto</p>
                    </div>
                    
                    <div className="case-solution">
                      <h4>Solução</h4>
                      <p>Chatbot inteligente + funil otimizado</p>
                    </div>
                    
                    <div className="case-results">
                      <h4>Resultados</h4>
                      <ul className="results-list">
                        <li className="result-item">
                          <span className="result-icon">✓</span>
                          <span>300% aumento nas vendas</span>
                        </li>
                        <li className="result-item">
                          <span className="result-icon">✓</span>
                          <span>70% redução no abandono</span>
                        </li>
                        <li className="result-item">
                          <span className="result-icon">✓</span>
                          <span>ROI de 500% em 60 dias</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="case-card glass-card" data-case-id="case3-dup-copy">
                <div className="case-header">
                  <div className="case-category">Consultoria</div>
                  <h3 className="case-title">Automação Completa</h3>
                  <div className="case-company">Consultoria Digital Pro</div>
                </div>
                
                <div className="case-content">
                  <div className="case-video-container">
                    <video className="case-video lazy-video" 
                           src="/assets/video/cases/case3.mp4" 
                           muted 
                           loop 
                           playsInline 
                           preload="none">
                      <source src="/assets/video/cases/case3.mp4" type="video/mp4" />
                      Seu navegador não suporta vídeos HTML5.
                    </video>
                  </div>
                  
                  <div className="case-details">
                    <div className="case-challenge">
                      <h4>Desafio</h4>
                      <p>Processos manuais limitavam crescimento</p>
                    </div>
                    
                    <div className="case-solution">
                      <h4>Solução</h4>
                      <p>Automação completa de processos e IA</p>
                    </div>
                    
                    <div className="case-results">
                      <h4>Resultados</h4>
                      <ul className="results-list">
                        <li className="result-item">
                          <span className="result-icon">✓</span>
                          <span>250% crescimento em clientes</span>
                        </li>
                        <li className="result-item">
                          <span className="result-icon">✓</span>
                          <span>90% economia de tempo</span>
                        </li>
                        <li className="result-item">
                          <span className="result-icon">✓</span>
                          <span>ROI de 400% sustentável</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* E-book CTA Section */}
      <section className="section ebook-cta-section" style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '4rem 0'
      }}>
        <div className="container">
          <div className="ebook-cta-content" style={{
            display: 'grid',
            gridTemplateColumns: '1fr 2fr',
            gap: '3rem',
            alignItems: 'center',
            maxWidth: '1200px',
            margin: '0 auto'
          }}>
            {/* Imagem do E-book */}
            <div className="ebook-cta-visual" style={{
              textAlign: 'center',
              position: 'relative'
            }}>
              <div style={{
                position: 'relative',
                display: 'inline-block',
                transform: 'rotate(-5deg)',
                transition: 'transform 0.3s ease'
              }}>
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
                <div style={{
                  position: 'absolute',
                  top: '-10px',
                  right: '-10px',
                  background: '#ff6b6b',
                  color: 'white',
                  padding: '0.5rem',
                  borderRadius: '50%',
                  fontSize: '1.2rem',
                  animation: 'pulse 2s infinite'
                }}>
                  🔥
                </div>
              </div>
            </div>

            {/* Conteúdo do E-book */}
            <div className="ebook-cta-info">
              <div style={{
                background: 'rgba(255,255,255,0.1)',
                padding: '0.5rem 1rem',
                borderRadius: '25px',
                display: 'inline-block',
                marginBottom: '1rem',
                fontSize: '0.9rem',
                fontWeight: '600'
              }}>
                🎁 BÔNUS EXCLUSIVO
              </div>
              
              <h2 style={{
                fontSize: '2.8rem',
                fontWeight: '700',
                marginBottom: '1rem',
                lineHeight: '1.2'
              }}>
                E-book: "Guia Definitivo de<br />
                <span style={{ 
                  background: 'linear-gradient(45deg, #ffd700, #ffed4e)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  color: 'transparent'
                }}>
                  Prompts para IA"
                </span>
              </h2>
              
              <p style={{
                fontSize: '1.3rem',
                marginBottom: '2rem',
                opacity: '0.9',
                lineHeight: '1.5'
              }}>
                <strong>200+ prompts testados</strong> para ChatGPT, Claude, Gemini e outras IAs. 
                Organize seu negócio e aumente sua produtividade em <strong>300%</strong>!
              </p>

              {/* Features rápidas */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '1rem',
                marginBottom: '2rem'
              }}>
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
                <a href="#lead-form" style={{
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
                }}>
                  🎁 GANHAR E-BOOK GRÁTIS + Projeto
                </a>
                
                <a href="https://pay.kiwify.com.br/seu-link-ebook" target="_blank" rel="noreferrer" style={{
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
                }}>
                  💰 Comprar Apenas E-book - R$ 9,97
                </a>
              </div>

              <p style={{
                marginTop: '1rem',
                fontSize: '0.9rem',
                opacity: '0.8'
              }}>
                ⏰ <strong>Promoção limitada!</strong> Preço normal: R$ 47,00
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Plans Section */}
      <section className="section" id="plans">
        <div className="section-connector"></div>
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">🏆 Nossos Planos de Transformação Digital e Crescimento</h2>
            <p className="section-subtitle">Aqui você encontra soluções completas para transformar, modernizar e escalar o seu negócio. Cada plano foi pensado para atender a diferentes estágios e objetivos de crescimento — desde quem está começando até quem busca estrutura robusta para faturar mais.</p>
          </div>
          
          <div className="plans-container">
            <div className="plans-category">
              <h3 className="category-title">360 Infinity | Estrutura Completa para Crescimento</h3>
              
              <div className="plans-grid">
                <div className="plan-card">
                  <div className="plan-header">
                    <div className="plan-icon">🔵</div>
                    <h4 className="plan-title">Plano Infinity Start</h4>
                    <p className="plan-subtitle">Estrutura Inicial Inteligente</p>
                  </div>
                  
                  <div className="plan-content">
                    <p className="plan-description">Ideal para negócios que precisam dar os primeiros passos com presença digital profissional e estrutura básica para começar a crescer.</p>
                    
                    <div className="plan-features">
                      <h5>Inclui:</h5>
                      <ul>
                        <li>Site institucional moderno e responsivo</li>
                        <li>Estrutura básica de automação e captação de leads</li>
                        <li>Suporte técnico e hospedagem inclusa</li>
                        <li>Atualizações e manutenções essenciais</li>
                      </ul>
                    </div>
                    
                    <div className="plan-target">
                      <strong>Indicado para:</strong>
                      <p>Quem precisa validar seu negócio no ambiente digital com segurança e profissionalismo.</p>
                    </div>
                  </div>
                </div>
                
                <div className="plan-card featured">
                  <div className="plan-header">
                    <div className="plan-icon">🟢</div>
                    <h4 className="plan-title">Plano Infinity Growth</h4>
                    <p className="plan-subtitle">Estrutura para Crescimento Acelerado</p>
                    <div className="plan-badge">Mais Popular</div>
                  </div>
                  
                  <div className="plan-content">
                    <p className="plan-description">Feito para negócios que querem acelerar vendas e consolidar sua presença digital com tecnologia, marketing e inteligência integrada.</p>
                    
                    <div className="plan-features">
                      <h5>Inclui:</h5>
                      <ul>
                        <li>Site completo com CMS para gestão de conteúdo</li>
                        <li>Landing Pages estratégicas para vendas e captação</li>
                        <li>IA aplicada a conteúdos, e-mails e automações</li>
                        <li>Funis de vendas, automações e campanhas de tráfego</li>
                        <li>Consultoria mensal e relatórios de performance</li>
                      </ul>
                    </div>
                    
                    <div className="plan-target">
                      <strong>Indicado para:</strong>
                      <p>Quem deseja sair do amadorismo e construir uma máquina de vendas previsível.</p>
                    </div>
                  </div>
                </div>
                
                <div className="plan-card premium">
                  <div className="plan-header">
                    <div className="plan-icon">🔴</div>
                    <h4 className="plan-title">Plano Infinity Performance</h4>
                    <p className="plan-subtitle">Estrutura Completa para Escala</p>
                    <div className="plan-badge premium">Premium</div>
                  </div>
                  
                  <div className="plan-content">
                    <p className="plan-description">Solução premium para negócios que buscam estrutura robusta, automação avançada e crescimento sustentável com suporte completo.</p>
                    
                    <div className="plan-features">
                      <h5>Inclui:</h5>
                      <ul>
                        <li>Plataforma completa customizada</li>
                        <li>IA avançada integrada em todos os processos</li>
                        <li>Consultoria estratégica semanal</li>
                        <li>Automações complexas e integrações personalizadas</li>
                        <li>Suporte prioritário e acompanhamento dedicado</li>
                      </ul>
                    </div>
                    
                    <div className="plan-target">
                      <strong>Indicado para:</strong>
                      <p>Negócios que querem dominar seu mercado com tecnologia de ponta e crescimento acelerado.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lead Form Section */}
      <section className="section ebook-section" id="lead-form">
        <div className="cool-blob-1"></div>
        <div className="cool-blob-2"></div>
        <div className="section-connector"></div>
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">🎯 Diagnóstico Gratuito / E-book Exclusivo</h2>
            <p className="section-subtitle">Receba uma análise personalizada do seu negócio e ganhe nosso guia completo de prompts para IA</p>
          </div>
          
          {/* Layout com duas colunas: Formulário + E-book */}
          <div className="ebook-form-wrapper">
            {/* Coluna Esquerda: Formulário */}
            <div className="form-section">
              <div className="form-header">
                <h3>🔍 Análise Gratuita</h3>
                <p>Descubra quanto seu negócio pode crescer com IA</p>
              </div>
              
              <form className="lead-form glass-effect" id="leadForm" onSubmit={async (e) => {
                e.preventDefault()
                setFormError(null)
                setFormSuccess(false)
                const form = e.target as HTMLFormElement
                const data = new FormData(form)
                const name = String(data.get('name') || '').trim()
                const email = String(data.get('email') || '').trim()
                const phone = String(data.get('phone') || '').trim()
                const company = String(data.get('company') || '').trim()
                const position = String(data.get('position') || '').trim()
                // setor selecionado (valor de exibição), e mapeamos para um interesse padrão esperado pelo backend
                const sector = String(data.get('sector') || data.get('interest') || '').trim()
                // mapear setores para categorias genéricas esperadas pela planilha (fallback: other)
                const sectorToInterest: Record<string, string> = {
                  clinica: 'consulting',
                  educacao: 'consulting',
                  juridico: 'consulting',
                  consultoria: 'consulting',
                  other: 'other',
                }
                const interest = sectorToInterest[sector as keyof typeof sectorToInterest] || 'other'
                const challenge = String(data.get('challenge') || '').trim()

                // validações básicas
                if (!name) return setFormError('Informe seu nome.')
                if (!isValidEmail(email)) return setFormError('Informe um e-mail válido.')
                if (!isValidPhone(phone)) return setFormError('Informe um telefone válido.')
                if (!company) return setFormError('Informe sua empresa.')
                if (!position) return setFormError('Informe seu cargo.')
                if (!sector) return setFormError('Selecione o tipo de empresa.')
                if (!challenge) return setFormError('Descreva seu principal desafio.')

                setFormLoading(true)
                try {
                  await submitLead({ name, email, phone, company, position, interest, sector, challenge, source: 'landing' })
                  setFormSuccess(true)
                  form.reset()
                } catch (err) {
                  setFormError('Não foi possível enviar. Tente novamente.')
                } finally {
                  setFormLoading(false)
                }
              }}>
                <div className="form-group">
                  <label htmlFor="name" className="form-label">Nome Completo *</label>
                  <input type="text" id="name" name="name" className="form-input" required />
                  <span className="error-label" id="name-error"></span>
                </div>
                
                <div className="form-group">
                  <label htmlFor="email" className="form-label">E-mail Corporativo *</label>
                  <input type="email" id="email" name="email" className="form-input" required />
                  <span className="error-label" id="email-error"></span>
                </div>
                
                <div className="form-group">
                  <label htmlFor="phone" className="form-label">Telefone *</label>
                  <input type="tel" id="phone" name="phone" className="form-input" required placeholder="(00) 0.0000-0000" onBlur={(e)=>{ e.currentTarget.value = formatPhone(e.currentTarget.value) }} />
                  <span className="error-label" id="phone-error"></span>
                </div>
                
                <div className="form-group">
                  <label htmlFor="company" className="form-label">Empresa *</label>
                  <input type="text" id="company" name="company" className="form-input" required />
                  <span className="error-label" id="company-error"></span>
                </div>
                
                <div className="form-group">
                  <label htmlFor="position" className="form-label">Cargo *</label>
                  <input type="text" id="position" name="position" className="form-input" required />
                  <span className="error-label" id="position-error"></span>
                </div>
                
                <div className="form-group">
                  <label htmlFor="sector" className="form-label">Tipo de Empresa *</label>
                  <select id="sector" name="sector" className="form-select" required>
                    <option value="">Selecione seu setor</option>
                    <option value="clinica">Clínica Médica / Odontológica / Veterinária</option>
                    <option value="educacao">Escola / Universidade / Curso</option>
                    <option value="juridico">Escritório Jurídico / Advocacia</option>
                    <option value="consultoria">Consultoria / Prestação de Serviços</option>
                    <option value="other">Outro setor de serviços</option>
                  </select>
                  <span className="error-label" id="sector-error"></span>
                </div>
                
                <div className="form-group">
                  <label htmlFor="challenge" className="form-label">Qual seu maior desafio hoje? *</label>
                  <textarea id="challenge" name="challenge" className="form-textarea" rows={3} placeholder="Ex: Muitos processos manuais, dificuldade em controlar custos..." required></textarea>
                  <span className="error-label" id="challenge-error"></span>
                </div>
                
                <Button type="submit" className="cta-button" disabled={formLoading}>
                  {formLoading ? 'Enviando...' : 'Quero Meu Diagnóstico'}
                </Button>
                {formError && (
                  <p className="form-error" role="alert" style={{ color: '#ff6b6b', marginTop: '0.5rem' }}>{formError}</p>
                )}
                {formSuccess && (
                  <p className="form-success" role="status" style={{ color: '#00ff88', marginTop: '0.5rem' }}>Recebemos seus dados! Entraremos em contato.</p>
                )}
                
                <p className="form-disclaimer">
                  <small>🔒 Seus dados estão seguros • ⚡ Apenas 20 diagnósticos por mês</small>
                </p>
              </form>
            </div>
            
            {/* Coluna Direita: E-book */}
            <div className="ebook-section-right">
              <div className="ebook-bonus-section">
                {/* Layout horizontal: Imagem + Info lado a lado */}
                <div className="ebook-horizontal-layout">
                  {/* Imagem do E-book (esquerda) */}
                  <div className="ebook-visual-compact">
                    <div className="ebook-image-container">
                      <img src="/assets/images/foto_ebook.webp" alt="E-book Guia de Prompts" className="ebook-image" loading="lazy" />
                      <div className="ebook-glow"></div>
                    </div>
                  </div>
                  
                  {/* Informações do E-book (direita) */}
                  <div className="ebook-info-compact">
                    <div className="bonus-highlight">🎁 Últimas unidades!</div>
                    
                    <h3 className="ebook-title">E-book: "Guia Definitivo de Prompts para IA"</h3>
                    <p className="ebook-description">
                      Mais de 200 prompts testados para ChatGPT, Claude, Gemini e outras IAs, organizados por área de negócio.
                    </p>
                    
                    {/* Features em linha horizontal */}
                    <div className="ebook-features-horizontal">
                      <div className="feature-item-compact">
                        <span className="feature-icon">📊</span>
                        <div className="feature-text">
                          <strong>200+ Prompts</strong>
                          <span>Testados e aprovados</span>
                        </div>
                      </div>
                      <div className="feature-item-compact">
                        <span className="feature-icon">🎯</span>
                        <div className="feature-text">
                          <strong>Por Categoria</strong>
                          <span>Organizados por área</span>
                        </div>
                      </div>
                      <div className="feature-item-compact">
                        <span className="feature-icon">⚡</span>
                        <div className="feature-text">
                          <strong>Aplicação Prática</strong>
                          <span>Exemplos reais de uso</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="ebook-how-it-works">
                      <h4>🔥 Como Funciona:</h4>
                      <p>Feche qualquer projeto conosco e receba o e-book <strong>gratuitamente</strong> como bônus. 
                      Não quer fechar projeto agora? Pode adquirir separadamente por apenas R$ 9,97.</p>
                      
                      {/* CTAs do E-book */}
                      <div className="ebook-ctas" style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                        <a href="#lead-form" className="cta-button primary-ebook-cta" style={{
                          background: 'linear-gradient(135deg, #ff6b6b, #ee5a24)',
                          color: 'white',
                          padding: '0.75rem 1.5rem',
                          borderRadius: '8px',
                          textDecoration: 'none',
                          fontWeight: '600',
                          fontSize: '0.95rem',
                          boxShadow: '0 4px 15px rgba(255, 107, 107, 0.3)',
                          transition: 'all 0.3s ease',
                          display: 'inline-block'
                        }}>
                          🎁 Quero o E-book GRÁTIS + Projeto
                        </a>
                        
                        <a href="https://pay.kiwify.com.br/seu-link-ebook" target="_blank" rel="noreferrer" className="cta-button secondary-ebook-cta" style={{
                          background: 'transparent',
                          color: '#ff6b6b',
                          border: '2px solid #ff6b6b',
                          padding: '0.75rem 1.5rem',
                          borderRadius: '8px',
                          textDecoration: 'none',
                          fontWeight: '600',
                          fontSize: '0.95rem',
                          transition: 'all 0.3s ease',
                          display: 'inline-block'
                        }}>
                          📚 Comprar Só o E-book - R$ 9,97
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="section final-cta-section" style={{
        background: 'linear-gradient(135deg, #1e90ff, #8a2be2)',
        color: 'white',
        textAlign: 'center',
        padding: '4rem 0'
      }}>
        <div className="container">
          <h2 style={{
            fontSize: '2.5rem',
            marginBottom: '1rem',
            fontWeight: 700
          }}>
            Pronto para Transformar seu Negócio em uma Máquina de Lucro?
          </h2>
          <p style={{
            fontSize: '1.2rem',
            marginBottom: '2rem',
            opacity: 0.9
          }}>
            Junte-se aos <strong>50+ empresas</strong> que já modernizaram com IA e aumentaram sua receita em <strong>45%</strong>
          </p>
          <div style={{ marginBottom: '2rem' }}>
            <span style={{
              background: 'rgba(255,255,255,0.2)',
              padding: '0.5rem 1rem',
              borderRadius: '25px',
              margin: '0 1rem',
              display: 'inline-block'
            }}>
              ⚡ ROI de 300% garantido
            </span>
            <span style={{
              background: 'rgba(255,255,255,0.2)',
              padding: '0.5rem 1rem',
              borderRadius: '25px',
              margin: '0 1rem',
              display: 'inline-block'
            }}>
              🎯 Apenas 20 vagas/mês
            </span>
            <span style={{
              background: 'rgba(255,255,255,0.2)',
              padding: '0.5rem 1rem',
              borderRadius: '25px',
              margin: '0 1rem',
              display: 'inline-block'
            }}>
              🔒 100% Gratuito
            </span>
          </div>
          <a href="#lead-form" className="cta-button" style={{
            background: '#fff',
            color: '#1e90ff',
            fontSize: '1.2rem',
            padding: '1rem 2rem',
            fontWeight: 700,
            boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
            textDecoration: 'none',
            borderRadius: '8px',
            display: 'inline-block'
          }}>
            Quero Meu Diagnóstico Gratuito Agora
          </a>
          <p style={{
            marginTop: '1rem',
            fontSize: '0.9rem',
            opacity: 0.8
          }}>
            ⏰ <strong>Restam apenas 12 vagas este mês.</strong> Não perca esta oportunidade!
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer" id="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <img src="/assets/images/logo_prompts360.png" alt="Prompts360 Logo" className="logo mb-2" loading="lazy" />
              <p>Modernizamos Clínicas, Escolas e Escritórios Jurídicos com IA, Automação e Tecnologia para gerar mais lucro e eficiência.</p>
            </div>
            
            <div className="footer-section">
              <h4>Soluções por Setor</h4>
              <a href="#services">Automação para Clínicas</a>
              <a href="#services">Tecnologia para Educação</a>
              <a href="#services">Automação Jurídica</a>
              <a href="#services">Marketing Digital Inteligente</a>
              <a href="#services">Chatbots & Assistentes</a>
              <a href="#services">Automação de Processos</a>
              <a href="#services">Analytics & BI</a>
            </div>
            
            <div className="footer-section">
              <h4>Empresa</h4>
              <a href="#benefits">Sobre Nós</a>
              <a href="#cases-section">Cases de Sucesso</a>
              <a href="#footer">Contato</a>
              <a href="#lead-form">Diagnóstico Gratuito</a>
            </div>
            
            <div className="footer-section">
              <h4>Contato</h4>
              <p>Email: contato@prompts360.com</p>
              <p>Telefone: (81) 97100-9601</p>
              <p>Local: Recife, Brasil</p>
            </div>
          </div>
          
          <div className="footer-bottom">
            <p>&copy; 2024 Prompts360. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>

      {/* CTA Flutuante do E-book */}
      {showFloatingCTA && (
        <div className="floating-ebook-cta" style={{
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
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          marginBottom: '0.5rem'
        }}>
          <div style={{
            width: '40px',
            height: '50px',
            background: 'url(/assets/images/foto_ebook_tiny.webp) center/cover',
            borderRadius: '4px',
            flexShrink: 0
          }}></div>
          <div>
            <div style={{
              fontSize: '0.9rem',
              fontWeight: '700',
              lineHeight: '1.2'
            }}>
              E-book Grátis 🎁
            </div>
            <div style={{
              fontSize: '0.8rem',
              opacity: '0.9'
            }}>
              200+ Prompts de IA
            </div>
          </div>
        </div>
        
        <div style={{
          display: 'flex',
          gap: '0.5rem'
        }}>
          <a href="#lead-form" style={{
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
          }}>
            GRÁTIS
          </a>
          <a href="https://pay.kiwify.com.br/seu-link-ebook" target="_blank" rel="noreferrer" style={{
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
          }}>
            R$ 9,97
          </a>
        </div>
      </div>
      )}
    </div>
  )
}

export default App
