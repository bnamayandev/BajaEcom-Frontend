import React from 'react';
import { useCart } from '../api/CartContext';
import './Cart.css';

const Cart = () => {
  const { cart, removeFromCart, calculateTotal, clearCart } = useCart();

  if (cart.length === 0) {
    return <h2 style={{ textAlign: 'center' }}>Your cart is empty.</h2>;
  }

  return (
    <div className="cart-container">
      <h1>Your Cart</h1>
      <ul className="cart-items">
        {cart.map((item) => (
          <li key={item.item_id} className="cart-item">
            <img src={item.image || 'https://via.placeholder.com/150'} alt={item.clothing_type} />
            <div>
              <p><strong>{item.clothing_type}</strong></p>
              <p>Size: {item.size}</p>
              <p>Price: ${item.price.toFixed(2)}</p>
              <p>Quantity: {item.quantity}</p>
              <button onClick={() => removeFromCart(item.item_id)}>Remove</button>
            </div>
          </li>
        ))}
      </ul>
      <h2>Total: ${calculateTotal().toFixed(2)}</h2>
      <button className="clear-cart-btn" onClick={clearCart}>Clear Cart</button>
    </div>
  );
};

export default Cart;

