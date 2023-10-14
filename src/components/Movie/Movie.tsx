import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { getDataFromLocalStorage } from 'services/localStorage';
import { IMAGE_BASE_URL } from 'utils/constants';

import { FaBookmark } from 'react-icons/fa';
import { AiFillStar } from 'react-icons/ai';
import imagePlaceHolder from 'assets/images/image-place-holder.png';
import styles from './Movie.module.scss';

import type { IMovieProps } from './Movie.types';

const Movie = ({ movie, location }: IMovieProps) => {
  const { id, title, poster_path, vote_average } = movie;
  const imgUrl = poster_path ? IMAGE_BASE_URL + poster_path : imagePlaceHolder;

  const data = getDataFromLocalStorage('movies');
  const isSaved = Array.isArray(data) ? data.some(el => el.id === id) : false;

  return (
    <>
      <Link className={styles.link} to={`/search/${id}`} state={{ from: location }}>
        <img className={styles.poster} src={imgUrl} alt={title} loading="lazy" />
        {isSaved && <FaBookmark className={styles.icon} />}
      </Link>
      <div className={styles.info}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.score}>
          {vote_average.toFixed(1)} <AiFillStar />
        </p>
      </div>
    </>
  );
};

Movie.propTypes = {
  movie: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};

export default Movie;
