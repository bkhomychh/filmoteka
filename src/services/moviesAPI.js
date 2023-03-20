import axios from 'axios';

import { BASE_URL, API_KEY, RESOURCE } from 'utils/constants';

axios.defaults.baseURL = BASE_URL;
axios.defaults.params = {
  api_key: API_KEY,
};

const getTrendingMovies = () => {
  return axios.get(RESOURCE.trending).then(res => res.data.results);
};

const getGenreList = () => {
  return axios.get(RESOURCE.genres).then(res => res.data.genres);
};

const getMoviesBySearchQuery = searchQuery => {
  const options = {
    params: {
      query: searchQuery,
    },
  };

  return axios.get(RESOURCE.search, options).then(res => res.data.results);
};

const getMoviesByGenre = genre => {
  const options = {
    params: {
      with_genres: genre,
      sort_by: 'popularity.desc',
      'vote_average.gte': 5,
      'primary_release_date.gte': '2010-01-01',
    },
  };

  return axios.get(RESOURCE.discover, options).then(res => res.data.results);
};

const getMovieDetails = id => {
  return axios.get(RESOURCE.movieDetails(id)).then(res => res.data);
};

const getMovieCredits = id => {
  return axios.get(RESOURCE.movieCredits(id)).then(res => res.data.cast);
};

const getMovieReviews = id => {
  return axios.get(RESOURCE.movieReviews(id)).then(res => res.data.results);
};

const getVideos = id => {
  return axios.get(RESOURCE.videos(id)).then(res => res.data.results);
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
