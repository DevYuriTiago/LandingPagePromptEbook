const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');
const fs = require('fs');
const path = require('path');
const config = require('./lighthouse-config');

(async () => {
  // Iniciar Chrome
  const chrome = await chromeLauncher.launch({
    chromeFlags: ['--headless', '--disable-gpu', '--no-sandbox']
  });

  // Configurar opções do Lighthouse
  const options = {
    logLevel: 'info',
    output: 'html',
    onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
    port: chrome.port,
    locale: 'pt-BR',
    formFactor: 'desktop',
    screenEmulation: config.settings.screenEmulation,
    emulatedUserAgent: config.settings.emulatedUserAgent,
    throttling: config.settings.throttling
  };

  // URL para testar (ajuste para o seu ambiente local)
  const url = 'http://localhost:3000';

  try {
    // Executar o Lighthouse
    console.log(`Executando teste de performance para: ${url}`);
    const runnerResult = await lighthouse(url, options, config);

    // Gerar relatório HTML
    const reportHtml = runnerResult.report;
    
    // Criar diretório de relatórios se não existir
    const reportDir = path.join(__dirname, '../../reports');
    if (!fs.existsSync(reportDir)) {
      fs.mkdirSync(reportDir, { recursive: true });
    }
    
    // Salvar relatório HTML
    const reportPath = path.join(reportDir, `lighthouse-report-${new Date().toISOString().replace(/:/g, '-')}.html`);
    fs.writeFileSync(reportPath, reportHtml);
    
    console.log(`Relatório de performance salvo em: ${reportPath}`);
    
    // Exibir métricas principais
    const { categories, audits } = runnerResult.lhr;
    
    console.log('\n=== Pontuações por Categoria ===');
    Object.keys(categories).forEach(key => {
      console.log(`${categories[key].title}: ${categories[key].score * 100}/100`);
    });
    
    console.log('\n=== Métricas Principais ===');
    [
      'first-contentful-paint',
      'speed-index',
      'largest-contentful-paint',
      'interactive',
      'total-blocking-time',
      'cumulative-layout-shift'
    ].forEach(metric => {
      console.log(`${audits[metric].title}: ${audits[metric].displayValue}`);
    });
    
    console.log('\n=== Oportunidades de Melhoria ===');
    Object.keys(audits)
      .filter(key => audits[key].score !== null && audits[key].score < 0.9 && audits[key].details && audits[key].details.type === 'opportunity')
      .forEach(key => {
        console.log(`${audits[key].title}: ${audits[key].displayValue}`);
      });
  } catch (error) {
    console.error('Erro ao executar o Lighthouse:', error);
  } finally {
    // Fechar o Chrome
    await chrome.kill();
  }
})();
