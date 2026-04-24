import { useEffect, useMemo, memo } from 'react'
import useStore from '../../store/useStore'
import { CATEGORIES } from '../grammar/GrammarSection'
import styles from './ConversationReview.module.css'

function calcXP(messages, avgScore) {
  const userMessages = messages.filter(m => m.role === 'user')
  const turnCount    = userMessages.length
  if (turnCount === 0) return { total: 0, breakdown: '' }

  const base         = 20
  const feedbackMsgs = messages.filter(m => m.role === 'assistant' && m.feedback)
  const perfectTurns = feedbackMsgs.filter(m => (m.feedback?.score ?? 0) >= 90).length
  const totalErrors  = feedbackMsgs.reduce((s, m) => s + (m.feedback?.errors?.length ?? 0), 0)
  const perfectBonus = avgScore >= 80 ? 10 : 0

  const perfectXP  = perfectTurns * 5
  const errorPenalty = Math.min(totalErrors, base + perfectXP + perfectBonus - 10)
  const total      = Math.max(10, base + perfectXP + perfectBonus - errorPenalty)

  const parts = [`${base} base`]
  if (perfectXP)    parts.push(`+${perfectXP} perfect turns`)
  if (perfectBonus) parts.push(`+${perfectBonus} bonus`)
  if (errorPenalty) parts.push(`-${errorPenalty} errors`)

  return { total, breakdown: parts.join(' ') }
}

function scoreColor(score) {
  if (score >= 90) return 'var(--acc-g)'
  if (score >= 75) return 'var(--acc)'
  if (score >= 60) return 'var(--acc-a)'
  return 'var(--acc-p)'
}

function ConversationReview({ scenario, messages, onPracticeAgain, onTryAnother, onGrammarReview }) {
  const addXP            = useStore(s => s.addXP)
  const addConversation  = useStore(s => s.addConversation)
  const setActiveLearnSection = useStore(s => s.setActiveLearnSection)
  const setActiveGrammarCategory = useStore(s => s.setActiveGrammarCategory)

  const feedbackMsgs = useMemo(
    () => messages.filter(m => m.role === 'assistant' && m.feedback),
    [messages]
  )

  const avgScore = useMemo(() => {
    if (!feedbackMsgs.length) return 0
    return Math.round(feedbackMsgs.reduce((s, m) => s + (m.feedback?.score ?? 0), 0) / feedbackMsgs.length)
  }, [feedbackMsgs])

  const turnCount    = messages.filter(m => m.role === 'user').length
  const perfectTurns = feedbackMsgs.filter(m => (m.feedback?.score ?? 0) >= 100).length
  const totalErrors  = feedbackMsgs.reduce((s, m) => s + (m.feedback?.errors?.length ?? 0), 0)
  const { total: xpEarned, breakdown } = useMemo(() => calcXP(messages, avgScore), [messages, avgScore])

  // Group errors by rule
  const errorsByRule = useMemo(() => {
    const map = {}
    feedbackMsgs.forEach(m => {
      m.feedback?.errors?.forEach(err => {
        const rule = err.rule || 'General error'
        if (!map[rule]) map[rule] = []
        map[rule].push(err)
      })
    })
    return Object.entries(map)
      .sort((a, b) => b[1].length - a[1].length)
      .slice(0, 3)
  }, [feedbackMsgs])

  // Collect strengths from tips
  const strengths = useMemo(() => {
    const tips = feedbackMsgs
      .filter(m => !m.feedback?.hasErrors)
      .map(m => m.feedback?.tip)
      .filter(Boolean)
    return [...new Set(tips)].slice(0, 4)
  }, [feedbackMsgs])

  // Weakest grammar category based on errors
  const weakGrammarCategory = useMemo(() => {
    if (!errorsByRule.length) return null
    const topRule = errorsByRule[0]?.[0]?.toLowerCase() ?? ''
    return CATEGORIES.find(c =>
      c.id.replace(/-/g, ' ').toLowerCase().includes(topRule.split(' ')[0]) ||
      topRule.includes(c.id.replace(/-/g, ' '))
    ) ?? null
  }, [errorsByRule])

  useEffect(() => {
    addXP(xpEarned)
    addConversation({
      scenarioId:   scenario.id,
      date:         new Date().toISOString(),
      turnCount,
      averageScore: avgScore,
      xpEarned,
      errors:       totalErrors,
    })
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const isComplete = turnCount >= 10
  const scoreLabel = isComplete ? '🎤 Conversation Complete!' : '🎯 Practice Session'

  return (
    <div className={styles.page}>

      {/* ── Score hero ── */}
      <div className={styles.scoreHero}>
        <div className={styles.scoreTitle}>{scoreLabel}</div>
        <div className={styles.scoreNum} style={{ color: scoreColor(avgScore) }}>{avgScore}</div>
        <div className={styles.scoreLabel}>Overall Score</div>
        <div className={styles.xpBreakdown}>
          <div>{breakdown}</div>
          <div className={styles.xpTotal}>+{xpEarned} XP earned</div>
        </div>
      </div>

      {/* ── Stats ── */}
      <div className={styles.statsRow}>
        <div className={styles.statCard}>
          <div className={styles.statNum} style={{ color: 'var(--acc)' }}>{turnCount}/10</div>
          <div className={styles.statLabel}>Turns</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statNum} style={{ color: 'var(--acc-p)' }}>{totalErrors}</div>
          <div className={styles.statLabel}>Errors</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statNum} style={{ color: 'var(--acc-g)' }}>{perfectTurns}</div>
          <div className={styles.statLabel}>Perfect</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statNum} style={{ color: 'var(--acc-a)' }}>{xpEarned}</div>
          <div className={styles.statLabel}>XP</div>
        </div>
      </div>

      {/* ── Error summary ── */}
      <div className={styles.block}>
        <div className={styles.blockTitle}>Common Mistakes</div>
        {errorsByRule.length === 0 ? (
          <div className={styles.noErrors}>✨ No errors found — excellent English!</div>
        ) : (
          <div className={styles.errorGroup}>
            {errorsByRule.map(([rule, errs]) => (
              <div key={rule} className={styles.errorGroupItem}>
                <div className={styles.errorRuleName}>{rule}</div>
                <div className={styles.errorRuleCount}>{errs.length} time{errs.length !== 1 ? 's' : ''}</div>
                {errs[0] && (
                  <div className={styles.errorRuleExample}>
                    <span className={styles.errOriginal}>"{errs[0].original}"</span>
                    {' → '}
                    <span className={styles.errFix}>"{errs[0].fix}"</span>
                  </div>
                )}
              </div>
            ))}
            {weakGrammarCategory && (
              <button
                className={styles.grammarLinkBtn}
                onClick={() => {
                  setActiveGrammarCategory(weakGrammarCategory.id)
                  setActiveLearnSection('grammar')
                  onGrammarReview?.()
                }}
              >
                Review {weakGrammarCategory.title} →
              </button>
            )}
          </div>
        )}
      </div>

      {/* ── Strengths ── */}
      {strengths.length > 0 && (
        <div className={styles.block}>
          <div className={styles.blockTitle}>What you did well</div>
          <div className={styles.strengthList}>
            {strengths.map((s, i) => (
              <div key={i} className={styles.strengthItem}>
                <span className={styles.strengthDot}>✓</span>
                <span>{s}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Next steps ── */}
      <div className={styles.block}>
        <div className={styles.blockTitle}>Next Steps</div>
        <div className={styles.nextList}>
          {weakGrammarCategory && (
            <div className={styles.nextItem}>
              <span className={styles.nextIcon}>📚</span>
              <span>Review <strong>{weakGrammarCategory.title}</strong> in Grammar</span>
            </div>
          )}
          <div className={styles.nextItem}>
            <span className={styles.nextIcon}>🗣️</span>
            <span>Try a harder scenario — aim for {Math.min(100, avgScore + 10)}+ score</span>
          </div>
          {totalErrors > 0 && (
            <div className={styles.nextItem}>
              <span className={styles.nextIcon}>🔄</span>
              <span>Practise this scenario again to fix your {totalErrors} error{totalErrors !== 1 ? 's' : ''}</span>
            </div>
          )}
        </div>
      </div>

      {/* ── Conversation replay ── */}
      <div className={styles.block}>
        <div className={styles.blockTitle}>Conversation Replay</div>
        <div className={styles.replayList}>
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`${styles.replayMsg} ${msg.role === 'user' ? styles.replayUser : styles.replayAI}`}
            >
              <div className={styles.replayRole}>{msg.role === 'user' ? 'You' : scenario.aiRole}</div>
              <div>{msg.content}</div>
              {msg.role === 'user' && msg.feedback?.hasErrors && (
                <div style={{ marginTop: 4, fontSize: 11, color: 'var(--acc-a)' }}>
                  💡 {msg.feedback.corrected}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ── Actions ── */}
      <div className={styles.actions}>
        <button className={styles.primaryBtn} onClick={onPracticeAgain}>
          🔄 Practice Again
        </button>
        <button className={styles.secondaryBtn} onClick={onTryAnother}>
          Try Another Scenario
        </button>
      </div>
    </div>
  )
}

export default memo(ConversationReview)
