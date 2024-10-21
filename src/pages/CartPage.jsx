
import React, { useState, useEffect } from 'react';
import Button from '../components/Button/Button';
import Modal from '../components/Modal/Modal';
import '../components/ProductCard/ProductCard.scss'
import '../components/ProductList/ProductList.scss'
import { FaWindowClose } from "react-icons/fa";
import '../pages/CartPage.scss';

const CartPage = ({ cart, onDeleteFromCart }) => {
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  useEffect(() => {
    fetch('/products.json') // завантажити продукти
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

  const cartItems = Object.keys(cart)
    .map((id) => {
      const product = products.find((p) => p.id === parseInt(id));
      return product ? { ...product, quantity: cart[id] } : null;
    })
    .filter((item) => item !== null);

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const confirmDelete = (productId) => {
    setProductToDelete(productId);
    setIsModalOpen(true);
  };

  const handleDelete = () => {
    onDeleteFromCart(productToDelete);
    setIsModalOpen(false);
  };

  return (
    <div className="cart-page">
      <h1>Ваш Кошик</h1>
      {cartItems.length === 0 ? (
        <p>Ваш кошик порожній.</p>
      ) : (
        <div>
          <ul className="cart-items">
            {cartItems.map((item) => (
              <li key={item.id} className="product-card">
                <div className="favorite-icon" onClick={() => confirmDelete(item.id)}>
                <FaWindowClose />
                </div>
                <img src={item.imageUrl} alt={item.name} />
                <div>
                  <h2>{item.name}</h2>
                  <p>Ціна: ${item.price.toFixed(2)}</p>
                  <p>Кількість: {item.quantity}</p>
                  <Button onClick={() => confirmDelete(item.id)}>
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

      {/* Модалка для підтвердження видалення */}
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Підтвердження видалення"
          footer={{
            firstText: 'Відмінити',
            firstClick: () => setIsModalOpen(false),
            secondaryText: 'Видалити',
            secondaryClick: handleDelete,
          }}
        >
          Ви дійсно хочете видалити цей товар з кошика?
        </Modal>
      )}
    </div>
  );
};

export default CartPage;
