import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { Pagination, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/scss';
import 'swiper/scss/pagination';
import 'swiper/scss/scrollbar';

import { getMovieReviews } from 'services/moviesAPI';
import { toast } from 'react-toastify';
import { cutString, formatDate } from 'utils/formatting';

import styles from './Reviews.module.scss';

const Reviews = () => {
  const [reviews, setReviews] = useState(null);
  const { movieId } = useParams();
  const {
    i18n: { language },
  } = useTranslation();

  useEffect(() => {
    getMovieReviews(movieId, language)
      .then(res => setReviews(res))
      .catch(err => toast.error(err.message));
  }, [movieId, language]);

  const sliderOptions = {
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
      {reviews && (
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
                Read more
              </a>
              <p className={styles.releaseDate}>{formatDate(created_at)}</p>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </>
  );
};

export default Reviews;
