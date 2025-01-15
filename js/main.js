// Efeito de partículas no fundo
particlesJS('particles-js', {
    particles: {
        number: {
            value: 80,
            density: {
                enable: true,
                value_area: 800
            }
        },
        color: {
            value: '#00ff88'
        },
        shape: {
            type: 'circle'
        },
        opacity: {
            value: 0.5,
            random: true
        },
        size: {
            value: 3,
            random: true
        },
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
            onhover: {
                enable: true,
                mode: 'grab'
            },
            resize: true
        },
        modes: {
            grab: {
                distance: 140,
                line_linked: {
                    opacity: 1
                }
            }
        }
    },
    retina_detect: true
});

// Efeito de digitação no título principal
const titleElement = document.querySelector('.hero-text h1');
const originalText = titleElement.textContent;
titleElement.textContent = '';

function typeWriter(text, element, index = 0) {
    if (index < text.length) {
        element.textContent += text.charAt(index);
        setTimeout(() => typeWriter(text, element, index + 1), 50);
    }
}

// Inicia a animação de digitação após 1 segundo
setTimeout(() => {
    typeWriter(originalText, titleElement);
}, 1000);

// Efeito de scroll suave
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Efeito de revelação dos elementos
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Adiciona efeito de brilho neon ao aparecer
            entry.target.style.boxShadow = '0 0 20px rgba(0,255,136,0.2)';
            setTimeout(() => {
                entry.target.style.boxShadow = 'none';
            }, 1000);
            
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Elementos para animar
const animateElements = document.querySelectorAll('.benefit-card, .chapter, .testimonial-card, .faq-item');
animateElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
    observer.observe(element);
});

// Efeito de hover nos cards
document.querySelectorAll('.benefit-card, .chapter, .testimonial-card, .faq-item').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
        
        // Adiciona brilho na direção do mouse
        const gradientSize = 150;
        const gradientX = (x / rect.width) * 100;
        const gradientY = (y / rect.height) * 100;
        
        card.style.background = `
            radial-gradient(
                circle ${gradientSize}px at ${gradientX}% ${gradientY}%, 
                rgba(0, 255, 136, 0.1),
                transparent
            ),
            rgba(10, 10, 31, 0.5)
        `;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.background = 'rgba(10, 10, 31, 0.5)';
    });
});

// Gerenciamento dos botões de ação
function setupActionButtons() {
    const actionButtons = document.querySelectorAll('.action-button, .cta-button');
    
    actionButtons.forEach(button => {
        button.addEventListener('click', async (e) => {
            // Previne o comportamento padrão do link
            e.preventDefault();
            
            const href = button.getAttribute('href');
            if (!href) return;

            // Desabilita temporariamente o botão
            button.disabled = true;
            button.style.opacity = '0.7';
            
            try {
                // Se for um link externo
                if (href.startsWith('http')) {
                    window.open(href, '_blank');
                } 
                // Se for uma âncora interna
                else if (href.startsWith('#')) {
                    const targetElement = document.querySelector(href);
                    if (targetElement) {
                        targetElement.scrollIntoView({
                            behavior: 'smooth'
                        });
                    }
                }
            } catch (error) {
                console.error('Erro ao processar ação do botão:', error);
            } finally {
                // Reabilita o botão após um pequeno delay
                setTimeout(() => {
                    button.disabled = false;
                    button.style.opacity = '1';
                }, 1000);
            }
        });
    });
}

// Inicializa os botões quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    setupActionButtons();
});

// Efeito de destaque no CTA principal
const ctaButton = document.querySelector('.cta-button');
setInterval(() => {
    ctaButton.style.animation = 'none';
    ctaButton.offsetHeight; // Trigger reflow
    ctaButton.style.animation = 'pulse 1s cubic-bezier(0.4, 0, 0.2, 1)';
}, 5000);

// Adiciona loading no botão de compra
document.querySelectorAll('.cta-button').forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        const href = this.getAttribute('href');
        
        // Adiciona classe de loading
        this.classList.add('loading');
        this.textContent = 'Redirecionando...';
        
        // Simula um pequeno delay antes do redirecionamento
        setTimeout(() => {
            window.location.href = href;
        }, 1500); // 1.5 segundos de delay
    });
});

// Efeito de paralaxe no scroll
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.benefit-card, .chapter');
    
    parallaxElements.forEach(element => {
        const speed = 0.1;
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
    });
});

// Cursor personalizado
const cursor = document.querySelector('.cursor-glow');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

// Efeito de hover no cursor
document.querySelectorAll('a, button, .benefit-card, .chapter, .testimonial-card, .faq-item').forEach(element => {
    element.addEventListener('mouseenter', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(2)';
        cursor.style.mixBlendMode = 'screen';
    });
    
    element.addEventListener('mouseleave', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        cursor.style.mixBlendMode = 'screen';
    });
});

// Efeito de clique no cursor
document.addEventListener('mousedown', () => {
    cursor.style.transform = 'translate(-50%, -50%) scale(0.8)';
});

document.addEventListener('mouseup', () => {
    cursor.style.transform = 'translate(-50%, -50%) scale(1)';
});

// Ocultar cursor padrão
document.body.style.cursor = 'none';
