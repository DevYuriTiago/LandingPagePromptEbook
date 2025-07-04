/**
 * Código do Google Apps Script para captura de leads
 * INSTRUÇÕES DE USO:
 * 1. Abra Google Sheets e crie uma nova planilha
 * 2. Vá em Extensões > Apps Script
 * 3. Substitua o código padrão por este
 * 4. Salve o projeto
 * 5. Clique em "Implantar" > "Nova implantação"
 * 6. Escolha "Aplicativo da Web"
 * 7. Execute como: Eu (seu e-mail)
 * 8. Acesso: Qualquer pessoa
 * 9. Copie a URL gerada e cole no código da landing page
 */

function doPost(e) {
  try {
    // Log para debug
    console.log('Recebendo dados do formulário:', e);
    
    // Obter a planilha ativa - MÉTODO CORRIGIDO
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    
    // Verificar se o spreadsheet existe
    if (!spreadsheet) {
      throw new Error('Nenhuma planilha ativa encontrada');
    }
    
    // Obter a primeira aba ou criar uma nova
    let sheet = spreadsheet.getSheets()[0];
    
    // Se não existe nenhuma aba, criar uma
    if (!sheet) {
      sheet = spreadsheet.insertSheet('Leads');
    }
    
    // Renomear a aba se necessário
    if (sheet.getName() !== 'Leads') {
      sheet.setName('Leads');
    }
    
    // Verificar se há cabeçalhos na primeira linha
    const lastRow = sheet.getLastRow();
    
    // Se a planilha está vazia ou não tem cabeçalhos, criar os cabeçalhos
    if (lastRow === 0) {
      const expectedHeaders = ['Data/Hora', 'Nome', 'Email', 'Telefone', 'Empresa', 'Cargo', 'Interesse', 'Desafio'];
      sheet.getRange(1, 1, 1, 8).setValues([expectedHeaders]);
      
      // Formatar cabeçalhos
      const headerRange = sheet.getRange(1, 1, 1, 8);
      headerRange.setBackground('#4285f4');
      headerRange.setFontColor('#ffffff');
      headerRange.setFontWeight('bold');
      
      console.log('Cabeçalhos criados na planilha');
    }
    
    // Obter dados do formulário
    const data = e.parameter || {};
    console.log('Dados recebidos:', data);
    
    // Validar dados obrigatórios
    if (!data.name || !data.email) {
      throw new Error('Dados obrigatórios não fornecidos (nome e email)');
    }
    
    // Preparar dados para inserção
    const timestamp = new Date();
    const row = [
      timestamp,
      data.name || '',
      data.email || '',
      data.phone || '',
      data.company || '',
      data.position || '',
      data.interest || '',
      data.challenge || ''
    ];
    
    console.log('Dados preparados para inserção:', row);
    
    // Adicionar linha à planilha
    sheet.appendRow(row);
    
    // Obter a linha que foi adicionada
    const newLastRow = sheet.getLastRow();
    
    // Formatar a linha adicionada
    const dataRange = sheet.getRange(newLastRow, 1, 1, 8);
    
    // Formatar data na primeira coluna
    sheet.getRange(newLastRow, 1).setNumberFormat('dd/MM/yyyy HH:mm:ss');
    
    // Log de sucesso
    console.log('Lead adicionado com sucesso na linha:', newLastRow);
    
    // Retornar sucesso - MÉTODO CORRIGIDO
    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        message: 'Lead cadastrado com sucesso!',
        timestamp: timestamp.toISOString(),
        row: newLastRow
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Log do erro
    console.error('Erro ao processar formulário:', error);
    
    // Retornar erro - MÉTODO CORRIGIDO
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        message: 'Erro ao cadastrar lead: ' + error.toString(),
        timestamp: new Date().toISOString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Função para lidar com requisições GET (opcional)
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({
      status: 'Google Apps Script funcionando!',
      timestamp: new Date().toISOString()
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

// Função para testar a integração - VERSÃO SIMPLIFICADA
function testIntegration() {
  try {
    // Simular dados de teste
    const testData = {
      parameter: {
        name: 'Teste User',
        email: 'teste@example.com',
        phone: '(11) 99999-9999',
        company: 'Empresa Teste',
        position: 'Desenvolvedor',
        interest: 'automation',
        challenge: 'Teste de integração'
      }
    };
    
    // Executar a função doPost
    const result = doPost(testData);
    
    // Mostrar resultado
    console.log('Resultado do teste:', result.getContent());
    
    // Verificar se foi bem-sucedido
    const response = JSON.parse(result.getContent());
    if (response.success) {
      console.log('✅ Teste passou! Dados foram salvos na planilha.');
    } else {
      console.error('❌ Teste falhou:', response.message);
    }
    
    return response;
    
  } catch (error) {
    console.error('Erro no teste:', error);
    return { success: false, message: error.toString() };
  }
}
