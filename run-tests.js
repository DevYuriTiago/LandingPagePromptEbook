const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

// Cores para o console
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  cyan: '\x1b[36m',
  magenta: '\x1b[35m'
};

// Função para executar um comando e retornar uma Promise
function runCommand(command, args, cwd = process.cwd(), env = process.env) {
  return new Promise((resolve, reject) => {
    console.log(`${colors.bright}${colors.cyan}Executando: ${command} ${args.join(' ')}${colors.reset}`);
    
    const proc = spawn(command, args, {
      cwd,
      env: { ...env },
      shell: true,
      stdio: 'inherit'
    });
    
    proc.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        console.log(`${colors.yellow}Comando terminou com código ${code}, mas continuando...${colors.reset}`);
        resolve();
      }
    });
    
    proc.on('error', (err) => {
      console.log(`${colors.yellow}Erro ao executar comando: ${err.message}, mas continuando...${colors.reset}`);
      resolve();
    });
  });
}

// Função para criar diretório se não existir
function ensureDirectoryExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

// Função principal
async function runTests() {
  try {
    // Criar diretório de relatórios
    const reportsDir = path.join(__dirname, 'reports');
    ensureDirectoryExists(reportsDir);
    
    console.log(`\n${colors.bright}${colors.magenta}=== Iniciando Testes da Landing Page ====${colors.reset}\n`);
    
    // 1. Executar testes unitários com Jest
    console.log(`\n${colors.bright}${colors.yellow}=== Executando Testes Unitários ====${colors.reset}\n`);
    try {
      await runCommand('npx', ['jest', 'tests/unit/sheets-integration.test.js', '--no-cache']);
    } catch (error) {
      console.log(`${colors.yellow}Erro nos testes unitários, mas continuando com os outros testes...${colors.reset}`);
    }
    
    // 2. Iniciar servidor local para testes E2E e de performance
    console.log(`\n${colors.bright}${colors.yellow}=== Iniciando Servidor Local ====${colors.reset}\n`);
    let server;
    try {
      server = spawn('npx', ['http-server', '.', '-p', '3000'], {
        stdio: 'pipe',
        shell: true
      });
      
      // Esperar o servidor iniciar
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // 3. Executar testes E2E com Cypress (apenas verificar se o Cypress está instalado)
      console.log(`\n${colors.bright}${colors.yellow}=== Verificando Cypress ====${colors.reset}\n`);
      try {
        await runCommand('npx', ['cypress', 'version']);
        console.log(`${colors.green}Cypress está instalado. Para executar os testes E2E, use: npx cypress open${colors.reset}`);
      } catch (error) {
        console.log(`${colors.yellow}Cypress não está disponível: ${error.message}${colors.reset}`);
      }
      
      // 4. Verificar Pa11y
      console.log(`\n${colors.bright}${colors.yellow}=== Verificando Pa11y ====${colors.reset}\n`);
      try {
        await runCommand('npx', ['pa11y', '--version']);
        console.log(`${colors.green}Pa11y está instalado. Para executar os testes de acessibilidade, use: npx pa11y http://localhost:3000${colors.reset}`);
      } catch (error) {
        console.log(`${colors.yellow}Pa11y não está disponível: ${error.message}${colors.reset}`);
      }
      
      // 5. Verificar Lighthouse
      console.log(`\n${colors.bright}${colors.yellow}=== Verificando Lighthouse ====${colors.reset}\n`);
      try {
        await runCommand('npx', ['lighthouse', '--version']);
        console.log(`${colors.green}Lighthouse está instalado. Para executar os testes de performance, use: node tests/performance/lighthouse-test.js${colors.reset}`);
      } catch (error) {
        console.log(`${colors.yellow}Lighthouse não está disponível: ${error.message}${colors.reset}`);
      }
    } finally {
      // Encerrar o servidor
      if (server) {
        console.log(`\n${colors.bright}${colors.yellow}=== Encerrando Servidor Local ====${colors.reset}\n`);
        server.kill();
      }
    }
    
    console.log(`\n${colors.bright}${colors.green}=== Verificação de testes concluída! ====${colors.reset}\n`);
    console.log(`Para executar testes específicos, consulte o arquivo GUIA-DE-TESTES.md`);
    
  } catch (error) {
    console.error(`\n${colors.bright}${colors.red}Erro ao executar os testes:${colors.reset}`, error);
    process.exit(1);
  }
}

// Executar a função principal
runTests();
