export const SENTENCE_PROMPTS = [
  { id:'s1',  prompt:"Write a sentence using 'although' to show contrast.", targetGrammar:'conjunctions', example:"Although it was raining, she went for a walk.", difficulty:'B1' },
  { id:'s2',  prompt:"Write a sentence in Present Perfect with 'already'.", targetGrammar:'tenses', example:"I have already finished my homework.", difficulty:'B1' },
  { id:'s3',  prompt:"Write a sentence using passive voice.", targetGrammar:'passive-voice', example:"The letter was written by my grandmother.", difficulty:'B1' },
  { id:'s4',  prompt:"Write a second conditional sentence about your dream.", targetGrammar:'conditionals', example:"If I had wings, I would fly to the mountains every morning.", difficulty:'B2' },
  { id:'s5',  prompt:"Write a sentence with a relative clause using 'whose'.", targetGrammar:'relative-clauses', example:"The woman whose daughter won the prize was very proud.", difficulty:'B2' },
  { id:'s6',  prompt:"Write a sentence using 'despite' + gerund.", targetGrammar:'conjunctions', example:"Despite being tired, she finished all her work.", difficulty:'B2' },
  { id:'s7',  prompt:"Write a sentence with reported speech.", targetGrammar:'reported-speech', example:"She told me that she had already eaten.", difficulty:'B2' },
  { id:'s8',  prompt:"Write a sentence using 'wish' about the present.", targetGrammar:'conditionals', example:"I wish I could speak five languages fluently.", difficulty:'B2' },
  { id:'s9',  prompt:"Write a sentence using a modal verb to give advice.", targetGrammar:'modal-verbs', example:"You should see a doctor if the pain continues.", difficulty:'B1' },
  { id:'s10', prompt:"Write a sentence using Future Perfect.", targetGrammar:'tenses', example:"By the time you read this, I will have already left.", difficulty:'B2' },
  { id:'s11', prompt:"Write a sentence using 'not only...but also'.", targetGrammar:'conjunctions', example:"Not only did she pass the exam, but she also got the highest score.", difficulty:'C1' },
  { id:'s12', prompt:"Write a sentence with a gerund as the subject.", targetGrammar:'gerunds-infinitives', example:"Learning a new language takes time and dedication.", difficulty:'B1' },
  { id:'s13', prompt:"Write a sentence using 'used to' for a past habit.", targetGrammar:'tenses', example:"I used to play football every weekend when I was a teenager.", difficulty:'B1' },
  { id:'s14', prompt:"Write a sentence with 'the' used correctly.", targetGrammar:'articles', example:"The book I borrowed from the library was the best I have ever read.", difficulty:'B1' },
  { id:'s15', prompt:"Write a sentence using 'must have' for past deduction.", targetGrammar:'modal-verbs', example:"She must have worked very hard to achieve such results.", difficulty:'B2' },
  { id:'s16', prompt:"Write a third conditional sentence expressing regret.", targetGrammar:'conditionals', example:"If I had studied harder, I would have passed the exam.", difficulty:'B2' },
  { id:'s17', prompt:"Write a sentence using 'by the time' + Past Perfect.", targetGrammar:'tenses', example:"By the time we arrived, the show had already started.", difficulty:'B2' },
  { id:'s18', prompt:"Write a sentence using 'in spite of'.", targetGrammar:'conjunctions', example:"In spite of the difficulties, they never gave up.", difficulty:'B2' },
  { id:'s19', prompt:"Write a sentence with a non-defining relative clause.", targetGrammar:'relative-clauses', example:"My sister, who lives in London, is coming to visit next month.", difficulty:'B2' },
  { id:'s20', prompt:"Write a sentence using 'would rather' for preference.", targetGrammar:'modal-verbs', example:"I would rather stay home than go to that party.", difficulty:'B2' },
  { id:'s21', prompt:"Write a sentence using the causative 'have something done'.", targetGrammar:'passive-voice', example:"I had my hair cut at the new salon yesterday.", difficulty:'C1' },
  { id:'s22', prompt:"Write a sentence using 'provided that' as a condition.", targetGrammar:'conjunctions', example:"You can borrow my laptop provided that you return it by tomorrow.", difficulty:'B2' },
  { id:'s23', prompt:"Write a sentence using 'stop + gerund' vs 'stop + infinitive'.", targetGrammar:'gerunds-infinitives', example:"He stopped smoking last year, but yesterday he stopped to smoke outside the café.", difficulty:'C1' },
  { id:'s24', prompt:"Write a passive reporting sentence using 'It is believed that'.", targetGrammar:'passive-voice', example:"It is believed that the ancient city was built over 3,000 years ago.", difficulty:'C1' },
  { id:'s25', prompt:"Write a sentence using a word with the suffix -ness or -ment.", targetGrammar:'word-formation', example:"Her kindness and encouragement meant everything to me during that difficult time.", difficulty:'B1' },
]

export const PARAGRAPH_PROMPTS = [
  { id:'p1',  prompt:"Describe your ideal Saturday. What would you do from morning to night?", targetGrammar:['tenses','conjunctions'], minSentences:5, difficulty:'B1' },
  { id:'p2',  prompt:"Write about a time you made a difficult decision. What happened?", targetGrammar:['tenses','conditionals'], minSentences:5, difficulty:'B1' },
  { id:'p3',  prompt:"Describe someone you admire and explain why they inspire you.", targetGrammar:['relative-clauses','modal-verbs'], minSentences:5, difficulty:'B1' },
  { id:'p4',  prompt:"Write about the advantages and disadvantages of social media.", targetGrammar:['conjunctions','passive-voice'], minSentences:6, difficulty:'B2' },
  { id:'p5',  prompt:"Describe your hometown. What makes it special or what would you change?", targetGrammar:['relative-clauses','conditionals'], minSentences:5, difficulty:'B1' },
  { id:'p6',  prompt:"Write about your language learning journey. What challenges have you faced?", targetGrammar:['tenses','gerunds-infinitives'], minSentences:6, difficulty:'B2' },
  { id:'p7',  prompt:"Describe the most interesting place you have ever visited.", targetGrammar:['tenses','relative-clauses'], minSentences:5, difficulty:'B1' },
  { id:'p8',  prompt:"Write about the importance of learning English in today's world.", targetGrammar:['passive-voice','conjunctions'], minSentences:6, difficulty:'B2' },
  { id:'p9',  prompt:"Describe what your life would be like if you lived 100 years ago.", targetGrammar:['conditionals','modal-verbs'], minSentences:5, difficulty:'B2' },
  { id:'p10', prompt:"Write about a skill you would like to learn and why.", targetGrammar:['gerunds-infinitives','modal-verbs'], minSentences:5, difficulty:'B1' },
]

export const FREE_TOPICS = [
  "Technology and its impact on society",
  "The future of education",
  "Climate change and individual responsibility",
  "The role of social media in modern relationships",
  "Is working from home better than office work?",
  "The importance of travel for personal growth",
  "Artificial intelligence: threat or opportunity?",
  "The value of traditional vs modern education",
]

export const MODES = [
  {
    id: 'sentence',
    emoji: '✏️',
    color: 'var(--acc-g)',
    title: 'Sentence Builder',
    subtitle: 'Practice one sentence at a time',
    badge: 'Beginner',
    badgeBg: 'rgba(0,229,160,0.15)',
    minHeight: 120,
  },
  {
    id: 'paragraph',
    emoji: '📝',
    color: 'var(--acc)',
    title: 'Paragraph Writer',
    subtitle: 'Write 5-8 connected sentences',
    badge: 'Intermediate',
    badgeBg: 'rgba(124,111,255,0.15)',
    minHeight: 220,
  },
  {
    id: 'free',
    emoji: '📄',
    color: 'var(--acc-p)',
    title: 'Free Writing',
    subtitle: 'Write freely, AI corrects all',
    badge: 'Advanced',
    badgeBg: 'rgba(255,107,157,0.15)',
    minHeight: 300,
  },
]

export function getRandomPrompt(mode, excludeId = null) {
  const pool = mode === 'sentence' ? SENTENCE_PROMPTS : PARAGRAPH_PROMPTS
  const available = pool.filter(p => p.id !== excludeId)
  return available[Math.floor(Math.random() * available.length)] ?? pool[0]
}

export function mapGrammarFocusToCategory(grammarFocus) {
  if (!grammarFocus) return null
  const s = grammarFocus.toLowerCase()
  if (s.includes('tense') || s.includes('perfect') || s.includes('continuous') || s.includes('past') || s.includes('future')) return 'tenses'
  if (s.includes('article') || s.includes('"a"') || s.includes('"the"') || s.includes("'the'")) return 'articles'
  if (s.includes('preposition')) return 'prepositions'
  if (s.includes('conditional') || s.includes('if clause') || s.includes('wish')) return 'conditionals'
  if (s.includes('modal')) return 'modal-verbs'
  if (s.includes('passive')) return 'passive-voice'
  if (s.includes('reported') || s.includes('indirect speech')) return 'reported-speech'
  if (s.includes('relative') || s.includes('who, which') || s.includes('whose')) return 'relative-clauses'
  if (s.includes('gerund') || s.includes('infinitive') || s.includes('-ing form')) return 'gerunds-infinitives'
  if (s.includes('conjunction') || s.includes('although') || s.includes('however') || s.includes('despite')) return 'conjunctions'
  if (s.includes('word formation') || s.includes('prefix') || s.includes('suffix')) return 'word-formation'
  return null
}
