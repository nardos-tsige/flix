import React from 'react'
import { motion } from 'framer-motion'
import { useReveal } from '../hooks/useReveal.js'
import { useThemeCtx } from '../state/ThemeState.jsx'

export default function PersonTile({ person, i = 0, onOpen }) {
  const { isDark } = useThemeCtx()
  const [ref, shown] = useReveal()
  if (!person) return null

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 22 }}
      animate={shown ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, delay: (i % 8) * 0.05 }}
      onClick={() => onOpen(person)}
      className="
        group cursor-pointer rounded-2xl overflow-hidden flex flex-col
        transition-all duration-300
        bg-day-card border border-day-line
        dark:bg-night-card dark:border-night-line
        hover:border-brand-gold/40
      "
    >
      <div className="relative aspect-[3/4] overflow-hidden">
        <img
          src={person.photo}
          alt={person.name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-[1.05] transition-transform duration-700"
        />
        <div className="
          absolute inset-0 bg-gradient-to-t via-transparent to-transparent opacity-90
          from-day-card dark:from-night-card
        " />
        <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md border border-brand-gold/25 text-brand-gold text-[10px] font-semibold">
          {person.heat}
        </div>
        <div className="absolute bottom-2.5 left-3">
          <span className="text-[10px] uppercase tracking-wider text-white bg-black/60 px-2 py-0.5 rounded-md">
            {person.role}
          </span>
        </div>
      </div>

      <div className="p-3.5">
        <p className="text-sm font-semibold truncate text-ink-dark dark:text-ink-main">
          {person.name}
        </p>
        <p className="text-[11px] mt-0.5 truncate text-ink-darkSoft dark:text-ink-muted">
          {person.known}
        </p>
      </div>
    </motion.div>
  )
}