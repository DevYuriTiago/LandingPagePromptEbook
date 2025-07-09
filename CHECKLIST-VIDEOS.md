# ✅ CHECKLIST: Adicionar Vídeo aos Cases

## 📋 Lista de Verificação Completa

### 🎬 **PREPARAÇÃO DOS ARQUIVOS**
- [ ] Vídeo MP4 pronto (máx 50MB)
- [ ] Thumbnail 400x300px (JPG/PNG)
- [ ] Poster 800x600px (JPG/PNG)
- [ ] Nomes dos arquivos definidos

### 📁 **ORGANIZAÇÃO DAS PASTAS**
- [ ] Pasta `video/cases/` existe
- [ ] Pasta `img/cases/` existe
- [ ] Arquivo `data/cases-videos.json` existe

### 📂 **COPIAR ARQUIVOS**
- [ ] Vídeo copiado para: `video/cases/case1.mp4`
- [ ] Thumbnail copiado para: `img/cases/case1-thumb.jpg`
- [ ] Poster copiado para: `img/cases/case1-poster.jpg`

### ⚙️ **CONFIGURAÇÃO JSON**
- [ ] Arquivo `data/cases-videos.json` aberto
- [ ] Campo "title" atualizado
- [ ] Campo "company" atualizado
- [ ] Campo "category" atualizado
- [ ] Campo "challenge" atualizado
- [ ] Campo "solution" atualizado
- [ ] Array "results" atualizado
- [ ] Campo "type" = "local"
- [ ] Campo "local_file" correto
- [ ] Campo "thumbnail" correto
- [ ] Campo "poster" correto

### 🧪 **TESTES**
- [ ] Arquivo `test-video-system.html` aberto
- [ ] Seção Cases aparece na página
- [ ] Thumbnail do vídeo visível
- [ ] Botão de play funciona
- [ ] Vídeo abre quando clicado
- [ ] Console sem erros (F12)

### 🔍 **VERIFICAÇÃO FINAL**
- [ ] Todas as informações estão corretas
- [ ] Vídeo reproduz normalmente
- [ ] Imagens carregam corretamente
- [ ] Layout está preservado
- [ ] Responsividade funciona

## 🚨 **SOLUÇÃO DE PROBLEMAS**

### **Vídeo não aparece:**
- [ ] Verificar se o arquivo existe em `video/cases/`
- [ ] Confirmar se o nome está correto no JSON
- [ ] Testar se o vídeo abre sozinho

### **Thumbnail não aparece:**
- [ ] Verificar se a imagem está em `img/cases/`
- [ ] Confirmar se o caminho está correto no JSON
- [ ] Testar se a imagem abre sozinha

### **Erro no JSON:**
- [ ] Usar validador JSON online
- [ ] Verificar vírgulas e aspas
- [ ] Confirmar se todos os campos estão preenchidos

## 📝 **CONFIGURAÇÃO EXEMPLO**

```json
{
  "id": "case1",
  "title": "SEU TÍTULO",
  "company": "SUA EMPRESA",
  "category": "SUA CATEGORIA",
  "challenge": "DESAFIO DO CLIENTE",
  "solution": "SOLUÇÃO IMPLEMENTADA",
  "results": [
    "RESULTADO 1",
    "RESULTADO 2",
    "RESULTADO 3"
  ],
  "video": {
    "type": "local",
    "id": "case1",
    "thumbnail": "img/cases/case1-thumb.jpg",
    "poster": "img/cases/case1-poster.jpg",
    "local_file": "video/cases/case1.mp4"
  }
}
```

## 🎯 **APÓS CONCLUIR TODOS OS ITENS:**

✅ **Seu vídeo estará funcionando perfeitamente!**
✅ **O sistema estará pronto para uso!**
✅ **Você pode adicionar mais cases facilmente!**

---

**💡 Dica: Salve este checklist e use para cada novo vídeo que adicionar!**
