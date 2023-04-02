import { Suspense, useEffect } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import Navbar from 'components/Navbar';
import ThemeToggle from 'components/ThemeToggle';
import PageLoader from 'components/PageLoader';
import LangToggle from 'components/LangToggle';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import SimpleBar from 'simplebar';
import 'simplebar/dist/simplebar.css';

import { BsGithub } from 'react-icons/bs';
import { BiMoviePlay } from 'react-icons/bi';
import styles from './SharedLayout.module.scss';

const rootContainer = document.getElementById('root');

const SharedLayout = () => {
  const { t } = useTranslation();

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
          <LangToggle />
        </div>
      </header>
      <main className={styles.main}>
        <div className={styles.container}>
          <Suspense fallback={<PageLoader />}>
            <Outlet />
          </Suspense>
        </div>
      </main>
      <footer className={styles.footer}>
        <div className={styles.container}>
          <p className={styles.mark}>
            <span>{t('common.sign')}</span>&nbsp;
            <a
              href="https://github.com/bkhomychh"
              target="_blank"
              rel="noopener noreferrer nofollow"
            >
              bkhomychh
              <BsGithub />
            </a>
          </p>
        </div>
      </footer>
      <ToastContainer autoClose={3500} limit={3} theme="colored" />
    </>
  );
};

export default SharedLayout;
