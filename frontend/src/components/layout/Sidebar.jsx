import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaShoppingCart, FaBox, FaChartBar, FaCog } from "react-icons/fa";

const Sidebar = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="bg-gray-800 text-white w-64 min-h-screen flex flex-col">
      <div className="p-4 text-xl font-bold border-b border-gray-700">
        انوینٹری سسٹم
      </div>
      <nav className="flex-1 py-4">
        <ul>
          <li>
            <Link
              to="/pos"
              className={`flex items-center px-4 py-3 ${
                isActive("/pos") ? "bg-gray-700" : "hover:bg-gray-700"
              }`}
            >
              <FaShoppingCart className="ml-2" /> POS
            </Link>
          </li>
          <li>
            <Link
              to="/inventory"
              className={`flex items-center px-4 py-3 ${
                isActive("/inventory") ? "bg-gray-700" : "hover:bg-gray-700"
              }`}
            >
              <FaBox className="ml-2" /> انوینٹری
            </Link>
          </li>
          <li>
            <Link
              to="/sales"
              className={`flex items-center px-4 py-3 ${
                isActive("/sales") ? "bg-gray-700" : "hover:bg-gray-700"
              }`}
            >
              <FaChartBar className="ml-2" /> فروخت
            </Link>
          </li>
          <li>
            <Link
              to="/settings"
              className={`flex items-center px-4 py-3 ${
                isActive("/settings") ? "bg-gray-700" : "hover:bg-gray-700"
              }`}
            >
              <FaCog className="ml-2" /> ترتیبات
            </Link>
          </li>
        </ul>
      </nav>
      <div className="p-4 border-t border-gray-700">
        <OfflineBanner />
      </div>
    </div>
  );
};

export default Sidebar;
