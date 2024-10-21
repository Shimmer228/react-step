import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../store/slices/productsSlice';
import { confirmAddToCart } from '../../store/slices/cartSlice';
import { toggleFavorite } from '../../store/slices/favoriteSlice';
import ProductCard from '../ProductCard/ProductCard';
import './ProductList.scss';

const ProductList = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.items);
  const cart = useSelector((state) => state.cart);
  const favorites = useSelector((state) => state.favorites);
  console.log(favorites);
  console.log(cart)


  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleAddToCart = (product) => {
    dispatch(confirmAddToCart(product));  
  };

  const handleToggleFavorite = (productId) => {
    dispatch(toggleFavorite(productId));
  };

  return (
    <div className="product-list">
      <div className="products-grid">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            isInCart={!!cart[product.id]} // Перевіряємо чи товар є в кошику
            isFavorite={favorites.includes(product.id)} // Перевіряємо чи товар є в обраному
            onAddToCart={() => handleAddToCart(product)}
            onToggleFavorite={() => handleToggleFavorite(product.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
