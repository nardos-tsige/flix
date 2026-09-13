import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X, Play, Bookmark, Star, Clock, Calendar,
  Share2, Plus, Check, ChevronRight
} from 'lucide-react'
import CastStrip from './CastStrip.jsx'
import AlsoLike from './AlsoLike.jsx'
import { useSaved } from '../state/SavedState.jsx'
import { minsToText } from '../helpers/formatters.js'

export default function InfoPanel({ film, alsoLike = [], onClose, onPlay, onOpen }) {
  const { has, flip } = useSaved()
  const [tab, setTab] = useState('overview')

  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
  }, [])

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  if (!film) return null

  const picked = has(film.id)

  const toggle = () => {
    flip(film)
  }

  const share = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
    } catch {}
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[55] overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-lg cursor-pointer"
        />

        <div className="relative min-h-full grid place-items-center p-3 sm:p-6 lg:p-8">
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.45, ease: [0.2, 0.9, 0.3, 1] }}
            className="
              relative z-10 w-full max-w-5xl my-auto rounded-3xl overflow-hidden shadow-2xl
              bg-day-card border border-day-line
              dark:bg-night-soft dark:border-night-line
            "
          >
            <div className="relative aspect-[16/9] sm:aspect-[2.4/1] w-full overflow-hidden bg-black">
              <motion.img
                src={film.cover}
                alt={film.title}
                className="w-full h-full object-cover"
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 2, ease: 'easeOut' }}
              />

              <div className="absolute inset-0 bg-gradient-to-t from-day-card via-day-card/40 to-transparent dark:from-night-soft dark:via-night-soft/40" />
              <div className="absolute inset-0 bg-gradient-to-r from-day-card/60 via-transparent to-transparent dark:from-night-soft/60" />

              <div className="absolute top-4 right-4 flex items-center gap-2">
                <button
                  onClick={share}
                  className="
                    w-10 h-10 rounded-full grid place-items-center
                    bg-black/50 backdrop-blur-md border border-white/20
                    text-white hover:bg-black/80 transition-colors cursor-pointer
                  "
                  aria-label="Share"
                >
                  <Share2 className="w-4 h-4" />
                </button>
                <button
                  onClick={onClose}
                  className="
                    w-10 h-10 rounded-full grid place-items-center
                    bg-black/50 backdrop-blur-md border border-white/20
                    text-white hover:bg-black/80 transition-colors cursor-pointer
                  "
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-5">
                <div className="max-w-2xl">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="
                      px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-widest
                      bg-brand-gold text-night-base
                    ">
                      {film.kind === 'tv' ? 'Series' : 'Feature Film'}
                    </span>
                    <div className="
                      flex items-center gap-1 px-2.5 py-0.5 rounded-full
                      bg-black/60 backdrop-blur-md border border-brand-gold/30
                    ">
                      <Star className="w-3 h-3 fill-brand-gold text-brand-gold" />
                      <span className="text-white text-[11px] font-bold">
                        {(film.score || 0).toFixed(1)}
                      </span>
                    </div>
                  </div>

                  <h2 className="
                    font-title text-3xl sm:text-5xl font-black leading-[1.05] tracking-tight
                    text-ink-dark dark:text-ink-main drop-shadow-lg
                  ">
                    {film.title}
                  </h2>

                  {film.tagline && (
                    <p className="
                      text-xs sm:text-sm italic mt-2
                      text-brand-goldDark dark:text-brand-goldLight
                    ">
                      "{film.tagline}"
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => onPlay(film.trailer || 'dQw4w9WgXcQ')}
                    className="
                      group flex items-center gap-2 px-6 py-3 rounded-full
                      bg-brand-gold hover:bg-brand-goldLight
                      text-night-base font-semibold text-sm
                      transition-all hover:scale-105 active:scale-95 cursor-pointer
                      shadow-[0_10px_30px_-8px_rgba(228,161,27,0.7)]
                    "
                  >
                    <Play className="w-4 h-4 fill-current group-hover:scale-110 transition-transform" />
                    Play Trailer
                  </button>

                  <button
                    onClick={toggle}
                    className={`
                      w-12 h-12 rounded-full grid place-items-center cursor-pointer
                      transition-all hover:scale-110 active:scale-95 border
                      ${picked
                        ? 'bg-brand-gold border-brand-gold text-night-base'
                        : 'bg-black/50 backdrop-blur-md border-white/20 text-white hover:bg-black/80'
                      }
                    `}
                    aria-label="Save"
                  >
                    {picked
                      ? <Check className="w-5 h-5" />
                      : <Plus className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            </div>

            <div className="
              flex items-center gap-1 px-6 sm:px-8 pt-6 border-b
              border-day-line dark:border-night-line
            ">
              {[
                { k: 'overview', l: 'Overview' },
                { k: 'cast', l: 'Cast' },
                { k: 'similar', l: 'Similar' },
              ].map(t => (
                <button
                  key={t.k}
                  onClick={() => setTab(t.k)}
                  className={`
                    relative px-4 py-3 text-xs font-semibold tracking-wide uppercase
                    transition-colors cursor-pointer
                    ${tab === t.k
                      ? 'text-brand-goldDark dark:text-brand-gold'
                      : 'text-ink-darkSoft dark:text-ink-muted hover:text-ink-dark dark:hover:text-ink-main'
                    }
                  `}
                >
                  {t.l}
                  {tab === t.k && (
                    <motion.span
                      layoutId="tab-underline"
                      className="absolute left-3 right-3 -bottom-px h-0.5 bg-brand-gold rounded-full"
                    />
                  )}
                </button>
              ))}
            </div>

            <div className="p-6 sm:p-8 max-h-[50vh] overflow-y-auto">
              <AnimatePresence mode="wait">

                {tab === 'overview' && (
                  <motion.div
                    key="overview"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-6"
                  >
                    <div className="
                      flex flex-wrap items-center gap-x-6 gap-y-3 text-xs
                      text-ink-darkSoft dark:text-ink-soft
                    ">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-brand-goldDark dark:text-brand-gold" />
                        {film.year}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-brand-forest dark:text-brand-forestLight" />
                        {minsToText(film.runtime)}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Star className="w-3.5 h-3.5 text-brand-gold fill-brand-gold" />
                        {(film.score || 0).toFixed(1)} / 10
                      </div>
                      <div className="text-ink-darkSoft dark:text-ink-muted">
                        Directed by <span className="text-ink-dark dark:text-ink-main font-medium">{film.studio}</span>
                      </div>
                    </div>

                    {film.tags?.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {film.tags.map(t => (
                          <span
                            key={t}
                            className="
                              px-3 py-1 rounded-full text-[11px] font-medium
                              bg-day-soft border border-day-line text-ink-darkSoft
                              dark:bg-night-card dark:border-night-line dark:text-ink-soft
                            "
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="space-y-2">
                      <h3 className="
                        text-xs uppercase tracking-[0.25em] font-bold
                        text-brand-goldDark dark:text-brand-gold
                      ">
                        Synopsis
                      </h3>
                      <p className="
                        text-sm sm:text-[15px] leading-relaxed
                        text-ink-darkSoft dark:text-ink-soft
                      ">
                        {film.blurb}
                      </p>
                    </div>
                  </motion.div>
                )}

                {tab === 'cast' && (
                  <motion.div
                    key="cast"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                  >
                    <CastStrip cast={film.cast} />
                  </motion.div>
                )}

                {tab === 'similar' && (
                  <motion.div
                    key="similar"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                  >
                    <AlsoLike items={alsoLike} onOpen={onOpen} onPlay={onPlay} />
                  </motion.div>
                )}

              </AnimatePresence>
            </div>

            <div className="
              px-6 sm:px-8 py-4 border-t flex items-center justify-between
              border-day-line bg-day-soft/50
              dark:border-night-line dark:bg-night-card/40
            ">
              <span className="text-[11px] text-ink-darkSoft dark:text-ink-muted">
                flix Archive — curated cinema
              </span>
              <button
                onClick={onClose}
                className="
                  flex items-center gap-1 text-xs font-semibold cursor-pointer
                  text-brand-goldDark dark:text-brand-gold
                  hover:text-brand-gold dark:hover:text-brand-goldLight
                "
              >
                Close
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  )
}