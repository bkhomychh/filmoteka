import axios from 'axios';

import { BASE_URL, API_KEY, RESOURCE } from 'utils/constants';

axios.defaults.baseURL = BASE_URL;
axios.defaults.params = {
  api_key: API_KEY,
};

const getTrendingMovies = (language = 'en') => {
  const options = {
    params: { language },
  };
  return axios.get(RESOURCE.trending, options).then(res => res.data.results);
};

const getGenreList = (language = 'en') => {
  const options = {
    params: { language },
  };
  return axios.get(RESOURCE.genres, options).then(res => res.data.genres);
};

const getMoviesBySearchQuery = (query, language = 'en') => {
  const options = {
    params: { query, language },
  };
  return axios.get(RESOURCE.search, options).then(res => res.data.results);
};

const getMoviesByGenre = (genreId, language = 'en') => {
  const options = {
    params: {
      with_genres: genreId,
      sort_by: 'popularity.desc',
      'vote_average.gte': 5,
      'primary_release_date.gte': '2010-01-01',
      language,
    },
  };

  return axios.get(RESOURCE.discover, options).then(res => res.data.results);
};

const getMovieDetails = (id, language = 'en') => {
  const options = {
    params: { language },
  };

  return axios.get(RESOURCE.movieDetails(id), options).then(res => res.data);
};

const getMovieCredits = (id, language = 'en') => {
  const options = {
    params: { language },
  };
  return axios
    .get(RESOURCE.movieCredits(id), options)
    .then(res => res.data.cast);
};

const getMovieReviews = (id, language = 'en') => {
  const options = {
    params: { language },
  };
  return axios
    .get(RESOURCE.movieReviews(id), options)
    .then(res => res.data.results);
};

const getVideos = (id, language = 'en') => {
  const options = {
    params: { language },
  };
  return axios.get(RESOURCE.videos(id), options).then(res => res.data.results);
};

export {
  getTrendingMovies,
  getGenreList,
  getMoviesBySearchQuery,
  getMoviesByGenre,
  getMovieDetails,
  getMovieCredits,
  getMovieReviews,
  getVideos,
};
