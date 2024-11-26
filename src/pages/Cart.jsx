import React from 'react';

const Cart = ({ cart, cartMapper, placeOrder }) => {
  return (
    <div>
      <h2>Cart</h2>
      {cartMapper()}
      <button onClick={placeOrder}>Place Order</button>
    </div>
  );
};

export default Cart;
