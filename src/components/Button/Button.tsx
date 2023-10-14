import PropTypes from 'prop-types';

import styles from './Button.module.scss';
import type { IButtonProps } from './Button.types';

const Button = ({ handleClick, children }: IButtonProps) => {
  return (
    <button className={styles.btn} onClick={handleClick}>
      {children}
    </button>
  );
};

Button.propTypes = {
  handleClick: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]).isRequired,
};

export default Button;
