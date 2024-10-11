import React from 'react'
import './Home.css'
import Card from '../components/Card'
const Home = ({ product, productMapper}) => {
  return (
    <div>
      <div className='home'>
        <h1>Official Western Baja Merch Store</h1>
      </div>
      <div className='cardSec'>
        {productMapper()}
      </div>

    </div>
  )
}

export default Home