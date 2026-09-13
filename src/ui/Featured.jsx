import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, Info, Bookmark, Star } from 'lucide-react'
import { useSaved } from '../state/SavedState.jsx'
import { useThemeCtx } from '../state/ThemeState.jsx'
import { minsToText } from '../helpers/formatters.js'

export default function Featured({ films = [], onOpen, onPlay }) {
  const [idx, setIdx] = useState(0)
  const { has, flip } = useSaved()
  const { isDark } = useThemeCtx()

  const pool = films.filter(f => f && f.id)
  const film = pool[idx] || pool[0]

  useEffect(() => {
    if (pool.length < 2) return
    const t = setInterval(() => setIdx(i => (i + 1) % pool.length), 9000)
    return () => clearInterval(t)
  }, [pool.length])

  if (!film) return null

  const picked = has(film.id)

  const onSave = () => {
    flip(film)
  }

  return (
    <section className="relative w-full min-h-[86vh] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={film.id}
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: isDark ? 1 : 0.9, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: 'easeInOut' }}
          className="absolute inset-0"
        >
          <img src={film.cover} alt={film.title} className="w-full h-full object-cover" />
        </motion.div>
      </AnimatePresence>

      <div className="
        absolute inset-0
        bg-gradient-to-r from-day-base via-day-base/70 to-transparent
        dark:from-night-base dark:via-night-base/70
      " />
      <div className="
        absolute inset-x-0 bottom-0 h-56
        bg-day-fade dark:bg-night-fade
      " />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 pt-40 pb-24 w-full">
        <div className="max-w-xl space-y-5">
          <div className="flex items-center gap-3">
            <span className="text-[11px] tracking-[0.3em] uppercase text-brand-goldDark dark:text-brand-gold font-semibold">
              Tonight's Feature
            </span>
            <span className="h-px flex-1 max-w-[60px] bg-brand-goldDark/40 dark:bg-brand-gold/40" />
            <div className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5 fill-brand-gold text-brand-gold" />
              <span className="text-xs font-semibold text-ink-dark dark:text-ink-main">
                {(film.score || 0).toFixed(1)}
              </span>
            </div>
            <span className="text-xs text-ink-darkSoft dark:text-ink-muted">
              • {minsToText(film.runtime)}
            </span>
          </div>

          <h1 className="
            font-title text-5xl sm:text-6xl md:text-7xl font-black leading-[1.02] tracking-tight
            text-ink-dark dark:text-ink-main
          ">
            {film.title}
          </h1>

          {film.tagline && (
            <p className="italic text-sm text-brand-goldDark dark:text-brand-goldLight">
              "{film.tagline}"
            </p>
          )}

          <p className="
            text-[15px] leading-relaxed line-clamp-3 max-w-lg
            text-ink-darkSoft dark:text-ink-soft
          ">
            {film.blurb}
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-1">
            <button
              onClick={() => onPlay(film.trailer || 'dQw4w9WgXcQ')}
              className="
                flex items-center gap-2 px-6 py-3 rounded-full cursor-pointer
                bg-brand-gold hover:bg-brand-goldLight text-night-base
                font-semibold text-sm tracking-wide
                transition-all hover:scale-[1.03] active:scale-95
                shadow-[0_10px_30px_-10px_rgba(228,161,27,0.6)]
              "
            >
              <Play className="w-4 h-4 fill-current" />
              Play Trailer
            </button>

            <button
              onClick={() => onOpen(film)}
              className="
                flex items-center gap-2 px-5 py-3 rounded-full cursor-pointer
                font-semibold text-sm tracking-wide
                transition-all hover:scale-[1.03] active:scale-95
                bg-black/[0.05] hover:bg-black/[0.10] text-ink-dark border border-black/10
                dark:bg-white/[0.08] dark:hover:bg-white/[0.14] dark:text-ink-main dark:border-white/10
              "
            >
              <Info className="w-4 h-4" />
              Details
            </button>

            <button
              onClick={onSave}
              className={`
                p-3 rounded-full cursor-pointer transition-all hover:scale-110 active:scale-95
                ${picked
                  ? 'bg-brand-gold text-night-base'
                  : 'bg-black/[0.05] text-ink-dark border border-black/10 dark:bg-white/[0.08] dark:text-ink-main dark:border-white/10'
                }
              `}
              aria-label="Save"
            >
              <Bookmark className={`w-4 h-4 ${picked ? 'fill-current' : ''}`} />
            </button>
          </div>
        </div>

        {pool.length > 1 && (
          <div className="absolute bottom-8 right-6 flex items-center gap-2">
            {pool.map((_, i) => (
              <button
                key={i}
                onClick={() => setIdx(i)}
                className={`
                  transition-all rounded-full cursor-pointer
                  ${i === idx
                    ? 'w-7 h-1.5 bg-brand-gold'
                    : 'w-1.5 h-1.5 bg-black/20 hover:bg-black/40 dark:bg-white/25 dark:hover:bg-white/50'
                  }
                `}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}