import React from 'react';
import './Modal.scss';
import PropTypes from 'prop-types';

const ModalHeader = ({ children }) => {
  return <div className="modal-header">{children}</div>;
};

ModalHeader.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ModalHeader;
