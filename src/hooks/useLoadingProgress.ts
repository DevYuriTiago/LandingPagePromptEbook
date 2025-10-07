import { useState, useEffect } from 'react'

export function useLoadingProgress() {
  const [loading, setLoading] = useState(true)
  const [progress, setProgress] = useState(0)
  const [mainVisible, setMainVisible] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => {
            setLoading(false)
            setMainVisible(true)
          }, 500)
          return 100
        }
        return prev + Math.random() * 10
      })
    }, 100)

    return () => clearInterval(interval)
  }, [])

  return { loading, progress, mainVisible }
}