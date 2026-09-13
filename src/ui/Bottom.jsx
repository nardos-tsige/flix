import React from 'react'
import { Instagram, Twitter, Youtube, Facebook, Globe } from 'lucide-react'
import Brand from './Brand.jsx'
import { useThemeCtx } from '../state/ThemeState.jsx'

const columns = [
  {
    title: 'Browse',
    links: ['Home', 'Films', 'Series', 'People', 'New & Popular', 'My List'],
  },
  {
    title: 'Categories',
    links: ['Action', 'Drama', 'Sci-Fi', 'Thriller', 'Documentary', 'Animation'],
  },
  {
    title: 'Company',
    links: ['About flix', 'Careers', 'Press Room', 'Investor Relations', 'Contact Us'],
  },
  {
    title: 'Support',
    links: ['Help Center', 'Account', 'Privacy Policy', 'Terms of Service', 'Cookie Preferences'],
  },
]

const socials = [
  { icon: Instagram, label: 'Instagram' },
  { icon: Twitter, label: 'Twitter' },
  { icon: Youtube, label: 'YouTube' },
  { icon: Facebook, label: 'Facebook' },
]

export default function Bottom({ onGo }) {
  const { isDark } = useThemeCtx()

  const fake = (e) => e.preventDefault()

  return (
    <footer className="
      mt-24 transition-colors duration-300
      bg-day-soft border-t border-day-line
      dark:bg-night-base dark:border-night-line
    ">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-14 sm:py-16">
        <div className="
          flex flex-col lg:flex-row lg:items-start lg:justify-between gap-10
          pb-10 mb-10 border-b border-day-line dark:border-night-line
        ">
          <div className="max-w-md space-y-3">
            <Brand size="lg" tone={isDark ? 'gold' : 'light'} />
            <p className="text-sm leading-relaxed text-ink-darkSoft dark:text-ink-soft">
              An editorial cinema archive. Thousands of films and series,
              hand-curated for the curious viewer. Stream. Discover. Repeat.
            </p>
          </div>

          <div className="w-full lg:w-auto lg:min-w-[340px] space-y-3">
            <h4 className="
              text-xs uppercase tracking-[0.25em] font-semibold
              text-ink-dark dark:text-ink-main
            ">
              Join the newsletter
            </h4>
            <p className="text-xs text-ink-darkSoft dark:text-ink-muted">
              Weekly picks, festival coverage, and new releases.
            </p>

            <form onSubmit={fake} className="
              flex items-center gap-2 rounded-full p-1 border
              bg-day-card border-day-line
              dark:bg-night-card dark:border-night-line
            ">
              <input
                type="email"
                placeholder="you@example.com"
                className="
                  flex-1 bg-transparent border-0 outline-none px-4 py-2 text-sm
                  text-ink-dark placeholder:text-ink-darkSoft
                  dark:text-ink-main dark:placeholder:text-ink-muted
                "
              />
              <button
                type="submit"
                className="
                  px-5 py-2 rounded-full text-xs font-semibold
                  bg-brand-gold text-night-base
                  hover:bg-brand-goldLight active:scale-95
                  transition-all cursor-pointer
                "
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-10">
          {columns.map((col) => (
            <div key={col.title} className="space-y-4">
              <h5 className="
                text-[11px] uppercase tracking-[0.25em] font-bold
                text-brand-goldDark dark:text-brand-gold
              ">
                {col.title}
              </h5>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link}>
                    <button
                      onClick={fake}
                      className="
                        text-xs transition-colors cursor-pointer text-left
                        text-ink-darkSoft hover:text-ink-dark
                        dark:text-ink-muted dark:hover:text-ink-main
                      "
                    >
                      {link}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="
          mt-12 pt-8 border-t
          flex flex-col sm:flex-row items-center justify-between gap-6
          border-day-line dark:border-night-line
        ">
          <div className="flex items-center gap-3">
            {socials.map((s) => {
              const Icon = s.icon
              return (
                <button
                  key={s.label}
                  onClick={fake}
                  aria-label={s.label}
                  className="
                    w-9 h-9 rounded-full grid place-items-center transition-all cursor-pointer border
                    text-ink-darkSoft border-day-line hover:text-brand-goldDark hover:border-brand-goldDark
                    dark:text-ink-muted dark:border-night-line dark:hover:text-brand-gold dark:hover:border-brand-gold
                  "
                >
                  <Icon className="w-4 h-4" />
                </button>
              )
            })}
          </div>

          <button
            onClick={fake}
            className="
              flex items-center gap-2 text-xs px-3 py-1.5 rounded-full border cursor-pointer transition-colors
              text-ink-darkSoft border-day-line hover:text-brand-goldDark hover:border-brand-goldDark
              dark:text-ink-muted dark:border-night-line dark:hover:text-brand-gold dark:hover:border-brand-gold
            "
          >
            <Globe className="w-3.5 h-3.5" />
            English (US)
          </button>
        </div>
      </div>

      <div className="
        border-t border-day-line dark:border-night-line
        bg-day-base dark:bg-night-base
      ">
        <div className="
          max-w-7xl mx-auto px-6 lg:px-10 py-6
          flex flex-col sm:flex-row items-center justify-between gap-4
        ">
          <p className="text-[11px] text-center sm:text-left text-ink-darkSoft dark:text-ink-muted">
            © {new Date().getFullYear()} flix Archive. All rights reserved. A fictional streaming experience.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            {['Privacy', 'Terms', 'Cookies', 'Legal', 'Sitemap'].map((item) => (
              <button
                key={item}
                onClick={fake}
                className="
                  text-[11px] transition-colors cursor-pointer
                  text-ink-darkSoft hover:text-ink-dark
                  dark:text-ink-muted dark:hover:text-ink-main
                "
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}