import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

// import { BiSun, BiMoon } from 'react-icons/bi';
// import {
//   saveDataToLocalStorage,
//   getDataFromLocalStorage,
// } from 'services/localStorage';

// import styles from './LangToggle.module.scss';

const LangToggle = () => {
  const { i18n } = useTranslation();

  useEffect(() => {}, []);

  const handleChange = ({ target }) => {
    console.log(i18n.language);
    i18n.changeLanguage(target.value);
  };

  return (
    <select onChange={handleChange} value={i18n.language}>
      <option value="en">English</option>
      <option value="uk">Українська</option>
      <option value="pl">Polski</option>
    </select>
  );
};

export default LangToggle;
