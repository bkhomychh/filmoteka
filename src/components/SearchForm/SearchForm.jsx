import PropTypes from 'prop-types';

import { GoSearch } from 'react-icons/go';
import styles from './SearchForm.module.scss';

const SearchForm = ({ updateQueryString }) => {
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
        placeholder="Search..."
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
