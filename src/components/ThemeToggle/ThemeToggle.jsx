import { useState, useEffect } from 'react';
import { BiSun, BiMoon } from 'react-icons/bi';
import {
  saveDataToLocalStorage,
  getDataFromLocalStorage,
} from 'services/localStorage';

import styles from './ThemeToggle.module.scss';

const ThemeToggle = () => {
  const [isLight, setIsLight] = useState(() => {
    const theme = getDataFromLocalStorage('theme');
    return theme?.light ?? false;
  });

  useEffect(() => {
    if (isLight) {
      document.body.classList.remove('dark');
      return;
    }

    document.body.classList.add('dark');
  }, [isLight]);

  const toggleTheme = () => {
    setIsLight(state => !state);
    saveDataToLocalStorage('theme', { light: !isLight });
  };

  return (
    <button className={styles.toggle} onClick={toggleTheme}>
      {isLight ? (
        <BiSun className={styles.icon} />
      ) : (
        <BiMoon className={styles.icon} />
      )}
    </button>
  );
};

export default ThemeToggle;
