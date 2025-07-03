/**
 * @fileoverview Componente de Animações
 * Gerencia animações de scroll e efeitos visuais
 */

import { BaseComponent } from './BaseComponent.js';
import { CONFIG } from '../../core/config.js';
import { utils } from '../../core/utils.js';

export class ScrollAnimations extends BaseComponent {
    constructor() {
        super(null, { autoInit: true });
        this.observer = null;
        this.animatedElements = [];
        this.observerOptions = CONFIG.ANIMATION.observerOptions;
    }

    /**
     * Renderiza o componente
     */
    render() {
        this.findAnimatedElements();
        this.setupIntersectionObserver();
        this.initializeAnimations();
    }

    /**
     * Encontra elementos a serem animados
     */
    findAnimatedElements() {
        this.animatedElements = Array.from(
            document.querySelectorAll(CONFIG.SELECTORS.animateElements)
        );
        
        utils.log(`Encontrados ${this.animatedElements.length} elementos para animação`, 'info');
    }

    /**
     * Configura o Intersection Observer
     */
    setupIntersectionObserver() {
        if (!window.IntersectionObserver) {
            utils.log('IntersectionObserver não suportado', 'warn');
            this.fallbackToScrollListener();
            return;
        }

        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateElement(entry.target);
                }
            });
        }, this.observerOptions);

        // Observa todos os elementos
        this.animatedElements.forEach(element => {
            this.observer.observe(element);
        });
    }

    /**
     * Inicializa as animações
     */
    initializeAnimations() {
        // Adiciona classes iniciais
        this.animatedElements.forEach(element => {
            element.classList.add('animate-ready');
        });

        // Anima elementos já visíveis
        this.animatedElements.forEach(element => {
            if (utils.isElementVisible(element)) {
                this.animateElement(element);
            }
        });
    }

    /**
     * Anima um elemento específico
     * @param {Element} element - Elemento a ser animado
     */
    animateElement(element) {
        if (element.classList.contains('animated')) {
            return; // Já foi animado
        }

        // Adiciona classe de animação
        element.classList.add('animated');

        // Determina o tipo de animação
        const animationType = this.getAnimationType(element);
        
        // Aplica animação
        this.applyAnimation(element, animationType);

        // Emite evento
        this.emit('animation:element_animated', {
            element: element,
            type: animationType
        });

        // Para de observar o elemento
        if (this.observer) {
            this.observer.unobserve(element);
        }
    }

    /**
     * Determina o tipo de animação para um elemento
     * @param {Element} element - Elemento
     * @returns {string} Tipo de animação
     */
    getAnimationType(element) {
        // Verifica se tem classe específica de animação
        const classes = element.className.split(' ');
        const animationTypes = ['fade-in', 'slide-up', 'slide-down', 'slide-left', 'slide-right', 'zoom-in', 'zoom-out'];
        
        for (const type of animationTypes) {
            if (classes.includes(type)) {
                return type;
            }
        }

        // Animação padrão baseada no tipo de elemento
        if (element.classList.contains('service-card')) {
            return 'slide-up';
        }
        
        if (element.classList.contains('hero-content')) {
            return 'fade-in';
        }
        
        if (element.classList.contains('section-header')) {
            return 'slide-down';
        }

        return 'fade-in'; // Padrão
    }

    /**
     * Aplica animação a um elemento
     * @param {Element} element - Elemento
     * @param {string} animationType - Tipo de animação
     */
    applyAnimation(element, animationType) {
        // Remove classes de estado inicial
        element.classList.remove('animate-ready');
        
        // Adiciona classe de animação
        element.classList.add(animationType);
        
        // Configura delay se necessário
        const delay = this.getAnimationDelay(element);
        if (delay > 0) {
            element.style.animationDelay = `${delay}ms`;
        }
        
        // Configura duração se necessário
        const duration = this.getAnimationDuration(element);
        if (duration > 0) {
            element.style.animationDuration = `${duration}ms`;
        }
    }

    /**
     * Obtém o delay de animação para um elemento
     * @param {Element} element - Elemento
     * @returns {number} Delay em milissegundos
     */
    getAnimationDelay(element) {
        // Verifica se tem atributo data-delay
        const dataDelay = element.getAttribute('data-animation-delay');
        if (dataDelay) {
            return parseInt(dataDelay, 10);
        }

        // Delay automático para elementos em grid
        if (element.parentElement && element.parentElement.classList.contains('services-grid')) {
            const siblings = Array.from(element.parentElement.children);
            const index = siblings.indexOf(element);
            return index * CONFIG.ANIMATION.staggerDelay;
        }

        return 0;
    }

    /**
     * Obtém a duração de animação para um elemento
     * @param {Element} element - Elemento
     * @returns {number} Duração em milissegundos
     */
    getAnimationDuration(element) {
        const dataDuration = element.getAttribute('data-animation-duration');
        if (dataDuration) {
            return parseInt(dataDuration, 10);
        }

        return CONFIG.UI.animationDuration;
    }

    /**
     * Fallback para navegadores sem IntersectionObserver
     */
    fallbackToScrollListener() {
        const throttledScrollHandler = utils.throttle(() => {
            this.animatedElements.forEach(element => {
                if (utils.isElementVisible(element) && !element.classList.contains('animated')) {
                    this.animateElement(element);
                }
            });
        }, 100);

        this.addEventListenerWithCleanup(window, 'scroll', throttledScrollHandler);
        
        // Executa uma vez para elementos já visíveis
        throttledScrollHandler();
    }

    /**
     * Adiciona um elemento para animação
     * @param {Element} element - Elemento
     */
    addElement(element) {
        if (this.animatedElements.includes(element)) {
            return;
        }

        this.animatedElements.push(element);
        element.classList.add('animate-ready');

        if (this.observer) {
            this.observer.observe(element);
        }

        // Anima se já está visível
        if (utils.isElementVisible(element)) {
            this.animateElement(element);
        }
    }

    /**
     * Remove um elemento da animação
     * @param {Element} element - Elemento
     */
    removeElement(element) {
        const index = this.animatedElements.indexOf(element);
        if (index > -1) {
            this.animatedElements.splice(index, 1);
        }

        if (this.observer) {
            this.observer.unobserve(element);
        }

        element.classList.remove('animate-ready', 'animated');
    }

    /**
     * Anima todos os elementos imediatamente
     */
    animateAll() {
        this.animatedElements.forEach(element => {
            this.animateElement(element);
        });
    }

    /**
     * Reseta todas as animações
     */
    resetAll() {
        this.animatedElements.forEach(element => {
            element.classList.remove('animated');
            element.classList.add('animate-ready');
            element.style.animationDelay = '';
            element.style.animationDuration = '';
        });

        // Re-observa elementos
        if (this.observer) {
            this.animatedElements.forEach(element => {
                this.observer.observe(element);
            });
        }
    }

    /**
     * Adiciona animação de parallax
     */
    setupParallaxEffect() {
        const parallaxElements = document.querySelectorAll('[data-parallax]');
        
        if (parallaxElements.length === 0) return;

        const throttledParallaxHandler = utils.throttle(() => {
            parallaxElements.forEach(element => {
                const speed = parseFloat(element.getAttribute('data-parallax')) || 0.5;
                const rect = element.getBoundingClientRect();
                const scrollTop = window.pageYOffset;
                const rate = scrollTop * speed;
                
                element.style.transform = `translateY(${rate}px)`;
            });
        }, 16); // ~60fps

        this.addEventListenerWithCleanup(window, 'scroll', throttledParallaxHandler);
    }

    /**
     * Adiciona efeito de hover nos cards
     */
    setupHoverEffects() {
        const hoverElements = document.querySelectorAll('.service-card, .price-option');
        
        hoverElements.forEach(element => {
            this.addEventListenerWithCleanup(element, 'mouseenter', () => {
                element.classList.add('hover-active');
            });
            
            this.addEventListenerWithCleanup(element, 'mouseleave', () => {
                element.classList.remove('hover-active');
            });
        });
    }

    /**
     * Callback chamado após inicialização
     */
    onInitialized() {
        this.setupParallaxEffect();
        this.setupHoverEffects();
        
        utils.log('Animações de scroll inicializadas', 'info');
    }

    /**
     * Destrói o componente
     */
    destroy() {
        if (this.observer) {
            this.observer.disconnect();
            this.observer = null;
        }

        super.destroy();
    }
}
