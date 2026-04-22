import { useState, useEffect, useCallback, useRef, lazy, Suspense } from 'react'
import ErrorBoundary from './components/ErrorBoundary'
import CustomCursor from './components/CustomCursor/CustomCursor'
import ParallaxBackground from './components/ParallaxBackground/ParallaxBackground'
import BottomNav from './components/BottomNav/BottomNav'
import ShortcutsOverlay from './components/ShortcutsOverlay/ShortcutsOverlay'
import Navbar from './components/Navbar/Navbar'
import TabBar from './components/TabBar/TabBar'
import FlagSwitcher from './components/FlagSwitcher/FlagSwitcher'
import SearchBar from './components/SearchBar/SearchBar'
import ResultCard from './components/ResultCard/ResultCard'
import WelcomeScreen from './components/WelcomeScreen/WelcomeScreen'
import SplashScreen from './components/SplashScreen/SplashScreen'
import Onboarding from './components/Onboarding/Onboarding'
import Achievements from './components/Achievements/Achievements'
import OfflineBanner from './components/OfflineBanner/OfflineBanner'
import BackgroundEffects from './components/BackgroundEffects/BackgroundEffects'
import GrammarDetailPage from './features/grammar/GrammarDetailPage'
import GrammarSection from './features/grammar/GrammarSection'
import AdaptiveDashboard from './features/adaptive/AdaptiveDashboard'
import { CATEGORIES } from './features/grammar/GrammarSection'
import PWAInstallBanner from './components/PWAInstallBanner/PWAInstallBanner'
import useStore from './store/useStore'
import { LEVEL_INFO } from './features/adaptive/adaptiveEngine'
import { useSwipeNavigation } from './hooks/useSwipeNavigation'

const HistoryPage        = lazy(() => import('./pages/HistoryPage/HistoryPage'))
const SavedPage          = lazy(() => import('./pages/SavedPage/SavedPage'))
const ProfilePage        = lazy(() => import('./pages/ProfilePage/ProfilePage'))
const QuizPage           = lazy(() => import('./pages/QuizPage/QuizPage'))
const IrregularVerbsPage = lazy(() => import('./pages/IrregularVerbsPage/IrregularVerbsPage'))
const GrammarPage        = lazy(() => import('./pages/GrammarPage/GrammarPage'))
const ReviewPage         = lazy(() => import('./features/review/ReviewPage'))
const ProgressPage       = lazy(() => import('./features/progress/ProgressPage'))
const SettingsPage       = lazy(() => import('./pages/SettingsPage/SettingsPage'))
const WritingPage        = lazy(() => import('./features/writing/WritingPage'))
const TopicsPage         = lazy(() => import('./features/topics/TopicsPage'))
const NewsPage           = lazy(() => import('./features/news/NewsPage'))
const IdiomsPage         = lazy(() => import('./features/idioms/IdiomsPage'))

const shouldShowSplash = () =>
  !localStorage.getItem('bf_launched') ||
  new URLSearchParams(window.location.search).get('splash') === '1'

const shouldShowOnboarding = () =>
  !localStorage.getItem('bf_onboarded')

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

const skelFallback = <div className="suspenseSkel" />

// ── Level-up overlay (adaptive) ───────────────────────────────────────────────
const levelUpOverlayStyle = {
  position: 'fixed', inset: 0, zIndex: 9999,
  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
  background: 'rgba(9,9,15,0.88)', backdropFilter: 'blur(16px)',
  animation: 'fadeSlideUp 300ms var(--ease) both',
  cursor: 'pointer',
}
const levelUpLabelStyle = {
  fontFamily: "'Space Grotesk', sans-serif", fontWeight: 900, fontSize: 13,
  letterSpacing: '0.18em', color: 'var(--t3)', textTransform: 'uppercase', marginBottom: 12,
}
const levelUpNameStyle = {
  fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: 48,
  background: 'linear-gradient(135deg, var(--acc), var(--acc-p))',
  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
  lineHeight: 1.1, textAlign: 'center',
}
const levelUpSubStyle = {
  marginTop: 12, fontSize: 14, color: 'var(--t3)',
}

function LevelUpOverlay({ notification, onDismiss }) {
  const info = LEVEL_INFO[notification?.level] ?? LEVEL_INFO.beginner
  useEffect(() => {
    const t = setTimeout(onDismiss, 2800)
    return () => clearTimeout(t)
  }, [onDismiss])
  return (
    <div style={levelUpOverlayStyle} onClick={onDismiss}>
      <div style={levelUpLabelStyle}>LEVEL UP!</div>
      <div style={levelUpNameStyle}>{info.emoji} {info.label}</div>
      <div style={levelUpSubStyle}>Tap to continue</div>
    </div>
  )
}

// ── Grammar nudge toast ───────────────────────────────────────────────────────
const nudgeToastStyle = {
  position: 'fixed', bottom: 90, left: '50%', transform: 'translateX(-50%)',
  background: 'var(--surface)', border: '1px solid rgba(255,169,77,0.4)',
  borderRadius: 'var(--radius)', padding: '12px 16px',
  display: 'flex', alignItems: 'center', gap: 10, zIndex: 500,
  boxShadow: '0 8px 32px rgba(0,0,0,0.45)', animation: 'fadeSlideUp 250ms var(--ease) both',
  maxWidth: 340, width: 'calc(100% - 32px)',
}
const nudgeTextStyle = { flex: 1, fontSize: 13, color: 'var(--t2)', lineHeight: 1.4 }
const nudgeBtnStyle = {
  flexShrink: 0, padding: '7px 12px', border: 'none', borderRadius: 'var(--radius-sm)',
  background: 'var(--acc-a)', color: '#fff',
  fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 12, cursor: 'pointer',
}

function GrammarNudgeToast({ weakCategory, onPractice, onDismiss }) {
  useEffect(() => {
    const t = setTimeout(onDismiss, 6000)
    return () => clearTimeout(t)
  }, [onDismiss])
  return (
    <div style={nudgeToastStyle}>
      <span>💪</span>
      <span style={nudgeTextStyle}>
        Your weakest area is <strong>{weakCategory}</strong> — practice it today?
      </span>
      <button style={nudgeBtnStyle} onClick={onPractice}>Go</button>
    </div>
  )
}

function App() {
  const activePage     = useStore(s => s.activePage)
  const setActivePage  = useStore(s => s.setActivePage)
  const dictMode       = useStore(s => s.dictMode)
  const currentWord    = useStore(s => s.currentWord)
  const setCurrentWord = useStore(s => s.setCurrentWord)
  const addToHistory   = useStore(s => s.addToHistory)
  const addXP          = useStore(s => s.addXP)
  const notifications  = useStore(s => s.notifications)
  const dismissNotification = useStore(s => s.dismissNotification)
  const adaptiveData   = useStore(s => s.adaptiveData)
  const setActiveGrammarCategory = useStore(s => s.setActiveGrammarCategory)

  const activeGrammarCategory = useStore(s => s.activeGrammarCategory)
  const showSettings          = useStore(s => s.showSettings)
  const setShowSettings       = useStore(s => s.setShowSettings)

  const [splashDone,      setSplashDone]      = useState(!shouldShowSplash())
  const [onboardDone,     setOnboardDone]     = useState(!shouldShowOnboarding())
  const [showScrollTop,   setShowScrollTop]   = useState(false)
  const [quizOpen,        setQuizOpen]        = useState(false)
  const [showNudge,       setShowNudge]       = useState(false)
  const [showShortcuts,   setShowShortcuts]   = useState(false)
  const nudgeShownRef   = useRef(false)
  const touchStartX     = useRef(0)
  const touchStartTime  = useRef(0)
  const mainRef         = useRef(null)

  useSwipeNavigation(mainRef)

  const TAB_ORDER = ['dictionary','verbs','review','grammar','writing','progress','history','saved','profile']

  const goToNextTab = useCallback(() => {
    const idx = TAB_ORDER.indexOf(activePage)
    if (idx < TAB_ORDER.length - 1) setActivePage(TAB_ORDER[idx + 1])
  }, [activePage, setActivePage])

  const goToPrevTab = useCallback(() => {
    const idx = TAB_ORDER.indexOf(activePage)
    if (idx > 0) setActivePage(TAB_ORDER[idx - 1])
  }, [activePage, setActivePage])

  // Grammar nudge: show once per day when opening grammar tab and weak areas exist
  useEffect(() => {
    if (activePage !== 'grammar') return
    const today = new Date().toDateString()
    const lastNudge = localStorage.getItem('bf_adaptive_nudge_date')
    if (lastNudge === today || nudgeShownRef.current) return
    if (adaptiveData.weakCategories.length > 0) {
      nudgeShownRef.current = true
      localStorage.setItem('bf_adaptive_nudge_date', today)
      setShowNudge(true)
    }
  }, [activePage, adaptiveData.weakCategories])

  const levelUpNotif = notifications.find(n => n.type === 'adaptiveLevelUp')

  useEffect(() => {
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', '#09090f')
  }, [])

  // Escape key: close settings overlay
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape' && showSettings) setShowSettings(false)
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [showSettings, setShowSettings])

  // Global keyboard shortcuts
  useEffect(() => {
    const TAB_KEYS = { '1':'dictionary','2':'grammar','3':'writing','4':'review','5':'progress' }
    const handler = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return
      if (e.key === '?') { e.preventDefault(); setShowShortcuts(v => !v); return }
      if (e.key === 'Escape') { setShowShortcuts(false); return }
      if (TAB_KEYS[e.key]) { setActivePage(TAB_KEYS[e.key]); return }
      if (e.key === '/' && activePage === 'dictionary') {
        e.preventDefault()
        document.querySelector('input[type="search"], input[type="text"]')?.focus()
      }
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [activePage, setActivePage])

  // Touch swipe handled by useSwipeNavigation hook

  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 300)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleSearch = useCallback((word) => {
    setCurrentWord(word)
    addToHistory(word, dictMode)
    addXP(5)
  }, [setCurrentWord, addToHistory, addXP, dictMode])

  const handleWordClick = useCallback((word) => {
    setCurrentWord(word)
    addToHistory(word, dictMode)
    addXP(3)
  }, [setCurrentWord, addToHistory, addXP, dictMode])

  const handleHistoryClick = useCallback((word, mode) => {
    setActivePage('dictionary')
    setCurrentWord(word)
    addToHistory(word, mode)
  }, [setActivePage, setCurrentWord, addToHistory])

  // Show splash before onboarding; show onboarding before app
  if (!splashDone) {
    return <SplashScreen onDone={() => setSplashDone(true)} />
  }
  if (!onboardDone) {
    return <Onboarding onDone={() => setOnboardDone(true)} />
  }

  return (
    <ErrorBoundary>
      <CustomCursor />
      <ParallaxBackground />
      <BackgroundEffects />
      <Navbar />
      <OfflineBanner />
      <TabBar />

      <div className="wrap" key={activePage} ref={mainRef}>
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
          <Suspense fallback={skelFallback}>
            <HistoryPage onWordClick={handleHistoryClick} />
          </Suspense>
        )}

        {activePage === 'saved' && (
          <Suspense fallback={skelFallback}>
            <SavedPage onWordClick={handleWordClick} onPractice={() => setQuizOpen(true)} />
          </Suspense>
        )}

        {activePage === 'verbs' && (
          <Suspense fallback={skelFallback}>
            <IrregularVerbsPage />
          </Suspense>
        )}

        {activePage === 'grammar' && (
          <>
            <AdaptiveDashboard />
            <GrammarSection standalone />
          </>
        )}

        {activePage === 'writing' && (
          <Suspense fallback={skelFallback}>
            <WritingPage />
          </Suspense>
        )}

        {activePage === 'topics' && (
          <Suspense fallback={skelFallback}>
            <TopicsPage />
          </Suspense>
        )}

        {activePage === 'news' && (
          <Suspense fallback={skelFallback}>
            <NewsPage />
          </Suspense>
        )}

        {activePage === 'idioms' && (
          <Suspense fallback={skelFallback}>
            <IdiomsPage />
          </Suspense>
        )}

        {activePage === 'review' && (
          <Suspense fallback={skelFallback}>
            <ReviewPage />
          </Suspense>
        )}

        {activePage === 'progress' && (
          <Suspense fallback={skelFallback}>
            <ProgressPage />
          </Suspense>
        )}

        {activePage === 'profile' && (
          <Suspense fallback={skelFallback}>
            <ProfilePage />
          </Suspense>
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

      <BottomNav />
      <PWAInstallBanner />
      <Achievements />

      {activeGrammarCategory && <GrammarDetailPage />}

      {levelUpNotif && (
        <LevelUpOverlay
          notification={levelUpNotif}
          onDismiss={() => dismissNotification(levelUpNotif.id)}
        />
      )}

      {showNudge && adaptiveData.weakCategories.length > 0 && (() => {
        const catId = adaptiveData.weakCategories[0]
        const cat   = CATEGORIES.find(c => c.id === catId)
        return (
          <GrammarNudgeToast
            weakCategory={cat?.title ?? catId}
            onPractice={() => { setShowNudge(false); setActivePage('grammar'); setActiveGrammarCategory(catId) }}
            onDismiss={() => setShowNudge(false)}
          />
        )
      })()}

      {showSettings && (
        <Suspense fallback={null}>
          <SettingsPage onClose={() => setShowSettings(false)} />
        </Suspense>
      )}

      {showShortcuts && (
        <ShortcutsOverlay onClose={() => setShowShortcuts(false)} />
      )}

      <div style={{ textAlign: 'center', padding: '4px 0 8px', fontSize: 11, color: 'var(--t3)', userSelect: 'none' }}>
        Press <kbd style={{ fontFamily: 'monospace', background: 'var(--elevated)', border: '1px solid var(--bord2)', borderRadius: 4, padding: '1px 5px', fontSize: 10 }}>?</kbd> for shortcuts
      </div>

      {quizOpen && (
        <Suspense fallback={null}>
          <QuizPage onClose={() => setQuizOpen(false)} />
        </Suspense>
      )}
    </ErrorBoundary>
  )
}

export default App
