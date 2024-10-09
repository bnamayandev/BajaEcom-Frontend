import React from 'react'
import './Home.css'
import Card from '../components/Card'
const Home = ({addToCart, cart, cartMapper}) => {
  return (
    <div>
      <div className='home'>
        <h1>Official Western Baja Merch Store</h1>
      </div>
      <div className='cardSec'>
        {cartMapper()}
      </div>

    </div>
  )
}

export default Home