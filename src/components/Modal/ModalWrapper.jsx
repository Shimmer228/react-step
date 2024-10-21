import React, { useEffect } from 'react';
import './Modal.scss';
import PropTypes from 'prop-types';

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

export default ModalWrapper;
