import styles from './MovieLoaderList.module.scss';
import MovieLoader from 'components/MovieLoader';

const MovieLoaderList = () => {
  return (
    <ul className={styles.list}>
      <li>
        <MovieLoader />
      </li>
      <li>
        <MovieLoader />
      </li>
      <li>
        <MovieLoader />
      </li>
    </ul>
  );
};

export default MovieLoaderList;
