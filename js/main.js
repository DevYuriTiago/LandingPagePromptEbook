// Configuração das partículas de fundo
particlesJS('particles-js', {
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
            resize: true
        },
        modes: {
            grab: {
                distance: 140,
                line_linked: { opacity: 1 }
            }
        }
    },
    retina_detect: true
});

// Efeito de digitação no título
function typeWriter(text, element, index = 0) {
    if (index < text.length) {
        element.textContent += text.charAt(index);
        setTimeout(() => typeWriter(text, element, index + 1), 50);
    }
}

// Efeito de revelação dos elementos
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

// Gerenciamento do formulário
function setupForm(form) {
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Validação dos campos
        const name = this.querySelector('input[name="name"]').value.trim();
        const email = this.querySelector('input[name="email"]').value.trim();
        const whatsapp = this.querySelector('input[name="whatsapp"]').value.replace(/\D/g, '');
        const profession = this.querySelector('input[name="profession"]').value.trim();

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

// Função para validar e-mail
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Função para mostrar mensagem de erro
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

// Função para mostrar mensagem de sucesso
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

// Máscara para o campo de WhatsApp
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

// Inicialização quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    // Inicializa efeito de digitação
    const titleElement = document.querySelector('.hero-text h1');
    const originalText = titleElement.textContent;
    titleElement.textContent = '';
    setTimeout(() => typeWriter(originalText, titleElement), 1000);

    // Inicializa scroll suave
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href'))?.scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Inicializa animações dos elementos
    const animateElements = document.querySelectorAll('.benefit-card, .chapter, .testimonial-card, .faq-item');
    animateElements.forEach(element => {
        element.style.cssText = `
            opacity: 0;
            transform: translateY(20px);
            transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        `;
        observer.observe(element);
    });

    // Inicializa formulário
    const form = document.getElementById('lead-form');
    if (form) {
        setupForm(form);
        const whatsappInput = form.querySelector('input[name="whatsapp"]');
        if (whatsappInput) {
            setupWhatsAppMask(whatsappInput);
        }
    }
});
