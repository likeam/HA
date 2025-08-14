import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setOnlineStatus } from "../features/offline/offlineSlice";

export const useNetworkStatus = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const handleOnline = () => dispatch(setOnlineStatus(true));
    const handleOffline = () => dispatch(setOnlineStatus(false));

    // Set initial status
    dispatch(setOnlineStatus(navigator.onLine));

    // Add event listeners
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, [dispatch]);
};
