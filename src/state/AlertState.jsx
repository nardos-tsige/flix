import React, { createContext, useContext, useState, useCallback } from 'react'

const AlertCtx = createContext()

export const AlertState = ({ children }) => {
  const [items, setItems] = useState([])

  const ping = useCallback((msg, kind = 'info', ttl = 2800) => {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`
    setItems(prev => [...prev, { id, msg, kind }])
    setTimeout(() => {
      setItems(prev => prev.filter(x => x.id !== id))
    }, ttl)
  }, [])

  const drop = useCallback((id) => {
    setItems(prev => prev.filter(x => x.id !== id))
  }, [])

  return (
    <AlertCtx.Provider value={{ items, ping, drop }}>
      {children}
    </AlertCtx.Provider>
  )
}

export const useAlert = () => {
  const ctx = useContext(AlertCtx)
  if (!ctx) throw new Error('useAlert must be inside AlertState')
  return ctx
}