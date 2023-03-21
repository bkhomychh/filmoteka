import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/controller';

import Movie from 'components/Movie/Movie';
import MovieLoaderList from 'components/MovieLoaderList';

import { getTrendingMovies, getMoviesByGenre } from 'services/moviesAPI';
import { STATUS } from 'utils/constants';

import styles from './MovieCarousel.module.scss';

const MovieCarousel = ({ genreName }) => {
  const [status, setStatus] = useState(STATUS.IDLE);
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
    setStatus(STATUS.PENDING);

    if (genreName === 'trending') {
      getTrendingMovies()
        .then(res => {
          setMovies(res);
          setStatus(STATUS.RESOLVED);
        })
        .catch(err => {
          console.log(err);
          setStatus(STATUS.REJECTED);
        });
      return;
    }

    getMoviesByGenre(genreName)
      .then(res => {
        setMovies(res);
        setStatus(STATUS.RESOLVED);
      })
      .catch(err => {
        console.log(err);
        setStatus(STATUS.REJECTED);
      });
  }, [genreName]);

  return (
    <>
      <h2 className={styles.genre}>{genreName}</h2>
      {status === STATUS.PENDING && <MovieLoaderList />}
      {status === STATUS.RESOLVED && movies.length > 0 && (
        <Swiper {...sliderOptions}>
          {movies.map(movie => (
            <SwiperSlide className={styles.card} key={movie.id}>
              <Movie movie={movie} location={location} />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </>
  );
};

export default MovieCarousel;
