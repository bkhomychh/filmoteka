import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

import Movie from 'components/Movie';
import styles from './MovieList.module.scss';

import type { IMovieListProps } from './MovieList.types';

const MovieList = ({ movies }: IMovieListProps) => {
  const location = useLocation();

  return (
    <ul className={styles.list}>
      {movies.map(movie => (
        <li className={styles.item} key={movie.id}>
          <Movie movie={movie} location={location} />
        </li>
      ))}
    </ul>
  );
};

MovieList.propTypes = {
  movies: PropTypes.array.isRequired,
};

export default MovieList;
