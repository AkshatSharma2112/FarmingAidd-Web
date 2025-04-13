import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import logo_light from "/src/assets/logo-black.png";
import logo_light1 from "/src/assets/logo-black1.png";
import logo_dark from "/src/assets/logo-white.png";
import logo_dark1 from "/src/assets/logo-white1.png";
import search_icon_light from "/src/assets/search-w.png";
import search_icon_dark from "/src/assets/search-b.png";
import toogle_light from "/src/assets/night.png";
import toogle_dark from "/src/assets/day.png";

const Navbar = ({ theme, setTheme }) => {
  const toggle_mode = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div className="navbar">
      <img
        src={theme === "light" ? logo_light1 : logo_dark1}
        alt="Logo"
        className="logo"
      />
      <img
        src={theme === "light" ? logo_light : logo_dark}
        alt="Logo"
        className="logo"
      />

      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/services">Services</Link></li>
        <li><Link to="/features">Features</Link></li>
        <li><Link to="/about">About</Link></li>
      </ul>

      <div className="searchbox">
        <input type="text" placeholder="Search..." />
        <img
          src={theme === "light" ? search_icon_light : search_icon_dark}
          alt="Search"
        />
      </div>

      <img
        onClick={toggle_mode}
        src={theme === "light" ? toogle_light : toogle_dark}
        alt="Toggle Theme"
        className="toggleicon"
      />
    </div>
  );
};

export default Navbar;
