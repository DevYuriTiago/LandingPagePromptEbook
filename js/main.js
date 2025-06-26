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
 * Inicializa cursor personalizado com rastro
 */
function initCustomCursor() {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);
    
    const trails = [];
    const maxTrails = 8;
    
    // Cria elementos de rastro
    for (let i = 0; i < maxTrails; i++) {
        const trail = document.createElement('div');
        trail.className = 'cursor-trail';
        trail.style.opacity = (maxTrails - i) / maxTrails * 0.6;
        trail.style.transform = `scale(${(maxTrails - i) / maxTrails})`;
        document.body.appendChild(trail);
        trails.push({ element: trail, x: 0, y: 0 });
    }
    
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    
    // Atualiza posição do mouse
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    // Anima cursor e rastro
    function animateCursor() {
        // Interpolação mais rápida para o cursor principal
        cursorX += (mouseX - cursorX) * 0.25;
        cursorY += (mouseY - cursorY) * 0.25;
        
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        
        // Atualiza rastro com velocidade ajustada
        trails.forEach((trail, index) => {
            const previousTrail = index === 0 ? { x: cursorX, y: cursorY } : trails[index - 1];
            
            trail.x += (previousTrail.x - trail.x) * 0.15;
            trail.y += (previousTrail.y - trail.y) * 0.15;
            
            trail.element.style.left = trail.x + 'px';
            trail.element.style.top = trail.y + 'px';
        });
        
        requestAnimationFrame(animateCursor);
    }
    
    animateCursor();
    
    // Efeitos hover
    document.addEventListener('mouseenter', (e) => {
        if (e.target.matches('a, button, input, textarea, select, [role="button"]')) {
            cursor.classList.add('hover');
        }
    }, true);
    
    document.addEventListener('mouseleave', (e) => {
        if (e.target.matches('a, button, input, textarea, select, [role="button"]')) {
            cursor.classList.remove('hover');
        }
    }, true);
    
    // Efeito click
    document.addEventListener('mousedown', () => {
        cursor.classList.add('click');
    });
    
    document.addEventListener('mouseup', () => {
        cursor.classList.remove('click');
    });
    
    // Esconde cursor quando sai da janela
    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
        trails.forEach(trail => trail.element.style.opacity = '0');
    });
    
    document.addEventListener('mouseenter', () => {
        cursor.style.opacity = '1';
        trails.forEach((trail, index) => {
            trail.element.style.opacity = (maxTrails - index) / maxTrails * 0.6;
        });
    });
}

/**
 * Inicializa linha de guia com ângulos de 90° e efeito parallax
 */
function initConnectionLine() {
    const connectionLine = document.querySelector('.connection-line');
    if (!connectionLine) {
        console.warn('❌ Elemento .connection-line não encontrado');
        return;
    }
    
    console.log('✅ Inicializando linha de guia parallax...');
    
    // Cria o SVG com gradiente e path
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', '100%');
    svg.setAttribute('preserveAspectRatio', 'none');
    
    // Função para ajustar altura do SVG dinamicamente
    function adjustSVGHeight() {
        const documentHeight = document.documentElement.scrollHeight;
        svg.setAttribute('height', `${documentHeight}px`);
        console.log('📏 SVG altura ajustada para:', documentHeight);
    }
    
    adjustSVGHeight(); // Ajusta inicialmente
    
    // Define gradiente
    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    const gradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
    gradient.id = 'lineGradient';
    gradient.setAttribute('x1', '0%');
    gradient.setAttribute('y1', '0%');
    gradient.setAttribute('x2', '0%');
    gradient.setAttribute('y2', '100%');
    
    const stop1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
    stop1.setAttribute('offset', '0%');
    stop1.setAttribute('stop-color', '#1E90FF');
    stop1.setAttribute('stop-opacity', '0.9');
    
    const stop2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
    stop2.setAttribute('offset', '100%');
    stop2.setAttribute('stop-color', '#00BFFF');
    stop2.setAttribute('stop-opacity', '0.6');
    
    gradient.appendChild(stop1);
    gradient.appendChild(stop2);
    defs.appendChild(gradient);
    svg.appendChild(defs);
    
    // Cria o path principal com ângulos de 90°
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.classList.add('main-path');
    path.setAttribute('stroke', 'url(#lineGradient)');
    path.setAttribute('fill', 'none');

    // Função para gerar path RETANGULAR com padrão ordenado
    function generatePath() {
        const viewportWidth = window.innerWidth;
        const centerX = viewportWidth / 2;
        const documentHeight = document.documentElement.scrollHeight;
        
        // Começa bem no topo
        const arrowStartY = 0;
        
        // Espaçamento MUITO maior entre segmentos para animação MUITO LENTA
        const segmentHeight = 500; // Aumentado para 500px - mais lento ainda
        const numSegments = Math.floor((documentHeight - arrowStartY) / segmentHeight);
        
        // Progressão gradual da largura: cresce 6% a cada 3 segmentos (mais gradual)
        function getWidth(segmentIndex) {
            const progressStep = Math.floor(segmentIndex / 3); // A cada 3 segmentos aumenta
            const widthPercent = Math.min(0.06 + (progressStep * 0.06), 0.35); // 6% até 35%
            return widthPercent;
        }
        
        // Constrói path RETANGULAR: Centro → Desce → Lado → Desce → Centro → Desce...
        let pathData = `M ${centerX} ${arrowStartY}`;
        let currentY = arrowStartY;
        let goingRight = true; // Começa indo para direita
        
        for (let i = 0; i < numSegments; i++) {
            const currentWidth = getWidth(i);
            const leftX = centerX - (viewportWidth * currentWidth);
            const rightX = centerX + (viewportWidth * currentWidth);
            
            // 1. DESCE verticalmente do centro
            currentY += segmentHeight * 0.2; // Primeiro, desce 40% do segmento
            pathData += ` L ${centerX} ${currentY}`;
            
            // 2. VAI PARA O LADO horizontalmente (90°)
            const targetX = goingRight ? rightX : leftX;
            pathData += ` L ${targetX} ${currentY}`;
            
            // 3. DESCE verticalmente no lado
            currentY += segmentHeight * 0.1; // Desce mais 10%
            pathData += ` L ${targetX} ${currentY}`;
            
            // 4. VOLTA PARA O CENTRO horizontalmente (90°) - RETANGULAR!
            pathData += ` L ${centerX} ${currentY}`;
            
            // 5. Pequeno espaço vertical antes da próxima curva
            currentY += segmentHeight * 0.2; // Restantes 20%
            pathData += ` L ${centerX} ${currentY}`;
            
            // Alterna direção para próxima iteração
            goingRight = !goingRight;
        }
        
        // Finaliza no final da página
        pathData += ` L ${centerX} ${documentHeight - 50}`;
        
        path.setAttribute('d', pathData);
        console.log('📐 Path RETANGULAR LENTO criado:', { numSegments, segmentHeight: segmentHeight + 'px', pattern: 'Centro→Desce→Lado→Desce→Centro' });
    }
    
    generatePath();
    svg.appendChild(path);
    connectionLine.appendChild(svg);
    
    // Remove classe debug
    connectionLine.classList.remove('debug');
    
    console.log('🎨 SVG e Path de guia criados:', { svg, path, pathLength: path.getTotalLength() });
    
    // Função de atualização com velocidade DRASTICAMENTE reduzida
    function updateLine() {
        const scrolled = window.pageYOffset;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const maxScroll = documentHeight - windowHeight;
        
        // Sempre visível
        connectionLine.classList.add('visible');
        
        // VELOCIDADE MUITO MAIS REDUZIDA: linha se desenha apenas 10% da velocidade do scroll
        const rawProgress = scrolled / maxScroll;
        const scrollProgress = Math.min(rawProgress * 0.1, 1); // Apenas 10% da velocidade! (era 20%)
        const pathLength = path.getTotalLength();
        const drawLength = pathLength * scrollProgress;
        
        // Anima apenas o desenho da linha (muito mais devagar)
        path.style.strokeDasharray = `${drawLength} ${pathLength}`;
        path.style.strokeDashoffset = '0';
        
        // Detecta seção atual
        const currentSectionInfo = getCurrentSection(rawProgress);
        
        console.log(`📍 ${currentSectionInfo.name} - Progresso: ${(rawProgress * 100).toFixed(1)}% - Linha: ${(scrollProgress * 100).toFixed(1)}%`);
        
        // Verifica proximidade da seção do ebook
        const ebookSection = document.querySelector('.ebook-bonus-section');
        if (ebookSection) {
            const ebookRect = ebookSection.getBoundingClientRect();
            const isNearEbook = ebookRect.top < windowHeight && ebookRect.bottom > 0;
            
            if (isNearEbook) {
                connectionLine.style.opacity = '0.2'; // Bem sutil perto do ebook
            } else {
                connectionLine.style.opacity = ''; // Opacidade normal
            }
        }
    }
    
    // Função para identificar seção atual baseada no scroll
    function getCurrentSection(scrollProgress) {
        if (scrollProgress < 0.2) return { section: 1, name: 'Hero', width: '20%' };
        if (scrollProgress < 0.4) return { section: 2, name: 'Serviços', width: '40%' };
        if (scrollProgress < 0.6) return { section: 3, name: 'Benefícios', width: '60%' };
        if (scrollProgress < 0.8) return { section: 4, name: 'Cases', width: '80%' };
        return { section: 5, name: 'Final', width: '100%' };
    }
    
    // Event listeners otimizados
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                updateLine();
                ticking = false;
            });
            ticking = true;
        }
    });
    
    // Regenera path em redimensionamento
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            adjustSVGHeight(); // Reajusta altura do SVG
            generatePath(); // Regenera o path
            updateLine(); // Atualiza a linha
        }, 250);
    });
    
    // Inicialização
    updateLine();
    console.log('✅ Linha de guia parallax criada com sucesso');
}

/**
 * Remove elementos antigos de curvas que possam estar interferindo
 */
function cleanupOldElements() {
    // Remove qualquer elemento de curva antiga
    const oldCurves = document.querySelectorAll('.line-curve, .curve-element, .connection-curve');
    oldCurves.forEach(element => element.remove());
    
    // Remove qualquer SVG antigo da linha de conexão
    const connectionLine = document.querySelector('.connection-line');
    if (connectionLine) {
        // Limpa conteúdo existente
        connectionLine.innerHTML = '';
    }
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
        cleanupOldElements(); // Limpa elementos antigos primeiro
        initCustomCursor();
        initHeaderControl();
        initScrollAnimations();
        initFormHandler();
        initSmoothScroll();
        initConnectionLine();
        
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
