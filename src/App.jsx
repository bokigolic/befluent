function App() {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
    }}>
      <h1 style={{
        fontFamily: "'Space Grotesk', sans-serif",
        fontWeight: 800,
        fontSize: 'clamp(2.5rem, 8vw, 5rem)',
        background: 'linear-gradient(135deg, var(--acc) 0%, var(--acc-p) 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        letterSpacing: '-0.02em',
        animation: 'fadeSlideUp 0.6s var(--ease) both',
      }}>
        BeFluent
      </h1>
    </div>
  )
}

export default App
