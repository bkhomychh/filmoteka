import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { GoSearch } from 'react-icons/go';
import styles from './SearchForm.module.scss';

const SearchForm = ({ updateQueryString }) => {
  const { t } = useTranslation();

  const handleSubmit = evt => {
    evt.preventDefault();

    const inputValue = evt.target.elements.query.value.trim();
    updateQueryString(inputValue);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit} autoComplete="off">
      <input
        className={styles.searchField}
        type="text"
        placeholder={`${t('search.title')}...`}
        name="query"
      />
      <button className={styles.btn} type="submit">
        <GoSearch />
      </button>
    </form>
  );
};

SearchForm.propTypes = {
  updateQueryString: PropTypes.func.isRequired,
};

export default SearchForm;
