// src/components/Header/Header.jsx
import React from 'react';
import './Header.scss';
import { FaShoppingCart, FaStar } from 'react-icons/fa';
import PropTypes from 'prop-types';

const Header = ({ cartCount, favoriteCount, onCartClick }) => {
  return (
    <header className="header">
      <h1>My E-commerce Store</h1>
      <div className="header-icons">
        <div className="icon" onClick={onCartClick}>
          <FaShoppingCart />
          {cartCount > 0 && <span className="count">{cartCount}</span>}
        </div>
        <div className="icon">
          <FaStar />
          {favoriteCount > 0 && <span className="count">{favoriteCount}</span>}
        </div>
      </div>
    </header>
  );
};

Header.propTypes = {
  cartCount: PropTypes.number,
  favoriteCount: PropTypes.number,
  onCartClick: PropTypes.func.isRequired,
};

Header.defaultProps = {
  cartCount: 0,
  favoriteCount: 0,
};

export default Header;
