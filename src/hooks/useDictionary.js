import { useState, useEffect } from 'react'

const cache = {}

export default function useDictionary(word) {
  const [data, setData] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!word) return

    setData(null)
    setError(null)

    if (cache[word]) {
      setData(cache[word])
      return
    }

    setIsLoading(true)

    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(word)}`)
      .then((res) => {
        if (!res.ok) throw new Error('Word not found')
        return res.json()
      })
      .then((json) => {
        const entry = json[0]
        const audioUrl = entry.phonetics?.find((p) => p.audio && p.audio !== '')?.audio ?? null
        const result = {
          word: entry.word,
          phonetic: entry.phonetic ?? entry.phonetics?.[0]?.text ?? null,
          audioUrl,
          meanings: entry.meanings ?? [],
        }
        cache[word] = result
        setData(result)
      })
      .catch((err) => setError(err.message || 'Word not found'))
      .finally(() => setIsLoading(false))
  }, [word])

  return { data, isLoading, error }
}
