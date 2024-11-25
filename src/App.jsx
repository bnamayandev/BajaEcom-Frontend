import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Account from './pages/Account'; // Ensure this path is correct
import Cart from './pages/Cart';
import Login from './pages/Login';
import Signup from './pages/Signup';
import './App.css';
import Card from './components/Card';
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
  const [cart, setCart] = useState([]);
  const [count, setCount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const navigate = useNavigate();

  useEffect(() => {
    setCart([]);
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

  function addToCart(id, price) {
    setCart([...cart, {"id": id,
      "productName": "Product " + id,
      "productDescription": "This is a description of New product",
      "price": price}]);
    
    
    setTotalPrice(totalPrice + Number(price));
    setCount(count + 1);
  }

  function cartMapper() {
    if (!cart || cart.length === 0) {
      return <p>No items in cart</p>;
    }
    return (
      <div>
      {cart.map((item) => <Card key={item.id} card={item} />)}
      
      <hr></hr>
      <br/>
      <h3>Total: {totalPrice.toFixed(2)}</h3>
      </div>
    );
  }

  const goToMembersView = () => {
    navigate('/orderdashboard');
  };

  return (
    <div>
      <Navbar count={count} />
      <Routes>
        <Route
          path="/"
          element={<Home addToCart={addToCart} count={count} cart={cart} cartMapper={cartMapper} />}
        />
        <Route path="/account" element={<Account handleLogout={handleLogout} goToMembersView={goToMembersView} />} />
        <Route path="/cart" element={<Cart cart={cart} cartMapper={cartMapper}/>} />
        <Route path="/orderdashboard" element={token ? <OrderDashboard /> : <Navigate to="/login" />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/orderconfirmed" element={<OrderConfirmedPage />} />
      </Routes>
    </div>
  );
}

export default App;