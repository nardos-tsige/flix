export const minsToText = (m) => {
  if (!m) return '—'
  const h = Math.floor(m / 60)
  const r = m % 60
  if (h === 0) return `${r}m`
  if (r === 0) return `${h}h`
  return `${h}h ${r}m`
}

export const clamp = (s, n = 120) => {
  if (!s) return ''
  return s.length > n ? s.slice(0, n).trim() + '…' : s
}

export const pretty = (dateStr) => {
  if (!dateStr) return ''
  const d = new Date(dateStr)
  if (isNaN(d)) return dateStr
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
}