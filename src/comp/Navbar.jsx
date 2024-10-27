import React from 'react'
import { Link } from 'react-router-dom';
// import logo from "../assets/logo.png";
// import user from "../assets/user.png";
import "../style/nav.css";

export default function Navbar() {
  return (
    <nav>
      {/* <img src={logo}/> */}
      <h2>Delightio</h2>
      <ul className='side'>
        <a className='log'>logIn</a>
        <a className='log'>signUp</a>
      </ul>
    </nav>
  )
}
