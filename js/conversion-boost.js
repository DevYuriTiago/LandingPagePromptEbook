/**
 * @fileoverview Módulo de otimização de conversão
 * Implementa funcionalidades para aumentar a taxa de conversão da landing page
 */

// Constantes de configuração
const SCROLL_TRIGGER_POINT = 300; // Ponto de scroll para mostrar o header
const SPOTS_MIN = 7;
const SPOTS_MAX = 15;
const REDUCTION_MIN_DELAY = 30000; // 30 segundos
const REDUCTION_MAX_DELAY = 120000; // 2 minutos

/**
 * Inicializa o cabeçalho fixo que aparece ao rolar a página
 */
function initStickyHeader() {
    const stickyHeader = document.querySelector('.sticky-header');
    if (!stickyHeader) return;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > SCROLL_TRIGGER_POINT) {
            stickyHeader.classList.add('visible');
        } else {
            stickyHeader.classList.remove('visible');
        }
    });
}

/**
 * Inicializa o contador de vagas limitadas com redução gradual
 */
function initLimitedSpots() {
    const spotsElement = document.querySelector('.spots-number');
    if (!spotsElement) return;
    
    // Começa com um número aleatório entre SPOTS_MIN e SPOTS_MAX
    let spots = Math.floor(Math.random() * (SPOTS_MAX - SPOTS_MIN + 1)) + SPOTS_MIN;
    spotsElement.textContent = spots;
    
    /**
     * Reduz o número de vagas e agenda a próxima redução
     */
    function reduceSpots() {
        if (spots <= 1) return;
        
        spots -= 1;
        spotsElement.textContent = spots;
        
        // Adiciona classe de destaque
        spotsElement.classList.add('highlight');
        setTimeout(() => {
            spotsElement.classList.remove('highlight');
        }, 1000);
        
        // Agenda próxima redução
        const nextReduction = Math.floor(Math.random() * 
            (REDUCTION_MAX_DELAY - REDUCTION_MIN_DELAY + 1)) + REDUCTION_MIN_DELAY;
        setTimeout(reduceSpots, nextReduction);
    }
    
    // Inicia o processo após um tempo aleatório
    const initialDelay = Math.floor(Math.random() * 60000) + 30000; // 30-90 segundos
    setTimeout(reduceSpots, initialDelay);
}

/**
 * Inicializa o popup de saída
 */
function initExitPopup() {
    const exitPopup = document.getElementById('exit-popup');
    const closePopup = document.querySelector('.close-popup');
    let showOnce = false;
    
    // Fecha o popup quando clicar no X
    if (closePopup) {
        closePopup.addEventListener('click', () => {
            exitPopup.classList.remove('visible');
        });
    }
    
    // Detecta quando o usuário tenta sair da página
    document.addEventListener('mouseleave', (e) => {
        if (e.clientY < 0 && !showOnce) {
            exitPopup.classList.add('visible');
            showOnce = true;
        }
    });
}

/**
 * Inicializa o formulário de captura de leads
 */
function initLeadCapture() {
    const leadForm = document.getElementById('lead-form');
    
    if (leadForm) {
        leadForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const emailInput = document.getElementById('lead-email');
            const email = emailInput.value;
            
            if (!email || !email.includes('@')) {
                // Validação básica de email
                emailInput.classList.add('error');
                return;
            }
            
            // Remove classe de erro se existir
            emailInput.classList.remove('error');
            
            // Mostra indicador de carregamento
            const submitButton = leadForm.querySelector('.lead-submit');
            const originalText = submitButton.textContent;
            submitButton.textContent = 'Enviando...';
            submitButton.disabled = true;
            
            // Envia dados para o Google Sheets
            submitToGoogleSheets(email)
                .then(() => {
                    // Mostra mensagem de sucesso
                    leadForm.innerHTML = '<div class="success-message">Obrigado! Enviamos um email de confirmação.</div>';
                    
                    // Registra evento de conversão
                    if (typeof fbq === 'function') {
                        fbq('track', 'Lead');
                    }
                })
                .catch(error => {
                    // Restaura botão e mostra erro
                    submitButton.textContent = originalText;
                    submitButton.disabled = false;
                    
                    // Adiciona mensagem de erro
                    const errorElement = document.createElement('div');
                    errorElement.className = 'error-message';
                    errorElement.textContent = 'Ocorreu um erro. Tente novamente.';
                    
                    // Remove mensagem de erro anterior, se existir
                    const existingError = leadForm.querySelector('.error-message');
                    if (existingError) {
                        existingError.remove();
                    }
                    
                    leadForm.appendChild(errorElement);
                });
        });
    }
}

/**
 * Inicializa as animações de scroll para os elementos com a classe .animate-on-scroll
 */
function initScrollAnimations() {
    const elements = document.querySelectorAll('.animate-on-scroll');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
}

/**
 * Inicializa o feedback visual para os botões
 */
function initButtonFeedback() {
    const buttons = document.querySelectorAll('button, .cta-button');
    
    buttons.forEach(button => {
        button.addEventListener('mousedown', () => {
            button.style.transform = 'scale(0.98)';
        });
        
        button.addEventListener('mouseup', () => {
            button.style.transform = 'scale(1)';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'scale(1)';
        });
    });
}

/**
 * Inicializa todas as funcionalidades de otimização de conversão
 */
function initConversionFeatures() {
    initStickyHeader();
    initExitPopup();
    initLimitedSpots();
    initLeadCapture();
    initScrollAnimations();
    initButtonFeedback();
}

// Inicializa todas as funcionalidades quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', initConversionFeatures);
