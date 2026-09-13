import { useState, useEffect, useMemo } from 'react';
import { endpoints } from '../api/endpoints.js';

export const useMovies = () => {
  const [state, setState] = useState({
    movies: [],
    tvSeries: [],
    trending: [],
    popular: [],
    topRated: [],
    awardWinners: [],
    celebrities: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        setState((prev) => ({ ...prev, loading: true, error: null }));

        const [
          movies,
          tvSeries,
          trending,
          popular,
          topRated,
          awardWinners,
          celebrities,
        ] = await Promise.all([
          endpoints.getMovies().catch(() => []),
          endpoints.getTVSeries().catch(() => []),
          endpoints.getTrending().catch(() => []),
          endpoints.getPopular().catch(() => []),
          endpoints.getTopRated().catch(() => []),
          endpoints.getAwardWinners().catch(() => []),
          endpoints.getCelebrities().catch(() => []),
        ]);

        setState({
          movies: movies || [],
          tvSeries: tvSeries || [],
          trending: trending || [],
          popular: popular || [],
          topRated: topRated || [],
          awardWinners: awardWinners || [],
          celebrities: celebrities || [],
          loading: false,
          error: null,
        });
      } catch (error) {
        console.error('Failed to load movies data:', error);
        setState((prev) => ({
          ...prev,
          loading: false,
          error: error.message || 'Failed to load movies',
        }));
      }
    };

    loadData();
  }, []);

  const allTitles = useMemo(() => {
    return [...state.movies, ...state.tvSeries];
  }, [state.movies, state.tvSeries]);

  return {
    ...state,
    allTitles,
  };
};