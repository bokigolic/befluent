import { useState, useRef, useEffect } from 'react'
import useAutocomplete from '../../hooks/useAutocomplete'
import useStore from '../../store/useStore'
import styles from './SearchBar.module.css'

export default function SearchBar({ onSearch }) {
  const [value, setValue] = useState('')
  const [open, setOpen] = useState(false)
  const [focused, setFocused] = useState(false)
  const [pressing, setPressing] = useState(false)
  const dictMode = useStore((s) => s.dictMode)
  const inputRef = useRef(null)
  const containerRef = useRef(null)

  const suggestions = useAutocomplete(value)

  const placeholder =
    dictMode === 'sr-en' ? 'Pretraži na srpskom...' : 'Search in English...'

  useEffect(() => {
    setOpen(suggestions.length > 0 && focused)
  }, [suggestions, focused])

  useEffect(() => {
    const handler = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false)
      }
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

  const commit = (word) => {
    const trimmed = word.trim()
    if (!trimmed) return
    setValue(trimmed)
    setOpen(false)
    onSearch(trimmed)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') commit(value)
    if (e.key === 'Escape') { setValue(''); setOpen(false) }
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
                className={`${styles.item} ${i === suggestions.length - 1 ? styles.itemLast : ''}`}
                style={{ animationDelay: `${i * 30}ms` }}
                onMouseDown={() => commit(word)}
              >
                {word}
              </li>
            ))}
          </ul>
        )}
      </div>
      <button
        className={`${styles.searchBtn} ${pressing ? styles.searchBtnPress : ''}`}
        onClick={handleSearchClick}
      >
        Search
      </button>
    </div>
  )
}
