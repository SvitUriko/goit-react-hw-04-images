import React, { useState, useEffect } from 'react';
import { fetchImages } from 'api';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loading } from './Loader/Loader';

import css from './App.module.css';

export const App = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(1);

  const changeQuery = (newQuery) => {
    if (!newQuery.trim()) {
      console.error("The 'Search images and photos' field cannot be empty. Enter your search query.");
      return;
    }
    setQuery(`${Date.now()}/${newQuery}`);
    setImages([]);
    setPage(1);
    setLoading(false);
    setTotal(1);
  };

  useEffect(() => {
    const fetchNewImages = async () => {
      try {
        setLoading(true);

        const dividerPosition = query.indexOf('/');
        const actualQuery = query.slice(dividerPosition + 1);
        const data = await fetchImages(actualQuery, page);
        const { totalHits, hits } = data;
        
        if (!hits.length) {
          console.warn("Oops! We couldn't find any images for your search. Please give it another try.");
          return;
        }
          setImages(prevState => [...prevState, ...hits]);
          setTotal(totalHits);
      } catch (error) {
        console.error("Oops! Trouble fetching images: ", error);
      } finally {
        setLoading(false);
      }
    };

    if (query) {
      fetchNewImages();
    }
  }, [query, page]);

  const handleLoadMore = () => {
    setPage(prevState => prevState + 1);
  };

  const limit = Math.ceil(total / 12);

  return (
    <div className={css.app}>
      <Searchbar onSubmit={changeQuery} />
      {images.length > 0 && <ImageGallery images={images} />}
      {loading && <Loading />}
      {images.length > 0 && page !== limit && <Button onClick={handleLoadMore} />}
    </div>
  );
};

