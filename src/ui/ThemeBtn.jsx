import React from 'react'
import { Sun, Moon } from 'lucide-react'
import { useThemeCtx } from '../state/ThemeState.jsx'

export default function ThemeBtn() {
  const { isDark, flip } = useThemeCtx()

  return (
    <button
      onClick={flip}
      className="
        p-2 rounded-full transition-colors cursor-pointer
        text-brand-goldDark dark:text-brand-gold
        hover:text-brand-gold dark:hover:text-brand-goldLight
      "
      aria-label="Toggle theme"
    >
      {isDark ? <Sun className="w-[18px] h-[18px]" /> : <Moon className="w-[18px] h-[18px]" />}
    </button>
  )
}