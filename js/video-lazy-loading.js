/**
 * Sistema de Lazy Loading para Vídeos dos Cases
 * Otimiza o carregamento de vídeos para evitar sobrecarga do servidor
 */

// Configuração do Intersection Observer para lazy loading
const videoLazyLoadOptions = {
    root: null,
    rootMargin: '50px', // Carrega quando o vídeo está a 50px da viewport
    threshold: 0.1
};

// Observer para lazy loading de vídeos
const videoLazyLoadObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const video = entry.target;
            const videoContainer = video.closest('.case-video-container');
            
            // Só carrega se ainda não foi carregado
            if (video.dataset.src && !video.src) {
                // Define a fonte do vídeo
                video.src = video.dataset.src;
                const source = video.querySelector('source');
                if (source && source.dataset.src) {
                    source.src = source.dataset.src;
                }
                
                // Carrega o vídeo
                video.load();
                
                // Remove o atributo data-src para marcar como carregado
                delete video.dataset.src;
                
                // Adiciona classe para indicar que está carregado
                video.classList.add('video-loaded');
                
                // Para de observar este vídeo
                observer.unobserve(video);
            }
        }
    });
}, videoLazyLoadOptions);

// Sistema de autoplay inteligente
const videoPlayObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        const video = entry.target;
        
        if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
            // Vídeo está visível - inicia reprodução
            if (video.paused && video.src) {
                video.play().catch(e => {
                    // Autoplay silenciosamente bloqueado
                });
            }
        } else {
            // Vídeo não está visível - pausa reprodução
            if (!video.paused) {
                video.pause();
            }
        }
    });
}, {
    root: null,
    rootMargin: '0px',
    threshold: 0.5
});

// Inicializa o sistema quando o DOM estiver pronto
function initVideoLazyLoading() {
    // Encontra todos os vídeos dos cases
    const caseVideos = document.querySelectorAll('.case-video');
    
    caseVideos.forEach(video => {
        // Remove autoplay se existir
        video.removeAttribute('autoplay');
        
        // Define preload como none para economizar banda
        video.setAttribute('preload', 'none');
        
        // Adiciona loading lazy
        video.setAttribute('loading', 'lazy');
        
        // Adiciona classe para identificação
        video.classList.add('lazy-video');
        
        // Move src para data-src se ainda não estiver
        if (video.src && !video.dataset.src) {
            video.dataset.src = video.src;
            video.removeAttribute('src');
        }
        
        // Faz o mesmo com source tags
        const source = video.querySelector('source');
        if (source && source.src && !source.dataset.src) {
            source.dataset.src = source.src;
            source.removeAttribute('src');
        }
        
        // Inicia observação para lazy loading
        videoLazyLoadObserver.observe(video);
        
        // Inicia observação para autoplay inteligente
        videoPlayObserver.observe(video);
    });
}

// Inicia o sistema
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initVideoLazyLoading);
} else {
    initVideoLazyLoading();
}

// Função para forçar carregamento de um vídeo específico
window.loadVideo = function(videoElement) {
    if (videoElement.dataset.src) {
        videoElement.src = videoElement.dataset.src;
        const source = videoElement.querySelector('source');
        if (source && source.dataset.src) {
            source.src = source.dataset.src;
        }
        videoElement.load();
        delete videoElement.dataset.src;
        videoElement.classList.add('video-loaded');
    }
};

// Função para precarregar vídeo seguinte (otimização UX)
window.preloadNextVideo = function() {
    const videos = document.querySelectorAll('.lazy-video:not(.video-loaded)');
    if (videos.length > 0) {
        window.loadVideo(videos[0]);
    }
};
