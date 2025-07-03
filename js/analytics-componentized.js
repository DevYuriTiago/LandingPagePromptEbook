/**
 * @fileoverview Analytics Componentizado
 * Integração com analytics usando arquitetura limpa
 * Mantém compatibilidade com implementação existente
 */

import { TrackAnalyticsUseCase } from './application/TrackAnalyticsUseCase.js';
import { AnalyticsEvent } from './domain/AnalyticsEvent.js';
import { utils } from './core/utils.js';

/**
 * Classe de Analytics Componentizada
 */
class AnalyticsManager {
    constructor() {
        this.trackAnalyticsUseCase = new TrackAnalyticsUseCase();
        this.isInitialized = false;
        this.legacyMode = false;
    }

    /**
     * Inicializa o manager de analytics
     */
    init() {
        try {
            // Verifica se o Google Analytics está disponível
            if (typeof gtag === 'function') {
                this.trackAnalyticsUseCase.initializeAutoTracking();
                this.isInitialized = true;
                utils.log('Analytics Manager inicializado', 'info');
            } else {
                utils.log('Google Analytics não disponível, usando modo legado', 'warn');
                this.legacyMode = true;
                this.initLegacyAnalytics();
            }
        } catch (error) {
            utils.log(`Erro ao inicializar Analytics: ${error.message}`, 'error');
            this.legacyMode = true;
            this.initLegacyAnalytics();
        }
    }

    /**
     * Inicializa analytics em modo legado
     */
    initLegacyAnalytics() {
        // Implementação legada das funcionalidades de analytics
        this.initLegacyPageTracking();
        this.initLegacyCTATracking();
        this.initLegacyScrollTracking();
        this.initLegacyTimeTracking();
    }

    /**
     * Rastreia visualização de página
     */
    trackPageView() {
        if (this.isInitialized) {
            this.trackAnalyticsUseCase.trackPageView();
        } else if (this.legacyMode) {
            this.legacyTrackPageView();
        }
    }

    /**
     * Rastreia clique em CTA
     * @param {string} ctaLabel - Rótulo do CTA
     * @param {Element} element - Elemento clicado
     */
    trackCTAClick(ctaLabel, element) {
        if (this.isInitialized) {
            this.trackAnalyticsUseCase.trackCTAClick(ctaLabel, element);
        } else if (this.legacyMode) {
            this.legacyTrackCTAClick(ctaLabel, element);
        }
    }

    /**
     * Rastreia evento genérico
     * @param {string} category - Categoria
     * @param {string} action - Ação
     * @param {string} label - Rótulo
     * @param {number} value - Valor
     */
    trackEvent(category, action, label, value) {
        if (this.isInitialized) {
            this.trackAnalyticsUseCase.execute(category, action, label, value);
        } else if (this.legacyMode) {
            this.legacyTrackEvent(category, action, label, value);
        }
    }

    /**
     * Implementações legadas para compatibilidade
     */
    initLegacyPageTracking() {
        if (typeof gtag === 'function') {
            gtag('event', 'page_view', {
                page_title: document.title,
                page_location: window.location.href,
                page_path: window.location.pathname
            });
        }
    }

    initLegacyCTATracking() {
        const ctaButtons = document.querySelectorAll('.cta-button');
        
        ctaButtons.forEach((button, index) => {
            button.addEventListener('click', () => {
                const ctaLabel = button.textContent?.trim() || `CTA_${index + 1}`;
                this.legacyTrackCTAClick(ctaLabel, button);
            });
        });
    }

    initLegacyScrollTracking() {
        const quarters = { '25%': false, '50%': false, '75%': false, '100%': false };
        
        window.addEventListener('scroll', () => {
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollTop = window.pageYOffset;
            const scrollPercentage = (scrollTop / scrollHeight) * 100;
            
            if (scrollPercentage >= 25 && !quarters['25%']) {
                quarters['25%'] = true;
                this.legacyTrackEvent('Engagement', 'Scroll_Depth', '25%', 25);
            }
            if (scrollPercentage >= 50 && !quarters['50%']) {
                quarters['50%'] = true;
                this.legacyTrackEvent('Engagement', 'Scroll_Depth', '50%', 50);
            }
            if (scrollPercentage >= 75 && !quarters['75%']) {
                quarters['75%'] = true;
                this.legacyTrackEvent('Engagement', 'Scroll_Depth', '75%', 75);
            }
            if (scrollPercentage >= 100 && !quarters['100%']) {
                quarters['100%'] = true;
                this.legacyTrackEvent('Engagement', 'Scroll_Depth', '100%', 100);
            }
        });
    }

    initLegacyTimeTracking() {
        const startTime = new Date();
        const timeMarkers = [30, 60, 120, 300];
        
        setInterval(() => {
            const timeSpent = Math.floor((new Date() - startTime) / 1000);
            
            if (timeMarkers.includes(timeSpent)) {
                this.legacyTrackEvent('Engagement', 'Time_On_Page', `${timeSpent}s`, timeSpent);
            }
        }, 1000);
    }

    legacyTrackPageView() {
        if (typeof gtag === 'function') {
            gtag('event', 'page_view', {
                page_title: document.title,
                page_location: window.location.href,
                page_path: window.location.pathname
            });
        }
    }

    legacyTrackCTAClick(ctaLabel, element) {
        if (typeof gtag === 'function') {
            gtag('event', 'cta_click', {
                'event_category': 'Engagement',
                'event_label': ctaLabel
            });
        }
    }

    legacyTrackEvent(category, action, label, value) {
        if (typeof gtag === 'function') {
            gtag('event', action, {
                'event_category': category,
                'event_label': label,
                'value': value
            });
        }
    }
}

// Cria instância global
const analyticsManager = new AnalyticsManager();

// Funções globais para compatibilidade
window.trackPageView = () => analyticsManager.trackPageView();
window.trackCTAClicks = () => analyticsManager.initLegacyCTATracking();
window.trackEvent = (category, action, label, value) => analyticsManager.trackEvent(category, action, label, value);
window.trackScroll = () => analyticsManager.initLegacyScrollTracking();
window.trackTimeOnPage = () => analyticsManager.initLegacyTimeTracking();

// Inicializa quando DOM estiver pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        analyticsManager.init();
    });
} else {
    analyticsManager.init();
}

export default analyticsManager;
