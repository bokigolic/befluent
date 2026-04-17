import { useState, useEffect } from 'react'

const cache = {}

export default function useRelatedWords(word) {
  const [words, setWords] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (!word) return

    setWords([])

    if (cache[word]) {
      setWords(cache[word])
      return
    }

    setIsLoading(true)

    fetch(`https://api.datamuse.com/words?rel_trg=${encodeURIComponent(word)}&max=12`)
      .then((res) => res.json())
      .then((json) => {
        const result = json.map((item) => item.word)
        cache[word] = result
        setWords(result)
      })
      .catch(() => setWords([]))
      .finally(() => setIsLoading(false))
  }, [word])

  return { words, isLoading }
}
