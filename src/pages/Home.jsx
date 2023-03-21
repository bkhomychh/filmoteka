import { useEffect, useState } from 'react';

import MovieCarousel from 'components/MovieCarousel';
import { getGenreList } from 'services/moviesAPI';
import { GENRE } from 'utils/constants';

const Home = () => {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    getGenreList().then(res => {
      const newGenres = res.map(genre => genre);
      setGenres(newGenres);
    });
  }, []);

  return (
    <>
      <MovieCarousel genre={{ name: GENRE.TRENDING }} />
      {genres.length > 0 &&
        genres.map(genre => <MovieCarousel key={genre.id} genre={genre} />)}
    </>
  );
};

export default Home;
