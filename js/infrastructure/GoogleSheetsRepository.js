/**
 * @fileoverview Repositório para Google Sheets
 * Implementa a interface de persistência para leads no Google Sheets
 */

import { utils } from '../core/utils.js';
import { CONFIG } from '../core/config.js';

export class GoogleSheetsRepository {
    constructor() {
        this.baseUrl = CONFIG.FORM.googleSheetsUrl;
        this.timeout = 10000; // 10 segundos
    }

    /**
     * Envia um lead para o Google Sheets
     * @param {Lead} lead - Lead a ser enviado
     * @returns {Promise<Object>} Resultado da operação
     */
    async save(lead) {
        try {
            utils.log('Enviando lead para Google Sheets', 'info');
            
            const formData = lead.toFormData();
            
            const response = await this.makeRequest(formData);
            
            if (!response.ok) {
                throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
            }
            
            const result = await response.json();
            
            utils.log('Lead enviado com sucesso', 'info');
            
            return {
                success: true,
                data: result,
                message: 'Lead enviado com sucesso'
            };
            
        } catch (error) {
            utils.log(`Erro ao enviar lead: ${error.message}`, 'error');
            
            return {
                success: false,
                error: error.message,
                message: 'Erro ao enviar dados. Tente novamente.'
            };
        }
    }

    /**
     * Faz a requisição HTTP para o Google Sheets
     * @param {FormData} formData - Dados do formulário
     * @returns {Promise<Response>} Resposta da requisição
     */
    async makeRequest(formData) {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), this.timeout);
        
        try {
            const response = await fetch(this.baseUrl, {
                method: 'POST',
                body: formData,
                signal: controller.signal,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            clearTimeout(timeoutId);
            return response;
            
        } catch (error) {
            clearTimeout(timeoutId);
            
            if (error.name === 'AbortError') {
                throw new Error('Timeout: Requisição demorou muito para responder');
            }
            
            throw error;
        }
    }

    /**
     * Testa a conexão com o Google Sheets
     * @returns {Promise<boolean>} Se a conexão está funcionando
     */
    async testConnection() {
        try {
            const testData = new FormData();
            testData.append('test', 'connection');
            
            const response = await this.makeRequest(testData);
            return response.ok;
            
        } catch (error) {
            utils.log(`Erro ao testar conexão: ${error.message}`, 'error');
            return false;
        }
    }

    /**
     * Envia dados em lote (batch)
     * @param {Lead[]} leads - Array de leads
     * @returns {Promise<Object>} Resultado da operação
     */
    async saveBatch(leads) {
        const results = [];
        
        for (const lead of leads) {
            try {
                const result = await this.save(lead);
                results.push(result);
                
                // Pequena pausa entre requisições para evitar rate limiting
                await utils.sleep(200);
                
            } catch (error) {
                results.push({
                    success: false,
                    error: error.message,
                    leadId: lead.id
                });
            }
        }
        
        const successful = results.filter(r => r.success).length;
        const failed = results.filter(r => !r.success).length;
        
        return {
            success: failed === 0,
            results: results,
            summary: {
                total: leads.length,
                successful: successful,
                failed: failed
            }
        };
    }
}
