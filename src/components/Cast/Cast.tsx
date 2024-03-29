import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useQuery } from '@tanstack/react-query';

import { Pagination, Autoplay } from 'swiper';
import { Swiper, SwiperProps, SwiperSlide } from 'swiper/react';
import 'swiper/scss';
import 'swiper/scss/pagination';
import 'swiper/scss/scrollbar';

import { getMovieCredits } from 'services/moviesAPI';
import { IMAGE_BASE_URL } from 'utils/constants';

import styles from './Cast.module.scss';
import defaultImg from 'assets/images/default-avatar.webp';
import type { IActor } from 'types';

const Cast = () => {
  const { movieId } = useParams();
  const {
    t,
    i18n: { language },
  } = useTranslation();

  const fetchCastInfo = (): Promise<IActor[]> | [] => {
    if (!movieId) {
      return [];
    } else {
      return getMovieCredits(movieId, language);
    }
  };

  const { data: cast } = useQuery({
    queryKey: ['cast', movieId, language],
    queryFn: fetchCastInfo,
    onError: (err: Error) => toast.error(err.message),
  });

  const sliderOptions: SwiperProps = {
    slidesPerView: 3,
    slidesPerGroup: 3,
    spaceBetween: 20,
    pagination: { clickable: true },
    grabCursor: true,
    speed: 750,
    autoplay: {
      delay: 7500,
      pauseOnMouseEnter: true,
    },
    modules: [Pagination, Autoplay],
    breakpoints: {
      768: {
        slidesPerView: 5,
        slidesPerGroup: 5,
      },
      1200: {
        slidesPerView: 7,
        slidesPerGroup: 7,
      },
    },
  };

  return (
    <>
      {cast &&
        (cast.length > 0 ? (
          <Swiper className={styles.wrapper} {...sliderOptions}>
            {cast.map(({ id, name, profile_path, character }) => {
              const imgUrl = profile_path ? IMAGE_BASE_URL + profile_path : defaultImg;

              return (
                <SwiperSlide key={id}>
                  <div className={styles.thumb}>
                    <img className={styles.img} src={imgUrl} alt={name} loading="lazy" />
                  </div>
                  <p className={styles.name}>{name}</p>
                  <p className={styles.character}>
                    <span>{t('cast.character')}:</span> {character}
                  </p>
                </SwiperSlide>
              );
            })}
          </Swiper>
        ) : (
          <p>{t('cast.message.failure')}</p>
        ))}
    </>
  );
};

export default Cast;
