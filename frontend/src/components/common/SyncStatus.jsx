import React from "react";
import { useSelector } from "react-redux";
import { FaWifi, FaSync } from "react-icons/fa";
import UrduText from "./UrduText";

const SyncStatus = () => {
  const isOnline = useSelector((state) => state.offline.isOnline);
  const pendingSync = useSelector((state) => state.offline.pendingSync);

  return (
    <div className="flex items-center space-x-2">
      {isOnline ? (
        <div className="flex items-center text-green-500">
          <FaWifi className="mr-1" />
          <span className="text-sm">
            <UrduText>آن لائن</UrduText>
          </span>
        </div>
      ) : (
        <div className="flex items-center text-yellow-500">
          <FaWifi className="mr-1" />
          <span className="text-sm">
            <UrduText>آف لائن</UrduText>
          </span>
        </div>
      )}

      {pendingSync > 0 && (
        <div className="flex items-center text-blue-500">
          <FaSync className="animate-spin mr-1" />
          <span className="text-sm">
            {pendingSync} <UrduText>تازہ کاریاں باقی ہیں</UrduText>
          </span>
        </div>
      )}
    </div>
  );
};

export default SyncStatus;
