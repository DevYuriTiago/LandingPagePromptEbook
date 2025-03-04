# Instruções para Configuração de Analytics e Captura de Leads

## 1. Configuração do Google Analytics para Monitoramento de Tráfego

### Passo 1: Criar uma conta no Google Analytics
1. Acesse [Google Analytics](https://analytics.google.com/)
2. Faça login com sua conta Google
3. Clique em "Configurar para Negócios" ou "Começar a medir"
4. Siga as instruções para criar uma propriedade para seu site
5. Obtenha o ID de medição (formato: G-XXXXXXXXXX)

### Passo 2: Adicionar o código do Google Analytics ao seu site
1. Abra o arquivo `index.html`
2. Cole o seguinte código logo após a tag `<head>`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

3. Substitua `G-XXXXXXXXXX` pelo seu ID de medição do Google Analytics

### Passo 3: Verificar a instalação
1. Acesse seu site
2. Abra o Google Analytics
3. Vá para "Relatórios em tempo real" para confirmar se o rastreamento está funcionando

## 2. Configuração da Captura de Leads para Google Sheets

### Passo 1: Criar uma planilha no Google Sheets
1. Acesse [Google Sheets](https://sheets.google.com/)
2. Crie uma nova planilha
3. Renomeie a primeira aba para "Leads"
4. Adicione os cabeçalhos: Email, Data e Hora, Origem, Data de Registro
5. Anote o ID da planilha (a parte longa na URL entre /d/ e /edit)

### Passo 2: Configurar o Google Apps Script
1. Na planilha, vá para Extensões > Apps Script
2. Apague qualquer código existente no editor
3. Cole o código do arquivo `google-apps-script.js`
4. Substitua `SUA_PLANILHA_ID` pelo ID da sua planilha
5. Clique em Salvar
6. Vá para Implantar > Novo deployment
7. Selecione "Web app"
8. Configure:
   - Descrição: "API de Captura de Leads"
   - Execute como: "Eu"
   - Quem tem acesso: "Qualquer pessoa"
9. Clique em "Implantar"
10. Copie a URL da Web App que será gerada

### Passo 3: Configurar o site para usar a API
1. Abra o arquivo `js/sheets-integration.js`
2. Substitua `SUA_URL_DO_GOOGLE_SCRIPT_WEB_APP` pela URL da Web App copiada no passo anterior
3. Salve o arquivo

## 3. Funcionalidades Implementadas

### Análise de Tráfego (analytics.js)
- Rastreamento de visualizações de página
- Rastreamento de cliques em botões CTA
- Rastreamento de tempo na página
- Rastreamento de profundidade de rolagem
- Rastreamento de envios de formulário

### Captura de Leads (sheets-integration.js)
- Captura de email do visitante
- Registro de data e hora
- Registro da origem do lead
- Armazenamento em Google Sheets

## 4. Verificação

Após configurar tudo, teste o formulário de captura de leads e verifique se:
1. Os dados estão sendo registrados na planilha do Google Sheets
2. As visualizações de página estão sendo registradas no Google Analytics
3. Os eventos (cliques, rolagem, etc.) estão sendo registrados no Google Analytics

## 5. Solução de Problemas

Se os dados não estiverem sendo registrados:
1. Verifique se os scripts estão sendo carregados corretamente (sem erros no console do navegador)
2. Verifique se a URL da Web App do Google Apps Script está correta
3. Verifique as permissões da Web App (deve estar configurada para "Qualquer pessoa")
4. Verifique se o ID do Google Analytics está correto
