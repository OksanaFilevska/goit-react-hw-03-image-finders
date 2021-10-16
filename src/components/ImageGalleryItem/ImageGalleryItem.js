import React from 'react';
// import PropTypes from 'prop-types';

import s from './ImageGalleryItem.module.css';
import Modal from '../Modal';

class ImageGalleryItem extends React.Component {
  state = {
    showModal: false,
    modalImg: '',
    modalAlt: '',
  };

  onOpenModal = e => {
    this.setState({
      modalImg: e.target.dataset.source,
      showModal: true,
      modalAlt: e.target.attributes.alt.textContent,
    });
  };

  onCloseModal = e => {
    if (e.target.nodeName !== 'IMG') {
      this.setState({ showModal: false, modalImg: '', modalAlt: '' });
    }
  };

  render() {
    const { images } = this.props;
    const { showModal, modalImg, modalAlt } = this.state;
    return (
      <>
        {images.map(({ id, webformatURL, tags, largeImageURL }) => {
          return (
            <li className={s.ImageGalleryItem} key={id}>
              <img
                onClick={this.onOpenModal}
                className={s.ImageGalleryItemImage}
                src={webformatURL}
                alt={tags}
                data-source={largeImageURL}
              />
            </li>
          );
        })}

        {showModal && (
          <Modal onCloseModal={this.onCloseModal} modalImg={modalImg} modalAlt={modalAlt} />
        )}
      </>
    );
  }
}

export default ImageGalleryItem;