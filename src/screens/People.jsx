import React, { useState, useMemo } from 'react'
import PersonTile from '../ui/PersonTile.jsx'
import { Users } from 'lucide-react'

export default function People({ people = [], onOpen }) {
  const [role, setRole] = useState('All')

  const list = useMemo(() => {
    if (role === 'All') return people
    return people.filter(p =>
      (p.role || '').toLowerCase().includes(role.toLowerCase())
    )
  }, [people, role])

  return (
    <div className="max-w-7xl mx-auto px-6 pt-32 pb-16 space-y-8">
      <header className="space-y-1.5 border-b pb-5 border-day-line dark:border-night-line">
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-brand-forest dark:text-brand-forestLight" />
          <h1 className="font-title text-3xl sm:text-4xl font-bold text-ink-dark dark:text-ink-main">
            People
          </h1>
        </div>
        <p className="text-sm max-w-lg text-ink-darkSoft dark:text-ink-muted">
          The humans who make the movies — directors, actors, and everyone in between.
        </p>
      </header>

      <div className="flex items-center gap-2">
        {['All', 'Acting', 'Directing'].map(r => (
          <button
            key={r}
            onClick={() => setRole(r)}
            className={`
              px-4 py-2 rounded-full text-xs font-semibold tracking-wide cursor-pointer transition-all border
              ${role === r
                ? 'bg-brand-gold text-night-base border-brand-gold'
                : 'bg-day-card text-ink-darkSoft border-day-line hover:text-brand-goldDark dark:bg-night-card dark:text-ink-soft dark:border-night-line dark:hover:text-brand-gold'
              }
            `}
          >
            {r}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {list.map((p, i) => (
          <PersonTile key={p.id} person={p} i={i} onOpen={onOpen} />
        ))}
      </div>
    </div>
  )
}