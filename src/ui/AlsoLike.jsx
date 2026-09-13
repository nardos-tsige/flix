import React from 'react'
import Tile from './Tile.jsx'
import RailScroller from './RailScroller.jsx'

export default function AlsoLike({ items = [], onOpen, onPlay }) {
  if (!items.length) return null
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-ink-dark dark:text-ink-main">
        You might also like
      </h3>
      <RailScroller>
        {items.map((m, i) => (
          <div key={m.id} className="w-32 shrink-0">
            <Tile item={m} i={i} onOpen={onOpen} onPlay={onPlay} />
          </div>
        ))}
      </RailScroller>
    </div>
  )
}