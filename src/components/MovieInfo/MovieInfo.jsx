import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import Button from 'components/Button';
import BookmarkButton from 'components/BookmarkButton';
import Modal from 'components/Modal';
import Trailer from 'components/Trailer';

import { getVideos } from 'services/moviesAPI';
import { IMAGE_BASE_URL } from 'utils/constants';
import { formatDate } from 'utils/formatting';
import {
  getDataFromLocalStorage,
  saveDataToLocalStorage,
} from 'services/localStorage';

import { AiFillStar } from 'react-icons/ai';
import { BsPlayCircle } from 'react-icons/bs';
import imagePlaceHolder from 'assets/images/image-place-holder.png';
import styles from './MovieInfo.module.scss';

const MovieInfo = ({ movie }) => {
  const {
    id,
    title,
    genres,
    overview,
    poster_path,
    release_date,
    vote_average,
  } = movie;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [movieKey, setMovieKey] = useState('');
  const [isSaved, setIsSaved] = useState(() => {
    const data = getDataFromLocalStorage('movies');
    const movies = data ? data : [];

    return movies.some(movie => movie.id === id);
  });
  const {
    t,
    i18n: { language },
  } = useTranslation();

  useEffect(() => {
    getVideos(id, language)
      .then(res => setMovieKey(res[0]?.key))
      .catch(err => console.log(err));
  }, [id, language]);

  const addToBookmarks = () => {
    const data = getDataFromLocalStorage('movies');
    const movies = data ? data : [];
    const newMovie = {
      id,
      title,
      poster_path,
      vote_average,
    };
    const newMoviest = movies.length > 0 ? [...movies, newMovie] : [newMovie];

    saveDataToLocalStorage('movies', newMoviest);
    setIsSaved(true);
  };

  const removeFromBookMarks = () => {
    const data = getDataFromLocalStorage('movies');
    const movies = data ? data : [];
    const filteredMovies = movies.filter(movie => movie.id !== id);

    saveDataToLocalStorage('movies', [...filteredMovies]);
    setIsSaved(false);
  };

  const toggleModal = () => {
    setIsModalOpen(state => !state);
  };

  const imgUrl = poster_path ? IMAGE_BASE_URL + poster_path : imagePlaceHolder;

  return (
    <>
      <div className={styles.wrapper}>
        <img className={styles.poster} src={imgUrl} alt={title} />
        <div className={styles.info}>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.score}>
            {vote_average.toFixed(1)} <AiFillStar />
          </p>
          <p className={styles.genre}>
            {genres.map(genre => genre.name).join(', ')}
          </p>
          <h2 className={styles.heading}>{t('movieDetails.overview')}:</h2>
          <p className={styles.overview}>{overview}</p>
          <h2 className={styles.date}>
            {t('movieDetails.releaseDate')}:
            <span>{formatDate(release_date)}</span>
          </h2>

          <div className={styles.box}>
            {movieKey && (
              <Button handleClick={toggleModal}>
                {t('movieDetails.trailer')} <BsPlayCircle />
              </Button>
            )}
            <BookmarkButton
              isSaved={isSaved}
              addToBookmarks={addToBookmarks}
              removeFromBookMarks={removeFromBookMarks}
            />
          </div>

          {isModalOpen && (
            <Modal closeModal={toggleModal}>
              <Trailer movieKey={movieKey} />
            </Modal>
          )}
        </div>
      </div>
    </>
  );
};

MovieInfo.propTypes = {
  movie: PropTypes.object.isRequired,
};

export default MovieInfo;
