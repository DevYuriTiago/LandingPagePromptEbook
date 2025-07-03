/**
 * @fileoverview Componente de Loading Screen
 * Gerencia a tela de carregamento inicial da aplicação
 */

import { BaseComponent } from './BaseComponent.js';
import { CONFIG } from '../../core/config.js';
import { utils } from '../../core/utils.js';

export class LoadingScreen extends BaseComponent {
    constructor(selector = CONFIG.SELECTORS.loadingScreen) {
        super(selector);
        this.progressFill = null;
        this.progressPercentage = null;
        this.mainContent = null;
        this.currentProgress = 0;
        this.resourcesLoaded = 0;
        this.totalResources = 0;
        this.isFinished = false;
    }

    /**
     * Configura event listeners
     */
    setupEventListeners() {
        // Escuta eventos de carregamento
        this.on('loading:progress', (data) => {
            this.updateProgress(data.progress);
        });

        this.on('loading:finish', () => {
            this.finish();
        });

        this.on('loading:resource_loaded', () => {
            this.onResourceLoaded();
        });
    }

    /**
     * Renderiza o componente
     */
    render() {
        this.progressFill = document.querySelector(CONFIG.SELECTORS.progressFill);
        this.progressPercentage = document.querySelector(CONFIG.SELECTORS.progressPercentage);
        this.mainContent = document.querySelector(CONFIG.SELECTORS.mainContent);
        
        if (!this.progressFill || !this.progressPercentage || !this.mainContent) {
            utils.log('Elementos de loading não encontrados', 'warn');
            return;
        }

        this.initializeResources();
        this.startLoading();
    }

    /**
     * Inicializa o controle de recursos
     */
    initializeResources() {
        this.totalResources = CONFIG.LOADING.resources.length + 2; // +2 para DOM e fonts
        this.resourcesLoaded = 0;
        this.currentProgress = 0;
        
        // Monitora carregamento de imagens
        this.monitorImageLoading();
        
        // Monitora carregamento de fonts
        this.monitorFontLoading();
        
        // DOM já está carregado
        this.onResourceLoaded();
    }

    /**
     * Inicia o processo de loading
     */
    startLoading() {
        utils.log('Iniciando loading screen', 'info');
        
        // Timer de backup para garantir que o loading termine
        const backupTimer = setInterval(() => {
            if (this.resourcesLoaded < this.totalResources - 1) {
                this.onResourceLoaded();
            } else {
                clearInterval(backupTimer);
            }
        }, 400);

        // Timer de duração mínima
        setTimeout(() => {
            if (this.currentProgress >= 100) {
                this.finish();
            }
        }, CONFIG.LOADING.minDuration);
    }

    /**
     * Monitora carregamento de imagens
     */
    monitorImageLoading() {
        const images = document.querySelectorAll('img');
        let imagesLoaded = 0;
        
        if (images.length === 0) {
            this.onResourceLoaded();
            return;
        }

        images.forEach(img => {
            if (img.complete) {
                imagesLoaded++;
                if (imagesLoaded === 1) {
                    this.onResourceLoaded();
                }
            } else {
                img.addEventListener('load', () => {
                    imagesLoaded++;
                    if (imagesLoaded === 1) {
                        this.onResourceLoaded();
                    }
                });
                
                img.addEventListener('error', () => {
                    imagesLoaded++;
                    if (imagesLoaded === 1) {
                        this.onResourceLoaded();
                    }
                });
            }
        });
    }

    /**
     * Monitora carregamento de fonts
     */
    monitorFontLoading() {
        if (document.fonts) {
            document.fonts.ready.then(() => {
                utils.log('Fonts carregadas', 'info');
                this.onResourceLoaded();
            });
        } else {
            setTimeout(() => {
                this.onResourceLoaded();
            }, 800);
        }
    }

    /**
     * Chamado quando um recurso é carregado
     */
    onResourceLoaded() {
        this.resourcesLoaded++;
        const progress = Math.min((this.resourcesLoaded / this.totalResources) * 100, 100);
        this.updateProgress(progress);
        
        utils.log(`Progresso: ${Math.round(progress)}% (${this.resourcesLoaded}/${this.totalResources})`, 'info');
        
        if (progress >= 100) {
            setTimeout(() => {
                this.finish();
            }, 500);
        }
    }

    /**
     * Atualiza o progresso visualmente
     * @param {number} progress - Progresso (0-100)
     */
    updateProgress(progress) {
        if (this.isFinished) return;
        
        this.currentProgress = Math.min(progress, 100);
        
        if (this.progressFill) {
            this.progressFill.style.width = `${this.currentProgress}%`;
        }
        
        if (this.progressPercentage) {
            this.progressPercentage.textContent = `${Math.round(this.currentProgress)}%`;
        }
        
        this.emit('loading:progress_updated', {
            progress: this.currentProgress,
            resourcesLoaded: this.resourcesLoaded,
            totalResources: this.totalResources
        });
    }

    /**
     * Finaliza o loading e mostra o conteúdo principal
     */
    async finish() {
        if (this.isFinished) return;
        
        this.isFinished = true;
        utils.log('Finalizando loading screen', 'info');
        
        // Garante que o progresso está em 100%
        this.updateProgress(100);
        
        // Aguarda um pouco para mostrar 100%
        await utils.sleep(300);
        
        // Fade out do loading screen
        this.addClass('fade-out');
        
        // Aguarda a animação
        await utils.sleep(500);
        
        // Oculta o loading screen
        this.hide();
        
        // Mostra o conteúdo principal
        if (this.mainContent) {
            this.mainContent.style.display = 'block';
            this.mainContent.classList.add('fade-in');
        }
        
        // Emite evento de finalização
        this.emit('loading:finished', {
            duration: Date.now() - this.startTime,
            resourcesLoaded: this.resourcesLoaded
        });
        
        utils.log('Loading screen finalizado', 'info');
    }

    /**
     * Força o término do loading
     */
    forceFinish() {
        utils.log('Forçando término do loading', 'info');
        this.updateProgress(100);
        this.finish();
    }

    /**
     * Reinicia o loading
     */
    restart() {
        this.isFinished = false;
        this.currentProgress = 0;
        this.resourcesLoaded = 0;
        
        this.removeClass('fade-out');
        this.show();
        
        if (this.mainContent) {
            this.mainContent.style.display = 'none';
            this.mainContent.classList.remove('fade-in');
        }
        
        this.startLoading();
    }

    /**
     * Callback chamado após inicialização
     */
    onInitialized() {
        this.startTime = Date.now();
        
        // Timeout de segurança
        setTimeout(() => {
            if (!this.isFinished) {
                utils.log('Timeout de loading atingido, forçando término', 'warn');
                this.forceFinish();
            }
        }, CONFIG.LOADING.maxDuration);
    }
}
