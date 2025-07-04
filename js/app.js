/**
 * @fileoverview Arquivo principal da aplicação
 * Ponto de entrada que inicializa toda a aplicação
 */

import { LandingPage } from './presentation/pages/LandingPage.js';
import { utils } from './core/utils.js';

/**
 * Classe principal da aplicação
 */
class App {
    constructor() {
        this.landingPage = null;
        this.isInitialized = false;
        this.startTime = Date.now();
    }

    /**
     * Inicializa a aplicação
     */
    async init() {
        try {
            utils.log('🚀 Iniciando aplicação Prompts360', 'info');

            // Inicializa a landing page
            this.landingPage = new LandingPage();
            await this.landingPage.init();

            this.isInitialized = true;
            
            const initTime = Date.now() - this.startTime;
            utils.log(`✅ Aplicação inicializada em ${initTime}ms`, 'info');

            // Registra métricas de performance
            this.logPerformanceMetrics();

        } catch (error) {
            utils.log(`❌ Erro ao inicializar aplicação: ${error.message}`, 'error');
            // console.error('Erro detalhado:', error);
        }
    }

    /**
     * Registra métricas de performance
     */
    logPerformanceMetrics() {
        if (this.landingPage) {
            const perfInfo = this.landingPage.getPerformanceInfo();
            utils.log(`📊 Métricas de Performance:`, 'info');
            utils.log(`   - Tempo de carregamento: ${perfInfo.pageLoadTime}ms`, 'info');
            utils.log(`   - DOM Content Loaded: ${perfInfo.domContentLoaded}ms`, 'info');
            utils.log(`   - First Paint: ${perfInfo.firstPaint}ms`, 'info');
            utils.log(`   - First Contentful Paint: ${perfInfo.firstContentfulPaint}ms`, 'info');
        }
    }

    /**
     * Destrói a aplicação
     */
    destroy() {
        if (this.landingPage) {
            this.landingPage.destroy();
        }
        this.isInitialized = false;
        utils.log('🛑 Aplicação destruída', 'info');
    }
}

// Cria instância global da aplicação
const app = new App();

// Inicializa quando DOM estiver pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        app.init();
    });
} else {
    app.init();
}

// Expõe app globalmente para debug
window.app = app;

export default app;
