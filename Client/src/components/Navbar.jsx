import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaHome,
  FaChartBar,
  FaTag,
  FaCheckCircle,
  FaCog,
  FaBars,
  FaTimes,
} from "react-icons/fa";

const Navbar = () => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { path: "/", label: "Home", icon: FaHome },
    { path: "/analytics", label: "Analytics", icon: FaChartBar },
    { path: "/categories", label: "Categories", icon: FaTag },
    { path: "/completed", label: "Completed", icon: FaCheckCircle },
    { path: "/settings", label: "Settings", icon: FaCog },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-indigo-600 via-blue-600 to-sky-500 text-white shadow-md backdrop-blur-md border-b border-indigo-200/40 transition-all duration-300">
      <div className="flex justify-between items-center px-5 sm:px-8 md:px-12 py-2">
        {/* Logo */}
        <div className="flex items-center gap-2 group">
           <Link
            to="/"
          >
          <img
            src="/Taskly (2).png"
            alt="Taskly Pro"
            className="w-8 md:w-9 drop-shadow-md transition-transform duration-300 group-hover:rotate-3"
          />
           </Link>
          <Link
            to="/"
            className="font-bold text-lg md:text-xl tracking-tight text-white hover:text-yellow-200 transition-all"
          >
            Taskly Pro
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white text-2xl p-2 rounded-lg hover:bg-white/10 transition"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center gap-2 lg:gap-4">
          {navItems.map(({ path, label, icon: Icon }) => {
            const active = location.pathname === path;
            return (
              <li key={path}>
                <Link
                  to={path}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 ${
                    active
                      ? "bg-white/15 text-yellow-200 shadow-sm shadow-yellow-300/30 border border-white/20"
                      : "hover:bg-white/10 text-white/90 hover:text-yellow-100"
                  }`}
                >
                  <Icon
                    className={`text-base ${
                      active ? "text-yellow-200" : "text-white/80"
                    }`}
                  />
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Mobile Dropdown */}
      <div
        className={`md:hidden absolute top-full left-0 w-full bg-gradient-to-b from-indigo-600 to-sky-500 backdrop-blur-md border-t border-indigo-200/30 shadow-lg overflow-hidden transition-all duration-500 ${
          menuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="flex flex-col px-6 py-4 space-y-2 text-sm">
          {navItems.map(({ path, label, icon: Icon }) => {
            const active = location.pathname === path;
            return (
              <li key={path}>
                <Link
                  to={path}
                  onClick={() => setMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all ${
                    active
                      ? "bg-white/15 text-yellow-200 shadow-inner border border-white/20"
                      : "text-white/90 hover:text-yellow-100 hover:bg-white/10"
                  }`}
                >
                  <Icon
                    className={`text-lg ${
                      active ? "text-yellow-200" : "text-white/80"
                    }`}
                  />
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
