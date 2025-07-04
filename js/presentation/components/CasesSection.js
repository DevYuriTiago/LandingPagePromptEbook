/**
 * @fileoverview Componente de Cases de Sucesso
 * Gerencia a exibição dos cases com design liquid glass
 */

import { BaseComponent } from './BaseComponent.js';
import { CONFIG } from '../../core/config.js';
import { utils } from '../../core/utils.js';

export class CasesSection extends BaseComponent {
    constructor(selector = CONFIG.SELECTORS.casesSection) {
        super(selector);
        this.cases = [];
        this.currentVideoId = null;
        this.isVideoPlaying = false;
    }

    /**
     * Inicializa o componente
     */
    async init() {
        try {
            console.log('🔍 Iniciando CasesSection...');
            
            // Verifica se o elemento existe
            this.element = document.querySelector(this.selector);
            console.log('🔍 Elemento encontrado:', this.element);
            
            if (!this.element) {
                console.warn(`❌ Elemento não encontrado: ${this.selector}`);
                return this;
            }

            console.log('🔍 Carregando cases...');
            this.loadCases();
            
            console.log('🔍 Renderizando...');
            this.render();
            
            console.log('🔍 Configurando event listeners...');
            this.setupEventListeners();
            
            console.log('🔍 Configurando animações...');
            this.setupAnimations();
            
            console.log('✅ CasesSection inicializada com sucesso');
            
        } catch (error) {
            console.error(`❌ Erro ao inicializar CasesSection: ${error.message}`, error);
        }
        
        return this;
    }

    /**
     * Carrega os dados dos cases
     */
    loadCases() {
        this.cases = [
            {
                id: 'case1',
                title: 'Automação E-commerce',
                company: 'TechStore Brasil',
                challenge: 'Reduzir tempo de atendimento e aumentar conversões',
                solution: 'Chatbot inteligente + Automação de vendas',
                results: ['300% ROI', '70% redução no tempo de resposta', '45% aumento nas vendas'],
                videoId: 'dQw4w9WgXcQ', // Exemplo
                category: 'E-commerce'
            },
            {
                id: 'case2',
                title: 'IA para Recursos Humanos',
                company: 'Inovação RH',
                challenge: 'Triagem eficiente de currículos e candidatos',
                solution: 'Sistema de IA para análise de perfis',
                results: ['80% redução no tempo de triagem', '95% precisão na seleção', '60% economia de custos'],
                videoId: 'dQw4w9WgXcQ', // Exemplo
                category: 'Recursos Humanos'
            },
            {
                id: 'case3',
                title: 'Análise Preditiva Financeira',
                company: 'FinTech Solutions',
                challenge: 'Prever inadimplência e otimizar crédito',
                solution: 'Machine Learning para análise de risco',
                results: ['40% redução na inadimplência', '25% aumento na aprovação', '200% ROI'],
                videoId: 'dQw4w9WgXcQ', // Exemplo
                category: 'Financeiro'
            }
        ];
    }

    /**
     * Renderiza o componente
     */
    render() {
        console.log('🔍 Renderizando CasesSection...');
        console.log('🔍 Element:', this.element);
        
        if (!this.element) {
            console.warn('❌ Elemento não encontrado para renderização');
            return;
        }

        const html = `
            <div class="cases-container">
                <div class="cases-header">
                    <h2 class="cases-title animate-on-scroll">
                        <span class="title-main">Cases de Sucesso</span>
                        <span class="title-subtitle">Transformações reais com resultados comprovados</span>
                    </h2>
                </div>
                
                <div class="cases-grid">
                    ${this.renderCases()}
                </div>
                
                <div class="cases-stats animate-on-scroll">
                    <div class="stat-item">
                        <div class="stat-number" data-count="50">0</div>
                        <div class="stat-label">Projetos Entregues</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-number" data-count="95">0</div>
                        <div class="stat-label">% Taxa de Sucesso</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-number" data-count="300">0</div>
                        <div class="stat-label">% ROI Médio</div>
                    </div>
                </div>
            </div>
        `;

        this.element.innerHTML = html;
        console.log('✅ CasesSection renderizada com sucesso');
    }

    /**
     * Renderiza os cases individuais
     */
    renderCases() {
        return this.cases.map(caseItem => `
            <div class="case-card glass-card animate-on-scroll" data-case-id="${caseItem.id}">
                <div class="case-header">
                    <div class="case-category">${caseItem.category}</div>
                    <h3 class="case-title">${caseItem.title}</h3>
                    <div class="case-company">${caseItem.company}</div>
                </div>
                
                <div class="case-content">
                    <div class="case-video-container">
                        <div class="video-placeholder" data-video-id="${caseItem.videoId}">
                            <div class="video-overlay">
                                <button class="play-button">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M8 5v14l11-7z"/>
                                    </svg>
                                </button>
                            </div>
                            <div class="video-bg"></div>
                        </div>
                    </div>
                    
                    <div class="case-details">
                        <div class="case-challenge">
                            <h4>Desafio</h4>
                            <p>${caseItem.challenge}</p>
                        </div>
                        
                        <div class="case-solution">
                            <h4>Solução</h4>
                            <p>${caseItem.solution}</p>
                        </div>
                        
                        <div class="case-results">
                            <h4>Resultados</h4>
                            <ul class="results-list">
                                ${caseItem.results.map(result => `
                                    <li class="result-item">
                                        <span class="result-icon">✓</span>
                                        <span>${result}</span>
                                    </li>
                                `).join('')}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');
    }

    /**
     * Configura event listeners
     */
    setupEventListeners() {
        if (!this.element) return;

        // Play buttons dos vídeos
        const playButtons = this.element.querySelectorAll('.play-button');
        playButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const videoContainer = e.target.closest('.video-placeholder');
                if (videoContainer) {
                    const videoId = videoContainer.dataset.videoId;
                    this.playVideo(videoId, videoContainer);
                }
            });
        });

        // Scroll para animação dos números
        this.setupStatsAnimation();
    }

    /**
     * Configura animações
     */
    setupAnimations() {
        // Floating elements animation
        this.createFloatingElements();
        
        // Parallax effect
        this.setupParallaxEffect();
    }

    /**
     * Cria elementos flutuantes para o efeito liquid glass
     */
    createFloatingElements() {
        if (!this.element) return;

        const floatingContainer = document.createElement('div');
        floatingContainer.className = 'floating-elements';
        
        for (let i = 0; i < 5; i++) {
            const element = document.createElement('div');
            element.className = `floating-element floating-element-${i + 1}`;
            element.style.setProperty('--delay', `${i * 0.5}s`);
            floatingContainer.appendChild(element);
        }
        
        this.element.appendChild(floatingContainer);
    }

    /**
     * Configura efeito parallax
     */
    setupParallaxEffect() {
        if (!this.element) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.startParallaxAnimation();
                } else {
                    this.stopParallaxAnimation();
                }
            });
        });

        observer.observe(this.element);
    }

    /**
     * Inicia animação parallax
     */
    startParallaxAnimation() {
        if (this.element) {
            this.element.classList.add('parallax-active');
        }
    }

    /**
     * Para animação parallax
     */
    stopParallaxAnimation() {
        if (this.element) {
            this.element.classList.remove('parallax-active');
        }
    }

    /**
     * Configura animação dos números das estatísticas
     */
    setupStatsAnimation() {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateNumbers();
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        const statsSection = this.element.querySelector('.cases-stats');
        if (statsSection) {
            statsObserver.observe(statsSection);
        }
    }

    /**
     * Anima os números das estatísticas
     */
    animateNumbers() {
        const numbers = this.element.querySelectorAll('.stat-number[data-count]');
        
        numbers.forEach(numberEl => {
            const target = parseInt(numberEl.dataset.count);
            const duration = 2000;
            const startTime = Date.now();
            
            const animate = () => {
                const elapsed = Date.now() - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                // Easing function
                const easeOut = 1 - Math.pow(1 - progress, 3);
                const current = Math.floor(target * easeOut);
                
                numberEl.textContent = current;
                
                if (progress < 1) {
                    requestAnimationFrame(animate);
                }
            };
            
            animate();
        });
    }

    /**
     * Reproduz vídeo
     */
    playVideo(videoId, container) {
        // Placeholder para integração com YouTube/Vimeo
        utils.log(`Playing video: ${videoId}`, 'info');
        
        // Simular carregamento do vídeo
        container.classList.add('loading');
        
        setTimeout(() => {
            container.classList.remove('loading');
            container.classList.add('playing');
            this.currentVideoId = videoId;
            this.isVideoPlaying = true;
        }, 1000);
    }

    /**
     * Para todos os vídeos
     */
    stopAllVideos() {
        if (!this.element) return;

        this.element.querySelectorAll('.video-placeholder.playing').forEach(container => {
            container.classList.remove('playing');
        });
        
        this.currentVideoId = null;
        this.isVideoPlaying = false;
    }

    /**
     * Retorna informações de performance
     */
    getPerformanceInfo() {
        return {
            component: 'CasesSection',
            casesCount: this.cases.length,
            isVideoPlaying: this.isVideoPlaying,
            currentVideo: this.currentVideoId
        };
    }
}
