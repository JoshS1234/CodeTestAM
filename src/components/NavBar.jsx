import React from "react";
import { Link } from "react-router-dom";
import "./stylesheets/NavBar.css";

export default function NavBar() {
  const path = window.location.pathname;

  return (
    <nav className="navBarContainer">
      <Link to="/" className="linkButton">
        Home
      </Link>
      <Link to="/about-us" className="linkButton">
        About us
      </Link>
      <Link to="/contact-us" className="linkButton">
        Contact us
      </Link>
    </nav>
  );
}
