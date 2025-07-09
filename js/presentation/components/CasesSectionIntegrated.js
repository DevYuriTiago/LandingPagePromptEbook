/**
 * @fileoverview Componente de Cases de Sucesso - Versão Integrada
 * Funciona diretamente sem dependência de arquivo JSON externo
 */

export class CasesSectionIntegrated {
    constructor(selector = '#cases-section') {
        this.selector = selector;
        this.element = null;
        this.casesData = this.getCasesData();
        this.currentVideoId = null;
        this.isVideoPlaying = false;
    }

    /**
     * Retorna os dados dos cases
     */
    getCasesData() {
        return [
            {
                id: 'case1',
                title: 'Automação E-commerce',
                company: 'TechStore Brasil',
                category: 'E-commerce',
                challenge: 'Reduzir tempo de atendimento e aumentar conversões',
                solution: 'Chatbot inteligente + Automação de vendas',
                results: [
                    '300% ROI',
                    '70% redução no tempo de resposta',
                    '45% aumento nas vendas'
                ],
                video: {
                    type: 'local',
                    id: 'case1',
                    thumbnail: 'img/cases/case1-thumb.jpg',
                    poster: 'img/cases/case1-poster.jpg',
                    local_file: 'video/cases/case1.mp4'
                }
            },
            {
                id: 'case2',
                title: 'IA para Recursos Humanos',
                company: 'Inovação RH',
                category: 'Recursos Humanos',
                challenge: 'Triagem eficiente de currículos e candidatos',
                solution: 'Sistema de IA para análise de perfis',
                results: [
                    '80% redução no tempo de triagem',
                    '95% precisão na seleção',
                    '60% economia de custos'
                ],
                video: {
                    type: 'youtube',
                    id: 'dQw4w9WgXcQ',
                    thumbnail: 'img/cases/case2-thumb.jpg',
                    poster: 'img/cases/case2-poster.jpg',
                    local_file: 'video/cases/case2.mp4'
                }
            },
            {
                id: 'case3',
                title: 'Análise Preditiva Financeira',
                company: 'FinTech Solutions',
                category: 'Financeiro',
                challenge: 'Prever inadimplência e otimizar crédito',
                solution: 'Machine Learning para análise de risco',
                results: [
                    '40% redução na inadimplência',
                    '25% aumento na aprovação',
                    '200% ROI'
                ],
                video: {
                    type: 'vimeo',
                    id: '123456789',
                    thumbnail: 'img/cases/case3-thumb.jpg',
                    poster: 'img/cases/case3-poster.jpg',
                    local_file: 'video/cases/case3.mp4'
                }
            }
        ];
    }

    /**
     * Inicializa o componente
     */
    async init() {
        try {
            console.log('🔍 Inicializando Cases Section Integrada...');
            
            // Encontra o elemento
            this.element = document.querySelector(this.selector);
            if (!this.element) {
                console.warn(`❌ Elemento não encontrado: ${this.selector}`);
                return this;
            }

            console.log('🔍 Cases data:', this.casesData);

            // Renderiza
            this.render();
            this.setupEventListeners();
            
            console.log('✅ Cases Section inicializada com sucesso');
            
        } catch (error) {
            console.error(`❌ Erro ao inicializar Cases Section: ${error.message}`);
        }
        
        return this;
    }

    /**
     * Renderiza o componente
     */
    render() {
        if (!this.element) return;

        console.log('🔍 Renderizando Cases Section...');

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
        console.log('✅ Cases Section renderizada');
    }

    /**
     * Renderiza os cases individuais
     */
    renderCases() {
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
        
        // Encontra o case
        const caseData = this.casesData.find(c => c.id === caseId);
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
            
        }, 500);
    }

    /**
     * Abre o player de vídeo
     */
    openVideoPlayer(videoData) {
        let videoUrl;
        
        switch (videoData.type) {
            case 'youtube':
                videoUrl = `https://www.youtube.com/watch?v=${videoData.id}`;
                break;
            case 'vimeo':
                videoUrl = `https://vimeo.com/${videoData.id}`;
                break;
            case 'local':
                videoUrl = videoData.local_file;
                break;
            default:
                videoUrl = videoData.local_file;
        }
        
        if (videoUrl) {
            console.log('🎬 Abrindo vídeo:', videoUrl);
            
            if (videoData.type === 'local') {
                // Para vídeos locais, tenta abrir diretamente
                window.open(videoUrl, '_blank');
            } else {
                // Para vídeos online, abre em nova aba
                window.open(videoUrl, '_blank', 'width=800,height=600');
            }
        } else {
            console.error('URL do vídeo não encontrada');
            alert('Vídeo não disponível. Verifique se o arquivo foi adicionado corretamente.');
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
     * Retorna informações de performance
     */
    getPerformanceInfo() {
        return {
            component: 'CasesSectionIntegrated',
            casesCount: this.casesData.length,
            isVideoPlaying: this.isVideoPlaying,
            currentVideo: this.currentVideoId
        };
    }
}
