// Motion Design System - Tokens de Animação
// Baseado nas diretrizes do MotionExpert

export const motionTokens = {
  // Durações (em ms)
  duration: {
    instant: 100,
    fast: 200,
    normal: 300,
    slow: 500,
    slower: 800
  },

  // Easing curves - Material Design + Custom
  easing: {
    // Entrada suave
    easeOut: 'cubic-bezier(0.0, 0.0, 0.2, 1)',
    // Saída suave
    easeIn: 'cubic-bezier(0.4, 0.0, 1, 1)',
    // Padrão balanceado
    easeInOut: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
    // Bounce suave
    easeOutBack: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
    // Elástico sutil
    easeOutElastic: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'
  },

  // Propriedades de transformação
  scale: {
    subtle: 1.02,
    normal: 1.05,
    emphasis: 1.1
  },

  // Deslocamentos para microinterações
  translate: {
    subtle: 2,
    normal: 4,
    emphasis: 8
  }
};

// Hooks personalizados para animações
export const useMotion = () => {
  return {
    // Animação de entrada padrão
    fadeInUp: {
      initial: { opacity: 0, transform: 'translateY(20px)' },
      animate: { opacity: 1, transform: 'translateY(0)' },
      transition: `all ${motionTokens.duration.normal}ms ${motionTokens.easing.easeOut}`
    },

    // Hover interativo
    hover: {
      transform: `scale(${motionTokens.scale.subtle})`,
      transition: `transform ${motionTokens.duration.fast}ms ${motionTokens.easing.easeOut}`
    },

    // Press feedback
    press: {
      transform: 'scale(0.98)',
      transition: `transform ${motionTokens.duration.instant}ms ${motionTokens.easing.easeInOut}`
    },

    // Stagger para listas
    stagger: (index: number) => ({
      animationDelay: `${index * 100}ms`
    }),

    // Parallax sutil
    parallax: (speed: number = 0.5) => ({
      transform: `translateY(${speed}px)`,
      transition: 'transform 0.1s linear'
    })
  };
};

// CSS-in-JS para animações globais
export const globalAnimationStyles = `
  /* Animações de entrada */
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes slideInLeft {
    from {
      opacity: 0;
      transform: translateX(-30px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

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

  /* Microinterações */
  @keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
  }

  @keyframes wiggle {
    0%, 7%, 14%, 21% { transform: rotate(-3deg); }
    3.5%, 10.5%, 17.5% { transform: rotate(3deg); }
    25% { transform: rotate(0deg); }
  }

  @keyframes shimmer {
    0% { left: -100%; }
    100% { left: 100%; }
  }

  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
  }

  /* Loaders */
  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  @keyframes bounce {
    0%, 20%, 53%, 80%, 100% { transform: translateY(0); }
    40%, 43% { transform: translateY(-30px); }
    70% { transform: translateY(-15px); }
    90% { transform: translateY(-4px); }
  }

  /* Classes utilitárias */
  .animate-fade-in-up {
    animation: fadeInUp ${motionTokens.duration.normal}ms ${motionTokens.easing.easeOut};
  }

  .animate-slide-in-left {
    animation: slideInLeft ${motionTokens.duration.normal}ms ${motionTokens.easing.easeOut};
  }

  .animate-slide-in-right {
    animation: slideInRight ${motionTokens.duration.normal}ms ${motionTokens.easing.easeOut};
  }

  .animate-pulse {
    animation: pulse 2s infinite;
  }

  .animate-float {
    animation: float 3s ease-in-out infinite;
  }

  /* Stagger delays */
  .stagger-1 { animation-delay: 100ms; }
  .stagger-2 { animation-delay: 200ms; }
  .stagger-3 { animation-delay: 300ms; }
  .stagger-4 { animation-delay: 400ms; }
  .stagger-5 { animation-delay: 500ms; }

  /* Transições de hover */
  .hover-lift {
    transition: transform ${motionTokens.duration.fast}ms ${motionTokens.easing.easeOut};
  }
  .hover-lift:hover {
    transform: translateY(-${motionTokens.translate.normal}px);
  }

  .hover-scale {
    transition: transform ${motionTokens.duration.fast}ms ${motionTokens.easing.easeOut};
  }
  .hover-scale:hover {
    transform: scale(${motionTokens.scale.subtle});
  }

  /* Acessibilidade - respeitar prefers-reduced-motion */
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }
`;

// Função para aplicar motion com fallback de acessibilidade
export const applyMotion = (styles: string) => {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  return prefersReduced ? '' : styles;
};
