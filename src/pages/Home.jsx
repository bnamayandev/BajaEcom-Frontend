import React, { useContext } from 'react';
import { CartContext } from '../api/CartContext';
import './Home.css';

const Home = () => {
  const { cart, addToCart } = useContext(CartContext); // Access cart and addToCart from context

  const cartMapper = () => {
    if (!cart || cart.length === 0) {
      return <p>No items in cart</p>;
    }
    return cart.map((item) => (
      <div key={item.id} className="cart-item">
        <h3>{item.name}</h3>
        <p>Price: ${item.price}</p>
        <p>Quantity: {item.quantity}</p>
      </div>
    ));
  };

  return (
    <div className="home-container">
      <h1>Welcome to the Home Page</h1>
      <button onClick={() => addToCart({ id: 1, name: 'Example Item', price: 10, quantity: 1 })}>
        Add Example Item to Cart
      </button>
      <div className="cart">
        <h2>Your Cart</h2>
        {cartMapper()}
      </div>
    </div>
  );
};

export default Home;
