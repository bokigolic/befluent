const toDateStr = (d) => d.toISOString().slice(0, 10)
const today = () => toDateStr(new Date())

export function calculateNextReview(card, quality) {
  let { interval, easeFactor, repetitions } = card

  if (quality < 3) {
    interval = 1
    repetitions = 0
    easeFactor = Math.max(1.3, easeFactor - 0.2)
  } else {
    if (repetitions === 0)      interval = 1
    else if (repetitions === 1) interval = 3
    else if (quality >= 4) {
      interval = Math.round(interval * easeFactor)
      easeFactor = Math.min(3.0, easeFactor + 0.1)
    } else {
      interval = Math.round(interval * 1.2)
    }
    repetitions += 1
  }

  const next = new Date()
  next.setDate(next.getDate() + interval)

  return { interval, easeFactor, repetitions, nextReview: toDateStr(next) }
}

export function getDueCards(allCards) {
  const t = today()
  return allCards.filter(c => c.nextReview <= t)
}

export function sortByPriority(cards) {
  const t = today()
  return [...cards].sort((a, b) => {
    const da = new Date(t) - new Date(a.nextReview)
    const db = new Date(t) - new Date(b.nextReview)
    return db - da
  })
}

export function previewInterval(card, quality) {
  return calculateNextReview(card, quality).interval
}
