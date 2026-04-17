import { useState, useEffect } from 'react'

export default function useSuggestions(word, enabled) {
  const [suggestions, setSuggestions] = useState([])

  useEffect(() => {
    if (!enabled || !word) return

    setSuggestions([])

    fetch(`https://api.datamuse.com/words?sp=${encodeURIComponent(word)}*&max=5`)
      .then((res) => res.json())
      .then((json) => setSuggestions(json.map((item) => item.word)))
      .catch(() => setSuggestions([]))
  }, [word, enabled])

  return { suggestions }
}
