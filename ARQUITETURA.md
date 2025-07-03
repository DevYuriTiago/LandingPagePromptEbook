# 🏗️ Arquitetura Limpa - Landing Page Prompts360

## 📋 Visão Geral

Esta implementação segue os princípios de **Clean Architecture** (Arquitetura Limpa) para criar um código mais modular, testável e maintível. A aplicação foi componentizada mantendo **100% da funcionalidade e aparência originais**.

## 🎯 Benefícios da Nova Arquitetura

- ✅ **Separação de Responsabilidades**: Cada camada tem sua responsabilidade específica
- ✅ **Fácil Manutenção**: Código organizado e bem estruturado
- ✅ **Testabilidade**: Componentes isolados e testáveis
- ✅ **Reutilização**: Componentes podem ser reutilizados
- ✅ **Escalabilidade**: Fácil adicionar novas funcionalidades
- ✅ **Compatibilidade**: Mantém funcionamento com scripts originais

## 📁 Estrutura de Diretórios

```
js/
├── core/                    # Núcleo da aplicação
│   ├── EventBus.js         # Sistema de eventos
│   ├── config.js           # Configurações globais
│   └── utils.js            # Utilitários gerais
│
├── domain/                  # Entidades de domínio
│   ├── Lead.js             # Modelo de Lead
│   └── AnalyticsEvent.js   # Modelo de Evento Analytics
│
├── infrastructure/          # Camada de infraestrutura
│   ├── GoogleSheetsRepository.js   # Integração com Sheets
│   └── GoogleAnalyticsRepository.js # Integração com Analytics
│
├── application/             # Casos de uso
│   ├── SubmitLeadUseCase.js        # Lógica de submissão de leads
│   └── TrackAnalyticsUseCase.js    # Lógica de analytics
│
├── presentation/            # Camada de apresentação
│   ├── components/         # Componentes UI
│   │   ├── BaseComponent.js        # Componente base
│   │   ├── LoadingScreen.js        # Tela de loading
│   │   ├── HeaderComponent.js      # Cabeçalho
│   │   ├── LeadForm.js            # Formulário de leads
│   │   └── ScrollAnimations.js     # Animações
│   └── pages/
│       └── LandingPage.js          # Página principal
│
├── app.js                   # Aplicação principal
├── main-componentized.js    # Main híbrido (nova + compatibilidade)
├── analytics-componentized.js      # Analytics componentizado
└── sheets-integration-componentized.js # Sheets componentizado
```

## 🏛️ Camadas da Arquitetura

### 1. **Core** (Núcleo)
- **EventBus**: Sistema de comunicação entre componentes
- **Config**: Configurações centralizadas
- **Utils**: Funções utilitárias reutilizáveis

### 2. **Domain** (Domínio)
- **Lead**: Entidade que representa um lead
- **AnalyticsEvent**: Entidade que representa um evento de analytics

### 3. **Infrastructure** (Infraestrutura)
- **GoogleSheetsRepository**: Persistência no Google Sheets
- **GoogleAnalyticsRepository**: Envio de eventos para GA

### 4. **Application** (Aplicação)
- **SubmitLeadUseCase**: Caso de uso para submissão de leads
- **TrackAnalyticsUseCase**: Caso de uso para analytics

### 5. **Presentation** (Apresentação)
- **Componentes**: Elementos da interface do usuário
- **Páginas**: Controladores de páginas

## 🔄 Fluxo de Dados

```
UI Component → Use Case → Repository → External Service
     ↑                                        ↓
EventBus ← Domain Entity ← Response ←─────────┘
```

## 🧩 Componentes Principais

### BaseComponent
Classe base para todos os componentes com funcionalidades comuns:
- Gerenciamento de lifecycle
- Event listeners com cleanup automático
- Comunicação via EventBus

### LoadingScreen
Gerencia a tela de carregamento inicial:
- Barra de progresso
- Monitoramento de recursos
- Transição suave para conteúdo

### LeadForm
Formulário de captura de leads:
- Validação em tempo real
- Máscara de telefone
- Contador de caracteres

### ScrollAnimations
Sistema de animações:
- Intersection Observer
- Animações suaves
- Fallback para navegadores antigos

### Header
Cabeçalho responsivo:
- Aparição/ocultação baseada em scroll
- Navegação suave
- Detecção de seção ativa

## 📝 Como Usar

### Inicialização Básica
```javascript
// A aplicação se inicializa automaticamente
// Verifique o console para logs de inicialização
```

### Adicionando Novo Componente
```javascript
import { BaseComponent } from './BaseComponent.js';

export class MeuComponente extends BaseComponent {
    constructor(selector) {
        super(selector);
    }

    setupEventListeners() {
        // Configure event listeners
    }

    render() {
        // Renderize o componente
    }
}
```

### Emitindo Eventos
```javascript
// Em qualquer componente
this.emit('meu_evento', { dados: 'exemplo' });

// Escutando eventos
this.on('meu_evento', (data) => {
    console.log('Evento recebido:', data);
});
```

### Criando Use Case
```javascript
export class MeuUseCase {
    async execute(data) {
        // Lógica de negócio
        return { success: true, data: result };
    }
}
```

## 🔗 Compatibilidade

A nova arquitetura mantém **100% de compatibilidade** com a implementação anterior:

- ✅ Todas as funcionalidades originais funcionam
- ✅ Scripts antigos servem como fallback
- ✅ Aparência visual idêntica
- ✅ Performance igual ou melhor

## 🚀 Scripts de Carregamento

### Modo Híbrido
O `main-componentized.js` carrega a nova arquitetura e mantém compatibilidade:

```html
<script type="module" src="js/main-componentized.js"></script>
<script src="js/sheets-integration-componentized.js" defer></script>
<script src="js/analytics-componentized.js" defer></script>
```

### Fallback Automático
Se a nova arquitetura falhar, scripts originais são carregados automaticamente.

## 🔧 Configuração

### CONFIG Object
Centraliza todas as configurações:

```javascript
import { CONFIG } from './core/config.js';

// UI Settings
CONFIG.UI.animationDuration
CONFIG.UI.headerShowThreshold()

// Analytics
CONFIG.ANALYTICS.trackingEvents
CONFIG.ANALYTICS.timeMarkers

// Form
CONFIG.FORM.validation
CONFIG.FORM.googleSheetsUrl
```

## 📊 Monitoramento

### Logs Estruturados
```javascript
utils.log('Mensagem', 'info');   // Info
utils.log('Aviso', 'warn');      // Warning  
utils.log('Erro', 'error');      // Error
```

### Eventos de Sistema
```javascript
// Escute eventos importantes
eventBus.on('app:initialized', () => {
    console.log('App inicializada');
});

eventBus.on('loading:finished', () => {
    console.log('Loading terminado');
});
```

## 🎯 Próximos Passos

### Funcionalidades Futuras
- [ ] Service Worker para cache
- [ ] Lazy loading de componentes
- [ ] A/B testing framework
- [ ] Modo offline
- [ ] PWA capabilities

### Melhorias de Performance
- [ ] Code splitting
- [ ] Tree shaking
- [ ] Bundle optimization
- [ ] Critical CSS inlining

## 🧪 Testes

### Estrutura de Testes
```
tests/
├── unit/           # Testes unitários
├── integration/    # Testes de integração
└── e2e/           # Testes end-to-end
```

### Executando Testes
```bash
npm test              # Todos os testes
npm run test:unit     # Testes unitários
npm run test:e2e      # Testes E2E
```

## 📚 Documentação Técnica

### Patterns Utilizados
- **Observer Pattern**: EventBus para comunicação
- **Repository Pattern**: Acesso a dados
- **Use Case Pattern**: Lógica de negócio
- **Component Pattern**: UI modular

### Princípios SOLID
- ✅ **Single Responsibility**: Cada classe tem uma responsabilidade
- ✅ **Open/Closed**: Aberto para extensão, fechado para modificação
- ✅ **Liskov Substitution**: Componentes são substituíveis
- ✅ **Interface Segregation**: Interfaces específicas
- ✅ **Dependency Inversion**: Depende de abstrações

## 🤝 Contribuição

### Adicionando Funcionalidade
1. Crie o domínio (se necessário)
2. Implemente o repositório
3. Crie o use case
4. Desenvolva o componente
5. Integre na página principal

### Code Style
- Use JSDoc para documentação
- Siga naming conventions
- Escreva testes para novas funcionalidades
- Mantenha compatibilidade com versão anterior

---

## 📞 Suporte

Para dúvidas sobre a arquitetura:
- Consulte os logs no console
- Verifique eventos no EventBus
- Analise a estrutura de componentes

**A nova arquitetura mantém 100% da funcionalidade original com melhor organização e manutenibilidade!** 🎉
