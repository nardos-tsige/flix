import { TMDB_CONFIG } from './tmdb.js';

const API_KEY = TMDB_CONFIG.API_KEY;
const BASE_URL = TMDB_CONFIG.BASE_URL;

const fetchFromTMDB = async (endpoint, params = {}) => {
  const url = new URL(`${BASE_URL}${endpoint}`);
  url.searchParams.append('api_key', API_KEY);
  url.searchParams.append('language', 'en-US');

  if (!params.page) {
    url.searchParams.append('page', '1');
  }

  Object.keys(params).forEach((key) => {
    url.searchParams.append(key, params[key]);
  });

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`TMDB API Error: ${response.status}`);
    }
    const data = await response.json();
    return data.results || data;
  } catch (error) {
    console.error('TMDB fetch error:', error);
    return [];
  }
};

const fetchMovieDetails = async (id) => {
  const url = new URL(`${BASE_URL}/movie/${id}`);
  url.searchParams.append('api_key', API_KEY);
  url.searchParams.append('language', 'en-US');
  url.searchParams.append('append_to_response', 'credits,videos,similar');

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`TMDB API Error: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    console.error('TMDB fetch error:', error);
    return null;
  }
};

const transformMovie = (movie) => {
  if (!movie) return null;
  return {
    id: movie.id?.toString() || `temp-${Date.now()}`,
    title: movie.title || movie.name || 'Untitled',
    tagline: movie.tagline || '',
    overview: movie.overview || 'No description available.',
    posterPath: movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : '',
    backdropPath: movie.backdrop_path ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}` : '',
    releaseDate: movie.release_date || movie.first_air_date || '',
    year: (movie.release_date || movie.first_air_date || '').split('-')[0] || '',
    rating: movie.vote_average || 0,
    voteCount: movie.vote_count || 0,
    runtime: movie.runtime || 0,
    genres: movie.genres ? movie.genres.map((g) => g.name) : [],
    director: movie.director || 'Unknown',
    trailerKey: movie.videos?.results?.find((v) => v.type === 'Trailer')?.key || '',
    type: movie.type || 'movie',
    awards: '',
    isTrending: false,
    isPopular: false,
    isTopRated: false,
    isAwardWinner: false,
    cast: movie.credits?.cast?.slice(0, 6).map((cast) => ({
      id: cast.id?.toString() || `cast-${Date.now()}`,
      name: cast.name || 'Unknown',
      character: cast.character || 'Unknown',
      profilePath: cast.profile_path ? `https://image.tmdb.org/t/p/w185${cast.profile_path}` : '',
    })) || [],
  };
};

export const endpoints = {
  getTrending: async () => {
    const data = await fetchFromTMDB('/trending/movie/week');
    return data.map((movie) => ({
      ...transformMovie(movie),
      isTrending: true,
    })).filter(Boolean);
  },

  getPopular: async () => {
    const data = await fetchFromTMDB('/movie/popular');
    return data.map((movie) => ({
      ...transformMovie(movie),
      isPopular: true,
    })).filter(Boolean);
  },

  getTopRated: async () => {
    const data = await fetchFromTMDB('/movie/top_rated');
    return data.map((movie) => ({
      ...transformMovie(movie),
      isTopRated: true,
    })).filter(Boolean);
  },

  getAwardWinners: async () => {
    const data = await fetchFromTMDB('/movie/top_rated');
    return data.slice(0, 10).map((movie) => ({
      ...transformMovie(movie),
      isAwardWinner: true,
    })).filter(Boolean);
  },

  getMovies: async () => {
    const data = await fetchFromTMDB('/discover/movie', { sort_by: 'popularity.desc' });
    return data.map((movie) => ({
      ...transformMovie(movie),
      type: 'movie',
    })).filter(Boolean);
  },

  getTVSeries: async () => {
    const data = await fetchFromTMDB('/discover/tv', { sort_by: 'popularity.desc' });
    return data.map((movie) => ({
      ...transformMovie(movie),
      type: 'tv',
      seasons: 0,
      episodes: 0,
    })).filter(Boolean);
  },

  getMovieById: async (id) => {
    const data = await fetchMovieDetails(id);
    if (!data) return null;
    return {
      ...transformMovie(data),
      type: 'movie',
      runtime: data.runtime || 0,
      director: data.credits?.crew?.find((c) => c.job === 'Director')?.name || 'Unknown',
      cast: data.credits?.cast?.slice(0, 12).map((cast) => ({
        id: cast.id?.toString() || `cast-${Date.now()}`,
        name: cast.name || 'Unknown',
        character: cast.character || 'Unknown',
        profilePath: cast.profile_path ? `https://image.tmdb.org/t/p/w185${cast.profile_path}` : '',
      })) || [],
    };
  },

  getSimilarMovies: async (id) => {
    const url = new URL(`${BASE_URL}/movie/${id}/similar`);
    url.searchParams.append('api_key', API_KEY);
    url.searchParams.append('language', 'en-US');
    url.searchParams.append('page', '1');

    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`TMDB API Error: ${response.status}`);
      const data = await response.json();
      return data.results.slice(0, 6).map((movie) => transformMovie(movie)).filter(Boolean);
    } catch (error) {
      console.error('Similar movies fetch error:', error);
      return [];
    }
  },

  getCelebrities: async () => {
    const data = await fetchFromTMDB('/person/popular');
    return data.map((person) => ({
      id: person.id?.toString() || `celeb-${Date.now()}`,
      name: person.name || 'Unknown',
      knownFor: person.known_for?.map((m) => m.title || m.name).join(', ') || 'Actor',
      popularityScore: Math.round((person.popularity || 0) * 10),
      profilePath: person.profile_path ? `https://image.tmdb.org/t/p/w500${person.profile_path}` : '',
      biography: person.biography || `${person.name} is a talented performer.`,
      knownForDepartment: person.known_for_department || 'Acting',
      birthday: person.birthday || '',
      birthplace: person.place_of_birth || '',
      awards: '',
      filmography: person.known_for?.slice(0, 4).map((m) => ({
        id: m.id?.toString() || `film-${Date.now()}`,
        title: m.title || m.name || 'Untitled',
        year: (m.release_date || m.first_air_date || '').split('-')[0] || '',
        role: 'Cast',
        posterPath: m.poster_path ? `https://image.tmdb.org/t/p/w200${m.poster_path}` : '',
        rating: m.vote_average || 0,
      })) || [],
    })).filter(Boolean);
  },

  getCelebrityById: async (id) => {
    const url = new URL(`${BASE_URL}/person/${id}`);
    url.searchParams.append('api_key', API_KEY);
    url.searchParams.append('language', 'en-US');
    url.searchParams.append('append_to_response', 'combined_credits');

    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`TMDB API Error: ${response.status}`);
      const data = await response.json();

      return {
        id: data.id?.toString() || `celeb-${Date.now()}`,
        name: data.name || 'Unknown',
        knownFor: data.known_for_department || 'Actor',
        popularityScore: Math.round((data.popularity || 0) * 10),
        profilePath: data.profile_path ? `https://image.tmdb.org/t/p/w500${data.profile_path}` : '',
        biography: data.biography || `${data.name} is a talented performer.`,
        knownForDepartment: data.known_for_department || 'Acting',
        birthday: data.birthday || '',
        birthplace: data.place_of_birth || '',
        awards: '',
        filmography: data.combined_credits?.cast?.slice(0, 8).map((m) => ({
          id: m.id?.toString() || `film-${Date.now()}`,
          title: m.title || m.name || 'Untitled',
          year: (m.release_date || m.first_air_date || '').split('-')[0] || '',
          role: m.character || 'Cast',
          posterPath: m.poster_path ? `https://image.tmdb.org/t/p/w200${m.poster_path}` : '',
          rating: m.vote_average || 0,
        })) || [],
      };
    } catch (error) {
      console.error('Celebrity fetch error:', error);
      return null;
    }
  },

  searchMulti: async (query) => {
    if (!query || !query.trim()) {
      return { movies: [], celebrities: [] };
    }

    const url = new URL(`${BASE_URL}/search/multi`);
    url.searchParams.append('api_key', API_KEY);
    url.searchParams.append('language', 'en-US');
    url.searchParams.append('query', query.trim());
    url.searchParams.append('page', '1');

    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`TMDB API Error: ${response.status}`);
      const data = await response.json();

      const movies = data.results
        .filter((item) => item.media_type === 'movie' || item.media_type === 'tv')
        .slice(0, 12)
        .map((item) => ({
          ...transformMovie(item),
          type: item.media_type === 'tv' ? 'tv' : 'movie',
        }))
        .filter(Boolean);

      const celebrities = data.results
        .filter((item) => item.media_type === 'person')
        .slice(0, 8)
        .map((person) => ({
          id: person.id?.toString() || `celeb-${Date.now()}`,
          name: person.name || 'Unknown',
          knownFor: person.known_for?.map((m) => m.title || m.name).join(', ') || 'Actor',
          popularityScore: Math.round((person.popularity || 0) * 10),
          profilePath: person.profile_path ? `https://image.tmdb.org/t/p/w500${person.profile_path}` : '',
          knownForDepartment: person.known_for_department || 'Acting',
        }))
        .filter(Boolean);

      return { movies, celebrities };
    } catch (error) {
      console.error('Search error:', error);
      return { movies: [], celebrities: [] };
    }
  },
};