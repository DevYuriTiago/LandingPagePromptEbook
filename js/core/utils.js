/**
 * @fileoverview Utilitários gerais da aplicação
 * Funções auxiliares reutilizáveis
 */

export const utils = {
    /**
     * Função de debounce para otimizar eventos
     * @param {Function} func - Função a ser executada
     * @param {number} delay - Delay em milissegundos
     * @returns {Function} Função com debounce
     */
    debounce(func, delay) {
        let timeoutId;
        return (...args) => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => func.apply(this, args), delay);
        };
    },

    /**
     * Função de throttle para limitar execuções
     * @param {Function} func - Função a ser executada
     * @param {number} delay - Delay em milissegundos
     * @returns {Function} Função com throttle
     */
    throttle(func, delay) {
        let inThrottle;
        return (...args) => {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, delay);
            }
        };
    },

    /**
     * Aguarda um tempo específico
     * @param {number} ms - Milissegundos para aguardar
     * @returns {Promise} Promise que resolve após o tempo
     */
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    },

    /**
     * Verifica se um elemento está visível no viewport
     * @param {Element} element - Elemento a verificar
     * @param {number} threshold - Limiar de visibilidade (0-1)
     * @returns {boolean} Se o elemento está visível
     */
    isElementVisible(element, threshold = 0.1) {
        const rect = element.getBoundingClientRect();
        const viewHeight = window.innerHeight;
        const viewWidth = window.innerWidth;

        return (
            rect.bottom >= 0 &&
            rect.right >= 0 &&
            rect.top <= viewHeight &&
            rect.left <= viewWidth &&
            rect.height > viewHeight * threshold
        );
    },

    /**
     * Calcula a porcentagem de scroll da página
     * @returns {number} Porcentagem de scroll (0-100)
     */
    getScrollPercentage() {
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        return scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
    },

    /**
     * Faz scroll suave para um elemento
     * @param {string|Element} target - Seletor ou elemento alvo
     * @param {number} offset - Offset em pixels
     */
    smoothScrollTo(target, offset = 0) {
        const element = typeof target === 'string' ? document.querySelector(target) : target;
        if (!element) return;

        const targetPosition = element.offsetTop - offset;
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    },

    /**
     * Formata um número com separadores de milhares
     * @param {number} num - Número a ser formatado
     * @returns {string} Número formatado
     */
    formatNumber(num) {
        return new Intl.NumberFormat('pt-BR').format(num);
    },

    /**
     * Valida um endereço de email
     * @param {string} email - Email a ser validado
     * @returns {boolean} Se o email é válido
     */
    isValidEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    },

    /**
     * Valida um número de telefone
     * @param {string} phone - Telefone a ser validado
     * @returns {boolean} Se o telefone é válido
     */
    isValidPhone(phone) {
        const regex = /^[\d\s\-\+\(\)]+$/;
        return regex.test(phone) && phone.replace(/\D/g, '').length >= 10;
    },

    /**
     * Sanitiza uma string removendo caracteres perigosos
     * @param {string} str - String a ser sanitizada
     * @returns {string} String sanitizada
     */
    sanitizeString(str) {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    },

    /**
     * Gera um ID único
     * @returns {string} ID único
     */
    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    },

    /**
     * Converte um objeto em FormData
     * @param {Object} obj - Objeto a ser convertido
     * @returns {FormData} FormData resultante
     */
    objectToFormData(obj) {
        const formData = new FormData();
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                formData.append(key, obj[key]);
            }
        }
        return formData;
    },

    /**
     * Registra um log com timestamp
     * @param {string} message - Mensagem do log
     * @param {string} type - Tipo do log (info, warn, error)
     */
    log(message, type = 'info') {
        const timestamp = new Date().toISOString();
        const logMessage = `[${timestamp}] ${message}`;
        
        switch (type) {
            case 'warn':
                console.warn(logMessage);
                break;
            case 'error':
                console.error(logMessage);
                break;
            default:
                console.log(logMessage);
        }
    }
};
