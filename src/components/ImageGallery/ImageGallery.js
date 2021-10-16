import { Component } from 'react';
import s from './ImageGallery.module.css';
import ImageGalleryItem from '../ImageGalleryItem';
import Loader from '../Loader';
import SerchErrorView from '../SerchErrorView';
import Button from '../Button';
import { fetchPixabay } from '../../services/pixabay-api.js';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export default class ImageGallery extends Component {
  state = {
    images: [],
    error: null,
    status: Status.IDLE,
    page: 1,
  };

  componentDidUpdate(prevProps, prevState) {
    const prevName = prevProps.searchQuery;
    const nextName = this.props.searchQuery;
    if (prevName !== nextName) {
      this.setState({ status: Status.PENDING });

      fetchPixabay(nextName, 1).then(result => {
        if (result.hits.length !== 0) {
          return this.setState({
            images: result.hits,
            status: 'resolved',
            page: 1,
          });
        }

        return this.setState({ images: result.hits, status: 'rejected' });
      });
    }
  }

  onLoadMore = () => {
    const nextName = this.props.searchQuery;
    const { page } = this.state;
    this.setState({ status: 'pending' });

    fetchPixabay(nextName, page + 1)
      .then(result => {
        return this.setState(prevState => {
          return {
            images: [...prevState.images, ...result.hits],
            status: 'resolved',
            page: prevState.page + 1,
          };
        });
      })
      .finally(() => {
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'smooth',
        });
      });
  };

  render() {
    const { images, status } = this.state;

    const { searchQuery } = this.props;

    if (status === 'idle') {
      return <div className={s.idle}>Введите имя изображения.</div>;
    }

    if (status === 'pending') {
      return (
        <>
          <ul className={s.ImageGallery} id="imagesList">
            <ImageGalleryItem images={images} />
          </ul>
          <Loader />
        </>
      );
    }

    if (status === 'rejected') {
      return <SerchErrorView message={searchQuery} />;
    }

    if (status === 'resolved') {
      return (
        <>
          <ul className={s.ImageGallery} id="imagesList">
            <ImageGalleryItem images={images} />
          </ul>
          <Button onLoadMore={this.onLoadMore} />
        </>
      );
    }
  }
}