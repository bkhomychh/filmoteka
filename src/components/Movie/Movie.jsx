import { Link } from 'react-router-dom';
import { AiFillStar } from 'react-icons/ai';
import { IMAGE_BASE_URL } from 'utils/constants';

import styles from './Movie.module.scss';

const Movie = ({ movie, location }) => {
  const { id, title, poster_path, vote_average } = movie;

  return (
    <>
      <Link
        className={styles.link}
        to={`/search/${id}`}
        state={{ from: location }}
      >
        <img
          className={styles.poster}
          src={IMAGE_BASE_URL + poster_path}
          alt={title}
        />
      </Link>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.score}>
        {vote_average.toFixed(1)} <AiFillStar />
      </p>
    </>
  );
};

export default Movie;
