# 🔧 Configuração Completa do Google Sheets para Captura de Leads

## 📋 Passo a Passo Detalhado

### 1. **Preparar o Google Sheets**
1. Acesse [Google Sheets](https://sheets.google.com)
2. Crie uma nova planilha
3. Nomeie como "Leads Prompts360"
4. **NÃO** precisa criar cabeçalhos manualmente - o script fará isso automaticamente

### 2. **Configurar Google Apps Script**
1. Na planilha, vá em **Extensões** → **Apps Script**
2. Apague todo o código padrão
3. Copie e cole o código do arquivo `google-apps-script.js` 
4. **Salve o projeto** (Ctrl+S)
5. Nomeie o projeto como "Leads Prompts360"

### 3. **Configurar Permissões**
1. No Apps Script, clique em **Executar** (▶️) para testar
2. Será pedido para autorizar permissões
3. Clique em **Revisar permissões**
4. Escolha sua conta Google
5. Clique em **Avançado**
6. Clique em **Ir para [nome do projeto] (não seguro)**
7. Clique em **Permitir**

### 4. **Implantar o Apps Script**
1. Clique em **Implantar** → **Nova implantação**
2. Clique no ícone da engrenagem ⚙️ ao lado de "Tipo"
3. Escolha **Aplicativo da Web**
4. Configurações:
   - **Descrição**: Captura de Leads Prompts360
   - **Executar como**: Eu (seu email)
   - **Quem tem acesso**: Qualquer pessoa
5. Clique em **Implantar**
6. **Copie a URL** que aparece (importante!)

### 5. **Testar a Configuração**
1. No Apps Script, vá em **Execuções** (menu lateral)
2. Execute a função `testIntegration` para testar
3. Verifique se aparece uma linha teste na planilha

### 6. **Atualizar a URL no Site**
A URL já está configurada no código, mas se precisar trocar:
- Abra o arquivo `index.html`
- Procure por `SCRIPT_URL`
- Substitua pela nova URL

## 🔍 **Diagnóstico do Problema Atual**

O erro "Cannot read properties of null (reading 'appendRow')" indica que:
1. A planilha não foi encontrada
2. O script não tem permissões adequadas
3. A URL do script está incorreta

## ✅ **Soluções Implementadas**

### No Frontend (Landing Page):
- ✅ Modo `no-cors` para evitar problemas de CORS
- ✅ Timeout de 10 segundos
- ✅ Backup local dos dados se falhar
- ✅ Mensagens de erro mais claras
- ✅ Log detalhado para debug

### No Backend (Google Apps Script):
- ✅ Verificação robusta da planilha
- ✅ Criação automática de cabeçalhos
- ✅ Tratamento de erros detalhado
- ✅ Headers CORS configurados
- ✅ Validação de dados obrigatórios

## 🚨 **Pontos Importantes**

1. **Permissões**: O script precisa ter permissão para acessar o Google Sheets
2. **Implantação**: Deve ser implantado como "Aplicativo da Web"
3. **Acesso**: Deve permitir acesso a "Qualquer pessoa"
4. **URL**: Use a URL de produção (termina com `/exec`)

## 📊 **Verificação Final**

Após configurar tudo:
1. Teste o formulário na landing page
2. Verifique se os dados aparecem na planilha
3. Confira o console do navegador para logs
4. Verifique o localStorage se houver erro

## 🔧 **Comandos para Debug**

No console do navegador:
```javascript
// Ver leads salvos localmente
console.log(JSON.parse(localStorage.getItem('leads') || '[]'));

// Limpar leads locais
localStorage.removeItem('leads');
```

## 📝 **Estrutura da Planilha**

A planilha será criada automaticamente com estas colunas:
| Data/Hora | Nome | Email | Telefone | Empresa | Cargo | Interesse | Desafio |
|-----------|------|-------|----------|---------|-------|-----------|---------|

## 🎯 **Próximos Passos**

1. Siga o passo a passo acima
2. Teste o formulário
3. Se ainda der erro, verifique as permissões
4. Compartilhe o erro específico para ajuste fino
