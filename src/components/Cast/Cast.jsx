import { useEffect } from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { Pagination, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/scss';
import 'swiper/scss/pagination';
import 'swiper/scss/scrollbar';

import { getMovieCredits } from 'services/moviesAPI';
import { IMAGE_BASE_URL } from 'utils/constants';

import styles from './Cast.module.scss';
import defaultImg from 'assets/images/default-avatar.webp';

const Cast = () => {
  const [cast, setCast] = useState(null);
  const { movieId } = useParams();
  const {
    i18n: { language },
  } = useTranslation();

  useEffect(() => {
    getMovieCredits(movieId, language)
      .then(res => setCast(res))
      .catch(err => toast.error(err.message));
  }, [movieId, language]);

  const sliderOptions = {
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
      {cast && (
        <Swiper className={styles.wrapper} {...sliderOptions}>
          {cast.map(({ id, name, profile_path, character }) => {
            const imgUrl = profile_path
              ? IMAGE_BASE_URL + profile_path
              : defaultImg;

            return (
              <SwiperSlide key={id}>
                <div className={styles.thumb}>
                  <img className={styles.img} src={imgUrl} alt={name} />
                </div>
                <p className={styles.name}>{name}</p>
                <p className={styles.character}>
                  <span>Character:</span> {character}
                </p>
              </SwiperSlide>
            );
          })}
        </Swiper>
      )}
    </>
  );
};

export default Cast;
