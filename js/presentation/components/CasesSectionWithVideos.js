/**
 * @fileoverview Componente de Cases de Sucesso com sistema de vídeos externo
 * Carrega dados dos vídeos de arquivo JSON separado
 */

import { CasesVideoService } from '../../infrastructure/CasesVideoService.js';

export class CasesSectionWithVideos {
    constructor(selector = '#cases-section') {
        this.selector = selector;
        this.element = null;
        this.videoService = new CasesVideoService();
        this.casesData = [];
        this.currentVideoId = null;
        this.isVideoPlaying = false;
    }

    /**
     * Inicializa o componente
     */
    async init() {
        try {
            console.log('🔍 Inicializando Cases Section com vídeos...');
            
            // Encontra o elemento primeiro
            this.element = document.querySelector(this.selector);
            if (!this.element) {
                console.warn(`❌ Elemento não encontrado: ${this.selector}`);
                return this;
            }

            // Carrega dados dos vídeos
            console.log('🔍 Carregando dados dos vídeos...');
            const data = await this.videoService.loadCasesData();
            this.casesData = this.videoService.getCases();
            
            console.log('🔍 Dados carregados:', this.casesData);

            // Renderiza com os dados carregados
            console.log('🔍 Renderizando componente...');
            this.render();
            this.setupEventListeners();
            
            console.log('✅ Cases Section inicializada com sucesso');
            
        } catch (error) {
            console.error(`❌ Erro ao inicializar Cases Section: ${error.message}`);
            
            // Tenta renderizar com dados de fallback
            console.log('🔄 Tentando usar dados de fallback...');
            this.casesData = this.videoService.getCases();
            this.render();
            this.setupEventListeners();
        }
        
        return this;
    }

    /**
     * Renderiza o componente
     */
    render() {
        if (!this.element) return;

        // Limpa o conteúdo existente (se houver)
        this.element.innerHTML = '';

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
                        <div class="stat-number" data-count="50">50</div>
                        <div class="stat-label">Projetos Entregues</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-number" data-count="95">95</div>
                        <div class="stat-label">% Taxa de Sucesso</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-number" data-count="300">300</div>
                        <div class="stat-label">% ROI Médio</div>
                    </div>
                </div>
            </div>
            
            <div class="floating-elements">
                <div class="floating-element floating-element-1"></div>
                <div class="floating-element floating-element-2"></div>
                <div class="floating-element floating-element-3"></div>
                <div class="floating-element floating-element-4"></div>
                <div class="floating-element floating-element-5"></div>
            </div>
        `;

        this.element.innerHTML = html;
        console.log('✅ Cases Section renderizada com dados externos');
    }

    /**
     * Renderiza os cases individuais
     */
    renderCases() {
        if (!this.casesData || this.casesData.length === 0) {
            return '<p>Carregando cases...</p>';
        }

        return this.casesData.map(caseItem => `
            <div class="case-card glass-card animate-on-scroll" data-case-id="${caseItem.id}">
                <div class="case-header">
                    <div class="case-category">${caseItem.category}</div>
                    <h3 class="case-title">${caseItem.title}</h3>
                    <div class="case-company">${caseItem.company}</div>
                </div>
                
                <div class="case-content">
                    <div class="case-video-container">
                        <div class="video-placeholder" 
                             data-video-id="${caseItem.video.id}"
                             data-video-type="${caseItem.video.type}"
                             data-case-id="${caseItem.id}">
                            <div class="video-overlay">
                                <button class="play-button" title="Reproduzir vídeo">
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
                e.preventDefault();
                const videoContainer = e.target.closest('.video-placeholder');
                if (videoContainer) {
                    const caseId = videoContainer.dataset.caseId;
                    const videoType = videoContainer.dataset.videoType;
                    const videoId = videoContainer.dataset.videoId;
                    
                    this.playVideo(caseId, videoType, videoId, videoContainer);
                }
            });
        });

        console.log('✅ Event listeners configurados');
    }

    /**
     * Reproduz vídeo
     */
    playVideo(caseId, videoType, videoId, container) {
        console.log(`🎥 Reproduzindo vídeo: ${caseId} (${videoType}:${videoId})`);
        
        // Para caso específico pelo ID
        const caseData = this.videoService.getCaseById(caseId);
        if (!caseData) {
            console.error('Case não encontrado:', caseId);
            return;
        }

        // Mostra loading
        container.classList.add('loading');
        
        // Simula carregamento e depois abre o vídeo
        setTimeout(() => {
            container.classList.remove('loading');
            container.classList.add('playing');
            
            // Abre o vídeo baseado no tipo
            this.openVideoPlayer(caseData.video);
            
            this.currentVideoId = caseId;
            this.isVideoPlaying = true;
            
        }, 1000);
    }

    /**
     * Abre o player de vídeo
     */
    openVideoPlayer(videoData) {
        const videoUrl = this.videoService.getVideoUrl(videoData);
        
        if (videoUrl) {
            // Abre em nova aba/janela
            window.open(videoUrl, '_blank', 'width=800,height=600');
        } else {
            console.error('URL do vídeo não encontrada');
        }
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
     * Recarrega os dados dos vídeos
     */
    async reloadVideos() {
        console.log('🔄 Recarregando dados dos vídeos...');
        
        await this.videoService.reload();
        this.casesData = this.videoService.getCases();
        
        this.render();
        this.setupEventListeners();
        
        console.log('✅ Dados dos vídeos recarregados');
    }

    /**
     * Retorna informações de performance
     */
    getPerformanceInfo() {
        return {
            component: 'CasesSectionWithVideos',
            casesCount: this.casesData.length,
            isVideoPlaying: this.isVideoPlaying,
            currentVideo: this.currentVideoId,
            videoServiceLoaded: this.videoService.isDataLoaded()
        };
    }
}
