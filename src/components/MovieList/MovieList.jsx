import { useLocation } from 'react-router-dom';

import Movie from 'components/Movie';
import styles from './MovieList.module.scss';

const MovieList = ({ movies }) => {
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

export default MovieList;
