import React from 'react'
import './Home.css'
import Card from '../components/Card'
import InventoryViewer from '../components/InventoryViewer'
const Home = ({addToCart, cart, cartMapper}) => {
  return (
    <div>
      <div className='home'>
        <h1>Official Western Baja Merch Store</h1>
      </div>
      <div className='cardSec'>
        {cartMapper()}
        {InventoryViewer()}
      </div>

    </div>
  )
}

export default Home