// src/App.jsx
import React, { useState, useEffect } from 'react';
import './App.scss';
import Header from './components/Header/Header';
import ProductList from './components/ProductList/ProductList';
import CartModal from './components/CartModal/CartModal';

const App = () => {
  console.log("App компонент рендериться");

  const [cart, setCart] = useState({});
  const [favorites, setFavorites] = useState([]);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);

  // Завантажити кошик та обране з localStorage при завантаженні
  useEffect(() => {
    console.log("useEffect для завантаження кошика і обраного");
    const savedCart = JSON.parse(localStorage.getItem('cart')) || {};
    console.log("+");
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
    console.log(`Додаємо до кошика продукт з id: ${product.id}`);
    setCart((prevCart) => ({
      ...prevCart,
      [product.id]: prevCart[product.id] ? prevCart[product.id] + 1 : 1,
    }));
  };

  // Видалити продукт з кошика
  const handleDeleteFromCart = (productId) => {
    console.log(`Видаляємо з кошика продукт з id: ${productId}`);
    setCart((prevCart) => {
      const newCart = { ...prevCart };
      delete newCart[productId];
      return newCart;
    });
  };

  // Додати або видалити з обраного
  const handleToggleFavorite = (productId) => {
    console.log(`Тоглемо обране для продукту з id: ${productId}`);
    setFavorites((prevFavorites) =>
      prevFavorites.includes(productId)
        ? prevFavorites.filter((id) => id !== productId)
        : [...prevFavorites, productId]
    );
  };

  // Відкрити модалку кошика
  const openCartModal = () => {
    console.log("Відкриваємо модалку кошика");
    setIsCartModalOpen(true);
  };
  // Закрити модалку кошика
  const closeCartModal = () => {
    console.log("Закриваємо модалку кошика");
    setIsCartModalOpen(false);
  };

  return (
    <div className="App">
      <Header
        cartCount={Object.values(cart).reduce((acc, curr) => acc + curr, 0)}
        favoriteCount={favorites.length}
        onCartClick={openCartModal}
      />
      <ProductList onAddToCart={handleAddToCart} onToggleFavorite={handleToggleFavorite} />



      {/* Модалка кошика */}
      <CartModal
        isOpen={isCartModalOpen}
        onClose={closeCartModal}
        cart={cart}
        productsUrl="./products.json"
        onDeleteFromCart={handleDeleteFromCart}
      />
      
    </div>
  );
};

export default App;
