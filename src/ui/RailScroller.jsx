import React, { useRef, useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export default function RailScroller({ children, className = '' }) {
  const ref = useRef(null)
  const [left, setLeft] = useState(false)
  const [right, setRight] = useState(true)

  const check = () => {
    if (!ref.current) return
    const { scrollLeft, scrollWidth, clientWidth } = ref.current
    setLeft(scrollLeft > 8)
    setRight(scrollLeft < scrollWidth - clientWidth - 8)
  }

  useEffect(() => {
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [children])

  const nudge = (dir) => {
    if (!ref.current) return
    const step = dir === 'l' ? -ref.current.clientWidth * 0.8 : ref.current.clientWidth * 0.8
    ref.current.scrollBy({ left: step, behavior: 'smooth' })
    setTimeout(check, 320)
  }

  const btnClass = `
    absolute top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full
    flex items-center justify-center backdrop-blur-md
    opacity-0 group-hover:opacity-100 transition-all duration-300
    bg-day-card/90 border border-day-line text-ink-dark
    hover:bg-brand-gold hover:text-night-base hover:border-brand-gold
    dark:bg-night-card/90 dark:border-night-line dark:text-ink-main
    dark:hover:bg-brand-gold dark:hover:text-night-base
    cursor-pointer
  `

  return (
    <div className="relative group">
      {left && (
        <button
          onClick={() => nudge('l')}
          className={`${btnClass} left-0 -translate-x-2 sm:translate-x-0`}
          aria-label="scroll left"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
      )}

      <div
        ref={ref}
        onScroll={check}
        className={`flex gap-3 sm:gap-4 overflow-x-auto no-bar scroll-smooth px-1 py-3 ${className}`}
      >
        {children}
      </div>

      {right && (
        <button
          onClick={() => nudge('r')}
          className={`${btnClass} right-0 translate-x-2 sm:translate-x-0`}
          aria-label="scroll right"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      )}
    </div>
  )
}