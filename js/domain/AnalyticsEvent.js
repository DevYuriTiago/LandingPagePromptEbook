/**
 * @fileoverview Entidade AnalyticsEvent - Modelo de domínio
 * Representa um evento de analytics
 */

export class AnalyticsEvent {
    constructor(data = {}) {
        this.id = data.id || this.generateId();
        this.category = data.category || 'Engagement';
        this.action = data.action || '';
        this.label = data.label || null;
        this.value = data.value || null;
        this.timestamp = data.timestamp || new Date().toISOString();
        this.sessionId = data.sessionId || this.getSessionId();
        this.userId = data.userId || this.getUserId();
        this.url = data.url || window.location.href;
        this.referrer = data.referrer || document.referrer;
        this.userAgent = data.userAgent || navigator.userAgent;
        this.screenResolution = data.screenResolution || `${screen.width}x${screen.height}`;
        this.viewportSize = data.viewportSize || `${window.innerWidth}x${window.innerHeight}`;
    }

    /**
     * Gera um ID único para o evento
     * @returns {string} ID único
     */
    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    /**
     * Obtém ou gera um ID de sessão
     * @returns {string} ID da sessão
     */
    getSessionId() {
        let sessionId = sessionStorage.getItem('analytics_session_id');
        if (!sessionId) {
            sessionId = this.generateId();
            sessionStorage.setItem('analytics_session_id', sessionId);
        }
        return sessionId;
    }

    /**
     * Obtém ou gera um ID de usuário
     * @returns {string} ID do usuário
     */
    getUserId() {
        let userId = localStorage.getItem('analytics_user_id');
        if (!userId) {
            userId = this.generateId();
            localStorage.setItem('analytics_user_id', userId);
        }
        return userId;
    }

    /**
     * Valida os dados do evento
     * @returns {Object} Resultado da validação
     */
    validate() {
        const errors = [];

        if (!this.category) {
            errors.push('Categoria é obrigatória');
        }

        if (!this.action) {
            errors.push('Ação é obrigatória');
        }

        if (this.value !== null && typeof this.value !== 'number') {
            errors.push('Valor deve ser um número');
        }

        return {
            isValid: errors.length === 0,
            errors: errors
        };
    }

    /**
     * Converte o evento para objeto simples
     * @returns {Object} Objeto com os dados do evento
     */
    toObject() {
        return {
            id: this.id,
            category: this.category,
            action: this.action,
            label: this.label,
            value: this.value,
            timestamp: this.timestamp,
            sessionId: this.sessionId,
            userId: this.userId,
            url: this.url,
            referrer: this.referrer,
            userAgent: this.userAgent,
            screenResolution: this.screenResolution,
            viewportSize: this.viewportSize
        };
    }

    /**
     * Converte para formato do Google Analytics
     * @returns {Object} Objeto formatado para GA
     */
    toGoogleAnalyticsFormat() {
        return {
            event_category: this.category,
            event_label: this.label,
            value: this.value,
            custom_parameters: {
                session_id: this.sessionId,
                user_id: this.userId,
                screen_resolution: this.screenResolution,
                viewport_size: this.viewportSize
            }
        };
    }

    /**
     * Cria um evento de página visualizada
     * @param {Object} data - Dados adicionais
     * @returns {AnalyticsEvent} Nova instância de evento
     */
    static createPageViewEvent(data = {}) {
        return new AnalyticsEvent({
            category: 'Page',
            action: 'page_view',
            label: document.title,
            url: window.location.href,
            ...data
        });
    }

    /**
     * Cria um evento de clique em CTA
     * @param {string} ctaLabel - Rótulo do CTA
     * @param {Object} data - Dados adicionais
     * @returns {AnalyticsEvent} Nova instância de evento
     */
    static createCTAClickEvent(ctaLabel, data = {}) {
        return new AnalyticsEvent({
            category: 'CTA',
            action: 'click',
            label: ctaLabel,
            ...data
        });
    }

    /**
     * Cria um evento de scroll
     * @param {number} percentage - Porcentagem de scroll
     * @param {Object} data - Dados adicionais
     * @returns {AnalyticsEvent} Nova instância de evento
     */
    static createScrollEvent(percentage, data = {}) {
        return new AnalyticsEvent({
            category: 'Scroll',
            action: 'scroll_depth',
            label: `${percentage}%`,
            value: percentage,
            ...data
        });
    }

    /**
     * Cria um evento de tempo na página
     * @param {number} seconds - Segundos na página
     * @param {Object} data - Dados adicionais
     * @returns {AnalyticsEvent} Nova instância de evento
     */
    static createTimeOnPageEvent(seconds, data = {}) {
        return new AnalyticsEvent({
            category: 'Time',
            action: 'time_on_page',
            label: `${seconds}s`,
            value: seconds,
            ...data
        });
    }

    /**
     * Cria um evento de submissão de formulário
     * @param {string} formType - Tipo do formulário
     * @param {Object} data - Dados adicionais
     * @returns {AnalyticsEvent} Nova instância de evento
     */
    static createFormSubmitEvent(formType, data = {}) {
        return new AnalyticsEvent({
            category: 'Form',
            action: 'submit',
            label: formType,
            ...data
        });
    }
}
