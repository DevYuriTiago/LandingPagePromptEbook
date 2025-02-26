// Funcionalidades para aumentar a conversão

// Sticky Header
function initStickyHeader() {
    const stickyHeader = document.querySelector('.sticky-header');
    const triggerPoint = 300; // Ponto de scroll para mostrar o header
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > triggerPoint) {
            stickyHeader.classList.add('visible');
        } else {
            stickyHeader.classList.remove('visible');
        }
    });
}

// Contador de vagas limitadas
function initLimitedSpots() {
    const spotsElement = document.querySelector('.spots-number');
    if (!spotsElement) return;
    
    // Começa com um número aleatório entre 7 e 15
    let spots = Math.floor(Math.random() * 9) + 7;
    spotsElement.textContent = spots;
    
    // Diminui aleatoriamente a cada 30-120 segundos
    function reduceSpots() {
        if (spots > 1) {
            spots -= 1;
            spotsElement.textContent = spots;
            
            // Adiciona classe de destaque
            spotsElement.classList.add('highlight');
            setTimeout(() => {
                spotsElement.classList.remove('highlight');
            }, 1000);
            
            // Agenda próxima redução
            const nextReduction = Math.floor(Math.random() * 90000) + 30000; // 30-120 segundos
            setTimeout(reduceSpots, nextReduction);
        }
    }
    
    // Inicia o processo após um tempo aleatório
    const initialDelay = Math.floor(Math.random() * 60000) + 30000; // 30-90 segundos
    setTimeout(reduceSpots, initialDelay);
}

// Popup de saída
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

// Formulário de captura de leads
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
            
            // Simula envio (aqui você conectaria com sua API de email marketing)
            leadForm.innerHTML = '<div class="success-message">Obrigado! Enviamos um email de confirmação.</div>';
            
            // Registra evento de conversão
            if (typeof fbq === 'function') {
                fbq('track', 'Lead');
            }
        });
    }
}

// Adiciona animação de scroll para todos os elementos com a classe .animate-on-scroll
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

// Adiciona feedback visual aos botões
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

// Inicializa todas as funcionalidades quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    initStickyHeader();
    initExitPopup();
    initLeadCapture();
    initScrollAnimations();
    initButtonFeedback();
});
