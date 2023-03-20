import { FaArrowLeft } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';

import styles from './BackLink.module.scss';

const BackLink = () => {
  const location = useLocation();

  return (
    <Link className={styles.link} to={location.state.from}>
      <FaArrowLeft />
      <span>Back</span>
    </Link>
  );
};

export default BackLink;
