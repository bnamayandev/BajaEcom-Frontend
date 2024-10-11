import React from 'react'

const CartPage = ({ cartMapper }) => {
  return (
    <div>
        <div>Cart</div>
        {cartMapper()}
        <button>asdf</button>
    </div>
  )
}

export default CartPage