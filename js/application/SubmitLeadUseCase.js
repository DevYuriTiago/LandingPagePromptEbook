/**
 * @fileoverview Use Case para submissão de leads
 * Implementa a lógica de negócio para captura e envio de leads
 */

import { Lead } from '../domain/Lead.js';
import { GoogleSheetsRepository } from '../infrastructure/GoogleSheetsRepository.js';
import { utils } from '../core/utils.js';
import eventBus from '../core/EventBus.js';

export class SubmitLeadUseCase {
    constructor() {
        this.repository = new GoogleSheetsRepository();
    }

    /**
     * Executa o caso de uso de submissão de lead
     * @param {Object} formData - Dados do formulário
     * @returns {Promise<Object>} Resultado da operação
     */
    async execute(formData) {
        try {
            utils.log('Iniciando submissão de lead', 'info');
            
            // Cria o lead a partir dos dados do formulário
            const lead = Lead.fromFormData(formData);
            
            // Valida o lead
            const validation = lead.validate();
            if (!validation.isValid) {
                utils.log(`Lead inválido: ${validation.errors.join(', ')}`, 'error');
                
                return {
                    success: false,
                    errors: validation.errors,
                    message: 'Por favor, corrija os erros no formulário'
                };
            }
            
            // Emite evento de validação bem-sucedida
            eventBus.emit('lead:validated', lead);
            
            // Envia o lead para o repositório
            const result = await this.repository.save(lead);
            
            if (result.success) {
                utils.log('Lead enviado com sucesso', 'info');
                
                // Emite evento de sucesso
                eventBus.emit('lead:submitted', {
                    lead: lead,
                    result: result
                });
                
                return {
                    success: true,
                    message: 'Obrigado! Entraremos em contato em breve.',
                    lead: lead,
                    data: result.data
                };
            } else {
                utils.log(`Erro ao enviar lead: ${result.error}`, 'error');
                
                // Emite evento de erro
                eventBus.emit('lead:error', {
                    lead: lead,
                    error: result.error
                });
                
                return {
                    success: false,
                    message: result.message || 'Erro ao enviar dados. Tente novamente.',
                    error: result.error
                };
            }
            
        } catch (error) {
            utils.log(`Erro inesperado na submissão: ${error.message}`, 'error');
            
            // Emite evento de erro crítico
            eventBus.emit('lead:critical_error', {
                error: error.message,
                formData: formData
            });
            
            return {
                success: false,
                message: 'Erro interno. Tente novamente em alguns minutos.',
                error: error.message
            };
        }
    }

    /**
     * Valida os dados do formulário antes da submissão
     * @param {Object} formData - Dados do formulário
     * @returns {Object} Resultado da validação
     */
    validateFormData(formData) {
        const errors = [];
        
        if (!formData.name || formData.name.trim().length < 2) {
            errors.push('Nome deve ter pelo menos 2 caracteres');
        }
        
        if (!formData.email || !this.isValidEmail(formData.email)) {
            errors.push('Email inválido');
        }
        
        if (!formData.phone || !this.isValidPhone(formData.phone)) {
            errors.push('Telefone inválido');
        }
        
        if (!formData.company || formData.company.trim().length < 2) {
            errors.push('Nome da empresa deve ter pelo menos 2 caracteres');
        }
        
        if (!formData.position || formData.position.trim().length < 2) {
            errors.push('Cargo deve ter pelo menos 2 caracteres');
        }
        
        if (!formData.interest) {
            errors.push('Interesse principal é obrigatório');
        }
        
        return {
            isValid: errors.length === 0,
            errors: errors
        };
    }

    /**
     * Valida formato de email
     * @param {string} email - Email a ser validado
     * @returns {boolean} Se o email é válido
     */
    isValidEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    /**
     * Valida formato de telefone
     * @param {string} phone - Telefone a ser validado
     * @returns {boolean} Se o telefone é válido
     */
    isValidPhone(phone) {
        const regex = /^[\d\s\-\+\(\)]+$/;
        return regex.test(phone) && phone.replace(/\D/g, '').length >= 10;
    }

    /**
     * Testa a conexão com o repositório
     * @returns {Promise<boolean>} Se a conexão está funcionando
     */
    async testConnection() {
        try {
            return await this.repository.testConnection();
        } catch (error) {
            utils.log(`Erro ao testar conexão: ${error.message}`, 'error');
            return false;
        }
    }
}
