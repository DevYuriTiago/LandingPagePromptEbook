/**
 * @fileoverview Componente de Header
 * Gerencia o cabeçalho da aplicação com navegação e visibilidade
 */

import { BaseComponent } from './BaseComponent.js';
import { CONFIG } from '../../core/config.js';
import { utils } from '../../core/utils.js';

export class Header extends BaseComponent {
    constructor(selector = CONFIG.SELECTORS.header) {
        super(selector);
        this.isVisible = false;
        this.isScrolled = false;
        this.lastScrollY = 0;
        this.navLinks = [];
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

        // Clique em links de navegação
        this.setupNavigation();

        // Resize listener
        const throttledResizeHandler = utils.throttle(() => {
            this.handleResize();
        }, 250);

        this.addEventListenerWithCleanup(window, 'resize', throttledResizeHandler);
    }

    /**
     * Renderiza o componente
     */
    render() {
        this.navLinks = this.element.querySelectorAll(CONFIG.SELECTORS.navLinks);
        this.setupInitialState();
    }

    /**
     * Configura o estado inicial
     */
    setupInitialState() {
        // Header inicia oculto
        this.hide();
        
        // Configura posição inicial
        this.element.style.transform = 'translateY(-100%)';
        
        // Adiciona classe para transições
        this.addClass('header');
    }

    /**
     * Configura a navegação
     */
    setupNavigation() {
        this.navLinks.forEach(link => {
            this.addEventListenerWithCleanup(link, 'click', (e) => {
                e.preventDefault();
                this.handleNavClick(link);
            });
        });

        // Logo click
        const logo = this.element.querySelector('.logo');
        if (logo) {
            this.addEventListenerWithCleanup(logo, 'click', (e) => {
                e.preventDefault();
                this.scrollToTop();
            });
        }

        // CTA button no header
        const navCTA = this.element.querySelector('.nav-cta');
        if (navCTA) {
            this.addEventListenerWithCleanup(navCTA, 'click', (e) => {
                e.preventDefault();
                this.handleCTAClick(navCTA);
            });
        }
    }

    /**
     * Manipula o scroll da página
     */
    handleScroll() {
        const scrollY = window.pageYOffset;
        const threshold = CONFIG.UI.headerShowThreshold();
        
        // Determina se deve mostrar o header
        const shouldShow = scrollY > threshold;
        
        // Determina se deve aplicar estilo de scrolled
        const shouldBeScrolled = scrollY > CONFIG.UI.scrollThreshold;
        
        // Mostra/oculta o header
        if (shouldShow && !this.isVisible) {
            this.show();
        } else if (!shouldShow && this.isVisible) {
            this.hide();
        }
        
        // Aplica estilo de scrolled
        if (shouldBeScrolled && !this.isScrolled) {
            this.addClass(CONFIG.CLASSES.scrolled);
            this.isScrolled = true;
        } else if (!shouldBeScrolled && this.isScrolled) {
            this.removeClass(CONFIG.CLASSES.scrolled);
            this.isScrolled = false;
        }
        
        this.lastScrollY = scrollY;
    }

    /**
     * Manipula clique em links de navegação
     * @param {Element} link - Link clicado
     */
    handleNavClick(link) {
        const href = link.getAttribute('href');
        
        if (href && href.startsWith('#')) {
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                this.scrollToElement(targetElement);
                this.setActiveNavLink(link);
                
                // Emite evento de navegação
                this.emit('header:navigation', {
                    target: targetId,
                    link: link,
                    element: targetElement
                });
            }
        }
    }

    /**
     * Manipula clique no CTA do header
     * @param {Element} cta - Elemento CTA
     */
    handleCTAClick(cta) {
        const href = cta.getAttribute('href');
        
        if (href && href.startsWith('#')) {
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                this.scrollToElement(targetElement);
                
                // Emite evento de CTA
                this.emit('header:cta_clicked', {
                    target: targetId,
                    cta: cta,
                    element: targetElement
                });
            }
        }
    }

    /**
     * Faz scroll para um elemento
     * @param {Element} element - Elemento alvo
     */
    scrollToElement(element) {
        const headerHeight = this.element.offsetHeight;
        const targetPosition = element.offsetTop - headerHeight - 20;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }

    /**
     * Faz scroll para o topo
     */
    scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        
        this.emit('header:scroll_to_top');
    }

    /**
     * Define o link ativo na navegação
     * @param {Element} activeLink - Link ativo
     */
    setActiveNavLink(activeLink) {
        this.navLinks.forEach(link => {
            link.classList.remove(CONFIG.CLASSES.active);
        });
        
        activeLink.classList.add(CONFIG.CLASSES.active);
    }

    /**
     * Atualiza o link ativo baseado na seção visível
     */
    updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const headerHeight = this.element.offsetHeight;
        let currentSection = null;
        
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.top <= headerHeight + 50 && rect.bottom >= headerHeight + 50) {
                currentSection = section;
            }
        });
        
        if (currentSection) {
            const targetLink = this.element.querySelector(`a[href="#${currentSection.id}"]`);
            if (targetLink) {
                this.setActiveNavLink(targetLink);
            }
        }
    }

    /**
     * Manipula redimensionamento da janela
     */
    handleResize() {
        // Recalcula thresholds baseado na nova altura
        const threshold = CONFIG.UI.headerShowThreshold();
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > threshold && !this.isVisible) {
            this.show();
        } else if (currentScroll <= threshold && this.isVisible) {
            this.hide();
        }
    }

    /**
     * Mostra o header
     */
    show() {
        this.isVisible = true;
        this.element.style.transform = 'translateY(0)';
        this.addClass(CONFIG.CLASSES.visible);
        
        this.emit('header:shown');
    }

    /**
     * Oculta o header
     */
    hide() {
        this.isVisible = false;
        this.element.style.transform = 'translateY(-100%)';
        this.removeClass(CONFIG.CLASSES.visible);
        
        this.emit('header:hidden');
    }

    /**
     * Força a visibilidade do header
     */
    forceShow() {
        this.show();
    }

    /**
     * Força a ocultação do header
     */
    forceHide() {
        this.hide();
    }

    /**
     * Callback chamado após inicialização
     */
    onInitialized() {
        // Configura scroll listener para atualizar link ativo
        const throttledUpdateActiveLink = utils.throttle(() => {
            this.updateActiveNavLink();
        }, 200);

        this.addEventListenerWithCleanup(window, 'scroll', throttledUpdateActiveLink);
        
        // Verifica estado inicial
        this.handleScroll();
    }
}
