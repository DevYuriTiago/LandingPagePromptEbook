function doPost(e) {
  try {
    // SUBSTITUA PELO ID DA SUA PLANILHA
    // Para obter o ID: abra a planilha e copie o ID da URL
    // URL: https://docs.google.com/spreadsheets/d/SEU_ID_AQUI/edit
    const SPREADSHEET_ID = 'COLE_O_ID_DA_SUA_PLANILHA_AQUI';
    
    // Obter dados do formulário
    const data = e.parameter || {};
    console.log('Dados recebidos:', data);
    
    // Abrir planilha pelo ID
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = ss.getActiveSheet();
    
    console.log('Planilha aberta:', sheet.getName());
    
    // Se é a primeira vez, criar cabeçalhos
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['Data/Hora', 'Nome', 'Email', 'Telefone', 'Empresa', 'Cargo', 'Interesse', 'Desafio']);
      console.log('Cabeçalhos criados');
    }
    
    // Adicionar os dados
    const newRow = [
      new Date(),
      data.name || '',
      data.email || '',
      data.phone || '',
      data.company || '',
      data.position || '',
      data.interest || '',
      data.challenge || ''
    ];
    
    sheet.appendRow(newRow);
    console.log('Dados adicionados:', newRow);
    
    // Resposta de sucesso
    return ContentService
      .createTextOutput(JSON.stringify({success: true, message: 'Dados salvos com sucesso!'}))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.error('Erro:', error);
    return ContentService
      .createTextOutput(JSON.stringify({success: false, message: 'Erro: ' + error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput('Google Apps Script funcionando!')
    .setMimeType(ContentService.MimeType.TEXT);
}

// Função de teste com ID
function testeComID() {
  try {
    const SPREADSHEET_ID = 'COLE_O_ID_DA_SUA_PLANILHA_AQUI';
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = ss.getActiveSheet();
    
    console.log('Planilha encontrada:', sheet.getName());
    console.log('Última linha:', sheet.getLastRow());
    
    // Adicionar linha de teste
    sheet.appendRow([
      new Date(),
      'Teste com ID',
      'teste@id.com',
      '11999999999',
      'Empresa ID',
      'Cargo ID',
      'Interesse ID',
      'Desafio ID'
    ]);
    
    console.log('✅ Teste passou! Dados salvos na planilha.');
    return true;
    
  } catch (error) {
    console.error('❌ Erro no teste:', error);
    return false;
  }
}
