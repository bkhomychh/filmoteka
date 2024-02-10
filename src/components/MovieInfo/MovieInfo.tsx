import { useState, Suspense } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { NavLink, Outlet, useLocation } from 'react-router-dom';

import Button from 'components/Button';
import BookmarkButton from 'components/BookmarkButton';
import Modal from 'components/Modal';
import Trailer from 'components/Trailer';
import PageLoader from 'components/PageLoader';

import { getVideos } from 'services/moviesAPI';
import { IMAGE_BASE_URL } from 'utils/constants';
import { formatDate } from 'utils/formatting';
import { getDataFromLocalStorage, saveDataToLocalStorage } from 'services/localStorage';

import { AiFillStar } from 'react-icons/ai';
import { BsPlayCircle } from 'react-icons/bs';
import imagePlaceHolder from 'assets/images/image-place-holder.png';
import styles from './MovieInfo.module.scss';

import type { IMovieInfoProps } from './MovieInfo.types';
import { useQuery } from '@tanstack/react-query';

const MovieInfo = ({ movie }: IMovieInfoProps) => {
  const { id, title, genres, overview, poster_path, release_date, vote_average } = movie;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [movieKey, setMovieKey] = useState('');
  const [isSaved, setIsSaved] = useState(() => {
    const data = getDataFromLocalStorage('movies');
    const movies = Array.isArray(data) ? data : [];

    return movies.some(movie => movie.id === id);
  });

  const location = useLocation();
  const {
    t,
    i18n: { language },
  } = useTranslation();

  const fetchVideos = () => getVideos(String(id), language);

  useQuery({
    queryKey: ['videos', id, language],
    queryFn: fetchVideos,
    onSuccess: res => setMovieKey(res[0]?.key),
  });

  // adding a movie to the Bookmarks
  const addToBookmarks = (): void => {
    const data = getDataFromLocalStorage('movies');
    const movies = Array.isArray(data) ? data : [];
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

  // adding a movie from the Bookmarks
  const removeFromBookMarks = (): void => {
    const data = getDataFromLocalStorage('movies');
    const movies = Array.isArray(data) ? data : [];
    const filteredMovies = movies.filter(movie => movie.id !== id);

    saveDataToLocalStorage('movies', [...filteredMovies]);
    setIsSaved(false);
  };

  const toggleModal = (): void => {
    setIsModalOpen(state => !state);
  };

  const imgUrl: string = poster_path ? IMAGE_BASE_URL + poster_path : imagePlaceHolder;

  return (
    <>
      <div className={styles.wrapper}>
        <img className={styles.poster} src={imgUrl} alt={title} />
        <div className={styles.info}>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.score}>
            {vote_average.toFixed(1)} <AiFillStar />
          </p>
          <p className={styles.genre}>{genres.map(genre => genre.name).join(', ')}</p>
          <h2 className={styles.heading}>{t('movieDetails.overview')}:</h2>
          <p className={styles.overview}>{overview}</p>
          <h2 className={styles.date}>
            {t('movieDetails.releaseDate')}:<span>{formatDate(release_date)}</span>
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

          <Modal closeModal={toggleModal} isVisible={isModalOpen}>
            <Trailer movieKey={movieKey} canPlay={isModalOpen} />
          </Modal>
        </div>
      </div>
      <div className={styles.additionalInfo}>
        <h2 className={styles.heading}>{t('movieDetails.additionalInfo')}:</h2>
        <ul className={styles.links}>
          <li>
            <NavLink className={styles.link} to="cast" state={{ from: location.state?.from }}>
              {t('cast.title')}
            </NavLink>
          </li>
          <li>
            <NavLink className={styles.link} to="reviews" state={{ from: location.state?.from }}>
              {t('reviews.title')}
            </NavLink>
          </li>
        </ul>
        <Suspense fallback={<PageLoader />}>
          <Outlet />
        </Suspense>
      </div>
    </>
  );
};

MovieInfo.propTypes = {
  movie: PropTypes.object.isRequired,
};

export default MovieInfo;
