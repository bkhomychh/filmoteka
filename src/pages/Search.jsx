import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import SearchForm from 'components/SearchForm/';
import MovieList from 'components/MovieList';
import MovieLoaderList from 'components/MovieLoaderList';
import { getMoviesBySearchQuery } from 'services/moviesAPI';
import { STATUS } from 'utils/constants';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Search = () => {
  const [status, setStatus] = useState(STATUS.IDLE);
  const [movies, setMovies] = useState([]);
  const [searchParamas, setSearchParamas] = useSearchParams();
  const searchQuery = searchParamas.get('query');

  const { t } = useTranslation();

  useEffect(() => {
    if (!searchQuery) {
      return;
    }

    const noticeOptions = {
      position: 'top-right',
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      progress: undefined,
      theme: 'light',
    };

    setStatus(STATUS.PENDING);
    getMoviesBySearchQuery(searchQuery)
      .then(res => {
        setMovies(res);
        setStatus(STATUS.RESOLVED);
        res.length < 1 &&
          toast.error(
            `Sorry, I couldn't find the movies you requested :(`,
            noticeOptions
          );
      })
      .catch(err => {
        toast.error(err.message, noticeOptions);
        setStatus(STATUS.REJECTED);
      });
  }, [searchQuery]);

  const updateQueryString = query => {
    const newParams = query ? { query } : {};
    setSearchParamas(newParams);
  };

  return (
    <>
      <h1>{t('search.title')}</h1>
      <SearchForm updateQueryString={updateQueryString} />
      {status === STATUS.PENDING && <MovieLoaderList />}
      {status === STATUS.RESOLVED && movies.length > 0 && (
        <MovieList movies={movies} />
      )}
      {status === STATUS.RESOLVED && Number(movies.length) === 0 && (
        <p>{t('search.message.failure')}</p>
      )}
      {status === STATUS.REJECTED && <p>{t('search.message.error')}</p>}
    </>
  );
};

export default Search;