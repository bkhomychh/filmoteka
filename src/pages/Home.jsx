import { useEffect, useState } from 'react';

import MovieCarousel from 'components/MovieCarousel';
import { getGenreList } from 'services/moviesAPI';
import { useTranslation } from 'react-i18next';

const Home = () => {
  const [genres, setGenres] = useState([]);
  const {
    t,
    i18n: { language },
  } = useTranslation();

  const TRENDING = t('home.additional_genre.trending');

  useEffect(() => {
    getGenreList(language).then(res => {
      const newGenres = res.map(genre => genre);
      setGenres(newGenres);
    });
  }, [language]);

  return (
    <>
      <MovieCarousel genre={{ name: TRENDING }} />
      {genres.length > 0 &&
        genres.map(genre => <MovieCarousel key={genre.id} genre={genre} />)}
    </>
  );
};

export default Home;
