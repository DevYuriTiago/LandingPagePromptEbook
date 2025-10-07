import { useEffect } from 'react'
import { isMobile, isTouchDevice } from '@/utils'

export function usePerformanceOptimizations() {
  // Reduzir animações em mobile/touch e para quem prefere menos movimento
  useEffect(() => {
    const isTouch = isTouchDevice?.() || isMobile?.()
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (isTouch || prefersReduced) {
      document.body.classList.add('reduce-motion')
    } else {
      document.body.classList.remove('reduce-motion')
    }
  }, [])

  // Pausar marquees quando fora da tela
  useEffect(() => {
    const marquees = Array.from(document.querySelectorAll<HTMLElement>('.marquee-track'))
    if (!('IntersectionObserver' in window) || marquees.length === 0) return
    
    const obs = new window.IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.remove('paused')
        } else {
          entry.target.classList.add('paused')
        }
      })
    }, { threshold: 0.1 })
    
    marquees.forEach(m => obs.observe(m))
    return () => marquees.forEach(m => obs.unobserve(m))
  }, [])

  // Scroll suave para navegação
  useEffect(() => {
    function handleSmoothScroll(e: Event) {
      const target = e.target as HTMLElement
      if (target.tagName === 'A') {
        const anchor = target as HTMLAnchorElement
        if (anchor.hash && anchor.hash.startsWith('#')) {
          const section = document.querySelector(anchor.hash)
          if (section) {
            e.preventDefault()
            section.scrollIntoView({ behavior: 'smooth', block: 'start' })
          }
        }
      }
    }
    
    const nav = document.querySelector('.navbar')
    nav?.addEventListener('click', handleSmoothScroll)
    const cta = document.querySelector('.nav-cta')
    cta?.addEventListener('click', handleSmoothScroll)
    
    return () => {
      nav?.removeEventListener('click', handleSmoothScroll)
      cta?.removeEventListener('click', handleSmoothScroll)
    }
  }, [])
}