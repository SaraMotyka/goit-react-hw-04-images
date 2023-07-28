import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Notiflix from 'notiflix';

import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';

export const App = () => {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [value, setValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const [modalData, setModalData] = useState({});
  const [showLoadMore, setShowLoadMore] = useState(false);

  const request = {
    API: 'https://pixabay.com/api/',
    KEY: '36940182-0da281a971cf517379f0112d8',
    per_page: 12,
  };

  const onSubmit = e => {
    e.preventDefault();
    const value = e.target.search.value;

    if (value.trim()) {
      setValue(value.trim());
      setPage(1);
      setImages([]);
    } else {
      Notiflix.Notify.failure('The field cannot be empty.');
    }
  };

  const fetchImages = async () => {
    const { API, KEY, per_page } = request;

    const searchParams = new URLSearchParams({
      q: value,
      page: page,
      key: KEY,
      image_type: 'photo',
      orientation: 'horizontal',
      per_page: per_page,
    });

    setIsLoading(true);
    try {
      const response = await axios.get(`${API}/?${searchParams}`);
      if (!response.data.totalHits) {
        setShowLoadMore(false);
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      } else {
        if (page === 1) {
          setImages([...response.data.hits]);
          Notiflix.Notify.info(
            `Hooray! We found ${response.data.totalHits} images.`
          );
        } else {
          setImages(prevImages => [...prevImages, ...response.data.hits]);
        }
        if (per_page * page >= response.data.totalHits) {
          setShowLoadMore(false);
          Notiflix.Notify.warning(
            "We're sorry, but you've reached the end of search results."
          );
        } else {
          setShowLoadMore(true);
        }
      }
    } catch (error) {
      setShowLoadMore(false);
      Notiflix.Notify.failure(
        'Sorry, some error on the server. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (value !== '') {
      fetchImages();
    }
  }, [page, value]);

  const onClick = () => {
    setPage(prevPage => prevPage + 1);
  };

  const onClickImage = e => {
    document.addEventListener('keydown', keyDown);
    setModalData({
      img: e.target.dataset.bgimage,
      alt: e.target.dataset.alt,
    });
    setIsModal(!isModal);
  };

  const keyDown = e => {
    if (e.code === 'Escape') {
      document.removeEventListener('keydown', keyDown);
      setIsModal(!isModal);
      setModalData({});
    }
  };

  const closeModal = e => {
    if (e.target === e.currentTarget) {
      document.removeEventListener('keydown', keyDown);
      setIsModal(!isModal);
      setModalData({});
    }
  };

  return (
    <>
      <Searchbar onSubmit={onSubmit} />
      <ImageGallery images={images} onClickImage={onClickImage} />
      {images[0] && showLoadMore && !isLoading && <Button onClick={onClick} />}
      {isLoading && <Loader />}
      {isModal && <Modal data={modalData} closeModal={closeModal} />}
    </>
  );
};

export default App;
