import React from "react";
import { Link } from "react-router-dom";
import logoSvg from "../assets/logo.svg";
function Logo() {
  return (
    <Link
      className="absolute top-6 left-6 [text-decoration: none] text-lg flex items-center"
      to="/"
    >
      <img src={logoSvg} alt="CryptoRin" />
      <span className="text-cyan-300">CryptoRin</span>
    </Link>
  );
}

export default Logo;
