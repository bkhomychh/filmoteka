import { useTranslation } from 'react-i18next';
import { FaArrowLeft } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';

import styles from './BackLink.module.scss';

const BackLink = () => {
  const location = useLocation();
  const { t } = useTranslation();

  return (
    <Link className={styles.link} to={location.state.from}>
      <FaArrowLeft />
      <span>{t('common.backLink')}</span>
    </Link>
  );
};

export default BackLink;
