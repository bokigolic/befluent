import { useState, memo, useCallback, useMemo, useRef, useEffect } from 'react'
import { NEWS_ARTICLES, NEWS_CATEGORIES, NEWS_LEVELS } from './newsData'
import useStore from '../../store/useStore'
import styles from './NewsPage.module.css'

const LEVEL_COLOR = { A2: '#10b981', B1: '#3b82f6', B2: '#8b5cf6', C1: '#ec4899' }
const IS_MOBILE = window.matchMedia('(pointer: coarse)').matches
const CATEGORY_EMOJI = {
  Technology: '💻', Science: '🔬', Health: '🏥',
  Environment: '🌿', Business: '💼', World: '🌍',
}

// Parse [word] markup into segments
function parseContent(text) {
  const parts = []
  const re = /\[([^\]]+)\]/g
  let last = 0, m
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) parts.push({ type: 'text', value: text.slice(last, m.index) })
    parts.push({ type: 'word', value: m[1] })
    last = m.index + m[0].length
  }
  if (last < text.length) parts.push({ type: 'text', value: text.slice(last) })
  return parts
}

// ── Unified word definition panel (fixed overlay) ────────────────────────────
function WordDefinitionPanel({ word, definition, serbian, loading, onClose, onAddToReview, inReview }) {
  const dragStartY = useRef(0)

  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [onClose])

  const onTouchStart = (e) => { dragStartY.current = e.touches[0].clientY }
  const onTouchEnd   = (e) => {
    if (e.changedTouches[0].clientY - dragStartY.current > 60) onClose()
  }

  return (
    <div className={styles.panelOverlay} onClick={onClose}>
      <div
        className={IS_MOBILE ? styles.panelSheet : styles.panelFixed}
        onClick={e => e.stopPropagation()}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {IS_MOBILE && <div className={styles.sheetHandle} />}
        <div className={styles.panelHeader}>
          <span className={styles.panelWord}>{word}</span>
          <button className={styles.panelClose} onClick={onClose} aria-label="Close">×</button>
        </div>

        {loading ? (
          <div className={styles.panelSpinner}>
            <span className={styles.spinner} />
            <span className={styles.spinnerText}>Loading…</span>
          </div>
        ) : (
          <>
            <p className={styles.panelDef}>{definition || 'No definition found.'}</p>
            {serbian && <p className={styles.panelSerbian}>{serbian}</p>}
          </>
        )}

        <button
          className={`${styles.addReviewBtn} ${inReview ? styles.addReviewDone : ''}`}
          onClick={onAddToReview}
          disabled={inReview || loading}
        >
          {inReview ? '✓ In review deck' : '+ Add to Review'}
        </button>
      </div>
    </div>
  )
}

function ArticleContent({ article, vocabMap, fontSize }) {
  const [panel,   setPanel]   = useState(null) // { word, definition, serbian, loading }
  const addToReview  = useStore(s => s.addToReview)
  const reviewDeck   = useStore(s => s.reviewDeck)

  const paragraphs = article.content.split('\n\n').filter(Boolean)

  const fetchDefinition = useCallback(async (word) => {
    try {
      const res  = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(word)}`)
      if (!res.ok) return null
      const data = await res.json()
      return data?.[0]?.meanings?.[0]?.definitions?.[0]?.definition ?? null
    } catch {
      return null
    }
  }, [])

  const handleWordClick = useCallback(async (word, entry) => {
    if (entry) {
      setPanel({ word: entry.word ?? word, definition: entry.definition, serbian: entry.serbian, loading: false })
    } else {
      setPanel({ word, definition: '', serbian: '', loading: true })
      const def = await fetchDefinition(word)
      setPanel(prev => prev?.word === word ? { ...prev, definition: def ?? 'No definition found.', loading: false } : prev)
    }
  }, [fetchDefinition])

  const handleClose = useCallback(() => setPanel(null), [])

  const handleAddToReview = useCallback(() => {
    if (!panel) return
    addToReview(panel.word, panel.serbian || panel.definition || '', 'vocabulary')
    setPanel(prev => prev ? { ...prev } : null)
  }, [panel, addToReview])

  const inReview = panel ? reviewDeck.some(c => c.word.toLowerCase() === panel.word.toLowerCase()) : false

  return (
    <div className={styles.articleContent} style={{ fontSize }}>
      {panel && (
        <WordDefinitionPanel
          word={panel.word}
          definition={panel.definition}
          serbian={panel.serbian}
          loading={panel.loading}
          onClose={handleClose}
          onAddToReview={handleAddToReview}
          inReview={inReview}
        />
      )}
      {paragraphs.map((para, pi) => {
        const segments = parseContent(para)
        return (
          <p key={pi} className={styles.paragraph}>
            {segments.map((seg, si) => {
              if (seg.type === 'text') return <span key={si}>{seg.value}</span>
              const entry = vocabMap[seg.value.toLowerCase()]
              return (
                <span
                  key={si}
                  className={entry ? styles.clickableWord : styles.boldWord}
                  onClick={entry || true ? () => handleWordClick(seg.value, entry ?? null) : undefined}
                  style={!entry ? { cursor: 'pointer' } : {}}
                >
                  {seg.value}
                </span>
              )
            })}
          </p>
        )
      })}
    </div>
  )
}

function QuizSection({ quiz, onComplete }) {
  const [answers, setAnswers]     = useState({})
  const [submitted, setSubmitted] = useState(false)

  const score = submitted
    ? quiz.filter((q, i) => answers[i] === q.correct).length
    : 0

  const handleSubmit = () => {
    if (Object.keys(answers).length === quiz.length) {
      setSubmitted(true)
      onComplete(Math.round((score / quiz.length) * 100))
    }
  }

  return (
    <div className={styles.quizSection}>
      <h3 className={styles.quizTitle}>📝 Comprehension Quiz</h3>
      {quiz.map((q, qi) => (
        <div key={qi} className={styles.quizQuestion}>
          <div className={styles.questionText}>{qi + 1}. {q.question}</div>
          <div className={styles.options}>
            {q.options.map((opt, oi) => {
              let cls = styles.option
              if (submitted) {
                if (oi === q.correct) cls += ' ' + styles.optCorrect
                else if (answers[qi] === oi && oi !== q.correct) cls += ' ' + styles.optWrong
              } else if (answers[qi] === oi) {
                cls += ' ' + styles.optSelected
              }
              return (
                <button
                  key={oi}
                  className={cls}
                  onClick={() => !submitted && setAnswers(a => ({ ...a, [qi]: oi }))}
                >
                  {opt}
                </button>
              )
            })}
          </div>
          {submitted && (
            <div className={styles.explanation}>{q.explanation}</div>
          )}
        </div>
      ))}
      {!submitted ? (
        <button
          className={styles.submitQuiz}
          onClick={handleSubmit}
          disabled={Object.keys(answers).length < quiz.length}
        >
          Submit answers
        </button>
      ) : (
        <div className={styles.quizResult}>
          <span className={styles.quizScore}>{score}/{quiz.length}</span>
          <span className={styles.quizPct}>{Math.round((score / quiz.length) * 100)}% correct</span>
        </div>
      )}
    </div>
  )
}

function ArticleDetail({ article, onBack, initialTab = 'read' }) {
  const [tab, setTab]               = useState(initialTab)
  const [quizDone, setQuizDone]     = useState(false)
  const [fontSize, setFontSize]     = useState(16)
  const markArticleRead             = useStore(s => s.markArticleRead)
  const toggleBookmarkArticle       = useStore(s => s.toggleBookmarkArticle)
  const readArticles                = useStore(s => s.readArticles)
  const bookmarkedArticles          = useStore(s => s.bookmarkedArticles)
  const addXP                       = useStore(s => s.addXP)

  const isRead       = !!readArticles[article.id]
  const isBookmarked = bookmarkedArticles.includes(article.id)

  const vocabMap = useMemo(() => {
    const m = {}
    article.vocabulary.forEach(v => { m[v.word.toLowerCase()] = v })
    return m
  }, [article.vocabulary])

  const handleQuizComplete = useCallback((pct) => {
    setQuizDone(true)
    if (!isRead) {
      markArticleRead(article.id, pct)
      addXP(pct >= 75 ? 20 : 10)
    }
  }, [article.id, isRead, markArticleRead, addXP])

  const handleMarkRead = () => {
    if (!isRead) { markArticleRead(article.id, null); addXP(5) }
  }

  return (
    <div className={styles.detailPage}>
      <div className={styles.detailHeader}>
        <button className={styles.backBtn} onClick={onBack}>← Back</button>
        <div className={styles.detailMeta}>
          <span className={styles.detailLevel} style={{ color: LEVEL_COLOR[article.level] }}>
            {article.level}
          </span>
          <span className={styles.detailCategory}>{CATEGORY_EMOJI[article.category]} {article.category}</span>
          <span className={styles.detailRead}>{article.readTime}</span>
        </div>
        <div className={styles.detailActions}>
          <button
            className={`${styles.actionBtn} ${isBookmarked ? styles.bookmarked : ''}`}
            onClick={() => toggleBookmarkArticle(article.id)}
            title={isBookmarked ? 'Remove bookmark' : 'Bookmark'}
          >
            {isBookmarked ? '🔖' : '🤍'}
          </button>
          {!isRead && (
            <button className={styles.actionBtn} onClick={handleMarkRead} title="Mark as read">
              ✓ Read
            </button>
          )}
          {isRead && <span className={styles.readBadge}>✓ Read</span>}
        </div>
      </div>

      <h1 className={styles.detailTitle}>{article.title}</h1>
      <p className={styles.detailSummary}>{article.summary}</p>

      <div className={styles.tabBar}>
        <button className={`${styles.tabBtn} ${tab === 'read' ? styles.tabActive : ''}`} onClick={() => setTab('read')}>
          📰 Article
        </button>
        <button className={`${styles.tabBtn} ${tab === 'vocab' ? styles.tabActive : ''}`} onClick={() => setTab('vocab')}>
          📖 Vocabulary ({article.vocabulary.length})
        </button>
        <button className={`${styles.tabBtn} ${tab === 'quiz' ? styles.tabActive : ''}`} onClick={() => setTab('quiz')}>
          📝 Quiz
        </button>
      </div>

      {tab === 'read' && (
        <div>
          <div className={styles.readToolbar}>
            <span className={styles.vocabHint}>💡 Tap highlighted words</span>
            <div className={styles.fontControls}>
              <button className={styles.fontBtn} onClick={() => setFontSize(s => Math.max(13, s - 1))} aria-label="Decrease font size">A−</button>
              <button className={styles.fontBtn} onClick={() => setFontSize(s => Math.min(22, s + 1))} aria-label="Increase font size">A+</button>
            </div>
          </div>
          <ArticleContent article={article} vocabMap={vocabMap} fontSize={fontSize} />
        </div>
      )}

      {tab === 'vocab' && (
        <div className={styles.vocabList}>
          {article.vocabulary.map(v => (
            <div key={v.word} className={styles.vocabCard}>
              <div className={styles.vocabWord}>{v.word}</div>
              <div className={styles.vocabDef}>{v.definition}</div>
              <div className={styles.vocabSerbian}>{v.serbian}</div>
            </div>
          ))}
        </div>
      )}

      {tab === 'quiz' && (
        <QuizSection quiz={article.quiz} onComplete={handleQuizComplete} />
      )}

      <button className={styles.backBtn} onClick={onBack} style={{ marginTop: 8 }}>← Back to Articles</button>
    </div>
  )
}

function ArticleCard({ article, isRead, isBookmarked, onClick }) {
  return (
    <button className={`${styles.card} ${isRead ? styles.cardRead : ''}`} onClick={onClick}>
      <div className={styles.cardTop}>
        <span className={styles.cardCategory}>{CATEGORY_EMOJI[article.category]} {article.category}</span>
        <div className={styles.cardBadges}>
          <span className={styles.cardLevel} style={{ color: LEVEL_COLOR[article.level] }}>
            {article.level}
          </span>
          {isRead  && <span className={styles.readDot}>✓</span>}
          {isBookmarked && <span className={styles.bookmarkDot}>🔖</span>}
        </div>
      </div>
      <div className={styles.cardTitle}>{article.title}</div>
      <div className={styles.cardSummary}>{article.summary}</div>
      <div className={styles.cardFooter}>
        <span className={styles.cardDate}>{article.date}</span>
        <span className={styles.cardRead}>{article.readTime}</span>
      </div>
    </button>
  )
}

function NewsPage({ autoOpenQuiz = false }) {
  const [selectedId, setSelectedId]   = useState(null)
  const [category, setCategory]       = useState('All')
  const [level, setLevel]             = useState('All')
  const [showBookmarks, setShowBookmarks] = useState(false)
  const readArticles      = useStore(s => s.readArticles)
  const bookmarkedArticles = useStore(s => s.bookmarkedArticles)

  const filtered = useMemo(() => NEWS_ARTICLES.filter(a => {
    if (showBookmarks && !bookmarkedArticles.includes(a.id)) return false
    if (category !== 'All' && a.category !== category) return false
    if (level    !== 'All' && a.level    !== level)    return false
    return true
  }), [category, level, showBookmarks, bookmarkedArticles])

  const readCount = Object.keys(readArticles).length

  useEffect(() => {
    if (autoOpenQuiz && NEWS_ARTICLES.length) {
      const rnd = NEWS_ARTICLES[Math.floor(Math.random() * NEWS_ARTICLES.length)]
      setSelectedId(rnd.id)
    }
  }, [autoOpenQuiz])

  if (selectedId) {
    const article = NEWS_ARTICLES.find(a => a.id === selectedId)
    return <ArticleDetail article={article} onBack={() => setSelectedId(null)} initialTab={autoOpenQuiz ? 'quiz' : 'read'} />
  }

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <div>
          <h2 className={styles.pageTitle}>News in English</h2>
          <p className={styles.pageSubtitle}>{readCount}/{NEWS_ARTICLES.length} articles read</p>
        </div>
        <button
          className={`${styles.bookmarkToggle} ${showBookmarks ? styles.bookmarkToggleActive : ''}`}
          onClick={() => setShowBookmarks(v => !v)}
        >
          🔖 Saved
        </button>
      </div>

      <div className={styles.filters}>
        <div className={styles.filterRow}>
          {['All', 'A2', 'B1', 'B2', 'C1'].map(l => (
            <button
              key={l}
              className={`${styles.filterBtn} ${level === l ? styles.filterActive : ''}`}
              style={level === l && l !== 'All' ? { borderColor: LEVEL_COLOR[l], color: LEVEL_COLOR[l] } : {}}
              onClick={() => setLevel(l)}
            >
              {l}
            </button>
          ))}
        </div>
        <div className={styles.filterRow}>
          {NEWS_CATEGORIES.map(c => (
            <button
              key={c}
              className={`${styles.filterBtn} ${category === c ? styles.filterActive : ''}`}
              onClick={() => setCategory(c)}
            >
              {c === 'All' ? 'All topics' : `${CATEGORY_EMOJI[c]} ${c}`}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className={styles.empty}>No articles match your filters.</div>
      ) : (
        <div className={styles.articleList}>
          {filtered.map(a => (
            <ArticleCard
              key={a.id}
              article={a}
              isRead={!!readArticles[a.id]}
              isBookmarked={bookmarkedArticles.includes(a.id)}
              onClick={() => setSelectedId(a.id)}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default memo(NewsPage)
