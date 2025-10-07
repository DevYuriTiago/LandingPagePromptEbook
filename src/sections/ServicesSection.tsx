import React from 'react';
import { ScrollReveal } from '../components/ScrollReveal';

const servicesList = [
  {
    icon: '🏗️',
    title: 'Estrutura Digital Completa',
    description: 'Sites, Sistemas e Plataformas para negócios modernos. Crie a base sólida que seu negócio precisa para crescer com websites profissionais e sistemas sob medida.',
    features: [
      'Websites profissionais responsivos',
      'Sistemas internos personalizados',
      'Plataformas de vendas integradas',
      'Integrações com ferramentas existentes'
    ]
  },
  {
    icon: '🤖',
    title: 'IA e Automação para Ganhar Escala',
    description: 'Automatize vendas, processos e atendimento com inteligência artificial. Chatbots, funis inteligentes e automação que trabalha por você 24/7.',
    features: [
      'IA para vendas e atendimento',
      'Chatbots inteligentes',
      'Automações de processos',
      'Inteligência comercial avançada'
    ]
  },
  {
    icon: '📊',
    title: 'Otimização de Vendas & Performance',
    description: 'Estratégias de conversão, funis de vendas e otimização de performance. Aumente suas vendas com dados e estratégias baseadas em resultados.',
    features: [
      'Funis de vendas otimizados',
      'Análise de performance avançada',
      'Estratégias de conversão',
      'Testes A/B e otimização'
    ]
  },
  {
    icon: '📈',
    title: 'Funis de Vendas & Jornada do Cliente',
    description: 'Construa sua máquina previsível de geração de clientes. Funis que levam da descoberta à compra de forma automática, mensurável e escalável.',
    features: [
      'Estruturação de funis completos',
      'Automação de leads qualificados',
      'Remarketing inteligente',
      'Acompanhamento de performance'
    ]
  },
  {
    icon: '🎯',
    title: 'Consultoria e Estratégia de Crescimento',
    description: 'Clareza, direcionamento e acompanhamento para seu crescimento. Consultoria contínua com análises, diagnósticos e planos personalizados.',
    features: [
      'Mentoria estratégica contínua',
      'Diagnósticos de negócio',
      'Estratégia comercial personalizada',
      'Planejamento com IA'
    ]
  },
  {
    icon: '⚡',
    title: 'Conteúdo Premium e Posicionamento',
    description: 'Impulsione sua marca com conteúdos que geram desejo e vendas. Conteúdo inteligente para engajar, converter e posicionar como autoridade.',
    features: [
      'Conteúdo estratégico roteirizado',
      'Vídeos e podcasts profissionais',
      'IA criativa para produção',
      'Posicionamento de autoridade'
    ]
  }
];

interface ServiceCardProps {
  service: typeof servicesList[0];
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => (
  <ScrollReveal animation="fadeInUp" delay={100}>
    <div className="service-card">
      <div className="service-icon aurora-text">{service.icon}</div>
      <h3 className="service-title animated-shiny-text">{service.title}</h3>
      <p className="service-description">{service.description}</p>
      <ul className="service-features">
        {service.features.map((feature, index) => (
          <li key={index}>{feature}</li>
        ))}
      </ul>
    </div>
  </ScrollReveal>
);

export const ServicesSection: React.FC = () => {
  return (
    <section className="section cinematic-section" id="services">
      <div className="section-connector"></div>
      <div className="container">
        <ScrollReveal animation="fadeInUp" delay={200}>
          <div className="section-header">
            <h2 className="section-title text-reveal">
              Como Aceleramos Pequenos Negócios e Microinfluenciadores
            </h2>
            <p className="section-subtitle hyper-text">
              Soluções de IA, Automação e Marketing Digital personalizadas para transformar pequenos negócios em grandes estruturas
            </p>
          </div>
        </ScrollReveal>
        
        <ScrollReveal animation="fadeIn" delay={500}>
          <div className="marquee-container services-marquee">
            <div className="marquee-track pause-on-hover">
              {servicesList.map((service, index) => (
                <ServiceCard key={index} service={service} />
              ))}
            </div>
            
            {/* Segunda repetição do track para marquee infinito */}
            <div className="marquee-track pause-on-hover">
              {servicesList.map((service, index) => (
                <ServiceCard key={`duplicate-${index}`} service={service} />
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
