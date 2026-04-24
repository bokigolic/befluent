import { useState, memo } from 'react'
import { SCENARIOS } from './conversationsData'
import ConversationChat from './ConversationChat'
import styles from './ConversationsPage.module.css'

function ScenarioCard({ scenario, onClick }) {
  return (
    <button
      className={styles.scenarioCard}
      style={{
        '--card-color': scenario.color,
        '--card-shadow': `${scenario.color}26`,
      }}
      onClick={() => onClick(scenario)}
    >
      <div className={styles.cardTop}>
        <span className={styles.cardEmoji}>{scenario.emoji}</span>
        <span className={styles.levelBadge}>{scenario.level}</span>
      </div>
      <div className={styles.cardTitle}>{scenario.title}</div>
      <div className={styles.cardSub}>{scenario.subtitle}</div>
      <div className={styles.cardCta}>Start conversation →</div>
    </button>
  )
}

function ScenarioGrid({ onBack, onSelect }) {
  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>🗣️ Conversation Practice</h1>
        <p className={styles.subtitle}>Practice real English with an AI partner</p>
        <span className={styles.stats}>12 scenarios · All levels</span>
      </div>
      <div className={styles.grid}>
        {SCENARIOS.map(s => (
          <ScenarioCard key={s.id} scenario={s} onClick={onSelect} />
        ))}
      </div>
    </div>
  )
}

function ConversationsPage({ onBack }) {
  const [scenario, setScenario] = useState(null)

  if (scenario) {
    return (
      <ConversationChat
        scenario={scenario}
        onBack={() => setScenario(null)}
      />
    )
  }

  return <ScenarioGrid onBack={onBack} onSelect={setScenario} />
}

export default memo(ConversationsPage)
