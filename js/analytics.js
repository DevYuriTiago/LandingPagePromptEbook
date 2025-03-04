/**
 * @fileoverview Módulo de Analytics para rastreamento de interações do usuário
 * Implementa funções para monitorar visualizações de página, eventos, cliques e comportamento do usuário
 */

// Constantes em maiúsculas
const MAX_SCROLL = 100;
const QUARTERS = {
    '25%': false,
    '50%': false,
    '75%': false,
    '100%': false
};
const TIME_MARKERS = [30, 60, 120, 300]; // Segundos

/**
 * Registra uma visualização de página no Google Analytics
 */
function trackPageView() {
    if (typeof gtag !== 'function') return;
    
    gtag('event', 'page_view', {
        page_title: document.title,
        page_location: window.location.href,
        page_path: window.location.pathname
    });
}

/**
 * Registra um evento de interação no Google Analytics
 * @param {string} category - Categoria do evento
 * @param {string} action - Ação realizada
 * @param {string|null} label - Rótulo descritivo (opcional)
 * @param {number|null} value - Valor numérico (opcional)
 */
function trackEvent(category, action, label = null, value = null) {
    if (typeof gtag !== 'function') return;
    
    gtag('event', action, {
        'event_category': category,
        'event_label': label,
        'value': value
    });
}

/**
 * Configura rastreamento de cliques em botões CTA
 */
function trackCTAClicks() {
    const ctaButtons = document.querySelectorAll('.cta-button');
    
    ctaButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            trackEvent('Engagement', 'CTA_Click', `CTA_${index + 1}`);
        });
    });
}

/**
 * Monitora o tempo que o usuário permanece na página
 */
function trackTimeOnPage() {
    const startTime = new Date();
    
    setInterval(() => {
        const timeSpent = Math.floor((new Date() - startTime) / 1000);
        
        if (TIME_MARKERS.includes(timeSpent)) {
            trackEvent('Engagement', 'Time_On_Page', `${timeSpent}s`, timeSpent);
        }
    }, 1000);
}

/**
 * Monitora a rolagem da página
 */
function trackScroll() {
    let maxScroll = 0;
    
    window.addEventListener('scroll', () => {
        // Calcula a porcentagem de rolagem
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollTop = window.scrollY;
        const scrollPercentage = (scrollTop / scrollHeight) * 100;
        
        // Atualiza o máximo de rolagem
        if (scrollPercentage > maxScroll) {
            maxScroll = scrollPercentage;
            
            // Verifica se atingiu cada quarto da página
            if (scrollPercentage >= 25 && !QUARTERS['25%']) {
                QUARTERS['25%'] = true;
                trackEvent('Engagement', 'Scroll_Depth', '25%', 25);
            }
            if (scrollPercentage >= 50 && !QUARTERS['50%']) {
                QUARTERS['50%'] = true;
                trackEvent('Engagement', 'Scroll_Depth', '50%', 50);
            }
            if (scrollPercentage >= 75 && !QUARTERS['75%']) {
                QUARTERS['75%'] = true;
                trackEvent('Engagement', 'Scroll_Depth', '75%', 75);
            }
            if (scrollPercentage >= MAX_SCROLL && !QUARTERS['100%']) {
                QUARTERS['100%'] = true;
                trackEvent('Engagement', 'Scroll_Depth', '100%', 100);
            }
        }
    });
}

// Inicialização do módulo
document.addEventListener('DOMContentLoaded', () => {
    trackPageView();
    trackCTAClicks();
    trackTimeOnPage();
    trackScroll();
    
    // Rastrear envios de formulário
    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', () => {
            trackEvent('Conversion', 'Form_Submit', form.id || 'lead_form');
        });
    });
});
