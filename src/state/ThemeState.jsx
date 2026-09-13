import React, { createContext, useContext, useState, useEffect } from 'react'

const ThemeCtx = createContext()

export const ThemeState = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    const cached = localStorage.getItem('flix:theme')
    if (cached) return cached
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  })

  useEffect(() => {
    const root = document.documentElement
    if (theme === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
    localStorage.setItem('flix:theme', theme)
  }, [theme])

  const flip = () => setTheme(theme === 'dark' ? 'light' : 'dark')

  return (
    <ThemeCtx.Provider value={{ theme, isDark: theme === 'dark', flip, setTheme }}>
      {children}
    </ThemeCtx.Provider>
  )
}

export const useThemeCtx = () => {
  const ctx = useContext(ThemeCtx)
  if (!ctx) throw new Error('useThemeCtx must be inside ThemeState')
  return ctx
}