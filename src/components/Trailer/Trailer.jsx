import { useState } from 'react';
import PropTypes from 'prop-types';

import { TailSpin } from 'react-loader-spinner';
import styles from './Trailer.module.scss';

const Trailer = ({ movieKey }) => {
  const [isLoading, setIsLoading] = useState(true);

  const hideSpinner = () => {
    setIsLoading(false);
  };

  return (
    <>
      {isLoading && (
        <TailSpin
          wrapperClass={styles.loader}
          ariaLabel="tail-spin-loading"
          visible={true}
        />
      )}
      <iframe
        id="player"
        type="text/html"
        width="100%"
        height="100%"
        src={`https://www.youtube.com/embed/${movieKey}?autoplay=1`}
        frameBorder="0"
        allowFullScreen
        title="trailer"
        onLoad={hideSpinner}
        controls={false}
      ></iframe>
    </>
  );
};

Trailer.propTypes = {
  movieKey: PropTypes.string.isRequired,
};

export default Trailer;
