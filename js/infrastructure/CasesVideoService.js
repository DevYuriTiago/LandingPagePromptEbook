/**
 * @fileoverview Serviço para carregar e gerenciar dados dos vídeos dos cases
 * Centraliza o carregamento e configuração dos vídeos
 */

export class CasesVideoService {
    constructor() {
        this.casesData = null;
        this.videoSettings = null;
        this.isLoaded = false;
    }

    /**
     * Carrega os dados dos vídeos do arquivo JSON
     */
    async loadCasesData() {
        try {
            console.log('🔍 Carregando dados dos cases...');
            
            const response = await fetch('./data/cases-videos.json');
            
            if (!response.ok) {
                throw new Error(`Erro ao carregar dados: ${response.status}`);
            }
            
            const data = await response.json();
            
            this.casesData = data.cases;
            this.videoSettings = data.video_settings;
            this.isLoaded = true;
            
            console.log('✅ Dados dos cases carregados:', this.casesData.length, 'cases');
            
            return data;
            
        } catch (error) {
            console.error('❌ Erro ao carregar dados dos cases:', error);
            
            // Retorna dados de fallback
            return this.getFallbackData();
        }
    }

    /**
     * Retorna dados de fallback caso o JSON não carregue
     */
    getFallbackData() {
        console.log('🔄 Usando dados de fallback...');
        
        const fallbackData = {
            cases: [
                {
                    id: 'case1',
                    title: 'Automação E-commerce',
                    company: 'TechStore Brasil',
                    category: 'E-commerce',
                    challenge: 'Reduzir tempo de atendimento e aumentar conversões',
                    solution: 'Chatbot inteligente + Automação de vendas',
                    results: ['300% ROI', '70% redução no tempo de resposta', '45% aumento nas vendas'],
                    video: {
                        type: 'youtube',
                        id: 'dQw4w9WgXcQ',
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
                    results: ['80% redução no tempo de triagem', '95% precisão na seleção', '60% economia de custos'],
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
                    results: ['40% redução na inadimplência', '25% aumento na aprovação', '200% ROI'],
                    video: {
                        type: 'vimeo',
                        id: '123456789',
                        thumbnail: 'img/cases/case3-thumb.jpg',
                        poster: 'img/cases/case3-poster.jpg',
                        local_file: 'video/cases/case3.mp4'
                    }
                }
            ],
            video_settings: {
                default_type: 'youtube',
                autoplay: false,
                controls: true,
                muted: false,
                loop: false,
                preload: 'metadata'
            }
        };

        this.casesData = fallbackData.cases;
        this.videoSettings = fallbackData.video_settings;
        this.isLoaded = true;
        
        return fallbackData;
    }

    /**
     * Retorna todos os cases
     */
    getCases() {
        return this.casesData || [];
    }

    /**
     * Retorna um case específico por ID
     */
    getCaseById(id) {
        if (!this.casesData) return null;
        return this.casesData.find(caseItem => caseItem.id === id);
    }

    /**
     * Retorna as configurações de vídeo
     */
    getVideoSettings() {
        return this.videoSettings || {};
    }

    /**
     * Retorna a URL do vídeo baseado no tipo
     */
    getVideoUrl(videoData) {
        if (!videoData) return null;

        switch (videoData.type) {
            case 'youtube':
                return `https://www.youtube.com/watch?v=${videoData.id}`;
            case 'vimeo':
                return `https://vimeo.com/${videoData.id}`;
            case 'local':
                return videoData.local_file;
            default:
                return videoData.local_file || null;
        }
    }

    /**
     * Retorna a URL do embed do vídeo
     */
    getVideoEmbedUrl(videoData) {
        if (!videoData) return null;

        switch (videoData.type) {
            case 'youtube':
                return `https://www.youtube.com/embed/${videoData.id}`;
            case 'vimeo':
                return `https://player.vimeo.com/video/${videoData.id}`;
            case 'local':
                return videoData.local_file;
            default:
                return videoData.local_file || null;
        }
    }

    /**
     * Retorna a URL da thumbnail do vídeo
     */
    getVideoThumbnail(videoData) {
        if (!videoData) return null;

        // Se tem thumbnail customizada, usa ela
        if (videoData.thumbnail) {
            return videoData.thumbnail;
        }

        // Senão, gera thumbnail baseada no tipo
        switch (videoData.type) {
            case 'youtube':
                return `https://img.youtube.com/vi/${videoData.id}/maxresdefault.jpg`;
            case 'vimeo':
                // Para Vimeo, precisaria de uma chamada à API, então usa o poster
                return videoData.poster || null;
            default:
                return videoData.poster || null;
        }
    }

    /**
     * Verifica se os dados estão carregados
     */
    isDataLoaded() {
        return this.isLoaded;
    }

    /**
     * Recarrega os dados
     */
    async reload() {
        this.isLoaded = false;
        this.casesData = null;
        this.videoSettings = null;
        
        return await this.loadCasesData();
    }
}
