import { useState, useEffect } from 'react'

export const useTypeDelay = (value, ms = 260) => {
  const [out, setOut] = useState(value)

  useEffect(() => {
    const t = setTimeout(() => setOut(value), ms)
    return () => clearTimeout(t)
  }, [value, ms])

  return out
}