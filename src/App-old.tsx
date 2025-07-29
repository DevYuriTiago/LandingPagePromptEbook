function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white overflow-x-hidden">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-gray-900/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <img src="/logo_prompts360.png" alt="Prompts360 Logo" className="h-10" />
            <nav className="hidden md:flex space-x-8">
              <a href="#services" className="text-gray-300 hover:text-white transition-colors">Serviços</a>
              <a href="#benefits" className="text-gray-300 hover:text-white transition-colors">Benefícios</a>
              <a href="#cases-section" className="text-gray-300 hover:text-white transition-colors">Cases</a>
              <a href="#footer" className="text-gray-300 hover:text-white transition-colors">Contato</a>
            </nav>
            <a href="#lead-form" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors">
              Diagnóstico Gratuito
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative pt-16">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"></div>
        
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className="text-center lg:text-left">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                <span className="block text-white">Aceleradora Digital para</span>
                <span className="block bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                  Pequenos Negócios
                </span>
                <span className="block text-white">e Microinfluenciadores</span>
              </h1>
              
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                <strong>Nosso trabalho é transformar pequenos negócios em grandes estruturas</strong>, 
                com tecnologia, IA e marketing inteligente. Focamos em <strong>microempresas e microinfluenciadores 
                que têm visão de crescimento</strong> e querem estrutura para jogar grande.
              </p>

              {/* Benefits */}
              <div className="space-y-4 mb-8">
                <div className="flex items-center justify-center lg:justify-start space-x-3">
                  <span className="text-2xl">💰</span>
                  <span className="text-lg font-semibold text-blue-400">ROI médio de 300% em 90 dias</span>
                </div>
                <div className="flex items-center justify-center lg:justify-start space-x-3">
                  <span className="text-2xl">⚡</span>
                  <span className="text-lg font-semibold text-blue-400">Redução de 60% nos custos operacionais</span>
                </div>
                <div className="flex items-center justify-center lg:justify-start space-x-3">
                  <span className="text-2xl">📈</span>
                  <span className="text-lg font-semibold text-blue-400">Aumento de 45% na receita mensal</span>
                </div>
              </div>

              {/* Stats */}
              <div className="flex justify-center lg:justify-start gap-8 mb-8">
                <div className="text-center border border-blue-600/30 bg-blue-600/10 rounded-lg p-4">
                  <div className="text-3xl font-bold text-blue-400">50</div>
                  <div className="text-sm text-gray-400">Negócios Acelerados</div>
                </div>
                <div className="text-center border border-blue-600/30 bg-blue-600/10 rounded-lg p-4">
                  <div className="text-3xl font-bold text-blue-400">300%</div>
                  <div className="text-sm text-gray-400">ROI Médio</div>
                </div>
                <div className="text-center border border-blue-600/30 bg-blue-600/10 rounded-lg p-4">
                  <div className="text-3xl font-bold text-blue-400">45%</div>
                  <div className="text-sm text-gray-400">Aumento em Vendas</div>
                </div>
              </div>
              
              <a href="#lead-form" className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-4 px-8 rounded-lg text-lg transition-all transform hover:scale-105">
                Quero Acelerar Meu Negócio Agora
              </a>
            </div>

            {/* Visual Elements */}
            <div className="hidden lg:flex justify-center items-center">
              <div className="relative w-full h-96">
                {/* Floating cubes */}
                <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg animate-float shadow-lg flex items-center justify-center text-white font-bold">
                  IA
                </div>
                <div className="absolute top-20 right-0 w-24 h-24 bg-gradient-to-r from-green-500 to-blue-600 rounded-lg animate-float shadow-lg flex items-center justify-center text-white font-bold" style={{animationDelay: '1s'}}>
                  WEB
                </div>
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-28 h-28 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg animate-float shadow-lg flex items-center justify-center text-white font-bold" style={{animationDelay: '2s'}}>
                  ROI
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gray-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Como Aceleramos Pequenos Negócios e Microinfluenciadores
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Soluções de IA, Automação e Marketing Digital personalizadas para transformar pequenos negócios em grandes estruturas
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Service 1 */}
            <div className="bg-gray-900 p-8 rounded-xl border border-gray-700 hover:border-blue-500 transition-colors">
              <div className="text-4xl mb-4">🌐</div>
              <h3 className="text-2xl font-bold text-white mb-4">Estrutura Digital Completa</h3>
              <p className="text-gray-300 mb-6">
                Sites, Sistemas e Plataformas para negócios modernos. Crie a base sólida que seu negócio precisa para crescer.
              </p>
              <ul className="text-gray-400 space-y-2">
                <li>• Websites profissionais responsivos</li>
                <li>• Sistemas internos personalizados</li>
                <li>• Plataformas de vendas integradas</li>
                <li>• Integrações com ferramentas existentes</li>
              </ul>
            </div>

            {/* Service 2 */}
            <div className="bg-gray-900 p-8 rounded-xl border border-gray-700 hover:border-blue-500 transition-colors">
              <div className="text-4xl mb-4">🤖</div>
              <h3 className="text-2xl font-bold text-white mb-4">IA e Automação para Ganhar Escala</h3>
              <p className="text-gray-300 mb-6">
                Automatize vendas, processos e atendimento com inteligência artificial. Chatbots e automações que trabalham 24/7.
              </p>
              <ul className="text-gray-400 space-y-2">
                <li>• IA para vendas e atendimento</li>
                <li>• Chatbots inteligentes</li>
                <li>• Automações de processos</li>
                <li>• Inteligência comercial avançada</li>
              </ul>
            </div>

            {/* Service 3 */}
            <div className="bg-gray-900 p-8 rounded-xl border border-gray-700 hover:border-blue-500 transition-colors">
              <div className="text-4xl mb-4">📈</div>
              <h3 className="text-2xl font-bold text-white mb-4">Otimização de Vendas & Performance</h3>
              <p className="text-gray-300 mb-6">
                Estratégias de marketing digital e otimização para maximizar resultados e aumentar conversões.
              </p>
              <ul className="text-gray-400 space-y-2">
                <li>• Funis de vendas otimizados</li>
                <li>• Marketing digital estratégico</li>
                <li>• Análise de performance</li>
                <li>• Otimização de conversões</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-20 bg-gray-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Por Que Escolher a Prompts360?</h2>
            <p className="text-xl text-gray-300">Resultados comprovados que fazem a diferença</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-blue-600/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Resultados Rápidos</h3>
              <p className="text-gray-400">Primeiros resultados em 30 dias</p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-600/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Foco em ROI</h3>
              <p className="text-gray-400">Cada investimento gera retorno mensurável</p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-600/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🤝</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Suporte Total</h3>
              <p className="text-gray-400">Acompanhamento e suporte contínuo</p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-600/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🚀</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Escalabilidade</h3>
              <p className="text-gray-400">Soluções que crescem com seu negócio</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="lead-form" className="py-20 bg-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Pronto para Acelerar seu Negócio?</h2>
            <p className="text-xl text-gray-300">Agende uma conversa gratuita e descubra como podemos transformar seu negócio</p>
          </div>
          
          <div className="bg-gray-900 p-8 rounded-xl border border-gray-700">
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white font-medium mb-2">Nome</label>
                  <input type="text" className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500" placeholder="Seu nome completo" />
                </div>
                <div>
                  <label className="block text-white font-medium mb-2">Email</label>
                  <input type="email" className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500" placeholder="seu@email.com" />
                </div>
              </div>
              
              <div>
                <label className="block text-white font-medium mb-2">WhatsApp</label>
                <input type="tel" className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500" placeholder="(11) 99999-9999" />
              </div>
              
              <div>
                <label className="block text-white font-medium mb-2">Conte sobre seu negócio</label>
                <textarea rows={4} className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500" placeholder="Descreva seu negócio e principais desafios..."></textarea>
              </div>
              
              <button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-4 px-8 rounded-lg text-lg transition-all transform hover:scale-105">
                Quero Meu Diagnóstico Gratuito
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="footer" className="bg-gray-900 py-12 border-t border-gray-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <img src="/logo_prompts360.png" alt="Prompts360" className="h-12 mx-auto mb-4" />
            <p className="text-gray-400 mb-4">Transformando pequenos negócios em grandes estruturas</p>
            <div className="flex justify-center space-x-6">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Política de Privacidade</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Termos de Uso</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Contato</a>
            </div>
            <p className="text-gray-500 text-sm mt-8">© 2025 Prompts360. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
