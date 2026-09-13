import React from 'react'

export default function CastStrip({ cast = [] }) {
  if (!cast.length) return null
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-ink-dark dark:text-ink-main">Cast</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {cast.map(c => (
          <div
            key={c.id}
            className="
              flex items-center gap-2.5 p-2.5 rounded-xl border
              bg-day-soft border-day-line
              dark:bg-night-card dark:border-night-line
            "
          >
            <img
              src={c.photo}
              alt={c.name}
              loading="lazy"
              className="w-11 h-11 rounded-full object-cover border shrink-0 border-day-line dark:border-night-line"
            />
            <div className="min-w-0">
              <p className="text-xs font-semibold truncate text-ink-dark dark:text-ink-main">
                {c.name}
              </p>
              <p className="text-[11px] truncate text-ink-darkSoft dark:text-ink-muted">
                {c.role}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}