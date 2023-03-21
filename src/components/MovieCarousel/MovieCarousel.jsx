import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

import { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/controller';
import { useInView } from 'react-intersection-observer';

import Movie from 'components/Movie/Movie';
import PageLoader from 'components/PageLoader';

import { getTrendingMovies, getMoviesByGenre } from 'services/moviesAPI';
import { GENRE, STATUS } from 'utils/constants';

import styles from './MovieCarousel.module.scss';

const MovieCarousel = ({ genre: { name, id } }) => {
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
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 1,
    rootMargin: '100px',
    initialInView: false,
  });

  useEffect(() => {
    if (!inView) {
      return;
    }

    setStatus(STATUS.PENDING);

    if (name === GENRE.TRENDING) {
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

    getMoviesByGenre(id)
      .then(res => {
        setMovies(res);
        setStatus(STATUS.RESOLVED);
      })
      .catch(err => {
        console.log(err);
        setStatus(STATUS.REJECTED);
      });
  }, [name, id, inView]);

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.genre} ref={ref}>
        {name}
      </h2>
      {status === STATUS.PENDING && <PageLoader />}
      {status === STATUS.RESOLVED && movies.length > 0 && (
        <Swiper {...sliderOptions}>
          {movies.map(movie => (
            <SwiperSlide className={styles.card} key={movie.id}>
              <Movie movie={movie} location={location} />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};

MovieCarousel.propTypes = {
  genre: PropTypes.object.isRequired,
};

export default MovieCarousel;
