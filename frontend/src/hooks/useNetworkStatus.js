import { useState, useEffect, useCallback } from "react";

const useNetworkStatus = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [lastOnline, setLastOnline] = useState(null);
  const [syncTriggered, setSyncTriggered] = useState(false);

  // Handle network status changes
  const handleOnline = useCallback(() => {
    setIsOnline(true);
    setLastOnline(new Date());
  }, []);

  const handleOffline = useCallback(() => {
    setIsOnline(false);
  }, []);

  // Automatic sync when coming online
  const handleAutoSync = useCallback(() => {
    if (isOnline && !syncTriggered) {
      setSyncTriggered(true);
      // This is where you would trigger your sync logic
      console.log("Network came online. Triggering auto-sync...");

      // Reset sync trigger after 5 seconds
      setTimeout(() => setSyncTriggered(false), 5000);
    }
  }, [isOnline, syncTriggered]);

  // Manual sync function
  const triggerSync = useCallback(() => {
    console.log("Manual sync triggered");
    setSyncTriggered(true);

    // Reset after sync operation would complete
    setTimeout(() => setSyncTriggered(false), 3000);
  }, []);

  // Setup event listeners
  useEffect(() => {
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, [handleOnline, handleOffline]);

  // Auto-sync when network status changes to online
  useEffect(() => {
    handleAutoSync();
  }, [isOnline, handleAutoSync]);

  // Format last online time
  const formatLastOnlineTime = () => {
    if (!lastOnline) return "Never";

    const now = new Date();
    const diffMinutes = Math.floor((now - lastOnline) / 60000);

    if (diffMinutes < 1) return "Just now";
    if (diffMinutes < 60) return `${diffMinutes} minutes ago`;

    const diffHours = Math.floor(diffMinutes / 60);
    if (diffHours < 24) return `${diffHours} hours ago`;

    return lastOnline.toLocaleDateString();
  };

  return {
    isOnline,
    lastOnline: formatLastOnlineTime(),
    syncTriggered,
    triggerSync,
    statusText: isOnline ? "Online" : "Offline",
    statusColor: isOnline ? "bg-green-500" : "bg-red-500",
    statusIcon: isOnline ? "🟢" : "🔴",
  };
};

export default useNetworkStatus;
