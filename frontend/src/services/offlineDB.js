// Save bills to localStorage when offline
export const saveBillOffline = (bill) => {
  const pendingBills = JSON.parse(localStorage.getItem("pendingBills") || "[]");
  pendingBills.push({
    ...bill,
    createdAt: new Date().toISOString(),
    isOffline: true,
  });
  localStorage.setItem("pendingBills", JSON.stringify(pendingBills));
};

// Get pending bills from localStorage
export const getPendingBills = () => {
  return JSON.parse(localStorage.getItem("pendingBills") || []);
};

// Clear pending bills after successful sync
export const clearPendingBills = () => {
  localStorage.removeItem("pendingBills");
};

// Sync pending bills with server
export const syncPendingBills = async () => {
  const pendingBills = getPendingBills();
  if (pendingBills.length === 0) return;

  try {
    await Promise.all(pendingBills.map((bill) => api.post("/api/bills", bill)));
    clearPendingBills();
    return true;
  } catch (error) {
    console.error("Failed to sync bills:", error);
    return false;
  }
};
