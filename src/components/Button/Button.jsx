import PropTypes from 'prop-types';

const Button = ({ handleClick, children }) => {
  return <button onClick={handleClick}>{children}</button>;
};

Button.propTypes = {
  handleClick: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]).isRequired,
};

export default Button;
