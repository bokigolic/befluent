import { useState, useRef, useCallback, useEffect, memo } from 'react'
import useStore from '../../store/useStore'
import { useWritingCheck } from './useWritingCheck'
import CorrectionDisplay from './CorrectionDisplay'
import { MODES, getRandomPrompt, FREE_TOPICS, mapGrammarFocusToCategory } from './writingPrompts'
import styles from './WritingPage.module.css'

function ModeCard({ mode, selected, onSelect }) {
  return (
    <button
      className={`${styles.modeCard} ${selected ? styles.modeCardActive : ''}`}
      style={selected ? { borderColor: mode.color, background: `${mode.color}12` } : {}}
      onClick={() => onSelect(mode.id)}
    >
      <span className={styles.modeEmoji}>{mode.emoji}</span>
      <span className={styles.modeTitle} style={selected ? { color: mode.color } : {}}>{mode.title}</span>
      <span className={styles.modeSub}>{mode.subtitle}</span>
      <span
        className={styles.modeBadge}
        style={{ background: mode.badgeBg, color: mode.color }}
      >{mode.badge}</span>
    </button>
  )
}

function PromptCard({ mode, prompt, freeTopic, onNewPrompt, showExample, onToggleExample }) {
  if (mode === 'free') {
    return (
      <div className={styles.promptCard}>
        <div className={styles.promptLabel}>📄 Topic</div>
        <div className={styles.promptText}>{freeTopic}</div>
        <button className={styles.newPromptBtn} onClick={onNewPrompt}>↻ New topic</button>
      </div>
    )
  }
  return (
    <div className={styles.promptCard}>
      <div className={styles.promptLabel}>{mode === 'sentence' ? '✏️ Task' : '📝 Task'}</div>
      <div className={styles.promptText}>{prompt?.prompt}</div>
      {prompt?.targetGrammar && (
        <div className={styles.promptTarget}>
          Focus: {Array.isArray(prompt.targetGrammar) ? prompt.targetGrammar.join(', ') : prompt.targetGrammar}
          {prompt.difficulty && <span className={styles.diffBadge}>{prompt.difficulty}</span>}
        </div>
      )}
      <div className={styles.promptActions}>
        <button className={styles.exampleBtn} onClick={onToggleExample}>
          {showExample ? 'Hide example' : 'Show example'}
        </button>
        <button className={styles.newPromptBtn} onClick={onNewPrompt}>↻ New prompt</button>
      </div>
      {showExample && prompt?.example && (
        <div className={styles.exampleBox}>
          <span className={styles.exampleTag}>Example</span>
          <span className={styles.exampleText}>{prompt.example}</span>
        </div>
      )}
    </div>
  )
}

function HistoryEntry({ entry, onDelete }) {
  const [open, setOpen] = useState(false)
  const scoreColor = entry.score >= 90 ? 'var(--acc-g)' : entry.score >= 75 ? 'var(--acc)' : entry.score >= 60 ? 'var(--acc-a)' : 'var(--acc-p)'
  return (
    <div className={styles.histEntry}>
      <div className={styles.histHeader} onClick={() => setOpen(o => !o)}>
        <span className={styles.histScore} style={{ color: scoreColor }}>{entry.score}</span>
        <span className={styles.histMode}>{entry.mode}</span>
        <span className={styles.histDate}>{new Date(entry.date).toLocaleDateString()}</span>
        <span className={styles.histChevron}>{open ? '▲' : '▼'}</span>
        <button className={styles.histDelete} onClick={e => { e.stopPropagation(); onDelete(entry.id) }}>✕</button>
      </div>
      {open && (
        <div className={styles.histBody}>
          <div className={styles.histText}>{entry.text}</div>
          {entry.errors > 0 && <div className={styles.histErrors}>{entry.errors} error{entry.errors !== 1 ? 's' : ''} found</div>}
        </div>
      )}
    </div>
  )
}

function WritingPage() {
  const [selectedMode, setSelectedMode] = useState('sentence')
  const [prompt,       setPrompt]       = useState(() => getRandomPrompt('sentence'))
  const [freeTopicIdx, setFreeTopicIdx] = useState(0)
  const [text,         setText]         = useState('')
  const [showExample,  setShowExample]  = useState(false)
  const textareaRef = useRef(null)

  const { result, isLoading, error, checkWriting, reset } = useWritingCheck()

  const addXP             = useStore(s => s.addXP)
  const checkAchievements = useStore(s => s.checkAchievements)
  const recordPracticeResult = useStore(s => s.recordPracticeResult)
  const addWritingEntry   = useStore(s => s.addWritingEntry)
  const writingHistory    = useStore(s => s.writingHistory)
  const deleteWritingEntry = useStore(s => s.deleteWritingEntry)

  const currentMode = MODES.find(m => m.id === selectedMode)
  const wordCount   = text.trim() ? text.trim().split(/\s+/).length : 0
  const canSubmit   = wordCount >= 3 && !isLoading

  const autoResize = () => {
    const ta = textareaRef.current
    if (!ta) return
    ta.style.height = 'auto'
    ta.style.height = `${Math.max(currentMode?.minHeight ?? 120, ta.scrollHeight)}px`
  }

  useEffect(() => { autoResize() }, [text, selectedMode])

  const handleModeChange = useCallback((modeId) => {
    setSelectedMode(modeId)
    setText('')
    reset()
    setShowExample(false)
    if (modeId !== 'free') {
      setPrompt(getRandomPrompt(modeId))
    }
  }, [reset])

  const handleNewPrompt = useCallback(() => {
    reset()
    setText('')
    setShowExample(false)
    if (selectedMode === 'free') {
      setFreeTopicIdx(i => (i + 1) % FREE_TOPICS.length)
    } else {
      setPrompt(p => getRandomPrompt(selectedMode, p?.id))
    }
  }, [selectedMode, reset])

  const handleSubmit = useCallback(async () => {
    if (!canSubmit) return
    const currentPrompt = selectedMode === 'free' ? { targetGrammar: 'general', difficulty: 'B2' } : prompt
    await checkWriting(text, selectedMode, currentPrompt)
  }, [canSubmit, text, selectedMode, prompt, checkWriting])

  useEffect(() => {
    if (!result) return
    addXP(result.xpEarned ?? 10)
    addWritingEntry({
      id: Date.now(),
      date: new Date().toISOString(),
      mode: selectedMode,
      text,
      score: result.overallScore,
      errors: result.errors?.length ?? 0,
      xpEarned: result.xpEarned,
    })
    if (result.errors?.length > 0) {
      const catId = mapGrammarFocusToCategory(result.grammarFocus)
      if (catId) recordPracticeResult(catId, result.overallScore >= 75 ? 1 : 0, result.overallScore < 75 ? 1 : 0)
    }
    checkAchievements()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result])

  const handleTryAgain = useCallback(() => {
    reset()
    setText('')
  }, [reset])

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div className={styles.headerTitle}>✍️ Writing Practice</div>
        <div className={styles.headerSub}>AI-powered feedback on your English writing</div>
      </div>

      {/* Mode selector */}
      <div className={styles.modeRow}>
        {MODES.map(m => (
          <ModeCard key={m.id} mode={m} selected={selectedMode === m.id} onSelect={handleModeChange} />
        ))}
      </div>

      {/* Prompt */}
      <PromptCard
        mode={selectedMode}
        prompt={prompt}
        freeTopic={FREE_TOPICS[freeTopicIdx]}
        onNewPrompt={handleNewPrompt}
        showExample={showExample}
        onToggleExample={() => setShowExample(s => !s)}
      />

      {/* Editor or Result */}
      {result ? (
        <CorrectionDisplay
          result={result}
          mode={selectedMode}
          onTryAgain={handleTryAgain}
          onNewPrompt={handleNewPrompt}
        />
      ) : (
        <div className={styles.editorWrap}>
          {/* Toolbar */}
          <div className={styles.toolbar}>
            <button className={styles.toolBtn} onClick={() => setText('')} disabled={!text}>Clear</button>
            <button
              className={styles.toolBtn}
              onClick={() => navigator.clipboard.writeText(text)}
              disabled={!text}
            >Copy</button>
            <span className={styles.wordCount}>{wordCount} word{wordCount !== 1 ? 's' : ''}</span>
            {selectedMode === 'paragraph' && prompt?.minSentences && (
              <span className={styles.minHint}>min {prompt.minSentences} sentences</span>
            )}
          </div>

          {/* Textarea */}
          <textarea
            ref={textareaRef}
            className={styles.textarea}
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder={
              selectedMode === 'sentence'  ? 'Write your sentence here…' :
              selectedMode === 'paragraph' ? 'Write your paragraph here…' :
              'Write freely — any length, any topic…'
            }
            style={{ minHeight: currentMode?.minHeight ?? 120 }}
          />

          {/* Error */}
          {error && <div className={styles.errorMsg}>⚠️ {error}</div>}

          {/* Submit */}
          <button
            className={styles.submitBtn}
            onClick={handleSubmit}
            disabled={!canSubmit}
          >
            {isLoading ? (
              <><span className={styles.spinner} />Analyzing…</>
            ) : '✨ Check my writing'}
          </button>
        </div>
      )}

      {/* History */}
      {writingHistory.length > 0 && (
        <div className={styles.histSection}>
          <div className={styles.histTitle}>Recent submissions</div>
          {writingHistory.slice(0, 5).map(entry => (
            <HistoryEntry key={entry.id} entry={entry} onDelete={deleteWritingEntry} />
          ))}
        </div>
      )}
    </div>
  )
}

export default memo(WritingPage)
