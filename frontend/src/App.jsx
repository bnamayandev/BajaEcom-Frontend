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
  const [products, setProducts] = useState([]);
  const [count, setCount] = useState(0);
  useEffect(() => {
    // THIS IS A TEST USEEEFFECT TO TEST THE CART PLEASE DELETE AFTER
    setProducts(testData);
  }, []);

  useEffect(() => { // THIS IS A TEST USEEEFFECT TO TEST THE CART PLEASE DELETE AFTER
    console.log(cart);
  }, [cart]);

  function addToCart(id) {
    // sets count
    setCount(count + 1);

    setCart((prevCart) => {
      if(prevCart.find((item) => item.productId === id)) { // Finds the item in the cart and then adds to the count if it exists already
        return prevCart.map((item) => 
          item.productId === id ? { ...item, count: item.count + 1 } : item
        );
      }

      // creates new cart item if it doesn't exist
      return [...prevCart, 
        { 
          productId: products[id-1].id, 
          productName: products[id-1].productName, 
          price: products[id-1].price, 
          count: 1 
        }
      ];
    })
    console.log(cart);
  }

  function productMapper() { // This function maps the products to the Card component
    return products.map((item) => {
      return (
        <Card key={item.id} productId={item.id} card={item} addToCart={addToCart} />
      );
    });
  }

  function cartMapper() {
    return cart.map((item) => {
      return (
        <Cart key={item.productId} productId={item.productId} card={item} />
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
              count={count}
              product={products}
              productMapper={productMapper}
              
            />} 
          />
          <Route path="/account" element={<Account />} />
          <Route 
            path="/cart" 
            element={
              <Cart
                cartMapper={cartMapper}
              />
            } 
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;