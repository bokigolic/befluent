import { useState, useEffect } from 'react'

export default function useAutocomplete(query) {
  const [suggestions, setSuggestions] = useState([])

  useEffect(() => {
    if (query.length < 2) {
      setSuggestions([])
      return
    }

    const timer = setTimeout(async () => {
      try {
        const res = await fetch(
          `https://api.datamuse.com/words?sp=${encodeURIComponent(query)}*&max=8`
        )
        const data = await res.json()
        setSuggestions(data.map((item) => item.word))
      } catch {
        setSuggestions([])
      }
    }, 280)

    return () => clearTimeout(timer)
  }, [query])

  return suggestions
}
