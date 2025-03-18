/**
 * @fileoverview Script para controlar o carrossel de módulos
 */

/**
 * Inicializa o carrossel de módulos
 */
function initModulesCarousel() {
    const track = document.querySelector('.modules-track');
    const cards = document.querySelectorAll('.module-card');
    const dotsContainer = document.querySelector('.carousel-dots');
    const prevButton = document.querySelector('.carousel-prev');
    const nextButton = document.querySelector('.carousel-next');
    
    if (!track || cards.length === 0) return;
    
    let currentIndex = 0;
    let cardWidth = cards[0].offsetWidth + 20; // largura + gap
    const visibleCards = getVisibleCardsCount();
    const totalCards = cards.length;
    
    // Configuração para carrossel infinito
    setupInfiniteCarousel();
    
    // Cria os pontos de navegação
    createDots();
    updateDots();
    
    // Configura os botões de navegação
    prevButton.addEventListener('click', () => {
        navigate(-1);
    });
    
    nextButton.addEventListener('click', () => {
        navigate(1);
    });
    
    // Adiciona navegação por toque para dispositivos móveis
    let touchStartX = 0;
    let touchEndX = 0;
    let isSwiping = false;
    
    track.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        isSwiping = true;
        // Pausa a rotação automática durante o swipe
        clearInterval(autoplayInterval);
    });
    
    track.addEventListener('touchmove', (e) => {
        if (!isSwiping) return;
        
        const currentX = e.changedTouches[0].screenX;
        const diff = currentX - touchStartX;
        
        // Aplica uma resistência para evitar que o usuário arraste muito longe
        const resistance = 0.3;
        const translateX = -(currentIndex - visibleCards) * cardWidth + diff * resistance;
        
        track.style.transform = `translateX(${translateX}px)`;
    });
    
    track.addEventListener('touchend', (e) => {
        if (!isSwiping) return;
        
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
        isSwiping = false;
        
        // Reinicia a rotação automática após o swipe
        autoplayInterval = setInterval(() => navigate(1), 5000);
    });
    
    function handleSwipe() {
        const swipeDistance = touchEndX - touchStartX;
        if (swipeDistance > 70) {
            navigate(-1); // Deslize para a direita
        } else if (swipeDistance < -70) {
            navigate(1); // Deslize para a esquerda
        } else {
            // Se o swipe não foi suficiente, retorna para a posição original
            updateCarousel(true);
        }
    }
    
    // Recalcula as dimensões ao redimensionar a janela
    window.addEventListener('resize', () => {
        cardWidth = cards[0].offsetWidth + 20;
        updateCarousel(false);
    });
    
    // Inicia a rotação automática do carrossel
    let autoplayInterval = setInterval(() => navigate(1), 5000);
    
    // Pausa a rotação automática quando o usuário interage com o carrossel
    track.addEventListener('mouseenter', () => {
        clearInterval(autoplayInterval);
    });
    
    track.addEventListener('mouseleave', () => {
        autoplayInterval = setInterval(() => navigate(1), 5000);
    });
    
    /**
     * Configura o carrossel para rolagem infinita
     */
    function setupInfiniteCarousel() {
        // Clonar os primeiros cards e adicionar ao final
        for (let i = 0; i < visibleCards; i++) {
            const clone = cards[i].cloneNode(true);
            track.appendChild(clone);
        }
        
        // Clonar os últimos cards e adicionar ao início
        for (let i = totalCards - 1; i >= totalCards - visibleCards; i--) {
            const clone = cards[i].cloneNode(true);
            track.insertBefore(clone, track.firstChild);
        }
        
        // Ajusta a posição inicial para mostrar os cards originais
        currentIndex = visibleCards;
        updateCarousel(false);
    }
    
    /**
     * Navega pelo carrossel
     * @param {number} direction - Direção da navegação (-1 para esquerda, 1 para direita)
     */
    function navigate(direction) {
        currentIndex += direction;
        
        // Atualiza o carrossel com animação
        updateCarousel(true);
        
        // Verifica se precisa fazer o loop infinito
        setTimeout(() => {
            if (currentIndex >= totalCards + visibleCards) {
                // Voltou para o início
                currentIndex = visibleCards;
                updateCarousel(false);
            } else if (currentIndex < visibleCards) {
                // Voltou para o final
                currentIndex = totalCards;
                updateCarousel(false);
            }
        }, 500); // Tempo igual à duração da transição CSS
        
        // Atualiza os pontos de navegação
        updateDots();
    }
    
    /**
     * Atualiza a posição do carrossel
     * @param {boolean} animate - Se deve animar a transição
     */
    function updateCarousel(animate) {
        if (!animate) {
            track.style.transition = 'none';
        } else {
            track.style.transition = 'transform 0.5s ease';
        }
        
        track.style.transform = `translateX(${-(currentIndex - visibleCards) * cardWidth}px)`;
        
        if (!animate) {
            // Força um reflow para que a transição seja desativada antes de qualquer animação
            track.offsetHeight;
            track.style.transition = 'transform 0.5s ease';
        }
    }
    
    /**
     * Cria os pontos de navegação
     */
    function createDots() {
        dotsContainer.innerHTML = '';
        
        for (let i = 0; i < totalCards; i++) {
            const dot = document.createElement('div');
            dot.classList.add('carousel-dot');
            dot.addEventListener('click', () => {
                // Calcula a diferença entre o índice do ponto clicado e o índice atual
                // Ajustado para considerar os cards clonados no início
                const normalizedCurrentIndex = (currentIndex - visibleCards + totalCards) % totalCards;
                let diff = i - normalizedCurrentIndex;
                
                // Otimiza a direção do movimento (pelo caminho mais curto)
                if (Math.abs(diff) > totalCards / 2) {
                    diff = diff > 0 ? diff - totalCards : diff + totalCards;
                }
                
                currentIndex += diff;
                updateCarousel(true);
                updateDots();
            });
            dotsContainer.appendChild(dot);
        }
    }
    
    /**
     * Atualiza o estado dos pontos de navegação
     */
    function updateDots() {
        const dots = dotsContainer.querySelectorAll('.carousel-dot');
        // Normaliza o índice atual para corresponder aos pontos de navegação
        const activeIndex = (currentIndex - visibleCards + totalCards) % totalCards;
        
        dots.forEach((dot, index) => {
            if (index === activeIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }
    
    /**
     * Determina o número de cards visíveis com base na largura da tela
     * @returns {number} Número de cards visíveis
     */
    function getVisibleCardsCount() {
        const windowWidth = window.innerWidth;
        if (windowWidth < 768) {
            return 1;
        } else if (windowWidth < 1024) {
            return 2;
        } else {
            return 3;
        }
    }
    
    // Inicializa o carrossel
    updateCarousel(false);
}

// Inicializa o carrossel quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', initModulesCarousel);
