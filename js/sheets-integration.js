/**
 * @fileoverview Módulo de integração com Google Sheets para captura de leads
 * Responsável por enviar dados de formulário para uma planilha Google via Apps Script
 */

/**
 * Envia dados de um lead para o Google Sheets
 * @param {string} email - Email do lead a ser registrado
 * @returns {Promise<Object>} - Resposta da API em formato JSON
 * @throws {Error} - Erro em caso de falha na requisição
 */
function submitToGoogleSheets(email) {
    // URL do Web App do Google Apps Script
    const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbz8OZshnVdr26pq8uGeulhc41V4eep-JAJ7u5GbCfkqCC2MkV7Y48kxZ7oyZhdnfEO0Qg/exec';
    
    // Preparação dos dados
    const formData = new FormData();
    formData.append('email', email);
    formData.append('timestamp', new Date().toISOString());
    formData.append('source', window.location.href);
    
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
