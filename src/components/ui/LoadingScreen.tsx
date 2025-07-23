import React from 'react'
import { cn } from '@/utils'

interface LoadingScreenProps {
  className?: string
}

export function LoadingScreen({ className }: LoadingScreenProps) {
  return (
    <div className={cn(
      "fixed inset-0 z-50 flex items-center justify-center bg-dark-950",
      className
    )}>
      <div className="text-center">
        {/* Logo */}
        <div className="mb-8">
          <img 
            src="/logo_prompts360.png" 
            alt="Prompts360" 
            className="w-24 h-24 mx-auto animate-pulse-glow"
          />
        </div>
        
        {/* Loading Animation */}
        <div className="flex items-center justify-center space-x-2 mb-4">
          <div className="w-3 h-3 bg-primary-600 rounded-full animate-bounce"></div>
          <div className="w-3 h-3 bg-primary-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-3 h-3 bg-primary-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
        
        {/* Loading Text */}
        <p className="text-gray-400 text-sm animate-fade-in">
          Carregando experiência incrível...
        </p>
      </div>
    </div>
  )
}
