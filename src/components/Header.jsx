import React, { useEffect, useState } from "react";
import { NavLink } from "react-router";
import { FaBars, FaSun, FaMoon } from "react-icons/fa";

const Header = () => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "forest";
  });

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.setAttribute("data-theme", savedTheme);
    }
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === "forest" ? "cupcake" : "forest";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  const links = (
    <>
      <li><NavLink to="/">Home</NavLink></li>
      <li><NavLink to="/issues">Problems On The Community</NavLink></li>
    </>
  );

  return (
    <div>
      <div className="navbar bg-base-100 shadow-sm">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <FaBars className="h-5 w-5" />
            </div>
            <ul tabIndex="-1" className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
              {links}
            </ul>
          </div>
          <a className="text-primary font-extrabold text-xl">C&C</a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            {links}
          </ul>
        </div>
        <div className="navbar-end gap-2">
          <label className="swap swap-rotate btn btn-ghost btn-circle text-xl">
            <input 
              type="checkbox" 
              onChange={toggleTheme} 
              checked={theme === "cupcake"} 
            />
            <FaSun className="swap-on fill-current" />
            <FaMoon className="swap-off fill-current" />
          </label>
          <a className="btn btn-accent btn-soft">Login</a>
          <a className="btn btn-soft">Register</a>
        </div>
      </div>
    </div>
  );
};

export default Header;