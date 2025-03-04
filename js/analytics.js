// Código para rastreamento de visitantes e análise de tráfego
// Este script registra visualizações de página e eventos importantes

// Função para registrar visualização de página
function trackPageView() {
    // Se estiver usando Google Analytics
    if (typeof gtag === 'function') {
        gtag('event', 'page_view', {
            page_title: document.title,
            page_location: window.location.href,
            page_path: window.location.pathname
        });
    }
}

// Função para registrar eventos de interação
function trackEvent(category, action, label = null, value = null) {
    // Se estiver usando Google Analytics
    if (typeof gtag === 'function') {
        gtag('event', action, {
            'event_category': category,
            'event_label': label,
            'value': value
        });
    }
}

// Função para rastrear cliques em botões CTA
function trackCTAClicks() {
    const ctaButtons = document.querySelectorAll('.cta-button');
    
    ctaButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            trackEvent('Engagement', 'CTA_Click', `CTA_${index + 1}`, null);
        });
    });
}

// Função para rastrear tempo na página
function trackTimeOnPage() {
    let startTime = new Date();
    let timeSpent = 0;
    
    // Atualiza o tempo a cada 10 segundos
    setInterval(() => {
        timeSpent = Math.floor((new Date() - startTime) / 1000);
        
        // Registra marcos de tempo (30s, 1min, 2min, 5min)
        if (timeSpent === 30 || timeSpent === 60 || timeSpent === 120 || timeSpent === 300) {
            trackEvent('Engagement', 'Time_On_Page', `${timeSpent}s`, timeSpent);
        }
    }, 10000);
    
    // Registra o tempo total ao sair da página
    window.addEventListener('beforeunload', () => {
        timeSpent = Math.floor((new Date() - startTime) / 1000);
        trackEvent('Engagement', 'Total_Time', `${timeSpent}s`, timeSpent);
    });
}

// Função para rastrear rolagem da página
function trackScroll() {
    let maxScroll = 0;
    let quarters = {
        '25%': false,
        '50%': false,
        '75%': false,
        '100%': false
    };
    
    window.addEventListener('scroll', () => {
        // Calcula a porcentagem de rolagem
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollTop = window.scrollY;
        const scrollPercentage = (scrollTop / scrollHeight) * 100;
        
        // Atualiza o máximo de rolagem
        if (scrollPercentage > maxScroll) {
            maxScroll = scrollPercentage;
            
            // Verifica se atingiu cada quarto da página
            if (scrollPercentage >= 25 && !quarters['25%']) {
                quarters['25%'] = true;
                trackEvent('Engagement', 'Scroll_Depth', '25%', 25);
            }
            if (scrollPercentage >= 50 && !quarters['50%']) {
                quarters['50%'] = true;
                trackEvent('Engagement', 'Scroll_Depth', '50%', 50);
            }
            if (scrollPercentage >= 75 && !quarters['75%']) {
                quarters['75%'] = true;
                trackEvent('Engagement', 'Scroll_Depth', '75%', 75);
            }
            if (scrollPercentage >= 99 && !quarters['100%']) {
                quarters['100%'] = true;
                trackEvent('Engagement', 'Scroll_Depth', '100%', 100);
            }
        }
    });
}

// Inicializa o rastreamento quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    // Registra visualização de página
    trackPageView();
    
    // Inicia rastreamento de interações
    trackCTAClicks();
    trackTimeOnPage();
    trackScroll();
    
    // Rastreia envios de formulário
    const leadForm = document.getElementById('lead-form');
    if (leadForm) {
        leadForm.addEventListener('submit', () => {
            trackEvent('Conversion', 'Lead_Form_Submit', 'Email_Capture', null);
        });
    }
});
