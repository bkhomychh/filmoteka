import { lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import SharedLayout from 'components/SharedLayout';

const Home = lazy(() => import('pages/Home'));
const Bookmarks = lazy(() => import('pages/Bookmarks'));
const Search = lazy(() => import('pages/Search'));
const MovieDetails = lazy(() => import('pages/MovieDetails'));
const Cast = lazy(() => import('components/Cast'));
const Reviews = lazy(() => import('components/Reviews'));

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<SharedLayout />}>
        <Route index element={<Home />} />
        <Route path="search" element={<Search />} />
        <Route path="search/:movieId" element={<MovieDetails />}>
          <Route path="cast" element={<Cast />} />
          <Route path="reviews" element={<Reviews />} />
        </Route>
        <Route path="bookmarks" element={<Bookmarks />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
};

export default App;
