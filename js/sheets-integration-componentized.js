/**
 * @fileoverview Sheets Integration Componentizado
 * Integração com Google Sheets usando arquitetura limpa
 * Mantém compatibilidade com implementação existente
 */

import { SubmitLeadUseCase } from './application/SubmitLeadUseCase.js';
import { Lead } from './domain/Lead.js';
import { utils } from './core/utils.js';

/**
 * Classe de Integração com Sheets Componentizada
 */
class SheetsManager {
    constructor() {
        this.submitLeadUseCase = new SubmitLeadUseCase();
        this.isInitialized = false;
        this.legacyMode = false;
    }

    /**
     * Inicializa o manager de sheets
     */
    init() {
        try {
            this.isInitialized = true;
            utils.log('Sheets Manager inicializado', 'info');
        } catch (error) {
            utils.log(`Erro ao inicializar Sheets: ${error.message}`, 'error');
            this.legacyMode = true;
        }
    }

    /**
     * Submete lead para Google Sheets
     * @param {Object} leadData - Dados do lead
     * @returns {Promise<Object>} Resultado da submissão
     */
    async submitLead(leadData) {
        if (this.isInitialized) {
            return await this.submitLeadUseCase.execute(leadData);
        } else if (this.legacyMode) {
            return await this.legacySubmitToGoogleSheets(leadData);
        } else {
            throw new Error('Sheets Manager não inicializado');
        }
    }

    /**
     * Implementação legada para compatibilidade
     * @param {Object} leadData - Dados do lead
     * @returns {Promise<Object>} Resultado da submissão
     */
    async legacySubmitToGoogleSheets(leadData) {
        const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbz8OZshnVdr26pq8uGeulhc41V4eep-JAJ7u5GbCfkqCC2MkV7Y48kxZ7oyZhdnfEO0Qg/exec';
        
        try {
            // Preparação dos dados
            const formData = new FormData();
            
            // Adiciona todos os campos do formulário
            formData.append('name', leadData.name || '');
            formData.append('email', leadData.email || '');
            formData.append('phone', leadData.phone || '');
            formData.append('company', leadData.company || '');
            formData.append('position', leadData.position || '');
            formData.append('interest', leadData.interest || '');
            formData.append('challenge', leadData.challenge || '');
            formData.append('timestamp', leadData.timestamp || new Date().toISOString());
            formData.append('source', leadData.source || window.location.href);
            
            // Envio da requisição
            const response = await fetch(SCRIPT_URL, {
                method: 'POST',
                body: formData
            });
            
            if (!response.ok) {
                throw new Error(`Erro na requisição: ${response.status} ${response.statusText}`);
            }
            
            const result = await response.json();
            
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
     * Valida dados do lead antes de enviar
     * @param {Object} leadData - Dados do lead
     * @returns {Object} Resultado da validação
     */
    validateLead(leadData) {
        if (this.isInitialized) {
            return this.submitLeadUseCase.validateFormData(leadData);
        } else {
            // Validação legada
            return this.legacyValidateLead(leadData);
        }
    }

    /**
     * Validação legada
     * @param {Object} leadData - Dados do lead
     * @returns {Object} Resultado da validação
     */
    legacyValidateLead(leadData) {
        const errors = [];
        
        if (!leadData.name || leadData.name.trim().length < 2) {
            errors.push('Nome deve ter pelo menos 2 caracteres');
        }
        
        if (!leadData.email || !this.isValidEmail(leadData.email)) {
            errors.push('Email inválido');
        }
        
        if (!leadData.phone || !this.isValidPhone(leadData.phone)) {
            errors.push('Telefone inválido');
        }
        
        if (!leadData.company || leadData.company.trim().length < 2) {
            errors.push('Nome da empresa deve ter pelo menos 2 caracteres');
        }
        
        if (!leadData.position || leadData.position.trim().length < 2) {
            errors.push('Cargo deve ter pelo menos 2 caracteres');
        }
        
        if (!leadData.interest) {
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
     * Testa conexão com Google Sheets
     * @returns {Promise<boolean>} Se a conexão está funcionando
     */
    async testConnection() {
        if (this.isInitialized) {
            return await this.submitLeadUseCase.testConnection();
        } else {
            return await this.legacyTestConnection();
        }
    }

    /**
     * Teste de conexão legado
     * @returns {Promise<boolean>} Se a conexão está funcionando
     */
    async legacyTestConnection() {
        try {
            const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbz8OZshnVdr26pq8uGeulhc41V4eep-JAJ7u5GbCfkqCC2MkV7Y48kxZ7oyZhdnfEO0Qg/exec';
            const testData = new FormData();
            testData.append('test', 'connection');
            
            const response = await fetch(SCRIPT_URL, {
                method: 'POST',
                body: testData
            });
            
            return response.ok;
            
        } catch (error) {
            utils.log(`Erro ao testar conexão: ${error.message}`, 'error');
            return false;
        }
    }
}

// Cria instância global
const sheetsManager = new SheetsManager();

// Função global para compatibilidade
window.submitToGoogleSheets = async (leadData) => {
    return await sheetsManager.submitLead(leadData);
};

// Inicializa quando DOM estiver pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        sheetsManager.init();
    });
} else {
    sheetsManager.init();
}

export default sheetsManager;
