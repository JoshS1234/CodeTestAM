import React from "react";
import NavBar from "./NavBar";
import companyLogo from "../resources/Logo.svg";

export default function HeaderBar() {
  return (
    <div>
      <img src={companyLogo} />
      <h1>This is the header component</h1>
      <NavBar />
    </div>
  );
}
