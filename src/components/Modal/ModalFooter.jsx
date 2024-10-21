import React from 'react';
import './Modal.scss';
import PropTypes from 'prop-types';
import Button from '../Button/Button';

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

export default ModalFooter;
