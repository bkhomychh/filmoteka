import { useState, useEffect } from 'react';
import { BiSun, BiMoon } from 'react-icons/bi';
import {
  saveDataToLocalStorage,
  getDataFromLocalStorage,
} from 'services/localStorage';

import styles from './ThemeToggle.module.scss';

const ThemeToggle = () => {
  const [isLight, setIsLight] = useState(() => {
    const data = getDataFromLocalStorage('theme');
    return data?.light ?? false;
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
      {isLight ? <BiSun /> : <BiMoon />}
    </button>
  );
};

export default ThemeToggle;
