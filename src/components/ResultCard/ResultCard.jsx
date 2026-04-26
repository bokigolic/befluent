import { useState, useRef, useEffect, useMemo, memo } from 'react'
import useDictionary from '../../hooks/useDictionary'
import useTranslation from '../../hooks/useTranslation'
import useRelatedWords from '../../hooks/useRelatedWords'
import useSuggestions from '../../hooks/useSuggestions'
import useStore from '../../store/useStore'
import { findIdiomsForWord } from '../../features/idioms/idiomsData'
import styles from './ResultCard.module.css'

const POS_COLORS = {
  noun:      { background: 'rgba(124,111,255,0.18)', color: '#a99fff' },
  verb:      { background: 'rgba(0,229,160,0.15)',   color: '#00e5a0' },
  adjective: { background: 'rgba(255,169,77,0.18)',  color: '#ffa94d' },
  adverb:    { background: 'rgba(255,107,157,0.18)', color: '#ff6b9d' },
}

function BookmarkIcon({ filled }) {
  return (
    <svg width="15" height="17" viewBox="0 0 15 17" fill="none" xmlns="http://www.w3.org/2000/svg">
      {filled
        ? <path d="M1.5 1.5h12a.5.5 0 0 1 .5.5v13.5l-6.5-3.5L1 15.5V2a.5.5 0 0 1 .5-.5z" fill="currentColor"/>
        : <path d="M1.5 1.5h12a.5.5 0 0 1 .5.5v13.5l-6.5-3.5L1 15.5V2a.5.5 0 0 1 .5-.5z" stroke="currentColor" strokeWidth="1.4" fill="none"/>
      }
    </svg>
  )
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

function MeaningBlock({ meaning, mi, onWordClick }) {
  const [expanded, setExpanded] = useState(false)
  const defs  = meaning.definitions
  const shown = expanded ? defs : defs.slice(0, 3)
  const extra = defs.length - 3

  return (
    <div style={{ animationDelay: `${mi * 80}ms` }} className={styles.meaningBlock}>
      {mi > 0 && <hr className={styles.divider} />}
      <PosTag pos={meaning.partOfSpeech} />

      {shown.map((def, di) => (
        <div key={di} className={styles.defBlock}>
          <p className={styles.defText}>
            <span className={styles.defNum}>{di + 1}.</span> {def.definition}
          </p>
          {def.example && <p className={styles.example}>"{def.example}"</p>}
        </div>
      ))}

      {!expanded && extra > 0 && (
        <button className={styles.expandBtn} onClick={() => setExpanded(true)}>
          Show {extra} more
        </button>
      )}
      {expanded && extra > 0 && (
        <button className={styles.expandBtn} onClick={() => setExpanded(false)}>
          Show less
        </button>
      )}

      {meaning.synonyms?.length > 0 && (
        <>
          <div className={styles.pillLabel}>Synonyms</div>
          <div className={styles.pills}>
            {meaning.synonyms.slice(0, 8).map((s, pi) => (
              <button
                key={s}
                className={styles.pill}
                style={{ animationDelay: `${pi * 20}ms` }}
                onClick={() => onWordClick(s)}
              >
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
            {meaning.antonyms.slice(0, 8).map((a, pi) => (
              <button
                key={a}
                className={styles.pill}
                style={{ animationDelay: `${pi * 20}ms` }}
                onClick={() => onWordClick(a)}
              >
                {a}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

// ── Comparative / Superlative helper ─────────────────────────────────────────
function getComparativeForm(w) {
  const vowels = 'aeiou'
  if (w.endsWith('e')) return `"${w}r" / "the ${w}st"`
  if (w.endsWith('y') && w.length > 2 && !vowels.includes(w[w.length - 2])) {
    const stem = w.slice(0, -1)
    return `"${stem}ier" / "the ${stem}iest"`
  }
  if (w.length >= 3) {
    const last = w[w.length - 1], prev = w[w.length - 2], prev2 = w[w.length - 3]
    if (!vowels.includes(last) && vowels.includes(prev) && !vowels.includes(prev2)) {
      return `"${w}${last}er" / "the ${w}${last}est"`
    }
  }
  if (w.length > 6) return `"more ${w}" / "the most ${w}"`
  return `"${w}er" / "the ${w}est"`
}

// ── Grammar usage hint ────────────────────────────────────────────────────────
const GERUND_VERBS = ['enjoy','avoid','finish','suggest','mind','miss','consider','risk','practice','keep','imagine','admit','deny','delay','recommend','involve','resist','appreciate','discuss','mention','postpone','quit','recall']
const INFINITIVE_VERBS = ['want','need','decide','hope','plan','agree','refuse','manage','fail','seem','appear','tend','offer','promise','choose','expect','learn','wish','afford','arrange','attempt','claim','demand','deserve','pretend','proceed']
const BOTH_VERBS = ['like','love','hate','prefer','start','begin','continue','remember','forget','stop','try','regret']
const ADJ_PREP = { interested:'in', good:'at', bad:'at', afraid:'of', proud:'of', tired:'of', responsible:'for', famous:'for', similar:'to', different:'from', married:'to', excited:'about', worried:'about', keen:'on', fond:'of', capable:'of', aware:'of', guilty:'of', satisfied:'with', disappointed:'with', impressed:'by' }

function GrammarUsage({ meanings, word }) {
  if (!meanings?.length) return null
  const pos = meanings[0]?.partOfSpeech
  const w   = (word || '').toLowerCase()
  let hint  = null

  if (pos === 'verb') {
    if (BOTH_VERBS.includes(w)) {
      hint = `"${w}" can be followed by -ing or to-infinitive, sometimes with a meaning difference. E.g. "I remember doing it" (past) vs "I remembered to do it" (future task).`
    } else if (GERUND_VERBS.includes(w)) {
      hint = `"${w}" is followed by the -ing form (gerund). E.g. "She ${w}s working late." NOT "She ${w}s to work late."`
    } else if (INFINITIVE_VERBS.includes(w)) {
      hint = `"${w}" is followed by the to-infinitive. E.g. "They ${w} to leave early." NOT "They ${w} leaving early."`
    } else {
      hint = 'Verb patterns: [verb] + to-infinitive / -ing form / noun. 3rd person singular adds -s.'
    }
  } else if (pos === 'adjective') {
    const prep = ADJ_PREP[w]
    if (prep) {
      hint = `"${w}" collocates with the preposition "${prep}". E.g. "She is ${w} ${prep} …"`
    } else {
      const comp = getComparativeForm(w)
      hint = `Comparative / Superlative: ${comp}. Can be used predicatively (after be/seem) and attributively (before noun).`
    }
  } else if (pos === 'noun') {
    hint = 'Used with articles: a/an (first mention or singular countable), the (specific/known). Plural: usually add -s/-es. Some nouns are uncountable (no article or "some").'
  } else if (pos === 'adverb') {
    hint = 'Modifies verbs, adjectives, or other adverbs. Position: before adjective ("very tall"), after verb ("speaks clearly"), or at start of sentence for emphasis.'
  }

  if (!hint) return null
  return (
    <>
      <div className={styles.pillLabel} style={{ borderColor: 'var(--acc-a)' }}>Grammar Usage</div>
      <div className={styles.grammarHint}>{hint}</div>
    </>
  )
}

function IdiomBanner({ word }) {
  const setActivePage        = useStore(s => s.setActivePage)
  const setActiveLearnSection = useStore(s => s.setActiveLearnSection)
  const matches = useMemo(() => findIdiomsForWord(word), [word])
  if (!matches.length) return null
  const idiom = matches[0]
  return (
    <div className={styles.idiomBanner} onClick={() => { setActivePage('learn'); setActiveLearnSection('idioms') }}>
      <span className={styles.idiomBannerIcon}>💬</span>
      <span className={styles.idiomBannerText}>
        "<strong>{idiom.idiom}</strong>" — {idiom.meaning}
      </span>
      <span className={styles.idiomBannerArrow}>→</span>
    </div>
  )
}

function ResultCard({ word, dictMode, onWordClick }) {
  const { data, isLoading: dictLoading, error } = useDictionary(word)
  const { translation, alternatives, isLoading: transLoading } = useTranslation(word, dictMode)
  const { words: relatedWords } = useRelatedWords(word)
  const { suggestions } = useSuggestions(word, !!error)
  const savedWords   = useStore(s => s.savedWords)
  const toggleSaved  = useStore(s => s.toggleSaved)
  const addXP        = useStore(s => s.addXP)
  const addToReview  = useStore(s => s.addToReview)
  const reviewDeck   = useStore(s => s.reviewDeck)

  const [toast, setToast] = useState(null)
  const toastTimer  = useRef(null)
  const pressTimer  = useRef(null)
  const autoAdded   = useRef(false)

  const isLoading    = dictLoading || transLoading
  const isSaved      = savedWords.includes(word)
  const inReviewDeck = reviewDeck.some(c => c.word.toLowerCase() === word.toLowerCase())

  // Auto-add to review deck when translation is ready
  useEffect(() => {
    if (!autoAdded.current && translation && word) {
      autoAdded.current = true
      addToReview(word, translation, 'vocabulary')
    }
  }, [translation, word, addToReview])

  const handleAddToReview = () => {
    if (inReviewDeck) return
    addToReview(word, translation || '', 'vocabulary')
    showToast('Added to review deck!')
  }

  const showToast = (msg) => {
    setToast(msg)
    clearTimeout(toastTimer.current)
    toastTimer.current = setTimeout(() => setToast(null), 2000)
  }

  const handlePressStart = () => {
    pressTimer.current = setTimeout(async () => {
      try { await navigator.clipboard.writeText(word); showToast('Copied! ✓') } catch {}
    }, 500)
  }
  const handlePressEnd = () => clearTimeout(pressTimer.current)

  const handleShare = async () => {
    const firstDef = data?.meanings?.[0]?.definitions?.[0]?.definition ?? ''
    const text = `${data.word}${data.phonetic ? ` ${data.phonetic}` : ''}\n\n${firstDef}\n\n— BeFluent`
    try {
      if (navigator.share) {
        await navigator.share({ title: `BeFluent: ${data.word}`, text })
      } else {
        await navigator.clipboard.writeText(text)
        showToast('Copied! ✓')
      }
    } catch {}
  }

  const handleSave = () => {
    toggleSaved(word)
    if (!isSaved) { addXP(2); showToast('Word saved! ✓') }
  }

  if (isLoading) return <Skeleton />

  const showTranslation = dictMode !== 'en-en' && translation
  const transLabel = dictMode === 'en-sr' ? 'EN → SR' : 'SR → EN'

  // In SR→EN mode with a Serbian word, the dictionary won't find it — show translation only
  if (error && !showTranslation) {
    return (
      <div className={styles.errorBox}>
        <div className={styles.errorTitle}>
          <span>⚠️</span>
          <span className={styles.errorText}>Hmm, we couldn't find that word</span>
        </div>
        {suggestions.length > 0 && (
          <>
            <p className={styles.errorSub}>Check the spelling or try one of these:</p>
            <div className={styles.pills}>
              {suggestions.map(s => (
                <button key={s} className={styles.pill} onClick={() => onWordClick(s)}>{s}</button>
              ))}
            </div>
          </>
        )}
      </div>
    )
  }

  if (error && showTranslation) {
    return (
      <>
        <div className={styles.translationBox}>
          <div className={styles.transLabel}>{transLabel}</div>
          <div className={styles.transMain}>
            <span className={styles.transWord}>{word}</span>
            <span className={styles.transEq}> = </span>
            {translation}
          </div>
          {alternatives.length > 0 && (
            <div className={styles.transAlts}>Also: {alternatives.join(' · ')}</div>
          )}
        </div>
        {toast && <div className={styles.toast}>{toast}</div>}
      </>
    )
  }

  if (!data) return null

  return (
    <>
      <IdiomBanner word={word} />

      {showTranslation && (
        <div className={styles.translationBox}>
          <div className={styles.transLabel}>{transLabel}</div>
          <div className={styles.transMain}>
            <span className={styles.transWord}>{word}</span>
            <span className={styles.transEq}> = </span>
            {translation}
          </div>
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
          <div className={styles.wordUnderline} />
          {data.phonetic && <span className={styles.phonetic}>{data.phonetic}</span>}
          <div className={styles.heroActions}>
            {data.audioUrl && (
              <button
                className={styles.audioBtn}
                onClick={() => new Audio(data.audioUrl).play()}
              >
                ▶ Listen
              </button>
            )}
            <button
              className={`${styles.iconBtn} ${styles.reviewBtn}`}
              onClick={handleAddToReview}
              title={inReviewDeck ? 'In review deck' : 'Add to review deck'}
              style={inReviewDeck ? { color: 'var(--acc-a)', borderColor: 'rgba(255,169,77,0.3)' } : {}}
            >
              {inReviewDeck ? '✓' : '+'}
            </button>
            <button
              className={styles.iconBtn}
              onClick={handleShare}
              title="Share word"
              aria-label="Share"
            >
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                <circle cx="11.5" cy="2.5" r="1.8" stroke="currentColor" strokeWidth="1.3"/>
                <circle cx="11.5" cy="12.5" r="1.8" stroke="currentColor" strokeWidth="1.3"/>
                <circle cx="3.5" cy="7.5" r="1.8" stroke="currentColor" strokeWidth="1.3"/>
                <line x1="9.75" y1="3.4" x2="5.25" y2="6.6" stroke="currentColor" strokeWidth="1.3"/>
                <line x1="9.75" y1="11.6" x2="5.25" y2="8.4" stroke="currentColor" strokeWidth="1.3"/>
              </svg>
            </button>
            <button
              className={styles.iconBtn}
              onClick={handleSave}
              title={isSaved ? 'Remove from saved' : 'Save word'}
              style={{ color: isSaved ? 'var(--acc-a)' : 'var(--t3)' }}
            >
              <BookmarkIcon filled={isSaved} />
            </button>
          </div>
        </div>

        {data.meanings.map((meaning, mi) => (
          <MeaningBlock
            key={mi}
            meaning={meaning}
            mi={mi}
            onWordClick={onWordClick}
          />
        ))}

        {relatedWords.length > 0 && (
          <>
            <hr className={styles.divider} />
            <div className={styles.pillLabel}>Related words</div>
            <div className={styles.pills}>
              {relatedWords.map((w, pi) => (
                <button
                  key={w}
                  className={`${styles.pill} ${styles.pillRelated}`}
                  style={{ animationDelay: `${pi * 20}ms` }}
                  onClick={() => onWordClick(w)}
                >
                  {w}
                </button>
              ))}
            </div>
          </>
        )}

        <hr className={styles.divider} />
        <GrammarUsage meanings={data.meanings} word={word} />

      </div>

      {toast && <div className={styles.toast}>{toast}</div>}
    </>
  )
}

export default memo(ResultCard)
