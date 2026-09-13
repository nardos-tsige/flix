import React from 'react'

export default function Spinner({ label = '' }) {
  return (
    <div className="flex flex-col items-center gap-4 py-8">
      <div className="relative w-14 h-14">
        <span className="absolute inset-0 rounded-full border-2 border-brand-gold/20" />
        <span className="absolute inset-0 rounded-full border-2 border-transparent border-t-brand-gold animate-spin" />
      </div>
      {label && (
        <p className="text-xs tracking-[0.3em] uppercase text-ink-darkSoft dark:text-ink-muted">{label}</p>
      )}
    </div>
  )
}