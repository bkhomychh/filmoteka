const BASE_URL = 'https://api.themoviedb.org/3/';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500/';
const API_KEY = '9e68854d69dbd1100bcb425bc2f51530';

const RESOURCE = {
  trending: 'trending/movie/week',
  genres: 'genre/movie/list',
  search: 'search/movie',
  discover: 'discover/movie',
  videos: id => `movie/${id}/videos`,
  movieDetails: id => `movie/${id}`,
  movieCredits: id => `movie/${id}/credits`,
  movieReviews: id => `movie/${id}/reviews`,
};

const STATUS = {
  IDLE: 'idle',
  PENDING: 'pending',
  REJECTED: 'rejected',
  RESOLVED: 'resolved',
};

const LANGUAGE = {
  EN: {
    original: 'English',
    short: 'en',
  },
  UK: {
    original: 'Українська',
    short: 'uk',
  },
  PL: {
    original: 'Polski',
    short: 'pl',
  },
};

export { BASE_URL, IMAGE_BASE_URL, API_KEY, RESOURCE, STATUS, LANGUAGE };
