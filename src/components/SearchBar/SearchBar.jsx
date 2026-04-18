import { useState, useRef, useEffect, useCallback } from 'react'
import useAutocomplete from '../../hooks/useAutocomplete'
import useStore from '../../store/useStore'
import styles from './SearchBar.module.css'

const PLACEHOLDERS = {
  'en-en': 'Search any English word…',
  'en-sr': 'English word to translate…',
  'sr-en': 'Srpska reč za prevod…',
}

export default function SearchBar({ onSearch }) {
  const [value,       setValue]       = useState('')
  const [open,        setOpen]        = useState(false)
  const [focused,     setFocused]     = useState(false)
  const [pressing,    setPressing]    = useState(false)
  const [activeIndex, setActiveIndex] = useState(-1)

  const dictMode      = useStore(s => s.dictMode)
  const instantSearch = useStore(s => s.instantSearch)
  const toggleInstant = useStore(s => s.toggleInstantSearch)

  const inputRef     = useRef(null)
  const containerRef = useRef(null)
  const debounceRef  = useRef(null)

  const suggestions = useAutocomplete(value)

  const placeholder = PLACEHOLDERS[dictMode] ?? PLACEHOLDERS['en-en']

  useEffect(() => {
    setOpen(suggestions.length > 0 && focused)
    setActiveIndex(-1)
  }, [suggestions, focused])

  useEffect(() => {
    const handler = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  // "/" global shortcut
  useEffect(() => {
    const handler = (e) => {
      if (e.key === '/' && document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA') {
        e.preventDefault()
        inputRef.current?.focus()
      }
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [])

  const commit = useCallback((word) => {
    const trimmed = word.trim()
    if (!trimmed) return
    setValue(trimmed)
    setOpen(false)
    onSearch(trimmed)
  }, [onSearch])

  // Instant search debounce
  useEffect(() => {
    if (!instantSearch || value.length < 3) return
    clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => commit(value), 600)
    return () => clearTimeout(debounceRef.current)
  }, [value, instantSearch, commit])

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActiveIndex(i => (i < suggestions.length - 1 ? i + 1 : 0))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActiveIndex(i => (i > 0 ? i - 1 : suggestions.length - 1))
    } else if (e.key === 'Enter') {
      if (open && activeIndex >= 0 && suggestions[activeIndex]) commit(suggestions[activeIndex])
      else commit(value)
    } else if (e.key === 'Escape') {
      setValue(''); setOpen(false); setActiveIndex(-1)
    }
  }

  const handleSearchClick = () => {
    setPressing(true)
    setTimeout(() => setPressing(false), 150)
    commit(value)
  }

  const showSlashBadge = !focused && !value

  return (
    <div className={styles.wrapper} ref={containerRef}>
      <div className={styles.inputWrap}>
        <span className={styles.icon}>🔍</span>
        <input
          ref={inputRef}
          className={styles.input}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setFocused(true)}
          onBlur={() => { setFocused(false); setTimeout(() => setOpen(false), 120) }}
          placeholder={placeholder}
          autoComplete="off"
          spellCheck={false}
        />
        {value && (
          <button
            className={styles.clear}
            onClick={() => { setValue(''); setOpen(false); inputRef.current?.focus() }}
            tabIndex={-1}
            aria-label="Clear"
          >
            ×
          </button>
        )}
        {showSlashBadge && <span className={styles.slashBadge}>/</span>}
        {open && suggestions.length > 0 && (
          <ul className={styles.dropdown}>
            {suggestions.map((word, i) => (
              <li
                key={word}
                className={`${styles.item} ${i === suggestions.length - 1 ? styles.itemLast : ''} ${i === activeIndex ? styles.itemActive : ''}`}
                style={{ animationDelay: `${i * 30}ms` }}
                onMouseDown={() => commit(word)}
                onMouseEnter={() => setActiveIndex(i)}
              >
                {word}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className={styles.btnRow}>
        <button
          className={`${styles.searchBtn} ${pressing ? styles.searchBtnPress : ''}`}
          onClick={handleSearchClick}
        >
          Search
        </button>
        <button
          className={`${styles.instantToggle} ${instantSearch ? styles.instantActive : ''}`}
          onClick={toggleInstant}
          title="Toggle instant search"
        >
          ⚡ Instant
        </button>
      </div>
    </div>
  )
}
