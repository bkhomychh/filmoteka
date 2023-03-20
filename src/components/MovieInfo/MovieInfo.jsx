import { IMAGE_BASE_URL } from 'utils/constants';

const MovieInfo = ({ movie }) => {
  const {
    id,
    title,
    genres,
    overview,
    poster_path,
    release_date,
    vote_average,
  } = movie;

  return (
    <>
      <h1>{title}</h1>
      <img src={IMAGE_BASE_URL + poster_path} alt={title} />
    </>
  );
};

export default MovieInfo;
