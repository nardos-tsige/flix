import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Award, MapPin, Calendar } from 'lucide-react'

export default function PersonPanel({ person, onClose, onOpen }) {
  if (!person) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[55] grid place-items-center p-4 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-md cursor-pointer"
        />

        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          className="
            relative z-10 w-full max-w-3xl my-auto rounded-3xl overflow-hidden
            p-6 sm:p-8 space-y-6 shadow-2xl
            bg-day-card border border-day-line
            dark:bg-night-soft dark:border-night-line
          "
        >
          <button
            onClick={onClose}
            className="
              absolute top-4 right-4 p-2 rounded-full cursor-pointer transition-colors
              bg-black/40 text-white hover:bg-black/70
            "
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
            <img
              src={person.photo}
              alt={person.name}
              className="w-32 h-32 sm:w-40 sm:h-40 rounded-2xl object-cover border-2 border-brand-gold/60 shadow-2xl shrink-0"
            />
            <div className="space-y-2">
              <span className="
                inline-block px-3 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-widest
                bg-brand-gold/15 text-brand-goldDark border border-brand-gold/30
                dark:text-brand-gold
              ">
                {person.role}
              </span>
              <h2 className="font-title text-3xl font-bold text-ink-dark dark:text-ink-main">
                {person.name}
              </h2>
              <div className="space-y-1 text-xs text-ink-darkSoft dark:text-ink-muted">
                {person.birthday && (
                  <p className="flex items-center justify-center sm:justify-start gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-brand-goldDark dark:text-brand-gold" />
                    {person.birthday}
                  </p>
                )}
                {person.from && (
                  <p className="flex items-center justify-center sm:justify-start gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-brand-forest dark:text-brand-forestLight" />
                    {person.from}
                  </p>
                )}
              </div>
            </div>
          </div>

          {person.heat > 0 && (
            <div className="
              flex items-center gap-2.5 p-3.5 rounded-xl text-xs border
              bg-brand-gold/10 border-brand-gold/20 text-brand-goldDark
              dark:text-brand-gold
            ">
              <Award className="w-4 h-4 shrink-0" />
              <span><strong>Popularity:</strong> {person.heat}%</span>
            </div>
          )}

          <div className="space-y-2">
            <h3 className="text-xs uppercase tracking-widest font-semibold text-ink-darkSoft dark:text-ink-soft">
              Biography
            </h3>
            <p className="text-sm leading-relaxed text-ink-darkSoft dark:text-ink-soft">
              {person.bio}
            </p>
          </div>

          {person.credits?.length > 0 && (
            <div className="space-y-3 pt-3 border-t border-day-line dark:border-night-line">
              <h3 className="text-xs uppercase tracking-widest font-semibold text-ink-darkSoft dark:text-ink-soft">
                Selected Work
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {person.credits.map(c => (
                  <div
                    key={c.id}
                    onClick={() => {
                      onClose()
                      onOpen({ id: c.id })
                    }}
                    className="
                      flex items-center gap-2 p-2 rounded-xl cursor-pointer transition-all border
                      bg-day-soft border-day-line hover:border-brand-gold
                      dark:bg-night-card dark:border-night-line dark:hover:border-brand-gold
                    "
                  >
                    <img
                      src={c.poster}
                      alt={c.title}
                      className="w-10 h-14 rounded-md object-cover shrink-0"
                    />
                    <div className="min-w-0">
                      <p className="text-xs font-semibold truncate text-ink-dark dark:text-ink-main">
                        {c.title}
                      </p>
                      <p className="text-[10px] text-ink-darkSoft dark:text-ink-muted">{c.year}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  )
}