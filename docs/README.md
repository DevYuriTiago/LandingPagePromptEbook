# Prompts360 Landing Page - React Version 🚀

Landing page moderna e componentizada para a Prompts360, migrada para **React + TypeScript + Tailwind CSS**. Implementada com arquitetura limpa para máxima manutenibilidade e escalabilidade.

## 🎯 Características

- ✅ **React 18 + TypeScript** - Tecnologia moderna e tipagem segura
- ✅ **Tailwind CSS** - Design system consistente e responsivo
- ✅ **Vite** - Build tool rápido e eficiente
- ✅ **Spline 3D** - Integração com robô 3D interativo
- ✅ **Performance Otimizada** - Loading inteligente e animações suaves
- ✅ **Analytics Integrado** - Google Analytics + Facebook Pixel
- ✅ **Formulário Inteligente** - Validação em tempo real + Google Sheets
- ✅ **SEO Otimizado** - Meta tags e estrutura semântica

## 🚀 Tecnologias

### Core
- **React 18** - Biblioteca principal
- **TypeScript** - Tipagem estática
- **Vite** - Build tool e dev server
- **Tailwind CSS** - Framework CSS utility-first

### Bibliotecas
- **@splinetool/react-spline** - Integração 3D
- **Framer Motion** - Animações avançadas
- **Lucide React** - Ícones modernos
- **Clsx + Tailwind Merge** - Utilitários CSS

## 📁 Estrutura do Projeto React

```
src/
├── components/           # Componentes React
│   └── ui/              # Componentes base (Button, SimpleSpline, etc.)
├── data/                # Dados estáticos
├── lib/                 # Bibliotecas e configurações
├── styles/              # Estilos CSS
├── types/               # Tipos TypeScript
├── utils/               # Funções utilitárias
├── App.tsx              # Componente principal
└── main.tsx             # Entry point

public/                  # Assets estáticos
├── img/                 # Imagens
├── video/               # Vídeos
└── favicon.svg          # Ícone da aplicação
```

## 🏛️ Arquitetura

### Componentes Principais
- **App.tsx** - Aplicação principal com todas as seções
- **SimpleSpline.tsx** - Componente 3D otimizado
- **Button.tsx** - Componente de botão reutilizável
- **Card.tsx** - Componentes de card
- **Spotlight.tsx** - Efeitos visuais

### Features Implementadas
- 🔧 **Hero Section** - Com integração Spline 3D
- 🧪 **Marquee Sections** - Animações fluidas de rolagem
- 🔄 **E-book CTAs** - Chamadas para ação otimizadas
- 📈 **Responsive Design** - Adaptável a todos os dispositivos
- 🛡️ **Performance** - Lazy loading e otimizações

## 🚀 Como Usar

### 1. Instalar Dependências
```bash
npm install
```

### 2. Iniciar Desenvolvimento
```bash
npm run dev
```

### 3. Build para Produção
```bash
npm run build
```

### 4. Preview do Build
```bash
npm run preview
```

## 🔧 Tecnologias Utilizadas

### Frontend
- **HTML5** - Estrutura semântica
- **CSS3** - Estilos modernos com variáveis
- **JavaScript ES6+** - Módulos e classes
- **Arquitetura Limpa** - Organização do código

### Integrações
- **Google Analytics** - Rastreamento de eventos
- **Facebook Pixel** - Conversões
- **Google Sheets** - Captura de leads
- **Intersection Observer** - Animações performáticas

### Ferramentas
- **Jest** - Testes unitários
- **Cypress** - Testes E2E  
- **Lighthouse** - Performance
- **Pa11y** - Acessibilidade
- Lazy loading para imagens
- Animações otimizadas para performance

## SEO

A landing page já vem otimizada para SEO com:
- Meta tags apropriadas
- Estrutura semântica
- Textos otimizados para palavras-chave
- URLs amigáveis
- Imagens com alt text

## Licença

MIT

## 🏗️ Arquitetura Detalhada

### Componentes Principais

#### LoadingScreen
```javascript
// Tela de carregamento inteligente
const loadingScreen = new LoadingScreen();
// Monitora recursos e mostra progresso
```

#### LeadForm  
```javascript
// Formulário com validação avançada
const leadForm = new LeadForm('#leadForm');
// Validação em tempo real + Google Sheets
```

#### ScrollAnimations
```javascript
// Animações baseadas em scroll
const animations = new ScrollAnimations();
// Intersection Observer + fallbacks
```

#### Header
```javascript
// Cabeçalho responsivo
const header = new Header('#header');
// Aparição inteligente + navegação suave
```

### Event-Driven Architecture
```javascript
// Comunicação entre componentes
eventBus.emit('lead:submitted', leadData);
eventBus.on('loading:finished', handleLoadingFinished);
```

### Use Cases (Business Logic)
```javascript
// Submissão de leads
const submitUseCase = new SubmitLeadUseCase();
await submitUseCase.execute(formData);

// Analytics
const analyticsUseCase = new TrackAnalyticsUseCase();
analyticsUseCase.trackCTAClick('header_cta');
```

## 🎨 Personalização

### Configurações Globais
```javascript
// js/core/config.js
export const CONFIG = {
    UI: {
        animationDuration: 600,
        headerShowThreshold: () => window.innerHeight * 0.8
    },
    ANALYTICS: {
        trackingEvents: { /* eventos */ }
    }
};
```

### Adicionando Novo Componente
```javascript
import { BaseComponent } from './presentation/components/BaseComponent.js';

export class MeuComponente extends BaseComponent {
    constructor(selector) {
        super(selector);
    }
    
    setupEventListeners() {
        // Event listeners
    }
    
    render() {
        // Renderização
    }
}
```

### Personalizando Estilos
```css
/* Variáveis CSS para fácil customização */
:root {
    --primary-color: #1E90FF;
    --secondary-color: #00BFFF;
    --bg-color: #0a0a0a;
    /* ... */
}
```

## 📊 Monitoramento & Analytics

### Logs Estruturados
```javascript
// Logs automáticos no console
utils.log('Componente inicializado', 'info');
utils.log('Erro detectado', 'error');
```

### Eventos Rastreados
- ✅ Page views
- ✅ CTA clicks  
- ✅ Scroll depth (25%, 50%, 75%, 100%)
- ✅ Time on page (30s, 1min, 2min, 5min)
- ✅ Form submissions
- ✅ Conversões

### Performance Monitoring
```bash
# Lighthouse CI
npm run test:lighthouse

# Performance report
npm run test:performance
```

## 🔒 Compatibilidade & Fallbacks

### Navegadores Suportados
- Chrome 60+ ✅
- Firefox 60+ ✅  
- Safari 12+ ✅
- Edge 79+ ✅

### Fallbacks Automáticos
- Intersection Observer → Scroll listener
- ES Modules → Script tags tradicionais
- Fetch API → XMLHttpRequest
- CSS Grid → Flexbox

## 🚀 Performance

### Otimizações Implementadas
- ⚡ **Lazy Loading** - Imagens carregam conforme necessário
- ⚡ **Code Splitting** - Componentes modulares
- ⚡ **Resource Hints** - Preload, prefetch, dns-prefetch
- ⚡ **Debounce/Throttle** - Scroll e resize otimizados
- ⚡ **Critical CSS** - CSS crítico inline

### Métricas Típicas
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s  
- **Cumulative Layout Shift**: < 0.1
- **First Input Delay**: < 100ms

## 📚 Documentação

- 📖 **[ARQUITETURA.md](./ARQUITETURA.md)** - Documentação completa da arquitetura
- 🧪 **Tests/** - Exemplos de testes
- 💡 **JSDoc** - Documentação no código

## 🤝 Contribuição

### Setup de Desenvolvimento
```bash
git clone [repo]
cd LandingPagePromptEbook
npm install
npm run dev
```

### Padrões de Código
- Use **JSDoc** para documentação
- Siga **Clean Architecture** principles
- Escreva **testes** para novas funcionalidades
- Mantenha **compatibilidade** com versão anterior

### Pull Requests
1. Fork o projeto
2. Crie feature branch (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas mudanças (`git commit -am 'Adiciona nova funcionalidade'`)
4. Push para branch (`git push origin feature/nova-funcionalidade`)
5. Abra Pull Request

## 📞 Suporte

### Troubleshooting
```javascript
// Verificar se nova arquitetura carregou
console.log(window.app); // Deve existir

// Verificar componentes
console.log(window.app.landingPage.components);

// Verificar eventos
eventBus.emit('test', 'funcionando');
```

### Debug Mode
```javascript
// Habilitar logs detalhados
localStorage.setItem('debug', 'true');
location.reload();
```

---

## 🎉 Resultado

**A nova arquitetura componentizada mantém 100% da funcionalidade e aparência originais, mas com código muito mais organizado, testável e manutenível!**

### Antes vs Depois
- ❌ **Antes**: Código monolítico em poucos arquivos
- ✅ **Depois**: Arquitetura limpa com responsabilidades separadas

- ❌ **Antes**: Difícil manutenção e testes  
- ✅ **Depois**: Componentes isolados e testáveis

- ❌ **Antes**: Acoplamento forte entre funcionalidades
- ✅ **Depois**: Event-driven architecture desacoplada

**Agora você tem uma base sólida para futuras funcionalidades!** 🚀
