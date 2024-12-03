import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';

const Navbar = ({ count }) => {
  return (
    <nav className="navbar">
      <div className="logoContainer">
        <img src="/logo.png" alt="Logo" className="logo" />
      </div>
      <ul className="navList">
        <li className="navItem">
          <Link to="/" className="navLink">
            Home
          </Link>
        </li>
        <li className="navItem">
          <Link to="/howitworks" className="navLink">
            How It Works
          </Link>
        </li>
        <li className="navItem">
          <Link to="/account" className="navLink">
            Account
          </Link>
        </li>
        <li className="navItem">
          <Link to="/cart" className="navLink cartLink">
            Cart <span className="cartCount">{count}</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;