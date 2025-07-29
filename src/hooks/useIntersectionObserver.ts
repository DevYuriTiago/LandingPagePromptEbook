import { useEffect, useState, useRef } from 'react'

interface UseIntersectionObserverOptions {
  threshold?: number
  rootMargin?: string
  triggerOnce?: boolean
}

export function useIntersectionObserver(
  options: UseIntersectionObserverOptions = {}
) {
  const [isVisible, setIsVisible] = useState(false)
  const [hasBeenVisible, setHasBeenVisible] = useState(false)
  const elementRef = useRef<HTMLElement>(null)

  const {
    threshold = 0.1,
    rootMargin = '0px',
    triggerOnce = false
  } = options

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const isIntersecting = entry.isIntersecting
          
          setIsVisible(isIntersecting)
          
          if (isIntersecting && !hasBeenVisible) {
            setHasBeenVisible(true)
          }
          
          // Se triggerOnce for true e já foi visível, para de observar
          if (triggerOnce && isIntersecting) {
            observer.unobserve(element)
          }
        })
      },
      {
        threshold,
        rootMargin
      }
    )

    observer.observe(element)

    return () => {
      observer.unobserve(element)
    }
  }, [threshold, rootMargin, triggerOnce, hasBeenVisible])

  return {
    elementRef,
    isVisible,
    hasBeenVisible
  }
}
