import { useState, useEffect } from 'react';

import SearchForm from 'components/SearchForm/';
import MovieList from 'components/MovieList';
import { getMoviesBySearchQuery } from 'services/moviesAPI';
import { useSearchParams } from 'react-router-dom';

const Search = () => {
  const [movies, setMovies] = useState([]);
  const [searchParamas, setSearchParamas] = useSearchParams();
  const searchQuery = searchParamas.get('query');

  useEffect(() => {
    if (!searchQuery) {
      return;
    }

    getMoviesBySearchQuery(searchQuery)
      .then(res => setMovies(res))
      .catch(err => console.log(err));
  }, [searchQuery]);

  const updateQueryString = query => {
    const newParams = query ? { query } : {};
    setSearchParamas(newParams);
  };

  return (
    <>
      <h1>Search</h1>
      <SearchForm updateQueryString={updateQueryString} />
      {movies.length > 0 && <MovieList movies={movies} />}
    </>
  );
};

export default Search;
