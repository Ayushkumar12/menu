import React from 'react'
// import logo from "../assets/logo.png";
// import user from "../assets/user.png";
import "../style/nav.css";

export default function Navbar() {
  return (
    <nav>
      {/* <img src={logo}/> */}
      <ul className='side'>
        <a className='log'>login</a>
      </ul>
    </nav>
  )
}
