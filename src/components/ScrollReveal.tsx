import React from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';

interface ScrollRevealProps {
  children: React.ReactNode;
  animation?: 'fadeInUp' | 'fadeInLeft' | 'fadeInRight' | 'fadeIn' | 'scaleIn' | 'slideInUp';
  delay?: number;
  duration?: number;
  threshold?: number;
  className?: string;
  style?: React.CSSProperties;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  animation = 'fadeInUp',
  delay = 0,
  duration = 600,
  threshold = 0.1,
  className = '',
  style = {}
}) => {
  const { elementRef, isVisible } = useScrollReveal({
    threshold,
    delay,
    triggerOnce: true
  });

  const getAnimationStyles = () => {
    const baseStyles = {
      transition: `all ${duration}ms cubic-bezier(0.4, 0, 0.2, 1)`,
      transitionDelay: `${delay}ms`
    };

    if (!isVisible) {
      switch (animation) {
        case 'fadeInUp':
          return {
            ...baseStyles,
            opacity: 0,
            transform: 'translateY(40px)'
          };
        case 'fadeInLeft':
          return {
            ...baseStyles,
            opacity: 0,
            transform: 'translateX(-40px)'
          };
        case 'fadeInRight':
          return {
            ...baseStyles,
            opacity: 0,
            transform: 'translateX(40px)'
          };
        case 'fadeIn':
          return {
            ...baseStyles,
            opacity: 0
          };
        case 'scaleIn':
          return {
            ...baseStyles,
            opacity: 0,
            transform: 'scale(0.8)'
          };
        case 'slideInUp':
          return {
            ...baseStyles,
            opacity: 0,
            transform: 'translateY(60px)'
          };
        default:
          return {
            ...baseStyles,
            opacity: 0,
            transform: 'translateY(40px)'
          };
      }
    }

    return {
      ...baseStyles,
      opacity: 1,
      transform: 'translateY(0) translateX(0) scale(1)'
    };
  };

  return (
    <div
      ref={elementRef}
      className={className}
      style={{
        ...getAnimationStyles(),
        ...style
      }}
    >
      {children}
    </div>
  );
};
