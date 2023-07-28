import css from './Modal.module.css';
import PropTypes from 'prop-types';

export const Modal = ({ closeModal, data: { img, alt } }) => {
  return (
    <div className={css.overlay} onClick={closeModal}>
      <div className={css.modal}>
        <img src={img} alt={alt} />
      </div>
    </div>
  );
};

Modal.propTypes = {
  img: PropTypes.string,
  alt: PropTypes.string,
  closeModal: PropTypes.func,
};
export default Modal;
