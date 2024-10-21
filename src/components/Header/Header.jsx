import React from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaStar } from 'react-icons/fa';
import './Header.scss';
import PropTypes from 'prop-types';

const Header = ({ cartCount, favoriteCount }) => (
  <header className="header">
    <h1>My Game Store</h1>
    <nav className="header-nav">
      <Link to="/">Головна</Link>
      <Link to="/cart">
        <div className="icon">
          <FaShoppingCart />
          {cartCount > 0 && <span className="count">{cartCount}</span>}
        </div>
        Кошик
      </Link>
      <Link to="/favorites">
        <div className="icon">
          <FaStar />
          {favoriteCount > 0 && <span className="count">{favoriteCount}</span>}
        </div>
        Обране
      </Link>
    </nav>
  </header>
);

Header.propTypes = {
  cartCount: PropTypes.number,
  favoriteCount: PropTypes.number,
};

Header.defaultProps = {
  cartCount: 0,
  favoriteCount: 0,
};

export default Header;
