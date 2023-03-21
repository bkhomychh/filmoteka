import { ThreeDots } from 'react-loader-spinner';

import styles from './PageLoader.module.scss';

const PageLoader = () => {
  return (
    <div className={styles.wrapper}>
      <ThreeDots
        color="inherit"
        secondaryColor="inherit"
        radius="9"
        ariaLabel="mutating-dots-loading"
        wrapperClass={styles.loader}
        visible={true}
      />
    </div>
  );
};

export default PageLoader;
