# 📹 PASSO A PASSO: Como Adicionar Vídeos aos Cases

## 🎯 Guia Completo para Adicionar Seus Vídeos

### 📋 PASSO 1: Prepare seus arquivos

#### 🎬 **Vídeo Principal:**
- ✅ Formato: MP4 (recomendado)
- ✅ Tamanho: Máximo 50MB
- ✅ Resolução: 1920x1080 (Full HD) ou 1280x720 (HD)
- ✅ Duração: 2-5 minutos (ideal)

#### 🖼️ **Imagens de Apoio:**
- ✅ **Thumbnail**: 400x300px (JPG/PNG)
- ✅ **Poster**: 800x600px (JPG/PNG)

---

### 📂 PASSO 2: Organize os arquivos nas pastas

#### **2.1 - Copie o vídeo para a pasta correta:**
```
📁 Copie seu vídeo para:
video/cases/case1.mp4
```

#### **2.2 - Copie as imagens para a pasta correta:**
```
📁 Copie suas imagens para:
img/cases/case1-thumb.jpg    (thumbnail/miniatura)
img/cases/case1-poster.jpg   (poster/capa)
```

---

### ⚙️ PASSO 3: Configure o arquivo JSON

Abra o arquivo: `data/cases-videos.json`

#### **3.1 - Para Vídeo Local (seu arquivo MP4):**
```json
{
  "id": "case1",
  "title": "Automação E-commerce",
  "company": "TechStore Brasil",
  "category": "E-commerce",
  "challenge": "Reduzir tempo de atendimento e aumentar conversões",
  "solution": "Chatbot inteligente + Automação de vendas",
  "results": [
    "300% ROI",
    "70% redução no tempo de resposta", 
    "45% aumento nas vendas"
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

#### **3.2 - Para Vídeo do YouTube:**
```json
{
  "video": {
    "type": "youtube",
    "id": "dQw4w9WgXcQ",
    "thumbnail": "img/cases/case1-thumb.jpg",
    "poster": "img/cases/case1-poster.jpg",
    "local_file": "video/cases/case1.mp4"
  }
}
```

#### **3.3 - Para Vídeo do Vimeo:**
```json
{
  "video": {
    "type": "vimeo",
    "id": "123456789",
    "thumbnail": "img/cases/case1-thumb.jpg",
    "poster": "img/cases/case1-poster.jpg",
    "local_file": "video/cases/case1.mp4"
  }
}
```

---

### 🔄 PASSO 4: Exemplo Prático - Case 1

Vamos usar o vídeo que você tem como exemplo:

#### **4.1 - Estrutura de arquivos que você deve criar:**
```
📁 seu-projeto/
├── 📁 video/
│   └── 📁 cases/
│       └── 🎬 case1.mp4 (SEU VÍDEO AQUI)
├── 📁 img/
│   └── 📁 cases/
│       ├── 🖼️ case1-thumb.jpg (THUMBNAIL DO SEU VÍDEO)
│       └── 🖼️ case1-poster.jpg (POSTER DO SEU VÍDEO)
└── 📁 data/
    └── 📄 cases-videos.json (CONFIGURAÇÃO)
```

#### **4.2 - Configuração no JSON para seu vídeo:**
```json
{
  "cases": [
    {
      "id": "case1",
      "title": "Automação E-commerce",
      "company": "TechStore Brasil", 
      "category": "E-commerce",
      "challenge": "Reduzir tempo de atendimento e aumentar conversões",
      "solution": "Chatbot inteligente + Automação de vendas",
      "results": [
        "300% ROI",
        "70% redução no tempo de resposta",
        "45% aumento nas vendas"
      ],
      "video": {
        "type": "local",
        "id": "case1",
        "thumbnail": "img/cases/case1-thumb.jpg",
        "poster": "img/cases/case1-poster.jpg",
        "local_file": "video/cases/case1.mp4"
      }
    }
  ]
}
```

---

### 🧪 PASSO 5: Teste sua configuração

#### **5.1 - Abra o arquivo de teste:**
```
test-video-system.html
```

#### **5.2 - Abra no navegador e verifique:**
- ✅ A seção aparece corretamente
- ✅ O thumbnail do vídeo está visível
- ✅ O botão de play funciona
- ✅ O vídeo abre quando clicado

#### **5.3 - Verifique o console (F12):**
- ✅ Sem erros vermelhos
- ✅ Mensagem "✅ Sistema de vídeos funcionando!"

---

### 🎬 PASSO 6: Como obter ID de vídeos online

#### **YouTube:**
```
URL: https://www.youtube.com/watch?v=dQw4w9WgXcQ
ID:  dQw4w9WgXcQ (parte após "v=")
```

#### **Vimeo:**
```
URL: https://vimeo.com/123456789
ID:  123456789 (números no final)
```

---

### 🔧 PASSO 7: Resolução de problemas

#### **Vídeo não aparece:**
- ✅ Verifique se o caminho está correto
- ✅ Confirme se o arquivo existe na pasta
- ✅ Teste se o vídeo abre sozinho

#### **Thumbnail não aparece:**
- ✅ Verifique se a imagem está na pasta `img/cases/`
- ✅ Confirme se o nome está correto no JSON
- ✅ Teste se a imagem abre sozinha

#### **Erro no JSON:**
- ✅ Use um validador JSON online
- ✅ Verifique vírgulas e aspas
- ✅ Confirme se todos os campos estão preenchidos

---

### 📝 RESUMO RÁPIDO:

1. **Copie** seu vídeo para `video/cases/case1.mp4`
2. **Copie** suas imagens para `img/cases/case1-thumb.jpg` e `case1-poster.jpg`
3. **Edite** o arquivo `data/cases-videos.json` com as configurações
4. **Teste** abrindo `test-video-system.html`
5. **Pronto!** Seu vídeo está funcionando

---

### 🎯 DICA EXTRA:

Para adicionar mais cases, simplesmente:
1. Copie os arquivos com nomes `case2.mp4`, `case3.mp4`, etc.
2. Adicione mais objetos no array "cases" do JSON
3. Siga o mesmo padrão de nomenclatura

**🚀 Agora você pode gerenciar todos os vídeos facilmente!**
