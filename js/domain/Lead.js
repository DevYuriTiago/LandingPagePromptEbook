/**
 * @fileoverview Entidade Lead - Modelo de domínio
 * Representa os dados de um lead/prospect
 */

export class Lead {
    constructor(data = {}) {
        this.id = data.id || this.generateId();
        this.name = data.name || '';
        this.email = data.email || '';
        this.phone = data.phone || '';
        this.company = data.company || '';
        this.position = data.position || '';
        this.interest = data.interest || '';
        this.challenge = data.challenge || '';
        this.source = data.source || '';
        this.timestamp = data.timestamp || new Date().toISOString();
        this.status = data.status || 'new';
    }

    /**
     * Gera um ID único para o lead
     * @returns {string} ID único
     */
    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    /**
     * Valida os dados obrigatórios do lead
     * @returns {Object} Resultado da validação
     */
    validate() {
        const errors = [];

        if (!this.name || this.name.length < 2) {
            errors.push('Nome deve ter pelo menos 2 caracteres');
        }

        if (!this.email || !this.isValidEmail(this.email)) {
            errors.push('Email inválido');
        }

        if (!this.phone || !this.isValidPhone(this.phone)) {
            errors.push('Telefone inválido');
        }

        if (!this.company || this.company.length < 2) {
            errors.push('Nome da empresa deve ter pelo menos 2 caracteres');
        }

        if (!this.position || this.position.length < 2) {
            errors.push('Cargo deve ter pelo menos 2 caracteres');
        }

        if (!this.interest) {
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
     * Converte o lead para objeto simples
     * @returns {Object} Objeto com os dados do lead
     */
    toObject() {
        return {
            id: this.id,
            name: this.name,
            email: this.email,
            phone: this.phone,
            company: this.company,
            position: this.position,
            interest: this.interest,
            challenge: this.challenge,
            source: this.source,
            timestamp: this.timestamp,
            status: this.status
        };
    }

    /**
     * Converte para FormData para envio
     * @returns {FormData} FormData com os dados do lead
     */
    toFormData() {
        const formData = new FormData();
        const data = this.toObject();
        
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                formData.append(key, data[key]);
            }
        }
        
        return formData;
    }

    /**
     * Cria um Lead a partir de dados de formulário
     * @param {FormData|Object} formData - Dados do formulário
     * @returns {Lead} Nova instância de Lead
     */
    static fromFormData(formData) {
        const data = {};
        
        if (formData instanceof FormData) {
            for (const [key, value] of formData.entries()) {
                data[key] = value;
            }
        } else {
            Object.assign(data, formData);
        }
        
        // Adiciona metadados
        data.source = data.source || window.location.href;
        data.timestamp = new Date().toISOString();
        
        return new Lead(data);
    }
}
