import React from 'react';

function Card({ card }) {
  return (
    <div className="card">
      <h2>{card.productName}</h2>
      <p>{card.productDescription}</p>
      <p>Price: ${card.price}</p>
    </div>
  );
}

export default Card;