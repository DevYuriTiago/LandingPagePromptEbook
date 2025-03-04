/**
 * @fileoverview Testes para o módulo de integração com Google Sheets
 * Verifica o funcionamento correto do envio de dados para o Google Sheets
 */

// Constantes de teste
const MOCK_EMAIL = 'teste@exemplo.com';
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwmvq78zDPOcCxBx7-KFBX-c1LwuCpF9KE2P_qcPXdtvCbIbDgxGQ0QHzLusdoX9fKW/exec';
const SUCCESS_RESPONSE = { result: 'success' };
const ERROR_MESSAGE = 'Erro na requisição: 500 Internal Server Error';

// Mocks para o ambiente de navegador
global.fetch = jest.fn(() => 
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve(SUCCESS_RESPONSE)
  })
);

global.FormData = jest.fn(() => ({
  append: jest.fn()
}));

/**
 * Função a ser testada (simplificada para testes)
 * @param {string} email - Email do lead a ser registrado
 * @returns {Promise<Object>} - Resposta da API em formato JSON
 * @throws {Error} - Erro em caso de falha na requisição
 */
async function submitToGoogleSheets(email) {
  try {
    const formData = new FormData();
    formData.append('email', email);
    
    const response = await fetch(SCRIPT_URL, {
      method: 'POST',
      body: formData
    });
    
    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status} ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    throw error;
  }
}

describe('Google Sheets Integration', () => {
  beforeEach(() => {
    // Limpar mocks entre testes
    jest.clearAllMocks();
    
    // Configurar mock para fetch com sucesso
    global.fetch.mockResolvedValue({
      ok: true,
      json: async () => SUCCESS_RESPONSE
    });
  });

  test('deve enviar dados corretamente', async () => {
    const result = await submitToGoogleSheets(MOCK_EMAIL);
    
    // Verificar se FormData foi criado
    expect(FormData).toHaveBeenCalled();
    
    // Verificar se o email foi adicionado ao FormData
    const formDataInstance = FormData.mock.results[0].value;
    expect(formDataInstance.append).toHaveBeenCalledWith('email', MOCK_EMAIL);
    
    // Verificar se fetch foi chamado com os parâmetros corretos
    expect(fetch).toHaveBeenCalledWith(SCRIPT_URL, {
      method: 'POST',
      body: formDataInstance
    });
    
    // Verificar se o resultado está correto
    expect(result).toEqual(SUCCESS_RESPONSE);
  });

  test('deve lançar erro quando a resposta não for ok', async () => {
    // Configurar mock para simular erro
    global.fetch.mockResolvedValue({
      ok: false,
      status: 500,
      statusText: 'Internal Server Error'
    });
    
    // Verificar se o erro é lançado corretamente
    await expect(submitToGoogleSheets(MOCK_EMAIL)).rejects.toThrow(ERROR_MESSAGE);
  });

  test('deve lançar erro quando fetch falhar', async () => {
    // Configurar mock para simular falha de rede
    const networkError = new Error('Network error');
    global.fetch.mockRejectedValue(networkError);
    
    // Verificar se o erro é propagado
    await expect(submitToGoogleSheets(MOCK_EMAIL)).rejects.toThrow(networkError);
  });

  test('deve retornar os dados corretos em caso de sucesso', async () => {
    const customResponse = { result: 'success', data: { id: '123' } };
    
    // Configurar mock com resposta personalizada
    global.fetch.mockResolvedValue({
      ok: true,
      json: async () => customResponse
    });
    
    const result = await submitToGoogleSheets(MOCK_EMAIL);
    
    // Verificar se o resultado contém os dados esperados
    expect(result).toEqual(customResponse);
  });
});
