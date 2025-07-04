/**
 * @fileoverview Componente de Cases de Sucesso - Versão Simplificada para Debug
 */

export class CasesSectionSimple {
    constructor(selector = '#cases-section') {
        this.selector = selector;
        this.element = null;
        this.cases = [];
    }

    async init() {
        console.log('🔍 Iniciando CasesSectionSimple...');
        
        this.element = document.querySelector(this.selector);
        console.log('🔍 Elemento encontrado:', this.element);
        
        if (!this.element) {
            console.warn(`❌ Elemento não encontrado: ${this.selector}`);
            return this;
        }

        this.loadCases();
        this.render();
        
        console.log('✅ CasesSectionSimple inicializada com sucesso');
        return this;
    }

    loadCases() {
        this.cases = [
            {
                id: 'case1',
                title: 'Automação E-commerce',
                company: 'TechStore Brasil',
                challenge: 'Reduzir tempo de atendimento e aumentar conversões',
                solution: 'Chatbot inteligente + Automação de vendas',
                results: ['300% ROI', '70% redução no tempo de resposta', '45% aumento nas vendas'],
                videoId: 'dQw4w9WgXcQ',
                category: 'E-commerce'
            },
            {
                id: 'case2',
                title: 'IA para Recursos Humanos',
                company: 'Inovação RH',
                challenge: 'Triagem eficiente de currículos e candidatos',
                solution: 'Sistema de IA para análise de perfis',
                results: ['80% redução no tempo de triagem', '95% precisão na seleção', '60% economia de custos'],
                videoId: 'dQw4w9WgXcQ',
                category: 'Recursos Humanos'
            },
            {
                id: 'case3',
                title: 'Análise Preditiva Financeira',
                company: 'FinTech Solutions',
                challenge: 'Prever inadimplência e otimizar crédito',
                solution: 'Machine Learning para análise de risco',
                results: ['40% redução na inadimplência', '25% aumento na aprovação', '200% ROI'],
                videoId: 'dQw4w9WgXcQ',
                category: 'Financeiro'
            }
        ];
    }

    render() {
        console.log('🔍 Renderizando CasesSectionSimple...');
        
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
        `;

        this.element.innerHTML = html;
        console.log('✅ CasesSectionSimple renderizada com sucesso');
    }

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
}
