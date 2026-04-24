/**
 * Retries a fetch call up to maxRetries times when Claude returns 529 (overloaded).
 * Waits 1s, 2s, 4s between retries (exponential backoff).
 */
export async function callWithRetry(fetchFn, { maxRetries = 3, onRetry } = {}) {
  for (let i = 0; i < maxRetries; i++) {
    const response = await fetchFn()
    if (response.status !== 529) return response

    if (i < maxRetries - 1) {
      const waitSeconds = Math.pow(2, i) // 1s → 2s → 4s
      onRetry?.(i + 1, waitSeconds)
      await new Promise(r => setTimeout(r, waitSeconds * 1000))
    } else {
      throw Object.assign(
        new Error('AI is currently overloaded. Please try again in a minute.'),
        { isOverloaded: true }
      )
    }
  }
}
