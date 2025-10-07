import { cn } from '@/lib/utils'

interface LoadingScreenProps {
  progress: number
}

export function LoadingScreen({ progress }: LoadingScreenProps) {
  return (
    <div className={cn(
      "loading-screen fixed inset-0 bg-black flex flex-col items-center justify-center z-50",
      "transition-opacity duration-500"
    )}>
      <img src="/assets/images/logo_prompts360.png" alt="Prompts360" className="w-48 mb-8 animate-pulse" />
      <div className="w-64 h-2 bg-gray-800 rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-200 ease-out rounded-full"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="text-gray-400 mt-4">{Math.round(progress)}%</p>
    </div>
  )
}