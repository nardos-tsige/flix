import { useEffect, useState, useMemo } from 'react'
import { api } from '../api/data.js'

export const useCatalog = () => {
  const [bucket, setBucket] = useState({
    trending: [],
    popular: [],
    topRated: [],
    movies: [],
    shows: [],
    people: [],
    loading: true,
    err: null,
  })

  useEffect(() => {
    let alive = true

    const grab = async () => {
      const [trending, popular, topRated, movies, shows, people] = await Promise.all([
        api.trending().catch(() => []),
        api.popular().catch(() => []),
        api.topRated().catch(() => []),
        api.movies().catch(() => []),
        api.shows().catch(() => []),
        api.people().catch(() => []),
      ])

      if (!alive) return

      setBucket({
        trending: trending || [],
        popular: popular || [],
        topRated: topRated || [],
        movies: movies || [],
        shows: shows || [],
        people: people || [],
        loading: false,
        err: null,
      })
    }

    grab()

    return () => {
      alive = false
    }
  }, [])

  const everything = useMemo(() => {
    return [...bucket.movies, ...bucket.shows]
  }, [bucket.movies, bucket.shows])

  return { ...bucket, everything }
}