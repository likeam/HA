import React from "react";
import { Link } from "react-router-dom";
import {
  FaShoppingCart,
  FaBox,
  FaChartBar,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";
import SyncStatus from "../common/SyncStatus";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link to="/" className="text-xl font-bold">
                انوینٹری مینیجمنٹ
              </Link>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link
                  to="/pos"
                  className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 flex items-center"
                >
                  <FaShoppingCart className="mr-1" /> POS
                </Link>
                <Link
                  to="/inventory"
                  className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 flex items-center"
                >
                  <FaBox className="mr-1" /> انوینٹری
                </Link>
                <Link
                  to="/sales"
                  className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 flex items-center"
                >
                  <FaChartBar className="mr-1" /> فروخت
                </Link>
                <Link
                  to="/settings"
                  className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 flex items-center"
                >
                  <FaCog className="mr-1" /> ترتیبات
                </Link>
              </div>
            </div>
          </div>
          <div className="flex items-center">
            <SyncStatus />
            <button className="ml-4 p-1 rounded-full text-gray-400 hover:text-white">
              <FaSignOutAlt className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
