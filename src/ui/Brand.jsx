import React from 'react'

export default function Brand({ size = 'md', tone = 'gold' }) {
  const sizeMap = {
    sm: 'text-xl',
    md: 'text-2xl',
    lg: 'text-4xl',
    xl: 'text-5xl',
  }

  const toneMap = {
    gold: 'text-brand-gold',
    light: 'text-brand-goldDark',
    white: 'text-white',
  }

  return (
    <span
      className={`
        brand-italic ${sizeMap[size] || sizeMap.md} ${toneMap[tone] || toneMap.gold}
        leading-none select-none
        drop-shadow-[0_0_18px_rgba(228,161,27,0.25)]
      `}
    >
      flix
    </span>
  )
}