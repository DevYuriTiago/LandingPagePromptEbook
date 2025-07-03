/**
 * @fileoverview Use Case para tracking de analytics
 * Implementa a lógica de negócio para rastreamento de eventos
 */

import { AnalyticsEvent } from '../domain/AnalyticsEvent.js';
import { GoogleAnalyticsRepository } from '../infrastructure/GoogleAnalyticsRepository.js';
import { utils } from '../core/utils.js';
import { CONFIG } from '../core/config.js';
import eventBus from '../core/EventBus.js';

export class TrackAnalyticsUseCase {
    constructor() {
        this.repository = new GoogleAnalyticsRepository();
        this.scrollQuarters = {
            '25%': false,
            '50%': false,
            '75%': false,
            '100%': false
        };
        this.timeMarkers = CONFIG.ANALYTICS.timeMarkers;
        this.pageStartTime = new Date();
        this.maxScrollPercentage = 0;
    }

    /**
     * Executa o tracking de um evento genérico
     * @param {string} category - Categoria do evento
     * @param {string} action - Ação do evento
     * @param {string} label - Rótulo do evento
     * @param {number} value - Valor do evento
     * @returns {Promise<Object>} Resultado da operação
     */
    async execute(category, action, label = null, value = null) {
        try {
            const event = new AnalyticsEvent({
                category,
                action,
                label,
                value
            });

            const result = await this.repository.save(event);
            
            if (result.success) {
                eventBus.emit('analytics:event_tracked', {
                    event: event,
                    result: result
                });
            }
            
            return result;
            
        } catch (error) {
            utils.log(`Erro ao rastrear evento: ${error.message}`, 'error');
            
            return {
                success: false,
                error: error.message,
                message: 'Erro ao rastrear evento'
            };
        }
    }

    /**
     * Rastreia visualização da página
     * @param {Object} data - Dados adicionais da página
     * @returns {Promise<Object>} Resultado da operação
     */
    async trackPageView(data = {}) {
        try {
            const result = await this.repository.trackPageView(data);
            
            if (result.success) {
                eventBus.emit('analytics:page_viewed', {
                    data: data,
                    result: result
                });
            }
            
            return result;
            
        } catch (error) {
            utils.log(`Erro ao rastrear page view: ${error.message}`, 'error');
            
            return {
                success: false,
                error: error.message,
                message: 'Erro ao rastrear visualização'
            };
        }
    }

    /**
     * Rastreia clique em CTA
     * @param {string} ctaLabel - Rótulo do CTA
     * @param {Element} element - Elemento clicado
     * @returns {Promise<Object>} Resultado da operação
     */
    async trackCTAClick(ctaLabel, element = null) {
        try {
            const data = {
                category: 'CTA',
                action: 'click',
                label: ctaLabel
            };

            if (element) {
                data.elementId = element.id;
                data.elementClass = element.className;
                data.elementText = element.textContent?.trim();
            }

            const result = await this.execute(data.category, data.action, data.label);
            
            if (result.success) {
                eventBus.emit('analytics:cta_clicked', {
                    ctaLabel: ctaLabel,
                    element: element,
                    result: result
                });
            }
            
            return result;
            
        } catch (error) {
            utils.log(`Erro ao rastrear CTA click: ${error.message}`, 'error');
            
            return {
                success: false,
                error: error.message,
                message: 'Erro ao rastrear clique'
            };
        }
    }

    /**
     * Rastreia scroll da página
     * @param {number} percentage - Porcentagem de scroll
     * @returns {Promise<Object>} Resultado da operação
     */
    async trackScroll(percentage) {
        try {
            // Atualiza o máximo de scroll
            if (percentage > this.maxScrollPercentage) {
                this.maxScrollPercentage = percentage;
            }

            // Verifica se atingiu algum quarto da página
            const quarters = ['25%', '50%', '75%', '100%'];
            const thresholds = [25, 50, 75, 100];
            
            for (let i = 0; i < quarters.length; i++) {
                const quarter = quarters[i];
                const threshold = thresholds[i];
                
                if (percentage >= threshold && !this.scrollQuarters[quarter]) {
                    this.scrollQuarters[quarter] = true;
                    
                    const result = await this.execute('Scroll', 'scroll_depth', quarter, threshold);
                    
                    if (result.success) {
                        eventBus.emit('analytics:scroll_milestone', {
                            quarter: quarter,
                            percentage: threshold,
                            result: result
                        });
                    }
                    
                    return result;
                }
            }
            
            return { success: true, message: 'Scroll já rastreado' };
            
        } catch (error) {
            utils.log(`Erro ao rastrear scroll: ${error.message}`, 'error');
            
            return {
                success: false,
                error: error.message,
                message: 'Erro ao rastrear scroll'
            };
        }
    }

    /**
     * Rastreia tempo na página
     * @param {number} seconds - Segundos na página
     * @returns {Promise<Object>} Resultado da operação
     */
    async trackTimeOnPage(seconds) {
        try {
            if (this.timeMarkers.includes(seconds)) {
                const result = await this.execute('Time', 'time_on_page', `${seconds}s`, seconds);
                
                if (result.success) {
                    eventBus.emit('analytics:time_milestone', {
                        seconds: seconds,
                        result: result
                    });
                }
                
                return result;
            }
            
            return { success: true, message: 'Tempo já rastreado' };
            
        } catch (error) {
            utils.log(`Erro ao rastrear tempo: ${error.message}`, 'error');
            
            return {
                success: false,
                error: error.message,
                message: 'Erro ao rastrear tempo'
            };
        }
    }

    /**
     * Rastreia submissão de formulário
     * @param {string} formType - Tipo do formulário
     * @param {Object} formData - Dados do formulário
     * @returns {Promise<Object>} Resultado da operação
     */
    async trackFormSubmit(formType, formData = {}) {
        try {
            const result = await this.execute('Form', 'submit', formType);
            
            if (result.success) {
                eventBus.emit('analytics:form_submitted', {
                    formType: formType,
                    formData: formData,
                    result: result
                });
            }
            
            return result;
            
        } catch (error) {
            utils.log(`Erro ao rastrear form submit: ${error.message}`, 'error');
            
            return {
                success: false,
                error: error.message,
                message: 'Erro ao rastrear submissão'
            };
        }
    }

    /**
     * Rastreia conversão
     * @param {Object} conversionData - Dados da conversão
     * @returns {Promise<Object>} Resultado da operação
     */
    async trackConversion(conversionData) {
        try {
            const result = await this.repository.trackConversion(conversionData);
            
            if (result.success) {
                eventBus.emit('analytics:conversion_tracked', {
                    conversionData: conversionData,
                    result: result
                });
            }
            
            return result;
            
        } catch (error) {
            utils.log(`Erro ao rastrear conversão: ${error.message}`, 'error');
            
            return {
                success: false,
                error: error.message,
                message: 'Erro ao rastrear conversão'
            };
        }
    }

    /**
     * Inicializa o rastreamento automático
     */
    initializeAutoTracking() {
        // Rastreia page view
        this.trackPageView();
        
        // Rastreia tempo na página
        this.startTimeTracking();
        
        // Rastreia scroll
        this.startScrollTracking();
        
        // Rastreia cliques em CTAs
        this.startCTATracking();
        
        utils.log('Rastreamento automático inicializado', 'info');
    }

    /**
     * Inicia o rastreamento de tempo
     */
    startTimeTracking() {
        setInterval(() => {
            const timeSpent = Math.floor((new Date() - this.pageStartTime) / 1000);
            this.trackTimeOnPage(timeSpent);
        }, 1000);
    }

    /**
     * Inicia o rastreamento de scroll
     */
    startScrollTracking() {
        const throttledScrollHandler = utils.throttle(() => {
            const scrollPercentage = utils.getScrollPercentage();
            this.trackScroll(scrollPercentage);
        }, 250);

        window.addEventListener('scroll', throttledScrollHandler);
    }

    /**
     * Inicia o rastreamento de cliques em CTAs
     */
    startCTATracking() {
        const ctaButtons = document.querySelectorAll(CONFIG.SELECTORS.ctaButtons);
        
        ctaButtons.forEach((button, index) => {
            button.addEventListener('click', () => {
                const ctaLabel = button.textContent?.trim() || `CTA_${index + 1}`;
                this.trackCTAClick(ctaLabel, button);
            });
        });
    }
}
