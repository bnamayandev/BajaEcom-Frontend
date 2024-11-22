import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Account from './pages/Account';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { testData } from './test';
import './App.css';
import Card from './components/Card';
import OrderDashboard from './components/OrderDashboard';

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
  const [cart, setCart] = useState([]);
  const [count, setCount] = useState(0);
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const navigate = useNavigate();

  useEffect(() => {
    setCart(testData);
  }, []);

  const handleLogin = (newToken) => {
    setToken(newToken);
    localStorage.setItem('token', newToken);
  };

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem('token');
    navigate('/');
  };

  function addToCart() {
    setCount(count + 1);
  }

  function cartMapper() {
    if (!cart || cart.length === 0) {
      return <p>No items in cart</p>;
    }
    return cart.map((item) => <Card key={item.id} card={item} />);
  }

  const goToMembersView = () => {
    navigate('/orderdashboard');
  };

  return (
    <div>
      <Navbar count={count} />
      <div style={{ textAlign: 'center', marginTop: '1rem' }}>
        {token ? (
          <button onClick={handleLogout}>Logout</button>
        ) : (
          <div>
            <button onClick={() => navigate('/login')}>Login</button>
            <button onClick={() => navigate('/signup')}>Signup</button>
          </div>
        )}
        <button onClick={goToMembersView}>Members' View</button>
      </div>
      <Routes>
        <Route
          path="/"
          element={<Home addToCart={addToCart} count={count} cart={cart} cartMapper={cartMapper} />}
        />
        <Route path="/account" element={<Account />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/orderdashboard" element={token ? <OrderDashboard /> : <Navigate to="/login" />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;