import { create } from 'zustand'

const load = (key, fallback) => {
  try {
    const val = localStorage.getItem(key)
    return val !== null ? JSON.parse(val) : fallback
  } catch {
    return fallback
  }
}

const useStore = create((set) => ({
  xp: load('bf_xp', 0),
  streak: load('bf_streak', 0),
  activePage: 'dictionary',

  addXP: (amount) =>
    set((state) => {
      const xp = state.xp + amount
      const streak = state.streak + 1
      localStorage.setItem('bf_xp', JSON.stringify(xp))
      localStorage.setItem('bf_streak', JSON.stringify(streak))
      return { xp, streak }
    }),

  setActivePage: (page) => set({ activePage: page }),
}))

export const addXP = (amount) => useStore.getState().addXP(amount)
export default useStore
