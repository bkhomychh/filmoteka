import { Outlet, Link } from 'react-router-dom';
import { BiMoviePlay } from 'react-icons/bi';

import styles from './SharedLayout.module.scss';
import Navbar from 'components/Navbar';
import ThemeToggle from 'components/ThemeToggle';

const SharedLayout = () => {
  return (
    <>
      <header className={styles.header}>
        <div className={`${styles.container} ${styles.wrapper}`}>
          <Link className={styles.logo} to="/">
            <BiMoviePlay />
            Filmoteka
          </Link>
          <Navbar />
          <ThemeToggle />
        </div>
      </header>
      <main>
        <div className={styles.container}>
          <Outlet />
        </div>
      </main>
      <footer>
        <div className={styles.container}></div>
      </footer>
    </>
  );
};

export default SharedLayout;
