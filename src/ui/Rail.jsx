import React from 'react'
import { ChevronRight } from 'lucide-react'
import Tile from './Tile.jsx'
import RailScroller from './RailScroller.jsx'

export default function Rail({ heading, subtitle, items = [], onOpen, onPlay, onMore }) {
  if (!items.length) return null

  return (
    <section className="space-y-3">
      <div className="flex items-end justify-between px-1">
        <div>
          <h2 className="font-title text-lg sm:text-2xl font-semibold text-ink-dark dark:text-ink-main">
            {heading}
          </h2>
          {subtitle && (
            <p className="text-xs mt-1 text-ink-darkSoft dark:text-ink-muted">
              {subtitle}
            </p>
          )}
        </div>
        {onMore && (
          <button
            onClick={onMore}
            className="group flex items-center gap-1 text-xs font-semibold text-brand-goldDark dark:text-brand-gold hover:text-brand-gold dark:hover:text-brand-goldLight cursor-pointer"
          >
            See all
            <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        )}
      </div>

      <RailScroller>
        {items.map((item, idx) => (
          <div key={item.id} className="w-[150px] sm:w-[180px] md:w-[200px] shrink-0">
            <Tile item={item} i={idx} onOpen={onOpen} onPlay={onPlay} />
          </div>
        ))}
      </RailScroller>
    </section>
  )
}