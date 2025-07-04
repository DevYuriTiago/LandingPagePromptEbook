function doPost(e) {
  try {
    // Obter dados do formulário
    const data = e.parameter || {};
    
    // Log dos dados recebidos
    console.log('Dados recebidos:', data);
    
    // Obter a planilha ATUAL (vinculada ao script)
    const sheet = SpreadsheetApp.getActiveSheet();
    
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

// Função de teste - Execute esta função para testar
function testeVinculado() {
  try {
    const sheet = SpreadsheetApp.getActiveSheet();
    console.log('Planilha encontrada:', sheet.getName());
    console.log('Última linha:', sheet.getLastRow());
    
    // Adicionar linha de teste
    sheet.appendRow([
      new Date(),
      'Teste Vinculado',
      'teste@vinculado.com',
      '11999999999',
      'Empresa Vinculada',
      'Cargo Vinculado',
      'Interesse Vinculado',
      'Desafio Vinculado'
    ]);
    
    console.log('✅ Teste passou! Dados salvos na planilha.');
    return true;
    
  } catch (error) {
    console.error('❌ Erro no teste:', error);
    return false;
  }
}
