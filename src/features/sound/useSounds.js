import useStore from '../../store/useStore'

let ctx = null

function getCtx() {
  if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)()
  return ctx
}

function beep(frequency, duration, type = 'sine', volume = 0.1) {
  try {
    const c = getCtx()
    const osc  = c.createOscillator()
    const gain = c.createGain()
    osc.connect(gain)
    gain.connect(c.destination)
    osc.frequency.value = frequency
    osc.type = type
    gain.gain.setValueAtTime(volume, c.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, c.currentTime + duration)
    osc.start(c.currentTime)
    osc.stop(c.currentTime + duration)
  } catch {}
}

function delay(ms) {
  return new Promise(r => setTimeout(r, ms))
}

export function useSounds() {
  const soundEnabled = useStore(s => s.soundEnabled)

  const play = (name) => {
    if (!soundEnabled) return
    switch (name) {
      case 'correct':
        beep(800, 0.15)
        break
      case 'wrong':
        beep(200, 0.3, 'sawtooth')
        break
      case 'achievement':
        beep(600, 0.1)
        delay(120).then(() => beep(900, 0.2))
        break
      case 'levelup':
        beep(400, 0.1)
        delay(120).then(() => beep(600, 0.1))
        delay(240).then(() => beep(800, 0.2))
        break
      case 'xp':
        beep(500, 0.08)
        break
      case 'tab':
        beep(300, 0.05)
        break
      default:
        break
    }
  }

  return { play }
}
