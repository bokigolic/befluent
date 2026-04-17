import { useState, useMemo, memo } from 'react'
import styles from './IrregularVerbsPage.module.css'

const VERBS = [
  { base: 'be',         past: 'was / were', part: 'been',        sr: 'biti' },
  { base: 'beat',       past: 'beat',       part: 'beaten',      sr: 'tući, pobediti' },
  { base: 'become',     past: 'became',     part: 'become',      sr: 'postati' },
  { base: 'begin',      past: 'began',      part: 'begun',       sr: 'početi' },
  { base: 'bend',       past: 'bent',       part: 'bent',        sr: 'saviti' },
  { base: 'bite',       past: 'bit',        part: 'bitten',      sr: 'ugristi' },
  { base: 'bleed',      past: 'bled',       part: 'bled',        sr: 'krvariti' },
  { base: 'blow',       past: 'blew',       part: 'blown',       sr: 'duvati' },
  { base: 'break',      past: 'broke',      part: 'broken',      sr: 'slomiti' },
  { base: 'bring',      past: 'brought',    part: 'brought',     sr: 'doneti' },
  { base: 'build',      past: 'built',      part: 'built',       sr: 'graditi' },
  { base: 'burn',       past: 'burnt',      part: 'burnt',       sr: 'goreti' },
  { base: 'buy',        past: 'bought',     part: 'bought',      sr: 'kupiti' },
  { base: 'catch',      past: 'caught',     part: 'caught',      sr: 'uhvatiti' },
  { base: 'choose',     past: 'chose',      part: 'chosen',      sr: 'izabrati' },
  { base: 'come',       past: 'came',       part: 'come',        sr: 'doći' },
  { base: 'cost',       past: 'cost',       part: 'cost',        sr: 'koštati' },
  { base: 'cut',        past: 'cut',        part: 'cut',         sr: 'seći' },
  { base: 'deal',       past: 'dealt',      part: 'dealt',       sr: 'baviti se' },
  { base: 'dig',        past: 'dug',        part: 'dug',         sr: 'kopati' },
  { base: 'do',         past: 'did',        part: 'done',        sr: 'raditi' },
  { base: 'draw',       past: 'drew',       part: 'drawn',       sr: 'crtati' },
  { base: 'dream',      past: 'dreamt',     part: 'dreamt',      sr: 'sanjati' },
  { base: 'drink',      past: 'drank',      part: 'drunk',       sr: 'piti' },
  { base: 'drive',      past: 'drove',      part: 'driven',      sr: 'voziti' },
  { base: 'eat',        past: 'ate',        part: 'eaten',       sr: 'jesti' },
  { base: 'fall',       past: 'fell',       part: 'fallen',      sr: 'pasti' },
  { base: 'feel',       past: 'felt',       part: 'felt',        sr: 'osećati' },
  { base: 'fight',      past: 'fought',     part: 'fought',      sr: 'boriti se' },
  { base: 'find',       past: 'found',      part: 'found',       sr: 'naći' },
  { base: 'fly',        past: 'flew',       part: 'flown',       sr: 'leteti' },
  { base: 'forget',     past: 'forgot',     part: 'forgotten',   sr: 'zaboraviti' },
  { base: 'forgive',    past: 'forgave',    part: 'forgiven',    sr: 'oprostiti' },
  { base: 'freeze',     past: 'froze',      part: 'frozen',      sr: 'smrznuti' },
  { base: 'get',        past: 'got',        part: 'got',         sr: 'dobiti' },
  { base: 'give',       past: 'gave',       part: 'given',       sr: 'dati' },
  { base: 'go',         past: 'went',       part: 'gone',        sr: 'ići' },
  { base: 'grow',       past: 'grew',       part: 'grown',       sr: 'rasti' },
  { base: 'hang',       past: 'hung',       part: 'hung',        sr: 'visiti' },
  { base: 'have',       past: 'had',        part: 'had',         sr: 'imati' },
  { base: 'hear',       past: 'heard',      part: 'heard',       sr: 'čuti' },
  { base: 'hide',       past: 'hid',        part: 'hidden',      sr: 'sakriti' },
  { base: 'hit',        past: 'hit',        part: 'hit',         sr: 'udariti' },
  { base: 'hold',       past: 'held',       part: 'held',        sr: 'držati' },
  { base: 'hurt',       past: 'hurt',       part: 'hurt',        sr: 'povrediti' },
  { base: 'keep',       past: 'kept',       part: 'kept',        sr: 'čuvati' },
  { base: 'know',       past: 'knew',       part: 'known',       sr: 'znati' },
  { base: 'lay',        past: 'laid',       part: 'laid',        sr: 'staviti' },
  { base: 'lead',       past: 'led',        part: 'led',         sr: 'voditi' },
  { base: 'leave',      past: 'left',       part: 'left',        sr: 'otići' },
  { base: 'lend',       past: 'lent',       part: 'lent',        sr: 'pozajmiti' },
  { base: 'let',        past: 'let',        part: 'let',         sr: 'pustiti' },
  { base: 'lie',        past: 'lay',        part: 'lain',        sr: 'ležati' },
  { base: 'lose',       past: 'lost',       part: 'lost',        sr: 'izgubiti' },
  { base: 'make',       past: 'made',       part: 'made',        sr: 'praviti' },
  { base: 'mean',       past: 'meant',      part: 'meant',       sr: 'značiti' },
  { base: 'meet',       past: 'met',        part: 'met',         sr: 'upoznati' },
  { base: 'pay',        past: 'paid',       part: 'paid',        sr: 'platiti' },
  { base: 'put',        past: 'put',        part: 'put',         sr: 'staviti' },
  { base: 'read',       past: 'read',       part: 'read',        sr: 'čitati' },
  { base: 'ride',       past: 'rode',       part: 'ridden',      sr: 'jahati, voziti se' },
  { base: 'ring',       past: 'rang',       part: 'rung',        sr: 'zvoniti' },
  { base: 'rise',       past: 'rose',       part: 'risen',       sr: 'ustati, rasti' },
  { base: 'run',        past: 'ran',        part: 'run',         sr: 'trčati' },
  { base: 'say',        past: 'said',       part: 'said',        sr: 'reći' },
  { base: 'see',        past: 'saw',        part: 'seen',        sr: 'videti' },
  { base: 'sell',       past: 'sold',       part: 'sold',        sr: 'prodavati' },
  { base: 'send',       past: 'sent',       part: 'sent',        sr: 'slati' },
  { base: 'set',        past: 'set',        part: 'set',         sr: 'postaviti' },
  { base: 'shake',      past: 'shook',      part: 'shaken',      sr: 'tresti' },
  { base: 'shine',      past: 'shone',      part: 'shone',       sr: 'sjati' },
  { base: 'shoot',      past: 'shot',       part: 'shot',        sr: 'pucati' },
  { base: 'show',       past: 'showed',     part: 'shown',       sr: 'pokazati' },
  { base: 'shut',       past: 'shut',       part: 'shut',        sr: 'zatvoriti' },
  { base: 'sing',       past: 'sang',       part: 'sung',        sr: 'pevati' },
  { base: 'sink',       past: 'sank',       part: 'sunk',        sr: 'tonuti' },
  { base: 'sit',        past: 'sat',        part: 'sat',         sr: 'sedeti' },
  { base: 'sleep',      past: 'slept',      part: 'slept',       sr: 'spavati' },
  { base: 'speak',      past: 'spoke',      part: 'spoken',      sr: 'govoriti' },
  { base: 'spend',      past: 'spent',      part: 'spent',       sr: 'trošiti' },
  { base: 'stand',      past: 'stood',      part: 'stood',       sr: 'stajati' },
  { base: 'steal',      past: 'stole',      part: 'stolen',      sr: 'krasti' },
  { base: 'stick',      past: 'stuck',      part: 'stuck',       sr: 'zalepiti' },
  { base: 'sweep',      past: 'swept',      part: 'swept',       sr: 'mesti' },
  { base: 'swim',       past: 'swam',       part: 'swum',        sr: 'plivati' },
  { base: 'take',       past: 'took',       part: 'taken',       sr: 'uzeti' },
  { base: 'teach',      past: 'taught',     part: 'taught',      sr: 'predavati' },
  { base: 'tear',       past: 'tore',       part: 'torn',        sr: 'trgati' },
  { base: 'tell',       past: 'told',       part: 'told',        sr: 'reći, kazati' },
  { base: 'think',      past: 'thought',    part: 'thought',     sr: 'misliti' },
  { base: 'throw',      past: 'threw',      part: 'thrown',      sr: 'baciti' },
  { base: 'understand', past: 'understood', part: 'understood',  sr: 'razumeti' },
  { base: 'wake',       past: 'woke',       part: 'woken',       sr: 'probuditi' },
  { base: 'wear',       past: 'wore',       part: 'worn',        sr: 'nositi (odelo)' },
  { base: 'win',        past: 'won',        part: 'won',         sr: 'pobediti' },
  { base: 'write',      past: 'wrote',      part: 'written',     sr: 'pisati' },
]

function IrregularVerbsPage() {
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim()
    if (!q) return VERBS
    return VERBS.filter(v =>
      v.base.includes(q) ||
      v.past.includes(q) ||
      v.part.includes(q) ||
      v.sr.toLowerCase().includes(q)
    )
  }, [query])

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h2 className={styles.title}>Irregular Verbs</h2>
        <p className={styles.sub}>Nepravilni glagoli — {VERBS.length} glagola</p>
      </div>

      <div className={styles.searchWrap}>
        <span className={styles.searchIcon}>🔍</span>
        <input
          className={styles.search}
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Pretraži glagol ili prevod..."
          autoComplete="off"
          spellCheck={false}
        />
        {query && (
          <button className={styles.clear} onClick={() => setQuery('')}>×</button>
        )}
      </div>

      <div className={styles.tableWrap}>
        <div className={styles.tableHead}>
          <span>Infinitiv</span>
          <span>Past Simple</span>
          <span>Past Participle</span>
          <span>Srpski</span>
        </div>

        {filtered.length === 0 ? (
          <div className={styles.empty}>Nema rezultata za "{query}"</div>
        ) : (
          filtered.map((v, i) => (
            <div key={v.base + i} className={styles.row} style={{ animationDelay: `${Math.min(i * 15, 300)}ms` }}>
              <span className={styles.cellBase}>{v.base}</span>
              <span className={styles.cellPast}>{v.past}</span>
              <span className={styles.cellPart}>{v.part}</span>
              <span className={styles.cellSr}>{v.sr}</span>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default memo(IrregularVerbsPage)
