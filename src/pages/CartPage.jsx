import React, { useState } from 'react';
import './CartPage.scss';
import '../components/ProductCard/ProductCard.scss'
import { useSelector, useDispatch } from 'react-redux';
import { confirmDeleteFromCart } from '../store/slices/cartSlice';

import CheckoutForm from '../components/CheckoutForm/CheckoutForm';

const CartPage = () => {
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart);
  const products = useSelector(state => state.products.items);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  const cartItems = Object.keys(cart).map(id => {
    const product = products.find(p => p.id === parseInt(id));
    return product ? { ...product, quantity: cart[id] } : null;
  }).filter(item => item !== null);

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleDelete = (product) => {
    dispatch(confirmDeleteFromCart(product));
  };

  const handleFormSubmit = () => {
    setOrderSuccess(true);
    // Закриваємо форму після успішного замовлення
    setTimeout(() => {
      setOrderSuccess(false);
    }, 5000);
    setIsFormOpen(false);
  };
 

  return (
    <div className="cart-page">
      <h1>Ваш Кошик</h1>

      <button className="toggle-form-btn" onClick={() => setIsFormOpen(!isFormOpen)}>
        {isFormOpen ? '↑ Сховати форму ↑' : '↓ Оформити замовлення ↓'}
      </button>

      {isFormOpen && <CheckoutForm onFormSubmit={handleFormSubmit} />}

      {orderSuccess && (
        <div className="success-message">
          <p>Замовлення оформлено, кошик очищено!</p>
        </div>
      )}
      {cartItems.length === 0 ? (
        <p className="empty">Ваш кошик порожній.</p>
      ) : (
        <>
          <div className="products-grid">
            {cartItems.map(item => (
              <div key={item.id} className="product-card">
                <img src={item.imageUrl} alt={item.name} className="modal-product-image" />
                <h2>{item.name}</h2>
                <p className="price">${item.price.toFixed(2)}</p>
                <p>Кількість: {item.quantity}</p>
                <button className="secondary" onClick={() => handleDelete(item)}>
                  Видалити
                </button>
              </div>
            ))}
          </div>
          <div className="cart-total">
            <h3>Загальна ціна: ${totalPrice.toFixed(2)}</h3>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
