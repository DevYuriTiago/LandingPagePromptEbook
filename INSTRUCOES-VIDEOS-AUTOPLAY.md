# 🎬 Instruções para Vídeos dos Cases

## 📁 Localização dos Vídeos

Os vídeos dos cases devem ser colocados na pasta:
```
video/cases/
```

## 📋 Nomenclatura dos Arquivos

Os vídeos devem ter exatamente estes nomes:
- `case1.mp4` - Para o primeiro case (E-commerce)
- `case2.mp4` - Para o segundo case (Recursos Humanos)
- `case3.mp4` - Para o terceiro case (Financeiro)

## 🎥 Especificações Técnicas Recomendadas

### Formato
- **Formato:** MP4 (H.264)
- **Resolução:** 1920x1080 (Full HD) ou 1280x720 (HD)
- **Aspect Ratio:** 16:9
- **Duração:** 10-30 segundos (ideal para loop)

### Configurações
- **Sem áudio:** Os vídeos devem ser mudos ou o áudio será automaticamente silenciado
- **Otimizado para web:** Compressão adequada para carregamento rápido
- **Tamanho:** Máximo 10MB por vídeo

### Conteúdo
- **Conteúdo visual:** Demonstração do produto/serviço sem necessidade de áudio
- **Loop perfeito:** O final do vídeo deve se conectar suavemente com o início
- **Qualidade:** Boa qualidade visual mas otimizada para web

## 🔧 Comportamento dos Vídeos

### Autoplay
- Os vídeos iniciam automaticamente quando a seção "Cases de Sucesso" entra na viewport
- Param automaticamente quando a seção sai da viewport
- Reiniciam do início quando a seção volta a ficar visível

### Responsividade
- Os vídeos se adaptam automaticamente ao tamanho do card
- Mantêm a proporção (object-fit: cover)
- Funcionam em dispositivos móveis e desktop

### Estados
- **Loading:** Vídeo carregando (efeito de blur)
- **Playing:** Vídeo reproduzindo normalmente
- **Paused:** Vídeo pausado (menor brilho)
- **Error:** Fallback para mensagem de erro

## 🛠️ Como Adicionar Novos Vídeos

1. **Adicionar arquivo:** Coloque o arquivo MP4 na pasta `video/cases/`
2. **Nomenclatura:** Use o nome exato (case1.mp4, case2.mp4, etc.)
3. **Testar:** Recarregue a página e verifique se o vídeo carrega

## 📱 Fallback para Vídeos Indisponíveis

Se um vídeo não puder ser carregado:
- Será exibida uma mensagem "Vídeo não disponível"
- O card continuará funcional
- Não afetará os outros vídeos

## 🔄 Alteração de Vídeos

Para alterar um vídeo existente:
1. Substitua o arquivo na pasta `video/cases/`
2. Mantenha o mesmo nome
3. Recarregue a página (pode precisar limpar o cache)

## 💡 Dicas de Otimização

### Compressão
- Use ferramentas como HandBrake ou FFmpeg para otimizar
- Bitrate recomendado: 1000-3000 kbps
- Mantenha qualidade visual mas reduza o tamanho

### Exemplo de comando FFmpeg:
```bash
ffmpeg -i input.mp4 -c:v libx264 -preset slow -crf 23 -c:a aac -b:a 128k -movflags +faststart output.mp4
```

### Teste de Performance
- Verifique o carregamento em conexões lentas
- Teste em diferentes dispositivos
- Monitore o uso de dados

## 🚀 Próximos Passos

1. **Adicionar os vídeos reais** na pasta `video/cases/`
2. **Testar** o funcionamento em diferentes dispositivos
3. **Otimizar** conforme necessário
4. **Monitorar** performance e experiência do usuário

---

**Nota:** O sistema está completamente funcional. Basta adicionar os arquivos de vídeo na pasta correta para que tudo funcione automaticamente!
