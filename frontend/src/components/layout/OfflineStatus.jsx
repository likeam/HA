import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPendingItems } from "../features/syncSlice";
import { getPendingBills } from "../services/offlineDB";
import { translateLabel } from "../utils/urduUtils";

const OfflineStatus = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const dispatch = useDispatch();
  const pendingItems = useSelector((state) => state.sync.pendingItems);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    // Check pending bills on load
    const pending = getPendingBills().length;
    dispatch(setPendingItems(pending));

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, [dispatch]);

  if (isOnline) return null;

  return (
    <div className="bg-red-500 text-white py-2 px-4 text-center font-urdo">
      <div className="container mx-auto flex justify-between items-center">
        <span>
          {translateLabel("OFFLINE_MODE")} ({pendingItems}{" "}
          {translateLabel("PENDING_BILLS")})
        </span>
        <button
          className="bg-white text-red-500 px-3 py-1 rounded font-medium"
          onClick={() => window.location.reload()}
        >
          {translateLabel("TRY_AGAIN")}
        </button>
      </div>
    </div>
  );
};

export default OfflineStatus;
