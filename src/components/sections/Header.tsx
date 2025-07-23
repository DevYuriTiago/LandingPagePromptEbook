import React, { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { cn, scrollToElement } from '@/utils'
import { useScrollDirection } from '@/hooks'

const navigationItems = [
  { label: 'Início', href: '#hero' },
  { label: 'Benefícios', href: '#benefits' },
  { label: 'Casos', href: '#cases' },
  { label: 'Depoimentos', href: '#testimonials' },
  { label: 'Preços', href: '#pricing' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contato', href: '#contact' },
]

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const scrollDirection = useScrollDirection()

  const handleNavClick = (href: string) => {
    const elementId = href.replace('#', '')
    scrollToElement(elementId)
    setIsMenuOpen(false)
  }

  return (
    <header className={cn(
      'fixed top-0 left-0 right-0 z-50 transition-transform duration-300',
      'bg-dark-950/80 backdrop-blur-md border-b border-white/10',
      scrollDirection === 'down' ? '-translate-y-full' : 'translate-y-0'
    )}>
      <div className="container-custom px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <img
              src="/logo_prompts360.png"
              alt="Prompts360"
              className="h-10 w-auto"
            />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <button
                key={item.href}
                onClick={() => handleNavClick(item.href)}
                className="text-gray-300 hover:text-white transition-colors duration-200 font-medium"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <Button
              onClick={() => handleNavClick('#contact')}
              variant="primary"
              size="md"
            >
              Começar Agora
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-white p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-white/10">
            <nav className="flex flex-col space-y-4">
              {navigationItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => handleNavClick(item.href)}
                  className="text-left text-gray-300 hover:text-white transition-colors duration-200 font-medium py-2"
                >
                  {item.label}
                </button>
              ))}
              <div className="pt-4 border-t border-white/10">
                <Button
                  onClick={() => handleNavClick('#contact')}
                  variant="primary"
                  size="md"
                  className="w-full"
                >
                  Começar Agora
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
