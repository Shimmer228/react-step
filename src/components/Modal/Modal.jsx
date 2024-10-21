// src/components/Modal.jsx
import React from 'react';
import ModalWrapper from './ModalWrapper';
import ModalHeader from './ModalHeader';
import ModalBody from './ModalBody';
import ModalFooter from './ModalFooter';
import ModalClose from './ModalClose';
import PropTypes from 'prop-types';

const Modal = ({ isOpen, onClose, title, children, footer, product }) => {
  if (!isOpen) return null;

  return (
    <ModalWrapper onClose={onClose}>
      <ModalHeader>
        {title}
        <ModalClose onClick={onClose} />
      </ModalHeader>
      <ModalBody>
        {product && (
          <div>
            <h2>{product.name}</h2>
            <img src={product.imageUrl} alt={product.name} />
            <h3>{product.price}$</h3>
          </div>
        )}
        {children}
      </ModalBody>
      {footer && <ModalFooter {...footer} />}
    </ModalWrapper>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.node.isRequired,
  children: PropTypes.node.isRequired,
  footer: PropTypes.shape({
    firstText: PropTypes.string,
    secondaryText: PropTypes.string,
    firstClick: PropTypes.func,
    secondaryClick: PropTypes.func,
  }),
  product: PropTypes.object,
};

Modal.defaultProps = {
  footer: null,
  product: null,
};

export default Modal;
