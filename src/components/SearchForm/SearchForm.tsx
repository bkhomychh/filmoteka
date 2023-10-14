import PropTypes from 'prop-types';
import { ChangeEvent, FormEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { GoSearch } from 'react-icons/go';
import styles from './SearchForm.module.scss';
import type { ISearchFormProps } from './SearchForm.types';

const SearchForm = ({ updateQueryString, searchQuery }: ISearchFormProps) => {
  const [inputValue, setInputValue] = useState(searchQuery ?? '');
  const { t } = useTranslation();

  const handleChange = ({ target }: ChangeEvent<HTMLInputElement>): void => {
    setInputValue(target.value.trim());
  };

  const handleSubmit = (evt: FormEvent): void => {
    evt.preventDefault();
    updateQueryString(inputValue);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit} autoComplete="off">
      <input
        className={styles.searchField}
        type="text"
        placeholder={`${t('search.title')}...`}
        name="query"
        value={inputValue}
        onChange={handleChange}
      />
      <button className={styles.btn} type="submit">
        <GoSearch />
      </button>
    </form>
  );
};

SearchForm.propTypes = {
  updateQueryString: PropTypes.func.isRequired,
  searchQuery: PropTypes.string,
};

export default SearchForm;
