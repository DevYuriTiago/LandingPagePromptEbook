// Configurações e constantes centralizadas
export const CONFIG = {
  // Durações de animação
  DURATION: {
    FAST: 150,
    NORMAL: 300,
    SLOW: 500,
    LOADING_SIMULATION: 100
  },

  // IDs das seções
  SECTIONS: {
    HEADER: 'header',
    SERVICES: 'services',
    BENEFITS: 'benefits',
    CASES: 'cases-section',
    LEAD_FORM: 'lead-form',
    FOOTER: 'footer'
  },

  // Configurações de scroll
  SCROLL: {
    HEADER_TRIGGER: 50,
    FLOATING_CTA_TRIGGER: 0.8, // 80% da altura da tela
    INTERSECTION_THRESHOLD: 0.1,
    VIDEO_THRESHOLD: 0.25
  },

  // URLs e caminhos
  ASSETS: {
    LOGO: '/assets/images/logo_prompts360.png',
    HERO_VIDEO: '/assets/video/backgrounds/video_back.mp4',
    CASES_VIDEOS: {
      CASE1: '/assets/video/cases/case1.mp4',
      CASE2: '/assets/video/cases/case2.mp4',
      CASE3: '/assets/video/cases/case3.mp4'
    }
  },

  // Configurações de performance
  PERFORMANCE: {
    MARQUEE_PAUSE_THRESHOLD: 0.1,
    VIDEO_LAZY_LOAD: true,
    REDUCE_MOTION_MOBILE: true
  }
} as const;

// Mapeamento setor -> interesse para o formulário
export const SECTOR_TO_INTEREST: Record<string, string> = {
  'tecnologia': 'tech-innovation',
  'saude': 'health-wellness', 
  'educacao': 'education',
  'varejo': 'retail-commerce',
  'servicos': 'services',
  'consultoria': 'consulting'
} as const;
