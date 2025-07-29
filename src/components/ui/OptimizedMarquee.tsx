import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'
import { usePerformanceOptimization } from '@/hooks/usePerformanceOptimization'
import { ReactNode, useEffect } from 'react'

interface OptimizedMarqueeProps {
  children: ReactNode
  className?: string
  speed?: 'slow' | 'normal' | 'fast'
  direction?: 'left' | 'right'
  pauseOnHover?: boolean
}

export function OptimizedMarquee({ 
  children, 
  className = '', 
  speed = 'normal',
  direction = 'left',
  pauseOnHover = true
}: OptimizedMarqueeProps) {
  const { elementRef, isVisible } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '100px'
  })
  const { shouldReduceMotion } = usePerformanceOptimization()

  const speedValues = {
    slow: '30s',
    normal: '20s',
    fast: '15s'
  }

  const animationName = direction === 'left' ? 'marquee' : 'marquee-reverse'

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    // Pausa a animação quando não está visível para economizar recursos
    if (isVisible && !shouldReduceMotion) {
      element.style.animationPlayState = 'running'
    } else {
      element.style.animationPlayState = 'paused'
    }
  }, [isVisible, shouldReduceMotion])

  return (
    <div 
      ref={elementRef as any}
      className={`marquee-container ${className}`}
      style={{
        '--duration': shouldReduceMotion ? '60s' : speedValues[speed],
        '--animation-name': shouldReduceMotion ? 'none' : animationName
      } as any}
    >
      <div 
        className={`marquee-track ${pauseOnHover ? 'pause-on-hover' : ''}`}
        style={{
          animationName: shouldReduceMotion ? 'none' : animationName,
          animationDuration: shouldReduceMotion ? '60s' : speedValues[speed],
          animationPlayState: isVisible && !shouldReduceMotion ? 'running' : 'paused'
        }}
      >
        {children}
      </div>
      <div 
        className={`marquee-track ${pauseOnHover ? 'pause-on-hover' : ''}`}
        style={{
          animationName: shouldReduceMotion ? 'none' : animationName,
          animationDuration: shouldReduceMotion ? '60s' : speedValues[speed],
          animationPlayState: isVisible && !shouldReduceMotion ? 'running' : 'paused'
        }}
      >
        {children}
      </div>
    </div>
  )
}
