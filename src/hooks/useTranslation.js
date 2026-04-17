import { useState, useEffect } from 'react'

const cache = {}

export default function useTranslation(word, direction) {
  const [translation, setTranslation] = useState(null)
  const [alternatives, setAlternatives] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!word || direction === 'en-en') return

    setTranslation(null)
    setAlternatives([])
    setError(null)

    const key = `${direction}:${word}`

    if (cache[key]) {
      setTranslation(cache[key].translation)
      setAlternatives(cache[key].alternatives)
      return
    }

    const langpair = direction === 'en-sr' ? 'en|sr' : 'sr|en'
    setIsLoading(true)

    fetch(
      `https://api.mymemory.translated.net/get?q=${encodeURIComponent(word)}&langpair=${langpair}`
    )
      .then((res) => {
        if (!res.ok) throw new Error('Translation failed')
        return res.json()
      })
      .then((json) => {
        const main = json.responseData?.translatedText ?? null
        const alts = (json.matches ?? [])
          .filter((m) => m.translation && m.translation !== main)
          .slice(0, 4)
          .map((m) => m.translation)

        cache[key] = { translation: main, alternatives: alts }
        setTranslation(main)
        setAlternatives(alts)
      })
      .catch((err) => setError(err.message || 'Translation failed'))
      .finally(() => setIsLoading(false))
  }, [word, direction])

  return { translation, alternatives, isLoading, error }
}
