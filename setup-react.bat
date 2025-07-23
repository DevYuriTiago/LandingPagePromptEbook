@echo off
echo 🚀 Configurando projeto React para Prompts360...
echo.

echo 📦 Instalando dependencias principais...
call npm install react@^18.2.0 react-dom@^18.2.0

echo 📦 Instalando dependencias de desenvolvimento...
call npm install --save-dev @types/react@^18.2.37 @types/react-dom@^18.2.15
call npm install --save-dev @vitejs/plugin-react@^4.1.0
call npm install --save-dev typescript@^5.2.2
call npm install --save-dev vite@^4.5.0

echo 🎨 Instalando Tailwind CSS...
call npm install --save-dev tailwindcss@^3.3.5 postcss@^8.4.31 autoprefixer@^10.4.16

echo 📚 Instalando bibliotecas adicionais...
call npm install framer-motion@^10.16.4
call npm install react-intersection-observer@^9.5.2
call npm install react-player@^2.13.0
call npm install lucide-react@^0.294.0
call npm install clsx@^2.0.0
call npm install tailwind-merge@^2.0.0

echo 🛠️ Instalando ferramentas de desenvolvimento...
call npm install --save-dev eslint@^8.53.0
call npm install --save-dev @typescript-eslint/eslint-plugin@^6.10.0
call npm install --save-dev @typescript-eslint/parser@^6.10.0
call npm install --save-dev eslint-plugin-react@^7.33.2
call npm install --save-dev eslint-plugin-react-hooks@^4.6.0
call npm install --save-dev eslint-plugin-react-refresh@^0.4.4

echo 🧪 Instalando ferramentas de teste...
call npm install --save-dev vitest@^0.34.6
call npm install --save-dev @vitest/ui@^0.34.6
call npm install --save-dev @vitest/coverage-v8@^0.34.6

echo.
echo ✅ Instalação concluída!
echo.
echo 📋 Próximos passos:
echo 1. Execute 'npm run dev' para iniciar o servidor de desenvolvimento
echo 2. Acesse http://localhost:3000 para ver o projeto
echo 3. Comece a desenvolver na pasta src/
echo.
echo 🎯 Comandos disponíveis:
echo - npm run dev          # Servidor de desenvolvimento
echo - npm run build        # Build de produção
echo - npm run preview      # Preview do build
echo - npm run lint         # Verificar linting
echo - npm run test         # Executar testes
echo.
pause
