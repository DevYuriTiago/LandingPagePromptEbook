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

// console.log('📦 Main.js componentizado carregado');
