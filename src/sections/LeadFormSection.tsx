import React, { useState } from 'react';
import { ScrollReveal } from '../components/ScrollReveal';

export const LeadFormSection: React.FC = () => {
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [formSuccess, setFormSuccess] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    position: '',
    sector: '',
    challenge: ''
  });

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setFormError(null); // Limpar erro ao digitar
  };

  const validateStep = (step: number) => {
    switch (step) {
      case 1:
        if (!formData.name.trim()) return 'Por favor, informe seu nome completo';
        if (!isValidEmail(formData.email)) return 'Por favor, informe um e-mail válido';
        return null;
      case 2:
        if (!isValidPhone(formData.phone)) return 'Por favor, informe um telefone válido';
        if (!formData.company.trim()) return 'Por favor, informe o nome da sua empresa';
        if (!formData.position.trim()) return 'Por favor, informe seu cargo';
        return null;
      case 3:
        if (!formData.sector) return 'Por favor, selecione o tipo da sua empresa';
        if (!formData.challenge.trim()) return 'Por favor, descreva seu principal desafio';
        return null;
      default:
        return null;
    }
  };

  const nextStep = () => {
    const error = validateStep(currentStep);
    if (error) {
      setFormError(error);
      return;
    }
    setFormError(null);
    setCurrentStep(prev => Math.min(prev + 1, 3));
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
    setFormError(null);
  };

  const isValidEmail = (email: string): boolean => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const isValidPhone = (phone: string): boolean => {
    const cleanPhone = phone.replace(/\D/g, '');
    return cleanPhone.length >= 10;
  };

  const formatPhone = (phone: string): string => {
    const numbers = phone.replace(/\D/g, '');
    if (numbers.length === 11) {
      return numbers.replace(/(\d{2})(\d{1})(\d{4})(\d{4})/, '($1) $2.$3-$4');
    } else if (numbers.length === 10) {
      return numbers.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    }
    return phone;
  };

  const submitLead = async (data: any) => {
    // Simular envio para Google Sheets
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log('Lead enviado:', data);
  };

  return (
    <section className="section ebook-section" id="lead-form">
      <div 
        className="cool-blob-1" 
        style={{
          position: 'absolute',
          top: '10%',
          left: '5%',
          width: '200px',
          height: '200px',
          background: 'linear-gradient(45deg, #ff6b6b, #ee5a24)',
          borderRadius: '50%',
          filter: 'blur(40px)',
          opacity: 0.1,
          zIndex: 0
        }}
      ></div>
      <div 
        className="cool-blob-2"
        style={{
          position: 'absolute',
          bottom: '10%',
          right: '5%',
          width: '150px',
          height: '150px',
          background: 'linear-gradient(45deg, #1e90ff, #8a2be2)',
          borderRadius: '50%',
          filter: 'blur(30px)',
          opacity: 0.1,
          zIndex: 0
        }}
      ></div>
      
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="section-header" style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 className="section-title" style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
            🎯 Diagnóstico Gratuito / E-book Exclusivo
          </h2>
          <p className="section-subtitle" style={{ fontSize: '1.2rem', opacity: 0.8 }}>
            Receba uma análise personalizada do seu negócio e ganhe nosso guia completo de prompts para IA
          </p>
        </div>
        
        {/* Layout com duas colunas: Formulário + E-book */}
        <div 
          className="ebook-form-wrapper"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '3rem',
            alignItems: 'start',
            maxWidth: '1200px',
            margin: '0 auto'
          }}
        >
          {/* Coluna Esquerda: Formulário */}
          <div className="form-section">
            <div 
              className="form-header"
              style={{
                textAlign: 'center',
                marginBottom: '2rem'
              }}
            >
              <h3 style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>🔍 Análise Gratuita</h3>
              <p style={{ opacity: 0.8 }}>Descubra quanto seu negócio pode crescer com IA</p>
            </div>
            
            <form 
              className="lead-form glass-effect"
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '16px',
                padding: '2rem',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
              }}
              onSubmit={async (e) => {
                e.preventDefault();
                setFormError(null);
                setFormSuccess(false);
                const form = e.target as HTMLFormElement;
                const data = new FormData(form);
                const name = String(data.get('name') || '').trim();
                const email = String(data.get('email') || '').trim();
                const phone = String(data.get('phone') || '').trim();
                const company = String(data.get('company') || '').trim();
                const position = String(data.get('position') || '').trim();
                const sector = String(data.get('sector') || '').trim();
                const challenge = String(data.get('challenge') || '').trim();

                // Validações básicas
                if (!name) return setFormError('Informe seu nome.');
                if (!isValidEmail(email)) return setFormError('Informe um e-mail válido.');
                if (!isValidPhone(phone)) return setFormError('Informe um telefone válido.');
                if (!company) return setFormError('Informe sua empresa.');
                if (!position) return setFormError('Informe seu cargo.');
                if (!sector) return setFormError('Selecione o tipo de empresa.');
                if (!challenge) return setFormError('Descreva seu principal desafio.');

                setFormLoading(true);
                try {
                  await submitLead({ 
                    name, email, phone, company, position, 
                    interest: sector, sector, challenge, source: 'landing' 
                  });
                  setFormSuccess(true);
                  form.reset();
                } catch (err) {
                  setFormError('Não foi possível enviar. Tente novamente.');
                } finally {
                  setFormLoading(false);
                }
              }}
            >
              <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                <label htmlFor="name" className="form-label" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                  Nome Completo *
                </label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  className="form-input"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    borderRadius: '8px',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    background: 'rgba(255, 255, 255, 0.05)',
                    color: 'white',
                    fontSize: '1rem'
                  }}
                  required 
                />
              </div>
              
              <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                <label htmlFor="email" className="form-label" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                  E-mail Corporativo *
                </label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  className="form-input"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    borderRadius: '8px',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    background: 'rgba(255, 255, 255, 0.05)',
                    color: 'white',
                    fontSize: '1rem'
                  }}
                  required 
                />
              </div>
              
              <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                <label htmlFor="phone" className="form-label" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                  Telefone *
                </label>
                <input 
                  type="tel" 
                  id="phone" 
                  name="phone" 
                  className="form-input"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    borderRadius: '8px',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    background: 'rgba(255, 255, 255, 0.05)',
                    color: 'white',
                    fontSize: '1rem'
                  }}
                  placeholder="(00) 0.0000-0000"
                  onBlur={(e) => { 
                    e.currentTarget.value = formatPhone(e.currentTarget.value);
                  }}
                  required 
                />
              </div>
              
              <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                <label htmlFor="company" className="form-label" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                  Empresa *
                </label>
                <input 
                  type="text" 
                  id="company" 
                  name="company" 
                  className="form-input"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    borderRadius: '8px',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    background: 'rgba(255, 255, 255, 0.05)',
                    color: 'white',
                    fontSize: '1rem'
                  }}
                  required 
                />
              </div>
              
              <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                <label htmlFor="position" className="form-label" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                  Cargo *
                </label>
                <input 
                  type="text" 
                  id="position" 
                  name="position" 
                  className="form-input"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    borderRadius: '8px',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    background: 'rgba(255, 255, 255, 0.05)',
                    color: 'white',
                    fontSize: '1rem'
                  }}
                  required 
                />
              </div>
              
              <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                <label htmlFor="sector" className="form-label" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                  Tipo de Empresa *
                </label>
                <select 
                  id="sector" 
                  name="sector" 
                  className="form-select"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    borderRadius: '8px',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    background: 'rgba(255, 255, 255, 0.05)',
                    color: 'white',
                    fontSize: '1rem'
                  }}
                  required
                >
                  <option value="">Selecione seu setor</option>
                  <option value="clinica">Clínica Médica / Odontológica / Veterinária</option>
                  <option value="educacao">Escola / Universidade / Curso</option>
                  <option value="juridico">Escritório Jurídico / Advocacia</option>
                  <option value="consultoria">Consultoria / Prestação de Serviços</option>
                  <option value="other">Outro setor de serviços</option>
                </select>
              </div>
              
              <div className="form-group" style={{ marginBottom: '2rem' }}>
                <label htmlFor="challenge" className="form-label" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                  Qual seu maior desafio hoje? *
                </label>
                <textarea 
                  id="challenge" 
                  name="challenge" 
                  className="form-textarea"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    borderRadius: '8px',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    background: 'rgba(255, 255, 255, 0.05)',
                    color: 'white',
                    fontSize: '1rem',
                    resize: 'vertical',
                    minHeight: '80px'
                  }}
                  rows={3} 
                  placeholder="Ex: Muitos processos manuais, dificuldade em controlar custos..."
                  required
                ></textarea>
              </div>
              
              <button 
                type="submit" 
                className="cta-button"
                style={{
                  width: '100%',
                  padding: '1rem',
                  fontSize: '1.1rem',
                  fontWeight: '700',
                  background: formLoading 
                    ? 'rgba(30, 144, 255, 0.6)' 
                    : 'linear-gradient(135deg, #ff6b6b, #ee5a24)',
                  border: 'none',
                  borderRadius: '8px',
                  color: 'white',
                  cursor: formLoading ? 'not-allowed' : 'pointer',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                disabled={formLoading}
                onMouseEnter={(e) => {
                  if (!formLoading) {
                    e.currentTarget.style.transform = 'scale(1.02)';
                    e.currentTarget.style.boxShadow = '0 6px 20px rgba(255, 107, 107, 0.4)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!formLoading) {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = 'none';
                  }
                }}
              >
                {formLoading ? (
                  <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                    <div
                      style={{
                        width: '16px',
                        height: '16px',
                        border: '2px solid currentColor',
                        borderTop: '2px solid transparent',
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite'
                      }}
                    />
                    Enviando...
                  </span>
                ) : (
                  'Quero Meu Diagnóstico'
                )}
              </button>
              
              {formError && (
                <p className="form-error" role="alert" style={{ color: '#ff6b6b', marginTop: '0.5rem', textAlign: 'center' }}>
                  {formError}
                </p>
              )}
              {formSuccess && (
                <p className="form-success" role="status" style={{ color: '#00ff88', marginTop: '0.5rem', textAlign: 'center' }}>
                  Recebemos seus dados! Entraremos em contato.
                </p>
              )}
              
              <p className="form-disclaimer" style={{ textAlign: 'center', marginTop: '1rem', fontSize: '0.9rem', opacity: 0.7 }}>
                <small>🔒 Seus dados estão seguros • ⚡ Apenas 20 diagnósticos por mês</small>
              </p>
            </form>
          </div>
          
          {/* Coluna Direita: E-book */}
          <div className="ebook-section-right">
            <div 
              className="ebook-bonus-section"
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '16px',
                padding: '2rem',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
              }}
            >
              {/* Layout horizontal: Imagem + Info lado a lado */}
              <div 
                className="ebook-horizontal-layout"
                style={{
                  display: 'flex',
                  gap: '1.5rem',
                  alignItems: 'flex-start',
                  marginBottom: '2rem'
                }}
              >
                {/* Imagem do E-book (esquerda) */}
                <div className="ebook-visual-compact" style={{ flexShrink: 0 }}>
                  <div 
                    className="ebook-image-container"
                    style={{
                      position: 'relative',
                      width: '120px'
                    }}
                  >
                    <img 
                      src="/assets/images/foto_ebook.webp" 
                      alt="E-book Guia de Prompts" 
                      className="ebook-image"
                      style={{
                        width: '100%',
                        borderRadius: '8px',
                        boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
                      }}
                      loading="lazy" 
                    />
                    <div 
                      className="ebook-glow"
                      style={{
                        position: 'absolute',
                        top: '-5px',
                        left: '-5px',
                        right: '-5px',
                        bottom: '-5px',
                        background: 'linear-gradient(45deg, #ff6b6b, #ffd700)',
                        borderRadius: '12px',
                        zIndex: -1,
                        filter: 'blur(10px)',
                        opacity: 0.3
                      }}
                    ></div>
                  </div>
                </div>
                
                {/* Informações do E-book (direita) */}
                <div className="ebook-info-compact" style={{ flex: 1 }}>
                  <div 
                    className="bonus-highlight"
                    style={{
                      background: '#ff6b6b',
                      color: 'white',
                      padding: '0.25rem 0.75rem',
                      borderRadius: '12px',
                      fontSize: '0.8rem',
                      fontWeight: '600',
                      display: 'inline-block',
                      marginBottom: '1rem'
                    }}
                  >
                    🎁 Últimas unidades!
                  </div>
                  
                  <h3 className="ebook-title" style={{ fontSize: '1.3rem', marginBottom: '0.5rem', fontWeight: '700' }}>
                    E-book: "Guia Definitivo de Prompts para IA"
                  </h3>
                  <p className="ebook-description" style={{ fontSize: '0.9rem', opacity: 0.8, marginBottom: '1rem' }}>
                    Mais de 200 prompts testados para ChatGPT, Claude, Gemini e outras IAs, organizados por área de negócio.
                  </p>
                </div>
              </div>
              
              {/* Features em linha horizontal */}
              <div 
                className="ebook-features-horizontal"
                style={{
                  display: 'flex',
                  gap: '1rem',
                  marginBottom: '2rem'
                }}
              >
                <div className="feature-item-compact" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flex: 1 }}>
                  <span className="feature-icon" style={{ fontSize: '1.2rem' }}>📊</span>
                  <div className="feature-text" style={{ fontSize: '0.8rem' }}>
                    <div style={{ fontWeight: '600' }}>200+ Prompts</div>
                    <div style={{ opacity: 0.7 }}>Testados e aprovados</div>
                  </div>
                </div>
                <div className="feature-item-compact" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flex: 1 }}>
                  <span className="feature-icon" style={{ fontSize: '1.2rem' }}>🎯</span>
                  <div className="feature-text" style={{ fontSize: '0.8rem' }}>
                    <div style={{ fontWeight: '600' }}>Por Categoria</div>
                    <div style={{ opacity: 0.7 }}>Organizados por área</div>
                  </div>
                </div>
                <div className="feature-item-compact" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flex: 1 }}>
                  <span className="feature-icon" style={{ fontSize: '1.2rem' }}>⚡</span>
                  <div className="feature-text" style={{ fontSize: '0.8rem' }}>
                    <div style={{ fontWeight: '600' }}>Aplicação Prática</div>
                    <div style={{ opacity: 0.7 }}>Exemplos reais de uso</div>
                  </div>
                </div>
              </div>
              
              <div className="ebook-how-it-works">
                <h4 style={{ fontSize: '1.1rem', marginBottom: '0.75rem' }}>🔥 Como Funciona:</h4>
                <p style={{ fontSize: '0.9rem', marginBottom: '1.5rem', opacity: 0.8 }}>
                  Feche qualquer projeto conosco e receba o e-book <strong>gratuitamente</strong> como bônus. 
                  Não quer fechar projeto agora? Pode adquirir separadamente por apenas R$ 9,97.
                </p>
                
                {/* CTAs do E-book */}
                <div className="ebook-ctas" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  <a 
                    href="#lead-form" 
                    className="cta-button primary-ebook-cta"
                    style={{
                      background: 'linear-gradient(135deg, #ff6b6b, #ee5a24)',
                      color: 'white',
                      padding: '0.75rem 1.5rem',
                      borderRadius: '8px',
                      textDecoration: 'none',
                      fontWeight: '600',
                      fontSize: '0.95rem',
                      boxShadow: '0 4px 15px rgba(255, 107, 107, 0.3)',
                      transition: 'all 0.3s ease',
                      display: 'inline-block',
                      flex: 1,
                      textAlign: 'center'
                    }}
                  >
                    🎁 Quero o E-book GRÁTIS + Projeto
                  </a>
                  
                  <a 
                    href="https://pay.kiwify.com.br/seu-link-ebook" 
                    target="_blank" 
                    rel="noreferrer" 
                    className="cta-button secondary-ebook-cta"
                    style={{
                      background: 'transparent',
                      color: '#ff6b6b',
                      border: '2px solid #ff6b6b',
                      padding: '0.75rem 1.5rem',
                      borderRadius: '8px',
                      textDecoration: 'none',
                      fontWeight: '600',
                      fontSize: '0.95rem',
                      transition: 'all 0.3s ease',
                      display: 'inline-block',
                      flex: 1,
                      textAlign: 'center'
                    }}
                  >
                    📚 Comprar Só o E-book - R$ 9,97
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Estilos globais para animações */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes spin {
            to {
              transform: rotate(360deg);
            }
          }
        `
      }} />
    </section>
  );
};
