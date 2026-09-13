import React from 'react'
import { Home, Sparkles } from 'lucide-react'

export default function Missing({ onGo }) {
  return (
    <div className="min-h-[70vh] grid place-items-center px-6">
      <div className="text-center space-y-5 max-w-md">
        <div className="relative mx-auto w-24 h-24">
          <div className="absolute inset-0 rounded-full bg-brand-gold/10 animate-softly" />
          <div className="
            relative w-full h-full grid place-items-center font-title text-5xl
            text-brand-goldDark dark:text-brand-gold
          ">
            ?
          </div>
        </div>

        <h1 className="font-title text-5xl font-bold text-ink-dark dark:text-ink-main">404</h1>
        <h2 className="font-title text-xl font-semibold text-ink-dark dark:text-ink-main">
          Scene not found
        </h2>
        <p className="text-sm leading-relaxed text-ink-darkSoft dark:text-ink-muted">
          That page seems to have been cut from the final edit. Try heading back to the archive.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-3">
          <button
            onClick={() => onGo('landing')}
            className="
              flex items-center gap-2 px-6 py-2.5 rounded-full
              bg-brand-gold text-night-base text-xs font-semibold uppercase tracking-wider
              cursor-pointer hover:scale-105 active:scale-95 transition-all
            "
          >
            <Home className="w-4 h-4" />
            Back to home
          </button>
          <button
            onClick={() => onGo('find')}
            className="
              flex items-center gap-2 px-6 py-2.5 rounded-full cursor-pointer transition-colors border
              bg-day-card border-day-line text-ink-darkSoft hover:text-ink-dark
              dark:bg-night-card dark:border-night-line dark:text-ink-soft dark:hover:text-ink-main
              text-xs font-semibold uppercase tracking-wider
            "
          >
            <Sparkles className="w-4 h-4" />
            Search the archive
          </button>
        </div>
      </div>
    </div>
  )
}