import React, { useState, useEffect } from 'react'
import SearchField from '../ui/SearchField.jsx'
import SearchGrid from '../ui/SearchGrid.jsx'
import { useTypeDelay } from '../hooks/useTypeDelay.js'
import { api } from '../api/data.js'
import { Sparkles, Film, Tv, Users } from 'lucide-react'

const QUICK = ['Dune', 'Nolan', 'Zendaya', 'Sci-Fi', 'Shōgun', 'Oppenheimer', 'Drama']

export default function Find({ onOpen, onPerson, onPlay }) {
  const [q, setQ] = useState('')
  const [tab, setTab] = useState('all')
  const [results, setResults] = useState({ movies: [], people: [] })
  const [busy, setBusy] = useState(false)

  const delayed = useTypeDelay(q, 260)

  useEffect(() => {
    const run = async () => {
      if (!delayed.trim()) {
        setResults({ movies: [], people: [] })
        return
      }
      setBusy(true)
      try {
        const r = await api.find(delayed)
        setResults(r)
      } finally {
        setBusy(false)
      }
    }
    run()
  }, [delayed])

  return (
    <div className="max-w-7xl mx-auto px-6 pt-32 pb-16 space-y-8">
      <header className="text-center max-w-lg mx-auto space-y-2">
        <h1 className="font-title text-3xl sm:text-4xl font-bold text-ink-dark dark:text-ink-main">
          Search the archive
        </h1>
        <p className="text-sm text-ink-darkSoft dark:text-ink-muted">
          Type a film, series, director, actor, or a mood.
        </p>
      </header>

      <SearchField value={q} onChange={setQ} onClear={() => setQ('')} busy={busy} />

      {!q && (
        <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
          <span className="text-xs flex items-center gap-1 text-ink-darkSoft dark:text-ink-muted">
            <Sparkles className="w-3 h-3 text-brand-goldDark dark:text-brand-gold" />
            Try:
          </span>
          {QUICK.map(s => (
            <button
              key={s}
              onClick={() => setQ(s)}
              className="
                px-3 py-1 rounded-full text-xs cursor-pointer transition-colors border
                bg-day-card border-day-line text-ink-darkSoft hover:text-brand-goldDark hover:border-brand-gold/40
                dark:bg-night-card dark:border-night-line dark:text-ink-soft dark:hover:text-brand-gold
              "
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {q && (
        <div className="flex items-center justify-center gap-2 pb-4 border-b border-day-line dark:border-night-line">
          {[
            { k: 'all', l: 'All', icon: null },
            { k: 'movies', l: 'Films', icon: Film },
            { k: 'shows', l: 'Series', icon: Tv },
            { k: 'people', l: 'People', icon: Users },
          ].map(t => {
            const Icon = t.icon
            const on = tab === t.k
            return (
              <button
                key={t.k}
                onClick={() => setTab(t.k)}
                className={`
                  flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-medium
                  cursor-pointer transition-all border
                  ${on
                    ? 'bg-brand-gold text-night-base font-semibold border-brand-gold'
                    : 'bg-day-card text-ink-darkSoft border-day-line hover:text-brand-goldDark dark:bg-night-card dark:text-ink-soft dark:border-night-line dark:hover:text-brand-gold'
                  }
                `}
              >
                {Icon && <Icon className="w-3.5 h-3.5" />}
                {t.l}
              </button>
            )
          })}
        </div>
      )}

      {q && (
        <SearchGrid
          results={results}
          filter={tab}
          onOpen={onOpen}
          onPerson={onPerson}
          onPlay={onPlay}
        />
      )}
    </div>
  )
}