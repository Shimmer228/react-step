import React, { useEffect } from 'react';
import './App.scss';
import Header from './components/Header/Header';
import ProductList from './components/ProductList/ProductList';
import CartPage from './pages/CartPage';
import FavoritesPage from './pages/FavoritesPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';  
import { fetchProducts } from './store/slices/productsSlice';
import { setCart, proceedAddToCart, proceedDeleteFromCart } from './store/slices/cartSlice';
import { setFavorites } from './store/slices/favoriteSlice';
import { clearConfirmationMessage } from './store/slices/modalSlice'; 
import Modal from './components/Modal/Modal'; 

const App = () => {
  const dispatch = useDispatch();
  const confirmationMessage = useSelector(state => state.modal.confirmationMessage);  // Отримання стану модалки
  const modalProduct = useSelector((state) => state.modal.product);  // Отримання продукту, що модифікується

  // Завантажити дані з localStorage при завантаженні
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || {};
    dispatch(setCart(savedCart));
    const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    dispatch(setFavorites(savedFavorites));
    dispatch(fetchProducts());
  }, [dispatch]);

  // Закриття модалки
  const handleClose = () => {
    dispatch(clearConfirmationMessage());
  };

  // Підтвердити додавання
  const handleConfirmAdd = () => {
    if (modalProduct) {
        dispatch(proceedAddToCart(modalProduct.id));  // Додавання продукту до кошика
    }
    handleClose();
  };

  // Підтвердити видалення
  const handleConfirmDelete = () => {
    if (modalProduct) {
        dispatch(proceedDeleteFromCart(modalProduct.id));  // Видалення продукту з кошика
    }
    handleClose();
  };


  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
        </Routes>

        {/* Модалка для додавання або видалення товару */}
        <Modal
          isOpen={!!confirmationMessage}
          onClose={handleClose}
          title="Підтвердження"
          product={modalProduct}
          footer={{
            firstText: 'Скасувати',
            firstClick: handleClose,
            secondaryText: confirmationMessage.includes('видалити') ? 'Видалити' : 'Підтвердити',  // Кнопка змінюється в залежності від дії
            secondaryClick: confirmationMessage.includes('видалити') ? handleConfirmDelete : handleConfirmAdd,  // Виклик відповідної функції
          }}
        >
          <p>{confirmationMessage}</p>
        </Modal>
      </div>
    </Router>
  );
};

export default App;
