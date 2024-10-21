import React, { useState, useEffect } from 'react';
import './ProductCard.scss';
import PropTypes from 'prop-types';
import { FaStar } from 'react-icons/fa';

const ProductCard = ({ product, onAddToCart, onToggleFavorite }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setIsFavorite(favorites.includes(product.id));
  }, [product.id]);

  const handleFavoriteClick = () => {
    onToggleFavorite(product.id);
    setIsFavorite(!isFavorite);
  };

  const handleAddToCart = () => {
    onAddToCart(product);
  };

  return (
    <div className="product-card">
      <div className="favorite-icon" onClick={handleFavoriteClick}>
        <FaStar color={isFavorite ? 'gold' : 'gray'} />
      </div>
      <img src={product.imageUrl} alt={product.name} />
      <div className="product-details">
        <h2>{product.name}</h2>
        <p>Артикул: {product.article}</p>
        <p>Розробник: {product.developer}</p>
        <p>${product.price.toFixed(2)}</p>
        <Button classNames="primary" onClick={handleAddToCart}>
          Додати в кошик
        </Button>
      </div>
    </div>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    imageUrl: PropTypes.string.isRequired,
    article: PropTypes.string.isRequired,
    developer: PropTypes.string.isRequired,
  }).isRequired,
  onAddToCart: PropTypes.func.isRequired,
  onToggleFavorite: PropTypes.func.isRequired,
};

export default ProductCard;
