import PropTypes from 'prop-types';

import styles from './Button.module.scss';

const Button = ({ handleClick, children }) => {
  return (
    <button className={styles.btn} onClick={handleClick}>
      {children}
    </button>
  );
};

Button.propTypes = {
  handleClick: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]).isRequired,
};

export default Button;
