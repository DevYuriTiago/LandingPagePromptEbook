/**
 * @fileoverview Página principal da aplicação
 * Inicializa todos os componentes e gerencia o ciclo de vida da aplicação
 */

import { LoadingScreen } from '../components/LoadingScreen.js';
import { Header } from '../components/Header.js';
import { LeadForm } from '../components/LeadForm.js';
import { ScrollAnimations } from '../components/ScrollAnimations.js';
import { TrackAnalyticsUseCase } from '../../application/TrackAnalyticsUseCase.js';
import { CONFIG } from '../../core/config.js';
import { utils } from '../../core/utils.js';
import eventBus from '../../core/EventBus.js';

export class LandingPage {
    constructor() {
        this.components = {};
        this.analyticsUseCase = new TrackAnalyticsUseCase();
        this.isInitialized = false;
    }

    /**
     * Inicializa a aplicação
     */
    async init() {
        try {
            utils.log('Inicializando Landing Page', 'info');

            // Aguarda DOM estar pronto
            await this.waitForDOM();

            // Inicializa componentes
            this.initializeComponents();

            // Configura event listeners globais
            this.setupGlobalEventListeners();

            // Inicializa analytics
            this.initializeAnalytics();

            // Configura tratamento de erros
            this.setupErrorHandling();

            this.isInitialized = true;
            utils.log('Landing Page inicializada com sucesso', 'info');

            // Emite evento de inicialização
            eventBus.emit('app:initialized');

        } catch (error) {
            utils.log(`Erro ao inicializar aplicação: ${error.message}`, 'error');
            this.handleInitializationError(error);
        }
    }

    /**
     * Aguarda o DOM estar pronto
     */
    async waitForDOM() {
        return new Promise((resolve) => {
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', resolve);
            } else {
                resolve();
            }
        });
    }

    /**
     * Inicializa todos os componentes
     */
    initializeComponents() {
        utils.log('Inicializando componentes', 'info');

        // Loading Screen (primeiro componente)
        this.components.loadingScreen = new LoadingScreen();

        // Header
        this.components.header = new Header();

        // Lead Form
        this.components.leadForm = new LeadForm();

        // Scroll Animations
        this.components.scrollAnimations = new ScrollAnimations();

        // Configura comunicação entre componentes
        this.setupComponentCommunication();
    }

    /**
     * Configura comunicação entre componentes
     */
    setupComponentCommunication() {
        // Loading Screen finished -> Show other components
        eventBus.on('loading:finished', () => {
            this.onLoadingFinished();
        });

        // Lead Form success -> Analytics
        eventBus.on('lead:submit_success', (data) => {
            this.analyticsUseCase.trackConversion({
                value: 100, // Valor estimado de um lead
                currency: 'BRL',
                event_name: 'lead_submitted'
            });
        });

        // Header navigation -> Smooth scroll
        eventBus.on('header:navigation', (data) => {
            this.analyticsUseCase.trackCTAClick(`nav_${data.target}`);
        });

        // CTA clicks -> Analytics
        eventBus.on('header:cta_clicked', (data) => {
            this.analyticsUseCase.trackCTAClick('header_cta');
        });
    }

    /**
     * Configura event listeners globais
     */
    setupGlobalEventListeners() {
        // Cliques em CTAs
        this.setupCTATracking();

        // Navegação smooth scroll
        this.setupSmoothScrollNavigation();

        // Prevenção de spam no formulário
        this.setupFormSpamPrevention();

        // Keyboard navigation
        this.setupKeyboardNavigation();
    }

    /**
     * Configura rastreamento de CTAs
     */
    setupCTATracking() {
        const ctaButtons = document.querySelectorAll(CONFIG.SELECTORS.ctaButtons);
        
        ctaButtons.forEach((button, index) => {
            button.addEventListener('click', (e) => {
                const ctaText = button.textContent.trim();
                const ctaHref = button.getAttribute('href');
                
                this.analyticsUseCase.trackCTAClick(ctaText, button);
                
                // Se for link interno, previne comportamento padrão
                if (ctaHref && ctaHref.startsWith('#')) {
                    e.preventDefault();
                    this.scrollToSection(ctaHref.substring(1));
                }
            });
        });
    }

    /**
     * Configura navegação smooth scroll
     */
    setupSmoothScrollNavigation() {
        const navLinks = document.querySelectorAll('a[href^="#"]');
        
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                
                const targetId = link.getAttribute('href').substring(1);
                this.scrollToSection(targetId);
            });
        });
    }

    /**
     * Faz scroll para uma seção
     * @param {string} sectionId - ID da seção
     */
    scrollToSection(sectionId) {
        const targetElement = document.getElementById(sectionId);
        
        if (targetElement) {
            const headerHeight = this.components.header?.element?.offsetHeight || 0;
            const offset = headerHeight + 20;
            
            utils.smoothScrollTo(targetElement, offset);
        }
    }

    /**
     * Configura prevenção de spam no formulário
     */
    setupFormSpamPrevention() {
        let submitAttempts = 0;
        let lastSubmitTime = 0;
        
        eventBus.on('lead:submit_attempt', () => {
            const now = Date.now();
            const timeDiff = now - lastSubmitTime;
            
            if (timeDiff < 3000) { // 3 segundos entre tentativas
                submitAttempts++;
                
                if (submitAttempts > 3) {
                    utils.log('Possível spam detectado', 'warn');
                    eventBus.emit('form:spam_detected');
                }
            } else {
                submitAttempts = 0;
            }
            
            lastSubmitTime = now;
        });
    }

    /**
     * Configura navegação por teclado
     */
    setupKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            // ESC para fechar modais ou voltar ao topo
            if (e.key === 'Escape') {
                this.scrollToTop();
            }
            
            // Tab navigation enhancement
            if (e.key === 'Tab') {
                document.body.classList.add('keyboard-navigation');
            }
        });
        
        // Remove classe quando usar mouse
        document.addEventListener('click', () => {
            document.body.classList.remove('keyboard-navigation');
        });
    }

    /**
     * Faz scroll para o topo
     */
    scrollToTop() {
        utils.smoothScrollTo(document.body, 0);
    }

    /**
     * Inicializa analytics
     */
    initializeAnalytics() {
        this.analyticsUseCase.initializeAutoTracking();
    }

    /**
     * Configura tratamento de erros
     */
    setupErrorHandling() {
        // Erros JavaScript não capturados
        window.addEventListener('error', (e) => {
            utils.log(`Erro JavaScript: ${e.message}`, 'error');
            this.handleGlobalError(e);
        });

        // Promises rejeitadas não capturadas
        window.addEventListener('unhandledrejection', (e) => {
            utils.log(`Promise rejeitada: ${e.reason}`, 'error');
            this.handleGlobalError(e);
        });

        // Erros de recursos
        window.addEventListener('error', (e) => {
            if (e.target !== window) {
                utils.log(`Erro de recurso: ${e.target.src || e.target.href}`, 'error');
            }
        }, true);
    }

    /**
     * Manipula erro global
     * @param {Error} error - Erro
     */
    handleGlobalError(error) {
        // Em produção, você enviaria para um serviço de monitoramento
        console.error('Erro global capturado:', error);
        
        // Emite evento para componentes reagirem
        eventBus.emit('app:error', error);
    }

    /**
     * Manipula erro na inicialização
     * @param {Error} error - Erro de inicialização
     */
    handleInitializationError(error) {
        // Mostra mensagem de erro ao usuário
        const errorMessage = document.createElement('div');
        errorMessage.className = 'initialization-error';
        errorMessage.innerHTML = `
            <h3>Erro ao carregar a página</h3>
            <p>Ocorreu um erro durante o carregamento. Tente recarregar a página.</p>
            <button onclick="window.location.reload()">Recarregar</button>
        `;
        
        document.body.appendChild(errorMessage);
        
        // Força o fim do loading se ainda estiver ativo
        if (this.components.loadingScreen) {
            this.components.loadingScreen.forceFinish();
        }
    }

    /**
     * Callback chamado quando loading termina
     */
    onLoadingFinished() {
        utils.log('Loading terminado, inicializando recursos pós-loading', 'info');
        
        // Inicializa recursos que precisam do DOM visível
        this.initializePostLoadingResources();
        
        // Força primeira verificação de animações
        if (this.components.scrollAnimations) {
            this.components.scrollAnimations.animateAll();
        }
        
        // Emite evento
        eventBus.emit('app:ready');
    }

    /**
     * Inicializa recursos após o loading
     */
    initializePostLoadingResources() {
        // Lazy loading de imagens
        this.setupLazyLoading();
        
        // Prefetch de recursos
        this.setupResourcePrefetching();
        
        // Service worker (se necessário)
        this.setupServiceWorker();
    }

    /**
     * Configura lazy loading de imagens
     */
    setupLazyLoading() {
        const images = document.querySelectorAll('img[data-src]');
        
        if (images.length === 0) return;
        
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => {
            imageObserver.observe(img);
        });
    }

    /**
     * Configura prefetch de recursos
     */
    setupResourcePrefetching() {
        // Prefetch de recursos importantes
        const resources = [
            'css/prompts360-final.css',
            'foto_ebook.webp'
        ];
        
        resources.forEach(resource => {
            const link = document.createElement('link');
            link.rel = 'prefetch';
            link.href = resource;
            document.head.appendChild(link);
        });
    }

    /**
     * Configura service worker
     */
    setupServiceWorker() {
        if ('serviceWorker' in navigator) {
            // Implementar se necessário
            // navigator.serviceWorker.register('/sw.js');
        }
    }

    /**
     * Obtém informações sobre o desempenho
     */
    getPerformanceInfo() {
        if (performance.timing) {
            const timing = performance.timing;
            return {
                pageLoadTime: timing.loadEventEnd - timing.navigationStart,
                domContentLoaded: timing.domContentLoadedEventEnd - timing.navigationStart,
                firstPaint: performance.getEntriesByName('first-paint')[0]?.startTime || 0,
                firstContentfulPaint: performance.getEntriesByName('first-contentful-paint')[0]?.startTime || 0
            };
        }
        return {};
    }

    /**
     * Destrói a aplicação
     */
    destroy() {
        // Destrói todos os componentes
        Object.values(this.components).forEach(component => {
            if (component.destroy) {
                component.destroy();
            }
        });
        
        // Limpa event listeners
        eventBus.removeAllListeners();
        
        this.isInitialized = false;
        utils.log('Landing Page destruída', 'info');
    }
}
