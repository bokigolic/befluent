import { Component } from 'react'

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, info) {
    console.error('[ErrorBoundary]', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          gap: '16px',
          padding: '24px',
          textAlign: 'center',
          background: 'var(--bg)',
          color: 'var(--t2)',
        }}>
          <span style={{ fontSize: 40 }}>⚠️</span>
          <p style={{ fontSize: 18, fontWeight: 600, color: 'var(--t1)', fontFamily: "'Space Grotesk', sans-serif" }}>
            Something went wrong
          </p>
          <p style={{ fontSize: 14, color: 'var(--t3)' }}>Please refresh the page to continue.</p>
          {this.state.error && (
            <p style={{ fontSize: 11, color: 'var(--t3)', fontFamily: 'monospace', maxWidth: 320, wordBreak: 'break-word', opacity: 0.7 }}>
              {this.state.error.message}
            </p>
          )}
          <button
            onClick={() => window.location.reload()}
            style={{
              marginTop: 8,
              padding: '10px 24px',
              borderRadius: 999,
              background: 'var(--acc)',
              color: '#fff',
              border: 'none',
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 700,
              fontSize: 14,
              cursor: 'pointer',
            }}
          >
            Refresh
          </button>
        </div>
      )
    }
    return this.props.children
  }
}
