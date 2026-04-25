import { useMemo, memo } from 'react'
import useStore from '../../store/useStore'
import { CATEGORIES } from '../grammar/GrammarSection'
import { GRAMMAR_DATA } from '../grammar/grammarData'
import {
  calculateAccuracy, getRecommendations, LEVEL_INFO,
} from './adaptiveEngine'
import styles from './AdaptiveDashboard.module.css'

// ── Empty state ───────────────────────────────────────────────────────────────
function EmptyState() {
  return (
    <div className={styles.empty}>
      <div className={styles.emptyCards}>
        {['⏰', '📝', '📍'].map((emoji, i) => (
          <div key={i} className={styles.emptyCard} style={{ animationDelay: `${i * 80}ms` }}>
            {emoji}
          </div>
        ))}
      </div>
      <div className={styles.emptyTitle}>Practice grammar to get personalized recommendations</div>
      <div className={styles.emptySub}>Start with any category below ↓</div>
    </div>
  )
}

// ── Main dashboard ────────────────────────────────────────────────────────────
function AdaptiveDashboard() {
  const adaptiveData          = useStore(s => s.adaptiveData)
  const completedLessons      = useStore(s => s.completedLessons)
  const setActiveGrammarCategory = useStore(s => s.setActiveGrammarCategory)
  const setPendingLessonId    = useStore(s => s.setPendingLessonId)

  const { categoryScores, weakCategories, strongCategories, currentLevel } = adaptiveData

  const hasPracticed = useMemo(() =>
    Object.values(categoryScores).some(d => d.correct + d.wrong > 0),
  [categoryScores])

  const totalCorrect = useMemo(() =>
    Object.values(categoryScores).reduce((s, d) => s + d.correct, 0),
  [categoryScores])
  const totalWrong = useMemo(() =>
    Object.values(categoryScores).reduce((s, d) => s + d.wrong, 0),
  [categoryScores])
  const overallAcc = calculateAccuracy(totalCorrect, totalWrong)
  const catPracticed = useMemo(() =>
    Object.values(categoryScores).filter(d => d.correct + d.wrong > 0).length,
  [categoryScores])

  const recommendations = useMemo(() =>
    getRecommendations(categoryScores, completedLessons, CATEGORIES, GRAMMAR_DATA),
  [categoryScores, completedLessons])

  const levelInfo = LEVEL_INFO[currentLevel] ?? LEVEL_INFO.beginner

  const openLesson = (catId, lessonId) => {
    setPendingLessonId(lessonId)
    setActiveGrammarCategory(catId)
  }

  return (
    <div className={styles.dashboard}>
      {/* Header */}
      <div className={styles.header}>
        <span className={styles.title}>Your Learning Path</span>
        <span className={styles.levelBadge} style={{ background: `${levelInfo.color}22`, color: levelInfo.color }}>
          {levelInfo.emoji} {levelInfo.label}
        </span>
      </div>

      {!hasPracticed ? (
        <EmptyState />
      ) : (
        <>
          {/* Performance overview */}
          <div className={styles.metrics}>
            <div className={styles.metricCard}>
              <div
                className={styles.metricNum}
                style={{ color: overallAcc == null ? 'var(--t3)' : overallAcc >= 70 ? 'var(--acc-g)' : overallAcc >= 50 ? 'var(--acc-a)' : '#ff6b9d' }}
              >
                {overallAcc != null ? `${overallAcc}%` : '—'}
              </div>
              <div className={styles.metricLabel}>Overall accuracy</div>
            </div>
            <div className={styles.metricCard}>
              <div className={styles.metricNum} style={{ color: 'var(--acc)' }}>{catPracticed}/{CATEGORIES.length}</div>
              <div className={styles.metricLabel}>Categories tried</div>
            </div>
            <div className={styles.metricCard}>
              <div className={styles.metricNum} style={{ color: 'var(--acc-p)' }}>{totalCorrect + totalWrong}</div>
              <div className={styles.metricLabel}>Exercises done</div>
            </div>
          </div>

          {/* Weak areas */}
          {weakCategories.length > 0 && (
            <div className={styles.section}>
              <div className={styles.sectionLabel} style={{ color: 'var(--acc-a)' }}>⚠️ Needs attention</div>
              <div className={styles.weakList}>
                {weakCategories.slice(0, 3).map(catId => {
                  const cat  = CATEGORIES.find(c => c.id === catId)
                  const data = categoryScores[catId]
                  const acc  = calculateAccuracy(data.correct, data.wrong)
                  if (!cat) return null
                  return (
                    <div key={catId} className={styles.weakCard}>
                      <div className={styles.weakTop}>
                        <span className={styles.weakEmoji}>{cat.emoji}</span>
                        <span className={styles.weakName}>{cat.title}</span>
                        <span className={styles.weakAcc} style={{ color: acc < 40 ? '#ff6b9d' : 'var(--acc-a)' }}>
                          {acc}%
                        </span>
                      </div>
                      <div className={styles.weakTrack}>
                        <div className={styles.weakFill} style={{ width: `${acc}%`, background: acc < 40 ? '#ff6b9d' : 'var(--acc-a)' }} />
                      </div>
                      <button
                        className={styles.practiceNowBtn}
                        onClick={() => setActiveGrammarCategory(catId)}
                      >
                        Practice now →
                      </button>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* Strong areas */}
          {strongCategories.length > 0 && (
            <div className={styles.section}>
              <div className={styles.sectionLabel} style={{ color: 'var(--acc-g)' }}>✅ Strong areas</div>
              <div className={styles.strongRow}>
                {strongCategories.map(catId => {
                  const cat  = CATEGORIES.find(c => c.id === catId)
                  const data = categoryScores[catId]
                  const acc  = calculateAccuracy(data.correct, data.wrong)
                  if (!cat) return null
                  return (
                    <span key={catId} className={styles.strongPill}>
                      {cat.emoji} {cat.title} · {acc}%
                    </span>
                  )
                })}
              </div>
            </div>
          )}

          {/* Recommendations */}
          {recommendations.length > 0 && (
            <div className={styles.section}>
              <div className={styles.sectionLabel} style={{ color: 'var(--acc)' }}>🎯 Recommended for you</div>
              <div className={styles.recList}>
                {recommendations.map(rec => (
                  <div key={rec.lessonId} className={styles.recCard}>
                    <div className={styles.recReason}>
                      Because you struggled with {rec.categoryName} · {rec.accuracy}% accuracy
                    </div>
                    <div className={styles.recTitle}>{rec.lessonTitle}</div>
                    <div className={styles.recFooter}>
                      <span
                        className={styles.recCatPill}
                        style={{ background: `${rec.categoryColor}22`, color: rec.categoryColor }}
                      >
                        {rec.categoryEmoji} {rec.categoryName}
                      </span>
                      <button
                        className={styles.recStartBtn}
                        onClick={() => openLesson(rec.categoryId, rec.lessonId)}
                      >
                        Start lesson →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default memo(AdaptiveDashboard)
