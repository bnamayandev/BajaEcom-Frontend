import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';

const Navbar = ({ count }) => {
  return (
    <>
      <nav className="navbar">
        <div className="logoContainer">
          <Link to="/">
            <img src="/logo.png" alt="Logo" className="logo" />
          </Link>
        </div>
        <ul className="navList">
          <li className="navItem">
            <Link to="/" className="navLink">
              HOME
            </Link>
          </li>
          <li className="navItem">
            <Link to="/howitworks" className="navLink">
              HOW IT WORKS
            </Link>
          </li>
          <li className="navItem">
            <Link to="/account" className="navLink">
              ACCOUNT
            </Link>
          </li>
          <li className="navItem">
            <Link to="/cart" className="navLink cartLink">
              CART <span className="cartCount">{count}</span>
            </Link>
          </li>
        </ul>
      </nav>
      <nav className='sale'>
        <h2>10% SALE ON EVERYTHING WHILE SUPPLIES LAST!</h2>
      </nav>
    </>
  );
};

export default Navbar;