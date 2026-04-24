import { useState, useEffect, useRef, useCallback, memo } from 'react'
import { useConversation } from './useConversation'
import ConversationReview from './ConversationReview'
import styles from './ConversationChat.module.css'

// ── Typing indicator ──────────────────────────────────────────────────────────
function TypingIndicator({ scenario }) {
  return (
    <div className={styles.typingRow}>
      <div className={styles.aiAvatar} style={{ background: `${scenario.color}28` }}>
        {scenario.emoji}
      </div>
      <div className={styles.typingBubble}>
        <span className={styles.dot} />
        <span className={styles.dot} />
        <span className={styles.dot} />
      </div>
    </div>
  )
}

// ── Feedback bubble ───────────────────────────────────────────────────────────
function FeedbackBubble({ feedback }) {
  const [expanded, setExpanded] = useState(false)
  if (!feedback) return null

  if (!feedback.hasErrors) {
    return (
      <div className={`${styles.feedbackBubble} ${styles.feedbackPerfect}`}>
        ✓ Perfect English!
      </div>
    )
  }

  return (
    <div className={styles.feedbackWrap}>
      <button
        className={styles.feedbackBubble}
        onClick={() => setExpanded(e => !e)}
      >
        💡 Better: &ldquo;{feedback.corrected}&rdquo;
        {feedback.errors.length > 0 && (
          <span className={styles.feedbackToggle}>{expanded ? '▲' : '▼'}</span>
        )}
      </button>
      {expanded && feedback.errors.length > 0 && (
        <div className={styles.feedbackErrors}>
          {feedback.errors.map((err, i) => (
            <div key={i} className={styles.errorItem}>
              <span className={styles.errOriginal}>&ldquo;{err.original}&rdquo;</span>
              {' → '}
              <span className={styles.errFix}>&ldquo;{err.fix}&rdquo;</span>
              <div className={styles.errRule}>{err.rule}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ── Message item ──────────────────────────────────────────────────────────────
function MessageItem({ msg, scenario }) {
  if (msg.role === 'assistant') {
    return (
      <div className={styles.aiRow}>
        <div className={styles.aiAvatar} style={{ background: `${scenario.color}28` }}>
          {scenario.emoji}
        </div>
        <div className={styles.aiCol}>
          <div className={styles.aiName}>{scenario.aiRole}</div>
          <div className={styles.aiBubble}>{msg.content}</div>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.userRow}>
      <div className={styles.userBubble}>{msg.content}</div>
      {msg.feedback && <FeedbackBubble feedback={msg.feedback} />}
    </div>
  )
}

// ── Phrase helper ─────────────────────────────────────────────────────────────
function PhraseHelper({ phrases, onSelect }) {
  const [open, setOpen] = useState(false)

  const handleSelect = (phrase) => {
    onSelect(phrase)
    setOpen(false)
  }

  return (
    <div className={styles.hintBar}>
      <button className={styles.hintToggle} onClick={() => setOpen(o => !o)}>
        📚 Phrases {open ? '▲' : '▼'}
      </button>
      {open && (
        <div className={styles.hintPanel}>
          {phrases.map((phrase, i) => (
            <button
              key={i}
              className={styles.phraseBtn}
              onClick={() => handleSelect(phrase)}
            >
              {phrase}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

// ── Main ConversationChat ─────────────────────────────────────────────────────
function ConversationChat({ scenario, onBack }) {
  const { messages, isLoading, turnCount, conversationComplete, startConversation, sendMessage, reset } =
    useConversation(scenario)

  const [input,         setInput]       = useState('')
  const [showBanner,    setShowBanner]  = useState(true)
  const [showReview,    setShowReview]  = useState(false)
  const textareaRef = useRef(null)
  const messagesRef = useRef(null)

  // Start conversation on mount
  useEffect(() => {
    startConversation()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // Auto-scroll to bottom
  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight
    }
  }, [messages, isLoading])

  // Auto-show review when conversation completes
  useEffect(() => {
    if (conversationComplete) {
      const t = setTimeout(() => setShowReview(true), 800)
      return () => clearTimeout(t)
    }
  }, [conversationComplete])

  // Textarea auto-resize
  const handleInputChange = useCallback((e) => {
    setInput(e.target.value)
    const el = e.target
    el.style.height = 'auto'
    el.style.height = `${Math.min(el.scrollHeight, 100)}px`
  }, [])

  const handleSend = useCallback(() => {
    if (!input.trim() || isLoading) return
    sendMessage(input.trim())
    setInput('')
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
    }
  }, [input, isLoading, sendMessage])

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }, [handleSend])

  const handlePracticeAgain = useCallback(() => {
    reset()
    setShowReview(false)
    setInput('')
    setShowBanner(true)
    startConversation()
  }, [reset, startConversation])

  if (showReview) {
    return (
      <ConversationReview
        scenario={scenario}
        messages={messages}
        onPracticeAgain={handlePracticeAgain}
        onTryAnother={onBack}
        onGrammarReview={onBack}
      />
    )
  }

  return (
    <div className={styles.chatPage}>

      {/* ── Header ── */}
      <div className={styles.chatHeader}>
        <button className={styles.backBtn} onClick={onBack}>← Scenarios</button>
        <div className={styles.headerCenter}>
          <span className={styles.headerEmoji}>{scenario.emoji}</span>
          <span className={styles.headerTitle}>{scenario.title}</span>
          <span className={styles.headerLevel}>{scenario.level}</span>
        </div>
        <div className={styles.headerRight}>
          <span className={styles.turnCounter}>Turn {turnCount}/10</span>
          <button
            className={styles.endBtn}
            onClick={() => setShowReview(true)}
            disabled={messages.length < 2}
          >
            End &amp; Review
          </button>
        </div>
      </div>

      {/* ── Scenario banner ── */}
      {showBanner && (
        <div
          className={styles.scenarioBanner}
          style={{
            background: `${scenario.color}14`,
            borderColor: `${scenario.color}30`,
          }}
        >
          <div className={styles.bannerContent}>
            <div className={styles.bannerSetting}>{scenario.setting}</div>
            <div className={styles.bannerGoal}>Your goal: have a natural conversation for 10 turns</div>
          </div>
          <button className={styles.bannerDismiss} onClick={() => setShowBanner(false)}>✕</button>
        </div>
      )}

      {/* ── Messages ── */}
      <div className={styles.messages} ref={messagesRef}>
        {messages.map(msg => (
          <MessageItem key={msg.id} msg={msg} scenario={scenario} />
        ))}
        {isLoading && <TypingIndicator scenario={scenario} />}
      </div>

      {/* ── Phrase helper ── */}
      <PhraseHelper
        phrases={scenario.phrases}
        onSelect={(phrase) => {
          setInput(phrase)
          textareaRef.current?.focus()
        }}
      />

      {/* ── Input area ── */}
      <div className={styles.inputArea}>
        <div className={styles.inputRow}>
          <textarea
            ref={textareaRef}
            className={styles.textarea}
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="Type your response…"
            rows={1}
            disabled={isLoading || conversationComplete}
          />
          <button
            className={styles.sendBtn}
            onClick={handleSend}
            disabled={!input.trim() || isLoading || conversationComplete}
            aria-label="Send"
          >
            →
          </button>
        </div>
      </div>
    </div>
  )
}

export default memo(ConversationChat)
