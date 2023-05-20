import React from "react";
import { Link } from "react-router-dom";
import Homepage from "./Homepage";
import Contact from "./Contact";
import About from "./About";

export default function NavBar() {
  const path = window.location.pathname;

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about-us">About us</Link>
        </li>
        <li>
          <Link to="/contact-us">Contact us</Link>
        </li>
      </ul>
    </nav>
  );
}
