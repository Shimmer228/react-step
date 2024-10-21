import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import './Modal.scss';
import Button from '../Button/Button';

const ModalWrapper = ({ children, onClose }) => {
  const handleEsc = (event) => {
    if (event.key === 'Escape') {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleEsc, false);
    return () => {
      document.removeEventListener('keydown', handleEsc, false);
    };
  }, [onClose]);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

ModalWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
};

const ModalHeader = ({ children }) => {
  return <div className="modal-header">{children}</div>;
};

ModalHeader.propTypes = {
  children: PropTypes.node.isRequired,
};

const ModalBody = ({ children }) => {
  return <div className="modal-body">{children}</div>;
};

ModalBody.propTypes = {
  children: PropTypes.node.isRequired,
};

const ModalFooter = ({ firstText, secondaryText, firstClick, secondaryClick }) => {
  return (
    <div className="modal-footer">
      {firstText && (
        <Button classNames="primary" onClick={firstClick}>
          {firstText}
        </Button>
      )}
      {secondaryText && (
        <Button classNames="secondary" onClick={secondaryClick}>
          {secondaryText}
        </Button>
      )}
    </div>
  );
};

ModalFooter.propTypes = {
  firstText: PropTypes.string,
  secondaryText: PropTypes.string,
  firstClick: PropTypes.func,
  secondaryClick: PropTypes.func,
};

ModalFooter.defaultProps = {
  firstText: null,
  secondaryText: null,
  firstClick: () => {},
  secondaryClick: () => {},
};

const ModalClose = ({ onClick }) => {
  return (
    <button className="modal-close" onClick={onClick}>
      &times;
    </button>
  );
};

ModalClose.propTypes = {
  onClick: PropTypes.func.isRequired,
};

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
