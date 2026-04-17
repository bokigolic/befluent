import { useState, useEffect } from 'react'
import ErrorBoundary from './components/ErrorBoundary'
import Navbar from './components/Navbar/Navbar'
import TabBar from './components/TabBar/TabBar'
import FlagSwitcher from './components/FlagSwitcher/FlagSwitcher'
import SearchBar from './components/SearchBar/SearchBar'
import ResultCard from './components/ResultCard/ResultCard'
import WelcomeScreen from './components/WelcomeScreen/WelcomeScreen'
import HistoryPage from './pages/HistoryPage/HistoryPage'
import useStore from './store/useStore'

const gradientLineStyle = {
  height: 2,
  background: 'linear-gradient(90deg, var(--acc), var(--acc-p), var(--acc-g), var(--acc))',
  backgroundSize: '300% 100%',
  animation: 'gradientMove 4s linear infinite',
}

const scrollBtnStyle = {
  position: 'fixed',
  bottom: 24,
  right: 20,
  width: 40,
  height: 40,
  borderRadius: '50%',
  background: 'var(--acc)',
  color: '#fff',
  border: 'none',
  fontSize: 18,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  boxShadow: '0 4px 20px rgba(124,111,255,0.4)',
  zIndex: 300,
  animation: 'fadeSlideUp 200ms var(--ease)',
  transition: 'opacity 0.2s',
}

function App() {
  const activePage     = useStore((s) => s.activePage)
  const setActivePage  = useStore((s) => s.setActivePage)
  const dictMode       = useStore((s) => s.dictMode)
  const currentWord    = useStore((s) => s.currentWord)
  const setCurrentWord = useStore((s) => s.setCurrentWord)
  const addToHistory   = useStore((s) => s.addToHistory)
  const addXP          = useStore((s) => s.addXP)

  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', '#09090f')
  }, [])

  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 300)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleSearch = (word) => {
    setCurrentWord(word)
    addToHistory(word, dictMode)
    addXP(5)
  }

  const handleWordClick = (word) => {
    setCurrentWord(word)
    addToHistory(word, dictMode)
    addXP(3)
  }

  const handleHistoryClick = (word, mode) => {
    setActivePage('dictionary')
    setCurrentWord(word)
    addToHistory(word, mode)
  }

  return (
    <ErrorBoundary>
      <Navbar />
      <div style={gradientLineStyle} />
      <TabBar />
      <div className="wrap">
        {activePage === 'dictionary' && (
          <>
            <FlagSwitcher />
            <SearchBar onSearch={handleSearch} />
            {!currentWord
              ? <WelcomeScreen onSearch={handleSearch} />
              : (
                <ResultCard
                  word={currentWord}
                  dictMode={dictMode}
                  onWordClick={handleWordClick}
                />
              )
            }
          </>
        )}
        {activePage === 'history' && (
          <HistoryPage onWordClick={handleHistoryClick} />
        )}
      </div>

      {showScrollTop && (
        <button
          style={scrollBtnStyle}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Scroll to top"
        >
          ↑
        </button>
      )}
    </ErrorBoundary>
  )
}

export default App
