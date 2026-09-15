import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Search, Bookmark, Menu, X, Home, Film, Tv, Users } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSaved } from '../state/SavedState.jsx'
import { useThemeCtx } from '../state/ThemeState.jsx'
import ThemeBtn from './ThemeBtn.jsx'
import Brand from './Brand.jsx'

const links = [
  { key: 'landing', label: 'Home', path: '/', icon: Home },
  { key: 'films', label: 'Films', path: '/films', icon: Film },
  { key: 'shows', label: 'Series', path: '/shows', icon: Tv },
  { key: 'people', label: 'People', path: '/people', icon: Users },
]

export default function TopBar({ onGo }) {
  const { saved } = useSaved()
  const { isDark } = useThemeCtx()
  const loc = useLocation()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setOpen(false) }, [loc.pathname])

  const go = (k) => {
    onGo(k)
    setOpen(false)
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div
        className={`
          relative transition-all duration-500
          ${scrolled ? 'backdrop-blur-2xl' : 'backdrop-blur-xl'}
        `}
        style={{
          background: isDark
            ? scrolled
              ? 'linear-gradient(to bottom, rgba(10,10,10,0.85) 0%, rgba(10,10,10,0.55) 60%, rgba(10,10,10,0) 100%)'
              : 'linear-gradient(to bottom, rgba(10,10,10,0.75) 0%, rgba(10,10,10,0.35) 60%, rgba(10,10,10,0) 100%)'
            : scrolled
              ? 'linear-gradient(to bottom, rgba(250,250,250,0.92) 0%, rgba(250,250,250,0.7) 60%, rgba(250,250,250,0) 100%)'
              : 'linear-gradient(to bottom, rgba(250,250,250,0.85) 0%, rgba(250,250,250,0.5) 60%, rgba(250,250,250,0) 100%)',
        }}
      >
        <div className="
          absolute top-0 inset-x-0 h-px
          bg-gradient-to-r from-transparent via-day-line/40 to-transparent
          dark:via-night-line/50
        " />

        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4 h-16 sm:h-20">

            <button
              onClick={() => go('landing')}
              className="cursor-pointer shrink-0 transition-transform hover:scale-[1.02] active:scale-95"
              title="flix — Stream. Discover. Repeat."
            >
              <Brand size="md" tone={isDark ? 'gold' : 'light'} />
            </button>

            <nav className="hidden md:flex items-center gap-1.5">
              {links.map(item => {
                const Icon = item.icon
                const active = loc.pathname === item.path
                return (
                  <button
                    key={item.key}
                    onClick={() => go(item.key)}
                    className={`
                      group flex items-center gap-2.5 px-3 py-1.5 rounded-full
                      transition-all duration-300 cursor-pointer
                      ${active
                        ? 'bg-brand-gold/12'
                        : 'hover:bg-black/[0.04] dark:hover:bg-white/[0.05]'
                      }
                    `}
                  >
                    <span className={`
                      relative grid place-items-center w-8 h-8 rounded-full
                      border transition-all duration-300
                      ${active
                        ? 'bg-brand-gold border-brand-gold text-night-base shadow-[0_0_0_4px_rgba(250,250,250,0.08)]'
                        : 'bg-transparent border-day-line/70 text-ink-darkSoft group-hover:border-brand-gold/60 dark:border-night-line/70 dark:text-ink-soft dark:group-hover:border-brand-gold/60'
                      }
                    `}>
                      <Icon className="w-3.5 h-3.5" />
                    </span>

                    <span className={`
                      text-sm font-medium transition-colors
                      ${active
                        ? 'text-brand-goldDark dark:text-brand-gold font-semibold'
                        : 'text-ink-darkSoft group-hover:text-ink-dark dark:text-ink-soft dark:group-hover:text-ink-main'
                      }
                    `}>
                      {item.label}
                    </span>
                  </button>
                )
              })}
            </nav>

            <div className="flex items-center gap-1.5 sm:gap-2">
              <button
                onClick={() => go('find')}
                aria-label="Search"
                className="group grid place-items-center w-9 h-9 rounded-full border border-day-line/70 dark:border-night-line/70 transition-all cursor-pointer hover:border-brand-gold/60 dark:hover:border-brand-gold/60"
              >
                <Search className="w-[15px] h-[15px] text-ink-darkSoft group-hover:text-brand-goldDark dark:text-ink-soft dark:group-hover:text-brand-gold transition-colors" />
              </button>

              <button
                onClick={() => go('saved')}
                aria-label="Saved"
                className="group relative grid place-items-center w-9 h-9 rounded-full border border-day-line/70 dark:border-night-line/70 transition-all cursor-pointer hover:border-brand-gold/60 dark:hover:border-brand-gold/60"
              >
                <Bookmark className="w-[15px] h-[15px] text-ink-darkSoft group-hover:text-brand-goldDark dark:text-ink-soft dark:group-hover:text-brand-gold transition-colors" />
                {saved.length > 0 && (
                  <span className="
                    absolute -top-0.5 -right-0.5 min-w-[16px] h-[16px] px-1
                    rounded-full bg-brand-gold text-night-base
                    text-[9px] font-bold grid place-items-center
                    ring-2 ring-day-base dark:ring-night-base
                  ">
                    {saved.length > 9 ? '9+' : saved.length}
                  </span>
                )}
              </button>

              <ThemeBtn />

              <button
                onClick={() => setOpen(v => !v)}
                aria-label="Menu"
                className="md:hidden grid place-items-center w-9 h-9 rounded-full border border-day-line/70 dark:border-night-line/70 cursor-pointer hover:border-brand-gold/60 dark:hover:border-brand-gold/60 transition-colors"
              >
                {open
                  ? <X className="w-[15px] h-[15px] text-ink-dark dark:text-ink-main" />
                  : <Menu className="w-[15px] h-[15px] text-ink-dark dark:text-ink-main" />
                }
              </button>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22 }}
            className="
              md:hidden backdrop-blur-2xl
              bg-day-card/90 dark:bg-night-card/90
            "
            style={{
              background: isDark
                ? 'linear-gradient(to bottom, rgba(20,20,20,0.95) 0%, rgba(20,20,20,0.75) 100%)'
                : 'linear-gradient(to bottom, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.75) 100%)',
            }}
          >
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-4 space-y-1">
              {links.map(item => {
                const Icon = item.icon
                const active = loc.pathname === item.path
                return (
                  <button
                    key={item.key}
                    onClick={() => go(item.key)}
                    className={`
                      w-full flex items-center gap-3 px-3 py-2.5 rounded-xl
                      text-sm font-medium transition-colors cursor-pointer
                      ${active
                        ? 'bg-brand-gold/12 text-brand-goldDark dark:text-brand-gold font-semibold'
                        : 'text-ink-darkSoft dark:text-ink-soft hover:bg-black/[0.04] dark:hover:bg-white/[0.04]'
                      }
                    `}
                  >
                    <span className={`
                      grid place-items-center w-7 h-7 rounded-full border transition-all
                      ${active
                        ? 'bg-brand-gold border-brand-gold text-night-base'
                        : 'border-day-line/70 dark:border-night-line/70 text-ink-darkSoft dark:text-ink-soft'
                      }
                    `}>
                      <Icon className="w-3.5 h-3.5" />
                    </span>
                    {item.label}
                  </button>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}