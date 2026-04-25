import { useState, memo, useCallback, useEffect } from 'react'
import { TOPICS } from './topicsData'
import useStore from '../../store/useStore'
import styles from './TopicsPage.module.css'

const LEVEL_COLOR = { A1: '#10b981', A2: '#06b6d4', B1: '#3b82f6', B2: '#8b5cf6', C1: '#ec4899', C2: '#f59e0b' }

function TopicCard({ topic, progress, onClick }) {
  const learned = progress ? Object.keys(progress).filter(w => progress[w]).length : 0
  const pct = Math.round((learned / topic.wordCount) * 100)
  return (
    <button className={styles.topicCard} onClick={onClick} style={{ '--topic-color': topic.color }}>
      <div className={styles.topicEmoji}>{topic.emoji}</div>
      <div className={styles.topicInfo}>
        <div className={styles.topicTitle}>{topic.title}</div>
        <div className={styles.topicMeta}>
          <span className={styles.levelBadge} style={{ color: LEVEL_COLOR[topic.level] ?? '#3b82f6' }}>
            {topic.level}
          </span>
          <span className={styles.wordCount}>{topic.wordCount} words</span>
        </div>
        <div className={styles.progressBar}>
          <div className={styles.progressFill} style={{ width: `${pct}%` }} />
        </div>
        <div className={styles.progressLabel}>{learned}/{topic.wordCount} learned</div>
      </div>
    </button>
  )
}

function WordCard({ word: w, learned, onToggleLearn, onAddReview }) {
  const [flipped, setFlipped] = useState(false)
  return (
    <div className={`${styles.wordCard} ${learned ? styles.learnedCard : ''}`}>
      <div className={styles.wordTop}>
        <div>
          <span className={styles.wordText}>{w.word}</span>
          <span className={styles.partOfSpeech}>{w.partOfSpeech}</span>
          {w.level && <span className={styles.wordLevel} style={{ color: LEVEL_COLOR[w.level] ?? '#3b82f6' }}>{w.level}</span>}
        </div>
        <div className={styles.wordActions}>
          <button
            className={`${styles.learnBtn} ${learned ? styles.learnedBtn : ''}`}
            onClick={() => onToggleLearn(w.word)}
            title={learned ? 'Mark as not learned' : 'Mark as learned'}
          >
            {learned ? '✓' : '○'}
          </button>
          <button className={styles.reviewBtn} onClick={() => onAddReview(w)} title="Add to Review">
            +🔄
          </button>
        </div>
      </div>
      <div className={styles.wordDef}>{w.definition}</div>
      <div className={styles.wordSerbian}>{w.serbian}</div>
      <button className={styles.exampleToggle} onClick={() => setFlipped(v => !v)}>
        {flipped ? '▲ Hide example' : '▼ Show example'}
      </button>
      {flipped && <div className={styles.wordExample}>{w.example}</div>}
    </div>
  )
}

function FlashCard({ word: w, onNext, onPrev, current, total, onToggleLearn, learned }) {
  const [revealed, setRevealed] = useState(false)

  const handleNext = () => { setRevealed(false); onNext() }
  const handlePrev = () => { setRevealed(false); onPrev() }

  return (
    <div className={styles.flashWrap}>
      <div className={styles.flashCounter}>{current + 1} / {total}</div>
      <div className={`${styles.flashCard} ${revealed ? styles.flashRevealed : ''}`} onClick={() => setRevealed(v => !v)}>
        <div className={styles.flashFront}>
          <div className={styles.flashWord}>{w.word}</div>
          <div className={styles.flashHint}>{w.partOfSpeech}</div>
          <div className={styles.flashTap}>Tap to reveal</div>
        </div>
        {revealed && (
          <div className={styles.flashBack}>
            <div className={styles.flashDef}>{w.definition}</div>
            <div className={styles.flashSerbian}>{w.serbian}</div>
            <div className={styles.flashExample}>{w.example}</div>
          </div>
        )}
      </div>
      <div className={styles.flashControls}>
        <button className={styles.flashNav} onClick={handlePrev} disabled={current === 0}>← Prev</button>
        <button
          className={`${styles.flashLearn} ${learned ? styles.flashLearned : ''}`}
          onClick={() => onToggleLearn(w.word)}
        >
          {learned ? '✓ Learned' : 'Mark learned'}
        </button>
        <button className={styles.flashNav} onClick={handleNext} disabled={current === total - 1}>Next →</button>
      </div>
    </div>
  )
}

function TopicDetail({ topic, topicProgress, onBack, initialMode = 'browse' }) {
  const [mode, setMode] = useState(initialMode)
  const [flashIdx, setFlashIdx] = useState(0)
  const markTopicWord = useStore(s => s.markTopicWord)
  const addToReview   = useStore(s => s.addToReview)

  const isLearned = useCallback((word) => !!(topicProgress?.[word]), [topicProgress])

  const handleToggleLearn = useCallback((word) => {
    markTopicWord(topic.id, word)
  }, [topic.id, markTopicWord])

  const handleAddReview = useCallback((w) => {
    addToReview(w.word, w.serbian, 'vocabulary')
  }, [addToReview])

  const learned = topicProgress ? Object.keys(topicProgress).filter(w => topicProgress[w]).length : 0
  const pct = Math.round((learned / topic.wordCount) * 100)

  return (
    <div className={styles.detailPage}>
      <div className={styles.detailHeader}>
        <button className={styles.backBtn} onClick={onBack}>← Back</button>
        <div className={styles.detailTitle}>
          <span>{topic.emoji}</span>
          <span>{topic.title}</span>
        </div>
        <div className={styles.detailProgress}>
          <div className={styles.progressBar} style={{ width: 120 }}>
            <div className={styles.progressFill} style={{ width: `${pct}%`, background: topic.color }} />
          </div>
          <span className={styles.progressLabel}>{learned}/{topic.wordCount}</span>
        </div>
      </div>

      <div className={styles.modeBar}>
        <button className={`${styles.modeBtn} ${mode === 'browse' ? styles.modeActive : ''}`} onClick={() => setMode('browse')}>
          📋 Browse
        </button>
        <button className={`${styles.modeBtn} ${mode === 'flash' ? styles.modeActive : ''}`} onClick={() => { setMode('flash'); setFlashIdx(0) }}>
          🃏 Flashcards
        </button>
      </div>

      {mode === 'browse' && (
        <div className={styles.wordList}>
          {topic.words.map(w => (
            <WordCard
              key={w.word}
              word={w}
              learned={isLearned(w.word)}
              onToggleLearn={handleToggleLearn}
              onAddReview={handleAddReview}
            />
          ))}
        </div>
      )}

      {mode === 'flash' && (
        <FlashCard
          word={topic.words[flashIdx]}
          current={flashIdx}
          total={topic.words.length}
          learned={isLearned(topic.words[flashIdx].word)}
          onToggleLearn={handleToggleLearn}
          onNext={() => setFlashIdx(i => Math.min(i + 1, topic.words.length - 1))}
          onPrev={() => setFlashIdx(i => Math.max(i - 1, 0))}
        />
      )}

      <button className={styles.backBtn} onClick={onBack} style={{ marginTop: 12 }}>← Back to Topics</button>
    </div>
  )
}

function TopicsPage({ autoOpenQuiz = false }) {
  const [selectedTopic, setSelectedTopic] = useState(null)
  const learnedTopicWords = useStore(s => s.learnedTopicWords)

  useEffect(() => {
    if (autoOpenQuiz && TOPICS.length) {
      const rnd = TOPICS[Math.floor(Math.random() * TOPICS.length)]
      setSelectedTopic(rnd.id)
    }
  }, [autoOpenQuiz])

  if (selectedTopic) {
    const topic = TOPICS.find(t => t.id === selectedTopic)
    return (
      <TopicDetail
        topic={topic}
        topicProgress={learnedTopicWords[selectedTopic]}
        onBack={() => setSelectedTopic(null)}
        initialMode={autoOpenQuiz ? 'flash' : 'browse'}
      />
    )
  }

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <h2 className={styles.pageTitle}>Vocabulary by Topic</h2>
        <p className={styles.pageSubtitle}>Learn words grouped by real-world topics</p>
      </div>
      <div className={styles.topicsGrid}>
        {TOPICS.map(topic => (
          <TopicCard
            key={topic.id}
            topic={topic}
            progress={learnedTopicWords[topic.id]}
            onClick={() => setSelectedTopic(topic.id)}
          />
        ))}
      </div>
    </div>
  )
}

export default memo(TopicsPage)
