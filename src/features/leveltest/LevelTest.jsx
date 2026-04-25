import { useState, useRef, useCallback } from 'react'
import useStore, { ACHIEVEMENTS_DEF } from '../../store/useStore'
import styles from './LevelTest.module.css'

const QUESTIONS = [
  { id:'t1',  level:'A1', question:'Choose the correct verb:',         sentence:'She ___ a teacher.',                        options:['am','is','are','be'],                                                                                                   correct:1, explanation:"He/she/it uses 'is' in Present Simple." },
  { id:'t2',  level:'A1', question:'Choose the correct word:',         sentence:'I have ___ apple.',                          options:['a','an','the','—'],                                                                                                     correct:1, explanation:"Use 'an' before vowel sounds." },
  { id:'t3',  level:'A1', question:"What is the past tense of 'go'?",  sentence:'Yesterday I ___ to the park.',               options:['go','goes','went','gone'],                                                                                              correct:2, explanation:'Go is irregular: go → went → gone.' },
  { id:'t4',  level:'A1', question:'Choose the correct question:',      sentence:'___ your name?',                            options:['What is','What are','How is','Who are'],                                                                                 correct:0, explanation:"'What is your name?' is the correct question form." },
  { id:'t5',  level:'A2', question:'Choose the correct tense:',         sentence:'I ___ TV when she called.',                  options:['watch','watched','was watching','have watched'],                                                                        correct:2, explanation:'Past Continuous for action in progress when interrupted.' },
  { id:'t6',  level:'A2', question:'Which sentence is correct?',        sentence:'',                                           options:['I have seen him yesterday.','I saw him yesterday.','I see him yesterday.','I had seen him yesterday.'],                   correct:1, explanation:"'Yesterday' = specific time → Past Simple." },
  { id:'t7',  level:'A2', question:'Choose the correct preposition:',   sentence:'The meeting is ___ Monday ___ 9am.',         options:['in / at','on / at','at / in','on / in'],                                                                                correct:1, explanation:"Days = 'on', exact times = 'at'." },
  { id:'t8',  level:'A2', question:"What does 'raining cats and dogs' mean?", sentence:'',                                    options:['Animals are falling','It is raining heavily','The weather is strange','It will rain soon'],                              correct:1, explanation:"'Raining cats and dogs' means raining very heavily." },
  { id:'t9',  level:'B1', question:'Choose the correct form:',          sentence:'If I ___ rich, I would travel the world.',   options:['am','was','were','will be'],                                                                                            correct:2, explanation:"Second conditional uses 'were' for all persons (formal)." },
  { id:'t10', level:'B1', question:'Which is correct passive voice?',   sentence:'The report ___ by the manager yesterday.',   options:['written','was written','is written','has written'],                                                                     correct:1, explanation:'Past simple passive: was/were + past participle.' },
  { id:'t11', level:'B1', question:'Choose the correct connector:',     sentence:'___ being tired, she continued working.',    options:['Although','Despite','However','Because'],                                                                               correct:1, explanation:"'Despite' + gerund/noun, not a full clause." },
  { id:'t12', level:'B1', question:'Which uses reported speech correctly?', sentence:"He said: 'I am leaving tomorrow.'",      options:['He said he is leaving tomorrow.','He said he was leaving the next day.','He said he will leave tomorrow.','He told he was leaving.'], correct:1, explanation:'Reported speech: am→was, tomorrow→the next day.' },
  { id:'t13', level:'B2', question:'Choose the correct form:',          sentence:'If she ___ harder, she would have passed.',  options:['studied','had studied','would study','has studied'],                                                                    correct:1, explanation:'Third conditional if-clause: Past Perfect (had + pp).' },
  { id:'t14', level:'B2', question:'Which word correctly completes it?', sentence:'The policy had a significant ___ on morale.', options:['affect','effect','affection','effectively'],                                                                         correct:1, explanation:"'Effect' is the noun (impact). 'Affect' is the verb." },
  { id:'t15', level:'B2', question:'Choose the correct relative clause:', sentence:'The scientist ___ research won the prize is my professor.', options:['who','which','whose','whom'],                                                                        correct:2, explanation:"'Whose' shows possession — the scientist's research." },
  { id:'t16', level:'B2', question:'Which sentence is correct?',        sentence:'',                                           options:['I suggest to go there.','I suggest going there.','I suggest that going there.','I suggest go there.'],                   correct:1, explanation:"'Suggest' always takes gerund (-ing), never infinitive." },
  { id:'t17', level:'C1', question:'Choose the most appropriate word:', sentence:'The decision was met with widespread ___.',  options:['condemn','condemnation','condemned','condemning'],                                                                       correct:1, explanation:'Noun needed after widespread: condemnation (-tion suffix).' },
  { id:'t18', level:'C1', question:'Which sentence uses inversion correctly?', sentence:'',                                    options:['Not only she passed, but also got top marks.','Not only did she pass, but she also got top marks.','Not only she did pass, but also got top marks.','Not only passed she, but got top marks.'], correct:1, explanation:"'Not only' at start requires inversion: Not only DID she pass." },
  { id:'t19', level:'C1', question:'Choose the correct form:',          sentence:'By the time you read this, I ___ already ___.',  options:['will / leave','will have / left','would / leave','have / left'],                                                  correct:1, explanation:'Future Perfect: will have + past participle.' },
  { id:'t20', level:'C1', question:'Which is the correct passive reporting?', sentence:'',                                     options:['It is said that he has fled.','It is said that he fled.','It said that he fled.','It is saying that he fled.'],           correct:1, explanation:"Passive reporting: 'It is said that' + past simple." },
]

const LEVEL_RESULTS = [
  { range:[0,4],   level:'A1', name:'Beginner',          emoji:'🌱', color:'#10b981', desc:"You're just starting out. Focus on basic vocabulary and Present Simple." },
  { range:[5,8],   level:'A2', name:'Elementary',        emoji:'📖', color:'#3b82f6', desc:'Good foundation! Work on past tenses and common phrases.' },
  { range:[9,12],  level:'B1', name:'Intermediate',      emoji:'⭐', color:'#8b5cf6', desc:'Solid intermediate level. Focus on conditionals and passive voice.' },
  { range:[13,16], level:'B2', name:'Upper Intermediate', emoji:'🎯', color:'#f59e0b', desc:'Upper intermediate — great job! Work on advanced grammar and vocabulary.' },
  { range:[17,20], level:'C1', name:'Advanced',          emoji:'🏆', color:'#ef4444', desc:'Advanced level! Fine-tune nuances, idioms and complex structures.' },
]

const PLANS = {
  A1: { node: 1, steps: [
    { emoji:'📚', title:'Grammar: Present Simple',    section:'grammar' },
    { emoji:'🗂️', title:'Topics: Basic Vocabulary',  section:'topics' },
    { emoji:'📖', title:'Grammar: Articles & Nouns', section:'grammar' },
  ]},
  A2: { node: 5, steps: [
    { emoji:'📚', title:'Grammar: Past Tenses',       section:'grammar' },
    { emoji:'📰', title:'News: A2 Articles',          section:'news' },
    { emoji:'💬', title:'Idioms: Common Phrases',     section:'idioms' },
  ]},
  B1: { node: 9, steps: [
    { emoji:'📚', title:'Grammar: Conditionals',      section:'grammar' },
    { emoji:'📰', title:'News: B1 Articles',          section:'news' },
    { emoji:'✍️', title:'Writing Practice',           section:'writing' },
  ]},
  B2: { node: 13, steps: [
    { emoji:'📚', title:'Grammar: Reported Speech',   section:'grammar' },
    { emoji:'📰', title:'News: B2 Articles',          section:'news' },
    { emoji:'🗣️', title:'Conversation Simulator',    section:'conversations' },
  ]},
  C1: { node: 17, steps: [
    { emoji:'📚', title:'Grammar: Word Formation',    section:'grammar' },
    { emoji:'📰', title:'News: C1 Articles',          section:'news' },
    { emoji:'🗣️', title:'Advanced Conversations',    section:'conversations' },
  ]},
}

function getLevelResult(score) {
  return LEVEL_RESULTS.find(r => score >= r.range[0] && score <= r.range[1]) ?? LEVEL_RESULTS[0]
}

const LEVEL_ORDER = ['A1','A2','B1','B2','C1']
const LEVEL_COLORS = { A1:'#10b981', A2:'#3b82f6', B1:'#8b5cf6', B2:'#f59e0b', C1:'#ef4444' }

function QuestionCard({ q, index, total, onAnswer, answered, selected }) {
  const hasSentence = q.sentence.trim().length > 0

  return (
    <div className={styles.questionCard}>
      <div className={styles.qMeta}>
        <span className={styles.qCounter}>{index + 1} / {total}</span>
        {answered && (
          <span className={styles.levelPill} style={{ background: `${LEVEL_COLORS[q.level]}22`, color: LEVEL_COLORS[q.level] }}>
            {q.level}
          </span>
        )}
      </div>

      <div className={styles.qText}>{q.question}</div>

      {hasSentence && (
        <div className={styles.qSentence}>
          {q.sentence.split('___').map((part, i, arr) =>
            i < arr.length - 1
              ? <span key={i}>{part}<span className={styles.blank}>_____</span></span>
              : <span key={i}>{part}</span>
          )}
        </div>
      )}

      <div className={styles.options}>
        {q.options.map((opt, i) => {
          let cls = styles.optBtn
          if (answered) {
            if (i === q.correct)                       cls += ` ${styles.optCorrect}`
            else if (i === selected && i !== q.correct) cls += ` ${styles.optWrong}`
            else                                        cls += ` ${styles.optDim}`
          } else if (i === selected) {
            cls += ` ${styles.optSelected}`
          }
          return (
            <button key={i} className={cls} onClick={() => !answered && onAnswer(i)} disabled={answered}>
              <span className={styles.optLetter}>{String.fromCharCode(65 + i)}</span>
              <span className={styles.optText}>{opt}</span>
              {answered && i === q.correct  && <span className={styles.optIcon}>✓</span>}
              {answered && i === selected && i !== q.correct && <span className={styles.optIcon}>✗</span>}
            </button>
          )
        })}
      </div>

      {answered && (
        <div className={`${styles.explanation} ${selected === q.correct ? styles.explanationOk : styles.explanationErr}`}>
          <span>{selected === q.correct ? '✓' : 'ℹ'}</span>
          {q.explanation}
        </div>
      )}
    </div>
  )
}

function ResultsScreen({ score, onGoSection, onClose }) {
  const result = getLevelResult(score)
  const plan   = PLANS[result.level]
  const addXP  = useStore(s => s.addXP)
  const saveTestResult = useStore(s => s.saveTestResult)
  const xpRef  = useRef(false)

  if (!xpRef.current) {
    xpRef.current = true
    addXP(20)
    saveTestResult({ level: result.level, name: result.name, score, date: new Date().toISOString() })
  }

  return (
    <div className={styles.results}>
      <div className={styles.resultsBadge} style={{ color: result.color, borderColor: `${result.color}44` }}>
        <span className={styles.resultEmoji}>{result.emoji}</span>
        <span className={styles.resultLevel}>{result.level}</span>
        <span className={styles.resultName}>{result.name}</span>
      </div>

      <div className={styles.resultsScore}>You answered <strong>{score}</strong> out of 20 correctly</div>
      <div className={styles.resultsDesc}>{result.desc}</div>

      <div className={styles.planSection}>
        <div className={styles.planTitle}>Your Learning Path</div>
        <div className={styles.planCards}>
          {plan.steps.map((step, i) => (
            <button key={i} className={styles.planCard} onClick={() => onGoSection(step.section)} style={{ '--plan-color': result.color }}>
              <span className={styles.planEmoji}>{step.emoji}</span>
              <span className={styles.planText}>{step.title}</span>
              <span className={styles.planArrow}>Start →</span>
            </button>
          ))}
        </div>
      </div>

      {(() => {
        const ach = ACHIEVEMENTS_DEF.find(a => a.id === 'level_test')
        return <div className={styles.xpEarned}>🎉 +{ach?.xpReward ?? 20} XP earned · Achievement unlocked: {ach?.title ?? 'Self-Aware'} {ach?.emoji ?? '🎯'}</div>
      })()}

      <button className={styles.closeBtn} onClick={onClose}>Go to Learn Hub</button>
    </div>
  )
}

export default function LevelTest({ onClose, onGoSection }) {
  const [index,    setIndex]    = useState(0)
  const [selected, setSelected] = useState(null)
  const [answered, setAnswered] = useState(false)
  const [score,    setScore]    = useState(0)
  const [done,     setDone]     = useState(false)
  const [warnExit, setWarnExit] = useState(false)

  const q     = QUESTIONS[index]
  const total = QUESTIONS.length

  const handleAnswer = useCallback((i) => {
    if (answered) return
    setSelected(i)
    setAnswered(true)
    if (i === q.correct) setScore(s => s + 1)
  }, [answered, q])

  const handleNext = () => {
    if (index + 1 >= total) {
      setDone(true)
    } else {
      setIndex(i => i + 1)
      setSelected(null)
      setAnswered(false)
    }
  }

  const handleBackAttempt = () => {
    if (done) { onClose(); return }
    setWarnExit(true)
  }

  const pct = Math.round((index / total) * 100)

  if (done) {
    return (
      <div className={styles.overlay}>
        <div className={styles.inner}>
          <ResultsScreen
            score={score}
            onGoSection={(sec) => { onGoSection(sec); onClose() }}
            onClose={onClose}
          />
        </div>
      </div>
    )
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.inner}>
        {/* Header */}
        <div className={styles.header}>
          <button className={styles.backBtn} onClick={handleBackAttempt}>← Back</button>
          <span className={styles.headerTitle}>🎯 English Level Test</span>
          <span className={styles.headerScore}>{index}/{total}</span>
        </div>

        {/* Progress */}
        <div className={styles.progressTrack}>
          <div className={styles.progressFill} style={{ width: `${pct}%` }} />
        </div>

        {/* Level band labels */}
        <div className={styles.bandRow}>
          {LEVEL_ORDER.map(lvl => (
            <span key={lvl} className={styles.bandLabel} style={{ color: LEVEL_COLORS[lvl] }}>{lvl}</span>
          ))}
        </div>

        {/* Question */}
        <QuestionCard
          key={index}
          q={q}
          index={index}
          total={total}
          onAnswer={handleAnswer}
          answered={answered}
          selected={selected}
        />

        {answered && (
          <button className={styles.nextBtn} onClick={handleNext}>
            {index + 1 >= total ? 'See Results →' : 'Next Question →'}
          </button>
        )}

        {/* Exit warning */}
        {warnExit && (
          <div className={styles.warnOverlay}>
            <div className={styles.warnBox}>
              <div className={styles.warnTitle}>Exit test?</div>
              <div className={styles.warnText}>Your progress will be lost. The test has {total} questions and takes about 5 minutes.</div>
              <div className={styles.warnBtns}>
                <button className={styles.warnStay} onClick={() => setWarnExit(false)}>Continue Test</button>
                <button className={styles.warnLeave} onClick={onClose}>Exit</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
