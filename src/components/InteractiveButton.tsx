import React, { useState, useRef, useEffect } from 'react';

interface InteractiveButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export const InteractiveButton: React.FC<InteractiveButtonProps> = ({
  children,
  onClick,
  href,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  className = '',
  style = {}
}) => {
  const [isPressed, setIsPressed] = useState(false);
  const [ripples, setRipples] = useState<Array<{ x: number; y: number; id: number }>>([]);
  const buttonRef = useRef<HTMLButtonElement | HTMLAnchorElement>(null);

  // Efeito ripple ao clicar
  const createRipple = (event: React.MouseEvent) => {
    if (disabled || loading) return;

    const button = buttonRef.current;
    if (!button) return;

    const rect = button.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const newRipple = {
      x,
      y,
      id: Date.now()
    };

    setRipples(prev => [...prev, newRipple]);

    // Remove ripple após animação
    setTimeout(() => {
      setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id));
    }, 600);

    if (onClick) onClick();
  };

  // Estilos base por variante
  const variantStyles = {
    primary: {
      background: 'linear-gradient(135deg, #1E90FF, #00BFFF)',
      color: 'white',
      border: 'none',
      boxShadow: '0 4px 15px rgba(30, 144, 255, 0.3)'
    },
    secondary: {
      background: 'transparent',
      color: '#1E90FF',
      border: '2px solid #1E90FF',
      boxShadow: 'none'
    },
    ghost: {
      background: 'rgba(255, 255, 255, 0.1)',
      color: 'white',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      boxShadow: 'none'
    }
  };

  // Estilos por tamanho
  const sizeStyles = {
    sm: { padding: '0.5rem 1rem', fontSize: '0.875rem' },
    md: { padding: '0.75rem 1.5rem', fontSize: '1rem' },
    lg: { padding: '1rem 2rem', fontSize: '1.125rem' }
  };

  const buttonStyle: React.CSSProperties = {
    position: 'relative',
    overflow: 'hidden',
    borderRadius: '8px',
    fontWeight: '600',
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
    transform: isPressed ? 'scale(0.98)' : 'scale(1)',
    opacity: disabled ? 0.6 : 1,
    ...variantStyles[variant],
    ...sizeStyles[size],
    ...style
  };

  const rippleElements = ripples.map(ripple => (
    <span
      key={ripple.id}
      style={{
        position: 'absolute',
        left: ripple.x,
        top: ripple.y,
        width: '20px',
        height: '20px',
        background: 'rgba(255, 255, 255, 0.6)',
        borderRadius: '50%',
        transform: 'translate(-50%, -50%)',
        animation: 'ripple 0.6s ease-out',
        pointerEvents: 'none'
      }}
    />
  ));

  // Componente comum
  const ButtonContent = () => (
    <>
      {loading ? (
        <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div
            style={{
              width: '16px',
              height: '16px',
              border: '2px solid currentColor',
              borderTop: '2px solid transparent',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite'
            }}
          />
          Carregando...
        </span>
      ) : (
        children
      )}
      {rippleElements}
    </>
  );

  if (href) {
    return (
      <a
        ref={buttonRef as React.RefObject<HTMLAnchorElement>}
        href={href}
        className={className}
        style={buttonStyle}
        onMouseDown={() => setIsPressed(true)}
        onMouseUp={() => setIsPressed(false)}
        onMouseLeave={() => setIsPressed(false)}
        onClick={createRipple}
      >
        <ButtonContent />
      </a>
    );
  }

  return (
    <button
      ref={buttonRef as React.RefObject<HTMLButtonElement>}
      className={className}
      style={buttonStyle}
      disabled={disabled || loading}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
      onClick={createRipple}
    >
      <ButtonContent />
      
      {/* Estilos das animações */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes ripple {
            to {
              transform: translate(-50%, -50%) scale(4);
              opacity: 0;
            }
          }
          
          @keyframes spin {
            to {
              transform: rotate(360deg);
            }
          }
        `
      }} />
    </button>
  );
};
