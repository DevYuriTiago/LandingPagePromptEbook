import React from 'react';

interface LoadingScreenProps {
  progress: number;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ progress }) => {
  return (
    <div 
      id="loading-screen" 
      className="loading-screen"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        color: 'white'
      }}
    >
      <div 
        className="loading-content"
        style={{
          textAlign: 'center',
          animation: 'fadeInUp 0.8s ease-out'
        }}
      >
        {/* Logo com efeito de entrada suave */}
        <div 
          className="loading-logo"
          style={{
            marginBottom: '2rem',
            transform: `scale(${0.8 + (progress * 0.2 / 100)})`,
            transition: 'transform 0.3s ease-out'
          }}
        >
          <img 
            src="/assets/images/logo_prompts360.png" 
            alt="Prompts360" 
            style={{ 
              maxWidth: '200px', 
              height: 'auto',
              filter: 'drop-shadow(0 4px 20px rgba(30, 144, 255, 0.3))'
            }}
          />
        </div>

        {/* Barra de progresso moderna */}
        <div 
          className="loading-progress"
          style={{
            width: '280px',
            margin: '0 auto'
          }}
        >
          <div 
            className="progress-bar"
            style={{
              width: '100%',
              height: '6px',
              background: 'rgba(255,255,255,0.1)',
              borderRadius: '3px',
              overflow: 'hidden',
              marginBottom: '1rem',
              position: 'relative'
            }}
          >
            <div 
              className="progress-fill"
              style={{
                height: '100%',
                background: 'linear-gradient(90deg, #1E90FF, #00BFFF, #87CEEB)',
                borderRadius: '3px',
                width: `${progress}%`,
                transition: 'width 0.3s ease-out',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              {/* Efeito shimmer na barra */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: '-100%',
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
                  animation: progress < 100 ? 'shimmer 1.5s infinite' : 'none'
                }}
              />
            </div>
          </div>
          
          {/* Texto de progresso com animação */}
          <div 
            className="progress-text"
            style={{
              fontSize: '1rem',
              fontWeight: '600',
              color: '#87CEEB',
              transition: 'all 0.3s ease-out'
            }}
          >
            {Math.round(progress)}%
          </div>
          
          {/* Mensagem contextual */}
          <div 
            style={{
              marginTop: '0.5rem',
              fontSize: '0.9rem',
              opacity: 0.7,
              transition: 'opacity 0.3s ease-out'
            }}
          >
            {progress < 30 && "Inicializando experiência..."}
            {progress >= 30 && progress < 70 && "Carregando recursos..."}
            {progress >= 70 && progress < 95 && "Finalizando preparação..."}
            {progress >= 95 && "Pronto! 🚀"}
          </div>
        </div>
      </div>

      {/* Estilos para animações */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          @keyframes shimmer {
            0% { left: -100%; }
            100% { left: 100%; }
          }
        `
      }} />
    </div>
  );
};
