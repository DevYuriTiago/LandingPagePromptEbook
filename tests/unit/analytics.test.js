/**
 * @jest-environment jsdom
 */

// Importar o código a ser testado
const fs = require('fs');
const path = require('path');

// Carregar o conteúdo do arquivo
const analyticsCode = fs.readFileSync(
  path.resolve(__dirname, '../../js/analytics.js'),
  'utf8'
);

// Executar o código para definir as funções no escopo global
eval(analyticsCode);

describe('Analytics Module', () => {
  beforeEach(() => {
    // Limpar mocks entre testes
    jest.clearAllMocks();
    
    // Configurar elementos do DOM necessários para os testes
    document.body.innerHTML = `
      <div class="hero">
        <a href="#pricing" class="cta-button">Botão CTA 1</a>
      </div>
      <section id="pricing">
        <a href="https://pay.kiwify.com.br/aeYGH77" class="cta-button">Botão CTA 2</a>
      </section>
      <form id="lead-form">
        <input type="email" id="lead-email" value="teste@exemplo.com">
        <button type="submit" class="lead-submit">Enviar</button>
      </form>
    `;
  });

  test('trackPageView deve chamar gtag com os parâmetros corretos', () => {
    // Chamar a função
    trackPageView();
    
    // Verificar se gtag foi chamado corretamente
    expect(global.gtag).toHaveBeenCalledWith('event', 'page_view', expect.objectContaining({
      page_title: document.title,
      page_location: window.location.href,
      page_path: window.location.pathname
    }));
  });

  test('trackEvent deve chamar gtag com os parâmetros corretos', () => {
    // Chamar a função
    trackEvent('Categoria', 'Ação', 'Rótulo', 10);
    
    // Verificar se gtag foi chamado corretamente
    expect(global.gtag).toHaveBeenCalledWith('event', 'Ação', {
      'event_category': 'Categoria',
      'event_label': 'Rótulo',
      'value': 10
    });
  });

  test('trackCTAClicks deve adicionar event listeners aos botões CTA', () => {
    // Espionar o método addEventListener
    const spy = jest.spyOn(Element.prototype, 'addEventListener');
    
    // Chamar a função
    trackCTAClicks();
    
    // Verificar se addEventListener foi chamado para cada botão CTA
    const ctaButtons = document.querySelectorAll('.cta-button');
    expect(spy).toHaveBeenCalledTimes(ctaButtons.length);
    
    // Simular clique no primeiro botão
    ctaButtons[0].click();
    
    // Verificar se trackEvent foi chamado
    expect(global.gtag).toHaveBeenCalledWith('event', 'CTA_Click', expect.any(Object));
    
    // Restaurar o método original
    spy.mockRestore();
  });

  test('trackTimeOnPage deve iniciar o rastreamento de tempo', () => {
    // Espionar o método setInterval
    jest.spyOn(global, 'setInterval').mockImplementation(callback => {
      // Simular passagem de tempo e chamar o callback
      callback();
      return 123; // ID do intervalo
    });
    
    // Espionar o método addEventListener
    const spy = jest.spyOn(window, 'addEventListener');
    
    // Chamar a função
    trackTimeOnPage();
    
    // Verificar se setInterval foi chamado
    expect(global.setInterval).toHaveBeenCalled();
    
    // Verificar se addEventListener foi chamado para beforeunload
    expect(spy).toHaveBeenCalledWith('beforeunload', expect.any(Function));
    
    // Restaurar os métodos originais
    global.setInterval.mockRestore();
    spy.mockRestore();
  });
});
