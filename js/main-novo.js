/**
 * Prompts360 Agency - Main JavaScript
 * Arquivo principal para funcionalidades da landing page
 */

// Variáveis globais
let isLoaded = false;
let headerScrolled = false;

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

/**
 * Inicializa todas as funcionalidades da aplicação
 */
function initializeApp() {
    initSmoothScroll();
    initHeaderScroll();
    initAnimations();
    initFormHandling();
    initAnalytics();
    
    // Marca como carregado
    isLoaded = true;
    console.log('Prompts360 Landing Page loaded successfully');
}

/**
 * Inicializa scroll suave para âncoras
 */
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = 80;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Analytics tracking
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'scroll_to_section', {
                        'section_name': targetId.replace('#', '')
                    });
                }
            }
        });
    });
}

/**
 * Controla o comportamento do header durante scroll
 */
function initHeaderScroll() {
    const header = document.getElementById('header');
    
    if (!header) return;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100 && !headerScrolled) {
            header.classList.add('scrolled');
            headerScrolled = true;
        } else if (scrollTop <= 100 && headerScrolled) {
            header.classList.remove('scrolled');
            headerScrolled = false;
        }
    });
}

/**
 * Inicializa animações de scroll
 */
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                
                // Para elementos com delay de animação
                const delay = entry.target.dataset.delay;
                if (delay) {
                    entry.target.style.animationDelay = delay + 'ms';
                }
            }
        });
    }, observerOptions);
    
    // Observa todos os elementos com animação
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(el => observer.observe(el));
}

/**
 * Gerencia o formulário de leads
 */
function initFormHandling() {
    const form = document.getElementById('leadForm');
    
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Validação básica
        if (!validateForm(data)) {
            return;
        }
        
        // Mostra loading
        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Enviando...';
        submitButton.disabled = true;
        
        // Envia para Google Sheets
        submitToGoogleSheets(data)
            .then(() => {
                showSuccessMessage();
                form.reset();
                
                // Analytics tracking
                trackFormSubmission(data);
            })
            .catch((error) => {
                console.error('Erro ao enviar formulário:', error);
                showErrorMessage();
            })
            .finally(() => {
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            });
    });
}

/**
 * Valida os dados do formulário
 */
function validateForm(data) {
    const requiredFields = ['name', 'email', 'phone', 'company', 'position', 'interest'];
    
    for (let field of requiredFields) {
        if (!data[field] || data[field].trim() === '') {
            showValidationError(`O campo ${getFieldLabel(field)} é obrigatório`);
            return false;
        }
    }
    
    // Validação de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        showValidationError('Por favor, insira um e-mail válido');
        return false;
    }
    
    // Validação de telefone
    const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
    if (!phoneRegex.test(data.phone.replace(/\s/g, ''))) {
        showValidationError('Por favor, insira um telefone válido');
        return false;
    }
    
    return true;
}

/**
 * Retorna o label do campo para mensagens de erro
 */
function getFieldLabel(field) {
    const labels = {
        name: 'Nome',
        email: 'E-mail',
        phone: 'Telefone',
        company: 'Empresa',
        position: 'Cargo',
        interest: 'Interesse'
    };
    return labels[field] || field;
}

/**
 * Envia dados para Google Sheets
 */
async function submitToGoogleSheets(data) {
    // URL do Google Apps Script (deve ser configurada)
    const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbz.../exec';
    
    const payload = {
        timestamp: new Date().toISOString(),
        source: 'Prompts360 Landing Page',
        ...data
    };
    
    try {
        const response = await fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)
        });
        
        // No-cors mode doesn't allow reading response, so we assume success
        console.log('Form submitted successfully');
        return true;
    } catch (error) {
        console.error('Error submitting form:', error);
        throw error;
    }
}

/**
 * Mostra mensagem de sucesso
 */
function showSuccessMessage() {
    // Remove mensagens anteriores
    removeMessages();
    
    const message = document.createElement('div');
    message.className = 'alert alert-success';
    message.innerHTML = `
        <strong>Sucesso!</strong> Sua solicitação foi enviada. Nossa equipe entrará em contato em breve.
    `;
    
    const form = document.getElementById('leadForm');
    form.parentNode.insertBefore(message, form);
    
    // Remove a mensagem após 5 segundos
    setTimeout(() => {
        message.remove();
    }, 5000);
    
    // Scroll para a mensagem
    message.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

/**
 * Mostra mensagem de erro
 */
function showErrorMessage() {
    removeMessages();
    
    const message = document.createElement('div');
    message.className = 'alert alert-error';
    message.innerHTML = `
        <strong>Erro!</strong> Houve um problema ao enviar sua solicitação. Tente novamente.
    `;
    
    const form = document.getElementById('leadForm');
    form.parentNode.insertBefore(message, form);
    
    setTimeout(() => {
        message.remove();
    }, 5000);
}

/**
 * Mostra erro de validação
 */
function showValidationError(message) {
    removeMessages();
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'alert alert-warning';
    errorDiv.innerHTML = `<strong>Atenção!</strong> ${message}`;
    
    const form = document.getElementById('leadForm');
    form.parentNode.insertBefore(errorDiv, form);
    
    setTimeout(() => {
        errorDiv.remove();
    }, 3000);
}

/**
 * Remove mensagens existentes
 */
function removeMessages() {
    const existing = document.querySelectorAll('.alert');
    existing.forEach(el => el.remove());
}

/**
 * Inicializa analytics e tracking
 */
function initAnalytics() {
    // Track page view
    if (typeof gtag !== 'undefined') {
        gtag('config', 'G-MP7TZJNWD0', {
            page_title: 'Prompts360 - Landing Page',
            page_location: window.location.href
        });
    }
    
    if (typeof fbq !== 'undefined') {
        fbq('track', 'PageView');
    }
    
    // Track scroll depth
    trackScrollDepth();
    
    // Track button clicks
    trackButtonClicks();
}

/**
 * Rastreia envio do formulário
 */
function trackFormSubmission(data) {
    // Google Analytics
    if (typeof gtag !== 'undefined') {
        gtag('event', 'generate_lead', {
            'event_category': 'form',
            'event_label': 'lead_form_submission',
            'value': 1
        });
        
        gtag('event', 'conversion', {
            'send_to': 'G-MP7TZJNWD0/conversion'
        });
    }
    
    // Facebook Pixel
    if (typeof fbq !== 'undefined') {
        fbq('track', 'Lead', {
            content_name: 'Prompts360 Consultation',
            content_category: 'AI Consultation',
            value: 1000,
            currency: 'BRL'
        });
    }
    
    console.log('Form submission tracked:', data.interest);
}

/**
 * Rastreia profundidade de scroll
 */
function trackScrollDepth() {
    let maxScroll = 0;
    const milestones = [25, 50, 75, 90];
    const tracked = [];
    
    window.addEventListener('scroll', function() {
        const scrollPercent = Math.round(
            (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
        );
        
        if (scrollPercent > maxScroll) {
            maxScroll = scrollPercent;
            
            milestones.forEach(milestone => {
                if (scrollPercent >= milestone && !tracked.includes(milestone)) {
                    tracked.push(milestone);
                    
                    if (typeof gtag !== 'undefined') {
                        gtag('event', 'scroll', {
                            'event_category': 'engagement',
                            'event_label': `${milestone}%`,
                            'value': milestone
                        });
                    }
                }
            });
        }
    });
}

/**
 * Rastreia cliques em botões
 */
function trackButtonClicks() {
    const buttons = document.querySelectorAll('.cta-button, .cta-button-secondary, .nav-cta');
    
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const buttonText = this.textContent.trim();
            const buttonClass = this.className;
            
            if (typeof gtag !== 'undefined') {
                gtag('event', 'click', {
                    'event_category': 'button',
                    'event_label': buttonText,
                    'button_class': buttonClass
                });
            }
        });
    });
}

/**
 * Utilitários
 */

// Debounce function para otimizar eventos de scroll
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function para eventos frequentes
function throttle(func, limit) {
    let lastFunc;
    let lastRan;
    return function() {
        const context = this;
        const args = arguments;
        if (!lastRan) {
            func.apply(context, args);
            lastRan = Date.now();
        } else {
            clearTimeout(lastFunc);
            lastFunc = setTimeout(function() {
                if ((Date.now() - lastRan) >= limit) {
                    func.apply(context, args);
                    lastRan = Date.now();
                }
            }, limit - (Date.now() - lastRan));
        }
    };
}

// Função para detectar dispositivo móvel
function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 768;
}

// Exporta funções para uso global se necessário
window.Prompts360 = {
    trackFormSubmission,
    isMobile,
    isLoaded: () => isLoaded
};
