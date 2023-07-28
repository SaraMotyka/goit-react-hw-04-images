import css from './Searchbar.module.css';
import PropTypes from 'prop-types';
import { SlMagnifier } from 'react-icons/sl';

export const Searchbar = ({ onSubmit }) => {
  return (
    <div>
      <header className={css.searchbar}>
        <form className={css.form} onSubmit={onSubmit}>
          <button type="submit" className={css.button__search}>
            <span className={css.button__label}>
              <SlMagnifier />
            </span>
          </button>

          <input
            className={css.input}
            type="text"
            name="search"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    </div>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func,
};

export default Searchbar;
