import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaBox,
  FaReceipt,
  FaSync,
  FaBars,
  FaTimes,
  FaChartBar,
  FaCog,
} from "react-icons/fa";
import { useSelector } from "react-redux";
import { selectPendingItems } from "../features/offlineSlice";
import { translateLabel } from "../utils/urduUtils";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pendingItems = useSelector(selectPendingItems);

  const navItems = [
    {
      path: "/",
      label: "DASHBOARD",
      icon: <FaHome className="text-lg" />,
    },
    {
      path: "/pos",
      label: "POS",
      icon: <FaReceipt className="text-lg" />,
    },
    {
      path: "/inventory",
      label: "INVENTORY",
      icon: <FaBox className="text-lg" />,
    },
    {
      path: "/bills",
      label: "BILLS",
      icon: <FaChartBar className="text-lg" />,
    },
    {
      path: "/sync",
      label: "SYNC",
      icon: <FaSync className="text-lg" />,
      badge: pendingItems,
    },
    {
      path: "/settings",
      label: "SETTINGS",
      icon: <FaCog className="text-lg" />,
    },
  ];

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="fixed top-4 right-4 z-50 p-2 rounded-md bg-amber-600 text-white lg:hidden"
      >
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Sidebar Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed right-0 top-0 h-full w-64 bg-amber-800 text-white z-50 transform transition-transform duration-300
          ${
            isOpen ? "translate-x-0" : "translate-x-full"
          } lg:translate-x-0 lg:static lg:h-screen`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-5 border-b border-amber-700">
            <div className="font-urdu text-xl font-bold text-center">
              {translateLabel("INVENTORY_SYSTEM")}
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-4">
            <ul>
              {navItems.map((item) => (
                <li key={item.path} className="mb-1">
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `flex items-center py-3 px-6 transition-colors relative
                      ${
                        isActive
                          ? "bg-amber-900 border-r-4 border-yellow-400"
                          : "hover:bg-amber-700"
                      }`
                    }
                    onClick={() => window.innerWidth < 1024 && setIsOpen(false)}
                  >
                    <span className="mr-3">{item.icon}</span>
                    <span className="font-urdo flex-1">
                      {translateLabel(item.label)}
                    </span>

                    {item.badge !== undefined && item.badge > 0 && (
                      <span className="bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {item.badge}
                      </span>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Sync Status */}
          <div className="p-4 border-t border-amber-700">
            <div className="flex items-center">
              <div className="flex-1 font-urdu">
                <div>{translateLabel("PENDING_BILLS")}</div>
                <div className="text-yellow-300 font-bold">
                  {pendingItems} {translateLabel("ITEMS")}
                </div>
              </div>
              <div className="bg-amber-600 p-2 rounded-full">
                <FaSync />
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 text-center text-xs text-amber-300">
            {translateLabel("OFFLINE_MODE_ENABLED")}
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
