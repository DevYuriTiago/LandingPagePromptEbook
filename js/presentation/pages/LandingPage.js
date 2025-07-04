/**
 * @fileoverview Página principal da aplicação
 * Inicializa todos os componentes e gerencia o ciclo de vida da aplicação
 */

import { LoadingScreen } from '../components/LoadingScreen.js';
import { Header } from '../components/Header.js';
import { LeadForm } from '../components/LeadForm.js';
import { ScrollAnimations } from '../components/ScrollAnimations.js';
// import { CasesSectionSimple } from '../components/CasesSectionSimple.js';
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
            // Aguarda o DOM estar pronto
            await utils.waitForDOMReady();
            
            // Configura tratamento de erros global
            this.setupGlobalErrorHandling();
            
            // Inicializa componentes na ordem correta
            await this.initializeComponents();
            
            // Configura eventos globais
            this.setupGlobalEvents();
            
            // Rastreia carregamento da página
            await this.trackPageLoad();
            
            // Marca como inicializado
            this.isInitialized = true;
            
            // Emite evento de inicialização
            eventBus.emit('app:initialized');
            
        } catch (error) {
            this.handleInitializationError(error);
        }
    }

    /**
     * Inicializa todos os componentes
     */
    async initializeComponents() {
        // 1. Loading Screen (primeiro para mostrar feedback)
        this.components.loadingScreen = new LoadingScreen();
        await this.components.loadingScreen.init();
        
        // 2. Header (navegação)
        this.components.header = new Header();
        await this.components.header.init();
        
        // 3. Lead Form (principal)
        this.components.leadForm = new LeadForm();
        await this.components.leadForm.init();
        
        // 4. Cases Section (cases de sucesso) - Temporariamente desabilitado
        // console.log('🔍 Inicializando CasesSection...');
        // this.components.casesSection = new CasesSectionSimple();
        // await this.components.casesSection.init();
        // console.log('✅ CasesSection inicializada!');
        
        // 5. Scroll Animations (visual)
        this.components.scrollAnimations = new ScrollAnimations();
        await this.components.scrollAnimations.init();
        
        // 6. Configura otimizações
        this.setupOptimizations();
    }

    /**
     * Configura tratamento de erros global
     */
    setupGlobalErrorHandling() {
        // Erros JavaScript
        window.addEventListener('error', (event) => {
            this.handleGlobalError(event.error);
        });
        
        // Erros de Promise não tratadas
        window.addEventListener('unhandledrejection', (event) => {
            this.handleGlobalError(event.reason);
        });
        
        // Erros de recursos
        window.addEventListener('error', (event) => {
            if (event.target !== window) {
                this.handleResourceError(event.target);
            }
        }, true);
    }

    /**
     * Configura eventos globais
     */
    setupGlobalEvents() {
        // Evento de redimensionamento
        window.addEventListener('resize', utils.debounce(() => {
            eventBus.emit('window:resize');
        }, 250));
        
        // Evento de scroll
        window.addEventListener('scroll', utils.throttle(() => {
            eventBus.emit('window:scroll', {
                scrollY: window.scrollY,
                scrollX: window.scrollX
            });
        }, 16));
        
        // Evento de mudança de visibilidade
        document.addEventListener('visibilitychange', () => {
            eventBus.emit('page:visibility', {
                visible: !document.hidden
            });
        });
        
        // Evento de beforeunload
        window.addEventListener('beforeunload', () => {
            eventBus.emit('app:beforeunload');
        });
    }

    /**
     * Configura otimizações
     */
    setupOptimizations() {
        // Lazy loading
        this.setupLazyLoading();
        
        // Prefetch de recursos
        this.setupResourcePrefetching();
        
        // Service Worker
        this.setupServiceWorker();
    }

    /**
     * Rastreia carregamento da página
     */
    async trackPageLoad() {
        try {
            // Rastreia performance
            const performanceInfo = this.getPerformanceInfo();
            
            await this.analyticsUseCase.trackEvent('page_load', {
                url: window.location.href,
                referrer: document.referrer,
                userAgent: navigator.userAgent,
                ...performanceInfo
            });
            
            // Rastreia visualização da página
            await this.analyticsUseCase.trackEvent('page_view', {
                url: window.location.href,
                title: document.title
            });
            
        } catch (error) {
            // Falha no analytics não deve quebrar a aplicação
            // Erro silencioso
        }
    }

    /**
     * Manipula erros de recursos
     * @param {HTMLElement} element - Elemento que falhou
     */
    handleResourceError(element) {
        const errorInfo = {
            type: element.tagName,
            src: element.src || element.href,
            url: window.location.href
        };
        
        // Em produção, enviar para serviço de monitoramento
        eventBus.emit('app:resource-error', errorInfo);
    }

    /**
     * Manipula erros globais
     * @param {Error} error - Erro
     */
    handleGlobalError(error) {
        // Em produção, você enviaria para um serviço de monitoramento
        // console.error('Erro global capturado:', error);
        
        // Emite evento para componentes reagirem
        eventBus.emit('app:error', error);
    }

    /**
     * Manipula erro na inicialização
     * @param {Error} error - Erro de inicialização
     */
    handleInitializationError(error) {
        // Em produção, você enviaria para um serviço de monitoramento
        
        // Emite evento de erro crítico
        eventBus.emit('app:critical-error', error);
        
        // Tenta recuperação básica
        this.attemptRecovery();
    }

    /**
     * Tenta recuperar a aplicação após erro crítico
     */
    attemptRecovery() {
        try {
            // Remove loading screen se existir
            const loadingElement = document.querySelector('.loading-screen');
            if (loadingElement) {
                loadingElement.remove();
            }
            
            // Mostra conteúdo básico
            document.body.classList.add('error-recovery');
            
            // Emite evento de recuperação
            eventBus.emit('app:recovery-attempted');
            
        } catch (recoveryError) {
            // Se a recuperação falhar, pelo menos remove o loading
            document.body.innerHTML = document.body.innerHTML.replace(
                /<div[^>]*loading-screen[^>]*>.*?<\/div>/gs, 
                ''
            );
        }
    }

    /**
     * Verifica se a aplicação está inicializada
     */
    isAppInitialized() {
        return this.isInitialized;
    }

    /**
     * Obtém componente por nome
     * @param {string} name - Nome do componente
     */
    getComponent(name) {
        return this.components[name];
    }

    /**
     * Obtém todos os componentes
     */
    getComponents() {
        return { ...this.components };
    }

    /**
     * Recarrega a aplicação
     */
    async reload() {
        // Destroi componentes existentes
        this.destroy();
        
        // Reinicializa
        await this.init();
    }

    /**
     * Pausa a aplicação
     */
    pause() {
        Object.values(this.components).forEach(component => {
            if (component.pause) {
                component.pause();
            }
        });
        
        eventBus.emit('app:paused');
    }

    /**
     * Resume a aplicação
     */
    resume() {
        Object.values(this.components).forEach(component => {
            if (component.resume) {
                component.resume();
            }
        });
        
        eventBus.emit('app:resumed');
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
        
        // Limpa componentes
        this.components = {};
        
        // Remove event listeners
        window.removeEventListener('error', this.handleGlobalError);
        window.removeEventListener('unhandledrejection', this.handleGlobalError);
        
        // Marca como não inicializado
        this.isInitialized = false;
        
        // Emite evento de destruição
        eventBus.emit('app:destroyed');
    }
}

// Instância global
export const landingPage = new LandingPage();
