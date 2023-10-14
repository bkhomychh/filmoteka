import { Location } from 'react-router-dom';
import { IMovie } from 'types';

export interface IMovieProps {
  movie: IMovie;
  location: Location;
}
