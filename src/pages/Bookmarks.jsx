import { useState, useEffect } from 'react';
import { getDataFromLocalStorage } from 'services/localStorage';

import MovieList from 'components/MovieList';
import { useTranslation } from 'react-i18next';

const Bookmarks = () => {
  const [movies, setMovies] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    const data = getDataFromLocalStorage('movies');
    data && setMovies(data);
  }, []);

  return (
    <>
      <h1>{t('bookmarks.title')}</h1>
      {movies.length > 0 ? (
        <MovieList movies={movies} />
      ) : (
        <p>{t('bookmarks.message.empty')}</p>
      )}
    </>
  );
};

export default Bookmarks;
