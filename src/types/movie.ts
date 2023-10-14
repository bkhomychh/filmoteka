import type { IGenre } from './genre';

export interface IMovie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  genres: IGenre[];
}

export interface IFoundMovies {
  results: IMovie[];
}
