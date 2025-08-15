const offlineSync = {
  init: () => {
    console.log("Offline sync module initialized");
  },
  queueRequest: (request) => {
    // In a real implementation, this would use IndexedDB or localStorage
    const queue = JSON.parse(localStorage.getItem("offlineQueue")) || [];
    queue.push(request);
    localStorage.setItem("offlineQueue", JSON.stringify(queue));
  },
  processQueue: () => {
    const queue = JSON.parse(localStorage.getItem("offlineQueue")) || [];
    while (queue.length > 0) {
      const request = queue.shift();
      // Send request to server
      console.log("Processing queued request:", request);
    }
    localStorage.setItem("offlineQueue", JSON.stringify(queue));
  },
};

export default offlineSync;
export const saveOfflineBill = (bill) => {
  const pendingBills = JSON.parse(localStorage.getItem("pendingBills") || "[]");
  pendingBills.push(bill);
  localStorage.setItem("pendingBills", JSON.stringify(pendingBills));
};

export const getPendingBills = () => {
  return JSON.parse(localStorage.getItem("pendingBills") || "[]");
};

export const clearPendingBills = () => {
  localStorage.removeItem("pendingBills");
};
