# Prompts360 Design System

## 1. Visão Geral
Sistema de design extraído da landing page atual para padronizar evolução, garantir consistência visual, acessibilidade e otimização de conversão. Abrange Fundamentos (tokens), Componentes, Padrões de Uso e Boas Práticas. Este arquivo é fonte de verdade até migração para biblioteca de componentes.

## 2. Fundamentos (Design Tokens)
### 2.1 Cores (Tokens Brutos)
```
--primary-color: #1E90FF
--secondary-color: #00BFFF
--accent-color: #0066CC
--bg-color: #0a0a0a
--darker-bg: #050505
--card-bg: rgba(20, 20, 20, 0.8)
--text-color: #ffffff
--text-secondary: #cccccc
--text-muted: #999999
--border-color: rgba(30,144,255,0.2)
--success-color: #00ff88
--warning-color: #ff9500
--error-color: #ff4757
--gradient-primary: linear-gradient(135deg, var(--primary-color), var(--secondary-color))
--shadow-glow: 0 0 20px rgba(30,144,255,0.3)
--shadow-deep: 0 10px 30px rgba(0,0,0,0.5)
```

### 2.2 Cores Semânticas (Aliases Recomendados)
```
--color-brand-primary: var(--primary-color)
--color-brand-secondary: var(--secondary-color)
--color-brand-accent: var(--accent-color)
--color-surface-base: var(--bg-color)
--color-surface-alt: var(--darker-bg)
--color-surface-card: var(--card-bg)
--color-text-primary: var(--text-color)
--color-text-secondary: var(--text-secondary)
--color-text-muted: var(--text-muted)
--color-border-default: var(--border-color)
--color-feedback-success: var(--success-color)
--color-feedback-warning: var(--warning-color)
--color-feedback-error: var(--error-color)
--elevation-glow: var(--shadow-glow)
--elevation-deep: var(--shadow-deep)
```
Sugestão futura: ampliar escala neutra (ex: #111, #1a1a1a, #222, #2e2e2e) para granularidade de superfícies.

### 2.3 Tipografia
Fonte primária: Inter (sans-serif)

| Elemento | Peso | Tamanho Base | Line-height |
|----------|------|--------------|-------------|
| h1 | 600 | 2.5rem | 1.2 |
| h2 | 600 | 1.8rem | 1.2 |
| h3 | 600 | 1.5rem | 1.2 |
| h4 | 600 | 1.2rem | 1.2 |
| body | 400 | 1rem | 1.6 |
| small/meta | 400 | 0.85rem | 1.4 |

Escala recomendada modular para expansão: 12 / 14 / 16 / 18 / 20 / 24 / 32 / 40 / 48 / 56.

### 2.4 Espaçamento (Proposta de Tokenização)
Não há escala explícita em tokens; inferido uso: 4px, 8px, 12px, 16px, 20px, 24px, 32px, 40px, 48px.
```
--space-1: 4px
--space-2: 8px
--space-3: 12px
--space-4: 16px
--space-5: 20px
--space-6: 24px
--space-8: 32px
--space-10: 40px
--space-12: 48px
```
Futuro: gerar via config Tailwind (theme.spacing) ou CSS :root.

### 2.5 Raio de Borda (Proposta)
Mapear consistência (analisar componentes). Sugestão:
```
--radius-xs: 2px
--radius-sm: 4px
--radius-md: 6px
--radius-lg: 10px
--radius-xl: 16px
--radius-pill: 999px
```

### 2.6 Elevação / Sombra
Uso atual:
```
--shadow-glow: 0 0 20px rgba(30,144,255,0.3)
--shadow-deep: 0 10px 30px rgba(0,0,0,0.5)
```
Proposta de expansão:
```
--shadow-sm: 0 1px 2px rgba(0,0,0,0.4)
--shadow-md: 0 4px 12px rgba(0,0,0,0.45)
--shadow-lg: 0 8px 24px rgba(0,0,0,0.5)
```

### 2.7 Motion (Animação e Redução)
Diretrizes:
- Respeitar prefers-reduced-motion.
- Classe .reduce-motion aplicada dinamicamente para mobile/touch pesado.
Tokens sugeridos:
```
--motion-duration-xs: 80ms
--motion-duration-sm: 150ms
--motion-duration-md: 250ms
--motion-duration-lg: 400ms
--motion-duration-xl: 600ms
--motion-ease-standard: cubic-bezier(0.4, 0, 0.2, 1)
--motion-ease-emphasis: cubic-bezier(0.2, 0.8, 0.2, 1)
--motion-ease-entrance: cubic-bezier(0.0, 0.0, 0.2, 1)
--motion-ease-exit: cubic-bezier(0.4, 0.0, 1, 1)
```

### 2.8 Layout / Grid
Container principal: max-width 1500px; padding lateral 20px.
Sugestão criar tokens:
```
--layout-container-max: 1500px
--layout-gutter: 20px
--layout-content-max: 1200px (para textos longos)
```

### 2.9 Breakpoints (Proposta Base)
Adicionar em :root ou Tailwind config (já possível via theme.screens):
```
--bp-xs: 420px
--bp-sm: 640px
--bp-md: 768px
--bp-lg: 1024px
--bp-xl: 1280px
--bp-2xl: 1536px
```

### 2.10 Gradientes
```
--gradient-primary: linear-gradient(135deg, var(--primary-color), var(--secondary-color))
```
Propor variações: `--gradient-accent`, `--gradient-surface-hover` (com leve fade de azul a transparente).

### 2.11 Estados / Feedback / Interação
- Hover: Intensificar brilho / borda com primary.
- Focus: anel visível (outline-offset: 2px) – implementar token:
```
--focus-ring-color: rgba(30,144,255,0.7)
--focus-ring-size: 2px
```
- Active: leve scale(0.97).
- Disabled: opacidade 0.5 + cursor not-allowed.

### 2.12 Acessibilidade
Contraste primário (#1E90FF em fundo #0a0a0a) > 4.5:1 OK. Verificar texto secundário (#ccc) para tamanhos abaixo de 18px (AA Large ok, reforçar em fundos translúcidos).

## 3. Componentes (Padrões)
### 3.1 Botão Primário
Uso: CTA principal (download, conversão).
Estados: padrão / hover (aumentar glow) / active (scale) / disabled / loading.
Props mínimas: variant (primary|secondary|outline|ghost), size (sm|md|lg), isLoading.
Tokens aplicáveis: cor de fundo gradient-primary, texto #fff, radius-md, shadow-glow.

### 3.2 Botão Secundário / Outline
Fundo transparente, borda 1-2px var(--primary-color) com transição para gradient no hover.

### 3.3 Card
Estrutura: superfície card-bg + blur opcional, padding variável (space-6+), radius-lg, shadow-glow opcional, borda border-color.
Estados especiais: sucesso / warning com borda semantic + leve background tinted (já presente nas classes .success, .warning sugeridas nas regiões CSS de status).

### 3.4 Form Field (Input/Select/Textarea)
Base: background var(--card-bg) ou transparente, borda 1px border-color => focus: border primary-color + glow leve.
Erros: border error-color + texto de suporte error-color.
Sucesso: border success-color.
Adicionar token de altura: --field-height-md: 44px.

### 3.5 Marquee / Listas Animadas
Padrão de velocidade parametrizado via `--duration` e `--gap`. Documentar pausa offscreen (IntersectionObserver) e redução via .reduce-motion.

### 3.6 Header Sticky
Estado hidden/visible via classe .visible conforme scroll. Transições devem usar `--motion-duration-md` e `--motion-ease-standard` após tokens motion implementados.

### 3.7 Vídeo de Cases
Auto play/pause usando IntersectionObserver. Definir poster placeholder otimizado + fallback quando reduz-motion.

### 3.8 Spline 3D
Lazy carregado (React.lazy) + gate mobile para performance. Fornecer fallback estático (imagem). Tokenizar escala: --spline-scale-desktop: 1.1.

### 3.9 Mensagens de Feedback
Variantes: success, warning, error. Utilizar bordas + fundo gradiente suave + ícone semântico.

### 3.10 Layout de Seção
Padding vertical consistente: sugerir `--section-padding-y: 96px` desktop / `--section-padding-y-sm: 64px` mobile.

## 4. Padrões de Uso
- Consistência: usar somente tokens, evitar valores literais novos (> 2 ocorrências sem token).
- Semântica: componentes consomem aliases; temas futuros alteram apenas tokens base.
- Responsivo: aplicar breakpoints propostos; evitar px fixos em tipografia (usar clamp). Exemplo h1: `clamp(2rem, 5vw, 2.5rem)`.
- Performance: animações pausadas offscreen; heavy assets carregados sob demanda.

## 5. Roadmap de Evolução do Design System
Curto Prazo (1-2 sprints):
1. Adicionar tokens de spacing, radius, motion, focus ring em :root.
2. Refatorar componentes para consumir tokens (Button, Card, FormField).
3. Criar pasta `src/design-tokens/` + JSON consumível (para build futuro ou style-dictionary).
4. Introduzir variantes de botão (outline, ghost) e estados de loading padronizados.

Médio Prazo (3-5 sprints):
5. Implementar tipografia responsiva com clamp.
6. Criar documentação Storybook ou docs internos em `/docs/design-system`.
7. Adicionar modo tema claro (dark atual como padrão) invertendo superfícies + ajustando contraste.
8. Automatizar verificação de uso de tokens via ESLint custom rule ou stylelint.

Longo Prazo:
9. Migrar tokens para pipeline (Style Dictionary / Theo) gerando CSS vars + TS + JSON.
10. Biblioteca de componentes compartilhável (ex: pacote npm interno).
11. Integrar testes visuais (Chromatic ou Percy) para regressões.
12. A/B test de variantes de hero/CTA usando tokens temáticos.

## 6. Acessibilidade & Inclusão
- Foco visível obrigatório em todos elementos interativos.
- Alvos de toque >=44px.
- Contraste mínimo AA garantido; revisar superfícies translucentes.
- Animação reduzida por `prefers-reduced-motion` e classe .reduce-motion (manter docs atualizadas).

## 7. Naming & Governança
- Prefixo `--color-` para semânticas; `--brand-` para identidade; `--space-` para escala; `--motion-` para tempos.
- Criar PR template exigindo: novos tokens? justificar / documentar.
- Proibir introdução de cor hex direta em componente (exceto tokens em arquivo de origem).

## 8. Exemplos de Implementação (Snippet Conceitual)
```tsx
// Button.tsx (futuro refactor com tokens)
<button
  className={cn(
    'inline-flex items-center justify-center font-medium transition-colors select-none',
    'px-[var(--space-6)] h-[44px] rounded-[var(--radius-md)]',
    'bg-[var(--gradient-primary)] text-[var(--color-text-primary)] shadow-[var(--elevation-glow)]',
    'hover:shadow-[0_0_24px_rgba(30,144,255,0.45)] active:scale-95',
    'focus:outline-none focus-visible:ring-[var(--focus-ring-size)] focus-visible:ring-[var(--focus-ring-color)]',
    disabled && 'opacity-50 cursor-not-allowed'
  )}
>
  {isLoading ? <Spinner /> : children}
</button>
```

## 9. Checklist de Adoção
- [ ] Adicionar tokens faltantes ao :root
- [ ] Refatorar componentes para aliases semânticos
- [ ] Criar documentação Storybook
- [ ] Implementar tipografia responsiva
- [ ] Implementar foco visível consistente
- [ ] Validar contraste com ferramenta (axe, lighthouse)
- [ ] Automatizar lint de cores hard-coded

## 10. Licença e Origem
Criado automaticamente a partir do CSS existente e melhores práticas modernas de design systems. Manter versão em CHANGELOG futuro.

