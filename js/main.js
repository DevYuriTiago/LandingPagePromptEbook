/**
 * @fileoverview Script principal da Landing Page
 * Responsável pela inicialização de efeitos visuais e interações do usuário
 */

// Configuração das partículas de fundo (usando IIFE para evitar conflitos)
(function() {
    // Verificar se a configuração já existe
    if (typeof window.PARTICLES_CONFIG !== 'undefined') {
        return; // Já foi definido, não redefina
    }
    
    window.PARTICLES_CONFIG = {
        particles: {
            number: { value: 80, density: { enable: true, value_area: 800 } },
            color: { value: '#00ff88' },
            shape: { type: 'circle' },
            opacity: { value: 0.5, random: true },
            size: { value: 3, random: true },
            line_linked: {
                enable: true,
                distance: 150,
                color: '#00ff88',
                opacity: 0.4,
                width: 1
            },
            move: {
                enable: true,
                speed: 2,
                direction: 'none',
                random: true,
                straight: false,
                out_mode: 'out',
                bounce: false
            }
        },
        interactivity: {
            detect_on: 'canvas',
            events: {
                onhover: { enable: true, mode: 'grab' },
                onclick: { enable: true, mode: 'push' },
                resize: true
            },
            modes: {
                grab: { distance: 140, line_linked: { opacity: 1 } },
                push: { particles_nb: 4 }
            }
        },
        retina_detect: true
    };
})();

/**
 * Inicializa o efeito de partículas
 */
function initParticles() {
    if (typeof particlesJS === 'function' && document.getElementById('particles-js')) {
        particlesJS('particles-js', window.PARTICLES_CONFIG);
    }
}

/**
 * Cria efeito de digitação em um elemento
 * @param {string} text - Texto a ser digitado
 * @param {HTMLElement} element - Elemento onde o texto será exibido
 * @param {number} index - Índice atual da letra (usado internamente)
 */
function typeWriter(text, element, index = 0) {
    if (!element || index >= text.length) return;
    
    element.textContent += text.charAt(index);
    setTimeout(() => typeWriter(text, element, index + 1), 50);
}

/**
 * Efeito de revelação dos elementos
 */
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            entry.target.style.boxShadow = '0 0 20px rgba(0,255,136,0.2)';
            setTimeout(() => {
                entry.target.style.boxShadow = 'none';
            }, 1000);
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

/**
 * Configura o comportamento do formulário
 * @param {HTMLFormElement} form - Formulário a ser configurado
 */
function setupForm(form) {
    if (!form) return;
    
    // Verifica se é o formulário de lead (simplificado) ou outro formulário
    const isLeadForm = form.id === 'lead-form';
    
    form.addEventListener('submit', async function(e) {
        // Se for o formulário de lead, não fazemos nada aqui pois ele é tratado pelo conversion-boost.js
        if (isLeadForm) {
            return; // Deixa o conversion-boost.js lidar com este formulário
        }
        
        e.preventDefault();
        
        // Validação dos campos (apenas para formulários completos, não o lead-form)
        const nameInput = this.querySelector('input[name="name"]');
        const emailInput = this.querySelector('input[name="email"]');
        const whatsappInput = this.querySelector('input[name="whatsapp"]');
        const professionInput = this.querySelector('input[name="profession"]');
        
        // Só prossegue se todos os campos existirem
        if (!nameInput || !emailInput || !whatsappInput || !professionInput) {
            return;
        }
        
        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const whatsapp = whatsappInput.value.replace(/\D/g, '');
        const profession = professionInput.value.trim();

        // Validações específicas
        if (name.length < 3) {
            showErrorMessage(this, 'Por favor, insira seu nome completo');
            return;
        }

        if (!isValidEmail(email)) {
            showErrorMessage(this, 'Por favor, insira um e-mail válido');
            return;
        }

        if (whatsapp.length !== 11) {
            showErrorMessage(this, 'Por favor, insira um número de WhatsApp válido com DDD');
            return;
        }

        if (profession.length < 2) {
            showErrorMessage(this, 'Por favor, insira sua profissão');
            return;
        }

        const formData = {
            name,
            email,
            whatsapp,
            profession
        };

        const submitButton = this.querySelector('.submit-button');
        submitButton.disabled = true;
        submitButton.textContent = 'Enviando...';

        try {
            const response = await fetch('https://prompts360.app.n8n.cloud/webhook-test/consult-signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                this.reset();
                showSuccessMessage(this);
            } else {
                throw new Error('Erro ao enviar formulário');
            }
        } catch (error) {
            console.error('Erro:', error);
            showErrorMessage(this, 'Ocorreu um erro ao enviar o formulário. Por favor, tente novamente.');
        } finally {
            submitButton.disabled = false;
            submitButton.textContent = 'Receber Templates Grátis';
        }
    });
}

/**
 * Função para validar e-mail
 * @param {string} email - E-mail a ser validado
 * @returns {boolean} True se o e-mail for válido, false caso contrário
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Função para mostrar mensagem de erro
 * @param {HTMLFormElement} form - Formulário que gerou o erro
 * @param {string} message - Mensagem de erro a ser exibida
 */
function showErrorMessage(form, message) {
    // Remove qualquer mensagem existente
    const existingMessage = form.querySelector('.error-message, .success-message');
    if (existingMessage) {
        existingMessage.remove();
    }

    const messageDiv = document.createElement('div');
    messageDiv.className = 'error-message';
    messageDiv.textContent = message;
    messageDiv.style.cssText = `
        color: #ff3333;
        margin-top: 10px;
        text-align: center;
        padding: 10px;
        background-color: rgba(255, 51, 51, 0.1);
        border-radius: 4px;
    `;
    
    form.appendChild(messageDiv);
    setTimeout(() => messageDiv.remove(), 5000);
}

/**
 * Função para mostrar mensagem de sucesso
 * @param {HTMLFormElement} form - Formulário que gerou a mensagem de sucesso
 */
function showSuccessMessage(form) {
    // Remove qualquer mensagem existente
    const existingMessage = form.querySelector('.error-message, .success-message');
    if (existingMessage) {
        existingMessage.remove();
    }

    const messageDiv = document.createElement('div');
    messageDiv.className = 'success-message';
    messageDiv.textContent = 'Formulário enviado com sucesso!';
    messageDiv.style.cssText = `
        color: #00ff88;
        margin-top: 10px;
        text-align: center;
        padding: 10px;
        background-color: rgba(0, 255, 136, 0.1);
        border-radius: 4px;
    `;
    
    form.appendChild(messageDiv);
    setTimeout(() => messageDiv.remove(), 3000);
}

/**
 * Máscara para o campo de WhatsApp
 * @param {HTMLInputElement} input - Campo de WhatsApp a ser mascarado
 */
function setupWhatsAppMask(input) {
    input.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length <= 11) {
            value = value.replace(/^(\d{2})(\d)/g, '($1) $2');
            value = value.replace(/(\d)(\d{4})$/, '$1-$2');
            e.target.value = value;
        }
    });
}

/**
 * Inicializa todos os componentes da página
 */
function initPage() {
    // Inicializa efeito de partículas
    initParticles();
    
    // Inicializa efeito de digitação
    const titleElement = document.querySelector('.hero-text h1');
    if (titleElement) {
        const originalText = titleElement.textContent;
        titleElement.textContent = '';
        setTimeout(() => typeWriter(originalText, titleElement), 500);
    }
    
    // Inicializa observador para animações de scroll
    document.querySelectorAll('.animate-on-scroll').forEach(element => {
        observer.observe(element);
    });
    
    // Inicializa formulários (exceto o formulário de lead que é tratado pelo conversion-boost.js)
    document.querySelectorAll('form:not(#lead-form)').forEach(form => {
        setupForm(form);
        const whatsappInput = form.querySelector('input[name="whatsapp"]');
        if (whatsappInput) {
            setupWhatsAppMask(whatsappInput);
        }
    });
}

// Inicialização quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', initPage);
