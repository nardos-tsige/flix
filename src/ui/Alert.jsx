import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, AlertTriangle, Info, X } from 'lucide-react'
import { useAlert } from '../state/AlertState.jsx'

const iconFor = (kind) => {
  if (kind === 'ok') return <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
  if (kind === 'warn') return <AlertTriangle className="w-4 h-4 text-brand-clay" />
  return <Info className="w-4 h-4 text-brand-goldDark dark:text-brand-gold" />
}

export default function Alert() {
  const { items, drop } = useAlert()

  if (!items.length) return null

  return (
    <div className="fixed bottom-6 right-6 z-[60] flex flex-col gap-2 max-w-xs w-full">
      <AnimatePresence>
        {items.map(t => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 40 }}
            transition={{ duration: 0.22 }}
            className="
              flex items-center gap-2.5 px-4 py-3 rounded-xl
              bg-day-card border border-day-line text-ink-dark
              dark:bg-night-card dark:border-night-line dark:text-ink-main
              shadow-lg text-[13px]
            "
          >
            {iconFor(t.kind)}
            <span className="flex-1">{t.msg}</span>
            <button
              onClick={() => drop(t.id)}
              className="text-ink-muted hover:text-ink-dark dark:hover:text-ink-main cursor-pointer"
              aria-label="close"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}