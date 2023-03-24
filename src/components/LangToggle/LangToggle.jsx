import { useTranslation } from 'react-i18next';
import { LANGUAGE } from 'utils/constants';
import Button from 'components/Button';

import { MdKeyboardArrowDown } from 'react-icons/md';
// import {
//   saveDataToLocalStorage,
//   getDataFromLocalStorage,
// } from 'services/localStorage';

import styles from './LangToggle.module.scss';
import { useState } from 'react';

const LangToggle = () => {
  const [isLangListShown, setIsLangListShown] = useState(false);
  const { i18n } = useTranslation();

  const hideLangList = () => {
    setIsLangListShown(false);
  };

  const toggleLangList = () => {
    setIsLangListShown(state => !state);
    if (!isLangListShown) {
      setTimeout(() => {
        window.addEventListener('click', hideLangList, { once: true });
      }, 0);
    }
  };

  const changeCurrentLang = ({ target }) => {
    const newLang = target.dataset.lang;
    i18n.changeLanguage(newLang);
    hideLangList();
  };

  return (
    <>
      <div className={styles.lang}>
        <Button handleClick={toggleLangList}>
          {LANGUAGE[i18n.language.toUpperCase()].original}
          <MdKeyboardArrowDown />
        </Button>
        {isLangListShown && (
          <ul className={styles.langList}>
            <li>
              <button
                className={styles.langBtn}
                data-lang={LANGUAGE.EN.short}
                onClick={changeCurrentLang}
              >
                {LANGUAGE.EN.original}
              </button>
            </li>
            <li>
              <button
                className={styles.langBtn}
                data-lang={LANGUAGE.UK.short}
                onClick={changeCurrentLang}
              >
                {LANGUAGE.UK.original}
              </button>
            </li>
            <li>
              <button
                className={styles.langBtn}
                data-lang={LANGUAGE.PL.short}
                onClick={changeCurrentLang}
              >
                {LANGUAGE.PL.original}
              </button>
            </li>
          </ul>
        )}
      </div>
    </>
  );
};

export default LangToggle;
