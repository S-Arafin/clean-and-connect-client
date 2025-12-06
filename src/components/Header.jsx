import React, { useContext, useEffect, useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { FaBars, FaSun, FaMoon } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "forest");

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === "forest" ? "cupcake" : "forest");
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  const links = (
    <>
      <li><NavLink to="/">Home</NavLink></li>
      <li><NavLink to="/issues">Issues</NavLink></li>
      {user && (
        <>
            <li><NavLink to="/add-issue">Add Issue</NavLink></li>
            <li><NavLink to="/my-issues">My Issues</NavLink></li>
            <li><NavLink to="/my-contributions">My Contributions</NavLink></li>
        </>
      )}
    </>
  );

  return (
    <div className={`sticky top-0 z-50 backdrop-blur-lg bg-base-100/80 border-b border-base-200`}>
      <div className="navbar container mx-auto">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <FaBars className="h-5 w-5" />
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 gap-2">
              {links}
            </ul>
          </div>
          <Link to="/" className="btn btn-ghost text-2xl font-extrabold text-primary tracking-tighter">
            C&C
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-1 font-medium">
            {links}
          </ul>
        </div>

        <div className="navbar-end gap-3">
          
          <label className="swap swap-rotate btn btn-ghost btn-circle btn-sm">
            <input type="checkbox" onChange={toggleTheme} checked={theme === "cupcake"} />
            <FaSun className="swap-on fill-current w-5 h-5" />
            <FaMoon className="swap-off fill-current w-5 h-5" />
          </label>
          {user ? (
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar border border-primary/20">
                <div className="w-10 rounded-full">
                  <img 
                    alt="User" 
                    src={user?.photoURL || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"} 
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
              <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                <li className="menu-title px-4 py-2">Hi, {user?.displayName || "User"}</li>
                <li><button onClick={handleLogout} className="text-error font-bold">Logout</button></li>
              </ul>
            </div>
          ) : (
            <div className="flex gap-2">
                <Link to="/auth/login" className="btn btn-sm btn-ghost">Login</Link>
                <Link to="/auth/register" className="btn btn-sm btn-primary">Register</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;