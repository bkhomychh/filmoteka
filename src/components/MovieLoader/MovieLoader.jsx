import ContentLoader from 'react-content-loader';

import styles from './MovieLoader.module.scss';

const MovieLoader = props => (
  <ContentLoader
    className={styles.loader}
    width="100%"
    height="100%"
    speed={1.5}
    interval={0.25}
    viewBox="0 0 160 360"
    backgroundColor="#f3f3f3"
    foregroundColor="#e7e7e7"
    title="Movie skeleton"
    {...props}
  >
    <rect x="0" y="3" rx="0" ry="0" width="100%" height="200" />
    <rect x="0" y="215" rx="0" ry="0" width="100%" height="18" />
    <rect x="0" y="240" rx="0" ry="0" width="40%" height="18" />
  </ContentLoader>
);

export default MovieLoader;
