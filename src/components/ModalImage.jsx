import React from 'react';
import Modal from './Modal/Modal';
import PropTypes from 'prop-types';

const ModalImage = ({ isOpen, onClose, title, imageUrl, footer, MainText, SubText }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} footer={footer}>
      <img src={imageUrl} alt={title} style={{ width: '276px', height: '140px', borderRadius: '4px'}} />
      <h2>{MainText}</h2>
      <p>{SubText}</p>
    </Modal>
  );
};

ModalImage.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  footer: PropTypes.object,
  MainText: PropTypes.string,
  SubText: PropTypes.string,
};

ModalImage.defaultProps = {
  footer: null,
  MainText: 'Default Main Text',
  SubText: 'Default Sub Text',
};

export default ModalImage;
