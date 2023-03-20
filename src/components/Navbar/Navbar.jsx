import { NavLink } from 'react-router-dom';
import { IoHomeOutline } from 'react-icons/io5';
import { GoSearch } from 'react-icons/go';
import { FaRegBookmark, FaBookmark } from 'react-icons/fa';

import styles from './Navbar.module.scss';

const Navbar = () => {
  return (
    <nav className={styles.nav}>
      <ul className={styles.list}>
        <li>
          <NavLink className={styles.link} to="/">
            <IoHomeOutline />
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
            <FaRegBookmark />
            {/* <FaBookmark /> */}
            Bookmarks
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
