import { useEffect, useRef, useState } from 'react'

export const useReveal = (opts = {}) => {
  const { threshold = 0.12, once = true } = opts
  const ref = useRef(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setShown(true)
        if (once) io.unobserve(el)
      } else if (!once) {
        setShown(false)
      }
    }, { threshold, rootMargin: '0px 0px -40px 0px' })

    io.observe(el)
    return () => io.unobserve(el)
  }, [threshold, once])

  return [ref, shown]
}