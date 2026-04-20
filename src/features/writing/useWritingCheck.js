import { useState } from 'react'

const API_KEY = import.meta.env.VITE_ANTHROPIC_API_KEY ?? ''

const SYSTEM_PROMPT = `You are an expert English language teacher specializing in helping non-native speakers improve their writing. You provide constructive, encouraging feedback that is specific and actionable.

Always respond with valid JSON only. No markdown, no explanation outside JSON.`

function buildUserPrompt(text, mode, targetGrammar, level) {
  return `Analyze this English writing from a ${level ?? 'B1'} level learner.
Mode: ${mode} (sentence/paragraph/free)
Target grammar: ${Array.isArray(targetGrammar) ? targetGrammar.join(', ') : (targetGrammar ?? 'general')}
Student's text: "${text}"

Respond with this exact JSON structure:
{
  "overallScore": 85,
  "overallFeedback": "Great attempt! Your sentence shows good understanding of...",
  "correctedText": "The corrected version of their text",
  "errors": [
    {
      "original": "the exact wrong text",
      "corrected": "the correct version",
      "type": "grammar",
      "rule": "Name of the grammar rule",
      "explanation": "Clear explanation why this is wrong and how to fix it",
      "severity": "critical"
    }
  ],
  "strengths": ["thing they did well 1", "thing they did well 2"],
  "suggestions": ["specific suggestion to improve 1", "specific suggestion to improve 2"],
  "grammarFocus": "The main grammar point they should review",
  "encouragement": "A personalized encouraging message based on their level and effort",
  "xpEarned": 15
}

Rules:
- Be encouraging and constructive, never harsh
- Explain errors in simple terms
- For beginners: focus on critical errors only, ignore minor style issues
- For advanced: give detailed style and sophistication feedback
- xpEarned: 5 for major errors, 10 for minor errors only, 15 for excellent, 20 for perfect
- Always find at least 2 strengths even in weak writing
- error type must be one of: grammar, spelling, punctuation, word-choice, style
- error severity must be one of: critical, important, minor
- correctedText: rewrite their full text with all errors fixed`
}

export function useWritingCheck() {
  const [result,    setResult]    = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error,     setError]     = useState(null)

  const checkWriting = async (text, mode, prompt) => {
    if (!text.trim()) return
    setIsLoading(true)
    setError(null)
    setResult(null)

    const targetGrammar = prompt?.targetGrammar ?? 'general'
    const difficulty    = prompt?.difficulty ?? 'B1'

    try {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': API_KEY,
          'anthropic-version': '2023-06-01',
          'anthropic-dangerous-direct-browser-access': 'true',
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-5',
          max_tokens: 1200,
          system: SYSTEM_PROMPT,
          messages: [{ role: 'user', content: buildUserPrompt(text, mode, targetGrammar, difficulty) }],
        }),
      })

      if (!res.ok) {
        const body = await res.text()
        throw new Error(`API ${res.status}: ${body.slice(0, 120)}`)
      }

      const data = await res.json()
      const raw  = data.content?.[0]?.text ?? ''
      const match = raw.match(/\{[\s\S]*\}/)
      if (!match) throw new Error('Unexpected response format')

      const parsed = JSON.parse(match[0])
      // Clamp score
      parsed.overallScore = Math.max(0, Math.min(100, parsed.overallScore ?? 70))
      parsed.xpEarned     = Math.max(5, Math.min(20, parsed.xpEarned ?? 10))
      parsed.errors       = Array.isArray(parsed.errors) ? parsed.errors : []
      parsed.strengths    = Array.isArray(parsed.strengths) ? parsed.strengths : []
      parsed.suggestions  = Array.isArray(parsed.suggestions) ? parsed.suggestions : []
      setResult(parsed)
    } catch (e) {
      setError(e.message)
    } finally {
      setIsLoading(false)
    }
  }

  const reset = () => { setResult(null); setError(null) }

  return { result, isLoading, error, checkWriting, reset }
}
