import React from 'react';

function Card({ card, addToCart, productId}) {
  return (
    <div className="pCard">
      <h2>{card.productName}</h2>
      <p>{card.productDescription}</p>
      <p>Price: ${card.price}</p>
<<<<<<< HEAD:src/components/Card.jsx
      <br/>
=======
      <button onClick={() => addToCart(productId)}>Add To Cart</button>
>>>>>>> 5b30752c85591be2d65c7fb30a8460557888a81c:frontend/src/components/Card.jsx
    </div>
  );
}

export default Card;