import { useState, useEffect } from 'react';

import { Link, useLocation } from 'react-router-dom';
import { AiFillStar } from 'react-icons/ai';

import { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/controller';

import { getTrendingMovies, getMoviesByGenre } from 'services/moviesAPI';
import { IMAGE_BASE_URL } from 'utils/constants';
import styles from './MovieList.module.scss';

const MovieList = ({ genreName }) => {
  const [movies, setMovies] = useState([]);
  const sliderOptions = {
    slidesPerView: 3,
    spaceBetween: 20,
    navigation: true,
    modules: [Navigation],
    breakpoints: {
      768: {
        slidesPerView: 5,
      },
      1200: {
        slidesPerView: 7,
      },
    },
  };
  const location = useLocation();

  useEffect(() => {
    if (genreName === 'trending') {
      getTrendingMovies()
        .then(res => setMovies(res))
        .catch(err => console.log(err));
      return;
    }

    getMoviesByGenre(genreName)
      .then(res => setMovies(res))
      .catch(err => console.log(err));
  }, []);

  return (
    <>
      <h2 className={styles.genre}>{genreName}</h2>
      {movies.length > 0 && (
        <Swiper {...sliderOptions}>
          {movies.map(({ id, title, poster_path, vote_average }) => (
            <SwiperSlide className={styles.card} key={id}>
              <Link
                className={styles.link}
                to={`search/${id}`}
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
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </>
  );
};

export default MovieList;
