/**
 * @fileoverview Componente de Header
 * Gerencia o comportamento do cabeçalho da página
 */

import { BaseComponent } from './BaseComponent.js';
import { CONFIG } from '../../core/config.js';
import { utils } from '../../core/utils.js';

export class Header extends BaseComponent {
    constructor(selector = CONFIG.SELECTORS.header) {
        super(selector);
        this.lastScrollY = 0;
        this.isScrolling = false;
        this.navLinks = [];
        this.ctaButton = null;
        this.threshold = CONFIG.UI.headerShowThreshold();
    }

    /**
     * Configura event listeners
     */
    setupEventListeners() {
        // Scroll listener com throttle
        const throttledScrollHandler = utils.throttle(() => {
            this.handleScroll();
        }, CONFIG.UI.debounceDelay);

        this.addEventListenerWithCleanup(window, 'scroll', throttledScrollHandler);

        // Resize listener
        const throttledResizeHandler = utils.throttle(() => {
            this.handleResize();
        }, CONFIG.UI.debounceDelay);

        this.addEventListenerWithCleanup(window, 'resize', throttledResizeHandler);

        // Navigation links
        this.setupNavigationLinks();

        // CTA button
        this.setupCTAButton();
    }

    /**
     * Renderiza o componente
     */
    render() {
        this.findHeaderElements();
        this.setupInitialState();
    }

    /**
     * Encontra elementos do header
     */
    findHeaderElements() {
        this.navLinks = Array.from(this.element.querySelectorAll(CONFIG.SELECTORS.navLinks));
        this.ctaButton = this.element.querySelector('.nav-cta');
    }

    /**
     * Configura estado inicial
     */
    setupInitialState() {
        // Header começa oculto
        this.element.style.transform = 'translateY(-100%)';
        
        // Verifica se deve mostrar imediatamente
        if (window.pageYOffset > this.threshold) {
            this.show();
        }
    }

    /**
     * Manipula evento de scroll
     */
    handleScroll() {
        const scrollY = window.pageYOffset;
        const scrollDirection = scrollY > this.lastScrollY ? 'down' : 'up';
        
        // Mostra/oculta header baseado no scroll
        if (scrollY > this.threshold) {
            this.show();
        } else {
            this.hide();
        }
        
        // Adiciona classe scrolled para mudanças visuais
        if (scrollY > 50) {
            this.addClass(CONFIG.CLASSES.scrolled);
        } else {
            this.removeClass(CONFIG.CLASSES.scrolled);
        }
        
        // Emite evento de scroll
        this.emit('header:scroll', {
            scrollY: scrollY,
            direction: scrollDirection,
            isVisible: this.isVisible()
        });
        
        this.lastScrollY = scrollY;
    }

    /**
     * Manipula evento de resize
     */
    handleResize() {
        // Recalcula threshold baseado no novo tamanho da janela
        this.threshold = CONFIG.UI.headerShowThreshold();
        
        // Emite evento de resize
        this.emit('header:resize', {
            width: window.innerWidth,
            height: window.innerHeight,
            threshold: this.threshold
        });
    }

    /**
     * Configura links de navegação
     */
    setupNavigationLinks() {
        this.navLinks.forEach(link => {
            this.addEventListenerWithCleanup(link, 'click', (e) => {
                e.preventDefault();
                
                const href = link.getAttribute('href');
                if (href && href.startsWith('#')) {
                    const targetId = href.substring(1);
                    this.navigateToSection(targetId);
                    
                    // Emite evento de navegação
                    this.emit('header:navigation', {
                        target: targetId,
                        link: link
                    });
                }
            });
        });
    }

    /**
     * Configura botão CTA
     */
    setupCTAButton() {
        if (this.ctaButton) {
            this.addEventListenerWithCleanup(this.ctaButton, 'click', (e) => {
                e.preventDefault();
                
                const href = this.ctaButton.getAttribute('href');
                if (href && href.startsWith('#')) {
                    const targetId = href.substring(1);
                    this.navigateToSection(targetId);
                    
                    // Emite evento de CTA
                    this.emit('header:cta_clicked', {
                        target: targetId,
                        button: this.ctaButton
                    });
                }
            });
        }
    }

    /**
     * Navega para uma seção da página
     * @param {string} sectionId - ID da seção
     */
    navigateToSection(sectionId) {
        const targetElement = document.getElementById(sectionId);
        
        if (targetElement) {
            const headerHeight = this.element.offsetHeight;
            const offset = headerHeight + 20;
            
            utils.smoothScrollTo(targetElement, offset);
            
            // Atualiza link ativo
            this.updateActiveLink(sectionId);
        }
    }

    /**
     * Atualiza link ativo na navegação
     * @param {string} activeSectionId - ID da seção ativa
     */
    updateActiveLink(activeSectionId) {
        this.navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === `#${activeSectionId}`) {
                link.classList.add(CONFIG.CLASSES.active);
            } else {
                link.classList.remove(CONFIG.CLASSES.active);
            }
        });
    }

    /**
     * Mostra o header
     */
    show() {
        this.element.style.transform = 'translateY(0)';
        this.addClass(CONFIG.CLASSES.visible);
        
        if (!this.isVisible()) {
            this.emit('header:shown');
        }
    }

    /**
     * Oculta o header
     */
    hide() {
        this.element.style.transform = 'translateY(-100%)';
        this.removeClass(CONFIG.CLASSES.visible);
        
        if (this.isVisible()) {
            this.emit('header:hidden');
        }
    }

    /**
     * Verifica se o header está visível
     * @returns {boolean} Se está visível
     */
    isVisible() {
        return this.hasClass(CONFIG.CLASSES.visible);
    }

    /**
     * Força a atualização do header
     */
    forceUpdate() {
        this.handleScroll();
        this.detectActiveSection();
    }

    /**
     * Detecta seção ativa baseada no scroll
     */
    detectActiveSection() {
        const sections = document.querySelectorAll('section[id]');
        const scrollY = window.pageYOffset;
        const headerHeight = this.element.offsetHeight;
        
        let activeSection = null;
        let minDistance = Infinity;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - headerHeight - 50;
            const sectionBottom = sectionTop + section.offsetHeight;
            
            if (scrollY >= sectionTop && scrollY < sectionBottom) {
                activeSection = section.id;
            } else {
                const distance = Math.abs(scrollY - sectionTop);
                if (distance < minDistance) {
                    minDistance = distance;
                    activeSection = section.id;
                }
            }
        });
        
        if (activeSection) {
            this.updateActiveLink(activeSection);
        }
    }

    /**
     * Configura indicador de scroll
     */
    setupScrollIndicator() {
        const scrollIndicator = document.createElement('div');
        scrollIndicator.className = 'scroll-indicator';
        this.element.appendChild(scrollIndicator);
        
        const updateScrollIndicator = () => {
            const scrollPercent = (window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
            scrollIndicator.style.width = `${scrollPercent}%`;
        };
        
        this.addEventListenerWithCleanup(window, 'scroll', updateScrollIndicator);
        updateScrollIndicator();
    }

    /**
     * Callback chamado após inicialização
     */
    onInitialized() {
        // Executa primeira verificação
        this.forceUpdate();
        
        // Configura indicador de scroll se necessário
        if (this.options.showScrollIndicator) {
            this.setupScrollIndicator();
        }
        
        // Detecta seção ativa periodicamente
        setInterval(() => {
            this.detectActiveSection();
        }, 500);
        
        utils.log('Header inicializado', 'info');
    }
}
