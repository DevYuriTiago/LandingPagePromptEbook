import React from 'react';

interface FormStepProps {
  currentStep: number;
  totalSteps: number;
  formData: any;
  updateFormData: (field: string, value: string) => void;
  formatPhone: (phone: string) => string;
}

export const FormStep: React.FC<FormStepProps> = ({
  currentStep,
  totalSteps,
  formData,
  updateFormData,
  formatPhone
}) => {
  const inputStyle = {
    width: '100%',
    padding: '0.75rem 1rem',
    borderRadius: '8px',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    background: 'rgba(255, 255, 255, 0.05)',
    color: 'white',
    fontSize: '1rem',
    transition: 'all 0.3s ease',
    outline: 'none'
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '0.5rem',
    fontWeight: '600' as const,
    fontSize: '0.9rem',
    color: 'rgba(255, 255, 255, 0.9)'
  };

  const stepStyle = {
    opacity: 1,
    transform: 'translateX(0)',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    animation: 'slideInRight 0.3s ease-out'
  };

  // Renderizar step atual
  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div style={stepStyle}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: '#87CEEB' }}>
                👋 Vamos nos conhecer!
              </h3>
              <p style={{ opacity: 0.8, fontSize: '0.9rem' }}>
                Primeiro, precisamos dos seus dados de contato
              </p>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label htmlFor="name" style={labelStyle}>
                Nome Completo *
              </label>
              <input 
                type="text" 
                id="name" 
                value={formData.name}
                onChange={(e) => updateFormData('name', e.target.value)}
                style={{
                  ...inputStyle,
                  borderColor: formData.name ? 'rgba(135, 206, 235, 0.5)' : 'rgba(255, 255, 255, 0.2)'
                }}
                placeholder="Ex: João Silva"
                autoFocus
              />
            </div>
            
            <div style={{ marginBottom: '1.5rem' }}>
              <label htmlFor="email" style={labelStyle}>
                E-mail Corporativo *
              </label>
              <input 
                type="email" 
                id="email"
                value={formData.email}
                onChange={(e) => updateFormData('email', e.target.value)}
                style={{
                  ...inputStyle,
                  borderColor: formData.email ? 'rgba(135, 206, 235, 0.5)' : 'rgba(255, 255, 255, 0.2)'
                }}
                placeholder="joao@empresa.com"
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div style={stepStyle}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: '#87CEEB' }}>
                🏢 Sobre sua empresa
              </h3>
              <p style={{ opacity: 0.8, fontSize: '0.9rem' }}>
                Agora queremos conhecer seu negócio
              </p>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label htmlFor="phone" style={labelStyle}>
                Telefone/WhatsApp *
              </label>
              <input 
                type="tel" 
                id="phone"
                value={formData.phone}
                onChange={(e) => updateFormData('phone', e.target.value)}
                onBlur={(e) => updateFormData('phone', formatPhone(e.target.value))}
                style={{
                  ...inputStyle,
                  borderColor: formData.phone ? 'rgba(135, 206, 235, 0.5)' : 'rgba(255, 255, 255, 0.2)'
                }}
                placeholder="(11) 9.9999-9999"
              />
            </div>
            
            <div style={{ marginBottom: '1.5rem' }}>
              <label htmlFor="company" style={labelStyle}>
                Nome da Empresa *
              </label>
              <input 
                type="text" 
                id="company"
                value={formData.company}
                onChange={(e) => updateFormData('company', e.target.value)}
                style={{
                  ...inputStyle,
                  borderColor: formData.company ? 'rgba(135, 206, 235, 0.5)' : 'rgba(255, 255, 255, 0.2)'
                }}
                placeholder="Ex: Clínica Saúde Total"
              />
            </div>
            
            <div style={{ marginBottom: '1.5rem' }}>
              <label htmlFor="position" style={labelStyle}>
                Seu Cargo *
              </label>
              <input 
                type="text" 
                id="position"
                value={formData.position}
                onChange={(e) => updateFormData('position', e.target.value)}
                style={{
                  ...inputStyle,
                  borderColor: formData.position ? 'rgba(135, 206, 235, 0.5)' : 'rgba(255, 255, 255, 0.2)'
                }}
                placeholder="Ex: Diretor, Sócio, Gerente"
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div style={stepStyle}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: '#87CEEB' }}>
                🎯 Seus desafios
              </h3>
              <p style={{ opacity: 0.8, fontSize: '0.9rem' }}>
                Para personalizar nossa proposta
              </p>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label htmlFor="sector" style={labelStyle}>
                Tipo de Empresa *
              </label>
              <select 
                id="sector"
                value={formData.sector}
                onChange={(e) => updateFormData('sector', e.target.value)}
                style={{
                  ...inputStyle,
                  borderColor: formData.sector ? 'rgba(135, 206, 235, 0.5)' : 'rgba(255, 255, 255, 0.2)',
                  cursor: 'pointer'
                }}
              >
                <option value="" style={{ background: '#2a2a2a', color: 'white' }}>
                  Selecione seu setor
                </option>
                <option value="clinica" style={{ background: '#2a2a2a', color: 'white' }}>
                  🏥 Clínica Médica / Odontológica / Veterinária
                </option>
                <option value="educacao" style={{ background: '#2a2a2a', color: 'white' }}>
                  🎓 Escola / Universidade / Curso
                </option>
                <option value="juridico" style={{ background: '#2a2a2a', color: 'white' }}>
                  ⚖️ Escritório Jurídico / Advocacia
                </option>
                <option value="consultoria" style={{ background: '#2a2a2a', color: 'white' }}>
                  💼 Consultoria / Prestação de Serviços
                </option>
                <option value="other" style={{ background: '#2a2a2a', color: 'white' }}>
                  🏪 Outro setor de serviços
                </option>
              </select>
            </div>
            
            <div style={{ marginBottom: '1.5rem' }}>
              <label htmlFor="challenge" style={labelStyle}>
                Qual seu maior desafio hoje? *
              </label>
              <textarea 
                id="challenge"
                value={formData.challenge}
                onChange={(e) => updateFormData('challenge', e.target.value)}
                style={{
                  ...inputStyle,
                  minHeight: '100px',
                  resize: 'vertical' as const,
                  borderColor: formData.challenge ? 'rgba(135, 206, 235, 0.5)' : 'rgba(255, 255, 255, 0.2)'
                }}
                placeholder="Ex: Muitos processos manuais, dificuldade em controlar custos, perda de clientes..."
                rows={4}
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <>
      {/* Indicador de progresso */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <span style={{ fontSize: '0.9rem', opacity: 0.7 }}>
            Etapa {currentStep} de {totalSteps}
          </span>
          <span style={{ fontSize: '0.9rem', opacity: 0.7 }}>
            {Math.round((currentStep / totalSteps) * 100)}%
          </span>
        </div>
        <div style={{
          width: '100%',
          height: '4px',
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '2px',
          overflow: 'hidden'
        }}>
          <div style={{
            width: `${(currentStep / totalSteps) * 100}%`,
            height: '100%',
            background: 'linear-gradient(90deg, #1E90FF, #87CEEB)',
            borderRadius: '2px',
            transition: 'width 0.3s ease-out'
          }} />
        </div>
      </div>

      {/* Conteúdo do step */}
      {renderCurrentStep()}

      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes slideInRight {
            from {
              opacity: 0;
              transform: translateX(30px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }
          
          input:focus, select:focus, textarea:focus {
            border-color: #87CEEB !important;
            box-shadow: 0 0 0 3px rgba(135, 206, 235, 0.1) !important;
          }
          
          select option {
            background: #2a2a2a;
            color: white;
          }
        `
      }} />
    </>
  );
};
