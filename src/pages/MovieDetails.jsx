import BackLink from 'components/BackLink';
import MovieInfo from './../components/MovieInfo/MovieInfo';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieDetails } from 'services/moviesAPI';

const MovieDetails = () => {
  const [movie, setMovie] = useState(null);
  const { movieId } = useParams();

  useEffect(() => {
    getMovieDetails(movieId)
      .then(res => setMovie(res))
      .catch(err => console.log(err));
  }, [movieId]);

  return (
    <>
      <BackLink />
      {movie && <MovieInfo movie={movie} />}
    </>
  );
};

export default MovieDetails;
