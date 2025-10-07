# Backlog Prompts360 Landing Page

Legenda Prioridade: P0 (crítico conversão / estabilidade) • P1 (alto impacto) • P2 (médio) • P3 (nice to have)
Status: TODO / DOING / BLOCKED / DONE

## Visão Macro por Fases
- Fase 1 (Fundação & Conversão Imediata): Performance crítica, Form multistep, SEO técnico, Telemetria, Split componentes críticos, Design Tokens mínimos.
- Fase 2 (Escala & Experimentação): A/B testing infra, melhorias de conteúdo dinâmico, otimização de imagens avançada, schema, nurturing, refatoração estrutural.
- Fase 3 (Maturidade & Growth): Personalização, lead scoring, referral, internacionalização, automações avançadas, biblioteca de componentes e testes visuais.

---
## 1. Performance & Carregamento
- [ ] P0 Lighthouse < 1.5s LCP: analisar waterfall (cover image, vídeo, spline) & adiar não-críticos
- [ ] P0 Remover JS morto / dividir App.tsx em seções (`Hero`, `Cases`, `CTAForm`, `Footer`)
- [ ] P0 Inline critical CSS (acima da dobra) + preload fontes Inter (swap)
- [ ] P1 Implementar `react-lazy` para seções abaixo da dobra (IntersectionObserver + suspense boundaries)
- [ ] P1 Introduzir `priority hints` (fetchpriority=high) para hero image
- [ ] P1 Ajustar bundling: separar chunk "form" e "videos" além de vendor/spline
- [ ] P2 Prefetch rotas futuras (se houver navegação adicional)
- [ ] P2 Usar `requestIdleCallback` para listeners não críticos (scroll analytics, observers auxiliares)

## 2. SEO & Conteúdo Estruturado
- [ ] P0 Adicionar JSON-LD (Product / HowTo / FAQ se aplicável)
- [ ] P0 Consolidar canonical & verificar ausência de duplicações
- [ ] P1 Open Graph adicional (og:locale, og:site_name) e twitter:labelN se válido
- [ ] P1 Sitemap dinâmico (se crescer) / atualizar data modificação
- [ ] P2 Heading hierarchy audit (h1 único; subseções h2/h3 coerentes)
- [ ] P2 Meta description A/B test (2 variantes)

## 3. Formulário & Conversão
- [ ] P0 Transformar em Multi-Step (reduzir atrito: 3 passos curtos) com barra de progresso
- [ ] P0 Persistência local (localStorage) para evitar perda em refresh
- [ ] P0 Validação acessível (aria-describedby + roles)
- [ ] P1 Mostrar prova social dinâmica na lateral (ex: "+312 profissionais já baixaram")
- [ ] P1 Botão CTA sticky em mobile (ancora para formulário)
- [ ] P2 Campo oculto de origem (utm_source, campaign) + repasse para Sheets
- [ ] P2 Honeypot + atraso leve anti-bot

## 4. Analytics & Telemetria
- [ ] P0 Implementar camada de eventos (dataLayer ou objeto custom) centralizado
- [ ] P0 Eventos: view_section, start_form_step, submit_success, video_play, cta_click
- [ ] P1 Heatmap / scroll depth (plugin leve ou script custom) deferred
- [ ] P2 Funil conversão dashboard (Sheets + Looker/DataStudio)

## 5. Componentização & Arquitetura
- [ ] P0 Extrair seções de `App.tsx` para `src/sections/*`
- [ ] P1 Introduzir diretório `src/components/form` com campos reutilizáveis
- [ ] P1 Adicionar barrel `src/sections/index.ts`
- [ ] P2 Hooks especializados (useSectionInView, useReducedMotionFlag)
- [ ] P2 Migration gradual para server-friendly components (se evoluir para SSR no futuro)

## 6. Design System Adoção
- [ ] P0 Adicionar tokens faltantes (:root) spacing, radius, motion, focus-ring
- [ ] P1 Refatorar `Button.tsx` para consumir tokens e variantes (primary|secondary|outline|ghost)
- [ ] P1 Criar `Card` e `FormField` padronizados
- [ ] P2 Criar pasta `design-tokens` + JSON unificado
- [ ] P2 Documentação Storybook inicial (ou docs markdown extendidas)
- [ ] P3 Modo claro experimental

## 7. A/B Testing & Experimentação
- [ ] P1 Abstração simples: flag via query (?exp=heroB)
- [ ] P1 Hero variante B (headline + sub + CTA) medição CTR -> planilha
- [ ] P2 Integração com ferramenta (GrowthBook / PostHog) se escalar
- [ ] P3 Infra experimentos multi-variantes

## 8. Imagens & Mídia
- [ ] P0 Gerar versões WebP/AVIF + srcset para hero & ebook
- [ ] P0 Lazy loading completo (decoding="async", loading="lazy") onde aplicável
- [ ] P1 Placeholders blur (LQIP base64 ou tiny .webp)
- [ ] P1 Reavaliar peso dos vídeos cases (re-encode CRF mais alto / menor bitrate)
- [ ] P2 Implementar poster responsive fallback quando reduce-motion ativo

## 9. Acessibilidade
- [ ] P0 Foco visível consistente (outline tokens) em todos CTAs / inputs
- [ ] P0 Checar contraste `text-secondary` em fundos translúcidos
- [ ] P1 aria-live para mensagens de sucesso/erro
- [ ] P1 Labels explícitos inputs + associar id/for
- [ ] P2 Teste com axe-core (script dev) e checklist WCAG AA

## 10. Personalização & Conteúdo Dinâmico
- [ ] P2 Capturar UTM + armazenar -> personalizar headline (ex: origem Linkedin)
- [ ] P2 Mensagem final adaptando setor escolhido
- [ ] P3 Recomendar próximos materiais via param futuro

## 11. Lead Scoring & Qualificação
- [ ] P1 Enviar campos extras (tamanho empresa, papel) se adicionados
- [ ] P2 Atribuir pontuação básica (setor estratégico + tamanho + cargo)
- [ ] P3 Export scoring para CRM futuro

## 12. Nurturing Pós-Conversão
- [ ] P1 Página de obrigado com CTA secundário (newsletter / comunidade)
- [ ] P2 Disparo e-mail workflow (integração futura provider) -> placeholder hook
- [ ] P3 Sequência drip (3 e-mails) armazenada em config

## 13. Referral / Viral Loop
- [ ] P2 Geração de link único (hash) após conversão
- [ ] P2 Contador de indicações (Sheets tab Referral)
- [ ] P3 Gamificação (badge / desbloqueio material extra)

## 14. Segurança & Robustez
- [ ] P0 Sanitizar inputs antes de enviar (escape / trim)
- [ ] P1 Rate limit simples client (cooldown entre submits)
- [ ] P2 Migrar endpoint para verificação server-side (Cloud Function / Edge) se abuso

## 15. Observabilidade
- [ ] P1 Monitorar erros JS (Sentry ou open-source mínima) lazy load
- [ ] P1 Registrar tempo de carregamento (FCP, LCP) e enviar para Sheets (amostragem)
- [ ] P2 Logging de interações-chave (JSON append em endpoint)

## 16. Testes & Qualidade
- [ ] P0 Configurar suíte de smoke test (Vitest + React Testing Library)
- [ ] P1 Teste unit `submitLead` (happy + erro)
- [ ] P1 Teste hook de IntersectionObserver (marquee pause)
- [ ] P2 Teste acessibilidade (axe) automatizado CI
- [ ] P3 Teste visual futuro (Chromatic/Percy)

## 17. CI/CD & Automação
- [ ] P1 Workflow GitHub Actions: lint + typecheck + build
- [ ] P1 Badge status README
- [ ] P2 Lighthouse CI (threshold) em PR crítico
- [ ] P3 Deploy pré-visualização (Vercel/Netlify) por PR

## 18. Estrutura de Código & Manutenção
- [ ] P0 Reduzir tamanho de `App.tsx` < 300 linhas
- [ ] P1 Criar `src/config/constants.ts` (durations, section IDs)
- [ ] P1 Centralizar mapeamento setor->interest em módulo isolado
- [ ] P2 ESLint regra custom: impedir hex fora tokens

## 19. Internacionalização (Opcional Futuro)
- [ ] P3 Arquitetar i18n (mensagens JSON) preparando en-US
- [ ] P3 Seleção idioma automática por header / manual toggle

## 20. Documentação & Educação
- [ ] P1 Expandir `README.md` com métricas de performance alvo
- [ ] P1 Atualizar `design_system.md` ao adicionar tokens
- [ ] P2 Criar `CONTRIBUTING.md` com convenções tokens/commits
- [ ] P2 Changelog inicial (Keep a Changelog)

## 21. Riscos & Mitigações
- Asset pesado (Spline/Vídeos) => Gate + compressão
- JS monolítico => refatorar em seções e lazy boundaries
- Falta de telemetria => implementar camada eventos antes de otimizações profundas

## 22. Métricas de Sucesso (Definir Baseline)
- Conversão formulário: meta +X% após multi-step
- LCP < 2.0s (desktop) / < 2.5s (mobile)
- TTFB < 200ms (hosting) / CLS ~0
- Taxa abandono formulário < 35%
- CTR CTA hero > 4.5%

## 23. Próximos Passos Sugeridos (Sequência Inicial)
1. (P0) Quebrar App.tsx e adicionar tokens faltantes
2. (P0) Multi-step form com persistência
3. (P0) JSON-LD + imagens responsivas hero
4. (P0) Camada analytics eventos básicos
5. (P1) Refatorar Button/Card/FormField para tokens

---
Gerado automaticamente a partir da análise anterior. Atualize status via PRs e mantenha alinhado com `design_system.md`.
