/**
 * @fileoverview Componente base para todos os componentes da aplicação
 * Implementa funcionalidades comuns e padrões de design
 */

import eventBus from '../../core/EventBus.js';
import { utils } from '../../core/utils.js';

export class BaseComponent {
    constructor(selector, options = {}) {
        this.selector = selector;
        this.element = null;
        this.options = {
            autoInit: true,
            ...options
        };
        this.isInitialized = false;
        this.eventListeners = [];
        
        if (this.options.autoInit) {
            this.init();
        }
    }

    /**
     * Inicializa o componente
     */
    init() {
        try {
            this.element = this.findElement();
            
            if (!this.element) {
                utils.log(`Elemento não encontrado: ${this.selector}`, 'warn');
                return;
            }

            this.setupEventListeners();
            this.render();
            
            this.isInitialized = true;
            this.onInitialized();
            
            utils.log(`Componente ${this.constructor.name} inicializado`, 'info');
            
        } catch (error) {
            utils.log(`Erro ao inicializar componente ${this.constructor.name}: ${error.message}`, 'error');
        }
    }

    /**
     * Encontra o elemento no DOM
     * @returns {Element|null} Elemento encontrado
     */
    findElement() {
        if (typeof this.selector === 'string') {
            return document.querySelector(this.selector);
        }
        return this.selector;
    }

    /**
     * Configura event listeners
     */
    setupEventListeners() {
        // Implementar nas classes filhas
    }

    /**
     * Renderiza o componente
     */
    render() {
        // Implementar nas classes filhas
    }

    /**
     * Callback chamado após a inicialização
     */
    onInitialized() {
        // Implementar nas classes filhas
    }

    /**
     * Adiciona um event listener e mantém referência para limpeza
     * @param {Element} element - Elemento alvo
     * @param {string} event - Nome do evento
     * @param {Function} handler - Função handler
     * @param {Object} options - Opções do addEventListener
     */
    addEventListenerWithCleanup(element, event, handler, options = {}) {
        element.addEventListener(event, handler, options);
        this.eventListeners.push({ element, event, handler, options });
    }

    /**
     * Emite um evento personalizado
     * @param {string} eventName - Nome do evento
     * @param {*} data - Dados do evento
     */
    emit(eventName, data) {
        eventBus.emit(eventName, data);
    }

    /**
     * Escuta um evento personalizado
     * @param {string} eventName - Nome do evento
     * @param {Function} handler - Função handler
     */
    on(eventName, handler) {
        eventBus.on(eventName, handler);
    }

    /**
     * Para de escutar um evento personalizado
     * @param {string} eventName - Nome do evento
     * @param {Function} handler - Função handler
     */
    off(eventName, handler) {
        eventBus.off(eventName, handler);
    }

    /**
     * Mostra o componente
     */
    show() {
        if (this.element) {
            this.element.style.display = '';
            this.element.classList.add('visible');
            this.emit(`${this.constructor.name}:shown`, this);
        }
    }

    /**
     * Oculta o componente
     */
    hide() {
        if (this.element) {
            this.element.style.display = 'none';
            this.element.classList.remove('visible');
            this.emit(`${this.constructor.name}:hidden`, this);
        }
    }

    /**
     * Alterna visibilidade do componente
     */
    toggle() {
        if (this.element) {
            if (this.element.style.display === 'none') {
                this.show();
            } else {
                this.hide();
            }
        }
    }

    /**
     * Adiciona uma classe CSS
     * @param {string} className - Nome da classe
     */
    addClass(className) {
        if (this.element) {
            this.element.classList.add(className);
        }
    }

    /**
     * Remove uma classe CSS
     * @param {string} className - Nome da classe
     */
    removeClass(className) {
        if (this.element) {
            this.element.classList.remove(className);
        }
    }

    /**
     * Alterna uma classe CSS
     * @param {string} className - Nome da classe
     */
    toggleClass(className) {
        if (this.element) {
            this.element.classList.toggle(className);
        }
    }

    /**
     * Verifica se tem uma classe CSS
     * @param {string} className - Nome da classe
     * @returns {boolean} Se tem a classe
     */
    hasClass(className) {
        return this.element ? this.element.classList.contains(className) : false;
    }

    /**
     * Define atributo do elemento
     * @param {string} name - Nome do atributo
     * @param {string} value - Valor do atributo
     */
    setAttribute(name, value) {
        if (this.element) {
            this.element.setAttribute(name, value);
        }
    }

    /**
     * Obtém atributo do elemento
     * @param {string} name - Nome do atributo
     * @returns {string} Valor do atributo
     */
    getAttribute(name) {
        return this.element ? this.element.getAttribute(name) : null;
    }

    /**
     * Remove atributo do elemento
     * @param {string} name - Nome do atributo
     */
    removeAttribute(name) {
        if (this.element) {
            this.element.removeAttribute(name);
        }
    }

    /**
     * Destrói o componente e limpa recursos
     */
    destroy() {
        try {
            // Remove todos os event listeners
            this.eventListeners.forEach(({ element, event, handler, options }) => {
                element.removeEventListener(event, handler, options);
            });
            
            this.eventListeners = [];
            
            // Remove elemento do DOM se necessário
            if (this.options.removeOnDestroy && this.element) {
                this.element.remove();
            }
            
            this.isInitialized = false;
            this.element = null;
            
            this.emit(`${this.constructor.name}:destroyed`, this);
            
            utils.log(`Componente ${this.constructor.name} destruído`, 'info');
            
        } catch (error) {
            utils.log(`Erro ao destruir componente ${this.constructor.name}: ${error.message}`, 'error');
        }
    }

    /**
     * Verifica se o componente está inicializado
     * @returns {boolean} Se está inicializado
     */
    isReady() {
        return this.isInitialized && this.element !== null;
    }

    /**
     * Aguarda o componente estar pronto
     * @param {number} timeout - Timeout em ms
     * @returns {Promise<boolean>} Se ficou pronto
     */
    async waitForReady(timeout = 5000) {
        const startTime = Date.now();
        
        while (!this.isReady() && (Date.now() - startTime) < timeout) {
            await utils.sleep(50);
        }
        
        return this.isReady();
    }
}
