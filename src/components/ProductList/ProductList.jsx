/* src/components/ProductList/ProductList.jsx */
import React, { useState, useEffect } from 'react';
import './ProductList.scss';
import ProductCard from '../ProductCard/ProductCard';
import PropTypes from 'prop-types';
import Modal from '../Modal/Modal';

const ProductList = ({ onAddToCart, onToggleFavorite }) => {
  const [products, setProducts] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    fetch('/products.json')
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

  const handleAddToCartClick = (product) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };

  const handleConfirmAddToCart = () => {
    if (selectedProduct) {
      onAddToCart(selectedProduct);
      setModalOpen(false);
      setSelectedProduct(null);
    }
  };

  const handleCancelAddToCart = () => {
    setModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <div className="product-list">
      <div className="products-grid">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={handleAddToCartClick}
            onToggleFavorite={onToggleFavorite}
          />
        ))}
      </div>

      {/* Modal для підтвердження додавання до кошика */}
      <Modal
        isOpen={modalOpen}
        onClose={handleCancelAddToCart}
        title="Додати товар до кошика"
        footer={{
          firstText: 'Скасувати',
          secondaryText: 'Додати',
          firstClick: handleCancelAddToCart,
          secondaryClick: handleConfirmAddToCart,
        }}
      >
        {selectedProduct && (
          <div className="modal-content-confirmation">
            <img
              src={selectedProduct.imageUrl}
              alt={selectedProduct.name}
              className="modal-product-image"
            />
            <h1>{selectedProduct.name}</h1>
            <h3>${selectedProduct.price.toFixed(2)}</h3>
            <p>Чи бажаєте додати цей товар до кошика?</p>
          </div>
        )}
      </Modal>
    </div>
  );
};

ProductList.propTypes = {
  onAddToCart: PropTypes.func.isRequired,
  onToggleFavorite: PropTypes.func.isRequired,
};

export default ProductList;
