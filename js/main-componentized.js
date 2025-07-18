/**
 * @fileoverview Main.js Componentizado - Arquitetura Limpa
 * Arquivo principal que inicializa a aplicação com arquitetura limpa
 * Mantém compatibilidade com funcionalidades existentes
 */

import app from './app.js';

// Configuração global para compatibilidade
const CONFIG = {
    headerShowThreshold: window.innerHeight * 0.8,
    animationDuration: 600,
    loadingDuration: 3000 // 3 segundos de loading
};

/**
 * Função legada para compatibilidade
 * Mantém as funcionalidades existentes funcionando
 */
function initLegacyCompatibility() {
    // Expõe funções globais para compatibilidade
    window.CONFIG = CONFIG;
    
    // Função de loading legada
    window.initLoadingScreen = initLoadingScreen;
    window.initHeaderBehavior = initHeaderBehavior;
    window.initScrollAnimations = initScrollAnimations;
    window.initSmoothScrolling = initSmoothScrolling;
    window.initScrollLineEffect = initScrollLineEffect;
    window.initConnectionLine = initConnectionLine;
    
    // Inicializa funcionalidades legadas se necessário
    if (typeof gtag !== 'undefined') {
        // console.log('🔍 Google Analytics detectado');
    }
    
    if (typeof fbq !== 'undefined') {
        // console.log('📘 Facebook Pixel detectado');
    }
}

/**
 * Controla o loading screen (mantém funcionalidade original)
 */
function initLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    const mainContent = document.getElementById('main-content');
    const progressFill = document.getElementById('progress-fill');
    const progressPercentage = document.getElementById('progress-percentage');
    
    if (!loadingScreen || !mainContent || !progressFill || !progressPercentage) {
        // console.warn('❌ Elementos de loading não encontrados');
        return;
    }
    
    // console.log('🔄 Iniciando loading screen (modo compatibilidade)...');
    
    // A nova arquitetura já cuida disso, mas mantém para compatibilidade
    if (app.isInitialized) {
        // console.log('✅ Loading já gerenciado pela nova arquitetura');
        return;
    }
    
    // Implementação legada como fallback
    legacyLoadingImplementation();
}

/**
 * Implementação legada do loading
 */
function legacyLoadingImplementation() {
    const loadingScreen = document.getElementById('loading-screen');
    const mainContent = document.getElementById('main-content');
    const progressFill = document.getElementById('progress-fill');
    const progressPercentage = document.getElementById('progress-percentage');
    
    let progress = 0;
    let resourcesLoaded = 0;
    
    const totalResources = 4;
    
    function updateProgress() {
        resourcesLoaded++;
        progress = Math.min((resourcesLoaded / totalResources) * 100, 100);
        
        progressFill.style.width = `${progress}%`;
        progressPercentage.textContent = `${Math.round(progress)}%`;
        
        if (progress >= 100) {
            setTimeout(() => {
                loadingScreen.style.opacity = '0';
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                    mainContent.style.display = 'block';
                    mainContent.classList.add('fade-in');
                }, 500);
            }, 500);
        }
    }
    
    // Simula carregamento
    const interval = setInterval(() => {
        if (resourcesLoaded < totalResources) {
            updateProgress();
        } else {
            clearInterval(interval);
        }
    }, 500);
}

/**
 * Comportamento do header (mantém funcionalidade original)
 */
function initHeaderBehavior() {
    const header = document.getElementById('header');
    
    if (!header) {
        // console.warn('❌ Header não encontrado');
        return;
    }
    
    // A nova arquitetura já cuida disso
    if (app.landingPage && app.landingPage.components.header) {
        // console.log('✅ Header já gerenciado pela nova arquitetura');
        return;
    }
    
    // Implementação legada como fallback
    legacyHeaderImplementation();
}

/**
 * Implementação legada do header
 */
function legacyHeaderImplementation() {
    const header = document.getElementById('header');
    let lastScrollY = 0;
    
    function handleScroll() {
        const scrollY = window.pageYOffset;
        const threshold = CONFIG.headerShowThreshold;
        
        if (scrollY > threshold) {
            header.classList.add('visible');
        } else {
            header.classList.remove('visible');
        }
        
        if (scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScrollY = scrollY;
    }
    
    window.addEventListener('scroll', handleScroll);
    handleScroll();
}

/**
 * Animações de scroll (mantém funcionalidade original)
 */
function initScrollAnimations() {
    // A nova arquitetura já cuida disso
    if (app.landingPage && app.landingPage.components.scrollAnimations) {
        // console.log('✅ Animações já gerenciadas pela nova arquitetura');
        return;
    }
    
    // Implementação legada como fallback
    legacyScrollAnimationsImplementation();
}

/**
 * Implementação legada das animações
 */
function legacyScrollAnimationsImplementation() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, {
        rootMargin: '0px 0px -50px 0px',
        threshold: 0.1
    });
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

/**
 * Smooth scrolling (mantém funcionalidade original)
 */
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
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
 * Efeito da linha de scroll (mantém funcionalidade original)
 */
function initScrollLineEffect() {
    const connectionLine = document.querySelector('.connection-line');
    
    if (!connectionLine) {
        // console.warn('❌ Linha de conexão não encontrada');
        return;
    }
    
    function updateConnectionLine() {
        const scrollProgress = window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight);
        const lineHeight = Math.min(scrollProgress * 100, 100);
        
        connectionLine.style.height = `${lineHeight}%`;
    }
    
    window.addEventListener('scroll', updateConnectionLine);
    updateConnectionLine();
}

/**
 * Inicializa linha de conexão (mantém funcionalidade original)
 */
function initConnectionLine() {
    initScrollLineEffect();
}

/**
 * Função principal de inicialização
 */
async function init() {
    // console.log('🚀 Inicializando aplicação (modo híbrido)...');
    
    try {
        // Inicializa arquitetura limpa
        if (app && !app.isInitialized) {
            // console.log('🏗️ Inicializando nova arquitetura...');
            await app.init();
        }
        
        // Inicializa compatibilidade legada
        initLegacyCompatibility();
        
        // Aguarda um pouco para garantir que tudo está carregado
        setTimeout(() => {
            // Inicializa funcionalidades legadas apenas se necessário
            if (!app.isInitialized) {
                // console.log('⚠️ Fallback para implementação legada');
                initLoadingScreen();
                initHeaderBehavior();
                initScrollAnimations();
                initSmoothScrolling();
                initScrollLineEffect();
            }
        }, 100);
        
        // console.log('✅ Aplicação inicializada com sucesso!');
        
    } catch (error) {
        // console.error('❌ Erro na inicialização:', error);
        
        // Fallback completo para implementação legada
        // console.log('🔄 Executando fallback completo...');
        initLoadingScreen();
        initHeaderBehavior();
        initScrollAnimations();
        initSmoothScrolling();
        initScrollLineEffect();
    }
}

// Inicialização
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// Expõe funções globalmente para compatibilidade
window.initLoadingScreen = initLoadingScreen;
window.initHeaderBehavior = initHeaderBehavior;
window.initScrollAnimations = initScrollAnimations;
window.initSmoothScrolling = initSmoothScrolling;
window.initScrollLineEffect = initScrollLineEffect;
window.initConnectionLine = initConnectionLine;

/**
 * ============================
 * CINEMATIC EFFECTS JAVASCRIPT
 * Magic UI Components Integration
 * ============================
 */

// Magic Card Mouse Tracking
function initMagicCards() {
    const magicCards = document.querySelectorAll('.magic-card');
    
    magicCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            
            card.style.setProperty('--mouse-x', `${x}%`);
            card.style.setProperty('--mouse-y', `${y}%`);
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.setProperty('--mouse-x', '50%');
            card.style.setProperty('--mouse-y', '50%');
        });
    });
}

// Number Ticker Animation
function initNumberTickers() {
    const tickers = document.querySelectorAll('.number-ticker');
    
    tickers.forEach(ticker => {
        const targetValue = parseInt(ticker.dataset.value);
        const duration = 2000; // 2 seconds
        const startTime = performance.now();
        
        function updateNumber(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function for smooth animation
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const currentValue = Math.floor(easeOutQuart * targetValue);
            
            // Format number based on original text
            if (ticker.parentElement.textContent.includes('%')) {
                ticker.textContent = currentValue + '%';
            } else if (ticker.parentElement.textContent.includes('x')) {
                ticker.textContent = currentValue + 'x';
            } else {
                ticker.textContent = currentValue + '+';
            }
            
            if (progress < 1) {
                requestAnimationFrame(updateNumber);
            }
        }
        
        // Start animation when element comes into view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    requestAnimationFrame(updateNumber);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(ticker);
    });
}

// Particles Background Effect
function initParticlesBackground() {
    const particlesContainers = document.querySelectorAll('.particles-container');
    
    particlesContainers.forEach(container => {
        const canvas = container.querySelector('.particles-canvas');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        let particles = [];
        
        // Set canvas size
        function resizeCanvas() {
            canvas.width = container.offsetWidth;
            canvas.height = container.offsetHeight;
        }
        
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
        
        // Particle class
        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.vx = (Math.random() - 0.5) * 2;
                this.vy = (Math.random() - 0.5) * 2;
                this.size = Math.random() * 3 + 1;
                this.opacity = Math.random() * 0.5 + 0.3;
            }
            
            update() {
                this.x += this.vx;
                this.y += this.vy;
                
                // Wrap around edges
                if (this.x < 0) this.x = canvas.width;
                if (this.x > canvas.width) this.x = 0;
                if (this.y < 0) this.y = canvas.height;
                if (this.y > canvas.height) this.y = 0;
            }
            
            draw() {
                ctx.save();
                ctx.globalAlpha = this.opacity;
                ctx.fillStyle = '#1E90FF';
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
                
                // Add glow effect
                ctx.shadowBlur = 20;
                ctx.shadowColor = '#1E90FF';
                ctx.fill();
                ctx.restore();
            }
        }
        
        // Create particles
        for (let i = 0; i < 50; i++) {
            particles.push(new Particle());
        }
        
        // Animation loop
        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            particles.forEach(particle => {
                particle.update();
                particle.draw();
            });
            
            requestAnimationFrame(animate);
        }
        
        animate();
    });
}

// Flickering Grid Effect
function initFlickeringGrid() {
    const flickeringGrids = document.querySelectorAll('.flickering-grid');
    
    flickeringGrids.forEach(canvas => {
        const ctx = canvas.getContext('2d');
        const container = canvas.parentElement;
        
        function resizeCanvas() {
            canvas.width = container.offsetWidth;
            canvas.height = container.offsetHeight;
        }
        
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
        
        const squareSize = 4;
        const gridGap = 6;
        const flickerChance = 0.3;
        const maxOpacity = 0.3;
        
        let squares = [];
        
        function initSquares() {
            squares = [];
            const cols = Math.floor(canvas.width / (squareSize + gridGap));
            const rows = Math.floor(canvas.height / (squareSize + gridGap));
            
            for (let i = 0; i < cols * rows; i++) {
                squares.push(Math.random() * maxOpacity);
            }
        }
        
        function updateSquares() {
            for (let i = 0; i < squares.length; i++) {
                if (Math.random() < flickerChance * 0.016) { // 60fps approximation
                    squares[i] = Math.random() * maxOpacity;
                }
            }
        }
        
        function drawGrid() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            const cols = Math.floor(canvas.width / (squareSize + gridGap));
            const rows = Math.floor(canvas.height / (squareSize + gridGap));
            
            for (let i = 0; i < cols; i++) {
                for (let j = 0; j < rows; j++) {
                    const index = i * rows + j;
                    const opacity = squares[index] || 0;
                    
                    ctx.fillStyle = `rgba(30, 144, 255, ${opacity})`;
                    ctx.fillRect(
                        i * (squareSize + gridGap),
                        j * (squareSize + gridGap),
                        squareSize,
                        squareSize
                    );
                }
            }
        }
        
        initSquares();
        
        function animate() {
            updateSquares();
            drawGrid();
            requestAnimationFrame(animate);
        }
        
        animate();
    });
}

// Morphing Text Effect
function initMorphingText() {
    const morphingTexts = document.querySelectorAll('.morphing-text');
    
    morphingTexts.forEach(element => {
        const texts = ['com IA Avançada', 'com Automação', 'com Inovação', 'com Tecnologia'];
        let currentIndex = 0;
        
        function morphText() {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                currentIndex = (currentIndex + 1) % texts.length;
                element.textContent = texts[currentIndex];
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, 300);
        }
        
        // Change text every 3 seconds
        setInterval(morphText, 3000);
    });
}

// Hyper Text Scrambling Effect
function initHyperText() {
    const hyperTexts = document.querySelectorAll('.hyper-text');
    
    hyperTexts.forEach(element => {
        const originalText = element.textContent;
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let isAnimating = false;
        
        function scrambleText() {
            if (isAnimating) return;
            isAnimating = true;
            
            let iterations = 0;
            const interval = setInterval(() => {
                element.textContent = originalText
                    .split('')
                    .map((char, index) => {
                        if (char === ' ') return ' ';
                        if (index < iterations) return originalText[index];
                        return chars[Math.floor(Math.random() * chars.length)];
                    })
                    .join('');
                
                iterations += 1 / 3;
                
                if (iterations >= originalText.length) {
                    clearInterval(interval);
                    element.textContent = originalText;
                    isAnimating = false;
                }
            }, 30);
        }
        
        // Trigger animation on hover
        element.addEventListener('mouseenter', scrambleText);
        
        // Trigger animation when element comes into view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(scrambleText, Math.random() * 1000);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(element);
    });
}

// Initialize all cinematic effects
function initCinematicEffects() {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (!prefersReducedMotion) {
        initMagicCards();
        initParticlesBackground();
        initFlickeringGrid();
        initMorphingText();
        initHyperText();
    }
    
    // Always initialize number tickers (low motion impact)
    initNumberTickers();
}

// Initialize cinematic effects when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCinematicEffects);
} else {
    initCinematicEffects();
}

// Export for external use
window.cinematicEffects = {
    initMagicCards,
    initNumberTickers,
    initParticlesBackground,
    initFlickeringGrid,
    initMorphingText,
    initHyperText,
    initCinematicEffects
};

// ============================
// SCRATCH-TO-REVEAL FUNCTIONALITY
// ============================

class ScratchReveal {
    constructor() {
        this.scratches = new Map();
        this.isScratching = false;
        this.scratchThreshold = 30; // Percentage of area to reveal
        this.init();
    }

    init() {
        this.setupScratchCards();
        this.bindEvents();
    }

    setupScratchCards() {
        const scratchCards = document.querySelectorAll('.service-card-scratch');
        
        scratchCards.forEach((card, index) => {
            const canvas = card.querySelector('.scratch-canvas');
            const surface = card.querySelector('.scratch-surface');
            
            if (canvas && surface) {
                this.initializeCanvas(canvas, surface, index);
            }
        });
    }

    initializeCanvas(canvas, surface, index) {
        const ctx = canvas.getContext('2d');
        const rect = canvas.getBoundingClientRect();
        
        // Set canvas size
        canvas.width = rect.width;
        canvas.height = rect.height;
        
        // Fill canvas with scratch surface
        ctx.globalCompositeOperation = 'source-over';
        ctx.fillStyle = 'rgba(255, 255, 255, 1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Store scratch data
        this.scratches.set(canvas, {
            ctx,
            surface,
            card: surface.closest('.service-card-scratch'),
            isRevealed: false,
            scratchedPixels: 0,
            totalPixels: canvas.width * canvas.height
        });
    }

    bindEvents() {
        document.addEventListener('mousedown', this.handleStart.bind(this));
        document.addEventListener('mousemove', this.handleMove.bind(this));
        document.addEventListener('mouseup', this.handleEnd.bind(this));
        
        // Touch events for mobile
        document.addEventListener('touchstart', this.handleStart.bind(this));
        document.addEventListener('touchmove', this.handleMove.bind(this));
        document.addEventListener('touchend', this.handleEnd.bind(this));
        
        // Prevent scrolling during scratch
        document.addEventListener('touchmove', (e) => {
            if (this.isScratching) {
                e.preventDefault();
            }
        }, { passive: false });
    }

    handleStart(e) {
        const canvas = this.getCanvasFromEvent(e);
        if (canvas) {
            this.isScratching = true;
            const scratchData = this.scratches.get(canvas);
            if (scratchData && !scratchData.isRevealed) {
                this.scratch(canvas, e);
            }
        }
    }

    handleMove(e) {
        if (this.isScratching) {
            const canvas = this.getCanvasFromEvent(e);
            if (canvas) {
                this.scratch(canvas, e);
            }
        }
    }

    handleEnd(e) {
        this.isScratching = false;
    }

    getCanvasFromEvent(e) {
        const target = e.target || e.touches?.[0]?.target;
        return target?.classList.contains('scratch-canvas') ? target : null;
    }

    scratch(canvas, e) {
        const scratchData = this.scratches.get(canvas);
        if (!scratchData || scratchData.isRevealed) return;

        const rect = canvas.getBoundingClientRect();
        const clientX = e.clientX || e.touches?.[0]?.clientX;
        const clientY = e.clientY || e.touches?.[0]?.clientY;
        
        const x = clientX - rect.left;
        const y = clientY - rect.top;

        // Create scratch effect
        scratchData.ctx.globalCompositeOperation = 'destination-out';
        scratchData.ctx.beginPath();
        scratchData.ctx.arc(x, y, 20, 0, 2 * Math.PI);
        scratchData.ctx.fill();

        // Check if enough area is scratched
        this.checkRevealThreshold(canvas);
    }

    checkRevealThreshold(canvas) {
        const scratchData = this.scratches.get(canvas);
        if (!scratchData || scratchData.isRevealed) return;

        const imageData = scratchData.ctx.getImageData(0, 0, canvas.width, canvas.height);
        const pixels = imageData.data;
        let transparentPixels = 0;

        // Count transparent pixels
        for (let i = 3; i < pixels.length; i += 4) {
            if (pixels[i] === 0) {
                transparentPixels++;
            }
        }

        const scratchPercent = (transparentPixels / scratchData.totalPixels) * 100;

        // Reveal if threshold reached
        if (scratchPercent >= this.scratchThreshold) {
            this.revealCard(scratchData);
        }
    }

    revealCard(scratchData) {
        scratchData.isRevealed = true;
        scratchData.surface.classList.add('revealed');
        scratchData.card.classList.add('revealed');

        // Add celebration effect
        this.addRevealEffect(scratchData.card);

        // Analytics
        this.trackScratchReveal(scratchData.card);
    }

    addRevealEffect(card) {
        // Create sparkle effect
        for (let i = 0; i < 15; i++) {
            setTimeout(() => {
                this.createSparkle(card);
            }, i * 50);
        }

        // Add glow effect
        card.style.boxShadow = '0 0 30px rgba(30, 144, 255, 0.6)';
        setTimeout(() => {
            card.style.boxShadow = '';
        }, 2000);
    }

    createSparkle(card) {
        const sparkle = document.createElement('div');
        sparkle.className = 'scratch-sparkle';
        sparkle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: #FFD700;
            border-radius: 50%;
            pointer-events: none;
            z-index: 1000;
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
            animation: sparkle-animation 1s ease-out forwards;
        `;

        card.appendChild(sparkle);

        // Remove sparkle after animation
        setTimeout(() => {
            sparkle.remove();
        }, 1000);
    }

    trackScratchReveal(card) {
        const serviceType = card.querySelector('.scratch-canvas').dataset.service;
        
        // Track with analytics
        if (window.gtag) {
            gtag('event', 'scratch_reveal', {
                'event_category': 'engagement',
                'event_label': `service_${serviceType}`,
                'value': 1
            });
        }

        // Track with custom analytics
        if (window.trackEvent) {
            trackEvent('Service Revealed', {
                service: serviceType,
                method: 'scratch'
            });
        }
    }

    // Public method to reveal all cards (for testing or accessibility)
    revealAll() {
        this.scratches.forEach((scratchData) => {
            if (!scratchData.isRevealed) {
                this.revealCard(scratchData);
            }
        });
    }

    // Public method to reset all cards
    resetAll() {
        this.scratches.forEach((scratchData, canvas) => {
            scratchData.isRevealed = false;
            scratchData.surface.classList.remove('revealed');
            scratchData.card.classList.remove('revealed');
            
            // Reset canvas
            scratchData.ctx.globalCompositeOperation = 'source-over';
            scratchData.ctx.fillStyle = 'rgba(255, 255, 255, 1)';
            scratchData.ctx.fillRect(0, 0, canvas.width, canvas.height);
        });
    }
}

// Add sparkle animation CSS
const sparkleStyles = document.createElement('style');
sparkleStyles.textContent = `
    @keyframes sparkle-animation {
        0% {
            opacity: 1;
            transform: scale(0) rotate(0deg);
        }
        50% {
            opacity: 1;
            transform: scale(1) rotate(180deg);
        }
        100% {
            opacity: 0;
            transform: scale(0) rotate(360deg);
        }
    }
`;
document.head.appendChild(sparkleStyles);

// Initialize scratch reveal when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.scratchReveal = new ScratchReveal();
});

// Resize handler to update canvas sizes
window.addEventListener('resize', debounce(() => {
    if (window.scratchReveal) {
        window.scratchReveal.setupScratchCards();
    }
}, 250));

// ============================
// MOBILE SLIDESHOW FUNCTIONALITY
// ============================

class MobileSlideshow {
    constructor(containerId, options = {}) {
        this.container = document.getElementById(containerId);
        if (!this.container) return;
        
        this.wrapper = this.container.querySelector('.services-grid-wrapper');
        this.cards = this.container.querySelectorAll('.service-card');
        this.currentSlide = 0;
        this.totalSlides = this.cards.length;
        this.autoPlayInterval = options.autoPlay || 5000;
        this.autoPlayTimer = null;
        this.progressTimer = null;
        
        // Navigation elements
        this.prevBtn = document.getElementById(`${containerId.replace('-slideshow', '')}-prev`);
        this.nextBtn = document.getElementById(`${containerId.replace('-slideshow', '')}-next`);
        this.currentSpan = document.getElementById(`${containerId.replace('-slideshow', '')}-current`);
        this.totalSpan = document.getElementById(`${containerId.replace('-slideshow', '')}-total`);
        this.indicators = document.getElementById(`${containerId.replace('-slideshow', '')}-indicators`);
        this.progressBar = document.getElementById(`${containerId.replace('-slideshow', '')}-progress`);
        
        this.init();
    }
    
    init() {
        if (window.innerWidth <= 768) {
            this.setupSlideshow();
            this.bindEvents();
            this.startAutoPlay();
        }
        
        // Listen for resize events
        window.addEventListener('resize', this.handleResize.bind(this));
    }
    
    setupSlideshow() {
        // Update total count
        if (this.totalSpan) {
            this.totalSpan.textContent = this.totalSlides;
        }
        
        // Setup indicators
        if (this.indicators) {
            this.indicators.innerHTML = '';
            for (let i = 0; i < this.totalSlides; i++) {
                const dot = document.createElement('span');
                dot.className = i === 0 ? 'slideshow-dot active' : 'slideshow-dot';
                dot.dataset.slide = i;
                dot.addEventListener('click', () => this.goToSlide(i));
                this.indicators.appendChild(dot);
            }
        }
        
        this.updateSlideshow();
    }
    
    bindEvents() {
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => this.prevSlide());
        }
        
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => this.nextSlide());
        }
        
        // Touch events for swipe
        this.setupTouchEvents();
        
        // Pause auto-play on hover
        this.container.addEventListener('mouseenter', () => this.pauseAutoPlay());
        this.container.addEventListener('mouseleave', () => this.startAutoPlay());
    }
    
    setupTouchEvents() {
        let startX = 0;
        let currentX = 0;
        let isDragging = false;
        
        this.wrapper.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            isDragging = true;
            this.pauseAutoPlay();
        });
        
        this.wrapper.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            currentX = e.touches[0].clientX;
            const diffX = startX - currentX;
            
            // Prevent default scroll behavior
            if (Math.abs(diffX) > 10) {
                e.preventDefault();
            }
        });
        
        this.wrapper.addEventListener('touchend', (e) => {
            if (!isDragging) return;
            isDragging = false;
            
            const diffX = startX - currentX;
            const threshold = 50;
            
            if (Math.abs(diffX) > threshold) {
                if (diffX > 0) {
                    this.nextSlide();
                } else {
                    this.prevSlide();
                }
            }
            
            this.startAutoPlay();
        });
    }
    
    prevSlide() {
        this.currentSlide = this.currentSlide > 0 ? this.currentSlide - 1 : this.totalSlides - 1;
        this.updateSlideshow();
        this.resetAutoPlay();
    }
    
    nextSlide() {
        this.currentSlide = this.currentSlide < this.totalSlides - 1 ? this.currentSlide + 1 : 0;
        this.updateSlideshow();
        this.resetAutoPlay();
    }
    
    goToSlide(index) {
        this.currentSlide = index;
        this.updateSlideshow();
        this.resetAutoPlay();
    }
    
    updateSlideshow() {
        if (window.innerWidth > 768) return;
        
        // Calculate transform
        const cardWidth = 280 + 16; // card width + margin
        const translateX = -this.currentSlide * cardWidth;
        
        if (this.wrapper) {
            this.wrapper.style.transform = `translateX(${translateX}px)`;
        }
        
        // Update counter
        if (this.currentSpan) {
            this.currentSpan.textContent = this.currentSlide + 1;
        }
        
        // Update indicators
        if (this.indicators) {
            const dots = this.indicators.querySelectorAll('.slideshow-dot');
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === this.currentSlide);
            });
        }
        
        // Update navigation buttons
        if (this.prevBtn) {
            this.prevBtn.disabled = false; // Always enabled for circular navigation
        }
        if (this.nextBtn) {
            this.nextBtn.disabled = false; // Always enabled for circular navigation
        }
        
        // Add slide-in animation to current card
        this.cards.forEach((card, index) => {
            if (index === this.currentSlide) {
                card.classList.add('slide-in');
                setTimeout(() => card.classList.remove('slide-in'), 500);
            }
        });
    }
    
    startAutoPlay() {
        if (window.innerWidth > 768) return;
        
        this.pauseAutoPlay();
        this.startProgressAnimation();
        
        this.autoPlayTimer = setTimeout(() => {
            this.nextSlide();
        }, this.autoPlayInterval);
    }
    
    pauseAutoPlay() {
        if (this.autoPlayTimer) {
            clearTimeout(this.autoPlayTimer);
            this.autoPlayTimer = null;
        }
        this.pauseProgressAnimation();
    }
    
    resetAutoPlay() {
        this.pauseAutoPlay();
        this.startAutoPlay();
    }
    
    startProgressAnimation() {
        if (!this.progressBar) return;
        
        this.progressBar.style.width = '0%';
        this.progressBar.style.transition = 'none';
        
        setTimeout(() => {
            this.progressBar.style.transition = `width ${this.autoPlayInterval}ms linear`;
            this.progressBar.style.width = '100%';
        }, 10);
    }
    
    pauseProgressAnimation() {
        if (this.progressBar) {
            this.progressBar.style.transition = 'none';
            this.progressBar.style.width = '0%';
        }
    }
    
    handleResize() {
        if (window.innerWidth <= 768) {
            if (!this.container.querySelector('.slideshow-nav')) {
                this.setupSlideshow();
                this.bindEvents();
            }
            this.updateSlideshow();
            this.startAutoPlay();
        } else {
            this.pauseAutoPlay();
            if (this.wrapper) {
                this.wrapper.style.transform = 'translateX(0)';
            }
        }
    }
    
    destroy() {
        this.pauseAutoPlay();
        window.removeEventListener('resize', this.handleResize.bind(this));
    }
}

// Initialize slideshows when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Initialize slideshows for different sections - DISABLED FOR MARQUEE SYSTEM
    // const slideshows = [];
    
    // if (document.getElementById('services-slideshow')) {
    //     slideshows.push(new MobileSlideshow('services-slideshow', { autoPlay: 6000 }));
    // }
    
    // if (document.getElementById('benefits-slideshow')) {
    //     slideshows.push(new MobileSlideshow('benefits-slideshow', { autoPlay: 5000 }));
    // }
    
    // if (document.getElementById('cases-slideshow')) {
    //     slideshows.push(new MobileSlideshow('cases-slideshow', { autoPlay: 7000 }));
    // }
    
    // Store instances globally for cleanup if needed
    // window.mobileSlideshows = slideshows;
});

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
    // if (window.mobileSlideshows) {
    //     window.mobileSlideshows.forEach(slideshow => slideshow.destroy());
    // }
});

// console.log('📦 Main.js componentizado carregado');
