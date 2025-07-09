# 📹 INSTRUÇÕES PARA GERENCIAR VÍDEOS DOS CASES

## 🎯 Configuração dos Vídeos

### 📁 Estrutura de Pastas Necessárias

Crie as seguintes pastas no seu projeto:

```
📁 seu-projeto/
├── 📁 data/
│   └── 📄 cases-videos.json (já criado)
├── 📁 img/
│   └── 📁 cases/
│       ├── 🖼️ case1-thumb.jpg
│       ├── 🖼️ case1-poster.jpg
│       ├── 🖼️ case2-thumb.jpg
│       ├── 🖼️ case2-poster.jpg
│       ├── 🖼️ case3-thumb.jpg
│       └── 🖼️ case3-poster.jpg
└── 📁 video/
    └── 📁 cases/
        ├── 🎬 case1.mp4
        ├── 🎬 case2.mp4
        └── 🎬 case3.mp4
```

### 📄 Como Editar o Arquivo de Configuração

O arquivo `data/cases-videos.json` contém todas as configurações dos vídeos. Para alterar os vídeos:

#### 1. **Para Vídeos do YouTube:**
```json
{
  "video": {
    "type": "youtube",
    "id": "SEU_VIDEO_ID_AQUI",
    "thumbnail": "img/cases/case1-thumb.jpg",
    "poster": "img/cases/case1-poster.jpg",
    "local_file": "video/cases/case1.mp4"
  }
}
```

#### 2. **Para Vídeos do Vimeo:**
```json
{
  "video": {
    "type": "vimeo",
    "id": "SEU_VIDEO_ID_AQUI",
    "thumbnail": "img/cases/case1-thumb.jpg",
    "poster": "img/cases/case1-poster.jpg",
    "local_file": "video/cases/case1.mp4"
  }
}
```

#### 3. **Para Vídeos Locais:**
```json
{
  "video": {
    "type": "local",
    "id": "case1",
    "thumbnail": "img/cases/case1-thumb.jpg",
    "poster": "img/cases/case1-poster.jpg",
    "local_file": "video/cases/case1.mp4"
  }
}
```

### 🎬 Onde Colocar os Arquivos

#### **Vídeos Locais:**
- 📁 Pasta: `video/cases/`
- 📄 Formato: MP4, WebM, MOV
- 📏 Tamanho recomendado: Máximo 50MB por vídeo
- 🎞️ Resolução: 1920x1080 (Full HD) ou 1280x720 (HD)

#### **Imagens de Thumbnail:**
- 📁 Pasta: `img/cases/`
- 📄 Formato: JPG, PNG, WebP
- 📏 Tamanho recomendado: 400x300px
- 🎨 Qualidade: Alta (para boa visualização)

#### **Imagens de Poster:**
- 📁 Pasta: `img/cases/`
- 📄 Formato: JPG, PNG, WebP
- 📏 Tamanho recomendado: 800x600px
- 🎨 Uso: Imagem de fallback caso o vídeo não carregue

### 🛠️ Como Alterar os Vídeos

#### **Passo 1: Edite o arquivo JSON**
```bash
# Abra o arquivo:
data/cases-videos.json

# Altere os IDs dos vídeos ou caminhos dos arquivos
```

#### **Passo 2: Adicione os arquivos**
```bash
# Para vídeos locais, copie para:
video/cases/seu-video.mp4

# Para thumbnails, copie para:
img/cases/seu-thumbnail.jpg
```

#### **Passo 3: Teste**
```bash
# Recarregue a página para ver as mudanças
# Os vídeos serão carregados automaticamente
```

### 📝 Exemplos de IDs de Vídeo

#### **YouTube:**
- URL: `https://www.youtube.com/watch?v=dQw4w9WgXcQ`
- ID: `dQw4w9WgXcQ`

#### **Vimeo:**
- URL: `https://vimeo.com/123456789`
- ID: `123456789`

### ⚙️ Configurações Avançadas

No arquivo JSON, você pode alterar as configurações gerais:

```json
{
  "video_settings": {
    "default_type": "youtube",
    "autoplay": false,
    "controls": true,
    "muted": false,
    "loop": false,
    "preload": "metadata"
  }
}
```

### 🔄 Recarregar Dados

Se você alterar o arquivo JSON, a página automaticamente detectará as mudanças na próxima vez que carregar.

### 🚨 Dicas Importantes

1. **Teste sempre** após fazer alterações
2. **Use nomes descritivos** para os arquivos
3. **Mantenha o formato JSON válido** (use um validador online)
4. **Otimize as imagens** para web (comprima antes de usar)
5. **Teste em diferentes dispositivos** (mobile, tablet, desktop)

### 📞 Suporte

Se tiver problemas:
1. Verifique o console do navegador (F12)
2. Confirme se os caminhos dos arquivos estão corretos
3. Teste se os vídeos abrem individualmente
4. Verifique se o JSON está válido

---

**✅ Agora você pode gerenciar todos os vídeos editando apenas um arquivo JSON!**
