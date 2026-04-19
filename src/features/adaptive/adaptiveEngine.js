export function calculateAccuracy(correct, wrong) {
  if (correct + wrong === 0) return null
  return Math.round((correct / (correct + wrong)) * 100)
}

export function getWeakCategories(categoryScores) {
  return Object.entries(categoryScores)
    .filter(([, data]) => {
      const acc = calculateAccuracy(data.correct, data.wrong)
      return acc !== null && acc < 60
    })
    .sort((a, b) =>
      calculateAccuracy(a[1].correct, a[1].wrong) -
      calculateAccuracy(b[1].correct, b[1].wrong)
    )
    .map(([id]) => id)
}

export function getStrongCategories(categoryScores) {
  return Object.entries(categoryScores)
    .filter(([, data]) => {
      const acc = calculateAccuracy(data.correct, data.wrong)
      return acc !== null && acc >= 80
    })
    .map(([id]) => id)
}

export function calculateLevel(categoryScores) {
  const scores = Object.values(categoryScores)
    .map(d => calculateAccuracy(d.correct, d.wrong))
    .filter(s => s !== null)
  if (scores.length === 0) return 'beginner'
  const avg = scores.reduce((a, b) => a + b, 0) / scores.length
  if (avg >= 85) return 'advanced'
  if (avg >= 70) return 'intermediate'
  if (avg >= 50) return 'elementary'
  return 'beginner'
}

export function getRecommendations(categoryScores, completedLessons, categories, grammarData) {
  const weak = getWeakCategories(categoryScores)
  const recommendations = []
  for (const categoryId of weak) {
    if (recommendations.length >= 3) break
    const catData = grammarData[categoryId]
    if (!catData?.lessons) continue
    const unfinished = catData.lessons.find(l => !completedLessons.includes(l.id))
    if (unfinished) {
      const cat = categories.find(c => c.id === categoryId)
      recommendations.push({
        categoryId,
        lessonId: unfinished.id,
        lessonTitle: unfinished.title,
        categoryName: cat?.title ?? categoryId,
        categoryEmoji: cat?.emoji ?? '📚',
        categoryColor: cat?.color ?? 'var(--acc)',
        reason: 'weak area',
        accuracy: calculateAccuracy(categoryScores[categoryId].correct, categoryScores[categoryId].wrong),
      })
    }
  }
  return recommendations
}

export const LEVEL_INFO = {
  beginner:     { emoji: '🌱', label: 'Beginner',     color: 'var(--acc-g)' },
  elementary:   { emoji: '📚', label: 'Elementary',   color: 'var(--acc-a)' },
  intermediate: { emoji: '⭐', label: 'Intermediate', color: 'var(--acc)' },
  advanced:     { emoji: '🎯', label: 'Advanced',     color: 'var(--acc-p)' },
}

export const CATEGORY_TIPS = {
  tenses: 'Focus on time markers (yesterday, since, for, by) — they signal which tense to use.',
  articles: 'Use "the" for specific/known things, "a/an" for new or non-specific things.',
  prepositions: 'Learn prepositions in fixed phrases: "on time", "at the end", "in a hurry".',
  conditionals: 'Identify the time frame first (past/present/future) then pick the conditional form.',
  'modal-verbs': 'Core meanings: can=ability, must=obligation, should=advice, might=possibility.',
  'passive-voice': 'Use passive when the action matters more than who does it, or when the doer is unknown.',
  'reported-speech': 'Tenses shift back: "am"→"was", "will"→"would", "can"→"could".',
  'relative-clauses': 'Use "who" for people, "which" for things, "that" for both in defining clauses.',
  'gerunds-infinitives': 'Group verbs: enjoy/avoid/finish + -ing; want/hope/decide + to infinitive.',
  conjunctions: 'Contrast (although/but), addition (moreover), result (therefore/consequently).',
  'word-formation': 'Learn prefixes (un-, re-, mis-) and suffixes (-tion, -ness, -ful) to decode new words.',
}

const DEFAULT_CATEGORY_SCORES = () => ({
  tenses:               { correct: 0, wrong: 0, lastPracticed: null, weakTopics: [] },
  articles:             { correct: 0, wrong: 0, lastPracticed: null, weakTopics: [] },
  prepositions:         { correct: 0, wrong: 0, lastPracticed: null, weakTopics: [] },
  conditionals:         { correct: 0, wrong: 0, lastPracticed: null, weakTopics: [] },
  'modal-verbs':        { correct: 0, wrong: 0, lastPracticed: null, weakTopics: [] },
  'passive-voice':      { correct: 0, wrong: 0, lastPracticed: null, weakTopics: [] },
  'reported-speech':    { correct: 0, wrong: 0, lastPracticed: null, weakTopics: [] },
  'relative-clauses':   { correct: 0, wrong: 0, lastPracticed: null, weakTopics: [] },
  'gerunds-infinitives':{ correct: 0, wrong: 0, lastPracticed: null, weakTopics: [] },
  conjunctions:         { correct: 0, wrong: 0, lastPracticed: null, weakTopics: [] },
  'word-formation':     { correct: 0, wrong: 0, lastPracticed: null, weakTopics: [] },
})

export const makeDefaultAdaptiveData = () => ({
  categoryScores:   DEFAULT_CATEGORY_SCORES(),
  vocabularyScores: { correct: 0, wrong: 0, totalSearched: 0 },
  weeklyActivity:   {},
  weakCategories:   [],
  strongCategories: [],
  recommendedNext:  null,
  currentLevel:     'beginner',
  totalPracticeTime: 0,
  lastWeekReport:   null,
})
