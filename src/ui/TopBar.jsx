import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Search, Bookmark, Menu, X } from 'lucide-react'
import { useSaved } from '../state/SavedState.jsx'
import { useThemeCtx } from '../state/ThemeState.jsx'
import ThemeBtn from './ThemeBtn.jsx'
import Brand from './Brand.jsx'

const links = [
  { key: 'landing', label: 'Home', path: '/' },
  { key: 'films', label: 'Films', path: '/films' },
  { key: 'shows', label: 'Series', path: '/shows' },
  { key: 'people', label: 'People', path: '/people' },
]

export default function TopBar({ onGo }) {
  const { saved } = useSaved()
  const { isDark } = useThemeCtx()
  const loc = useLocation()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    setOpen(false)
  }, [loc.pathname])

  const go = (k) => {
    onGo(k)
    setOpen(false)
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
      <div className="mx-auto w-full max-w-[1180px] px-4 sm:px-6 pointer-events-none">
        <nav
          className="pointer-events-auto mt-4 flex items-center justify-between gap-3 h-14 px-2 sm:px-4"
          aria-label="Primary"
        >
          <button
            onClick={() => go('landing')}
            className="pointer-events-auto cursor-pointer shrink-0"
            title="flix — Stream. Discover. Repeat."
          >
            <Brand size="md" tone={isDark ? 'gold' : 'light'} />
          </button>

          <div className="hidden md:flex items-center gap-0.5 pointer-events-auto">
            {links.map(item => {
              const active = loc.pathname === item.path
              return (
                <button
                  key={item.key}
                  onClick={() => go(item.key)}
                  className={`
                    relative px-3.5 py-2 text-[13px] font-medium tracking-wide
                    transition-colors cursor-pointer
                    ${active
                      ? 'text-brand-goldDark dark:text-brand-gold'
                      : 'text-ink-darkSoft dark:text-ink-soft hover:text-brand-goldDark dark:hover:text-brand-goldLight'
                    }
                  `}
                >
                  {item.label}
                  {active && (
                    <span className="absolute left-1/2 -translate-x-1/2 -bottom-0.5 w-6 h-px bg-brand-gold" />
                  )}
                </button>
              )
            })}
          </div>

          <div className="flex items-center gap-1 pointer-events-auto">
            <button
              onClick={() => go('find')}
              className="
                p-2 rounded-full transition-colors cursor-pointer
                text-ink-darkSoft dark:text-ink-soft
                hover:text-brand-goldDark dark:hover:text-brand-gold
              "
              aria-label="Search"
            >
              <Search className="w-[18px] h-[18px]" />
            </button>

            <button
              onClick={() => go('saved')}
              className="
                relative p-2 rounded-full transition-colors cursor-pointer
                text-ink-darkSoft dark:text-ink-soft
                hover:text-brand-goldDark dark:hover:text-brand-gold
              "
              aria-label="Saved"
            >
              <Bookmark className="w-[18px] h-[18px]" />
              {saved.length > 0 && (
                <span className="absolute top-1 right-0.5 w-2 h-2 rounded-full bg-brand-gold" />
              )}
            </button>

            <ThemeBtn />

            <button
              onClick={() => setOpen(!open)}
              className="
                md:hidden p-2 rounded-full cursor-pointer
                text-ink-dark dark:text-ink-main
              "
              aria-label="Menu"
            >
              {open ? <X className="w-[18px] h-[18px]" /> : <Menu className="w-[18px] h-[18px]" />}
            </button>
          </div>
        </nav>

        {open && (
          <div className="
            md:hidden pointer-events-auto mt-2 rounded-2xl border p-2
            animate-glideIn
            bg-day-card/95 border-day-line backdrop-blur-xl
            dark:bg-night-soft/95 dark:border-night-line
          ">
            {links.map(item => {
              const active = loc.pathname === item.path
              return (
                <button
                  key={item.key}
                  onClick={() => go(item.key)}
                  className={`
                    w-full text-left px-4 py-3 text-sm rounded-xl cursor-pointer
                    ${active
                      ? 'bg-brand-gold/10 text-brand-goldDark dark:text-brand-gold font-semibold'
                      : 'text-ink-darkSoft dark:text-ink-soft hover:bg-black/[0.03] dark:hover:bg-white/[0.04]'
                    }
                  `}
                >
                  {item.label}
                </button>
              )
            })}
          </div>
        )}
      </div>
    </header>
  )
}