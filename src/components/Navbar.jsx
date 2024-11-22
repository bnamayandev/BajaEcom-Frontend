import React from 'react'
import logo from '/logo.png'
import './Navbar.css'
import { Link } from 'react-router-dom'
const Navbar = ({count}) => {
  return (
    <div>
        <nav>
            <img src={logo} alt="" />
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><a href="">Contact Us</a></li>
                <li><Link to="/account">Account</Link></li>
                <li><Link to="/cart">Cart ({count})</Link></li>
            </ul>
        </nav>
    </div>
  )
}

export default Navbar