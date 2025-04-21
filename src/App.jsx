import React, { useEffect, useState } from "react";
import "./App.css";
import { HashRouter, Routes, Route } from "react-router-dom";
import CropInfo from "./component/CropInfo.jsx";
import Navbar from "./component/Navbar.jsx";
import Services from "./pages/Services.jsx";
import Home from "./pages/Home.jsx";
import Features from "./pages/Features.jsx";
import About from "./pages/About.jsx";

const App = () => {
  const current_theme = localStorage.getItem("current_theme");
  const [theme, setTheme] = useState(current_theme ? current_theme : "light");

  useEffect(() => {
    localStorage.setItem("current_theme", theme);
  }, [theme]);

  return (
    <HashRouter>
      <div className={`container ${theme}`}>
        <Navbar theme={theme} setTheme={setTheme} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/features" element={<Features />} />
          <Route path="/about" element={<About />} />
          {/* <Route path="/support" element={<Support />} /> */}
          {/* <Route path="/contact" element={<Contact />} /> */}
        </Routes>
      </div>
    </HashRouter>
  );
};

export default App;
