import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';

import Movie from 'components/Movie/Movie';
import PageLoader from 'components/PageLoader';

import { getTrendingMovies, getMoviesByGenre } from 'services/moviesAPI';

import { Navigation } from 'swiper';
import { Swiper, SwiperProps, SwiperSlide } from 'swiper/react';
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/controller';
import { useInView } from 'react-intersection-observer';
import { BsFire } from 'react-icons/bs';

import styles from './MovieCarousel.module.scss';
import type { IMovieCarouselProps } from './MovieCarousel.types';

const MovieCarousel = ({ genre: { name, id = '' } }: IMovieCarouselProps) => {
  const {
    t,
    i18n: { language },
  } = useTranslation();

  const location = useLocation();

  // observer settings
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 1,
    rootMargin: '100px',
    initialInView: false,
  });

  // fetching data
  const { data: movies, isLoading } = useQuery({
    queryKey: ['movie', 'genre', name],
    queryFn: () => {
      if (name === TRENDING) {
        return getTrendingMovies(language);
      }
      return getMoviesByGenre(String(id), language);
    },
    enabled: inView,
  });

  const TRENDING = t('home.additional_genre.trending');
  const sliderOptions: SwiperProps = {
    slidesPerView: 3,
    spaceBetween: 20,
    navigation: true,
    modules: [Navigation],
    breakpoints: {
      768: {
        slidesPerView: 4,
      },
      1200: {
        slidesPerView: 5,
      },
    },
  };

  if (name === TRENDING) {
    sliderOptions.slidesPerView = 1;
    sliderOptions.breakpoints = {
      768: {
        slidesPerView: 2,
        spaceBetween: 30,
      },
      1200: {
        slidesPerView: 3,
      },
    };
  }

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.genre} ref={ref}>
        {name}
        {name === TRENDING && <BsFire className={styles.icon} />}
      </h2>

      {isLoading && <PageLoader />}

      {Array.isArray(movies) && movies.length && (
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
