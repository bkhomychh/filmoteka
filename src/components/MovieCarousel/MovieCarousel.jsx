import { useState, useEffect } from 'react';

import { useLocation } from 'react-router-dom';

import { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/controller';

import { getTrendingMovies, getMoviesByGenre } from 'services/moviesAPI';

import styles from './MovieCarousel.module.scss';
import Movie from 'components/Movie/Movie';

const MovieCarousel = ({ genreName }) => {
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
  }, [genreName]);

  return (
    <>
      <h2 className={styles.genre}>{genreName}</h2>
      {movies.length > 0 && (
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
