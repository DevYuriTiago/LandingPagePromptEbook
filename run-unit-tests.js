const { spawn } = require('child_process');
const path = require('path');

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
function runCommand(command, args, cwd = process.cwd()) {
  return new Promise((resolve, reject) => {
    console.log(`${colors.bright}${colors.cyan}Executando: ${command} ${args.join(' ')}${colors.reset}`);
    
    const proc = spawn(command, args, {
      cwd,
      shell: true,
      stdio: 'inherit'
    });
    
    proc.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Comando falhou com código de saída ${code}`));
      }
    });
    
    proc.on('error', (err) => {
      reject(err);
    });
  });
}

// Função principal
async function runUnitTests() {
  try {
    console.log(`\n${colors.bright}${colors.magenta}=== Iniciando Testes Unitários da Landing Page ====${colors.reset}\n`);
    
    // Executar testes unitários com Jest
    console.log(`\n${colors.bright}${colors.yellow}=== Executando Teste de Integração com Google Sheets ====${colors.reset}\n`);
    await runCommand('npx', ['jest', 'tests/unit/sheets-integration.test.js', '--no-cache']);
    
    console.log(`\n${colors.bright}${colors.green}=== Testes unitários concluídos com sucesso! ====${colors.reset}\n`);
    
  } catch (error) {
    console.error(`\n${colors.bright}${colors.red}Erro ao executar os testes:${colors.reset}`, error);
    process.exit(1);
  }
}

// Executar a função principal
runUnitTests();
