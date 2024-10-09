import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Account from './pages/Account';
import Cart from './pages/Cart';
import { testData } from './test';
import './App.css';
import Card from './components/Card'; // Ensure you have the correct import for Card component

function App() {
  const [cart, setCart] = useState([]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    // THIS IS A TEST USEEEFFECT TO TEST THE CART PLEASE DELETE AFTER
    setCart(testData);
  }, []);

  function addToCart() {
    setCount(count + 1);
  }

  function cartMapper() {
    if (!cart || cart.length === 0) {
      return <p>No items in cart</p>;
    }
    return cart.map((item) => {
      return (
        <Card key={item.id} card={item} />
      );
    });
  }

  return (
    <>
      <BrowserRouter>
        <Navbar count={count} />
        <Routes>
          <Route path="/" 
            element={<Home 
              addToCart={addToCart} 
              count={count}
              cart={cart}
              cartMapper={cartMapper}
            />} 
          />
          <Route path="/account" element={<Account />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
        
      </BrowserRouter>
    </>
  );
}

export default App;