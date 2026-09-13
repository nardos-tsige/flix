import { TMDB } from './tmdb.js'

const call = async (path, params = {}) => {
  const url = new URL(`${TMDB.base}${path}`)
  url.searchParams.set('api_key', TMDB.key)
  url.searchParams.set('language', 'en-US')
  if (!params.page) url.searchParams.set('page', '1')
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v))

  try {
    const res = await fetch(url)
    if (!res.ok) {
      console.warn('tmdb fail', path, res.status)
      return []
    }
    const json = await res.json()
    return json.results || json
  } catch (err) {
    console.warn('tmdb error', path, err)
    return []
  }
}

const shape = (m, kind = 'movie') => {
  if (!m || !m.id) return null
  const date = m.release_date || m.first_air_date || ''
  return {
    id: String(m.id),
    title: m.title || m.name || 'Untitled',
    blurb: m.overview || 'No description on file.',
    poster: m.poster_path ? `https://image.tmdb.org/t/p/w500${m.poster_path}` : '',
    cover: m.backdrop_path ? `https://image.tmdb.org/t/p/original${m.backdrop_path}` : '',
    released: date,
    year: date.split('-')[0] || '',
    score: m.vote_average || 0,
    votes: m.vote_count || 0,
    runtime: m.runtime || 0,
    tags: m.genres ? m.genres.map(g => g.name) : [],
    studio: m.director || '—',
    trailer: m.videos?.results?.find(v => v.type === 'Trailer')?.key || '',
    kind,
    tagline: m.tagline || '',
    cast: (m.credits?.cast || []).slice(0, 8).map(c => ({
      id: String(c.id),
      name: c.name,
      role: c.character,
      photo: c.profile_path ? `https://image.tmdb.org/t/p/w185${c.profile_path}` : '',
    })),
  }
}

export const api = {
  trending: async () => (await call('/trending/movie/week')).map(m => shape(m, 'movie')).filter(Boolean),

  popular: async () => (await call('/movie/popular')).map(m => shape(m, 'movie')).filter(Boolean),

  topRated: async () => (await call('/movie/top_rated')).map(m => shape(m, 'movie')).filter(Boolean),

  movies: async () => (await call('/discover/movie', { sort_by: 'popularity.desc' })).map(m => shape(m, 'movie')).filter(Boolean),

  shows: async () => (await call('/discover/tv', { sort_by: 'popularity.desc' })).map(m => shape(m, 'tv')).filter(Boolean),

  getById: async (id) => {
    const url = new URL(`${TMDB.base}/movie/${id}`)
    url.searchParams.set('api_key', TMDB.key)
    url.searchParams.set('append_to_response', 'credits,videos')
    try {
      const r = await fetch(url)
      if (!r.ok) return null
      const d = await r.json()
      const shaped = shape(d, 'movie')
      shaped.studio = d.credits?.crew?.find(c => c.job === 'Director')?.name || '—'
      return shaped
    } catch {
      return null
    }
  },

  getSimilar: async (id) => {
    const url = new URL(`${TMDB.base}/movie/${id}/similar`)
    url.searchParams.set('api_key', TMDB.key)
    try {
      const r = await fetch(url)
      if (!r.ok) return []
      const d = await r.json()
      return (d.results || []).slice(0, 8).map(m => shape(m, 'movie')).filter(Boolean)
    } catch {
      return []
    }
  },

  people: async () => {
    const list = await call('/person/popular')
    return list.map(p => ({
      id: String(p.id),
      name: p.name,
      role: p.known_for_department || 'Acting',
      heat: Math.round((p.popularity || 0) * 10),
      photo: p.profile_path ? `https://image.tmdb.org/t/p/w500${p.profile_path}` : '',
      known: (p.known_for || []).map(k => k.title || k.name).join(', ') || '—',
      bio: `${p.name} — ${p.known_for_department || 'performer'} known for standout work in film and television.`,
      birthday: p.birthday || '',
      from: p.place_of_birth || '',
      credits: (p.known_for || []).slice(0, 6).map(k => ({
        id: String(k.id),
        title: k.title || k.name || '—',
        year: (k.release_date || k.first_air_date || '').split('-')[0],
        poster: k.poster_path ? `https://image.tmdb.org/t/p/w200${k.poster_path}` : '',
        score: k.vote_average || 0,
      })),
    })).filter(p => p.id)
  },

  person: async (id) => {
    const url = new URL(`${TMDB.base}/person/${id}`)
    url.searchParams.set('api_key', TMDB.key)
    url.searchParams.set('append_to_response', 'combined_credits')
    try {
      const r = await fetch(url)
      if (!r.ok) return null
      const d = await r.json()
      return {
        id: String(d.id),
        name: d.name,
        role: d.known_for_department || 'Acting',
        heat: Math.round((d.popularity || 0) * 10),
        photo: d.profile_path ? `https://image.tmdb.org/t/p/w500${d.profile_path}` : '',
        known: d.known_for_department,
        bio: d.biography || `${d.name} is a ${d.known_for_department || 'performer'}.`,
        birthday: d.birthday || '',
        from: d.place_of_birth || '',
        credits: (d.combined_credits?.cast || []).slice(0, 12).map(k => ({
          id: String(k.id),
          title: k.title || k.name || '—',
          year: (k.release_date || k.first_air_date || '').split('-')[0],
          poster: k.poster_path ? `https://image.tmdb.org/t/p/w200${k.poster_path}` : '',
          score: k.vote_average || 0,
        })),
      }
    } catch {
      return null
    }
  },

  find: async (q) => {
    if (!q || !q.trim()) return { movies: [], people: [] }
    const url = new URL(`${TMDB.base}/search/multi`)
    url.searchParams.set('api_key', TMDB.key)
    url.searchParams.set('query', q.trim())

    try {
      const r = await fetch(url)
      if (!r.ok) return { movies: [], people: [] }
      const d = await r.json()
      const items = d.results || []

      const movies = items
        .filter(x => x.media_type === 'movie' || x.media_type === 'tv')
        .slice(0, 12)
        .map(x => shape(x, x.media_type === 'tv' ? 'tv' : 'movie'))
        .filter(Boolean)

      const people = items
        .filter(x => x.media_type === 'person')
        .slice(0, 8)
        .map(p => ({
          id: String(p.id),
          name: p.name,
          role: p.known_for_department || 'Acting',
          heat: Math.round((p.popularity || 0) * 10),
          photo: p.profile_path ? `https://image.tmdb.org/t/p/w500${p.profile_path}` : '',
          known: (p.known_for || []).map(k => k.title || k.name).join(', '),
        }))

      return { movies, people }
    } catch {
      return { movies: [], people: [] }
    }
  },
}