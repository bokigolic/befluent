import { useEffect, useMemo, useRef, useState, lazy, Suspense } from 'react'
import useStore, { getLevel } from '../../store/useStore'
import { NEWS_ARTICLES } from '../../features/news/newsData'
import GrammarSection from '../../features/grammar/GrammarSection'
import GrammarDetailPage from '../../features/grammar/GrammarDetailPage'
import LevelTest from '../../features/leveltest/LevelTest'
import styles from './LearnPage.module.css'

const TopicsPage        = lazy(() => import('../../features/topics/TopicsPage'))
const NewsPage          = lazy(() => import('../../features/news/NewsPage'))
const IdiomsPage        = lazy(() => import('../../features/idioms/IdiomsPage'))
const WritingPage       = lazy(() => import('../../features/writing/WritingPage'))
const VerbsPage         = lazy(() => import('../../features/verbs/VerbsPage'))
const ConversationsPage = lazy(() => import('../../features/conversations/ConversationsPage'))

const skel = <div className="suspenseSkel" />

const SECTION_GROUPS = [
  {
    label: 'Language',
    sections: [
      { id: 'grammar',       icon: '📚', title: 'Grammar',       sub: '81 lessons',   sub2: 'A1 → C1',          color: '#6366f1' },
      { id: 'verbs',         icon: '⚡', title: 'Verbs',         sub: '200+ verbs',   sub2: 'irregular+phrasal', color: '#3b82f6' },
    ],
  },
  {
    label: 'Vocabulary',
    sections: [
      { id: 'topics',        icon: '🗂️', title: 'Topics',        sub: '12 topics',    sub2: '480 words',         color: '#10b981' },
      { id: 'idioms',        icon: '💬', title: 'Idioms',        sub: '200 idioms',   sub2: '11 categories',     color: '#ec4899' },
    ],
  },
  {
    label: 'Real English',
    sections: [
      { id: 'news',          icon: '📰', title: 'News',          sub: '35 articles',  sub2: 'A2 → C1',           color: '#f59e0b' },
      { id: 'conversations', icon: '🗣️', title: 'Conversations', sub: '12 scenarios', sub2: 'AI roleplay',       color: '#06b6d4' },
    ],
  },
]

// ── Section card ──────────────────────────────────────────────────────────────
function SectionCard({ sec, onClick, progress }) {
  return (
    <button
      className={styles.sectionCard}
      style={{ '--sec-color': sec.color }}
      onClick={() => onClick(sec.id)}
    >
      <div className={styles.secTop}>
        <span className={styles.secIcon}>{sec.icon}</span>
        {progress > 0 && <span className={styles.secPct}>{progress}%</span>}
      </div>
      <div className={styles.secTitle}>{sec.title}</div>
      <div className={styles.secSub}>{sec.sub}</div>
      <div className={styles.secSub2}>{sec.sub2}</div>
      <div className={styles.progressBar}>
        <div className={styles.progressFill} style={{ width: `${progress}%` }} />
      </div>
    </button>
  )
}

// ── Continue card ─────────────────────────────────────────────────────────────
function ContinueCard({ lastVisited, onContinue }) {
  if (!lastVisited) return null
  return (
    <button className={styles.continueCard} onClick={() => onContinue(lastVisited.section)}>
      <span className={styles.continueIcon}>{lastVisited.emoji}</span>
      <div className={styles.continueBody}>
        <div className={styles.continueLabel}>Continue where you left off</div>
        <div className={styles.continueTitle}>{lastVisited.title}</div>
      </div>
      <span className={styles.continueArrow}>Resume →</span>
    </button>
  )
}

// ── Level test card ───────────────────────────────────────────────────────────
function LevelTestCard({ testResult, onStart, onRetake }) {
  if (testResult) {
    return (
      <button className={styles.levelTestDone} onClick={onRetake}>
        <span className={styles.ltDoneIcon}>✅</span>
        <div className={styles.ltDoneBody}>
          <div className={styles.ltDoneTitle}>Level: {testResult.level} — {testResult.name}</div>
          <div className={styles.ltDoneSub}>Retake test to update your level</div>
        </div>
        <span className={styles.ltArrow}>→</span>
      </button>
    )
  }
  return (
    <div className={styles.levelTestCard}>
      <div className={styles.ltCardInner}>
        <div className={styles.ltEmoji}>🎯</div>
        <div className={styles.ltBody}>
          <div className={styles.ltTitle}>Find Your English Level</div>
          <div className={styles.ltSub}>20-question test · get your personalized learning plan</div>
        </div>
      </div>
      <button className={styles.ltBtn} onClick={onStart}>Start Test →</button>
    </div>
  )
}

// ── Learn hub content ─────────────────────────────────────────────────────────
function LearnHubContent({ onSectionOpen, onOpenLevelTest }) {
  const xp                  = useStore(s => s.xp)
  const streak              = useStore(s => s.streak)
  const todayCount          = useStore(s => s.todayCount)
  const dailyGoal           = useStore(s => s.dailyGoal)
  const lastVisited         = useStore(s => s.lastVisited)
  const readArticles        = useStore(s => s.readArticles)
  const savedIdioms         = useStore(s => s.savedIdioms)
  const grammarProgress     = useStore(s => s.grammarProgress)
  const conversationHistory = useStore(s => s.conversationHistory)
  const testResult          = useStore(s => s.testResult)
  const clearTestResult     = useStore(s => s.clearTestResult)

  const level = getLevel(xp)

  const avgGrammarProgress = useMemo(() => {
    const vals = Object.values(grammarProgress).filter(v => v > 0)
    return vals.length ? Math.round(vals.reduce((a, b) => a + b, 0) / vals.length) : 0
  }, [grammarProgress])

  const sectionProgress = {
    grammar:       avgGrammarProgress,
    verbs:         0,
    topics:        0,
    news:          Math.round((Object.keys(readArticles).length / NEWS_ARTICLES.length) * 100),
    idioms:        Math.round((savedIdioms.length / 200) * 100),
    conversations: Math.min(100, Math.round(((conversationHistory?.length ?? 0) / 12) * 100)),
  }

  const goalPct = dailyGoal > 0 ? Math.min(100, Math.round((todayCount / dailyGoal) * 100)) : 0

  return (
    <div className={styles.hub}>
      {/* Header */}
      <div className={styles.hubHeader}>
        <div>
          <h1 className={styles.hubTitle}>📖 Learn</h1>
          <p className={styles.hubSub}>Your personal learning center</p>
        </div>
        <div className={styles.levelBadge}>
          {level.emoji} {level.name}
        </div>
      </div>

      {/* ── Your Path ── */}
      <div className={styles.sectionLabel}>Your Path</div>

      {(streak > 0 || goalPct > 0) && (
        <div className={styles.pathRow}>
          {streak > 0 && <div className={styles.streakPill}>🔥 {streak} day streak</div>}
          {dailyGoal > 0 && (
            <div className={styles.goalWrap}>
              <div className={styles.goalBar}>
                <div className={styles.goalFill} style={{ width: `${goalPct}%` }} />
              </div>
              <span className={styles.goalLabel}>{todayCount}/{dailyGoal} today</span>
            </div>
          )}
        </div>
      )}

      <ContinueCard lastVisited={lastVisited} onContinue={onSectionOpen} />

      <LevelTestCard
        testResult={testResult}
        onStart={onOpenLevelTest}
        onRetake={() => { clearTestResult(); onOpenLevelTest() }}
      />

      {/* ── Learn by Category ── */}
      {SECTION_GROUPS.map(group => (
        <div key={group.label} className={styles.groupWrap}>
          <div className={styles.sectionLabel}>{group.label}</div>
          <div className={styles.sectionGrid}>
            {group.sections.map(sec => (
              <SectionCard
                key={sec.id}
                sec={sec}
                onClick={onSectionOpen}
                progress={sectionProgress[sec.id] ?? 0}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

// ── Section wrapper (opens full section) ──────────────────────────────────────
function BackBar({ onBack }) {
  return (
    <div className={styles.sectionBackBar}>
      <button className={styles.backBtn} onClick={onBack}>← Learn</button>
    </div>
  )
}

function SectionWrapper({ section, onBack }) {
  return (
    <div className={styles.sectionView}>
      <Suspense fallback={skel}>
        {section === 'grammar' && (
          <>
            <BackBar onBack={onBack} />
            <GrammarSection standalone />
            <GrammarDetailPage />
          </>
        )}
        {section === 'verbs'         && <VerbsPage onBack={onBack} />}
        {section === 'topics'        && (<><BackBar onBack={onBack} /><TopicsPage /></>)}
        {section === 'news'          && (<><BackBar onBack={onBack} /><NewsPage /></>)}
        {section === 'idioms'        && (<><BackBar onBack={onBack} /><IdiomsPage /></>)}
        {section === 'writing'       && (<><BackBar onBack={onBack} /><WritingPage /></>)}
        {section === 'conversations' && <ConversationsPage onBack={onBack} />}
      </Suspense>
    </div>
  )
}

// ── Main LearnPage ────────────────────────────────────────────────────────────
export default function LearnPage() {
  const activeLearnSection    = useStore(s => s.activeLearnSection)
  const setActiveLearnSection = useStore(s => s.setActiveLearnSection)
  const setActivePage         = useStore(s => s.setActivePage)
  const setLastVisited        = useStore(s => s.setLastVisited)
  const [showLevelTest, setShowLevelTest] = useState(false)

  const handleSectionOpen = (id) => {
    const allSections = SECTION_GROUPS.flatMap(g => g.sections)
    const sec = allSections.find(s => s.id === id)
    if (sec) setLastVisited({ section: id, title: sec.title, emoji: sec.icon })
    setActiveLearnSection(id)
  }

  const handleBack = () => setActiveLearnSection(null)

  // Redirect 'review' section to Practice tab
  const reviewRedirectDone = useRef(false)
  useEffect(() => {
    if (activeLearnSection === 'review' && !reviewRedirectDone.current) {
      reviewRedirectDone.current = true
      setActiveLearnSection(null)
      setActivePage('practice')
    }
  }, [activeLearnSection, setActiveLearnSection, setActivePage])

  if (activeLearnSection && activeLearnSection !== 'review') {
    return (
      <SectionWrapper section={activeLearnSection} onBack={handleBack} />
    )
  }

  if (activeLearnSection === 'review') return null

  return (
    <>
      <LearnHubContent
        onSectionOpen={handleSectionOpen}
        onOpenLevelTest={() => setShowLevelTest(true)}
      />
      {showLevelTest && (
        <LevelTest
          onClose={() => setShowLevelTest(false)}
          onGoSection={(sec) => { setShowLevelTest(false); setActiveLearnSection(sec) }}
        />
      )}
    </>
  )
}
