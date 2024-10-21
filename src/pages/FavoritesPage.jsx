// src/pages/FavoritesPage.jsx
import React from 'react';
import './FavoritesPage.scss';
import { useSelector, useDispatch } from 'react-redux';
import { proceedAddToCart } from '../store/slices/cartSlice';
import { toggleFavorite } from '../store/slices/favoriteSlice';
import { FaStar } from 'react-icons/fa';

const FavoritesPage = () => {
  const dispatch = useDispatch();
  const favorites = useSelector(state => state.favorites);
  const products = useSelector(state => state.products.items);

  const handleAddToCart = (product) => {
    dispatch(proceedAddToCart(product.id));
    dispatch(toggleFavorite(product.id));
    
  };
  const handleToggleFavorite = (productId) => {
    console.log(productId)
    dispatch(toggleFavorite(productId)); // Оновлений виклик з передачею productId
}
  const favoriteItems = products.filter(product => favorites.includes(product.id));


  return (
    <div className="favorites-page">
      <h1>Ваше Обране</h1>
      {favoriteItems.length === 0 ? (
        <p className='empty'>Ваш список обраного порожній.</p>
      ) : (
        <div className="products-grid">
          {favoriteItems.map(product => (
            <div key={product.id} className="product-card">
                <div className="favorite-icon" onClick={() => handleToggleFavorite(product.id)}>
                  <FaStar color={'#4caf50'} />
                </div>
              <img src={product.imageUrl} alt={product.name} className="modal-product-image" />
              <h2>{product.name}</h2>
              <p className='price'>${product.price.toFixed(2)}</p>
              <button onClick={() => handleAddToCart(product)}>Додати до кошику</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;
