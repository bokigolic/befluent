import { create } from 'zustand'

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
  { id: 'first_search', title: 'First Steps',       desc: 'Search your first word', emoji: '🔍', xpReward: 10 },
  { id: 'words_10',     title: 'Word Collector',     desc: 'Search 10 words',        emoji: '📚', xpReward: 25 },
  { id: 'words_50',     title: 'Vocabulary Builder', desc: 'Search 50 words',        emoji: '🏗️', xpReward: 50 },
  { id: 'streak_3',     title: 'On a Roll',          desc: '3 day streak',           emoji: '🔥', xpReward: 30 },
  { id: 'streak_7',     title: 'Week Warrior',       desc: '7 day streak',           emoji: '⚡', xpReward: 75 },
  { id: 'saved_5',      title: 'Bookworm',           desc: 'Save 5 words',           emoji: '🔖', xpReward: 20 },
  { id: 'translation',  title: 'Bilingual',          desc: 'Use translation mode',   emoji: '🌍', xpReward: 15 },
  { id: 'master',       title: 'Master',             desc: 'Reach 2000 XP',          emoji: '👑', xpReward: 100 },
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
  notifications:  [],

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

    // Weekly data (last 7 days)
    const weeklyData = { ...state.weeklyData }
    weeklyData[today] = (weeklyData[today] || 0) + 1
    const cutoff = new Date(Date.now() - 7 * 86400000)
    for (const k of Object.keys(weeklyData)) {
      if (new Date(k) < cutoff) delete weeklyData[k]
    }
    persist('bf_weekly', weeklyData)

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
