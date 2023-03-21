import 'services/moviesAPI';
import { Routes, Route } from 'react-router-dom';
import SharedLayout from './SharedLayout';

import { lazy } from 'react';

const Home = lazy(() => import('pages/Home'));
const Bookmarks = lazy(() => import('pages/Bookmarks'));
const Search = lazy(() => import('pages/Search'));
const MovieDetails = lazy(() => import('pages/MovieDetails'));

// import Home from 'pages/Home';
// import Bookmarks from 'pages/Bookmarks';
// import Search from 'pages/Search';
// import MovieDetails from 'pages/MovieDetails';

export const App = () => {
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
