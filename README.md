# Landing Page - Prompts360 | Arquitetura Limpa 🏗️

Landing page moderna e componentizada para a Prompts360, agência especializada em automação com IA. Implementada com **Clean Architecture** para máxima manutenibilidade e escalabilidade.

## 🎯 Características

- ✅ **Arquitetura Limpa** - Código modular e organizado
- ✅ **100% Compatível** - Mantém funcionalidade original
- ✅ **Design Responsivo** - Otimizado para todos os dispositivos  
- ✅ **Performance Otimizada** - Loading inteligente e animações suaves
- ✅ **Analytics Integrado** - Google Analytics + Facebook Pixel
- ✅ **Formulário Inteligente** - Validação em tempo real + Google Sheets
- ✅ **SEO Otimizado** - Meta tags e estrutura semântica

## 🏛️ Nova Arquitetura

### Estrutura Componentizada
```
js/
├── core/                    # Núcleo (EventBus, Config, Utils)
├── domain/                  # Entidades (Lead, AnalyticsEvent)
├── infrastructure/          # Repositórios (Sheets, Analytics)
├── application/             # Use Cases (Business Logic)
├── presentation/            # Componentes UI + Páginas
└── app.js                   # Aplicação Principal
```

### Benefícios da Nova Arquitetura
- 🔧 **Fácil Manutenção** - Código organizado por responsabilidades
- 🧪 **Testável** - Componentes isolados e testáveis
- 🔄 **Reutilizável** - Componentes podem ser reutilizados
- 📈 **Escalável** - Fácil adicionar novas funcionalidades
- 🛡️ **Robusto** - Tratamento de erros e fallbacks automáticos

## 📁 Estrutura do Projeto

```
LandingPagePromptEbook/
├── css/                     # Estilos
│   ├── prompts360-final.css    # Estilos principais
│   └── conversion-boost.css    # Otimizações de conversão
├── js/                      # JavaScript - Arquitetura Limpa
│   ├── core/               # Núcleo da aplicação
│   ├── domain/             # Entidades de negócio
│   ├── infrastructure/     # Integrações externas
│   ├── application/        # Casos de uso
│   ├── presentation/       # Componentes UI
│   ├── app.js             # App principal
│   ├── main-componentized.js   # Main híbrido
│   └── *.js               # Scripts originais (fallback)
├── img/                    # Imagens otimizadas
├── tests/                  # Testes automatizados
├── index.html             # Página principal
├── ARQUITETURA.md         # Documentação da arquitetura
└── package.json           # Dependências e scripts
```

## 🚀 Como Usar

### Início Rápido
```bash
# 1. Clone o repositório
git clone [repo-url]

# 2. Instale dependências (opcional - para testes)
npm install

# 3. Abra index.html no navegador
# A aplicação funciona sem servidor local
```

### Desenvolvimento
```bash
# Servidor local para desenvolvimento
npm run dev

# Executar testes
npm test

# Testes E2E
npm run test:e2e

# Análise de performance
npm run test:lighthouse
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
