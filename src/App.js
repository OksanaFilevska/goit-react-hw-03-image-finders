import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import Container from './components/Container/Container';
import Searchbar from './components/Searchbar';
import ImageGallery from './components/ImageGallery';

export default class App extends Component {
  state = {
    searchQuery: '',
  };

  handleFormSubmit = searchQuery => {
    this.setState({ searchQuery: searchQuery });
  };

  render() {
    return (
      <Container>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery searchQuery={this.state.searchQuery} />

        <ToastContainer autoClose={3000} />
      </Container>
    );
  }
}
