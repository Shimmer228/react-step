import React from 'react';
import './Modal.scss';
import PropTypes from 'prop-types';

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

export default ModalClose;
