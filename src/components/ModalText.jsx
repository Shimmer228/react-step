import React from 'react';
import Modal from './Modal/Modal';
import PropTypes from 'prop-types';

const ModalText = ({ isOpen, onClose, title, footer, MainText, SubText}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} footer={footer}>
         <h2>{MainText}</h2>
        <p>{SubText}</p>
    </Modal>
  );
};

ModalText.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  footer: PropTypes.object,
  MainText: PropTypes.string,
  SubText: PropTypes.string,
};

ModalText.defaultProps = {
  footer: null,
  MainText: 'Default Main Text',
  SubText: 'Default Sub Text',
};

export default ModalText;
