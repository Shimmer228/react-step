import React from 'react';
import './Modal.scss';
import PropTypes from 'prop-types';

const ModalBody = ({ children }) => {
  return <div className="modal-body">{children}</div>;
};

ModalBody.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ModalBody;
