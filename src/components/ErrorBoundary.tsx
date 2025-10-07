import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div 
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            background: '#0a0a0a',
            color: 'white',
            padding: '2rem',
            textAlign: 'center'
          }}
        >
          <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>
            Oops! Algo deu errado
          </h1>
          <p style={{ marginBottom: '2rem', opacity: 0.8 }}>
            Estamos corrigindo o problema. Tente recarregar a página.
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{
              background: 'linear-gradient(135deg, #1E90FF, #87CEEB)',
              border: 'none',
              padding: '1rem 2rem',
              borderRadius: '8px',
              color: 'white',
              fontSize: '1rem',
              cursor: 'pointer',
              fontWeight: '600'
            }}
          >
            Recarregar Página
          </button>
          {this.state.error && (
            <details style={{ marginTop: '2rem', opacity: 0.6 }}>
              <summary>Detalhes técnicos</summary>
              <pre style={{ fontSize: '0.8rem', marginTop: '1rem', textAlign: 'left' }}>
                {this.state.error.toString()}
              </pre>
            </details>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}
