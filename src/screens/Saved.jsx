import React, { useState, useMemo } from 'react'
import Tile from '../ui/Tile.jsx'
import { useSaved } from '../state/SavedState.jsx'
import { Bookmark, Trash2, ArrowRight } from 'lucide-react'

export default function Saved({ onOpen, onPlay, onGo }) {
  const { saved, wipe, pull } = useSaved()
  const [tab, setTab] = useState('all')

  const clean = useMemo(() => saved.filter(x => x && x.id), [saved])

  const list = useMemo(() => {
    if (tab === 'all') return clean
    return clean.filter(x => x.kind === tab)
  }, [clean, tab])

  const nuke = () => {
    if (window.confirm('Clear your entire saved list?')) {
      wipe()
    }
  }

  const drop = (id) => {
    if (!id) return
    pull(id)
  }

  const tabBtn = (key, label) => (
    <button
      onClick={() => setTab(key)}
      className={`
        px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer
        ${tab === key
          ? 'bg-brand-gold text-night-base'
          : 'text-ink-darkSoft hover:text-ink-dark dark:text-ink-muted dark:hover:text-ink-main'
        }
      `}
    >
      {label}
    </button>
  )

  return (
    <div className="max-w-7xl mx-auto px-6 pt-32 pb-16 space-y-8">
      <div className="
        flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-5 border-b
        border-day-line dark:border-night-line
      ">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-brand-gold grid place-items-center text-night-base">
              <Bookmark className="w-4 h-4 fill-current" />
            </div>
            <h1 className="font-title text-3xl sm:text-4xl font-bold text-ink-dark dark:text-ink-main">
              Saved
            </h1>
          </div>
          <p className="text-xs mt-2 text-ink-darkSoft dark:text-ink-muted">
            {clean.length} {clean.length === 1 ? 'title' : 'titles'} in your watchlist
          </p>
        </div>

        {clean.length > 0 && (
          <div className="flex items-center gap-3">
            <div className="
              flex items-center p-1 rounded-xl border
              bg-day-card border-day-line
              dark:bg-night-card dark:border-night-line
            ">
              {tabBtn('all', 'All')}
              {tabBtn('movie', 'Films')}
              {tabBtn('tv', 'Series')}
            </div>

            <button
              onClick={nuke}
              className="
                flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs cursor-pointer transition-colors border
                bg-day-card border-day-line text-red-600 hover:bg-red-50
                dark:bg-night-card dark:border-night-line dark:text-red-400 dark:hover:bg-red-950/40
              "
            >
              <Trash2 className="w-3.5 h-3.5" />
              Clear
            </button>
          </div>
        )}
      </div>

      {list.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {list.map((item, i) => (
            <div key={item.id} className="relative">
              <button
                onClick={() => drop(item.id)}
                className="
                  absolute top-2 right-2 z-20 p-1.5 rounded-full cursor-pointer
                  bg-black/70 hover:bg-red-500/80
                  text-white/70 hover:text-white transition-colors
                "
                title="Remove"
              >
                <Trash2 className="w-3 h-3" />
              </button>
              <Tile item={item} i={i} onOpen={onOpen} onPlay={onPlay} />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 space-y-4 max-w-sm mx-auto">
          <div className="
            w-16 h-16 rounded-2xl grid place-items-center mx-auto border
            bg-day-card border-day-line text-ink-darkSoft
            dark:bg-night-card dark:border-night-line dark:text-ink-muted
          ">
            <Bookmark className="w-7 h-7 opacity-40" />
          </div>
          <h3 className="font-title text-xl font-bold text-ink-dark dark:text-ink-main">
            Nothing saved yet
          </h3>
          <p className="text-xs leading-relaxed text-ink-darkSoft dark:text-ink-muted">
            Tap the bookmark icon on any film, series, or person to save it here for later.
          </p>
          <button
            onClick={() => onGo('landing')}
            className="
              inline-flex items-center gap-2 px-6 py-2.5 rounded-full
              bg-brand-gold text-night-base text-xs uppercase tracking-wider font-semibold
              cursor-pointer hover:scale-105 active:scale-95 transition-all
            "
          >
            Browse the archive
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  )
}