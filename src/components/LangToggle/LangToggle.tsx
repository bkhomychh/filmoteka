import { MouseEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MdKeyboardArrowDown } from 'react-icons/md';

import { LANGUAGE } from 'utils/constants';
import Button from 'components/Button';
import styles from './LangToggle.module.scss';

const LangToggle = () => {
  const [isLangListShown, setIsLangListShown] = useState(false);
  const { i18n } = useTranslation();

  const hideLangList = (): void => {
    setIsLangListShown(false);
  };

  const toggleLangList = (): void => {
    setIsLangListShown(state => !state);

    // adding an event listener to hide the language list on click
    if (!isLangListShown) {
      setTimeout(() => {
        window.addEventListener('click', hideLangList, { once: true });
      }, 0);
    }
  };

  const changeCurrentLang = ({ currentTarget }: MouseEvent<HTMLButtonElement>) => {
    const newLang = currentTarget.dataset.lang || '';
    i18n.changeLanguage(newLang);
    localStorage.setItem('lang', newLang);
    hideLangList();
  };

  return (
    <>
      <div className={styles.lang}>
        <Button handleClick={toggleLangList}>
          {LANGUAGE[i18n.language.toUpperCase()].original}
          <MdKeyboardArrowDown />
        </Button>

        <ul className={`${styles.langList} ${isLangListShown ? styles.shown : ''}`}>
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
      </div>
    </>
  );
};

export default LangToggle;
