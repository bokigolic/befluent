import { useState, useRef } from 'react'
import { callWithRetry } from '../../utils/apiRetry'

const cache = new Map()
const API_KEY = import.meta.env.VITE_ANTHROPIC_API_KEY ?? ''

export function useAIHint() {
  const [hint,        setHint]        = useState(null)
  const [isLoading,   setIsLoading]   = useState(false)
  const [error,       setError]       = useState(null)
  const [retryStatus, setRetryStatus] = useState(null)
  const currentWord = useRef(null)

  const fetchHint = async (word, partOfSpeech = 'word') => {
    if (cache.has(word)) {
      setHint(cache.get(word))
      setError(null)
      return
    }

    currentWord.current = word
    setIsLoading(true)
    setError(null)
    setHint(null)
    setRetryStatus(null)

    try {
      const res = await callWithRetry(
        () => fetch('https://api.anthropic.com/v1/messages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': API_KEY,
            'anthropic-version': '2023-06-01',
            'anthropic-dangerous-direct-browser-access': 'true',
          },
          body: JSON.stringify({
            model: 'claude-sonnet-4-5',
            max_tokens: 300,
            messages: [{
              role: 'user',
              content: `You are an English learning assistant. For the word "${word}" (${partOfSpeech}), provide:
1. One common confusion: what word is this often confused with and why?
2. One memory trick: a simple way to remember this word
3. One real-world context: where would you typically hear/see this word?

Respond in JSON only:
{
  "confusion": "Often confused with [word] because...",
  "memoryTrick": "Remember it as...",
  "context": "You'll hear this in..."
}`,
            }],
          }),
        }),
        {
          onRetry: (attempt, secs) => {
            if (currentWord.current === word)
              setRetryStatus(`Claude AI is busy right now. Retrying in ${secs}s… (${attempt}/2)`)
          },
        }
      )

      if (currentWord.current !== word) return
      setRetryStatus(null)

      if (!res.ok) {
        const body = await res.text()
        throw new Error(`API ${res.status}: ${body.slice(0, 120)}`)
      }

      const data = await res.json()
      const text = data.content?.[0]?.text ?? ''
      const match = text.match(/\{[\s\S]*?\}/)
      if (!match) throw new Error('Unexpected response format')
      const parsed = JSON.parse(match[0])

      if (currentWord.current === word) {
        cache.set(word, parsed)
        setHint(parsed)
      }
    } catch (e) {
      if (currentWord.current === word) {
        setRetryStatus(null)
        setError(e.isOverloaded
          ? 'AI is currently overloaded. Please try again in a minute.'
          : e.message)
      }
    } finally {
      if (currentWord.current === word) setIsLoading(false)
    }
  }

  return { hint, isLoading, error, retryStatus, fetchHint }
}
