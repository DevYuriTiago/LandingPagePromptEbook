# Guia de Testes - Landing Page Ebook

Este guia explica como executar os diferentes tipos de testes implementados para a Landing Page do Ebook de Prompt Engineering.

## Pré-requisitos

Antes de executar os testes, certifique-se de ter instalado todas as dependências necessárias:

```bash
npm install
```

## Tipos de Testes Implementados

Nossa estratégia de testes inclui:

1. **Testes Unitários** (Jest): Testam funções individuais e componentes isolados
2. **Testes End-to-End** (Cypress): Testam fluxos completos de usuário
3. **Testes de Acessibilidade** (Pa11y): Verificam conformidade com diretrizes WCAG
4. **Testes de Performance** (Lighthouse): Analisam métricas de desempenho

## Executando Todos os Testes

Para executar todos os testes de uma vez, use o script de automação:

```bash
node run-tests.js
```

Este script irá:
- Executar todos os testes unitários
- Iniciar um servidor local
- Executar testes E2E com Cypress
- Executar testes de acessibilidade com Pa11y
- Executar testes de performance com Lighthouse
- Gerar relatórios na pasta `/reports`

## Executando Testes Específicos

### Testes Unitários

Para executar apenas os testes unitários:

```bash
npx jest
```

Para executar um arquivo de teste específico:

```bash
npx jest tests/unit/sheets-integration.test.js
```

Para executar testes com cobertura:

```bash
npx jest --coverage
```

### Testes End-to-End

Para executar os testes E2E com interface gráfica:

```bash
# Primeiro inicie o servidor local
npx http-server . -p 3000

# Em outro terminal, execute o Cypress
npx cypress open
```

Para executar os testes E2E em modo headless:

```bash
npx cypress run
```

### Testes de Acessibilidade

Para executar os testes de acessibilidade:

```bash
# Primeiro inicie o servidor local
npx http-server . -p 3000

# Em outro terminal, execute o Pa11y
npx pa11y http://localhost:3000 --reporter html > reports/accessibility-report.html
```

### Testes de Performance

Para executar os testes de performance:

```bash
# Primeiro inicie o servidor local
npx http-server . -p 3000

# Em outro terminal, execute o teste de performance
node tests/performance/lighthouse-test.js
```

## Estrutura dos Testes

```
tests/
├── unit/                     # Testes unitários
│   ├── analytics.test.js     # Testes do módulo de analytics
│   ├── conversion-boost.test.js # Testes de recursos de conversão
│   └── sheets-integration.test.js # Testes da integração com Google Sheets
├── e2e/                      # Testes end-to-end
│   └── landing-page.spec.js  # Testes de fluxo completo
└── performance/              # Testes de performance
    ├── lighthouse-config.js  # Configuração do Lighthouse
    └── lighthouse-test.js    # Script de teste de performance

reports/                      # Relatórios gerados pelos testes
```

## Interpretando os Resultados

### Testes Unitários
Os testes unitários devem ter 100% de aprovação. Qualquer falha indica um problema que precisa ser corrigido.

### Testes E2E
Os testes E2E verificam fluxos completos de usuário. Falhas podem indicar problemas de integração entre componentes.

### Testes de Acessibilidade
O relatório de acessibilidade identifica problemas de conformidade com WCAG. Todos os problemas de nível A e AA devem ser corrigidos.

### Testes de Performance
O relatório do Lighthouse fornece pontuações para Performance, Acessibilidade, Melhores Práticas e SEO. Busque pontuações acima de 90 em todas as categorias.

## Solução de Problemas

Se encontrar problemas ao executar os testes:

1. Verifique se todas as dependências estão instaladas
2. Certifique-se de que o servidor local está rodando na porta 3000
3. Verifique se há erros no console que possam indicar problemas específicos
4. Para testes E2E, verifique se os seletores CSS estão corretos e se correspondem aos elementos na página

### Problemas Comuns com Cypress

Se você encontrar erros relacionados aos tipos do Cypress:

1. Tente executar o Cypress sem a referência aos tipos:
   ```bash
   # Remova a linha /// <reference types="cypress" /> do início dos arquivos de teste
   ```

2. Ou instale os tipos do Cypress manualmente:
   ```bash
   npm install --save-dev @types/cypress
   ```

3. Se estiver usando uma versão mais recente do Cypress (10+), certifique-se de que está usando o arquivo `cypress.config.js` em vez de `cypress.json`.

4. Para problemas de inicialização do Cypress:
   ```bash
   # Limpe o cache do Cypress
   npx cypress cache clear
   
   # Verifique a instalação
   npx cypress verify
   ```

### Problemas Comuns com Jest

Se você encontrar erros relacionados ao ambiente jsdom:

1. Execute os testes com o ambiente node:
   ```bash
   # Modifique o arquivo jest.config.js para usar o ambiente node
   # testEnvironment: 'node'
   ```

2. Ou instale o pacote jest-environment-jsdom:
   ```bash
   npm install --save-dev jest-environment-jsdom
   ```

3. Se estiver tendo problemas com a cobertura de código:
   ```bash
   # Execute os testes sem verificar a cobertura
   npx jest --no-coverage
   ```

4. Para problemas de importação de módulos:
   ```bash
   # Use a opção --no-cache para forçar o Jest a recarregar os módulos
   npx jest --no-cache
   ```

## Contato

Para dúvidas ou problemas relacionados aos testes, entre em contato com:
- Email: seu-email@exemplo.com
- GitHub: github.com/seu-usuario
