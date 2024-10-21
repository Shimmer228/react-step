
import './CartPage.scss';
import { useSelector, useDispatch } from 'react-redux';
import { confirmDeleteFromCart } from '../store/slices/cartSlice';
import '../components/ProductList/ProductList.scss'


const CartPage = () => {
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart);
  const products = useSelector(state => state.products.items);

  const cartItems = Object.keys(cart).map(id => {
    const product = products.find(p => p.id === parseInt(id));
    return product ? { ...product, quantity: cart[id] } : null;
  }).filter(item => item !== null);
  console.log(cartItems);

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleDelete = (product) => {
    console.log("=")
    dispatch(confirmDeleteFromCart(product));
  };

  return (
    <div className="cart-page">
      <h1>Ваш Кошик</h1>
      {cartItems.length === 0 ? (
        <p className='empty'>Ваш кошик порожній.</p>
      ) : (
        <div className="products-grid">
          {cartItems.map(item => (
            <div key={item.id} className="product-card">
              <img src={item.imageUrl} alt={item.name} className="modal-product-image" />
              <h2>{item.name}</h2>
              <p className='price'>${item.price.toFixed(2)}</p>
              <p>Кількість: {item.quantity}</p>
              <button className="secondary" onClick={() => handleDelete(item)}>
               Видалити
              </button>
            </div>
          ))}
        </div>
      )}
           <div className="cart-total">
          <h3>Загальна ціна: ${totalPrice.toFixed(2)}</h3>
          </div>


    </div>
  );
};

export default CartPage;