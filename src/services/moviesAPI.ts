import axios from 'axios';

import { BASE_URL, API_KEY } from 'utils/constants';
import type { IMovie, IGenreList, IFoundMovies, IFoundReviews, FoundCredits } from 'types';

axios.defaults.baseURL = BASE_URL;
axios.defaults.params = {
  api_key: API_KEY,
};

export const getTrendingMovies = async (language = 'en') => {
  const options = {
    params: { language },
  };
  return axios.get<IFoundMovies>('trending/movie/week', options).then(res => res.data.results);
};

export const getGenreList = async (language = 'en') => {
  const options = {
    params: { language },
  };
  return axios.get<IGenreList>('genre/movie/list', options).then(res => res.data.genres);
};

export const getMoviesBySearchQuery = async (query: string, language = 'en') => {
  const options = {
    params: { query, language },
  };
  return axios.get<IFoundMovies>('search/movie', options).then(res => res.data.results);
};

export const getMoviesByGenre = async (genreId: string, language = 'en') => {
  const options = {
    params: {
      with_genres: genreId,
      sort_by: 'popularity.desc',
      'vote_average.gte': 5,
      'primary_release_date.gte': '2010-01-01',
      language,
    },
  };

  return axios.get<IFoundMovies>('discover/movie', options).then(res => res.data.results);
};

export const getMovieDetails = async (id: string, language = 'en') => {
  const options = {
    params: { language },
  };

  return axios.get<IMovie>(`movie/${id}`, options).then(res => res.data);
};

export const getMovieCredits = async (id: string, language = 'en') => {
  const options = {
    params: { language },
  };
  return axios.get<FoundCredits>(`movie/${id}/credits`, options).then(res => res.data.cast);
};

export const getMovieReviews = async (id: string, language = 'en') => {
  const options = {
    params: { language },
  };
  return axios.get<IFoundReviews>(`movie/${id}/reviews`, options).then(res => res.data.results);
};

export const getVideos = async (id: string, language = 'en') => {
  const options = {
    params: { language },
  };
  return axios.get(`movie/${id}/videos`, options).then(res => res.data.results);
};
