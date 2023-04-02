import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';

import Movie from 'components/Movie/Movie';
import PageLoader from 'components/PageLoader';

import { getTrendingMovies, getMoviesByGenre } from 'services/moviesAPI';

import { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/controller';
import { useInView } from 'react-intersection-observer';

import styles from './MovieCarousel.module.scss';
import { BsFire } from 'react-icons/bs';

const MovieCarousel = ({ genre: { name, id } }) => {
  const {
    t,
    i18n: { language },
  } = useTranslation();

  const location = useLocation();
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 1,
    rootMargin: '100px',
    initialInView: false,
  });

  const { data, isLoading } = useQuery({
    queryKey: [name],
    queryFn: () => {
      if (!inView) {
        return [];
      }

      if (name === TRENDING) {
        return getTrendingMovies(language);
      }
      return getMoviesByGenre(id, language);
    },
    staleTime: 'Infinity',
    refetchOnMount: true,
    enabled: inView,
  });

  const TRENDING = t('home.additional_genre.trending');
  const sliderOptions = {
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
      {data?.length > 0 && (
        <Swiper {...sliderOptions}>
          {data.map(movie => (
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
