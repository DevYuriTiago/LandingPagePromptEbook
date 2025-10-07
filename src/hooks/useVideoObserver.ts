import { useEffect } from 'react'

export function useVideoObserver(mainVisible: boolean) {
  useEffect(() => {
    const videos = Array.from(document.querySelectorAll<HTMLVideoElement>('video'))
    if (!('IntersectionObserver' in window) || videos.length === 0) return
    
    const obs = new window.IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const video = entry.target as HTMLVideoElement
        if (entry.isIntersecting && video.paused) {
          video.play().catch(() => {})
        } else if (!entry.isIntersecting && !video.paused) {
          video.pause()
        }
      })
    }, { threshold: 0.5 })
    
    videos.forEach(video => obs.observe(video))
    return () => obs.disconnect()
  }, [mainVisible])
}