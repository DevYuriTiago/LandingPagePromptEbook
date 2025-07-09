# 📁 EXEMPLO VISUAL: Onde Colocar Seus Arquivos

## 🎯 Estrutura Completa do Projeto

```
📁 LandingPagePromptEbook/
├── 📁 data/
│   └── 📄 cases-videos.json ← CONFIGURE AQUI
├── 📁 img/
│   └── 📁 cases/
│       ├── 🖼️ case1-thumb.jpg ← SEU THUMBNAIL AQUI
│       ├── 🖼️ case1-poster.jpg ← SEU POSTER AQUI
│       ├── 🖼️ case2-thumb.jpg
│       ├── 🖼️ case2-poster.jpg
│       ├── 🖼️ case3-thumb.jpg
│       └── 🖼️ case3-poster.jpg
├── 📁 video/
│   └── 📁 cases/
│       ├── 🎬 case1.mp4 ← SEU VÍDEO AQUI
│       ├── 🎬 case2.mp4
│       └── 🎬 case3.mp4
└── 📄 index.html (página principal)
```

## 🎬 EXEMPLO: Adicionando Seu Vídeo no Case 1

### 1️⃣ **Copie seu vídeo para:**
```
📁 video/cases/case1.mp4
```

### 2️⃣ **Copie suas imagens para:**
```
📁 img/cases/case1-thumb.jpg    (400x300px)
📁 img/cases/case1-poster.jpg   (800x600px)
```

### 3️⃣ **Configure no arquivo JSON:**
```json
{
  "cases": [
    {
      "id": "case1",
      "title": "SEU TÍTULO AQUI",
      "company": "SUA EMPRESA AQUI",
      "category": "SUA CATEGORIA AQUI",
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
  ]
}
```

## 🔄 PROCESSO COMPLETO:

### ✅ **PASSO 1: Prepare os arquivos**
- Seu vídeo MP4 (máx 50MB)
- Thumbnail 400x300px 
- Poster 800x600px

### ✅ **PASSO 2: Copie para as pastas**
```bash
# Copie seu vídeo:
video/cases/case1.mp4

# Copie suas imagens:
img/cases/case1-thumb.jpg
img/cases/case1-poster.jpg
```

### ✅ **PASSO 3: Configure o JSON**
Edite: `data/cases-videos.json`
- Altere textos (título, empresa, etc.)
- Mantenha os caminhos dos arquivos

### ✅ **PASSO 4: Teste**
Abra: `test-video-system.html`

## 🎯 EXEMPLO DE NOMENCLATURA:

### **Para múltiplos cases:**
```
📁 video/cases/
├── 🎬 case1.mp4 (Automação E-commerce)
├── 🎬 case2.mp4 (IA Recursos Humanos)
└── 🎬 case3.mp4 (Análise Preditiva)

📁 img/cases/
├── 🖼️ case1-thumb.jpg + case1-poster.jpg
├── 🖼️ case2-thumb.jpg + case2-poster.jpg
└── 🖼️ case3-thumb.jpg + case3-poster.jpg
```

## 💡 DICAS IMPORTANTES:

1. **Nomes exatos**: Use exatamente os nomes mostrados
2. **Caminhos corretos**: Respeite as pastas indicadas
3. **Formato JSON**: Mantenha as aspas e vírgulas
4. **Teste sempre**: Use o arquivo de teste para verificar

---

**🚀 Seguindo esses passos, seu vídeo estará funcionando perfeitamente!**
