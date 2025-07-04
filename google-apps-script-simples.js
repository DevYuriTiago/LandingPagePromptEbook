/**
 * VERSÃO SIMPLIFICADA - GOOGLE APPS SCRIPT
 * Use este código se a versão anterior não funcionar
 */

function doPost(e) {
  try {
    // Obter dados do formulário
    const data = e.parameter || {};
    
    // Log dos dados recebidos
    console.log('Dados recebidos:', data);
    
    // Obter a planilha
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getActiveSheet();
    
    // Se é a primeira vez, criar cabeçalhos
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['Data/Hora', 'Nome', 'Email', 'Telefone', 'Empresa', 'Cargo', 'Interesse', 'Desafio']);
    }
    
    // Adicionar os dados
    sheet.appendRow([
      new Date(),
      data.name || '',
      data.email || '',
      data.phone || '',
      data.company || '',
      data.position || '',
      data.interest || '',
      data.challenge || ''
    ]);
    
    // Resposta de sucesso
    return ContentService
      .createTextOutput(JSON.stringify({success: true, message: 'Dados salvos!'}))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.error('Erro:', error);
    return ContentService
      .createTextOutput(JSON.stringify({success: false, message: error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput('Google Apps Script está funcionando!')
    .setMimeType(ContentService.MimeType.TEXT);
}

// Função de teste
function testeSimples() {
  const testData = {
    parameter: {
      name: 'João Silva',
      email: 'joao@teste.com',
      phone: '11999999999',
      company: 'Teste Ltda',
      position: 'CEO',
      interest: 'automation',
      challenge: 'Automatizar processos'
    }
  };
  
  const result = doPost(testData);
  console.log('Resultado:', result.getContent());
}
