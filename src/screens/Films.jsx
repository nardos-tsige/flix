import React, { useState, useMemo } from 'react'
import Tile from '../ui/Tile.jsx'
import { Film, ArrowUpDown } from 'lucide-react'
import { GENRES } from '../helpers/content.js'

export default function Films({ movies = [], onOpen, onPlay }) {
  const [tag, setTag] = useState('All')
  const [sort, setSort] = useState('score')

  const list = useMemo(() => {
    let out = movies.filter(m => m.kind === 'movie')
    if (tag !== 'All') out = out.filter(m => m.tags.includes(tag))
    out.sort((a, b) => {
      if (sort === 'score') return b.score - a.score
      if (sort === 'year') return (b.year || 0) - (a.year || 0)
      if (sort === 'title') return a.title.localeCompare(b.title)
      return 0
    })
    return out
  }, [movies, tag, sort])

  return (
    <div className="max-w-7xl mx-auto px-6 pt-32 pb-16 space-y-8">
      <header className="space-y-1.5 border-b pb-5 border-day-line dark:border-night-line">
        <div className="flex items-center gap-2">
          <Film className="w-4 h-4 text-brand-goldDark dark:text-brand-gold" />
          <h1 className="font-title text-3xl sm:text-4xl font-bold text-ink-dark dark:text-ink-main">
            Films
          </h1>
        </div>
        <p className="text-sm max-w-lg text-ink-darkSoft dark:text-ink-muted">
          A living archive of feature-length storytelling — from quiet dramas to loud spectacles.
        </p>
      </header>

      <div className="
        flex flex-col md:flex-row md:items-center justify-between gap-4
        p-3.5 rounded-2xl border
        bg-day-card border-day-line
        dark:bg-night-card dark:border-night-line
      ">
        <div className="flex items-center gap-2 overflow-x-auto no-bar">
          {GENRES.map(g => (
            <button
              key={g}
              onClick={() => setTag(g)}
              className={`
                px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap cursor-pointer transition-all
                ${tag === g
                  ? 'bg-brand-gold text-night-base font-semibold'
                  : 'bg-day-soft text-ink-darkSoft hover:text-brand-goldDark dark:bg-night-soft dark:text-ink-soft dark:hover:text-brand-gold'
                }
              `}
            >
              {g}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <ArrowUpDown className="w-3.5 h-3.5 text-brand-goldDark dark:text-brand-gold" />
          <select
            value={sort}
            onChange={e => setSort(e.target.value)}
            className="
              text-xs rounded-lg px-3 py-1.5 outline-none cursor-pointer border
              bg-day-soft text-ink-dark border-day-line focus:border-brand-gold
              dark:bg-night-soft dark:text-ink-main dark:border-night-line
            "
          >
            <option value="score">Top rated</option>
            <option value="year">Newest</option>
            <option value="title">A → Z</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {list.map((m, i) => (
          <Tile key={m.id} item={m} i={i} onOpen={onOpen} onPlay={onPlay} />
        ))}
      </div>

      {list.length === 0 && (
        <p className="text-center text-sm py-16 text-ink-darkSoft dark:text-ink-muted">
          Nothing in "{tag}" yet.
        </p>
      )}
    </div>
  )
}