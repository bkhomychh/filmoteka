import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import MovieList from 'components/MovieList';
import { getDataFromLocalStorage } from 'services/localStorage';
import type { IMovie } from 'types';

const Bookmarks = () => {
  const [movies, setMovies] = useState<IMovie[]>([]);
  const { t } = useTranslation();

  useEffect(() => {
    const data = getDataFromLocalStorage('movies');

    if (Array.isArray(data)) {
      setMovies(data);
    }
  }, []);

  return (
    <>
      <h1>{t('bookmarks.title')}</h1>
      {movies.length > 0 ? <MovieList movies={movies} /> : <p>{t('bookmarks.message.empty')}</p>}
    </>
  );
};

export default Bookmarks;
