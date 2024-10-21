// src/components/FavoritesPage/FavoritesPage.jsx
import React, { useState, useEffect } from 'react';
import '../components/ProductCard/ProductCard.scss'
import '../components/ProductList/ProductList.scss'
import './FavoritesPage.scss'
import { FaStar } from 'react-icons/fa';
const FavoritesPage = ({ favorites, onToggleFavorite }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('/products.json')
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

  const favoriteItems = products.filter((product) =>
    favorites.includes(product.id)
  );

  return (
    <div className="favorites-page">
      <h1>Ваше Обране</h1>
      {favoriteItems.length === 0 ? (
        <p>Немає обраних товарів.</p>
      ) : (
        <ul className="favorite-items">
          {favoriteItems.map((item) => (
            <li key={item.id} className="product-card">
              <img src={item.imageUrl} alt={item.name} />
              <div>
                <h2>{item.name}</h2>
                <p>Ціна: ${item.price.toFixed(2)}</p>
                <div className="favorite-icon" onClick={() => onToggleFavorite(item.id)}>
                  <FaStar />
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FavoritesPage;
