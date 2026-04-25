import { useState, useEffect, useCallback, useRef, lazy, Suspense } from 'react'
import ErrorBoundary from './components/ErrorBoundary'
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
import { CATEGORIES } from './features/grammar/GrammarSection'
import PWAInstallBanner from './components/PWAInstallBanner/PWAInstallBanner'
import useStore from './store/useStore'
import { LEVEL_INFO } from './features/adaptive/adaptiveEngine'
import { useSwipeNavigation } from './hooks/useSwipeNavigation'
import LearnPage    from './pages/LearnPage/LearnPage'
import PracticePage from './pages/PracticePage/PracticePage'
import LevelTest    from './features/leveltest/LevelTest'

const ProfilePage  = lazy(() => import('./pages/ProfilePage/ProfilePage'))
const ProgressPage = lazy(() => import('./features/progress/ProgressPage'))
const SettingsPage = lazy(() => import('./pages/SettingsPage/SettingsPage'))
const QuizPage     = lazy(() => import('./pages/QuizPage/QuizPage'))

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

// ── Level-up overlay ──────────────────────────────────────────────────────────
const levelUpOverlayStyle = {
  position: 'fixed', inset: 0, zIndex: 9999,
  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
  background: 'rgba(9,9,15,0.88)', backdropFilter: 'blur(16px)',
  animation: 'fadeSlideUp 300ms var(--ease) both',
  cursor: 'pointer',
}

function LevelUpOverlay({ notification, onDismiss }) {
  const info = LEVEL_INFO[notification?.level] ?? LEVEL_INFO.beginner
  useEffect(() => {
    const t = setTimeout(onDismiss, 2800)
    return () => clearTimeout(t)
  }, [onDismiss])
  return (
    <div style={levelUpOverlayStyle} onClick={onDismiss}>
      <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:900, fontSize:13, letterSpacing:'0.18em', color:'var(--t3)', textTransform:'uppercase', marginBottom:12 }}>LEVEL UP!</div>
      <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:800, fontSize:48, background:'linear-gradient(135deg,var(--acc),var(--acc-p))', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text', lineHeight:1.1, textAlign:'center' }}>{info.emoji} {info.label}</div>
      <div style={{ marginTop:12, fontSize:14, color:'var(--t3)' }}>Tap to continue</div>
    </div>
  )
}

// ── Grammar nudge toast ───────────────────────────────────────────────────────
function GrammarNudgeToast({ weakCategory, onPractice, onDismiss }) {
  useEffect(() => {
    const t = setTimeout(onDismiss, 6000)
    return () => clearTimeout(t)
  }, [onDismiss])
  return (
    <div style={{ position:'fixed', bottom:90, left:'50%', transform:'translateX(-50%)', background:'var(--surface)', border:'1px solid rgba(255,169,77,0.4)', borderRadius:'var(--radius)', padding:'12px 16px', display:'flex', alignItems:'center', gap:10, zIndex:500, boxShadow:'0 8px 32px rgba(0,0,0,0.45)', animation:'fadeSlideUp 250ms var(--ease) both', maxWidth:340, width:'calc(100% - 32px)' }}>
      <span>💪</span>
      <span style={{ flex:1, fontSize:13, color:'var(--t2)', lineHeight:1.4 }}>
        Your weakest area is <strong>{weakCategory}</strong> — practice it today?
      </span>
      <button style={{ flexShrink:0, padding:'7px 12px', border:'none', borderRadius:'var(--radius-sm)', background:'var(--acc-a)', color:'#fff', fontFamily:"'Space Grotesk',sans-serif", fontWeight:700, fontSize:12, cursor:'pointer' }} onClick={onPractice}>Go</button>
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
  const setActiveLearnSection    = useStore(s => s.setActiveLearnSection)
  const showSettings   = useStore(s => s.showSettings)
  const setShowSettings = useStore(s => s.setShowSettings)

  const [splashDone,       setSplashDone]       = useState(!shouldShowSplash())
  const [onboardDone,      setOnboardDone]      = useState(!shouldShowOnboarding())
  const [showScrollTop,    setShowScrollTop]    = useState(false)
  const [showNudge,        setShowNudge]        = useState(false)
  const [showShortcuts,    setShowShortcuts]    = useState(false)
  const [profileLevelTest, setProfileLevelTest] = useState(false)
  const nudgeShownRef = useRef(false)
  const mainRef       = useRef(null)

  useSwipeNavigation(mainRef)

  // Grammar nudge once per day
  useEffect(() => {
    if (activePage !== 'learn') return
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

  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape' && showSettings) setShowSettings(false)
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [showSettings, setShowSettings])

  useEffect(() => {
    const TAB_KEYS = { '1':'dictionary', '2':'learn', '3':'practice', '4':'progress', '5':'profile' }
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

  if (!splashDone) return <SplashScreen onDone={() => setSplashDone(true)} />
  if (!onboardDone) return <Onboarding onDone={() => setOnboardDone(true)} />

  return (
    <ErrorBoundary>
      <ParallaxBackground />
      <BackgroundEffects />
      <Navbar />
      <OfflineBanner />
      <TabBar />

      <div className="wrap" key={activePage} ref={mainRef}>

        {/* ── Dictionary ── */}
        {activePage === 'dictionary' && (
          <>
            <FlagSwitcher />
            <SearchBar onSearch={handleSearch} />
            {!currentWord
              ? <WelcomeScreen onSearch={handleSearch} />
              : <ResultCard word={currentWord} dictMode={dictMode} onWordClick={handleWordClick} />
            }
          </>
        )}

        {/* ── Learn hub ── */}
        {activePage === 'learn' && <LearnPage />}

        {/* ── Practice hub ── */}
        {activePage === 'practice' && <PracticePage />}

        {/* ── Progress ── */}
        {activePage === 'progress' && (
          <Suspense fallback={skelFallback}>
            <ProgressPage />
          </Suspense>
        )}

        {/* ── Profile ── */}
        {activePage === 'profile' && (
          <Suspense fallback={skelFallback}>
            <ProfilePage
              onOpenLevelTest={() => setProfileLevelTest(true)}
              onGoProgress={() => setActivePage('progress')}
            />
          </Suspense>
        )}
      </div>

      {showScrollTop && (
        <button
          style={scrollBtnStyle}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Scroll to top"
        >↑</button>
      )}

      <BottomNav />
      <PWAInstallBanner />
      <Achievements />

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
            onPractice={() => {
              setShowNudge(false)
              setActivePage('learn')
              setActiveLearnSection('grammar')
              setActiveGrammarCategory(catId)
            }}
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

      {profileLevelTest && (
        <LevelTest
          onClose={() => setProfileLevelTest(false)}
          onGoSection={(sec) => { setProfileLevelTest(false); setActivePage('learn'); setActiveLearnSection(sec) }}
        />
      )}

      <div style={{ textAlign:'center', padding:'4px 0 8px', fontSize:11, color:'var(--t3)', userSelect:'none' }}>
        Press <kbd style={{ fontFamily:'monospace', background:'var(--elevated)', border:'1px solid var(--bord2)', borderRadius:4, padding:'1px 5px', fontSize:10 }}>?</kbd> for shortcuts
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
