/**
 * @fileoverview Componente de Formulário de Lead
 * Gerencia o formulário de captura de leads
 */

import { BaseComponent } from './BaseComponent.js';
import { SubmitLeadUseCase } from '../../application/SubmitLeadUseCase.js';
import { CONFIG } from '../../core/config.js';
import { utils } from '../../core/utils.js';

export class LeadForm extends BaseComponent {
    constructor(selector = CONFIG.SELECTORS.leadForm) {
        super(selector);
        this.submitLeadUseCase = new SubmitLeadUseCase();
        this.formFields = {};
        this.isSubmitting = false;
        this.validationErrors = {};
    }

    /**
     * Configura event listeners
     */
    setupEventListeners() {
        // Submit do formulário
        this.addEventListenerWithCleanup(this.element, 'submit', (e) => {
            e.preventDefault();
            this.handleSubmit();
        });

        // Validação em tempo real
        this.setupRealTimeValidation();

        // Escuta eventos de lead
        this.on('lead:submitted', (data) => {
            this.onLeadSubmitted(data);
        });

        this.on('lead:error', (data) => {
            this.onLeadError(data);
        });
    }

    /**
     * Renderiza o componente
     */
    render() {
        this.findFormFields();
        this.setupFormEnhancements();
    }

    /**
     * Encontra e mapeia os campos do formulário
     */
    findFormFields() {
        const fields = ['name', 'email', 'phone', 'company', 'position', 'interest', 'challenge'];
        
        fields.forEach(fieldName => {
            const field = this.element.querySelector(`[name="${fieldName}"]`);
            if (field) {
                this.formFields[fieldName] = field;
            }
        });
    }

    /**
     * Configura melhorias no formulário
     */
    setupFormEnhancements() {
        // Máscara para telefone
        if (this.formFields.phone) {
            this.setupPhoneMask();
        }

        // Validação de email
        if (this.formFields.email) {
            this.setupEmailValidation();
        }

        // Contador de caracteres para challenge
        if (this.formFields.challenge) {
            this.setupCharacterCounter();
        }

        // Autocomplete para empresa
        if (this.formFields.company) {
            this.setupCompanyAutocomplete();
        }
    }

    /**
     * Configura máscara de telefone
     */
    setupPhoneMask() {
        this.addEventListenerWithCleanup(this.formFields.phone, 'input', (e) => {
            let value = e.target.value.replace(/\D/g, '');
            
            if (value.length <= 11) {
                value = value.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
            }
            
            e.target.value = value;
        });
    }

    /**
     * Configura validação de email
     */
    setupEmailValidation() {
        this.addEventListenerWithCleanup(this.formFields.email, 'blur', (e) => {
            const email = e.target.value;
            const isValid = utils.isValidEmail(email);
            
            if (email && !isValid) {
                this.showFieldError('email', 'Email inválido');
            } else {
                this.clearFieldError('email');
            }
        });
    }

    /**
     * Configura contador de caracteres
     */
    setupCharacterCounter() {
        const maxLength = CONFIG.FORM.validation.maxMessageLength;
        
        // Cria contador
        const counter = document.createElement('div');
        counter.className = 'character-counter';
        counter.textContent = `0/${maxLength}`;
        
        this.formFields.challenge.parentNode.appendChild(counter);
        
        this.addEventListenerWithCleanup(this.formFields.challenge, 'input', (e) => {
            const currentLength = e.target.value.length;
            counter.textContent = `${currentLength}/${maxLength}`;
            
            if (currentLength > maxLength) {
                counter.classList.add('exceeded');
            } else {
                counter.classList.remove('exceeded');
            }
        });
    }

    /**
     * Configura autocomplete para empresa
     */
    setupCompanyAutocomplete() {
        // Implementação básica - pode ser expandida
        const commonCompanies = [
            'Google', 'Microsoft', 'Amazon', 'Apple', 'Meta',
            'Netflix', 'Uber', 'Spotify', 'Airbnb', 'Shopify'
        ];
        
        this.addEventListenerWithCleanup(this.formFields.company, 'input', (e) => {
            const value = e.target.value.toLowerCase();
            
            if (value.length > 2) {
                const suggestions = commonCompanies.filter(company => 
                    company.toLowerCase().includes(value)
                );
                
                this.showCompanySuggestions(suggestions);
            } else {
                this.hideCompanySuggestions();
            }
        });
    }

    /**
     * Mostra sugestões de empresa
     * @param {Array} suggestions - Lista de sugestões
     */
    showCompanySuggestions(suggestions) {
        // Implementação simplificada
        // Em um projeto real, seria mais elaborado
        if (suggestions.length > 0) {
            // Sugestões processadas silenciosamente
        }
    }

    /**
     * Oculta sugestões de empresa
     */
    hideCompanySuggestions() {
        // Implementação para ocultar sugestões
    }

    /**
     * Configura validação em tempo real
     */
    setupRealTimeValidation() {
        Object.keys(this.formFields).forEach(fieldName => {
            const field = this.formFields[fieldName];
            
            this.addEventListenerWithCleanup(field, 'blur', () => {
                this.validateField(fieldName);
            });
            
            this.addEventListenerWithCleanup(field, 'input', () => {
                this.clearFieldError(fieldName);
            });
        });
    }

    /**
     * Valida um campo específico
     * @param {string} fieldName - Nome do campo
     */
    validateField(fieldName) {
        const field = this.formFields[fieldName];
        if (!field) return;
        
        const value = field.value.trim();
        let error = null;
        
        switch (fieldName) {
            case 'name':
                if (!value || value.length < 2) {
                    error = 'Nome deve ter pelo menos 2 caracteres';
                }
                break;
                
            case 'email':
                if (!value) {
                    error = 'Email é obrigatório';
                } else if (!utils.isValidEmail(value)) {
                    error = 'Email inválido';
                }
                break;
                
            case 'phone':
                if (!value) {
                    error = 'Telefone é obrigatório';
                } else if (!utils.isValidPhone(value)) {
                    error = 'Telefone inválido';
                }
                break;
                
            case 'company':
                if (!value || value.length < 2) {
                    error = 'Nome da empresa deve ter pelo menos 2 caracteres';
                }
                break;
                
            case 'position':
                if (!value || value.length < 2) {
                    error = 'Cargo deve ter pelo menos 2 caracteres';
                }
                break;
                
            case 'interest':
                if (!value) {
                    error = 'Interesse principal é obrigatório';
                }
                break;
        }
        
        if (error) {
            this.showFieldError(fieldName, error);
        } else {
            this.clearFieldError(fieldName);
        }
    }

    /**
     * Mostra erro em um campo
     * @param {string} fieldName - Nome do campo
     * @param {string} message - Mensagem de erro
     */
    showFieldError(fieldName, message) {
        const field = this.formFields[fieldName];
        if (!field) return;
        
        this.validationErrors[fieldName] = message;
        
        // Remove erro anterior
        this.clearFieldError(fieldName);
        
        // Adiciona classe de erro
        field.classList.add(CONFIG.CLASSES.error);
        
        // Cria elemento de erro
        const errorElement = document.createElement('div');
        errorElement.className = 'field-error';
        errorElement.textContent = message;
        
        // Insere após o campo
        field.parentNode.insertBefore(errorElement, field.nextSibling);
    }

    /**
     * Remove erro de um campo
     * @param {string} fieldName - Nome do campo
     */
    clearFieldError(fieldName) {
        const field = this.formFields[fieldName];
        if (!field) return;
        
        delete this.validationErrors[fieldName];
        
        // Remove classe de erro
        field.classList.remove(CONFIG.CLASSES.error);
        
        // Remove elemento de erro
        const errorElement = field.parentNode.querySelector('.field-error');
        if (errorElement) {
            errorElement.remove();
        }
    }

    /**
     * Coleta dados do formulário
     * @returns {Object} Dados do formulário
     */
    getFormData() {
        const formData = {};
        
        Object.keys(this.formFields).forEach(fieldName => {
            const field = this.formFields[fieldName];
            formData[fieldName] = field.value.trim();
        });
        
        return formData;
    }

    /**
     * Manipula o submit do formulário
     */
    async handleSubmit() {
        if (this.isSubmitting) return;
        
        try {
            this.isSubmitting = true;
            this.setSubmittingState(true);
            
            // Valida todos os campos
            const isValid = this.validateAllFields();
            
            if (!isValid) {
                utils.log('Formulário inválido', 'warn');
                this.setSubmittingState(false);
                return;
            }
            
            // Coleta dados
            const formData = this.getFormData();
            
            // Emite evento de tentativa de submit
            this.emit('lead:submit_attempt', formData);
            
            // Submete via use case
            const result = await this.submitLeadUseCase.execute(formData);
            
            if (result.success) {
                this.onSubmitSuccess(result);
            } else {
                this.onSubmitError(result);
            }
            
        } catch (error) {
            utils.log(`Erro no submit: ${error.message}`, 'error');
            this.onSubmitError({ error: error.message });
            
        } finally {
            this.isSubmitting = false;
            this.setSubmittingState(false);
        }
    }

    /**
     * Valida todos os campos do formulário
     * @returns {boolean} Se todos os campos são válidos
     */
    validateAllFields() {
        Object.keys(this.formFields).forEach(fieldName => {
            this.validateField(fieldName);
        });
        
        return Object.keys(this.validationErrors).length === 0;
    }

    /**
     * Define o estado de submissão
     * @param {boolean} isSubmitting - Se está submetendo
     */
    setSubmittingState(isSubmitting) {
        const submitButton = this.element.querySelector('button[type="submit"]');
        
        if (submitButton) {
            submitButton.disabled = isSubmitting;
            submitButton.textContent = isSubmitting ? 'Enviando...' : 'Solicitar Consultoria Gratuita';
        }
        
        if (isSubmitting) {
            this.addClass(CONFIG.CLASSES.loading);
        } else {
            this.removeClass(CONFIG.CLASSES.loading);
        }
    }

    /**
     * Manipula sucesso no submit
     * @param {Object} result - Resultado do submit
     */
    onSubmitSuccess(result) {
        utils.log('Formulário enviado com sucesso', 'info');
        
        // Mostra mensagem de sucesso
        this.showSuccessMessage(result.message);
        
        // Reseta formulário
        this.resetForm();
        
        // Emite evento de sucesso
        this.emit('lead:submit_success', result);
    }

    /**
     * Manipula erro no submit
     * @param {Object} error - Erro do submit
     */
    onSubmitError(error) {
        utils.log(`Erro no submit: ${error.error}`, 'error');
        
        // Mostra mensagem de erro
        this.showErrorMessage(error.message || 'Erro ao enviar formulário');
        
        // Emite evento de erro
        this.emit('lead:submit_error', error);
    }

    /**
     * Mostra mensagem de sucesso
     * @param {string} message - Mensagem
     */
    showSuccessMessage(message) {
        this.showMessage(message, 'success');
    }

    /**
     * Mostra mensagem de erro
     * @param {string} message - Mensagem
     */
    showErrorMessage(message) {
        this.showMessage(message, 'error');
    }

    /**
     * Mostra uma mensagem
     * @param {string} message - Mensagem
     * @param {string} type - Tipo da mensagem
     */
    showMessage(message, type = 'info') {
        // Remove mensagem anterior
        const existingMessage = this.element.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        // Cria nova mensagem
        const messageElement = document.createElement('div');
        messageElement.className = `form-message form-message-${type}`;
        messageElement.textContent = message;
        
        // Insere no início do formulário
        this.element.insertBefore(messageElement, this.element.firstChild);
        
        // Remove após 5 segundos
        setTimeout(() => {
            messageElement.remove();
        }, 5000);
    }

    /**
     * Reseta o formulário
     */
    resetForm() {
        this.element.reset();
        this.validationErrors = {};
        
        // Remove todas as mensagens de erro
        Object.keys(this.formFields).forEach(fieldName => {
            this.clearFieldError(fieldName);
        });
    }

    /**
     * Callback para lead submetido
     * @param {Object} data - Dados do evento
     */
    onLeadSubmitted(data) {
        utils.log('Lead submetido com sucesso', 'info');
    }

    /**
     * Callback para erro no lead
     * @param {Object} data - Dados do erro
     */
    onLeadError(data) {
        utils.log(`Erro no lead: ${data.error}`, 'error');
    }
}
