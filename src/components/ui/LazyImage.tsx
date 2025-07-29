import { useState } from 'react'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'

interface LazyImageProps {
  src: string
  alt: string
  className?: string
  placeholderClassName?: string
  loading?: 'lazy' | 'eager'
}

export function LazyImage({ 
  src, 
  alt, 
  className = '', 
  placeholderClassName = '',
  loading = 'lazy'
}: LazyImageProps) {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)
  const { elementRef, isVisible } = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: true
  })

  const handleImageLoad = () => {
    setImageLoaded(true)
  }

  const handleImageError = () => {
    setImageError(true)
  }

  // Placeholder simples para quando a imagem está carregando
  if (!isVisible) {
    return (
      <div 
        ref={elementRef as any}
        className={`${placeholderClassName} bg-gradient-to-r from-gray-800 to-gray-700 animate-pulse`}
      >
        <div className="w-full h-full flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    )
  }

  if (imageError) {
    return (
      <div className={`${placeholderClassName} bg-gray-800 flex items-center justify-center`}>
        <span className="text-gray-400 text-sm">Imagem não disponível</span>
      </div>
    )
  }

  return (
    <div className="relative">
      {!imageLoaded && (
        <div className={`absolute inset-0 ${placeholderClassName} bg-gradient-to-r from-gray-800 to-gray-700 animate-pulse`}>
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
      )}
      <img
        src={src}
        alt={alt}
        className={`${className} ${imageLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
        loading={loading}
        onLoad={handleImageLoad}
        onError={handleImageError}
        style={{
          willChange: 'opacity',
          transform: 'translateZ(0)'
        }}
      />
    </div>
  )
}
