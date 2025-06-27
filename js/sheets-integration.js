/**
 * @fileoverview Módulo de integração com Google Sheets para captura de leads
 * Responsável por enviar dados de formulário para uma planilha Google via Apps Script
 */

/**
 * Envia dados de um lead para o Google Sheets
 * @param {Object} leadData - Dados completos do lead
 * @returns {Promise<Object>} - Resposta da API em formato JSON
 * @throws {Error} - Erro em caso de falha na requisição
 */
function submitToGoogleSheets(leadData) {
    // URL do Web App do Google Apps Script
    const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbz8OZshnVdr26pq8uGeulhc41V4eep-JAJ7u5GbCfkqCC2MkV7Y48kxZ7oyZhdnfEO0Qg/exec';
    
    // Preparação dos dados
    const formData = new FormData();
    
    // Adiciona todos os campos do formulário
    formData.append('name', leadData.name || '');
    formData.append('email', leadData.email || '');
    formData.append('phone', leadData.phone || '');
    formData.append('company', leadData.company || '');
    formData.append('position', leadData.position || '');
    formData.append('interest', leadData.interest || '');
    formData.append('challenge', leadData.challenge || '');
    formData.append('timestamp', leadData.timestamp || new Date().toISOString());
    formData.append('source', leadData.source || window.location.href);
    
    // Envio da requisição
    return fetch(SCRIPT_URL, {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.status} ${response.statusText}`);
        }
        return response.json();
    })
    .catch(error => {
        console.error('Erro ao enviar dados para Google Sheets:', error);
        throw error;
    });
}
