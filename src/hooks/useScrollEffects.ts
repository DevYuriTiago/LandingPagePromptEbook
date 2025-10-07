import { useState, useEffect } from 'react'

export function useScrollEffects() {
  const [headerVisible, setHeaderVisible] = useState(false)
  const [showFloatingCTA, setShowFloatingCTA] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      
      if (scrollY > 50) {
        setHeaderVisible(true)
      } else {
        setHeaderVisible(false)
      }

      if (scrollY > window.innerHeight * 0.8) {
        setShowFloatingCTA(true)
      } else {
        setShowFloatingCTA(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return { headerVisible, showFloatingCTA }
}