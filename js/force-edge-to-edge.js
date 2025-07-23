/**
 * Force Edge-to-Edge Marquee Effect
 * Garante que os carrosséis se estendam de canto a canto da tela
 * mesmo após o carregamento da página
 */

function forceEdgeToEdgeEffect() {
    // Seleciona todos os containers de marquee
    const marqueeContainers = document.querySelectorAll('.marquee-container');
    
    marqueeContainers.forEach((container, index) => {
        // Força os estilos edge-to-edge
        container.style.width = '100vw';
        container.style.marginLeft = 'calc(-50vw + 50%)';
        container.style.marginRight = 'calc(-50vw + 50%)';
        container.style.boxSizing = 'border-box';
    });
}

// Aplica o efeito quando o DOM estiver carregado
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', forceEdgeToEdgeEffect);
} else {
    forceEdgeToEdgeEffect();
}

// Aplica novamente após um pequeno delay para garantir
setTimeout(forceEdgeToEdgeEffect, 100);

// Observa mudanças no DOM para reaplicar se necessário
const observer = new MutationObserver((mutations) => {
    let shouldReapply = false;
    
    mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
            const addedNodes = Array.from(mutation.addedNodes);
            const hasMarquee = addedNodes.some(node => 
                node.nodeType === 1 && 
                (node.classList?.contains('marquee-container') || 
                 node.querySelector?.('.marquee-container'))
            );
            
            if (hasMarquee) {
                shouldReapply = true;
            }
        }
        
        if (mutation.type === 'attributes' && 
            mutation.target.classList?.contains('marquee-container') &&
            (mutation.attributeName === 'style' || mutation.attributeName === 'class')) {
            shouldReapply = true;
        }
    });
    
    if (shouldReapply) {
        setTimeout(forceEdgeToEdgeEffect, 50);
    }
});

// Inicia a observação
observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ['style', 'class']
});

// Garante aplicação quando a página fica visível
document.addEventListener('visibilitychange', () => {
    if (!document.hidden) {
        setTimeout(forceEdgeToEdgeEffect, 100);
    }
});

// Aplica quando a janela é redimensionada
window.addEventListener('resize', () => {
    setTimeout(forceEdgeToEdgeEffect, 100);
});
