import React, { useState, useEffect } from 'react';
import './CartModal.scss';
import Modal from '../Modal/Modal';
import PropTypes from 'prop-types';
import Button from '../Button/Button';

const CartModal = ({ isOpen, onClose, cart, productsUrl, onDeleteFromCart }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (isOpen) {
      fetch(productsUrl)
        .then((response) => response.json())
        .then((data) => setProducts(data))
        .catch((error) => console.error('Error fetching products:', error));
    }
  }, [isOpen, productsUrl]);

  const cartItems = Object.keys(cart).map((id) => {
    const product = products.find((p) => p.id === parseInt(id));
    return product ? { ...product, quantity: cart[id] } : null;
  }).filter(item => item !== null);

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Ваш Кошик"
      footer={{
        firstText: 'Закрити',
        firstClick: onClose,
        secondaryText: 'Оформити Замовлення',
        secondaryClick: () => {
          onClose();
          alert('Замовлення оформлено!');
        },
      }}
    >
      {cartItems.length === 0 ? (
        <p>Ваш кошик порожній.</p>
      ) : (
        <div className="cart-modal-content">
          <ul className="cart-items">
            {cartItems.map((item) => (
              <li key={item.id} className="cart-item">
                <img src={item.imageUrl} alt={item.name} className="cart-item-image" />
                <div className="cart-item-details">
                  <h2>{item.name}</h2>
                  <p>Артикул: {item.article}</p>
                  <p>Розробник: {item.developer}</p>
                  <p>Ціна: ${item.price.toFixed(2)}</p>
                  <p>Кількість: {item.quantity}</p>
                  <Button
                    classNames="secondary"
                    onClick={() => onDeleteFromCart(item.id)}
                  >
                    Видалити
                  </Button>
                </div>
              </li>
            ))}
          </ul>
          <div className="cart-total">
            <h3>Загальна ціна: ${totalPrice.toFixed(2)}</h3>
          </div>
        </div>
      )}
    </Modal>
  );
};

CartModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  cart: PropTypes.object.isRequired,
  productsUrl: PropTypes.string.isRequired,
  onDeleteFromCart: PropTypes.func.isRequired,
};

export default CartModal;
