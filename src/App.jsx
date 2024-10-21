// src/App.jsx
import React, { useState, useEffect } from 'react';
import './App.scss';
import Header from './components/Header/Header';
import ProductList from './components/ProductList/ProductList';
import CartPage from './pages/CartPage';
import FavoritesPage from './pages/FavoritesPage'; // Створимо новий компонент FavoritesPage
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const App = () => {
  console.log("App компонент рендериться");

  const [cart, setCart] = useState({});
  const [favorites, setFavorites] = useState([]);

  // Завантажити кошик та обране з localStorage при завантаженні
  useEffect(() => {
    console.log("useEffect для завантаження кошика і обраного");
    const savedCart = JSON.parse(localStorage.getItem('cart')) || {};
    setCart(savedCart);
    const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(savedFavorites);
  }, []);

  // Оновлювати localStorage при зміні кошика
  useEffect(() => {
    console.log('Кошик оновлено:', cart);
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Оновлювати localStorage при зміні обраного
  useEffect(() => {
    console.log('Обране оновлено:', favorites);
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  // Додати продукт до кошика або збільшити кількість
  const handleAddToCart = (product) => {
    setCart((prevCart) => ({
      ...prevCart,
      [product.id]: prevCart[product.id] ? prevCart[product.id] + 1 : 1,
    }));
  };

  // Видалити продукт з кошика
  const handleDeleteFromCart = (productId) => {
    setCart((prevCart) => {
      const newCart = { ...prevCart };
      delete newCart[productId];
      return newCart;
    });
  };

  // Додати або видалити з обраного
  const handleToggleFavorite = (productId) => {
    setFavorites((prevFavorites) =>
      prevFavorites.includes(productId)
        ? prevFavorites.filter((id) => id !== productId)
        : [...prevFavorites, productId]
    );
  };

  return (
    <Router>
      <div className="App">
        <Header
          cartCount={Object.values(cart).reduce((acc, curr) => acc + curr, 0)}
          favoriteCount={favorites.length}
        />
        <Routes>
          <Route
            path="/"
            element={
              <ProductList
                onAddToCart={handleAddToCart}
                onToggleFavorite={handleToggleFavorite}
              />
            }
          />
          <Route
            path="/cart"
            element={
              <CartPage
                cart={cart}
                onDeleteFromCart={handleDeleteFromCart}
              />
            }
          />
          <Route
            path="/favorites"
            element={
              <FavoritesPage
                favorites={favorites}
                onToggleFavorite={handleToggleFavorite}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
