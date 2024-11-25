import React from 'react';
import { useCart } from '../api/CartContext';
import './Cart.css';

const Cart = () => {
  const { cart, removeFromCart, calculateTotal, clearCart } = useCart();

  return (
    <div className="cart-container">
      <h2>Shopping Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul className="cart-list">
            {cart.map((item) => (
              <li key={item.item_id} className="cart-item">
                <img src="https://via.placeholder.com/50" alt="Item" />
                <p>{item.clothing_type} (Size: {item.size})</p>
                <p>Quantity: {item.quantity}</p>
                <p>Subtotal: ${(item.price * item.quantity).toFixed(2)}</p>
                <button onClick={() => removeFromCart(item.item_id)}>Remove</button>
              </li>
            ))}
          </ul>
          <div className="cart-summary">
            <p>Total: ${calculateTotal().toFixed(2)}</p>
            <button onClick={clearCart}>Clear Cart</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
