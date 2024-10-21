import React from 'react';
import ModalWrapper from './ModalWrapper';
import ModalHeader from './ModalHeader';
import ModalBody from './ModalBody';
import ModalFooter from './ModalFooter';
import ModalClose from './ModalClose';
import PropTypes from 'prop-types';

const Modal = ({ isOpen, onClose, title, children, footer }) => {
  if (!isOpen) return null;

  return (
    <ModalWrapper onClose={onClose}>
      <ModalHeader>
        {title}
        <ModalClose onClick={onClose} />
      </ModalHeader>
      <ModalBody>{children}</ModalBody>
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
};

Modal.defaultProps = {
  footer: null,
};

export default Modal;
