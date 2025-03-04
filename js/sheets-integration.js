// Integração com Google Sheets para captura de leads
function submitToGoogleSheets(email) {
    // URL do seu Web App do Google Apps Script (você precisará substituir esta URL)
    const scriptURL = 'https://script.google.com/macros/s/AKfycbz8OZshnVdr26pq8uGeulhc41V4eep-JAJ7u5GbCfkqCC2MkV7Y48kxZ7oyZhdnfEO0Qg/exec';
    
    // Dados a serem enviados
    const formData = new FormData();
    formData.append('email', email);
    formData.append('timestamp', new Date().toISOString());
    formData.append('source', window.location.href);
    
    // Enviar dados para o Google Sheets via fetch API
    return fetch(scriptURL, {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao enviar dados');
        }
        return response.json();
    })
    .catch(error => {
        console.error('Erro:', error);
        throw error;
    });
}
