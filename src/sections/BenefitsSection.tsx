import React from 'react';
import { ScrollReveal } from '../components/ScrollReveal';

const benefitsList = [
  {
    icon: '🔵',
    title: 'Crescimento com Inteligência',
    description: 'Estrutura e estratégia para escalar com consistência. Você terá uma operação pensada para crescer de forma previsível, com tecnologia, IA e marketing alinhados ao seu negócio.'
  },
  {
    icon: '🟩',
    title: 'Mais Vendas, Mais Resultado',
    description: 'Funis, automação e marketing que convertem. Geramos leads, vendas e autoridade com estratégias práticas, inteligentes e mensuráveis.'
  },
  {
    icon: '🟨',
    title: 'Modernização Completa',
    description: 'Sites, sistemas e plataformas sob medida. Tecnologia sob controle para modernizar processos, otimizar operações e gerar lucro com eficiência.'
  },
  {
    icon: '🟪',
    title: 'Posicionamento de Autoridade',
    description: 'Construímos a sua imagem como referência no seu mercado. Sua marca terá mais força, clareza e reconhecimento, com conteúdo estratégico e marketing que gera percepção de valor.'
  },
  {
    icon: '🔴',
    title: 'Suporte e Acompanhamento Contínuo',
    description: 'Você não fica sozinho depois da entrega. Consultoria, suporte técnico e acompanhamento estratégico para manter sua evolução constante.'
  },
  {
    icon: '🟫',
    title: 'IA Aplicada ao Seu Negócio',
    description: 'Automação inteligente para facilitar sua vida e escalar sua operação. IA para processos, vendas, atendimento e conteúdo, trabalhando a seu favor.'
  }
];

interface BenefitCardProps {
  benefit: typeof benefitsList[0];
}

const BenefitCard: React.FC<BenefitCardProps> = ({ benefit }) => (
  <div className="service-card">
    <div className="service-icon">{benefit.icon}</div>
    <h3 className="service-title">{benefit.title}</h3>
    <p className="service-description">{benefit.description}</p>
  </div>
);

export const BenefitsSection: React.FC = () => {
  return (
    <section className="section" id="benefits">
      <div className="section-connector"></div>
      <div className="container">
        <ScrollReveal animation="fadeInUp" delay={200}>
          <div className="section-header">
            <h2 className="section-title">
              Por Que Escolher a Prompts360 como sua Aceleradora Digital?
            </h2>
            <p className="section-subtitle">
              Transformamos negócios com tecnologia, estratégia e IA aplicada, entregando crescimento real e sustentável
            </p>
          </div>
        </ScrollReveal>
        
        <ScrollReveal animation="fadeIn" delay={500}>
          <div className="marquee-container benefits-marquee">
            <div className="marquee-track pause-on-hover">
              {benefitsList.map((benefit, index) => (
                <BenefitCard key={index} benefit={benefit} />
              ))}
            </div>
            
            {/* Segunda repetição do track */}
            <div className="marquee-track pause-on-hover">
              {benefitsList.map((benefit, index) => (
                <BenefitCard key={`duplicate-${index}`} benefit={benefit} />
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
