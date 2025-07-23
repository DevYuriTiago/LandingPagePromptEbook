import React from 'react'
import { ArrowRight, Play, Star } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { useIntersectionObserver } from '@/hooks'
import { cn, scrollToElement } from '@/utils'

export function Hero() {
  const { ref, isIntersecting } = useIntersectionObserver(0.3, '0px', true)

  const handleCTAClick = () => {
    scrollToElement('contact')
  }

  const handleWatchVideoClick = () => {
    // Implementar modal de vídeo ou scroll para seção de vídeos
    scrollToElement('cases')
  }

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-dark-950 via-dark-900 to-dark-950" />
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary-600/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary-400/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      </div>

      <div ref={ref} className="container-custom px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-5xl mx-auto">
          {/* Badge */}
          <div className={cn(
            'inline-flex items-center px-4 py-2 rounded-full bg-primary-600/20 border border-primary-600/30 text-primary-300 text-sm font-medium mb-8 transition-all duration-1000',
            isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          )}>
            <Star className="w-4 h-4 mr-2 fill-current" />
            ROI médio de 300% para nossos clientes
          </div>

          {/* Main Heading */}
          <h1 className={cn(
            'text-responsive-xl font-bold text-white mb-6 transition-all duration-1000 delay-200',
            isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          )}>
            Transforme Seu{' '}
            <span className="text-gradient bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
              Pequeno Negócio
            </span>{' '}
            em uma{' '}
            <span className="text-gradient bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
              Grande Estrutura
            </span>
          </h1>

          {/* Subtitle */}
          <p className={cn(
            'text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed transition-all duration-1000 delay-400',
            isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          )}>
            A Prompts360 é a aceleradora digital que revoluciona pequenos negócios e microinfluenciadores 
            com IA, automação e marketing inteligente.
          </p>

          {/* Stats */}
          <div className={cn(
            'flex flex-wrap justify-center gap-8 mb-12 transition-all duration-1000 delay-600',
            isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          )}>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary-400">300%</div>
              <div className="text-sm text-gray-400">ROI Médio</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary-400">500+</div>
              <div className="text-sm text-gray-400">Clientes Atendidos</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary-400">24h</div>
              <div className="text-sm text-gray-400">Suporte Ativo</div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className={cn(
            'flex flex-col sm:flex-row gap-4 justify-center items-center transition-all duration-1000 delay-800',
            isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          )}>
            <Button
              onClick={handleCTAClick}
              variant="primary"
              size="lg"
              className="group min-w-[200px]"
            >
              Acelerar Meu Negócio
              <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Button>
            
            <Button
              onClick={handleWatchVideoClick}
              variant="outline"
              size="lg"
              className="min-w-[200px]"
            >
              <Play className="mr-2 w-5 h-5" />
              Ver Casos de Sucesso
            </Button>
          </div>

          {/* Social Proof */}
          <div className={cn(
            'mt-16 transition-all duration-1000 delay-1000',
            isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          )}>
            <p className="text-gray-500 text-sm mb-6">Confiado por empresas de todos os tamanhos</p>
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
              {/* Logos dos clientes - pode ser implementado depois */}
              <div className="w-24 h-12 bg-gray-700/50 rounded-lg flex items-center justify-center">
                <span className="text-xs text-gray-500">Cliente 1</span>
              </div>
              <div className="w-24 h-12 bg-gray-700/50 rounded-lg flex items-center justify-center">
                <span className="text-xs text-gray-500">Cliente 2</span>
              </div>
              <div className="w-24 h-12 bg-gray-700/50 rounded-lg flex items-center justify-center">
                <span className="text-xs text-gray-500">Cliente 3</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  )
}
