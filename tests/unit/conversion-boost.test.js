/**
 * @jest-environment jsdom
 */

// Importar o código a ser testado
const fs = require('fs');
const path = require('path');

// Carregar o conteúdo do arquivo
const conversionBoostCode = fs.readFileSync(
  path.resolve(__dirname, '../../js/conversion-boost.js'),
  'utf8'
);

// Executar o código para definir as funções no escopo global
// Precisamos simular a função submitToGoogleSheets que é importada de outro arquivo
global.submitToGoogleSheets = jest.fn().mockResolvedValue({ result: 'success' });

// Agora podemos avaliar o código
eval(conversionBoostCode);

describe('Conversion Boost Module', () => {
  beforeEach(() => {
    // Limpar mocks entre testes
    jest.clearAllMocks();
    
    // Configurar elementos do DOM necessários para os testes
    document.body.innerHTML = `
      <div class="sticky-header"></div>
      <div id="exit-popup">
        <div class="popup-content">
          <button class="close-popup">&times;</button>
        </div>
      </div>
      <form id="lead-form">
        <input type="email" id="lead-email" value="teste@exemplo.com">
        <button type="submit" class="lead-submit">Enviar</button>
      </form>
    `;
    
    // Resetar o scroll
    window.scrollY = 0;
  });

  test('initStickyHeader deve adicionar classe visible quando scroll > 300', () => {
    // Chamar a função
    initStickyHeader();
    
    // Simular scroll
    window.scrollY = 400;
    
    // Disparar evento de scroll
    window.dispatchEvent(new Event('scroll'));
    
    // Verificar se a classe foi adicionada
    const stickyHeader = document.querySelector('.sticky-header');
    expect(stickyHeader.classList.contains('visible')).toBe(true);
    
    // Simular scroll para cima
    window.scrollY = 200;
    
    // Disparar evento de scroll
    window.dispatchEvent(new Event('scroll'));
    
    // Verificar se a classe foi removida
    expect(stickyHeader.classList.contains('visible')).toBe(false);
  });

  test('initExitPopup deve mostrar popup quando o mouse sair da página', () => {
    // Chamar a função
    initExitPopup();
    
    // Simular mouse saindo da página
    document.dispatchEvent(new MouseEvent('mouseleave', {
      clientY: -10
    }));
    
    // Verificar se a classe foi adicionada
    const exitPopup = document.getElementById('exit-popup');
    expect(exitPopup.classList.contains('visible')).toBe(true);
    
    // Simular clique no botão de fechar
    document.querySelector('.close-popup').click();
    
    // Verificar se a classe foi removida
    expect(exitPopup.classList.contains('visible')).toBe(false);
  });

  test('initLeadCapture deve processar o formulário corretamente', async () => {
    // Chamar a função
    initLeadCapture();
    
    // Simular envio do formulário
    const form = document.getElementById('lead-form');
    form.dispatchEvent(new Event('submit'));
    
    // Verificar se preventDefault foi chamado
    const submitEvent = new Event('submit');
    submitEvent.preventDefault = jest.fn();
    form.dispatchEvent(submitEvent);
    expect(submitEvent.preventDefault).toHaveBeenCalled();
    
    // Verificar se submitToGoogleSheets foi chamado com o email correto
    expect(global.submitToGoogleSheets).toHaveBeenCalledWith('teste@exemplo.com');
    
    // Aguardar a resolução da Promise
    await new Promise(resolve => setTimeout(resolve, 0));
    
    // Verificar se a mensagem de sucesso foi exibida
    expect(form.innerHTML).toContain('success-message');
    
    // Verificar se o evento de conversão foi registrado
    expect(global.fbq).toHaveBeenCalledWith('track', 'Lead');
  });

  test('initLeadCapture deve mostrar erro para email inválido', () => {
    // Configurar email inválido
    document.getElementById('lead-email').value = 'email-invalido';
    
    // Chamar a função
    initLeadCapture();
    
    // Simular envio do formulário
    const form = document.getElementById('lead-form');
    form.dispatchEvent(new Event('submit'));
    
    // Verificar se a classe de erro foi adicionada
    const emailInput = document.getElementById('lead-email');
    expect(emailInput.classList.contains('error')).toBe(true);
    
    // Verificar se submitToGoogleSheets não foi chamado
    expect(global.submitToGoogleSheets).not.toHaveBeenCalled();
  });
});
