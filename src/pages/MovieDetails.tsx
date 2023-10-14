import { useParams } from 'react-router-dom';
import { getMovieDetails } from 'services/moviesAPI';
import { useTranslation } from 'react-i18next';

import BackLink from 'components/BackLink';
import MovieInfo from 'components/MovieInfo';
import { useQuery } from '@tanstack/react-query';

const MovieDetails = () => {
  const { movieId } = useParams();
  const {
    i18n: { language },
  } = useTranslation();

  const fetchDetails = async () => {
    if (!movieId) {
      return;
    }
    return getMovieDetails(movieId, language);
  };

  const { data: movie } = useQuery({
    queryKey: ['movie', movieId, language],
    queryFn: fetchDetails,
    enabled: !!movieId,
  });

  return (
    <>
      <BackLink />
      {movie && <MovieInfo movie={movie} />}
    </>
  );
};

export default MovieDetails;
