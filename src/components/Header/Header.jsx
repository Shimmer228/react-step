import './Header.scss'; //закоментувати для проходження тесту(???)
import React from 'react';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaStar } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { useViewContext } from '../../context/ViewContext'; // Додаємо наш контекст

const Header = () => {
  const location = useLocation();
  const cartCount = useSelector(state => Object.values(state.cart).reduce((acc, curr) => acc + curr, 0));
  const favoriteCount = useSelector(state => state.favorites.length);
  const { isTableView, toggleView } = useViewContext();
  const [showViewChanger, setShowViewChanger] = useState(false);

  useEffect(() => {
    // Перевіряємо, чи це головна сторінка
    if (location.pathname === '/') {
      setShowViewChanger(true);
    } else {
      setShowViewChanger(false);
    }
  }, [location]);
  
  return (
    <header className="header">
      <a className='Logo' href='https://youtu.be/eaEMSKzqGAg?si=txQw9TiN_7ldSUUb'>GameShop</a>
      <nav className="header-nav">
      {showViewChanger && (
          <button className='viewChanger' onClick={toggleView}>
            {isTableView ? 'Вигляд карток' : 'Вигляд таблиці'}
          </button>
        )}
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
