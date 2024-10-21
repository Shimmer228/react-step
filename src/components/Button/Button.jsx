import React from 'react';
import './Button.scss';
import PropTypes from 'prop-types';

const Button = ({ type, classNames, onClick, children }) => {
  return (
    <button type={type} className={`btn ${classNames}`} onClick={onClick}>
      {children}
    </button>
  );
};

Button.propTypes = {
  type: PropTypes.string,
  classNames: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired,
};

Button.defaultProps = {
  type: 'button',
  classNames: '',
  onClick: () => {},
};

export default Button;
