import React from 'react';
import { Component } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';

import s from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {
  static propTypes = {
    onCloseModal: PropTypes.func.isRequired,
    modalImg: PropTypes.string.isRequired,
    modalAlt: PropTypes.string.isRequired,
  };

  componentDidMount() {
    window.addEventListener('keydown', this.onKeyDown);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.onKeyDown);
  }

  onKeyDown = e => {
    if (e.key === 'Escape') {
      this.props.onCloseModal(e);
    }
  };

  handleBackdropClick = event => {
    if (event.currentTarget === event.target) {
      this.props.onCloseModal();
    }
  };

  render() {
    return createPortal(
      <div onClick={this.props.onCloseModal} className={s.Overlay}>
        <div className={s.Modal}>
          <img src={this.props.modalImg} alt={this.props.modalAlt} />
        </div>
      </div>,
      modalRoot,
    );
  }
}
Modal.propTypes = {
  onKeyDown: PropTypes.func,
};
export default Modal;