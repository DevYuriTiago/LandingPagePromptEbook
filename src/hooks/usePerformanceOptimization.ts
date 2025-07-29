import { useEffect, useState } from 'react'

export function usePerformanceOptimization() {
  const [isLowPerformance, setIsLowPerformance] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    // Detecta se o usuário prefere movimento reduzido
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches)
    }

    mediaQuery.addEventListener('change', handleChange)

    // Detecta performance baixa baseado na memória disponível
    if ('deviceMemory' in navigator) {
      const deviceMemory = (navigator as any).deviceMemory
      setIsLowPerformance(deviceMemory < 4) // Menos de 4GB de RAM
    }

    // Detecta conexão lenta
    if ('connection' in navigator) {
      const connection = (navigator as any).connection
      if (connection.effectiveType === '2g' || connection.effectiveType === 'slow-2g') {
        setIsLowPerformance(true)
      }
    }

    return () => {
      mediaQuery.removeEventListener('change', handleChange)
    }
  }, [])

  return {
    shouldReduceMotion: prefersReducedMotion || isLowPerformance,
    isLowPerformance,
    prefersReducedMotion
  }
}
