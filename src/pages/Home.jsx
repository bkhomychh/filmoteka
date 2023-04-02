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

  const { data } = useQuery({
    queryKey: ['genres'],
    queryFn: () => {
      return getGenreList(language);
    },

    refetchInterval: 5 * 60 * 1000,
    keepPreviousData: true,

    onSuccess: data => {
      console.log(data);
    },
  });

  return (
    <>
      <MovieCarousel genre={{ name: TRENDING }} />
      {data?.length > 0 &&
        data.map(genre => <MovieCarousel key={genre.id} genre={genre} />)}
    </>
  );
};

export default Home;
