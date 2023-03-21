import { useState, useEffect } from 'react';
import { getDataFromLocalStorage } from 'services/localStorage';

import MovieList from 'components/MovieList';

const Bookmarks = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const data = getDataFromLocalStorage('movies');

    setMovies(data);
  }, []);

  return (
    <>
      <h1>Bookmarks</h1>
      {movies.length > 0 ? <MovieList movies={movies} /> : <p>Lets discover</p>}
    </>
  );
};

export default Bookmarks;
