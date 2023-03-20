import { useState } from 'react';
import { AiFillStar } from 'react-icons/ai';
import { BsPlayCircle } from 'react-icons/bs';

import Button from 'components/Button';
import BookmarkButton from 'components/BookmarkButton';
import Modal from 'components/Modal';

import { IMAGE_BASE_URL } from 'utils/constants';
import { formatDate } from 'utils/formatting';
import {
  getDataFromLocalStorage,
  saveDataToLocalStorage,
} from 'services/localStorage';

import styles from './MovieInfo.module.scss';
import imagePlaceHolder from 'assets/images/image-place-holder.png';

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
  const [isSaved, setIsSaved] = useState(() => {
    const data = getDataFromLocalStorage('movies');
    const movies = data ? data : [];

    return movies.some(movie => movie.id === id);
  });

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
          <h2 className={styles.heading}>Overview:</h2>
          <p className={styles.overview}>{overview}</p>
          <h2 className={styles.date}>
            Release date:
            <span>{formatDate(release_date)}</span>
          </h2>

          <div className={styles.box}>
            <Button handleClick={toggleModal}>
              Trailer <BsPlayCircle />
            </Button>
            <BookmarkButton
              isSaved={isSaved}
              addToBookmarks={addToBookmarks}
              removeFromBookMarks={removeFromBookMarks}
            />
          </div>

          {isModalOpen && <Modal closeModal={toggleModal}></Modal>}
        </div>
      </div>
    </>
  );
};

export default MovieInfo;
