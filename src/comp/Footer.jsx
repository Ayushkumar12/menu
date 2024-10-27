import React from "react";
import { Link } from "react-router-dom";
import "../style/footer.css";
import face from "../icon/facebook.png"
import insta from "../icon/instagram.png"

export default function Footer() {
  return (
    <footer>
      <h4>Delightio</h4>
      <div className="footlinks">
        <Link to="/">Home</Link>
        <Link to="/menu">Menu</Link>
        <Link to="/about">About</Link>
      </div>
      <div className="sociolinks">
        <a href=""><img src={face} alt="" /></a>
        <a href=""><img src={insta} alt="" /></a>
        {/* <a href="">thread</a> */}
      </div>
      <hr />
      <p>2024 Delightio. All rights reserved.</p>
    </footer>
  );
}
