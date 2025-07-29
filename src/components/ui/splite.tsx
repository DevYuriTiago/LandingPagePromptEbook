import { Suspense, lazy } from 'react'

const Spline = lazy(() => import('@splinetool/react-spline'))

interface SplineSceneProps {
  scene: string
  className?: string
}

export function SplineScene({ 
  scene, 
  className
}: SplineSceneProps) {
  return (
    <div className={`w-full h-full ${className || ''}`}>
      <Suspense 
        fallback={
          <div className="w-full h-full flex items-center justify-center">
            <div className="animate-pulse bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg p-8">
              <div className="w-16 h-16 bg-blue-500/30 rounded-full mx-auto mb-4 animate-pulse"></div>
              <p className="text-sm text-gray-400 text-center">Carregando robô 3D...</p>
            </div>
          </div>
        }
      >
        <Spline
          scene={scene}
          className="w-full h-full"
          style={{
            willChange: 'transform, opacity',
            transform: 'translateZ(0)'
          }}
        />
      </Suspense>
    </div>
  )
}