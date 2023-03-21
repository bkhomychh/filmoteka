import { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

import SharedLayout from 'components/SharedLayout';
import 'services/moviesAPI';

const Home = lazy(() => import('pages/Home'));
const Bookmarks = lazy(() => import('pages/Bookmarks'));
const Search = lazy(() => import('pages/Search'));
const MovieDetails = lazy(() => import('pages/MovieDetails'));

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<SharedLayout />}>
        <Route index element={<Home />} />
        <Route path="search" element={<Search />} />
        <Route path="search/:movieId" element={<MovieDetails />} />
        <Route path="bookmarks" element={<Bookmarks />} />
      </Route>
    </Routes>
  );
};

export default App;
