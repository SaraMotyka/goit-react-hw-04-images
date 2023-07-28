import css from './Button.module.css';
import PropTypes from 'prop-types';

export const Button = ({ onClick }) => {
  return (
    <div className={css.btn__container}>
      <button className={css.button} type="button" onClick={onClick}>
        Load more
      </button>
    </div>
  );
};

Button.propTypes = {
  onClick: PropTypes.func,
};
export default Button;
