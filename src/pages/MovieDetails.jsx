import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieDetails } from 'services/moviesAPI';
import { useTranslation } from 'react-i18next';

import BackLink from 'components/BackLink';
import MovieInfo from 'components/MovieInfo';

const MovieDetails = () => {
  const [movie, setMovie] = useState(null);
  const { movieId } = useParams();
  const {
    i18n: { language },
  } = useTranslation();

  useEffect(() => {
    getMovieDetails(movieId, language)
      .then(res => setMovie(res))
      .catch(err => console.log(err));
  }, [movieId, language]);

  return (
    <>
      <BackLink />
      {movie && <MovieInfo movie={movie} />}
    </>
  );
};

export default MovieDetails;
