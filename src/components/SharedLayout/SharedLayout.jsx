import { Suspense } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { BiMoviePlay } from 'react-icons/bi';

import styles from './SharedLayout.module.scss';
import Navbar from 'components/Navbar';
import ThemeToggle from 'components/ThemeToggle';
import PageLoader from 'components/PageLoader';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// import 'simplebar'; // or "import SimpleBar from 'simplebar';" if you want to use it manually.
import SimpleBar from 'simplebar';
import 'simplebar/dist/simplebar.css';
import { useEffect } from 'react';

const rootContainer = document.getElementById('root');

const SharedLayout = () => {
  useEffect(() => {
    if (rootContainer.hasAttribute('data-simplebar')) {
      return;
    }

    new SimpleBar(rootContainer);
  }, []);

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
          <Suspense fallback={<PageLoader />}>
            <Outlet />
          </Suspense>
        </div>
      </main>
      <footer>
        <div className={styles.container}></div>
      </footer>
      <ToastContainer />
    </>
  );
};

export default SharedLayout;
