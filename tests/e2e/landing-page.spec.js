/**
 * @fileoverview Testes E2E para a Landing Page do Ebook
 * Verifica o funcionamento correto da página, interações do usuário e submissão de formulário
 */

describe('Landing Page E-book', () => {
  // Constantes
  const BASE_URL = '/';
  const VALID_EMAIL = 'teste@exemplo.com';
  const INVALID_EMAIL = 'email-invalido';
  
  beforeEach(() => {
    // Visitar a página antes de cada teste
    cy.visit(BASE_URL);
    
    // Interceptar chamadas de API
    cy.intercept('POST', '**/script.google.com/macros/**', {
      statusCode: 200,
      body: { result: 'success' }
    }).as('googleSheets');
    
    // Stub para funções de analytics
    cy.window().then((win) => {
      win.gtag = cy.stub().as('gtag');
      win.fbq = cy.stub().as('fbq');
    });
  });

  /**
   * Testes de carregamento da página
   */
  describe('Carregamento da página', () => {
    it('deve carregar a página corretamente', () => {
      // Verificar se o título está correto
      cy.title().should('include', 'Mestre da Engenharia de Prompts');
      
      // Verificar se os elementos principais estão visíveis
      cy.get('.hero').should('be.visible');
      cy.get('.benefits').should('exist');
      cy.get('.author').should('exist');
      cy.get('.chapters').should('exist');
      cy.get('.testimonials').should('exist');
      cy.get('.pricing').should('exist');
      cy.get('.faq').should('exist');
    });
  });

  /**
   * Testes de navegação
   */
  describe('Navegação', () => {
    it('deve navegar para a seção de preços ao clicar no CTA principal', () => {
      // Clicar no botão CTA principal
      cy.get('.hero-text .cta-button').click();
      
      // Verificar se a URL contém o hash correto
      cy.url().should('include', '#pricing');
      
      // Verificar se a seção de preços está visível
      cy.get('.pricing').should('be.visible');
    });
  });

  /**
   * Testes de interação com o usuário
   */
  describe('Interação com o usuário', () => {
    it('deve exibir o popup de saída quando o mouse sair da página', () => {
      // Verificar se o popup está inicialmente oculto
      cy.get('#exit-popup').should('not.have.class', 'visible');
      
      // Simular o mouse saindo da página
      cy.get('body').trigger('mouseleave', { clientY: -10 });
      
      // Verificar se o popup está visível
      cy.get('#exit-popup').should('have.class', 'visible');
      
      // Fechar o popup
      cy.get('.close-popup').click();
      
      // Verificar se o popup está oculto novamente
      cy.get('#exit-popup').should('not.have.class', 'visible');
    });
  });

  /**
   * Testes de formulário
   */
  describe('Formulário de captura de leads', () => {
    it('deve validar o email corretamente', () => {
      // Tentar enviar o formulário com email inválido
      cy.get('#lead-email').type(INVALID_EMAIL);
      cy.get('#lead-form').submit();
      
      // Verificar se a mensagem de erro aparece
      cy.get('.error-message').should('be.visible');
      cy.get('.error-message').should('contain', 'email válido');
      
      // Limpar o campo e tentar com email válido
      cy.get('#lead-email').clear().type(VALID_EMAIL);
      cy.get('#lead-form').submit();
      
      // Verificar se a requisição foi feita
      cy.wait('@googleSheets');
      
      // Verificar se a mensagem de sucesso aparece
      cy.get('.success-message').should('be.visible');
    });
    
    it('deve enviar os dados para o Google Sheets', () => {
      // Preencher e enviar o formulário
      cy.get('#lead-email').type(VALID_EMAIL);
      cy.get('#lead-form').submit();
      
      // Verificar se a requisição foi feita corretamente
      cy.wait('@googleSheets').then((interception) => {
        // Verificar se o corpo da requisição contém o email
        const formData = interception.request.body;
        expect(formData).to.include(VALID_EMAIL);
      });
      
      // Verificar se a mensagem de sucesso aparece
      cy.get('.success-message').should('be.visible');
    });
  });
});
