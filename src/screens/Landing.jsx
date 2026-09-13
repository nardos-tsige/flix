import React, { useState } from 'react'
import Featured from '../ui/Featured.jsx'
import Rail from '../ui/Rail.jsx'
import PersonTile from '../ui/PersonTile.jsx'
import RailScroller from '../ui/RailScroller.jsx'
import Tile from '../ui/Tile.jsx'
import { Filter, Users } from 'lucide-react'
import { GENRES } from '../helpers/content.js'

export default function Landing({
  trending, topRated, movies, shows, people,
  onOpen, onPlay, onGo, onPerson,
}) {
  const [tag, setTag] = useState('All')

  const featuredPool = trending.slice(0, 4)

  const filteredMovies = tag === 'All'
    ? movies
    : movies.filter(m => m.tags.includes(tag))

  return (
    <div className="space-y-14 pb-16">
      <Featured films={featuredPool} onOpen={onOpen} onPlay={onPlay} />

      <div className="max-w-7xl mx-auto px-6 space-y-14">
        <Rail
          heading="Trending This Week"
          subtitle="Films catching fire across the world right now"
          items={trending}
          onOpen={onOpen}
          onPlay={onPlay}
          onMore={() => onGo('films')}
        />

        <Rail
          heading="Critics' Circle"
          subtitle="Award-season darlings and festival standouts"
          items={topRated}
          onOpen={onOpen}
          onPlay={onPlay}
          onMore={() => onGo('films')}
        />

        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="font-title text-lg sm:text-2xl font-semibold flex items-center gap-2 text-ink-dark dark:text-ink-main">
                <Filter className="w-4 h-4 text-brand-goldDark dark:text-brand-gold" />
                Browse by Mood
              </h2>
              <p className="text-xs mt-0.5 text-ink-darkSoft dark:text-ink-muted">
                Pick a genre and see what surfaces
              </p>
            </div>
            <div className="flex items-center gap-2 overflow-x-auto no-bar py-1">
              {GENRES.map(g => (
                <button
                  key={g}
                  onClick={() => setTag(g)}
                  className={`
                    px-3.5 py-1.5 rounded-full text-xs font-medium tracking-wide
                    whitespace-nowrap cursor-pointer transition-all border
                    ${tag === g
                      ? 'bg-brand-gold text-night-base font-semibold border-brand-gold'
                      : 'bg-day-card text-ink-darkSoft border-day-line hover:text-brand-goldDark hover:border-brand-gold/40 dark:bg-night-card dark:text-ink-soft dark:border-night-line dark:hover:text-brand-gold'
                    }
                  `}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>

          <RailScroller>
            {filteredMovies.slice(0, 10).map((m, i) => (
              <div key={m.id} className="w-[150px] sm:w-[180px] shrink-0">
                <Tile item={m} i={i} onOpen={onOpen} onPlay={onPlay} />
              </div>
            ))}
          </RailScroller>
        </div>

        <Rail
          heading="Long-form Series"
          subtitle="Episodic storytelling with cinematic weight"
          items={shows}
          onOpen={onOpen}
          onPlay={onPlay}
          onMore={() => onGo('shows')}
        />

        <Rail
          heading="All-Time Greats"
          subtitle="The canon — films that shaped the medium"
          items={topRated}
          onOpen={onOpen}
          onPlay={onPlay}
        />

        <div className="space-y-4">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="font-title text-lg sm:text-2xl font-semibold flex items-center gap-2 text-ink-dark dark:text-ink-main">
                <Users className="w-4 h-4 text-brand-forest dark:text-brand-forestLight" />
                Faces We Follow
              </h2>
              <p className="text-xs mt-0.5 text-ink-darkSoft dark:text-ink-muted">
                Directors and performers worth tracking
              </p>
            </div>
            <button
              onClick={() => onGo('people')}
              className="text-xs font-semibold text-brand-goldDark dark:text-brand-gold hover:text-brand-gold dark:hover:text-brand-goldLight cursor-pointer"
            >
              All people →
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {people.slice(0, 6).map((p, i) => (
              <PersonTile key={p.id} person={p} i={i} onOpen={onPerson} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}