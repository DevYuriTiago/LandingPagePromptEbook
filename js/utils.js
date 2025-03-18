/**
 * Funções utilitárias para a Landing Page
 */

// Função para carregar scripts de forma assíncrona
function loadScript(src, async = true, defer = true) {
    const script = document.createElement('script');
    script.src = src;
    if (async) script.async = true;
    if (defer) script.defer = true;
    document.body.appendChild(script);
}

// Efeito de digitação para o título principal
function typeWriter(text, element, index = 0) {
    if (!element || index >= text.length) return;
    
    element.textContent += text.charAt(index);
    setTimeout(() => typeWriter(text, element, index + 1), 50);
}

// Detectar dispositivo móvel
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 768;

// Inicialização após carregamento da página
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar o popup de saída
    const exitPopup = document.getElementById('exit-popup');
    const closePopup = document.querySelector('.close-popup');
    
    if (exitPopup && closePopup) {
        // Mostrar popup quando o mouse sair da janela
        document.addEventListener('mouseout', function(e) {
            if (e.clientY < 0 && !sessionStorage.getItem('popupShown')) {
                exitPopup.classList.add('visible');
                sessionStorage.setItem('popupShown', 'true');
            }
        });
        
        // Fechar popup
        closePopup.addEventListener('click', function() {
            exitPopup.classList.remove('visible');
        });
    }
    
    // Ativar o sticky header quando o usuário rolar a página
    const stickyHeader = document.querySelector('.sticky-header');
    if (stickyHeader) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                stickyHeader.classList.add('visible');
            } else {
                stickyHeader.classList.remove('visible');
            }
        });
    }
    
    // Otimização para dispositivos móveis
    if (isMobile) {
        // Adiar carregamento de imagens de fundo
        const deferBgImages = document.querySelectorAll('.defer-bg-image');
        deferBgImages.forEach(el => {
            const bg = el.getAttribute('data-bg');
            if (bg) setTimeout(() => { el.style.backgroundImage = `url(${bg})`; }, 1000);
        });
        
        // Reduzir complexidade visual em dispositivos móveis
        document.body.classList.add('mobile-optimized');
    }
});

// Carrega scripts não críticos após o carregamento da página
window.addEventListener('load', function() {
    // Carregar scripts na ordem correta
    // Nota: sheets-integration.js, conversion-boost.js e main.js são carregados diretamente no HTML
    loadScript('js/analytics.js');
    
    // Efeito de digitação no título principal
    const titleElement = document.querySelector('.hero-text h1');
    if (titleElement) {
        const titleText = titleElement.textContent;
        titleElement.textContent = '';
        setTimeout(() => {
            typeWriter(titleText, titleElement);
        }, 500);
    }
    
    // Inicializa partículas apenas após carregamento completo
    if (typeof particlesJS === 'function' && document.getElementById('particles-js')) {
        // Configuração reduzida para dispositivos móveis
        particlesJS('particles-js', {
            particles: {
                number: { 
                    value: isMobile ? 30 : 80, 
                    density: { enable: true, value_area: isMobile ? 600 : 800 } 
                },
                color: { value: '#00ff88' },
                shape: { type: 'circle' },
                opacity: { value: 0.5, random: true },
                size: { value: isMobile ? 2 : 3, random: true },
                line_linked: {
                    enable: true,
                    distance: isMobile ? 100 : 150,
                    color: '#00ff88',
                    opacity: 0.4,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: isMobile ? 1 : 2,
                    direction: 'none',
                    random: true,
                    straight: false,
                    out_mode: 'out',
                    bounce: false
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: { enable: !isMobile, mode: 'grab' },
                    resize: true
                }
            },
            retina_detect: true
        });
    }
});
