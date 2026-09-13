import React from 'react'
import { motion } from 'framer-motion'
import { Bookmark, Play } from 'lucide-react'
import { useSaved } from '../state/SavedState.jsx'
import { useReveal } from '../hooks/useReveal.js'

export default function Tile({ item, i = 0, onOpen, onPlay }) {
  const { has, flip } = useSaved()
  const [ref, shown] = useReveal()

  if (!item) return null

  const picked = has(item.id)
  const score = (item.score || 0).toFixed(1)

  const onSave = (e) => {
    e.stopPropagation()
    flip(item)
  }

  const onPlayClick = (e) => {
    e.stopPropagation()
    if (onPlay) onPlay(item.trailer || 'dQw4w9WgXcQ')
    else onOpen(item)
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={shown ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, delay: (i % 10) * 0.04, ease: [0.2, 0.9, 0.3, 1] }}
      whileHover={{ y: -6 }}
      onClick={() => onOpen(item)}
      className="
        group relative cursor-pointer overflow-hidden rounded-2xl
        bg-day-card border border-day-line
        dark:bg-night-card dark:border-night-line
        transition-all duration-300
        hover:border-brand-gold/40
        hover:shadow-[0_18px_40px_-12px_rgba(228,161,27,0.35)]
      "
    >
      <div className="relative aspect-[2/3] w-full overflow-hidden">
        <img
          src={item.poster}
          alt={item.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.08]"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent opacity-70 group-hover:opacity-100 transition-opacity duration-400" />

        <div className="absolute top-3 left-3 flex items-center gap-1 px-2 py-1 rounded-full bg-black/60 backdrop-blur-md border border-brand-gold/25">
          <span className="text-brand-gold text-[11px]">★</span>
          <span className="text-white text-[11px] font-semibold">{score}</span>
        </div>

        <button
          onClick={onSave}
          className={`
            absolute top-3 right-3 p-2 rounded-full cursor-pointer
            backdrop-blur-md border transition-all
            ${picked
              ? 'bg-brand-gold border-brand-gold text-night-base'
              : 'bg-black/50 border-white/15 text-white/80 hover:text-white hover:bg-black/70'
            }
          `}
          aria-label="Save"
        >
          <Bookmark className={`w-3.5 h-3.5 ${picked ? 'fill-current' : ''}`} />
        </button>

        <div className="
          absolute inset-x-0 bottom-0 p-4
          opacity-0 translate-y-3
          group-hover:opacity-100 group-hover:translate-y-0
          transition-all duration-400
        ">
          <h3 className="text-white font-title font-semibold text-sm leading-tight line-clamp-1">
            {item.title}
          </h3>
          <p className="text-white/70 text-[11px] mt-1 line-clamp-2">
            {item.blurb}
          </p>
          <div className="flex items-center gap-2 mt-3">
            <button
              onClick={onPlayClick}
              className="
                flex-1 px-3 py-1.5 rounded-full cursor-pointer
                bg-brand-gold hover:bg-brand-goldLight
                text-night-base text-[11px] font-semibold
                flex items-center justify-center gap-1
                transition-all active:scale-95
              "
            >
              <Play className="w-3 h-3 fill-current" />
              Watch
            </button>
            <span className="text-white/60 text-[10px]">{item.year}</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}