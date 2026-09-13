export const IMG_BASE = 'https://image.tmdb.org/t/p'

export const poster = (path, size = 'w500') => {
  if (!path) return ''
  if (path.startsWith('http')) return path
  return `${IMG_BASE}/${size}${path}`
}

export const backdrop = (path, size = 'original') => {
  if (!path) return ''
  if (path.startsWith('http')) return path
  return `${IMG_BASE}/${size}${path}`
}

export const avatar = (path, size = 'w300') => {
  if (!path) return ''
  if (path.startsWith('http')) return path
  return `${IMG_BASE}/${size}${path}`
}

export const TMDB = {
  key: '574213dbd88a62c470c20c5217f710b3',
  base: 'https://api.themoviedb.org/3',
}