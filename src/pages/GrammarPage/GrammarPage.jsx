import { useState, memo } from 'react'
import styles from './GrammarPage.module.css'

const SECTIONS = [
  {
    id: 'nouns',
    emoji: '🏷️',
    title: 'Nouns — Imenice',
    color: '#7c6fff',
    short: 'Osobe, mesta, stvari, pojmovi',
    content: [
      {
        type: 'desc',
        text: 'Imenice su reči koje označavaju osobe, mesta, stvari ili apstraktne pojmove.',
      },
      {
        type: 'list',
        label: 'Vrste imenica',
        items: [
          'Konkretne: dog (pas), car (auto), book (knjiga)',
          'Apstraktne: love (ljubav), freedom (sloboda), idea (ideja)',
          'Vlastite: London, John, Apple — uvek veliko slovo',
        ],
      },
      {
        type: 'list',
        label: 'Brojive vs nebrojive',
        items: [
          'Brojive (Countable): a dog → two dogs, a book → five books',
          'Nebrojive (Uncountable): water, music, advice — nema množine',
          'Some water ✓   /   Two waters ✗',
        ],
      },
      {
        type: 'list',
        label: 'Pravila množine',
        items: [
          'Dodaj -s: cat → cats, dog → dogs',
          'Dodaj -es posle s/sh/ch/x/z: box → boxes, church → churches',
          '-y → -ies: city → cities, baby → babies',
          'Nepravilna: man → men, child → children, foot → feet',
        ],
      },
    ],
  },
  {
    id: 'pronouns',
    emoji: '👤',
    title: 'Pronouns — Zamenice',
    color: '#00e5a0',
    short: 'Zamenjuju imenice u rečenici',
    content: [
      {
        type: 'desc',
        text: 'Zamenice zamenjuju imenice kako ne bismo ponavljali iste reči.',
      },
      {
        type: 'table',
        label: 'Lične i objektne zamenice',
        head: ['Subjekat', 'Objekat', 'Srpski'],
        rows: [
          ['I', 'me', 'ja / mene'],
          ['you', 'you', 'ti / tebe'],
          ['he', 'him', 'on / njega'],
          ['she', 'her', 'ona / nje'],
          ['it', 'it', 'ono / njega'],
          ['we', 'us', 'mi / nas'],
          ['they', 'them', 'oni / njih'],
        ],
      },
      {
        type: 'table',
        label: 'Prisvojne zamenice',
        head: ['Pridev (my book)', 'Samostalna (mine)', 'Srpski'],
        rows: [
          ['my', 'mine', 'moj/a/e'],
          ['your', 'yours', 'tvoj/a/e'],
          ['his', 'his', 'njegov/a/o'],
          ['her', 'hers', 'njen/a/o'],
          ['our', 'ours', 'naš/a/e'],
          ['their', 'theirs', 'njihov/a/o'],
        ],
      },
    ],
  },
  {
    id: 'adjectives',
    emoji: '🎨',
    title: 'Adjectives — Pridevi',
    color: '#ffa94d',
    short: 'Opisuju imenice',
    content: [
      {
        type: 'desc',
        text: 'Pridevi opisuju imenice i dolaze ispred imenice ili posle glagola "biti".',
      },
      {
        type: 'example',
        items: [
          { en: 'a big house', sr: 'velika kuća' },
          { en: 'The car is fast.', sr: 'Auto je brz.' },
          { en: 'She looks beautiful.', sr: 'Ona izgleda lepo.' },
        ],
      },
      {
        type: 'list',
        label: 'Komparativ i superlativ',
        items: [
          'Kratki: big → bigger → biggest',
          'Dugi: beautiful → more beautiful → most beautiful',
          'Nepravilni: good → better → best',
          'Nepravilni: bad → worse → worst',
          'Nepravilni: far → farther → farthest',
        ],
      },
    ],
  },
  {
    id: 'adverbs',
    emoji: '⚡',
    title: 'Adverbs — Prilozi',
    color: '#ff6b9d',
    short: 'Opisuju glagole, prideve ili druge priloge',
    content: [
      {
        type: 'desc',
        text: 'Prilozi govore kako, kada, gde ili koliko se nešto dešava. Često se prave od prideva dodavanjem -ly.',
      },
      {
        type: 'list',
        label: 'Vrste priloga',
        items: [
          'Način: quickly (brzo), carefully (pažljivo), well (dobro)',
          'Vreme: today, yesterday, soon, already, yet, still',
          'Mesto: here, there, everywhere, abroad',
          'Učestalost: always, usually, often, sometimes, rarely, never',
          'Stepen: very, quite, extremely, too, enough',
        ],
      },
      {
        type: 'list',
        label: 'Pravopis -ly',
        items: [
          'quick → quickly, slow → slowly, careful → carefully',
          '-y → -ily: happy → happily, easy → easily',
          'Pažnja: good → well (ne goodly!)',
          'Pažnja: fast → fast, hard → hard (bez -ly)',
        ],
      },
    ],
  },
  {
    id: 'prepositions',
    emoji: '📍',
    title: 'Prepositions — Predlozi',
    color: '#7c6fff',
    short: 'In, on, at, by, with...',
    content: [
      {
        type: 'desc',
        text: 'Predlozi pokazuju odnos između reči — mesto, vreme, smer ili način.',
      },
      {
        type: 'list',
        label: 'Predlozi mesta',
        items: [
          'in — unutra: in the box, in London, in the room',
          'on — na površini: on the table, on the wall, on the bus',
          'at — tačka: at the door, at school, at home',
          'under — ispod: under the bed, under the table',
          'between — između: between the chairs',
          'next to / beside — pored: next to the window',
        ],
      },
      {
        type: 'list',
        label: 'Predlozi vremena',
        items: [
          'at — tačno vreme: at 5 o\'clock, at midnight, at noon',
          'on — dan / datum: on Monday, on 15th March',
          'in — period: in January, in 2024, in the morning',
          'for — trajanje: for two hours, for a week',
          'since — od kada: since Monday, since 2020',
        ],
      },
    ],
  },
  {
    id: 'articles',
    emoji: '📌',
    title: 'Articles — Članovi',
    color: '#00e5a0',
    short: 'a, an, the',
    content: [
      {
        type: 'desc',
        text: 'Engleski ima tri člana: a, an (neodređeni) i the (određeni). Srpski nema članove pa ovo može biti zbunjujuće.',
      },
      {
        type: 'list',
        label: 'A / AN — neodređeni (prvi put pominjemo)',
        items: [
          'a — ispred suglasnika: a car, a book, a dog',
          'an — ispred samoglasnika: an apple, an hour, an idea',
          'Koristi se kad nešto pominjemo prvi put ili kad je nebitno koje tačno',
          'I saw a dog. → Videlo nekog psa, ne određenog',
        ],
      },
      {
        type: 'list',
        label: 'THE — određeni (znamo o čemu govorimo)',
        items: [
          'Koristi se kad je jasno o kom se radi: The dog barked. (onaj pas)',
          'Jedinstven: the sun, the moon, the President',
          'Drugi put: I saw a dog. The dog was big.',
          'Geografija: the USA, the Amazon, the Alps',
        ],
      },
      {
        type: 'list',
        label: 'Bez člana',
        items: [
          'Uopšteni pojmovi: I like music. Dogs are friendly.',
          'Vlastita imena: London, Anna, Tesla',
          'Obroci, jezici, sportovi: I eat breakfast. I speak English.',
        ],
      },
    ],
  },
  {
    id: 'conjunctions',
    emoji: '🔗',
    title: 'Conjunctions — Veznici',
    color: '#ffa94d',
    short: 'Spajaju reči i rečenice',
    content: [
      {
        type: 'list',
        label: 'Sastavni veznici',
        items: [
          'and — i: I like coffee and tea.',
          'both...and — i...i: Both Ana and Marko came.',
          'not only...but also — ne samo...već i',
        ],
      },
      {
        type: 'list',
        label: 'Suprotni veznici',
        items: [
          'but — ali: I like coffee but not tea.',
          'however — međutim: I tried. However, it didn\'t work.',
          'although / though — iako: Although it rained, we went out.',
          'despite — uprkos: Despite the rain, we went out.',
        ],
      },
      {
        type: 'list',
        label: 'Uzročni i uslovni',
        items: [
          'because — jer: I\'m tired because I didn\'t sleep.',
          'since / as — pošto: Since you\'re here, let\'s start.',
          'if — ako: If it rains, we stay home.',
          'unless — osim ako ne: Unless you hurry, you\'ll be late.',
          'so that — da bi: I study so that I can pass.',
        ],
      },
    ],
  },
  {
    id: 'ing',
    emoji: '🔄',
    title: '-ING pravila',
    color: '#ff6b9d',
    short: 'Kada i kako koristiti -ing formu',
    content: [
      {
        type: 'list',
        label: 'Kada koristimo -ING',
        items: [
          '1. Present Continuous — radnja u toku: I am eating now.',
          '2. Posle nekih glagola: enjoy, love, hate, finish, avoid, keep',
          '   → I enjoy swimming. She finished reading.',
          '3. Posle predloga: good at, interested in, tired of',
          '   → He is good at cooking. I\'m tired of waiting.',
          '4. Kao imenica (gerund): Swimming is healthy. I like reading.',
        ],
      },
      {
        type: 'list',
        label: 'Pravopis -ING',
        items: [
          'Obično dodaj -ing: play → playing, eat → eating',
          'Završava na e → izbaci e: make → making, write → writing',
          'Kratak + naglašen + suglasnik → udvostruči: run → running, sit → sitting, swim → swimming',
          'Završava na -ie → zameni sa -y: lie → lying, die → dying',
        ],
      },
    ],
  },
  {
    id: 'tenses',
    emoji: '⏰',
    title: 'Tenses — Glagolska vremena',
    color: '#7c6fff',
    short: 'Sva osnovna vremena na jednom mestu',
    content: [
      {
        type: 'tenses',
        items: [
          {
            name: 'Present Simple',
            sr: 'Sadašnje prosto',
            form: 'I work / She works',
            use: 'Navike, opšte istine, raspored',
            ex: { en: 'I go to school every day.', sr: 'Idem u školu svaki dan.' },
          },
          {
            name: 'Present Continuous',
            sr: 'Sadašnje trajno',
            form: 'I am working',
            use: 'Radnja koja se SADA dešava ili privremena radnja',
            ex: { en: 'I am studying right now.', sr: 'Upravo učim.' },
          },
          {
            name: 'Past Simple',
            sr: 'Prošlo prosto',
            form: 'I worked / I went',
            use: 'Završena radnja u prošlosti — tačno vreme',
            ex: { en: 'I watched a film yesterday.', sr: 'Juče sam gledao film.' },
          },
          {
            name: 'Past Continuous',
            sr: 'Prošlo trajno',
            form: 'I was working',
            use: 'Radnja koja je trajala u nekom trenutku u prošlosti',
            ex: { en: 'I was sleeping when you called.', sr: 'Spavao sam kad si zvao.' },
          },
          {
            name: 'Present Perfect',
            sr: 'Sadašnje perfektivno',
            form: 'I have worked',
            use: 'Iskustvo / nedavna radnja / stanje koje traje od prošlosti',
            ex: { en: 'I have visited Paris.', sr: 'Bio sam u Parizu (u životu).' },
          },
          {
            name: 'Future Simple',
            sr: 'Buduće vreme',
            form: 'I will work',
            use: 'Odluka u trenutku govora, obećanje, predviđanje',
            ex: { en: 'I will call you later.', sr: 'Pozvaću te kasnije.' },
          },
          {
            name: 'Future (going to)',
            sr: 'Buduće — plan',
            form: 'I am going to work',
            use: 'Unapred planirana radnja, ili vidljiva budućnost',
            ex: { en: 'I am going to study tonight.', sr: 'Planiram da učim večeras.' },
          },
        ],
      },
    ],
  },
]

function Section({ section }) {
  const [open, setOpen] = useState(false)

  return (
    <div className={styles.section} style={{ '--sec-color': section.color }}>
      <button className={styles.sectionHead} onClick={() => setOpen(o => !o)}>
        <span className={styles.sectionEmoji}>{section.emoji}</span>
        <div className={styles.sectionMeta}>
          <span className={styles.sectionTitle}>{section.title}</span>
          <span className={styles.sectionShort}>{section.short}</span>
        </div>
        <span className={`${styles.chevron} ${open ? styles.chevronOpen : ''}`}>›</span>
      </button>

      {open && (
        <div className={styles.sectionBody}>
          {section.content.map((block, bi) => {
            if (block.type === 'desc') {
              return <p key={bi} className={styles.desc}>{block.text}</p>
            }
            if (block.type === 'list') {
              return (
                <div key={bi} className={styles.block}>
                  <div className={styles.blockLabel}>{block.label}</div>
                  <ul className={styles.list}>
                    {block.items.map((item, ii) => (
                      <li key={ii} className={styles.listItem}>{item}</li>
                    ))}
                  </ul>
                </div>
              )
            }
            if (block.type === 'example') {
              return (
                <div key={bi} className={styles.block}>
                  {block.items.map((ex, ii) => (
                    <div key={ii} className={styles.exRow}>
                      <span className={styles.exEn}>{ex.en}</span>
                      <span className={styles.exSr}>{ex.sr}</span>
                    </div>
                  ))}
                </div>
              )
            }
            if (block.type === 'table') {
              return (
                <div key={bi} className={styles.block}>
                  <div className={styles.blockLabel}>{block.label}</div>
                  <div className={styles.miniTable}>
                    <div className={styles.miniHead}>
                      {block.head.map(h => <span key={h}>{h}</span>)}
                    </div>
                    {block.rows.map((row, ri) => (
                      <div key={ri} className={styles.miniRow}>
                        {row.map((cell, ci) => (
                          <span key={ci} className={ci === 2 ? styles.miniCellSr : styles.miniCell}>
                            {cell}
                          </span>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              )
            }
            if (block.type === 'tenses') {
              return (
                <div key={bi} className={styles.block}>
                  {block.items.map((t, ti) => (
                    <div key={ti} className={styles.tenseCard}>
                      <div className={styles.tenseHead}>
                        <span className={styles.tenseName}>{t.name}</span>
                        <span className={styles.tenseSr}>{t.sr}</span>
                      </div>
                      <div className={styles.tenseForm}>{t.form}</div>
                      <div className={styles.tenseUse}>{t.use}</div>
                      <div className={styles.tenseEx}>
                        <span className={styles.exEn}>{t.ex.en}</span>
                        <span className={styles.exSr}>{t.ex.sr}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )
            }
            return null
          })}
        </div>
      )}
    </div>
  )
}

function GrammarPage() {
  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h2 className={styles.title}>Grammar</h2>
        <p className={styles.sub}>Osnovna gramatika engleskog jezika</p>
      </div>
      <div className={styles.sections}>
        {SECTIONS.map(s => <Section key={s.id} section={s} />)}
      </div>
    </div>
  )
}

export default memo(GrammarPage)
