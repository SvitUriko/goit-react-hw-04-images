import { useState } from 'react';
import { ModalWindow } from 'components/Modal/Modal';

import css from './ImageGalleryItem.module.css'


export const ImageGalleryItem = ({
 image: { largeImageURL, webformatURL, name }
  }) => {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleModal = () => setIsModalOpen(!isModalOpen);

    return (
        <>
          <img
            className={css.image}
            src={webformatURL}
            alt={name}
            onClick={toggleModal}
          />
         <ModalWindow isOpen={isModalOpen} isClose={toggleModal}>
            <img  className={css.imageModal} src={largeImageURL} alt={name} />
          </ModalWindow>
        </>
           
      );
}