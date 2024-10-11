import React from 'react';

function Card({ card, addToCart, productId}) {
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