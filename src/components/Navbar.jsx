import React from 'react';
import logo from '/logo.png';
import './Navbar.css';
import { Link } from 'react-router-dom';
import { useCart } from '../api/CartContext';

const Navbar = () => {
  const { cart } = useCart(); // Access cart from context

  return (
    <div>
      <nav>
        <img src={logo} alt="Logo" />
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><a href="#">Contact Us</a></li>
          <li><Link to="/account">Account</Link></li>
          <li><Link to="/cart">Cart ({cart.length})</Link></li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
