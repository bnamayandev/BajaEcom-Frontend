import React, { useState } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Account from './pages/Account'; // Ensure this path is correct
import Cart from './pages/Cart';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { CartProvider } from './api/CartContext'; // Import Cart Context Provider
import './App.css';
import OrderDashboard from './components/OrderDashboard';
import OrderConfirmedPage from './pages/OrderConfirmedPage';

function ProtectedOrderDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const mvPass = import.meta.env.VITE_MV_PASSWORD;

  const handlePasswordSubmit = () => {
    if (passwordInput === mvPass) {
      setIsAuthenticated(true);
      setError('');
      navigate('/orderdashboard');
    } else {
      setError('Incorrect password, please try again');
    }
  };

  if (isAuthenticated) {
    return <OrderDashboard />;
  }

  return (
    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
      <h2>Members' View</h2>
      <p>Please enter the password to access the dashboard:</p>
      <input
        type="password"
        value={passwordInput}
        onChange={(e) => setPasswordInput(e.target.value)}
      />
      <button onClick={handlePasswordSubmit}>Submit</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const navigate = useNavigate();

  const handleLogin = (newToken) => {
    setToken(newToken);
    localStorage.setItem('token', newToken);
  };

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem('token');
    navigate('/');
  };

  const goToMembersView = () => {
    navigate('/orderdashboard');
  };

  return (
    <CartProvider>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/account" element={<Account />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </CartProvider>
  );
}

export default App;
