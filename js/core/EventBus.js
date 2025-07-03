/**
 * @fileoverview Event Bus para comunicação entre componentes
 * Implementa padrão Observer para desacoplamento de componentes
 */

class EventBus {
    constructor() {
        this.listeners = new Map();
    }

    /**
     * Adiciona um listener para um evento
     * @param {string} event - Nome do evento
     * @param {Function} callback - Função callback
     */
    on(event, callback) {
        if (!this.listeners.has(event)) {
            this.listeners.set(event, []);
        }
        this.listeners.get(event).push(callback);
    }

    /**
     * Remove um listener de um evento
     * @param {string} event - Nome do evento
     * @param {Function} callback - Função callback
     */
    off(event, callback) {
        if (this.listeners.has(event)) {
            const callbacks = this.listeners.get(event);
            const index = callbacks.indexOf(callback);
            if (index > -1) {
                callbacks.splice(index, 1);
            }
        }
    }

    /**
     * Emite um evento para todos os listeners
     * @param {string} event - Nome do evento
     * @param {*} data - Dados do evento
     */
    emit(event, data) {
        if (this.listeners.has(event)) {
            this.listeners.get(event).forEach(callback => {
                try {
                    callback(data);
                } catch (error) {
                    console.error(`Erro ao executar callback do evento ${event}:`, error);
                }
            });
        }
    }

    /**
     * Remove todos os listeners de um evento
     * @param {string} event - Nome do evento
     */
    removeAllListeners(event) {
        if (event) {
            this.listeners.delete(event);
        } else {
            this.listeners.clear();
        }
    }
}

// Instância singleton do EventBus
const eventBus = new EventBus();

export default eventBus;
