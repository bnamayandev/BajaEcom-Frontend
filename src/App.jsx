import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Account from './pages/Account';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Signup from './pages/Signup';
import './App.css';
import OrderDashboard from './components/OrderDashboard';
import OrderConfirmedPage from './pages/OrderConfirmedPage';
import { createOrder } from './api/orders';
import 'react-datepicker/dist/react-datepicker.css';
import SignupConfirmed from './pages/SignupConfirmed';

function App() {
  const [cart, setCart] = useState([]);
  const [count, setCount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [token, setToken] = useState(localStorage.getItem('authToken') || null);
  const navigate = useNavigate();

  useEffect(() => {
    setCart([]);
  }, []);

  const handleLogin = (newToken) => {
    setToken(newToken);
    localStorage.setItem('authToken', newToken);
  };

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem('authToken');
    navigate('/');
  };

  // Function to add items to the cart
  function addToCart(item) {
    const existingItemIndex = cart.findIndex(
      (cartItem) =>
        cartItem.item_id === item.item_id && cartItem.size === item.size
    );

    if (existingItemIndex !== -1) {
      // Update quantity
      const updatedCart = [...cart];
      updatedCart[existingItemIndex].quantity += item.quantity;
      setCart(updatedCart);
    } else {
      setCart([...cart, item]);
    }

    // Update total price and count
    setTotalPrice(totalPrice + item.price * item.quantity);
    setCount(count + item.quantity);
  }

  // Function to render the cart items
  function cartMapper() {
    if (!cart || cart.length === 0) {
      return <p>No items in cart</p>;
    }
    return (
      <div>
        {cart.map((item) => (
          <div key={`${item.item_id}-${item.size}`}>
            <h3>{item.productName}</h3>
            <p>{item.productDescription}</p>
            <p>Size: {item.size}</p>
            <p>Quantity: {item.quantity}</p>
            <p>Price per item: ${item.price.toFixed(2)}</p>
            <p>Total: ${(item.price * item.quantity).toFixed(2)}</p>
            <hr />
          </div>
        ))}
        <h3>Total: ${totalPrice.toFixed(2)}</h3>
      </div>
    );
  }

  // Function to place an order
  const placeOrder = async (pickupDateTime) => {
    try {
      if (!token) {
        alert('Please login to place an order.');
        navigate('/login');
        return;
      }

      if (!pickupDateTime) {
        alert('Pickup date and time is required.');
        return;
      }

      // Ensure the date is valid and in the future
      if (pickupDateTime < new Date()) {
        alert('Pickup date and time must be in the future.');
        return;
      }

      const orderData = {
        pickup_date_time: pickupDateTime.toISOString(),
        items: cart.map((item) => ({
          item_id: item.item_id,
          quantity: item.quantity,
          size: item.size,
        })),
      };

      await createOrder(orderData);

      // Clear cart
      setCart([]);
      setTotalPrice(0);
      setCount(0);

      alert('Order placed successfully!');
      navigate('/orderconfirmed');
    } catch (error) {
      console.error('Error placing order:', error);
      alert('An error occurred while placing your order.');
    }
  };

  const goToMembersView = () => {
    navigate('/orderdashboard');
  };

  return (
    <div>
      <Navbar count={count} />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              addToCart={addToCart}
              count={count}
              cart={cart}
              cartMapper={cartMapper}
            />
          }
        />
        <Route
          path="/account"
          element={
            <Account
              handleLogout={handleLogout}
              goToMembersView={goToMembersView}
              token={token}
            />
          }
        />
        <Route
          path="/cart"
          element={<Cart cart={cart} cartMapper={cartMapper} placeOrder={placeOrder} />}
        />
        <Route
          path="/orderdashboard"
          element={token ? <OrderDashboard /> : <Navigate to="/login" />}
        />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/orderconfirmed" element={<OrderConfirmedPage />} />
      </Routes>
    </div>
  );
}

export default App;
