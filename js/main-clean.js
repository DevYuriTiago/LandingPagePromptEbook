/**
 * @fileoverview Script principal da Landing Page Prompts360
 * Responsável pela inicialização de efeitos visuais e interações do usuário
 */

// Configuração global
const CONFIG = {
    headerShowThreshold: window.innerHeight * 0.8,
    animationDuration: 600
};

/**
 * Controla a visibilidade do header baseado no scroll
 */
function initHeaderControl() {
    const header = document.getElementById('header');
    if (!header) return;
    
    let lastScrollY = window.scrollY;
    
    function updateHeader() {
        const currentScrollY = window.scrollY;
        
        // Mostra header após passar da primeira seção
        if (currentScrollY > CONFIG.headerShowThreshold) {
            header.classList.add('visible');
        } else {
            header.classList.remove('visible');
        }
        
        // Adiciona efeito de scroll
        if (currentScrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScrollY = currentScrollY;
    }
    
    // Throttle scroll events
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                updateHeader();
                ticking = false;
            });
            ticking = true;
        }
    });
}

/**
 * Inicializa animações de scroll reveal
 */
function initScrollAnimations() {
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animateElements.forEach(el => observer.observe(el));
}

/**
 * Controla o formulário de lead
 */
function initFormHandler() {
    const form = document.getElementById('leadForm');
    if (!form) return;
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        // Loading state
        submitButton.textContent = 'Enviando...';
        submitButton.disabled = true;
        
        try {
            // Simula envio do formulário
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Mostra mensagem de sucesso
            showAlert('Obrigado! Entraremos em contato em breve.', 'success');
            form.reset();
            
            // Track conversion
            if (typeof fbq !== 'undefined') {
                fbq('track', 'Lead');
            }
            
            if (typeof gtag !== 'undefined') {
                gtag('event', 'generate_lead', {
                    event_category: 'engagement',
                    event_label: 'consultation_form'
                });
            }
            
        } catch (error) {
            showAlert('Erro ao enviar formulário. Tente novamente.', 'error');
        } finally {
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }
    });
}

/**
 * Mostra alertas para o usuário
 */
function showAlert(message, type = 'info') {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type}`;
    alertDiv.textContent = message;
    
    // Insere antes do formulário
    const form = document.getElementById('leadForm');
    if (form) {
        form.parentNode.insertBefore(alertDiv, form);
        
        // Remove após 5 segundos
        setTimeout(() => {
            alertDiv.remove();
        }, 5000);
    }
}

/**
 * Implementa smooth scroll para links internos
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const header = document.getElementById('header');
                const headerHeight = header ? header.offsetHeight : 0;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Inicializa efeitos parallax da linha
 */
function initParallaxLine() {
    const line = document.querySelector('.connection-line');
    if (!line) return;
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        line.style.transform = `translateY(${rate}px)`;
    });
}

/**
 * Inicializa todos os efeitos quando o DOM estiver pronto
 */
function init() {
    // Aguarda o carregamento completo do DOM
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
        return;
    }
    
    try {
        initHeaderControl();
        initScrollAnimations();
        initFormHandler();
        initSmoothScroll();
        initParallaxLine();
        
        console.log('✅ Prompts360 Landing Page initialized successfully');
        
    } catch (error) {
        console.error('❌ Error initializing landing page:', error);
    }
}

// Inicializa quando a página carregar
init();

// Exporta funções para uso global se necessário
window.Prompts360 = {
    showAlert,
    init
};
