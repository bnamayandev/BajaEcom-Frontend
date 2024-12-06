// src/components/Card.jsx
import React from 'react';
import './Card.css'; // Ensure this CSS file exists

function Card({ card, addToCart, productId }) {
  return (
    <div className="pCard">
      <h2>{card.productName}</h2>
      <p>{card.productDescription}</p>
      <p>Price: ${card.price}</p>
      <button onClick={() => addToCart(productId)}>Add To Cart</button>
    </div>
  );
}

export default Card;
