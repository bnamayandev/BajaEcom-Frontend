import React from 'react'
import test from '/lucas.png'
import './Card.css'
const Card = ({addToCart}) => {
  return (
    <div className='pCard'>
        <img src={test} alt="" />
        <h1>Product Title</h1>
        <h4>Price</h4>
        <button onClick={addToCart}>Add to Cart</button>
    </div>
  )
}

export default Card