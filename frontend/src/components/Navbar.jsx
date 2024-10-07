import React from 'react'
import logo from '/logo.png'
const Navbar = () => {
  return (
    <div>
        <nav>
            <img src={logo} alt="" />
            <ul>
                <li><a href="">Home</a></li>
                <li><a href="">Account</a></li>
                <li><a href="">Account</a></li>
            </ul>
        </nav>
    </div>
  )
}

export default Navbar