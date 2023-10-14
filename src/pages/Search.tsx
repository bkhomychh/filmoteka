import { useState, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { toast, Id as ToastId } from 'react-toastify';
import { useQuery } from '@tanstack/react-query';

import SearchForm from 'components/SearchForm/';
import MovieList from 'components/MovieList';
import PageLoader from 'components/PageLoader';
import { getMoviesBySearchQuery } from 'services/moviesAPI';
import { STATUS } from 'types';

type SearchParams = { query: string } | {};

const Search = () => {
  const [status, setStatus] = useState(STATUS.IDLE);
  const toastId = useRef<ToastId>();

  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get('query') || '';

  const {
    t,
    i18n: { language },
  } = useTranslation();

  const fetchSearchResult = () => {
    if (!searchQuery) {
      return [];
    }
    setStatus(STATUS.PENDING);
    return getMoviesBySearchQuery(searchQuery, language);
  };

  const { data: movies = [] } = useQuery({
    queryKey: ['movie', searchQuery, language],
    queryFn: fetchSearchResult,
    onSuccess: data => {
      setStatus(STATUS.RESOLVED);
      // removing duplicate notifications
      if (Number(data?.length) < 1 && toastId?.current && !toast.isActive(toastId?.current)) {
        toastId.current = toast.error(t('search.message.failure'));
      }
    },
    onError: (err: Error) => {
      if (toastId?.current && !toast.isActive(toastId?.current)) {
        toastId.current = toast.error(err?.message);
      }
      setStatus(STATUS.REJECTED);
    },
  });

  const updateQueryString = (query: string) => {
    const newParams: SearchParams = query ? { query } : {};
    setSearchParams(newParams);
  };

  return (
    <>
      <h1>{t('search.title')}</h1>
      <SearchForm updateQueryString={updateQueryString} searchQuery={searchQuery} />
      {status === STATUS.PENDING && <PageLoader />}
      {status === STATUS.RESOLVED && Number(movies?.length) > 0 && <MovieList movies={movies} />}
      {status === STATUS.RESOLVED && Number(movies?.length) === 0 && (
        <p>{t('search.message.failure')}</p>
      )}
      {status === STATUS.REJECTED && <p>{t('search.message.error')}</p>}
    </>
  );
};

export default Search;
