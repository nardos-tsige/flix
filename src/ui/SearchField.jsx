import React, { useEffect, useRef } from 'react'
import { Search, Loader2, X } from 'lucide-react'

export default function SearchField({
  value,
  onChange,
  onClear,
  busy = false,
  autoFocus = true,
}) {
  const ref = useRef(null)

  useEffect(() => {
    if (autoFocus && ref.current) ref.current.focus()
  }, [autoFocus])

  return (
    <div className="relative max-w-xl mx-auto w-full">
      <div className="absolute -inset-1 rounded-full bg-brand-gold/20 blur-2xl opacity-0 focus-within:opacity-100 transition-opacity" />
      <div className="
        relative flex items-center gap-3 px-5 py-3.5 rounded-full transition-colors border
        bg-day-card border-day-line focus-within:border-brand-gold
        dark:bg-night-card dark:border-night-line dark:focus-within:border-brand-gold
      ">
        <Search className="w-4 h-4 shrink-0 text-ink-darkSoft dark:text-ink-muted" />
        <input
          ref={ref}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search films, series, people…"
          className="
            flex-1 bg-transparent border-0 outline-none text-sm
            text-ink-dark placeholder:text-ink-darkSoft
            dark:text-ink-main dark:placeholder:text-ink-muted
          "
        />
        {busy ? (
          <Loader2 className="w-4 h-4 text-brand-goldDark dark:text-brand-gold animate-spin shrink-0" />
        ) : value ? (
          <button
            onClick={onClear}
            className="
              cursor-pointer p-1 rounded-full transition-colors
              text-ink-darkSoft hover:text-ink-dark hover:bg-black/5
              dark:text-ink-muted dark:hover:text-ink-main dark:hover:bg-white/10
            "
            aria-label="Clear"
          >
            <X className="w-4 h-4" />
          </button>
        ) : (
          <kbd className="
            hidden sm:inline-block px-2 py-0.5 text-[10px] rounded font-mono
            bg-black/5 text-ink-darkSoft
            dark:bg-white/10 dark:text-ink-muted
          ">
            ESC
          </kbd>
        )}
      </div>
    </div>
  )
}