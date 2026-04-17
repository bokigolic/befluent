import { useState, useRef } from 'react'
import useDictionary from '../../hooks/useDictionary'
import useTranslation from '../../hooks/useTranslation'
import useRelatedWords from '../../hooks/useRelatedWords'
import useSuggestions from '../../hooks/useSuggestions'
import styles from './ResultCard.module.css'

const POS_COLORS = {
  noun:      { background: 'rgba(124,111,255,0.18)', color: '#a99fff' },
  verb:      { background: 'rgba(0,229,160,0.15)',   color: '#00e5a0' },
  adjective: { background: 'rgba(255,169,77,0.18)',  color: '#ffa94d' },
  adverb:    { background: 'rgba(255,107,157,0.18)', color: '#ff6b9d' },
}

function PosTag({ pos }) {
  const style = POS_COLORS[pos] ?? { background: 'rgba(255,255,255,0.08)', color: 'var(--t2)' }
  return <span className={styles.posTag} style={style}>{pos}</span>
}

function Skeleton() {
  return (
    <div className={styles.skelWrap}>
      <div className={styles.skelLine} style={{ width: '40%', height: 32 }} />
      <div className={styles.skelLine} style={{ width: '25%', height: 16 }} />
      <div className={styles.skelLine} style={{ width: '100%', height: 14 }} />
      <div className={styles.skelLine} style={{ width: '80%', height: 14 }} />
    </div>
  )
}

export default function ResultCard({ word, dictMode, onWordClick }) {
  const { data, isLoading: dictLoading, error } = useDictionary(word)
  const { translation, alternatives, isLoading: transLoading } = useTranslation(word, dictMode)
  const { words: relatedWords } = useRelatedWords(word)
  const { suggestions } = useSuggestions(word, !!error)

  const [toast, setToast] = useState(null)
  const toastTimer = useRef(null)
  const pressTimer = useRef(null)

  const isLoading = dictLoading || transLoading

  const showToast = (msg) => {
    setToast(msg)
    clearTimeout(toastTimer.current)
    toastTimer.current = setTimeout(() => setToast(null), 2000)
  }

  const handlePressStart = () => {
    pressTimer.current = setTimeout(async () => {
      try {
        await navigator.clipboard.writeText(word)
        showToast('Copied! ✓')
      } catch {}
    }, 500)
  }

  const handlePressEnd = () => clearTimeout(pressTimer.current)

  if (isLoading) return <Skeleton />

  if (error) {
    return (
      <div className={styles.errorBox}>
        <div className={styles.errorTitle}>
          <span>⚠️</span>
          <span className={styles.errorText}>Word not found</span>
        </div>
        {suggestions.length > 0 && (
          <>
            <p className={styles.errorSub}>Did you mean:</p>
            <div className={styles.pills}>
              {suggestions.map((s) => (
                <button key={s} className={styles.pill} onClick={() => onWordClick(s)}>
                  {s}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    )
  }

  if (!data) return null

  const showTranslation = dictMode !== 'en-en' && translation
  const transLabel = dictMode === 'en-sr' ? 'Serbian' : 'English'

  return (
    <>
      {showTranslation && (
        <div className={styles.translationBox}>
          <div className={styles.transLabel}>{transLabel}</div>
          <div className={styles.transMain}>{translation}</div>
          {alternatives.length > 0 && (
            <div className={styles.transAlts}>Also: {alternatives.join(' · ')}</div>
          )}
        </div>
      )}

      <div className={styles.card}>
        <div className={styles.hero}>
          <span
            className={styles.wordText}
            onMouseDown={handlePressStart}
            onMouseUp={handlePressEnd}
            onMouseLeave={handlePressEnd}
            onTouchStart={handlePressStart}
            onTouchEnd={handlePressEnd}
            title="Long press to copy"
          >
            {data.word}
          </span>
          {data.phonetic && <span className={styles.phonetic}>{data.phonetic}</span>}
          {data.audioUrl && (
            <button
              className={styles.audioBtn}
              onClick={() => new Audio(data.audioUrl).play()}
            >
              ▶ Listen
            </button>
          )}
        </div>

        {data.meanings.map((meaning, mi) => (
          <div key={mi}>
            {mi > 0 && <hr className={styles.divider} />}
            <PosTag pos={meaning.partOfSpeech} />

            {meaning.definitions.slice(0, 3).map((def, di) => (
              <div key={di} className={styles.defBlock}>
                <p className={styles.defText}>
                  <span className={styles.defNum}>{di + 1}.</span> {def.definition}
                </p>
                {def.example && (
                  <p className={styles.example}>"{def.example}"</p>
                )}
              </div>
            ))}

            {meaning.synonyms?.length > 0 && (
              <>
                <div className={styles.pillLabel}>Synonyms</div>
                <div className={styles.pills}>
                  {meaning.synonyms.slice(0, 8).map((s) => (
                    <button key={s} className={styles.pill} onClick={() => onWordClick(s)}>
                      {s}
                    </button>
                  ))}
                </div>
              </>
            )}

            {meaning.antonyms?.length > 0 && (
              <>
                <div className={styles.pillLabel}>Antonyms</div>
                <div className={styles.pills}>
                  {meaning.antonyms.slice(0, 8).map((a) => (
                    <button key={a} className={styles.pill} onClick={() => onWordClick(a)}>
                      {a}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        ))}

        {relatedWords.length > 0 && (
          <>
            <hr className={styles.divider} />
            <div className={styles.pillLabel}>Related words</div>
            <div className={styles.pills}>
              {relatedWords.map((w) => (
                <button
                  key={w}
                  className={`${styles.pill} ${styles.pillRelated}`}
                  onClick={() => onWordClick(w)}
                >
                  {w}
                </button>
              ))}
            </div>
          </>
        )}
      </div>

      {toast && <div className={styles.toast}>{toast}</div>}
    </>
  )
}
