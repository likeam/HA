import React from "react";
import { useSelector } from "react-redux";
import { FaExclamationTriangle } from "react-icons/fa";

const OfflineBanner = () => {
  const isOnline = useSelector((state) => state.offline.isOnline);

  if (isOnline) return null;

  return (
    <div className="bg-yellow-100 border-l-4 border-yellow-500 p-3 rounded">
      <div className="flex items-center">
        <FaExclamationTriangle className="text-yellow-500 mr-2" />
        <span className="text-yellow-700 text-sm">
          آف لائن موڈ - تبدیلیاں محفوظ ہونے پر ہم آہنگ ہوں گی
        </span>
      </div>
    </div>
  );
};

export default OfflineBanner;
