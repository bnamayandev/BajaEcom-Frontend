import React from 'react'
import './Home.css'
import Card from '../components/Card'
import InventoryViewer from '../components/InventoryViewer'
import { useNavigate } from 'react-router-dom'

const Home = ({ addToCart, cart, cartMapper }) => {
  const navigate = useNavigate();
  return (
    <div>
      <div className='home'>
        <h1>Official Western Baja Merch Store</h1>
      </div>
      <div className='cardSec'>
        {InventoryViewer(addToCart = { addToCart }, cart = { cart })}
        <button onClick={() => navigate("/cart")}>Go to Cart</button>
        <br />
      </div>

    </div>
  )
}

export default Home;