import React, { createContext, useContext, useState, useEffect } from 'react'

const SavedCtx = createContext()

export const SavedState = ({ children }) => {
  const [saved, setSaved] = useState(() => {
    try {
      const raw = localStorage.getItem('flix:saved')
      if (!raw) return []
      const list = JSON.parse(raw)
      return Array.isArray(list) ? list.filter(x => x && x.id) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    const clean = saved.filter(x => x && x.id)
    localStorage.setItem('flix:saved', JSON.stringify(clean))
  }, [saved])

  const has = (id) => {
    if (!id) return false
    return saved.some(x => x && x.id === id)
  }

  const push = (item) => {
    if (!item || !item.id) return false
    if (has(item.id)) return false
    setSaved(prev => [item, ...prev.filter(x => x && x.id)])
    return true
  }

  const pull = (id) => {
    if (!id) return false
    setSaved(prev => prev.filter(x => x && x.id !== id))
    return true
  }

  const flip = (item) => {
    if (!item || !item.id) return false
    if (has(item.id)) {
      pull(item.id)
      return false
    }
    push(item)
    return true
  }

  const wipe = () => setSaved([])

  return (
    <SavedCtx.Provider value={{ saved, has, push, pull, flip, wipe }}>
      {children}
    </SavedCtx.Provider>
  )
}

export const useSaved = () => {
  const ctx = useContext(SavedCtx)
  if (!ctx) throw new Error('useSaved must be inside SavedState')
  return ctx
}