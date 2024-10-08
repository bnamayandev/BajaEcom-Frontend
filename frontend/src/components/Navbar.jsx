import React from 'react'
import logo from '/logo.png'
import './Navbar.css'
const Navbar = ({count}) => {
  return (
    <div>
        <nav>
            <img src={logo} alt="" />
            <ul>
                <li><a href="">Home</a></li>
                <li><a href="">Contact Us</a></li>
                <li><a href="">Account</a></li>
                <li><a href="">Cart ({count})</a></li>
            </ul>
        </nav>
    </div>
  )
}

export default Navbar