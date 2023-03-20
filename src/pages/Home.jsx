import MovieCarousel from 'components/MovieCarousel';
import { GENRE } from 'utils/constants';
import { useEffect, useState } from 'react';
import { getGenreList } from 'services/moviesAPI';

const Home = () => {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    getGenreList().then(res => {
      const newGenres = res.map(genre => genre.name.toLowerCase());
      setGenres(newGenres);
    });
  }, []);

  // useEffect(() => { }, [genres])

  return (
    <>
      <MovieCarousel genreName={GENRE.TRENDING} />
      <MovieCarousel genreName={GENRE.ACTION} />
    </>
  );
};

export default Home;
