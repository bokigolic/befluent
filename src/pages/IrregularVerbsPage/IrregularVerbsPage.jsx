import { useState, useMemo, memo } from 'react'
import styles from './IrregularVerbsPage.module.css'

const VERBS = [
  { base: 'be',         baseSr: 'biti',             past: 'was / were', pastSr: 'bio/la',         part: 'been',        partSr: 'bio/la' },
  { base: 'beat',       baseSr: 'tući, udariti',     past: 'beat',       pastSr: 'tukao/la',       part: 'beaten',      partSr: 'tučen/a' },
  { base: 'become',     baseSr: 'postati',           past: 'became',     pastSr: 'postao/la',      part: 'become',      partSr: 'postao/la' },
  { base: 'begin',      baseSr: 'početi',            past: 'began',      pastSr: 'počeo/la',       part: 'begun',       partSr: 'početo' },
  { base: 'bend',       baseSr: 'saviti',            past: 'bent',       pastSr: 'savio/la',       part: 'bent',        partSr: 'savijen/a' },
  { base: 'bite',       baseSr: 'ugristi',           past: 'bit',        pastSr: 'ugrizao/la',     part: 'bitten',      partSr: 'ugrizen/a' },
  { base: 'bleed',      baseSr: 'krvariti',          past: 'bled',       pastSr: 'krvario/la',     part: 'bled',        partSr: 'krvario/la' },
  { base: 'blow',       baseSr: 'duvati',            past: 'blew',       pastSr: 'duvao/la',       part: 'blown',       partSr: 'duvan/a' },
  { base: 'break',      baseSr: 'slomiti',           past: 'broke',      pastSr: 'slomio/la',      part: 'broken',      partSr: 'slomljen/a' },
  { base: 'bring',      baseSr: 'doneti',            past: 'brought',    pastSr: 'doneo/la',       part: 'brought',     partSr: 'donesen/a' },
  { base: 'build',      baseSr: 'graditi',           past: 'built',      pastSr: 'gradio/la',      part: 'built',       partSr: 'izgrađen/a' },
  { base: 'burn',       baseSr: 'goreti',            past: 'burnt',      pastSr: 'goreo/la',       part: 'burnt',       partSr: 'izgoren/a' },
  { base: 'buy',        baseSr: 'kupiti',            past: 'bought',     pastSr: 'kupio/la',       part: 'bought',      partSr: 'kupljen/a' },
  { base: 'catch',      baseSr: 'uhvatiti',          past: 'caught',     pastSr: 'uhvatio/la',     part: 'caught',      partSr: 'uhvaćen/a' },
  { base: 'choose',     baseSr: 'izabrati',          past: 'chose',      pastSr: 'izabrao/la',     part: 'chosen',      partSr: 'izabran/a' },
  { base: 'come',       baseSr: 'doći',              past: 'came',       pastSr: 'došao/la',       part: 'come',        partSr: 'došao/la' },
  { base: 'cost',       baseSr: 'koštati',           past: 'cost',       pastSr: 'koštao/la',      part: 'cost',        partSr: 'koštalo' },
  { base: 'cut',        baseSr: 'seći',              past: 'cut',        pastSr: 'sekao/la',       part: 'cut',         partSr: 'sečen/a' },
  { base: 'deal',       baseSr: 'baviti se',         past: 'dealt',      pastSr: 'bavio/la se',    part: 'dealt',       partSr: 'bavio/la se' },
  { base: 'dig',        baseSr: 'kopati',            past: 'dug',        pastSr: 'kopao/la',       part: 'dug',         partSr: 'iskopan/a' },
  { base: 'do',         baseSr: 'raditi',            past: 'did',        pastSr: 'radio/la',       part: 'done',        partSr: 'urađen/a' },
  { base: 'draw',       baseSr: 'crtati',            past: 'drew',       pastSr: 'crtao/la',       part: 'drawn',       partSr: 'nacrtan/a' },
  { base: 'dream',      baseSr: 'sanjati',           past: 'dreamt',     pastSr: 'sanjao/la',      part: 'dreamt',      partSr: 'sanjano' },
  { base: 'drink',      baseSr: 'piti',              past: 'drank',      pastSr: 'pio/la',         part: 'drunk',       partSr: 'popit/a' },
  { base: 'drive',      baseSr: 'voziti',            past: 'drove',      pastSr: 'vozio/la',       part: 'driven',      partSr: 'vožen/a' },
  { base: 'eat',        baseSr: 'jesti',             past: 'ate',        pastSr: 'jeo/la',         part: 'eaten',       partSr: 'pojeden/a' },
  { base: 'fall',       baseSr: 'pasti',             past: 'fell',       pastSr: 'pao/la',         part: 'fallen',      partSr: 'pao/la' },
  { base: 'feel',       baseSr: 'osećati',           past: 'felt',       pastSr: 'osećao/la',      part: 'felt',        partSr: 'osećano' },
  { base: 'fight',      baseSr: 'boriti se',         past: 'fought',     pastSr: 'borio/la se',    part: 'fought',      partSr: 'borio/la se' },
  { base: 'find',       baseSr: 'naći',              past: 'found',      pastSr: 'našao/la',       part: 'found',       partSr: 'nađen/a' },
  { base: 'fly',        baseSr: 'leteti',            past: 'flew',       pastSr: 'leteo/la',       part: 'flown',       partSr: 'leteo/la' },
  { base: 'forget',     baseSr: 'zaboraviti',        past: 'forgot',     pastSr: 'zaboravio/la',   part: 'forgotten',   partSr: 'zaboravljen/a' },
  { base: 'forgive',    baseSr: 'oprostiti',         past: 'forgave',    pastSr: 'oprostio/la',    part: 'forgiven',    partSr: 'oprošteno' },
  { base: 'freeze',     baseSr: 'smrznuti',          past: 'froze',      pastSr: 'smrznuo/la',     part: 'frozen',      partSr: 'smrznut/a' },
  { base: 'get',        baseSr: 'dobiti',            past: 'got',        pastSr: 'dobio/la',       part: 'got',         partSr: 'dobijen/a' },
  { base: 'give',       baseSr: 'dati',              past: 'gave',       pastSr: 'dao/la',         part: 'given',       partSr: 'dat/a' },
  { base: 'go',         baseSr: 'ići',               past: 'went',       pastSr: 'išao/la',        part: 'gone',        partSr: 'otišao/la' },
  { base: 'grow',       baseSr: 'rasti',             past: 'grew',       pastSr: 'rastao/la',      part: 'grown',       partSr: 'narastao/la' },
  { base: 'hang',       baseSr: 'visiti',            past: 'hung',       pastSr: 'visio/la',       part: 'hung',        partSr: 'obešen/a' },
  { base: 'have',       baseSr: 'imati',             past: 'had',        pastSr: 'imao/la',        part: 'had',         partSr: 'imao/la' },
  { base: 'hear',       baseSr: 'čuti',              past: 'heard',      pastSr: 'čuo/la',         part: 'heard',       partSr: 'čuven/a' },
  { base: 'hide',       baseSr: 'sakriti',           past: 'hid',        pastSr: 'sakrio/la',      part: 'hidden',      partSr: 'sakriven/a' },
  { base: 'hit',        baseSr: 'udariti',           past: 'hit',        pastSr: 'udario/la',      part: 'hit',         partSr: 'udaren/a' },
  { base: 'hold',       baseSr: 'držati',            past: 'held',       pastSr: 'držao/la',       part: 'held',        partSr: 'držan/a' },
  { base: 'hurt',       baseSr: 'povrediti',         past: 'hurt',       pastSr: 'povredio/la',    part: 'hurt',        partSr: 'povređen/a' },
  { base: 'keep',       baseSr: 'čuvati',            past: 'kept',       pastSr: 'čuvao/la',       part: 'kept',        partSr: 'čuvan/a' },
  { base: 'know',       baseSr: 'znati',             past: 'knew',       pastSr: 'znao/la',        part: 'known',       partSr: 'poznat/a' },
  { base: 'lay',        baseSr: 'položiti',          past: 'laid',       pastSr: 'položio/la',     part: 'laid',        partSr: 'položen/a' },
  { base: 'lead',       baseSr: 'voditi',            past: 'led',        pastSr: 'vodio/la',       part: 'led',         partSr: 'vođen/a' },
  { base: 'leave',      baseSr: 'otići, napustiti',  past: 'left',       pastSr: 'otišao/la',      part: 'left',        partSr: 'napušten/a' },
  { base: 'lend',       baseSr: 'pozajmiti',         past: 'lent',       pastSr: 'pozajmio/la',    part: 'lent',        partSr: 'pozajmljen/a' },
  { base: 'let',        baseSr: 'pustiti',           past: 'let',        pastSr: 'pustio/la',      part: 'let',         partSr: 'pušten/a' },
  { base: 'lie',        baseSr: 'ležati',            past: 'lay',        pastSr: 'ležao/la',       part: 'lain',        partSr: 'ležao/la' },
  { base: 'lose',       baseSr: 'izgubiti',          past: 'lost',       pastSr: 'izgubio/la',     part: 'lost',        partSr: 'izgubljen/a' },
  { base: 'make',       baseSr: 'napraviti',         past: 'made',       pastSr: 'napravio/la',    part: 'made',        partSr: 'napravljen/a' },
  { base: 'mean',       baseSr: 'značiti',           past: 'meant',      pastSr: 'značio/la',      part: 'meant',       partSr: 'značeno' },
  { base: 'meet',       baseSr: 'sresti, upoznati',  past: 'met',        pastSr: 'sreo/la',        part: 'met',         partSr: 'upoznat/a' },
  { base: 'pay',        baseSr: 'platiti',           past: 'paid',       pastSr: 'platio/la',      part: 'paid',        partSr: 'plaćen/a' },
  { base: 'put',        baseSr: 'staviti',           past: 'put',        pastSr: 'stavio/la',      part: 'put',         partSr: 'stavljen/a' },
  { base: 'read',       baseSr: 'čitati',            past: 'read',       pastSr: 'čitao/la',       part: 'read',        partSr: 'pročitan/a' },
  { base: 'ride',       baseSr: 'jahati, voziti se', past: 'rode',       pastSr: 'jahao/la',       part: 'ridden',      partSr: 'jahao/la' },
  { base: 'ring',       baseSr: 'zvoniti',           past: 'rang',       pastSr: 'zvonio/la',      part: 'rung',        partSr: 'zazvonjen/a' },
  { base: 'rise',       baseSr: 'ustati, rasti',     past: 'rose',       pastSr: 'ustao/la',       part: 'risen',       partSr: 'porastao/la' },
  { base: 'run',        baseSr: 'trčati',            past: 'ran',        pastSr: 'trčao/la',       part: 'run',         partSr: 'pretrčan/a' },
  { base: 'say',        baseSr: 'reći',              past: 'said',       pastSr: 'rekao/la',       part: 'said',        partSr: 'rečen/a' },
  { base: 'see',        baseSr: 'videti',            past: 'saw',        pastSr: 'video/la',       part: 'seen',        partSr: 'viđen/a' },
  { base: 'sell',       baseSr: 'prodavati',         past: 'sold',       pastSr: 'prodavao/la',    part: 'sold',        partSr: 'prodan/a' },
  { base: 'send',       baseSr: 'slati',             past: 'sent',       pastSr: 'slao/la',        part: 'sent',        partSr: 'poslan/a' },
  { base: 'set',        baseSr: 'postaviti',         past: 'set',        pastSr: 'postavio/la',    part: 'set',         partSr: 'postavljen/a' },
  { base: 'shake',      baseSr: 'tresti',            past: 'shook',      pastSr: 'tresao/la',      part: 'shaken',      partSr: 'protresan/a' },
  { base: 'shine',      baseSr: 'sjati',             past: 'shone',      pastSr: 'sjao/la',        part: 'shone',       partSr: 'sjao/la' },
  { base: 'shoot',      baseSr: 'pucati',            past: 'shot',       pastSr: 'pucao/la',       part: 'shot',        partSr: 'upucan/a' },
  { base: 'show',       baseSr: 'pokazati',          past: 'showed',     pastSr: 'pokazao/la',     part: 'shown',       partSr: 'pokazan/a' },
  { base: 'shut',       baseSr: 'zatvoriti',         past: 'shut',       pastSr: 'zatvorio/la',    part: 'shut',        partSr: 'zatvoren/a' },
  { base: 'sing',       baseSr: 'pevati',            past: 'sang',       pastSr: 'pevao/la',       part: 'sung',        partSr: 'otpevan/a' },
  { base: 'sink',       baseSr: 'tonuti',            past: 'sank',       pastSr: 'tonuo/la',       part: 'sunk',        partSr: 'potonuo/la' },
  { base: 'sit',        baseSr: 'sedeti',            past: 'sat',        pastSr: 'sedeo/la',       part: 'sat',         partSr: 'sedeo/la' },
  { base: 'sleep',      baseSr: 'spavati',           past: 'slept',      pastSr: 'spavao/la',      part: 'slept',       partSr: 'spavao/la' },
  { base: 'speak',      baseSr: 'govoriti',          past: 'spoke',      pastSr: 'govorio/la',     part: 'spoken',      partSr: 'govoreno' },
  { base: 'spend',      baseSr: 'trošiti, provesti', past: 'spent',      pastSr: 'trošio/la',      part: 'spent',       partSr: 'potrošen/a' },
  { base: 'stand',      baseSr: 'stajati',           past: 'stood',      pastSr: 'stajao/la',      part: 'stood',       partSr: 'stajao/la' },
  { base: 'steal',      baseSr: 'krasti',            past: 'stole',      pastSr: 'krao/la',        part: 'stolen',      partSr: 'ukraden/a' },
  { base: 'stick',      baseSr: 'zalepiti',          past: 'stuck',      pastSr: 'zalepljao/la',   part: 'stuck',       partSr: 'zalepljen/a' },
  { base: 'sweep',      baseSr: 'mesti',             past: 'swept',      pastSr: 'meo/la',         part: 'swept',       partSr: 'pometen/a' },
  { base: 'swim',       baseSr: 'plivati',           past: 'swam',       pastSr: 'plivao/la',      part: 'swum',        partSr: 'preplivano' },
  { base: 'take',       baseSr: 'uzeti',             past: 'took',       pastSr: 'uzeo/la',        part: 'taken',       partSr: 'uzet/a' },
  { base: 'teach',      baseSr: 'predavati',         past: 'taught',     pastSr: 'predavao/la',    part: 'taught',      partSr: 'naučen/a' },
  { base: 'tear',       baseSr: 'trgati, kidati',    past: 'tore',       pastSr: 'trgao/la',       part: 'torn',        partSr: 'pokidan/a' },
  { base: 'tell',       baseSr: 'reći, kazati',      past: 'told',       pastSr: 'rekao/la',       part: 'told',        partSr: 'rečen/a' },
  { base: 'think',      baseSr: 'misliti',           past: 'thought',    pastSr: 'mislio/la',      part: 'thought',     partSr: 'promišljeno' },
  { base: 'throw',      baseSr: 'baciti',            past: 'threw',      pastSr: 'bacio/la',       part: 'thrown',      partSr: 'bačen/a' },
  { base: 'understand', baseSr: 'razumeti',          past: 'understood', pastSr: 'razumeo/la',     part: 'understood',  partSr: 'razumljeno' },
  { base: 'wake',       baseSr: 'probuditi',         past: 'woke',       pastSr: 'probudio/la',    part: 'woken',       partSr: 'probuden/a' },
  { base: 'wear',       baseSr: 'nositi (odelo)',     past: 'wore',       pastSr: 'nosio/la',       part: 'worn',        partSr: 'nošen/a' },
  { base: 'win',        baseSr: 'pobediti',          past: 'won',        pastSr: 'pobedio/la',     part: 'won',         partSr: 'pobedio/la' },
  { base: 'write',      baseSr: 'pisati',            past: 'wrote',      pastSr: 'pisao/la',       part: 'written',     partSr: 'napisan/a' },
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
      v.baseSr.toLowerCase().includes(q) ||
      v.pastSr.toLowerCase().includes(q) ||
      v.partSr.toLowerCase().includes(q)
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
        </div>

        {filtered.length === 0 ? (
          <div className={styles.empty}>Nema rezultata za "{query}"</div>
        ) : (
          filtered.map((v, i) => (
            <div key={v.base + i} className={styles.row} style={{ animationDelay: `${Math.min(i * 12, 300)}ms` }}>
              <div className={styles.cell}>
                <span className={styles.cellEn}>{v.base}</span>
                <span className={styles.cellSr}>{v.baseSr}</span>
              </div>
              <div className={styles.cell}>
                <span className={styles.cellEn}>{v.past}</span>
                <span className={styles.cellSr}>{v.pastSr}</span>
              </div>
              <div className={styles.cell}>
                <span className={styles.cellEn}>{v.part}</span>
                <span className={styles.cellSr}>{v.partSr}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default memo(IrregularVerbsPage)
