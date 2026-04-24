import { useState, useCallback, useRef } from 'react'

const API_KEY = import.meta.env.VITE_ANTHROPIC_API_KEY ?? ''

function buildSystemPrompt(scenario) {
  return `You are roleplaying as a ${scenario.aiRole} in this scenario: ${scenario.setting}

CRITICAL RULES:
1. Stay completely in character. Never break the roleplay.
2. Keep responses SHORT — 1-3 sentences maximum. This is a conversation, not a lecture.
3. After each user message, respond naturally in character THEN on a new line add feedback in this EXACT format (must be valid JSON):
[FEEDBACK: {"hasErrors": true, "corrected": "corrected version of user message", "errors": [{"original": "wrong part", "fix": "correct version", "rule": "grammar rule name"}], "tip": "one short tip", "score": 85}]
4. If the user's English is perfect, still add: [FEEDBACK: {"hasErrors": false, "corrected": "", "errors": [], "tip": "Great natural English!", "score": 100}]
5. Be encouraging and supportive.
6. After 10 user turns, end the conversation naturally and add [CONVERSATION_COMPLETE] at the very end of your response.
7. Speak naturally as your character would — use contractions and casual language where appropriate.`
}

function parseResponse(text) {
  const feedbackMatch = text.match(/\[FEEDBACK:\s*(\{[\s\S]*?\})\]/s)
  const mainText = text
    .replace(/\[FEEDBACK:\s*\{[\s\S]*?\}\]/gs, '')
    .replace(/\[CONVERSATION_COMPLETE\]/g, '')
    .trim()

  let feedback = null
  if (feedbackMatch) {
    try {
      feedback = JSON.parse(feedbackMatch[1])
      feedback.errors  = Array.isArray(feedback.errors) ? feedback.errors : []
      feedback.score   = Math.max(0, Math.min(100, Number(feedback.score) || 80))
      feedback.hasErrors = Boolean(feedback.hasErrors)
    } catch {}
  }

  const isComplete = text.includes('[CONVERSATION_COMPLETE]')
  return { mainText, feedback, isComplete }
}

export function useConversation(scenario) {
  const [messages,             setMessages]             = useState([])
  const [isLoading,            setIsLoading]            = useState(false)
  const [turnCount,            setTurnCount]            = useState(0)
  const [conversationComplete, setConversationComplete] = useState(false)
  const [error,                setError]                = useState(null)

  // Tracks the alternating user/assistant history sent to the API
  const apiHistoryRef = useRef([
    { role: 'user', content: 'Start the conversation now. Open with a natural greeting in character.' },
  ])

  const callAPI = useCallback(async (history) => {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY,
        'anthropic-version': '2023-06-01',
        'anthropic-dangerous-direct-browser-access': 'true',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: 500,
        system: buildSystemPrompt(scenario),
        messages: history,
      }),
    })
    if (!res.ok) {
      const body = await res.text()
      throw new Error(`API ${res.status}: ${body.slice(0, 100)}`)
    }
    const data = await res.json()
    return data.content?.[0]?.text ?? ''
  }, [scenario])

  const startConversation = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const rawText = await callAPI(apiHistoryRef.current)
      const { mainText } = parseResponse(rawText)
      apiHistoryRef.current = [
        ...apiHistoryRef.current,
        { role: 'assistant', content: mainText },
      ]
      setMessages([{
        id: 'open-0',
        role: 'assistant',
        content: mainText,
        feedback: null,
        timestamp: Date.now(),
      }])
    } catch (e) {
      setError(e.message)
      setMessages([{
        id: 'err-0',
        role: 'assistant',
        content: '🔌 Could not connect. Check your internet connection or API key.',
        feedback: null,
        timestamp: Date.now(),
      }])
    } finally {
      setIsLoading(false)
    }
  }, [callAPI])

  const sendMessage = useCallback(async (text) => {
    if (!text.trim() || isLoading || conversationComplete) return
    setError(null)

    const userMsg = {
      id: `u-${Date.now()}`,
      role: 'user',
      content: text.trim(),
      timestamp: Date.now(),
    }
    setMessages(prev => [...prev, userMsg])
    apiHistoryRef.current = [...apiHistoryRef.current, { role: 'user', content: text.trim() }]
    setIsLoading(true)

    try {
      const rawText = await callAPI(apiHistoryRef.current)
      const { mainText, feedback, isComplete } = parseResponse(rawText)

      const newTurn = turnCount + 1
      setTurnCount(newTurn)

      apiHistoryRef.current = [...apiHistoryRef.current, { role: 'assistant', content: mainText }]

      setMessages(prev => [...prev, {
        id: `a-${Date.now()}`,
        role: 'assistant',
        content: mainText,
        feedback,
        timestamp: Date.now(),
      }])

      if (isComplete || newTurn >= 10) setConversationComplete(true)
    } catch (e) {
      setError(e.message)
      setMessages(prev => [...prev, {
        id: `err-${Date.now()}`,
        role: 'assistant',
        content: '⚠️ Connection error. Please try again.',
        feedback: null,
        timestamp: Date.now(),
      }])
    } finally {
      setIsLoading(false)
    }
  }, [isLoading, conversationComplete, callAPI, turnCount])

  const reset = useCallback(() => {
    apiHistoryRef.current = [
      { role: 'user', content: 'Start the conversation now. Open with a natural greeting in character.' },
    ]
    setMessages([])
    setIsLoading(false)
    setTurnCount(0)
    setConversationComplete(false)
    setError(null)
  }, [])

  return { messages, isLoading, turnCount, conversationComplete, error, startConversation, sendMessage, reset }
}
