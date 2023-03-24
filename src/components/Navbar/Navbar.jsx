import { NavLink } from 'react-router-dom';

import { IoHome } from 'react-icons/io5';
import { GoSearch } from 'react-icons/go';
import { FaBookmark } from 'react-icons/fa';

import styles from './Navbar.module.scss';

import { useTranslation } from 'react-i18next';

const Navbar = () => {
  const { t } = useTranslation();

  return (
    <nav className={styles.nav}>
      <ul className={styles.list}>
        <li>
          <NavLink className={styles.link} to="/">
            <IoHome />
            {t('home.title')}
          </NavLink>
        </li>
        <li>
          <NavLink className={styles.link} to="search">
            <GoSearch />
            {t('search.title')}
          </NavLink>
        </li>
        <li>
          <NavLink className={styles.link} to="bookmarks">
            <FaBookmark />
            {t('bookmarks.title')}
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
