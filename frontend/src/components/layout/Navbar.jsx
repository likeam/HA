import React from "react";
import { NavLink } from "react-router-dom";
import { translateLabel } from "../utils/urduUtils";

const Navbar = () => {
  const navItems = [
    { path: "/", label: "POS" },
    { path: "/inventory", label: "CATEGORIES" },
    { path: "/bills", label: "BILLS" },
    { path: "/sync", label: "SYNC" },
  ];

  return (
    <nav className="bg-amber-700 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-3">
          <div className="font-urdu text-xl font-bold">
            {translateLabel("INVENTORY_SYSTEM")}
          </div>

          <ul className="flex space-x-6">
            {navItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `py-2 px-3 rounded-md transition-colors ${
                      isActive ? "bg-amber-800" : "hover:bg-amber-600"
                    }`
                  }
                >
                  <span className="font-urdu">
                    {translateLabel(item.label)}
                  </span>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
