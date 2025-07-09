# 🎬 INSTRUÇÕES SIMPLIFICADAS - Gerenciar Vídeos dos Cases

## ✅ SITUAÇÃO ATUAL

O sistema de vídeos está **FUNCIONANDO** e configurado! 

## 🎯 Como Alterar os Vídeos

### 📂 **Localização dos Dados:**

Edite apenas este arquivo:
```
js/presentation/components/CasesSectionIntegrated.js
```

### 🔧 **Como Fazer Alterações:**

#### **1. Encontre a função `getCasesData()`** (linha ~13)

#### **2. Para alterar o CASE 1:**
```javascript
{
    id: 'case1',
    title: 'SEU TÍTULO AQUI',           // ← Altere aqui
    company: 'SUA EMPRESA AQUI',        // ← Altere aqui
    category: 'SUA CATEGORIA AQUI',     // ← Altere aqui
    challenge: 'DESAFIO DO CLIENTE',    // ← Altere aqui
    solution: 'SOLUÇÃO IMPLEMENTADA',   // ← Altere aqui
    results: [
        'RESULTADO 1',                  // ← Altere aqui
        'RESULTADO 2',                  // ← Altere aqui
        'RESULTADO 3'                   // ← Altere aqui
    ],
    video: {
        type: 'local',                  // ← local/youtube/vimeo
        id: 'case1',
        thumbnail: 'img/cases/case1-thumb.jpg',
        poster: 'img/cases/case1-poster.jpg',
        local_file: 'video/cases/case1.mp4'    // ← Seu vídeo
    }
}
```

## 🎬 **Tipos de Vídeo Suportados:**

### **📁 Vídeo Local:**
```javascript
video: {
    type: 'local',
    id: 'case1',
    local_file: 'video/cases/case1.mp4'    // ← Coloque seu MP4 aqui
}
```

### **📺 YouTube:**
```javascript
video: {
    type: 'youtube',
    id: 'dQw4w9WgXcQ',                     // ← ID do vídeo do YouTube
}
```

### **🎞️ Vimeo:**
```javascript
video: {
    type: 'vimeo',
    id: '123456789',                       // ← ID do vídeo do Vimeo
}
```

## 📁 **Onde Colocar os Arquivos:**

### **Vídeos:**
```
📁 video/cases/
├── 🎬 case1.mp4    (seu vídeo aqui)
├── 🎬 case2.mp4
└── 🎬 case3.mp4
```

### **Imagens (opcional):**
```
📁 img/cases/
├── 🖼️ case1-thumb.jpg    (thumbnail)
├── 🖼️ case1-poster.jpg   (poster)
```

## 🔄 **Exemplo Prático - Alterando o Case 1:**

### **1. Copie seu vídeo:**
```
Copie: seu-video.mp4
Para:  video/cases/case1.mp4
```

### **2. Edite o arquivo JavaScript:**
```javascript
// Linha ~15 em CasesSectionIntegrated.js
{
    id: 'case1',
    title: 'Meu Projeto de IA',
    company: 'Minha Empresa',
    category: 'Inteligência Artificial',
    challenge: 'Automatizar processo manual',
    solution: 'Sistema de IA personalizado',
    results: [
        '500% aumento de produtividade',
        '90% redução de erros',
        '50% economia de tempo'
    ],
    video: {
        type: 'local',
        id: 'case1',
        local_file: 'video/cases/case1.mp4'
    }
}
```

### **3. Salve e teste:**
Abra: `index.html` ou `test-final-cases.html`

## 🎯 **Para Adicionar Mais Cases:**

Copie o padrão e adicione no array:

```javascript
return [
    {
        // Case 1 existente...
    },
    {
        // Case 2 existente...
    },
    {
        // Case 3 existente...
    },
    {
        // Novo Case 4
        id: 'case4',
        title: 'Novo Case',
        company: 'Nova Empresa',
        // ... resto da configuração
    }
];
```

## ✅ **Verificação Rápida:**

- [ ] Arquivo `CasesSectionIntegrated.js` editado
- [ ] Vídeo copiado para pasta correta
- [ ] Página recarregada para ver mudanças
- [ ] Botão de play funciona
- [ ] Vídeo abre quando clicado

---

**🚀 Agora você pode alterar facilmente todos os dados dos cases editando apenas um arquivo JavaScript!**
