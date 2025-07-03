/**
 * @fileoverview Repositório para Google Analytics
 * Implementa a interface de persistência para eventos de analytics
 */

import { utils } from '../core/utils.js';
import { CONFIG } from '../core/config.js';

export class GoogleAnalyticsRepository {
    constructor() {
        this.isInitialized = false;
        this.eventQueue = [];
        this.init();
    }

    /**
     * Inicializa o Google Analytics
     */
    init() {
        if (typeof gtag === 'function') {
            this.isInitialized = true;
            this.processEventQueue();
            utils.log('Google Analytics inicializado', 'info');
        } else {
            utils.log('Google Analytics não disponível', 'warn');
        }
    }

    /**
     * Envia um evento para o Google Analytics
     * @param {AnalyticsEvent} event - Evento a ser enviado
     * @returns {Promise<Object>} Resultado da operação
     */
    async save(event) {
        try {
            const validation = event.validate();
            if (!validation.isValid) {
                throw new Error(`Evento inválido: ${validation.errors.join(', ')}`);
            }

            if (!this.isInitialized) {
                this.eventQueue.push(event);
                utils.log('Evento adicionado à fila (GA não inicializado)', 'info');
                return {
                    success: true,
                    message: 'Evento adicionado à fila',
                    queued: true
                };
            }

            const gaData = event.toGoogleAnalyticsFormat();
            
            gtag('event', event.action, gaData);
            
            utils.log(`Evento enviado: ${event.category}/${event.action}`, 'info');
            
            return {
                success: true,
                message: 'Evento enviado com sucesso',
                data: gaData
            };
            
        } catch (error) {
            utils.log(`Erro ao enviar evento: ${error.message}`, 'error');
            
            return {
                success: false,
                error: error.message,
                message: 'Erro ao enviar evento de analytics'
            };
        }
    }

    /**
     * Processa a fila de eventos pendentes
     */
    processEventQueue() {
        if (!this.isInitialized || this.eventQueue.length === 0) {
            return;
        }

        utils.log(`Processando ${this.eventQueue.length} eventos da fila`, 'info');
        
        while (this.eventQueue.length > 0) {
            const event = this.eventQueue.shift();
            this.save(event);
        }
    }

    /**
     * Envia evento de visualização de página
     * @param {Object} data - Dados da página
     * @returns {Promise<Object>} Resultado da operação
     */
    async trackPageView(data = {}) {
        try {
            if (!this.isInitialized) {
                utils.log('PageView não enviado - GA não inicializado', 'warn');
                return { success: false, message: 'GA não inicializado' };
            }

            const pageData = {
                page_title: data.title || document.title,
                page_location: data.url || window.location.href,
                page_path: data.path || window.location.pathname,
                ...data
            };

            gtag('event', 'page_view', pageData);
            
            utils.log('PageView enviado', 'info');
            
            return {
                success: true,
                message: 'PageView enviado com sucesso',
                data: pageData
            };
            
        } catch (error) {
            utils.log(`Erro ao enviar PageView: ${error.message}`, 'error');
            
            return {
                success: false,
                error: error.message,
                message: 'Erro ao enviar PageView'
            };
        }
    }

    /**
     * Envia evento de conversão
     * @param {Object} data - Dados da conversão
     * @returns {Promise<Object>} Resultado da operação
     */
    async trackConversion(data = {}) {
        try {
            if (!this.isInitialized) {
                utils.log('Conversão não enviada - GA não inicializado', 'warn');
                return { success: false, message: 'GA não inicializado' };
            }

            const conversionData = {
                currency: 'BRL',
                value: data.value || 0,
                transaction_id: data.transactionId || utils.generateId(),
                ...data
            };

            gtag('event', 'conversion', conversionData);
            
            utils.log('Conversão enviada', 'info');
            
            return {
                success: true,
                message: 'Conversão enviada com sucesso',
                data: conversionData
            };
            
        } catch (error) {
            utils.log(`Erro ao enviar conversão: ${error.message}`, 'error');
            
            return {
                success: false,
                error: error.message,
                message: 'Erro ao enviar conversão'
            };
        }
    }

    /**
     * Envia eventos em lote
     * @param {AnalyticsEvent[]} events - Array de eventos
     * @returns {Promise<Object>} Resultado da operação
     */
    async saveBatch(events) {
        const results = [];
        
        for (const event of events) {
            try {
                const result = await this.save(event);
                results.push(result);
                
                // Pequena pausa entre eventos
                await utils.sleep(50);
                
            } catch (error) {
                results.push({
                    success: false,
                    error: error.message,
                    eventId: event.id
                });
            }
        }
        
        const successful = results.filter(r => r.success).length;
        const failed = results.filter(r => !r.success).length;
        
        return {
            success: failed === 0,
            results: results,
            summary: {
                total: events.length,
                successful: successful,
                failed: failed
            }
        };
    }

    /**
     * Força o envio de dados para o Google Analytics
     */
    flush() {
        if (this.isInitialized && typeof gtag === 'function') {
            gtag('config', 'G-MP7TZJNWD0', {
                'send_page_view': false
            });
        }
    }
}
