import React from 'react'
import Tile from './Tile.jsx'
import { Film, Users, Tv, Sparkles } from 'lucide-react'

export default function SearchGrid({ results, filter, onOpen, onPerson, onPlay }) {
  const movies = (results.movies || []).filter(m => m.kind === 'movie')
  const shows = (results.movies || []).filter(m => m.kind === 'tv')
  const people = results.people || []

  const showMovies = (filter === 'all' || filter === 'movies') && movies.length > 0
  const showShows = (filter === 'all' || filter === 'shows') && shows.length > 0
  const showPeople = (filter === 'all' || filter === 'people') && people.length > 0

  const total = movies.length + shows.length + people.length

  if (total === 0) {
    return (
      <div className="text-center py-20 space-y-3">
        <Sparkles className="w-9 h-9 mx-auto opacity-40 text-ink-darkSoft dark:text-ink-muted" />
        <h3 className="font-title text-lg font-semibold text-ink-dark dark:text-ink-main">
          Nothing in the archive
        </h3>
        <p className="text-xs max-w-sm mx-auto text-ink-darkSoft dark:text-ink-muted">
          Try a director, actor, franchise, or a genre keyword.
        </p>
      </div>
    )
  }

  const Group = ({ title, icon: Icon, items }) => (
    <div className="space-y-4">
      <div className="flex items-center gap-2 pb-2 border-b border-day-line dark:border-night-line">
        <Icon className="w-4 h-4 text-brand-goldDark dark:text-brand-gold" />
        <h3 className="font-title text-base font-semibold text-ink-dark dark:text-ink-main">
          {title} <span className="font-normal text-ink-darkSoft dark:text-ink-muted">({items.length})</span>
        </h3>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {items.map((m, i) => (
          <Tile key={m.id} item={m} i={i} onOpen={onOpen} onPlay={onPlay} />
        ))}
      </div>
    </div>
  )

  return (
    <div className="space-y-10">
      {showMovies && <Group title="Films" icon={Film} items={movies} />}
      {showShows && <Group title="Series" icon={Tv} items={shows} />}
      {showPeople && (
        <div className="space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-day-line dark:border-night-line">
            <Users className="w-4 h-4 text-brand-forest dark:text-brand-forestLight" />
            <h3 className="font-title text-base font-semibold text-ink-dark dark:text-ink-main">
              People <span className="font-normal text-ink-darkSoft dark:text-ink-muted">({people.length})</span>
            </h3>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {people.map(p => (
              <div
                key={p.id}
                onClick={() => onPerson(p)}
                className="
                  group cursor-pointer rounded-2xl overflow-hidden transition-all
                  p-4 flex flex-col items-center text-center border
                  bg-day-card border-day-line hover:border-brand-gold/40
                  dark:bg-night-card dark:border-night-line
                "
              >
                <img
                  src={p.photo}
                  alt={p.name}
                  className="
                    w-24 h-24 rounded-full object-cover border-2 transition-colors
                    border-day-line group-hover:border-brand-gold
                    dark:border-night-line
                  "
                />
                <p className="mt-3 text-sm font-semibold text-ink-dark dark:text-ink-main">
                  {p.name}
                </p>
                <p className="text-[11px] mt-0.5 line-clamp-1 text-ink-darkSoft dark:text-ink-muted">
                  {p.known}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}