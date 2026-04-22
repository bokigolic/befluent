import { useEffect, useMemo, lazy, Suspense } from 'react'
import useStore from '../../store/useStore'
import { getLevel } from '../../store/useStore'
import { getDueCards } from '../../features/review/spacedRepetition'
import CoursePath from '../../features/path/CoursePath'
import GrammarSection from '../../features/grammar/GrammarSection'
import GrammarDetailPage from '../../features/grammar/GrammarDetailPage'
import styles from './LearnPage.module.css'

const TopicsPage      = lazy(() => import('../../features/topics/TopicsPage'))
const NewsPage        = lazy(() => import('../../features/news/NewsPage'))
const IdiomsPage      = lazy(() => import('../../features/idioms/IdiomsPage'))
const WritingPage     = lazy(() => import('../../features/writing/WritingPage'))
const VerbsPage       = lazy(() => import('../../features/verbs/VerbsPage'))

const skel = <div className="suspenseSkel" />

const SECTIONS = [
  { id: 'grammar',  icon: '📚', title: 'Grammar',             sub: '81 lessons · 11 categories',    color: '#6366f1', level: 'A1–C1' },
  { id: 'verbs',    icon: '⚡', title: 'Verbs',               sub: '118 irregular · 100+ phrasal',  color: '#3b82f6', level: 'A1–B2' },
  { id: 'topics',   icon: '🗂️', title: 'Vocabulary Topics',   sub: '12 topics · 480 words',          color: '#10b981', level: 'A2–B2' },
  { id: 'news',     icon: '📰', title: 'News in English',     sub: '15 articles · A2–C1',            color: '#f59e0b', level: 'A2–C1' },
  { id: 'idioms',   icon: '💬', title: 'Idioms & Slang',      sub: '120 idioms · 8 categories',      color: '#ec4899', level: 'A2–C1' },
  { id: 'writing',  icon: '✍️', title: 'Writing Practice',    sub: 'AI-powered feedback',            color: '#8b5cf6', level: 'B1–C1' },
]

function SectionCard({ sec, onClick, progress }) {
  return (
    <button
      className={styles.sectionCard}
      style={{ '--sec-color': sec.color }}
      onClick={() => onClick(sec.id)}
    >
      <span className={styles.secIcon}>{sec.icon}</span>
      <div className={styles.secBody}>
        <div className={styles.secTitle}>{sec.title}</div>
        <div className={styles.secSub}>{sec.sub}</div>
        {progress > 0 && (
          <div className={styles.progressBar}>
            <div className={styles.progressFill} style={{ width: `${progress}%` }} />
          </div>
        )}
      </div>
      <span className={styles.secLevel}>{sec.level}</span>
    </button>
  )
}

function DailyPathCard({ activities, completedToday, onStart }) {
  const total = activities.length
  const done  = completedToday.length

  return (
    <div className={styles.dailyCard}>
      <div className={styles.dailyHeader}>
        <span className={styles.dailyTitle}>📅 Today's Path</span>
        <span className={styles.dailyProgress}>{done}/{total}</span>
      </div>
      <div className={styles.dailyBar}>
        <div className={styles.dailyBarFill} style={{ width: `${total > 0 ? (done / total) * 100 : 0}%` }} />
      </div>
      {done === total && total > 0 && (
        <div className={styles.dailyComplete}>🎉 +50 XP Daily Complete!</div>
      )}
      <div className={styles.dailyActivities}>
        {activities.map(act => {
          const isDone = completedToday.includes(act.id)
          return (
            <button
              key={act.id}
              className={`${styles.actCard} ${isDone ? styles.actDone : ''}`}
              onClick={() => !isDone && onStart(act)}
            >
              <span className={styles.actIcon}>{act.icon}</span>
              <div className={styles.actBody}>
                <div className={styles.actTitle}>{act.title}</div>
                <div className={styles.actMeta}>{act.time} min · +{act.xp} XP</div>
              </div>
              {isDone && <span className={styles.actCheck}>✓</span>}
            </button>
          )
        })}
      </div>
    </div>
  )
}

function ContinueCard({ lastSection, onContinue }) {
  if (!lastSection) return null
  const sec = SECTIONS.find(s => s.id === lastSection)
  if (!sec) return null
  return (
    <button className={styles.continueCard} onClick={() => onContinue(lastSection)}>
      <span className={styles.continueIcon}>{sec.icon}</span>
      <div className={styles.continueBody}>
        <div className={styles.continueLabel}>Continue where you left off</div>
        <div className={styles.continueTitle}>{sec.title} →</div>
      </div>
    </button>
  )
}

function LearnHubContent({ onSectionOpen, onNodeOpen }) {
  const xp                   = useStore(s => s.xp)
  const reviewDeck           = useStore(s => s.reviewDeck)
  const adaptiveData         = useStore(s => s.adaptiveData)
  const readArticles         = useStore(s => s.readArticles)
  const savedIdioms          = useStore(s => s.savedIdioms)
  const completedLessons     = useStore(s => s.completedLessons)
  const grammarProgress      = useStore(s => s.grammarProgress)
  const dailyPath            = useStore(s => s.dailyPath)
  const completedDailyPath   = useStore(s => s.completedDailyPath)
  const setDailyPath         = useStore(s => s.setDailyPath)
  const activeLearnSection   = useStore(s => s.activeLearnSection)
  const addXP                = useStore(s => s.addXP)
  const completeDailyAct     = useStore(s => s.completeDailyActivity)

  const level = getLevel(xp)

  // Generate daily path once per day
  useEffect(() => {
    if (dailyPath.length > 0) return
    const acts = []
    const dueCards = getDueCards(reviewDeck)
    if (dueCards.length > 0) {
      acts.push({ id: 'review', type: 'review', icon: '🔄',
        title: `Review ${dueCards.length} word${dueCards.length !== 1 ? 's' : ''} due`,
        time: Math.max(2, Math.round(dueCards.length * 0.4)), xp: dueCards.length * 3 })
    }
    if (adaptiveData.weakCategories?.[0]) {
      const cat = adaptiveData.weakCategories[0]
      const label = cat.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
      acts.push({ id: `grammar-${cat}`, type: 'grammar', icon: '📚',
        title: `${label} — Grammar lesson`, time: 5, xp: 10 })
    } else {
      acts.push({ id: 'grammar-general', type: 'grammar', icon: '📚',
        title: 'Grammar lesson', time: 5, xp: 10 })
    }
    const readIds = Object.keys(readArticles)
    const { NEWS_ARTICLES } = require('../../features/news/newsData')
    const unread = NEWS_ARTICLES.filter(a => !readIds.includes(a.id))
    if (unread.length > 0) {
      const art = unread[Math.floor(Date.now() / 86400000) % unread.length]
      acts.push({ id: `news-${art.id}`, type: 'news', icon: '📰',
        title: `Read: ${art.title.slice(0, 35)}…`, time: art.readTime?.replace(' min read','') ?? 4, xp: 15 })
    }
    acts.push({ id: 'idioms-daily', type: 'idioms', icon: '💬',
      title: 'Explore 3 new idioms', time: 2, xp: 9 })
    setDailyPath(acts.slice(0, 4))
  }, [])

  const today = new Date().toDateString()
  const completedToday = completedDailyPath.date === today ? completedDailyPath.completed : []

  const handleActivityStart = (act) => {
    completeDailyAct(act.id)
    addXP(act.xp)
    if (act.type === 'review')  { onSectionOpen?.('review') }
    else if (act.type === 'grammar') { onSectionOpen?.('grammar') }
    else if (act.type === 'news')    { onSectionOpen?.('news') }
    else if (act.type === 'idioms')  { onSectionOpen?.('idioms') }
  }

  const avgGrammarProgress = useMemo(() => {
    const vals = Object.values(grammarProgress).filter(v => v > 0)
    return vals.length ? Math.round(vals.reduce((a, b) => a + b, 0) / vals.length) : 0
  }, [grammarProgress])

  const sectionProgress = {
    grammar: avgGrammarProgress,
    verbs:   0,
    topics:  0,
    news:    Math.round((Object.keys(readArticles).length / 15) * 100),
    idioms:  Math.round((savedIdioms.length / 120) * 100),
    writing: 0,
  }

  return (
    <div className={styles.hub}>
      <div className={styles.hubHeader}>
        <div>
          <h1 className={styles.hubTitle}>📖 Learn</h1>
          <p className={styles.hubSub}>Your personal learning center</p>
        </div>
        <div className={styles.levelBadge} style={{ background: `${level.name === 'Beginner' ? 'rgba(16,217,160,0.15)' : 'rgba(59,130,246,0.15)'}` }}>
          {level.emoji} {level.name}
        </div>
      </div>

      <ContinueCard lastSection={activeLearnSection} onContinue={onSectionOpen} />

      {dailyPath.length > 0 && (
        <DailyPathCard
          activities={dailyPath}
          completedToday={completedToday}
          onStart={handleActivityStart}
        />
      )}

      <div className={styles.pathSection}>
        <div className={styles.sectionLabel}>Course Path</div>
        <CoursePath onNodeOpen={onNodeOpen} />
      </div>

      <div className={styles.sectionLabel}>All Sections</div>
      <div className={styles.sectionGrid}>
        {SECTIONS.map(sec => (
          <SectionCard
            key={sec.id}
            sec={sec}
            onClick={onSectionOpen}
            progress={sectionProgress[sec.id] ?? 0}
          />
        ))}
      </div>
    </div>
  )
}

function SectionWrapper({ section, onBack }) {
  return (
    <div className={styles.sectionView}>
      <Suspense fallback={skel}>
        {section === 'grammar'  && (
          <>
            <div className={styles.sectionBackBar}>
              <button className={styles.backBtn} onClick={onBack}>← Learn</button>
            </div>
            <GrammarSection standalone />
            <GrammarDetailPage />
          </>
        )}
        {section === 'verbs'    && <VerbsPage onBack={onBack} />}
        {section === 'topics'   && <TopicsPage />}
        {section === 'news'     && <NewsPage />}
        {section === 'idioms'   && <IdiomsPage />}
        {section === 'writing'  && <WritingPage />}
      </Suspense>
    </div>
  )
}

export default function LearnPage() {
  const activeLearnSection   = useStore(s => s.activeLearnSection)
  const setActiveLearnSection = useStore(s => s.setActiveLearnSection)
  const setActivePage         = useStore(s => s.setActivePage)

  const handleSectionOpen = (id) => setActiveLearnSection(id)
  const handleBack        = () => setActiveLearnSection(null)

  const handleNodeOpen = (node) => {
    if (node.type === 'grammar')  setActiveLearnSection('grammar')
    else if (node.type === 'verbs')   setActiveLearnSection('verbs')
    else if (node.type === 'topics')  setActiveLearnSection('topics')
    else if (node.type === 'news')    setActiveLearnSection('news')
    else if (node.type === 'idioms')  setActiveLearnSection('idioms')
    else if (node.type === 'writing') setActiveLearnSection('writing')
  }

  if (activeLearnSection && activeLearnSection !== 'review') {
    return (
      <SectionWrapper
        section={activeLearnSection}
        onBack={handleBack}
      />
    )
  }

  if (activeLearnSection === 'review') {
    setActiveLearnSection(null)
    setActivePage('practice')
    return null
  }

  return (
    <LearnHubContent
      onSectionOpen={handleSectionOpen}
      onNodeOpen={handleNodeOpen}
    />
  )
}
