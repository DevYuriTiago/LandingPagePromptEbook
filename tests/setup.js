// Configuração para testes Jest

// Mock para o objeto global window
global.window = {
  location: {
    href: 'http://localhost:3000',
    pathname: '/',
    search: '',
    hash: ''
  }
};

// Mock para o objeto document
global.document = {
  title: 'Mestre da Engenharia de Prompts',
  querySelector: jest.fn(),
  querySelectorAll: jest.fn(() => []),
  getElementById: jest.fn(),
  createElement: jest.fn(),
  body: {
    appendChild: jest.fn()
  }
};

// Mock para funções do Google Analytics
global.gtag = jest.fn();

// Mock para funções do Facebook Pixel
global.fbq = jest.fn();

// Mock para FormData
global.FormData = class FormData {
  constructor() {
    this.data = {};
  }
  
  append(key, value) {
    this.data[key] = value;
  }
  
  get(key) {
    return this.data[key];
  }
};

// Mock para fetch API
global.fetch = jest.fn(() => 
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ result: 'success' })
  })
);
