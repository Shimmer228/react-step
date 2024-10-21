import React, { useState, useEffect } from 'react';
import './App.scss';
import Header from './components/Header/Header';
import ProductList from './components/ProductList/ProductList';

const App = () => {
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);

  // Завантажити кошик та обране з localStorage при завантаженні
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(savedCart);

    const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(savedFavorites);
  }, []);

  // Оновлювати localStorage при зміні кошика
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Оновлювати localStorage при зміні обраного
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const handleAddToCart = (product) => {
    setCart((prevCart) => [...prevCart, product.id]);
  };

  const handleToggleFavorite = (productId) => {
    setFavorites((prevFavorites) =>
      prevFavorites.includes(productId)
        ? prevFavorites.filter((id) => id !== productId)
        : [...prevFavorites, productId]
    );
  };

  return (
    <div className="App">
      <Header cartCount={cart.length} favoriteCount={favorites.length} />
      <ProductList onAddToCart={handleAddToCart} onToggleFavorite={handleToggleFavorite} />
    </div>
  );
};

export default App;
