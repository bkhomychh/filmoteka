import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useQuery } from '@tanstack/react-query';

import { Pagination, Autoplay } from 'swiper';
import { Swiper, SwiperProps, SwiperSlide } from 'swiper/react';
import 'swiper/scss';
import 'swiper/scss/pagination';
import 'swiper/scss/scrollbar';

import { cutString, formatDate } from 'utils/formatting';
import { getMovieReviews } from 'services/moviesAPI';
import styles from './Reviews.module.scss';

import type { IReview } from 'types';

const Reviews = () => {
  const { movieId } = useParams();
  const {
    t,
    i18n: { language },
  } = useTranslation();

  const fetchReviews = (): Promise<IReview[]> | [] => {
    if (!movieId) {
      return [];
    }
    return getMovieReviews(movieId, language);
  };

  const { data: reviews } = useQuery({
    queryKey: ['reviews', movieId, language],
    queryFn: fetchReviews,
    onError: (err: Error) => toast.error(err.message),
  });

  const sliderOptions: SwiperProps = {
    slidesPerView: 1,
    spaceBetween: 20,
    pagination: { clickable: true },
    grabCursor: true,
    autoplay: {
      delay: 7500,
      pauseOnMouseEnter: true,
    },
    modules: [Pagination, Autoplay],
  };

  return (
    <>
      {reviews &&
        (reviews.length > 0 ? (
          <Swiper className={styles.wrapper} {...sliderOptions}>
            {reviews.map(({ id, author, content, created_at, url }) => (
              <SwiperSlide key={id}>
                <p className={styles.author}>{author}</p>
                <p className={styles.content}>{cutString(content)}</p>
                <a
                  className={styles.link}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                >
                  {t('reviews.btnText')}
                </a>
                <p className={styles.releaseDate}>{formatDate(created_at)}</p>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <p>{t('reviews.message.failure')}</p>
        ))}
    </>
  );
};

export default Reviews;
