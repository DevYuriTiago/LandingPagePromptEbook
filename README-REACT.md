# Prompts360 React - Landing Page

> **Versão React da Landing Page Prompts360**  
> Migração completa do projeto original para React + TypeScript + Tailwind CSS

## 🚀 Tecnologias

### Core
- **React 18** - Biblioteca principal
- **TypeScript** - Tipagem estática
- **Vite** - Build tool e dev server
- **Tailwind CSS** - Framework CSS utility-first

### Bibliotecas
- **Framer Motion** - Animações avançadas
- **Lucide React** - Ícones modernos
- **React Player** - Player de vídeo
- **React Intersection Observer** - Observação de elementos

### Ferramentas
- **ESLint** - Linting de código
- **Prettier** - Formatação de código
- **Vitest** - Testes unitários

## 📁 Estrutura do Projeto

```
src/
├── components/           # Componentes React
│   ├── ui/              # Componentes base (Button, Input, etc.)
│   └── sections/        # Seções da landing page
├── hooks/               # Hooks customizados
├── utils/               # Utilitários e helpers
├── types/               # Definições TypeScript
├── styles/              # Estilos globais
├── assets/              # Imagens, vídeos, etc.
├── data/                # Dados estáticos
├── App.tsx              # Componente principal
└── main.tsx             # Ponto de entrada
```

## 🎯 Componentes Principais

### Seções da Landing Page
- `Header` - Navegação e menu
- `Hero` - Seção principal com CTA
- `Benefits` - Benefícios e diferenciais
- `CasesSection` - Casos de sucesso
- `Testimonials` - Depoimentos
- `Pricing` - Planos e preços
- `FAQ` - Perguntas frequentes
- `Contact` - Formulário de contato
- `Footer` - Rodapé

### Componentes UI
- `Button` - Botão reutilizável
- `LoadingScreen` - Tela de carregamento
- `Card` - Cartão de conteúdo
- `Modal` - Modal/Dialog
- `Form` - Formulários

## 🛠️ Instalação e Configuração

### 1. Instalar Dependências

```bash
# Via script automatizado (recomendado)
chmod +x setup-react.sh
./setup-react.sh

# Ou manualmente
npm install
```

### 2. Configurar Ambiente

```bash
# Copiar arquivo de exemplo
cp .env.example .env.local

# Editar variáveis de ambiente
nano .env.local
```

### 3. Iniciar Desenvolvimento

```bash
npm run dev
```

Acesse: [http://localhost:3000](http://localhost:3000)

## 📝 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev              # Servidor de desenvolvimento
npm run build            # Build de produção
npm run preview          # Preview do build

# Qualidade de Código
npm run lint             # Verificar linting
npm run lint:fix         # Corrigir linting automaticamente
npm run type-check       # Verificar tipos TypeScript

# Testes
npm run test             # Executar testes
npm run test:ui          # Interface de testes
npm run test:coverage    # Cobertura de testes
```

## 🎨 Customização

### Cores e Tema
Edite o arquivo `tailwind.config.js` para personalizar:
- Paleta de cores
- Espaçamentos
- Animações
- Breakpoints

### Componentes
Todos os componentes seguem o padrão:
- Props tipadas com TypeScript
- Classes CSS via Tailwind
- Responsividade mobile-first
- Acessibilidade (a11y)

## 🔧 Hooks Customizados

- `useIntersectionObserver` - Observar elementos no viewport
- `useLocalStorage` - Persistir dados localmente
- `useDebounce` - Debounce de valores
- `useWindowSize` - Dimensões da janela
- `useScrollDirection` - Direção do scroll
- `useLoading` - Estados de carregamento

## 📱 Responsividade

Breakpoints do Tailwind:
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

## 🚀 Deploy

### Vercel (Recomendado)
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm run build
# Upload da pasta dist/
```

### GitHub Pages
```bash
npm run build
# Configurar GitHub Actions para deploy automático
```

## 🔄 Migração do Projeto Original

### Funcionalidades Migradas
- ✅ Layout responsivo
- ✅ Navegação suave
- ✅ Animações de scroll
- ✅ Carrossel de casos
- ✅ Formulário de contato
- ✅ Analytics tracking
- ✅ SEO otimizado

### Melhorias Implementadas
- 🎯 **Componentização** - Código mais modular
- 🎨 **Design System** - Componentes reutilizáveis
- 🚀 **Performance** - Lazy loading e code splitting
- 🔒 **Type Safety** - TypeScript em todo o projeto
- 🧪 **Testabilidade** - Estrutura preparada para testes
- 📱 **Mobile-First** - Responsividade aprimorada

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 🔗 Links Úteis

- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Vite Guide](https://vitejs.dev/guide/)
- [Framer Motion](https://www.framer.com/motion/)

---

**Desenvolvido com ❤️ pela equipe Prompts360**
