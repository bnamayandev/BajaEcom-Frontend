import React from 'react'

const Cart = ({cart, cartMapper}) => {
  return (
    <div>
        <div>Cart</div>
        <div>{cartMapper()}</div>
        <button>asdf</button>
    </div>
  )
}

export default Cart