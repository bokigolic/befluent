import { useState, memo } from 'react'
import useStore from '../../store/useStore'
import { CATEGORIES } from '../grammar/GrammarSection'
import { mapGrammarFocusToCategory } from './writingPrompts'
import styles from './CorrectionDisplay.module.css'

const TYPE_COLORS = {
  grammar:     { bg: 'rgba(124,111,255,0.15)', color: 'var(--acc)' },
  spelling:    { bg: 'rgba(255,169,77,0.15)',  color: 'var(--acc-a)' },
  punctuation: { bg: 'rgba(180,180,180,0.15)', color: 'var(--t2)' },
  'word-choice': { bg: 'rgba(255,107,157,0.15)', color: 'var(--acc-p)' },
  style:       { bg: 'rgba(0,229,160,0.15)',   color: 'var(--acc-g)' },
}

const SEVERITY_BORDER = {
  critical:  'var(--acc-p)',
  important: 'var(--acc-a)',
  minor:     'var(--t3)',
}

function ScoreColor(score) {
  if (score >= 90) return 'var(--acc-g)'
  if (score >= 75) return 'var(--acc)'
  if (score >= 60) return 'var(--acc-a)'
  return 'var(--acc-p)'
}

function ScoreLabel(score) {
  if (score >= 90) return 'Excellent! 🏆'
  if (score >= 75) return 'Great job! ⭐'
  if (score >= 60) return 'Good effort! 💪'
  return 'Keep practicing! 📚'
}

function CorrectionDisplay({ result, mode, cat, onTryAgain, onNewPrompt }) {
  const [copied, setCopied] = useState(false)
  const setActivePage             = useStore(s => s.setActivePage)
  const setActiveGrammarCategory  = useStore(s => s.setActiveGrammarCategory)

  const { overallScore, overallFeedback, correctedText, errors, strengths,
          suggestions, grammarFocus, encouragement, xpEarned } = result

  const scoreColor = ScoreColor(overallScore)
  const hasErrors  = errors.length > 0

  const copyCorrection = async () => {
    try { await navigator.clipboard.writeText(correctedText); setCopied(true); setTimeout(() => setCopied(false), 2000) } catch {}
  }

  const goToGrammar = (catId) => {
    setActiveGrammarCategory(catId)
    setActivePage('grammar')
  }

  const grammarCatId = mapGrammarFocusToCategory(grammarFocus)
  const grammarCat   = grammarCatId ? CATEGORIES.find(c => c.id === grammarCatId) : null

  const shareScore = async () => {
    const text = `I scored ${overallScore}/100 on a ${mode} writing exercise! ${ScoreLabel(overallScore)} — BeFluent`
    try {
      if (navigator.share) { await navigator.share({ title: 'My BeFluent Writing Score', text }) }
      else { await navigator.clipboard.writeText(text) }
    } catch {}
  }

  return (
    <div className={styles.wrap}>
      {/* Score header */}
      <div className={styles.scoreCard}>
        <div className={styles.scoreNum} style={{ color: scoreColor }}>{overallScore}</div>
        <div className={styles.scoreLabel} style={{ color: scoreColor }}>{ScoreLabel(overallScore)}</div>
        <p className={styles.scoreFeedback}>{overallFeedback}</p>
        <span className={styles.xpBadge}>+{xpEarned} XP</span>
      </div>

      {/* Corrected text */}
      {hasErrors && correctedText && (
        <div className={styles.section}>
          <div className={styles.sLabel} style={{ color: 'var(--acc-g)' }}>✅ Corrected version</div>
          <div className={styles.correctedBox}>
            <p className={styles.correctedText}>{correctedText}</p>
            <button className={styles.copySmallBtn} onClick={copyCorrection}>
              {copied ? 'Copied ✓' : 'Copy'}
            </button>
          </div>
        </div>
      )}

      {/* Errors */}
      {hasErrors && (
        <div className={styles.section}>
          <div className={styles.sLabel} style={{ color: 'var(--acc-p)' }}>❌ Errors found ({errors.length})</div>
          <div className={styles.errorList}>
            {errors.map((err, i) => {
              const tc = TYPE_COLORS[err.type] ?? TYPE_COLORS.grammar
              const severityBorder = SEVERITY_BORDER[err.severity] ?? SEVERITY_BORDER.minor
              const errCatId = mapGrammarFocusToCategory(err.rule)
              const errCat   = errCatId ? CATEGORIES.find(c => c.id === errCatId) : null
              return (
                <div key={i} className={styles.errorCard} style={{ borderLeftColor: severityBorder }}>
                  <div className={styles.errorBadges}>
                    <span className={styles.typeBadge} style={{ background: tc.bg, color: tc.color }}>
                      {err.type}
                    </span>
                    <span className={styles.severityBadge} style={{ color: severityBorder }}>
                      {err.severity}
                    </span>
                  </div>
                  <div className={styles.errorDiff}>
                    <span className={styles.errorWrong}>{err.original}</span>
                    <span className={styles.errorArrow}>→</span>
                    <span className={styles.errorCorrect}>{err.corrected}</span>
                  </div>
                  {err.rule && <div className={styles.errorRule}>{err.rule}</div>}
                  <div className={styles.errorExplain}>{err.explanation}</div>
                  {errCat && (
                    <button className={styles.reviewRuleBtn} onClick={() => goToGrammar(errCat.id)}>
                      Review {errCat.title} →
                    </button>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Strengths */}
      {strengths.length > 0 && (
        <div className={styles.section}>
          <div className={styles.sLabel} style={{ color: 'var(--acc-g)' }}>💪 What you did well</div>
          <div className={styles.greenList}>
            {strengths.map((s, i) => (
              <div key={i} className={styles.greenItem}>
                <span className={styles.greenCheck}>✓</span>{s}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Suggestions */}
      {suggestions.length > 0 && (
        <div className={styles.section}>
          <div className={styles.sLabel} style={{ color: 'var(--acc)' }}>💡 How to improve</div>
          <div className={styles.purpleList}>
            {suggestions.map((s, i) => (
              <div key={i} className={styles.purpleItem}>
                <span className={styles.purpleArrow}>→</span>{s}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Grammar focus */}
      {grammarFocus && (
        <div className={styles.section}>
          <div className={styles.sLabel} style={{ color: 'var(--acc)' }}>📚 Focus on</div>
          <div className={styles.focusBox}>
            <div className={styles.focusText}>{grammarFocus}</div>
            {grammarCat && (
              <button className={styles.focusBtn} onClick={() => goToGrammar(grammarCat.id)}>
                Go to {grammarCat.title} lessons →
              </button>
            )}
          </div>
        </div>
      )}

      {/* Encouragement */}
      {encouragement && (
        <div className={styles.encouragement}>{encouragement}</div>
      )}

      {/* Actions */}
      <div className={styles.actions}>
        <button className={styles.tryAgainBtn} onClick={onTryAgain}>Try again</button>
        <button className={styles.newPromptBtn} onClick={onNewPrompt}>New prompt</button>
        <button className={styles.shareBtn} onClick={shareScore}>Share score</button>
      </div>
    </div>
  )
}

export default memo(CorrectionDisplay)
