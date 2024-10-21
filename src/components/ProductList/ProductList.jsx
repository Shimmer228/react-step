import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../store/slices/productsSlice';
import { confirmAddToCart } from '../../store/slices/cartSlice';
import { toggleFavorite } from '../../store/slices/favoriteSlice';
import ProductCard from '../ProductCard/ProductCard';
import './ProductList.scss';
import { useViewContext } from '../../context/ViewContext';
import { FaStar } from 'react-icons/fa';
const ProductList = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.items);
  const cart = useSelector((state) => state.cart);
  const favorites = useSelector((state) => state.favorites);
  const { isTableView } = useViewContext();


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
    <div className={`product-list ${isTableView ? 'table-view' : 'card-view'}`}>
    {isTableView ? (
       <table>
       <thead>
         <tr>
           <th>Зображення</th>
           <th>Назва</th>
           <th>Ціна</th>
           <th>Дії</th>
         </tr>
       </thead>
       <tbody>
         {products.map((product) => (
           <tr key={product.id}>
             <td className='imageContainer'>
               <img src={product.imageUrl} alt={product.name} className="product-image" />
             </td>
             <td>
               <div className="product-details">
                 <div className="product-name">{product.name}</div>
                 <div className="product-developer">{product.developer}</div>
               </div>
             </td>
             <td className="product-price">${product.price.toFixed(2)}</td>
             <td className="actions">
               <div
                 className={`favorite-icon-table-view ${favorites.includes(product.id) ? 'active' : ''}`}
                 onClick={() => handleToggleFavorite(product.id)}
               >
                 <FaStar />
               </div>
               <button onClick={() => handleAddToCart(product)}>Додати в кошик</button>
             </td>
           </tr>
         ))}
       </tbody>
     </table>
    ) : (
      <div className="products-grid">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            isInCart={!!cart[product.id]}
            isFavorite={favorites.includes(product.id)}
            onAddToCart={() => handleAddToCart(product)}
            onToggleFavorite={() => handleToggleFavorite(product.id)}
          />
        ))}
      </div>
    )}
  </div>
  );
};

export default ProductList;
