import { Outlet } from 'react-router-dom';

import styles from './SharedLayout.module.scss';
import Navbar from 'components/Navbar';

const SharedLayout = () => {
  return (
    <>
      <header>
        <div className={styles.container}>
          <Navbar></Navbar>
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
