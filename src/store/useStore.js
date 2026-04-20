import { create } from 'zustand'
import { calculateNextReview, getDueCards } from '../features/review/spacedRepetition'
import {
  getWeakCategories, getStrongCategories, calculateLevel,
  makeDefaultAdaptiveData,
} from '../features/adaptive/adaptiveEngine'

const load = (key, fallback) => {
  try {
    const val = localStorage.getItem(key)
    return val !== null ? JSON.parse(val) : fallback
  } catch {
    return fallback
  }
}

const persist = (key, value) => {
  try { localStorage.setItem(key, JSON.stringify(value)) } catch {}
}

export const LEVELS = [
  { min: 0,    max: 99,       name: 'Beginner',     emoji: '🌱' },
  { min: 100,  max: 299,      name: 'Elementary',   emoji: '📚' },
  { min: 300,  max: 599,      name: 'Intermediate', emoji: '⭐' },
  { min: 600,  max: 999,      name: 'Advanced',     emoji: '🎯' },
  { min: 1000, max: 1999,     name: 'Expert',       emoji: '🏆' },
  { min: 2000, max: Infinity, name: 'Master',       emoji: '👑' },
]

export const getLevel = (xp) =>
  LEVELS.find(l => xp >= l.min && xp <= l.max) ?? LEVELS[LEVELS.length - 1]

export const getXpProgress = (xp) => {
  const level = getLevel(xp)
  if (level.max === Infinity) return 100
  const range = level.max - level.min + 1
  return Math.min(100, Math.round(((xp - level.min) / range) * 100))
}

export const ACHIEVEMENTS_DEF = [
  { id: 'first_search',   title: 'First Steps',        desc: 'Search your first word',             emoji: '🔍', xpReward: 10 },
  { id: 'words_10',       title: 'Word Collector',     desc: 'Search 10 words',                    emoji: '📚', xpReward: 25 },
  { id: 'words_50',       title: 'Vocabulary Builder', desc: 'Search 50 words',                    emoji: '🏗️', xpReward: 50 },
  { id: 'streak_3',       title: 'On a Roll',          desc: '3 day streak',                       emoji: '🔥', xpReward: 30 },
  { id: 'streak_7',       title: 'Week Warrior',       desc: '7 day streak',                       emoji: '⚡', xpReward: 75 },
  { id: 'saved_5',        title: 'Bookworm',           desc: 'Save 5 words',                       emoji: '🔖', xpReward: 20 },
  { id: 'translation',    title: 'Bilingual',          desc: 'Use translation mode',               emoji: '🌍', xpReward: 15 },
  { id: 'master',         title: 'Master',             desc: 'Reach 2000 XP',                      emoji: '👑', xpReward: 100 },
  { id: 'review_first',   title: 'First Review',       desc: 'Complete your first review session', emoji: '🔄', xpReward: 15 },
  { id: 'review_10',      title: 'Consistent Learner', desc: 'Review 10 sessions total',           emoji: '📅', xpReward: 40 },
  { id: 'deck_20',        title: 'Deck Builder',       desc: 'Add 20 words to review deck',        emoji: '📦', xpReward: 30 },
  { id: 'mastered_5',     title: 'Word Master',        desc: 'Master 5 words (21+ day interval)',  emoji: '🏅', xpReward: 50 },
  { id: 'first_writing',  title: 'First Draft',        desc: 'Complete your first writing check',  emoji: '✍️', xpReward: 15 },
  { id: 'great_writer',   title: 'Great Writer',       desc: 'Score 90+ on a writing exercise',    emoji: '🌟', xpReward: 30 },
  { id: 'perfect_writer', title: 'Perfect Writer',     desc: 'Score 100 on a writing exercise',    emoji: '💎', xpReward: 50 },
  { id: 'writing_10',     title: 'Prolific Writer',    desc: 'Complete 10 writing exercises',      emoji: '📝', xpReward: 40 },
]

let _notifId = 0
const mkNotif = (type, extra) => ({ id: ++_notifId, type, ts: Date.now(), ...extra })

const useStore = create((set, get) => ({
  xp:             load('bf_xp', 0),
  streak:         load('bf_streak', 0),
  lastStreakDate: load('bf_streak_date', ''),
  theme:          load('bf_theme', 'dark'),
  activePage:     'dictionary',
  dictMode:       'en-en',
  currentWord:    '',
  searchHistory:  load('bf_history', []),
  savedWords:     load('bf_saved', []),
  achievements:   load('bf_achievements', []),
  totalSearches:  load('bf_total_searches', 0),
  todayCount:     load('bf_today_count', 0),
  lastSearchDate: load('bf_last_date', ''),
  dailyGoal:      load('bf_daily_goal', 5),
  weeklyData:     load('bf_weekly', {}),
  quizBestScore:  load('bf_quiz_best', 0),
  grammarProgress: load('bf_grammar_progress', {
    tenses: 0, articles: 0, prepositions: 0,
    conditionals: 0, 'modal-verbs': 0, 'passive-voice': 0,
    'reported-speech': 0, 'relative-clauses': 0,
    'gerunds-infinitives': 0, conjunctions: 0, 'word-formation': 0,
  }),
  completedLessons:      load('bf_lessons', []),
  savedLessons:          load('bf_saved_lessons', []),
  lastStudied:           load('bf_last_studied', {}),
  practiceResults:       load('bf_practice', {}),
  adaptiveData:          load('bf_adaptive', makeDefaultAdaptiveData()),
  pendingLessonId:       null,
  activeGrammarCategory: null,
  reviewDeck:            load('bf_review', []),
  reviewSessionsCount:   load('bf_review_sessions', 0),
  instantSearch:         load('bf_instant', false),
  showSettings:          false,
  activityLog:           load('bf_activity', {}),
  writingHistory:        load('bf_writing', []),
  notifications:  [],

  setActiveGrammarCategory: (id) => set({ activeGrammarCategory: id }),

  toggleSavedLesson: (lessonId) => set(state => {
    const savedLessons = state.savedLessons.includes(lessonId)
      ? state.savedLessons.filter(id => id !== lessonId)
      : [...state.savedLessons, lessonId]
    persist('bf_saved_lessons', savedLessons)
    return { savedLessons }
  }),

  updateLastStudied: (categoryId) => set(state => {
    const lastStudied = { ...state.lastStudied, [categoryId]: new Date().toISOString() }
    persist('bf_last_studied', lastStudied)
    return { lastStudied }
  }),

  addToReview: (word, translation, type = 'vocabulary', lessonId = null) => set(state => {
    const exists = state.reviewDeck.find(c => c.word.toLowerCase() === word.toLowerCase())
    if (exists) return {}
    const today = new Date().toISOString().slice(0, 10)
    const card = {
      id: `${Date.now()}-${word}`,
      word, translation: translation || '', type, lessonId,
      interval: 1, easeFactor: 2.5, repetitions: 0,
      nextReview: today, lastReview: null,
      timesCorrect: 0, timesWrong: 0,
    }
    const reviewDeck = [...state.reviewDeck, card]
    persist('bf_review', reviewDeck)

    let achievements = state.achievements
    const newNotifs = []
    if (reviewDeck.length >= 20 && !achievements.includes('deck_20')) {
      achievements = [...achievements, 'deck_20']
      persist('bf_achievements', achievements)
      newNotifs.push(mkNotif('achievement', ACHIEVEMENTS_DEF.find(a => a.id === 'deck_20')))
    }
    return { reviewDeck, achievements, notifications: [...state.notifications, ...newNotifs] }
  }),

  updateReviewCard: (id, quality) => set(state => {
    const card = state.reviewDeck.find(c => c.id === id)
    if (!card) return {}
    const updates = calculateNextReview(card, quality)
    const updated = {
      ...card, ...updates,
      lastReview: new Date().toISOString().slice(0, 10),
      timesCorrect: quality >= 3 ? card.timesCorrect + 1 : card.timesCorrect,
      timesWrong:   quality < 3  ? card.timesWrong  + 1 : card.timesWrong,
    }
    const reviewDeck = state.reviewDeck.map(c => c.id === id ? updated : c)
    persist('bf_review', reviewDeck)
    return { reviewDeck }
  }),

  completeReviewSession: (correctCount) => set(state => {
    const reviewSessionsCount = state.reviewSessionsCount + 1
    persist('bf_review_sessions', reviewSessionsCount)

    let achievements = state.achievements
    const newNotifs = []
    const check = (id) => {
      if (!achievements.includes(id)) {
        achievements = [...achievements, id]
        persist('bf_achievements', achievements)
        newNotifs.push(mkNotif('achievement', ACHIEVEMENTS_DEF.find(a => a.id === id)))
      }
    }
    if (reviewSessionsCount >= 1)  check('review_first')
    if (reviewSessionsCount >= 10) check('review_10')
    const mastered = state.reviewDeck.filter(c => c.interval > 21).length
    if (mastered >= 5) check('mastered_5')

    return { reviewSessionsCount, achievements, notifications: [...state.notifications, ...newNotifs] }
  }),

  getReviewStats: () => {
    const { reviewDeck } = useStore.getState()
    const due      = getDueCards(reviewDeck).length
    const mastered = reviewDeck.filter(c => c.interval > 21).length
    return {
      totalCards: reviewDeck.length,
      dueToday:   due,
      mastered,
      learning:   reviewDeck.length - mastered,
    }
  },

  toggleInstantSearch: () => set(state => {
    const instantSearch = !state.instantSearch
    persist('bf_instant', instantSearch)
    return { instantSearch }
  }),

  setShowSettings: (v) => set({ showSettings: v }),

  updateGrammarProgress: (categoryId, progress) => set(state => {
    const grammarProgress = { ...state.grammarProgress, [categoryId]: progress }
    persist('bf_grammar_progress', grammarProgress)
    return { grammarProgress }
  }),

  savePracticeResult: (lessonId, score, total) => set(state => {
    const practiceResults = {
      ...state.practiceResults,
      [lessonId]: { score, total, date: new Date().toDateString() },
    }
    persist('bf_practice', practiceResults)
    return { practiceResults }
  }),

  markLessonComplete: (lessonId, categoryId, categoryLessonIds) => set(state => {
    if (state.completedLessons.includes(lessonId)) return {}
    const completedLessons = [...state.completedLessons, lessonId]
    persist('bf_lessons', completedLessons)

    const doneInCat = categoryLessonIds.filter(id => completedLessons.includes(id)).length
    const progress = Math.round((doneInCat / categoryLessonIds.length) * 100)
    const grammarProgress = { ...state.grammarProgress, [categoryId]: progress }
    persist('bf_grammar_progress', grammarProgress)

    return { completedLessons, grammarProgress }
  }),

  dismissNotification: (id) =>
    set(state => ({ notifications: state.notifications.filter(n => n.id !== id) })),

  setDailyGoal: (n) => set(() => {
    persist('bf_daily_goal', n)
    return { dailyGoal: n }
  }),

  recordQuizScore: (pct) => set(state => {
    const best = Math.max(state.quizBestScore, pct)
    persist('bf_quiz_best', best)
    return { quizBestScore: best }
  }),

  toggleTheme: () => set(state => {
    const theme = state.theme === 'dark' ? 'light' : 'dark'
    persist('bf_theme', theme)
    document.documentElement.setAttribute('data-theme', theme)
    return { theme }
  }),

  addXP: (amount) => set(state => {
    const oldLevel = getLevel(state.xp)
    const xp = state.xp + amount
    const newLevel = getLevel(xp)
    persist('bf_xp', xp)

    const newNotifs = []
    if (newLevel.name !== oldLevel.name) {
      newNotifs.push(mkNotif('levelup', { levelName: newLevel.name, emoji: newLevel.emoji }))
    }

    // master achievement on XP milestone
    let achievements = state.achievements
    if (xp >= 2000 && !state.achievements.includes('master')) {
      achievements = [...state.achievements, 'master']
      persist('bf_achievements', achievements)
      const def = ACHIEVEMENTS_DEF.find(a => a.id === 'master')
      newNotifs.push(mkNotif('achievement', def))
    }

    return { xp, achievements, notifications: [...state.notifications, ...newNotifs] }
  }),

  setActivePage:  (page) => set({ activePage: page }),
  setDictMode:    (mode) => set({ dictMode: mode }),
  setCurrentWord: (word) => set({ currentWord: word }),

  addToHistory: (word, mode) => set(state => {
    const filtered = state.searchHistory.filter(h => h.word !== word)
    const history = [{ word, mode, timestamp: Date.now() }, ...filtered].slice(0, 12)
    const totalSearches = state.totalSearches + 1

    // Day-based streak
    const today = new Date().toDateString()
    const yesterday = new Date(Date.now() - 86400000).toDateString()
    let { streak, lastStreakDate } = state
    if (lastStreakDate !== today) {
      streak = lastStreakDate === yesterday ? streak + 1 : 1
      lastStreakDate = today
      persist('bf_streak', streak)
      persist('bf_streak_date', lastStreakDate)
    }

    // Daily count
    const isNewDay = state.lastSearchDate !== today
    const todayCount = isNewDay ? 1 : state.todayCount + 1

    // Weekly data (last 30 days for calendar)
    const weeklyData = { ...state.weeklyData }
    weeklyData[today] = (weeklyData[today] || 0) + 1
    const cutoff = new Date(Date.now() - 30 * 86400000)
    for (const k of Object.keys(weeklyData)) {
      if (new Date(k) < cutoff) delete weeklyData[k]
    }
    persist('bf_weekly', weeklyData)

    // Activity log (same as weeklyData — alias for 30d calendar)
    const activityLog = weeklyData
    persist('bf_activity', activityLog)

    // Unlock achievements
    const existing = state.achievements
    const newIds = []
    if (!existing.includes('first_search') && totalSearches >= 1)  newIds.push('first_search')
    if (!existing.includes('words_10') && totalSearches >= 10)     newIds.push('words_10')
    if (!existing.includes('words_50') && totalSearches >= 50)     newIds.push('words_50')
    if (!existing.includes('streak_3') && streak >= 3)             newIds.push('streak_3')
    if (!existing.includes('streak_7') && streak >= 7)             newIds.push('streak_7')
    if (!existing.includes('translation') && mode !== 'en-en')     newIds.push('translation')

    const achievements = [...existing, ...newIds]
    const newNotifs = newIds.map(id => {
      const def = ACHIEVEMENTS_DEF.find(a => a.id === id)
      return mkNotif('achievement', def)
    })

    // Daily goal bonus XP
    const dailyGoalJustReached =
      !isNewDay && state.todayCount < state.dailyGoal && todayCount >= state.dailyGoal
    let bonusXP = 0
    if (dailyGoalJustReached) {
      bonusXP = 20
      newNotifs.push(mkNotif('daily', { message: '🎯 Daily goal reached! +20 XP' }))
    }
    // Achievement reward XP
    const rewardXP = newIds.reduce((s, id) => {
      return s + (ACHIEVEMENTS_DEF.find(a => a.id === id)?.xpReward ?? 0)
    }, 0)

    const totalXPGain = bonusXP + rewardXP
    let xp = state.xp + totalXPGain
    if (totalXPGain > 0) {
      const oldLevel = getLevel(state.xp)
      const newLevel = getLevel(xp)
      if (newLevel.name !== oldLevel.name) {
        newNotifs.push(mkNotif('levelup', { levelName: newLevel.name, emoji: newLevel.emoji }))
      }
      persist('bf_xp', xp)
    }

    persist('bf_history', history)
    persist('bf_achievements', achievements)
    persist('bf_total_searches', totalSearches)
    persist('bf_today_count', todayCount)
    persist('bf_last_date', today)

    return {
      searchHistory: history,
      totalSearches,
      todayCount,
      lastSearchDate: today,
      streak,
      lastStreakDate,
      achievements,
      xp,
      weeklyData,
      activityLog,
      notifications: [...state.notifications, ...newNotifs],
    }
  }),

  removeFromHistory: (word) => set(state => {
    const history = state.searchHistory.filter(h => h.word !== word)
    persist('bf_history', history)
    return { searchHistory: history }
  }),

  clearHistory: () => {
    persist('bf_history', [])
    set({ searchHistory: [] })
  },

  recordPracticeResult: (categoryId, correct, wrong) => set(state => {
    const prev = state.adaptiveData
    const scores = { ...prev.categoryScores }
    const cur = scores[categoryId] ?? { correct: 0, wrong: 0, lastPracticed: null, weakTopics: [] }
    scores[categoryId] = {
      ...cur,
      correct: cur.correct + correct,
      wrong:   cur.wrong + wrong,
      lastPracticed: new Date().toISOString(),
    }
    const weakCategories   = getWeakCategories(scores)
    const strongCategories = getStrongCategories(scores)
    const prevLevel        = prev.currentLevel
    const currentLevel     = calculateLevel(scores)
    const updated = { ...prev, categoryScores: scores, weakCategories, strongCategories, currentLevel }
    persist('bf_adaptive', updated)
    const newNotifs = [...state.notifications]
    if (currentLevel !== prevLevel) {
      newNotifs.push(mkNotif('adaptiveLevelUp', { level: currentLevel }))
    }
    return { adaptiveData: updated, notifications: newNotifs }
  }),

  generateWeeklyReport: () => set(state => {
    const { adaptiveData, totalSearches, completedLessons, xp, streak, practiceResults, activityLog } = state
    const { categoryScores } = adaptiveData
    const weekStart = new Date(Date.now() - 7 * 86400000).toISOString().slice(0, 10)
    const weekEnd   = new Date().toISOString().slice(0, 10)
    const wordsThisWeek = Object.entries(activityLog)
      .filter(([d]) => d >= weekStart)
      .reduce((s, [, n]) => s + n, 0)
    const practicesDone = Object.values(practiceResults).filter(r => {
      const d = new Date(r.date).toISOString().slice(0, 10)
      return d >= weekStart
    }).length
    const withAcc = Object.entries(categoryScores)
      .map(([id, d]) => {
        const total = d.correct + d.wrong
        const acc   = total > 0 ? Math.round((d.correct / total) * 100) : null
        return { id, acc, total }
      })
      .filter(x => x.acc !== null)
      .sort((a, b) => b.acc - a.acc)
    const strongest = withAcc[0] ?? null
    const weakest   = withAcc[withAcc.length - 1] ?? null
    let personalMessage = "Every lesson brings you closer to fluency. Keep going!"
    if (streak >= 7)                personalMessage = "A full week streak! You're unstoppable."
    else if (completedLessons.length > 5) personalMessage = "Great progress on grammar! Keep it up."
    else if (wordsThisWeek > 20)    personalMessage = "Outstanding week! You're building serious vocabulary."
    const report = {
      weekStart, weekEnd,
      wordsSearched: wordsThisWeek,
      lessonsCompleted: completedLessons.length,
      practicesDone,
      xpEarned: xp,
      streakDays: streak,
      strongestCategory: strongest,
      weakestCategory: weakest,
      personalMessage,
      generatedAt: new Date().toISOString(),
    }
    const updated = { ...adaptiveData, lastWeekReport: report }
    persist('bf_adaptive', updated)
    return { adaptiveData: updated }
  }),

  setPendingLessonId: (id) => set({ pendingLessonId: id }),

  addWritingEntry: (entry) => set(state => {
    const writingHistory = [entry, ...state.writingHistory].slice(0, 20)
    persist('bf_writing', writingHistory)
    return { writingHistory }
  }),

  deleteWritingEntry: (id) => set(state => {
    const writingHistory = state.writingHistory.filter(e => e.id !== id)
    persist('bf_writing', writingHistory)
    return { writingHistory }
  }),

  checkAchievements: () => set(state => {
    const { writingHistory, achievements } = state
    const newIds = []
    const total = writingHistory.length
    const best  = writingHistory.reduce((m, e) => Math.max(m, e.score ?? 0), 0)
    if (total >= 1  && !achievements.includes('first_writing'))  newIds.push('first_writing')
    if (best  >= 90 && !achievements.includes('great_writer'))   newIds.push('great_writer')
    if (best  >= 100 && !achievements.includes('perfect_writer')) newIds.push('perfect_writer')
    if (total >= 10 && !achievements.includes('writing_10'))     newIds.push('writing_10')
    if (newIds.length === 0) return {}
    const updated = [...achievements, ...newIds]
    persist('bf_achievements', updated)
    const newNotifs = newIds.map(id => {
      const def = ACHIEVEMENTS_DEF.find(a => a.id === id)
      return mkNotif('achievement', def)
    })
    return { achievements: updated, notifications: [...state.notifications, ...newNotifs] }
  }),

  toggleSaved: (word) => set(state => {
    const isSaved = state.savedWords.includes(word)
    const savedWords = isSaved
      ? state.savedWords.filter(w => w !== word)
      : [...state.savedWords, word]
    persist('bf_saved', savedWords)

    const newNotifs = []
    let achievements = state.achievements
    if (!isSaved && savedWords.length >= 5 && !state.achievements.includes('saved_5')) {
      achievements = [...state.achievements, 'saved_5']
      persist('bf_achievements', achievements)
      const def = ACHIEVEMENTS_DEF.find(a => a.id === 'saved_5')
      newNotifs.push(mkNotif('achievement', def))
    }

    return { savedWords, achievements, notifications: [...state.notifications, ...newNotifs] }
  }),
}))

export const addXP = (amount) => useStore.getState().addXP(amount)
export default useStore
