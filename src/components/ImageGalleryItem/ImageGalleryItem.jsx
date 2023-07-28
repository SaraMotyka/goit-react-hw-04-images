import css from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

export const ImageGalleryItem = ({
  onClickImage,
  item: { webformatURL, tags, largeImageURL },
}) => {
  return (
    <div>
      <li className={css.gallery__item}>
        <img
          className={css.gallery__image}
          width="300px"
          src={webformatURL}
          alt={tags}
          onClick={onClickImage}
          data-bgimage={largeImageURL}
          data-alt={tags}
        />
      </li>
    </div>
  );
};

ImageGalleryItem.propTypes = {
  largeImageURL: PropTypes.string,
  webformatURL: PropTypes.string,
  tags: PropTypes.string,
  onClickImage: PropTypes.func,
};

export default ImageGalleryItem;
