// Tipos para dados da aplicação
export interface Lead {
  name: string;
  email: string;
  phone?: string;
  message?: string;
  source?: string;
  timestamp: Date;
}

export interface CaseStudy {
  id: string;
  title: string;
  description: string;
  videoUrl?: string;
  imageUrl?: string;
  results: {
    metric: string;
    value: string;
    description: string;
  }[];
  category: string;
  featured: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  avatar?: string;
  rating: number;
  featured: boolean;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  description: string;
  price: {
    monthly: number;
    yearly: number;
  };
  features: string[];
  popular: boolean;
  badge?: string;
}

export interface AnalyticsEvent {
  event: string;
  category: string;
  label?: string;
  value?: number;
  customParameters?: Record<string, any>;
}

// Tipos para componentes
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

export interface SectionProps extends BaseComponentProps {
  id?: string;
  containerClassName?: string;
}

export interface ButtonProps extends BaseComponentProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  href?: string;
  target?: string;
  type?: 'button' | 'submit' | 'reset';
}

export interface VideoProps {
  src: string;
  poster?: string;
  autoplay?: boolean;
  muted?: boolean;
  loop?: boolean;
  controls?: boolean;
  className?: string;
  onPlay?: () => void;
  onPause?: () => void;
  onEnded?: () => void;
}

export interface FormFieldProps {
  name: string;
  label: string;
  type?: 'text' | 'email' | 'tel' | 'textarea';
  placeholder?: string;
  required?: boolean;
  error?: string;
  value?: string;
  onChange?: (value: string) => void;
}

// Tipos para hooks
export interface UseIntersectionObserverProps {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export interface UseAnalyticsProps {
  trackingId?: string;
  enabled?: boolean;
}

// Tipos para configuração
export interface AppConfig {
  analytics: {
    googleAnalyticsId?: string;
    facebookPixelId?: string;
    enabled: boolean;
  };
  api: {
    sheetsIntegration: {
      enabled: boolean;
      spreadsheetId?: string;
    };
    formSubmission: {
      endpoint: string;
    };
  };
  features: {
    videoLazyLoading: boolean;
    smoothScrolling: boolean;
    darkMode: boolean;
  };
}

// Tipos para navegação
export interface NavigationItem {
  label: string;
  href: string;
  external?: boolean;
}

// Tipos para formulários
export interface FormData {
  [key: string]: string | number | boolean;
}

export interface FormErrors {
  [key: string]: string;
}

export interface FormState {
  data: FormData;
  errors: FormErrors;
  isSubmitting: boolean;
  isSuccess: boolean;
}

// Tipos para animações
export interface AnimationConfig {
  duration?: number;
  delay?: number;
  ease?: string;
  repeat?: number;
}

export interface ScrollAnimationProps {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
  animation?: AnimationConfig;
}

// Tipos para mídia
export interface MediaBreakpoints {
  sm: number;
  md: number;
  lg: number;
  xl: number;
  '2xl': number;
}

// Tipos para resposta da API
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Tipos para contexto
export interface AppContextType {
  config: AppConfig;
  isLoading: boolean;
  error?: string;
  updateConfig: (config: Partial<AppConfig>) => void;
}

// Tipos de eventos customizados
export interface CustomEventDetail {
  type: string;
  payload?: any;
}

export interface CustomEvent {
  detail: CustomEventDetail;
}
