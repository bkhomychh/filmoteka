import { NavLink } from 'react-router-dom';
import { IoHome } from 'react-icons/io5';
import { GoSearch } from 'react-icons/go';
import { FaBookmark, FaRegBookmark } from 'react-icons/fa';

import styles from './Navbar.module.scss';

const Navbar = () => {
  return (
    <nav className={styles.nav}>
      <ul className={styles.list}>
        <li>
          <NavLink className={styles.link} to="/">
            <IoHome />
            Home
          </NavLink>
        </li>
        <li>
          <NavLink className={styles.link} to="search">
            <GoSearch />
            Search
          </NavLink>
        </li>
        <li>
          <NavLink className={styles.link} to="bookmarks">
            <FaBookmark />
            Bookmarks
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
