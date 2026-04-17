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

const useStore = create((set) => ({
  xp: load('bf_xp', 0),
  streak: load('bf_streak', 0),
  activePage: 'dictionary',
  dictMode: 'en-en',
  currentWord: '',
  searchHistory: load('bf_history', []),

  addXP: (amount) =>
    set((state) => {
      const xp = state.xp + amount
      const streak = state.streak + 1
      persist('bf_xp', xp)
      persist('bf_streak', streak)
      return { xp, streak }
    }),

  setActivePage: (page) => set({ activePage: page }),
  setDictMode: (mode) => set({ dictMode: mode }),
  setCurrentWord: (word) => set({ currentWord: word }),

  addToHistory: (word, mode) =>
    set((state) => {
      const filtered = state.searchHistory.filter((h) => h.word !== word)
      const history = [{ word, mode, timestamp: Date.now() }, ...filtered].slice(0, 12)
      persist('bf_history', history)
      return { searchHistory: history }
    }),

  removeFromHistory: (word) =>
    set((state) => {
      const history = state.searchHistory.filter((h) => h.word !== word)
      persist('bf_history', history)
      return { searchHistory: history }
    }),

  clearHistory: () => {
    persist('bf_history', [])
    set({ searchHistory: [] })
  },
}))

export const addXP = (amount) => useStore.getState().addXP(amount)
export default useStore
