import React from "react";
import NavBar from "./NavBar";
import companyLogo from "../resources/Logo.svg";
import "./stylesheets/HeaderBar.css";

export default function HeaderBar() {
  return (
    <div className="headerBar">
      <div className="headerImageContainer">
        <img src={companyLogo} className="headerImage" />
      </div>
      <NavBar className="nav" />
      <input type="button" name="Login" value="Login" classname="loginButton" />
    </div>
  );
}
