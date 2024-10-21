// src/components/Header/Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaStar } from 'react-icons/fa';
import './Header.scss';
import { useSelector } from 'react-redux';

const Header = () => {
  const cartCount = useSelector(state => Object.values(state.cart).reduce((acc, curr) => acc + curr, 0));
  const favoriteCount = useSelector(state => state.favorites.length);

  return (
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
};

export default Header;
