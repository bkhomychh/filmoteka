import MovieCarousel from 'components/MovieCarousel';
import { getGenreList } from 'services/moviesAPI';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';

const Home = () => {
  const {
    t,
    i18n: { language },
  } = useTranslation();

  const TRENDING = t('home.additional_genre.trending');

  const { data: genres } = useQuery({
    queryKey: ['genres'],
    queryFn: () => {
      return getGenreList(language);
    },
  });

  return (
    <>
      <MovieCarousel genre={{ name: TRENDING }} />
      {genres?.length && genres.map(genre => <MovieCarousel key={genre.id} genre={genre} />)}
    </>
  );
};

export default Home;
