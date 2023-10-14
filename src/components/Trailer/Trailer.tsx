import { useState } from 'react';
import PropTypes from 'prop-types';

import { TailSpin } from 'react-loader-spinner';
import styles from './Trailer.module.scss';
import type { ITrailerProps } from './Trailer.types';

const Trailer = ({ movieKey }: ITrailerProps) => {
  const [isLoading, setIsLoading] = useState(true);

  const hideSpinner = () => {
    setIsLoading(false);
  };

  return (
    <>
      {isLoading && (
        <TailSpin wrapperClass={styles.loader} ariaLabel="tail-spin-loading" visible={true} />
      )}
      <iframe
        id="player"
        width="100%"
        height="100%"
        src={`https://www.youtube.com/embed/${movieKey}?autoplay=1`}
        frameBorder="0"
        allowFullScreen
        title="trailer"
        onLoad={hideSpinner}
      ></iframe>
    </>
  );
};

Trailer.propTypes = {
  movieKey: PropTypes.string.isRequired,
};

export default Trailer;
