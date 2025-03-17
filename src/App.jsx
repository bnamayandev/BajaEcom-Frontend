import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
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
import PrivateRoute from './components/PrivateRoute';
import HowItWorks from './pages/HowItWorks';
import UserOrders from './pages/UserOrders';
import ResetPassword from './pages/ResetPassword';

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
  const addToCart = (item) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex(
        (cartItem) =>
          cartItem.item_id === item.item_id && cartItem.size === item.size
      );

      let updatedCart;
      if (existingItemIndex !== -1) {
        // Update quantity
        updatedCart = [...prevCart];
        updatedCart[existingItemIndex].quantity += item.quantity;
      } else {
        updatedCart = [...prevCart, item];
      }

      // Update total price and count
      const newTotalPrice = updatedCart.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
      const newCount = updatedCart.reduce((count, item) => count + item.quantity, 0);

      setTotalPrice(newTotalPrice);
      setCount(newCount);

      return updatedCart;
    });
  };

  // Function to update the quantity of an item in the cart
  const updateCartItem = (itemId, size, newQuantity) => {
    if (newQuantity < 1 || isNaN(newQuantity)) {
      return;
    }
    setCart((prevCart) => {
      const updatedCart = prevCart.map((item) => {
        if (item.item_id === itemId && item.size === size) {
          return { ...item, quantity: newQuantity };
        }
        return item;
      });
      // Update total price and count
      const newTotalPrice = updatedCart.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
      const newCount = updatedCart.reduce((count, item) => count + item.quantity, 0);

      setTotalPrice(newTotalPrice);
      setCount(newCount);

      return updatedCart;
    });
  };

  // Function to remove an item from the cart
  const removeCartItem = (itemId, size) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.filter(
        (item) => !(item.item_id === itemId && item.size === size)
      );
      // Update total price and count
      const newTotalPrice = updatedCart.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
      const newCount = updatedCart.reduce((count, item) => count + item.quantity, 0);

      setTotalPrice(newTotalPrice);
      setCount(newCount);

      return updatedCart;
    });
  };

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
        })),
      };

      await createOrder(orderData);

      // Clear cart
      setCart([]);
      setTotalPrice(0);
      setCount(0);

      navigate('/orderconfirmed');
    } catch (error) {
      console.error('Error placing order:', error);
      alert('An error occurred while placing your order.');
    }
  };

  const goToMembersView = () => {
    const passInput = prompt("Enter Password");
    if (passInput === import.meta.env.VITE_MV_PASSWORD) {
      navigate('/orderdashboard');
    }
    else {
      alert("Invalid Password!");
    }
  };

  return (
    <div>
      <Navbar count={count} />
      <Routes>
        <Route
          path="/login"
          element={<Login onLogin={handleLogin} />}
        />
        <Route
          path="/signup"
          element={<Signup />}
        />
        <Route
          path="/signupconfirmed"
          element={<SignupConfirmed />}
        />
        <Route
          path="/orderconfirmed"
          element={<OrderConfirmedPage />}
        />
        <Route
          path="/howitworks"
          element={<HowItWorks />}
        />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home
                addToCart={addToCart}
                count={count}
                cart={cart}
              />
            </PrivateRoute>
          }
        />
        <Route
          path="/account"
          element={
            <PrivateRoute>
              <Account
                handleLogout={handleLogout}
                goToMembersView={goToMembersView}
                token={token}
              />
            </PrivateRoute>
          }
        />
        <Route
          path="/cart"
          element={
            <PrivateRoute>
              <Cart
                cart={cart}
                updateCartItem={updateCartItem}
                removeCartItem={removeCartItem}
                placeOrder={placeOrder}
              />
            </PrivateRoute>
          }
        />
        <Route
          path="/orderdashboard"
          element={
            <PrivateRoute>
              <OrderDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/my-orders"
          element={
            <PrivateRoute>
              <UserOrders />
            </PrivateRoute>
          }
        />
        <Route
          path="/reset-token"
          element={<ResetPassword />}
        />
      </Routes>
    </div>
  );
}

export default App;